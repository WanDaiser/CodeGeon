from __future__ import annotations

from pydantic import BaseModel, Field
from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect, status

from app.services.sandbox import PythonSandbox, SandboxExecutionError


router = APIRouter(prefix="/execute", tags=["execute"])
ws_router = APIRouter(tags=["execute"])
sandbox = PythonSandbox()


class ExecuteRequest(BaseModel):
    code: str = Field(min_length=1, max_length=20_000)
    stdin: str = Field(default="", max_length=10_000)


class ExecuteResponse(BaseModel):
    stdout: str
    stderr: str
    exit_code: int | None
    timed_out: bool
    duration_ms: int
    friendly_error: str | None
    error_type: str | None


@router.post("", response_model=ExecuteResponse)
async def execute_code(payload: ExecuteRequest) -> ExecuteResponse:
    try:
        result = await sandbox.run_code(payload.code, payload.stdin)
    except SandboxExecutionError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(exc),
        ) from exc

    return ExecuteResponse(**result.__dict__)


@ws_router.websocket("/ws/execute")
async def execute_code_ws(websocket: WebSocket) -> None:
    await websocket.accept()

    try:
        while True:
            payload = ExecuteRequest.model_validate_json(await websocket.receive_text())
            await websocket.send_json({"type": "status", "message": "Running your code..."})

            try:
                result = await sandbox.run_code(payload.code, payload.stdin)
            except SandboxExecutionError as exc:
                await websocket.send_json({"type": "error", "message": str(exc)})
                continue

            await websocket.send_json({"type": "result", "data": result.__dict__})
    except WebSocketDisconnect:
        return
