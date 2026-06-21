from __future__ import annotations

import asyncio
import tarfile
import tempfile
import threading
import time
from dataclasses import dataclass
from io import BytesIO
from pathlib import Path
from typing import Final

import docker
from docker.errors import APIError, DockerException, ImageNotFound
from docker.types import LogConfig


SANDBOX_IMAGE: Final[str] = "codequest-python-sandbox:latest"
CONTAINER_WORKDIR: Final[str] = "/runner"
CODE_FILENAME: Final[str] = "solution.py"
INPUT_FILENAME: Final[str] = "input.txt"
TIMEOUT_SECONDS: Final[int] = 5
MAX_OUTPUT_BYTES: Final[int] = 64 * 1024
MEMORY_LIMIT: Final[str] = "64m"
CPU_QUOTA: Final[int] = 50_000
CPU_PERIOD: Final[int] = 100_000


FRIENDLY_ERROR_MESSAGES: Final[dict[str, str]] = {
    "SyntaxError": "Python got confused by the shape of your code. Check for missing colons, quotes, or brackets.",
    "IndentationError": "The spaces at the start of your lines look uneven. Try lining up code that belongs together.",
    "TypeError": "Looks like two values do not fit together yet. Check whether you are mixing numbers and text.",
    "NameError": "Python found a name it does not know. Check your spelling or create the variable before using it.",
    "IndexError": "That list position does not exist. Remember that Python starts counting at 0.",
    "KeyError": "That dictionary key is missing. Check the key name or add it before reading it.",
    "ZeroDivisionError": "Division by zero breaks math rules. Make sure the number after / is not 0.",
    "RecursionError": "Your function is calling itself too many times. Add or fix the stopping condition.",
    "MemoryError": "Your code asked for more memory than this quest allows. Try storing less data.",
}


@dataclass(frozen=True)
class SandboxResult:
    stdout: str
    stderr: str
    exit_code: int | None
    timed_out: bool
    duration_ms: int
    friendly_error: str | None = None
    error_type: str | None = None
    output_truncated: bool = False
    cancelled: bool = False

    @property
    def passed_runtime(self) -> bool:
        return self.exit_code == 0 and not self.timed_out


class SandboxExecutionError(RuntimeError):
    """Raised when Docker itself cannot create or run the sandbox."""


class PythonSandbox:
    def __init__(self, image: str = SANDBOX_IMAGE) -> None:
        self.image = image
        self.client = docker.from_env()
        self._active: dict[str, object] = {}
        self._active_lock = threading.Lock()

    async def run_code(self, code: str, stdin: str = "", execution_id: str = "anonymous") -> SandboxResult:
        return await asyncio.to_thread(self._run_code_sync, code, stdin, execution_id)

    async def cancel(self, execution_id: str) -> bool:
        return await asyncio.to_thread(self._cancel_sync, execution_id)

    def _run_code_sync(self, code: str, stdin: str, execution_id: str) -> SandboxResult:
        self._ensure_image_exists()
        started = time.monotonic()
        container = None

        try:
            container = self.client.containers.create(
                self.image,
                command=[
                    "sh",
                    "-c",
                    f"python -I {CODE_FILENAME} < {INPUT_FILENAME}",
                ],
                working_dir=CONTAINER_WORKDIR,
                network_disabled=True,
                mem_limit=MEMORY_LIMIT,
                memswap_limit=MEMORY_LIMIT,
                cpu_period=CPU_PERIOD,
                cpu_quota=CPU_QUOTA,
                pids_limit=64,
                read_only=False,
                security_opt=["no-new-privileges"],
                cap_drop=["ALL"],
                tmpfs={"/tmp": "rw,noexec,nosuid,size=16m"},
                log_config=LogConfig(type="local", config={"max-size": "64k", "max-file": "2"}),
                stdin_open=True,
                detach=True,
            )
            self._copy_sources(container, code, stdin)
            with self._active_lock:
                self._active[execution_id] = container
            container.start()

            try:
                wait_result = container.wait(timeout=TIMEOUT_SECONDS)
                timed_out = False
                exit_code = int(wait_result.get("StatusCode", 1))
            except Exception:
                timed_out = True
                exit_code = None
                container.kill()

            stdout_raw = container.logs(stdout=True, stderr=False)
            stderr_raw = container.logs(stdout=False, stderr=True)
            output_truncated = len(stdout_raw) > MAX_OUTPUT_BYTES or len(stderr_raw) > MAX_OUTPUT_BYTES
            stdout = stdout_raw[:MAX_OUTPUT_BYTES].decode("utf-8", errors="replace")
            stderr = stderr_raw[:MAX_OUTPUT_BYTES].decode("utf-8", errors="replace")
            duration_ms = int((time.monotonic() - started) * 1000)
            error_type = _detect_error_type(stderr)
            cancelled = exit_code == 137 and self._was_cancelled(execution_id)

            if cancelled:
                friendly_error = "Code run cancelled."
            elif timed_out:
                friendly_error = "Your code ran for too long. Check for loops that never stop."
            elif exit_code == 137:
                friendly_error = "Your code used too much memory, so CodeQuest stopped it."
            elif error_type:
                friendly_error = FRIENDLY_ERROR_MESSAGES.get(
                    error_type,
                    "Python hit an error. Open the full error if you want the exact details.",
                )
            else:
                friendly_error = None

            return SandboxResult(
                stdout=stdout,
                stderr=stderr,
                exit_code=exit_code,
                timed_out=timed_out,
                duration_ms=duration_ms,
                friendly_error=friendly_error,
                error_type=error_type,
                output_truncated=output_truncated,
                cancelled=cancelled,
            )
        except (APIError, DockerException) as exc:
            raise SandboxExecutionError(f"Could not run sandbox container: {exc}") from exc
        finally:
            with self._active_lock:
                self._active.pop(execution_id, None)
            if container is not None:
                container.remove(force=True)

    def _cancel_sync(self, execution_id: str) -> bool:
        cancelled = False
        with self._active_lock:
            matches = [(key, value) for key, value in self._active.items() if key.startswith(execution_id)]
            for key, _ in matches:
                self._active[f"cancelled:{key}"] = True
        for _, container in matches:
            try:
                container.kill()
                cancelled = True
            except DockerException:
                continue
        return cancelled

    def _was_cancelled(self, execution_id: str) -> bool:
        with self._active_lock:
            return bool(self._active.pop(f"cancelled:{execution_id}", False))

    def _ensure_image_exists(self) -> None:
        try:
            self.client.images.get(self.image)
        except ImageNotFound as exc:
            raise SandboxExecutionError(
                f"Sandbox image '{self.image}' was not found. Build it with: "
                f"docker build -t {self.image} sandbox"
            ) from exc

    def _copy_sources(self, container, code: str, stdin: str) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            tmp_path = Path(tmp_dir)
            (tmp_path / CODE_FILENAME).write_text(code, encoding="utf-8")
            (tmp_path / INPUT_FILENAME).write_text(stdin, encoding="utf-8")

            archive = BytesIO()
            with tarfile.open(fileobj=archive, mode="w") as tar:
                tar.add(tmp_path / CODE_FILENAME, arcname=CODE_FILENAME)
                tar.add(tmp_path / INPUT_FILENAME, arcname=INPUT_FILENAME)

            archive.seek(0)
            container.put_archive(CONTAINER_WORKDIR, archive.read())


def _detect_error_type(stderr: str) -> str | None:
    for error_type in FRIENDLY_ERROR_MESSAGES:
        if error_type in stderr:
            return error_type
    return None
