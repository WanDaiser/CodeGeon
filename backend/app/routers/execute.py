from __future__ import annotations

from pydantic import BaseModel, Field
from fastapi import APIRouter, HTTPException, Request, WebSocket, WebSocketDisconnect, status

from app.challenge_catalog import CHALLENGE_TESTS
from app.services.rate_limit import ExecutionRateLimiter
from app.services.sandbox import PythonSandbox, SandboxExecutionError
from app.services.test_runner import evaluate_challenge


router = APIRouter(prefix="/execute", tags=["execute"])
ws_router = APIRouter(tags=["execute"])
sandbox = PythonSandbox()
rate_limiter = ExecutionRateLimiter()


class ExecuteRequest(BaseModel):
    code: str = Field(min_length=1, max_length=20_000)
    stdin: str = Field(default="", max_length=10_000)
    challenge_id: str = Field(pattern=r"^\d+-\d+$")
    request_id: str = Field(min_length=8, max_length=100, pattern=r"^[a-zA-Z0-9-]+$")


class ExecuteResponse(BaseModel):
    stdout: str
    stderr: str
    exit_code: int | None
    timed_out: bool
    duration_ms: int
    friendly_error: str | None
    error_type: str | None
    output_truncated: bool
    cancelled: bool
    tests_passed: int
    tests_total: int
    test_results: list[bool]


@router.post("", response_model=ExecuteResponse)
async def execute_code(payload: ExecuteRequest, request: Request) -> ExecuteResponse:
    forwarded_for = request.headers.get("x-forwarded-for")
    client_key = forwarded_for.split(",")[0].strip() if forwarded_for else (request.client.host if request.client else "unknown")
    allowed, retry_after = await rate_limiter.allow(client_key)
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many code runs. Take a short break and try again.",
            headers={"Retry-After": str(retry_after)},
        )

    tests = CHALLENGE_TESTS.get(payload.challenge_id)
    if tests is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Challenge not found")

    try:
        result = await sandbox.run_code(payload.code, payload.stdin, f"{payload.request_id}:preview")
        if result.passed_runtime:
            summary = await evaluate_challenge(sandbox, payload.challenge_id, payload.code, payload.request_id)
        else:
            summary = None
    except SandboxExecutionError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(exc),
        ) from exc

    return ExecuteResponse(
        **result.__dict__,
        tests_passed=summary.passed if summary else 0,
        tests_total=len(tests),
        test_results=summary.results if summary else [False] * len(tests),
    )


@router.delete("/{request_id}")
async def cancel_execution(request_id: str) -> dict[str, bool]:
    return {"cancelled": await sandbox.cancel(request_id)}


@ws_router.websocket("/ws/execute")
async def execute_code_ws(websocket: WebSocket) -> None:
    await websocket.accept()

    try:
        while True:
            payload = ExecuteRequest.model_validate_json(await websocket.receive_text())
            await websocket.send_json({"type": "status", "message": "Running your code..."})

            try:
                result = await sandbox.run_code(payload.code, payload.stdin, f"{payload.request_id}:ws")
            except SandboxExecutionError as exc:
                await websocket.send_json({"type": "error", "message": str(exc)})
                continue

            await websocket.send_json({"type": "result", "data": result.__dict__})
    except WebSocketDisconnect:
        return
