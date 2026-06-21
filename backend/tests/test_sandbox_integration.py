from __future__ import annotations

import asyncio

import pytest

from app.services.sandbox import PythonSandbox


pytestmark = pytest.mark.integration


async def test_infinite_loop_times_out() -> None:
    result = await PythonSandbox().run_code("while True:\n    pass", execution_id="timeout-test")
    assert result.timed_out is True
    assert result.exit_code is None
    assert "too long" in (result.friendly_error or "").lower()


async def test_memory_limit_stops_large_allocation() -> None:
    result = await PythonSandbox().run_code("data = bytearray(200 * 1024 * 1024)\nprint(len(data))", execution_id="memory-test")
    assert result.exit_code != 0
    assert result.stdout == ""


async def test_output_is_truncated_at_safe_limit() -> None:
    result = await PythonSandbox().run_code("print('x' * 100_000)", execution_id="output-test")
    assert result.output_truncated is True
    assert len(result.stdout.encode("utf-8")) <= 64 * 1024


async def test_running_container_can_be_cancelled() -> None:
    sandbox = PythonSandbox()
    task = asyncio.create_task(sandbox.run_code("while True:\n    pass", execution_id="cancel-test"))
    await asyncio.sleep(0.5)
    assert await sandbox.cancel("cancel-test") is True
    result = await task
    assert result.cancelled is True
