from __future__ import annotations

from app.services.sandbox import SandboxResult
from app.services.test_runner import evaluate_challenge, normalize_output


class FakeSandbox:
    def __init__(self, outputs: list[str]) -> None:
        self.outputs = iter(outputs)

    async def run_code(self, code: str, stdin: str, execution_id: str) -> SandboxResult:
        return SandboxResult(stdout=next(self.outputs), stderr="", exit_code=0, timed_out=False, duration_ms=1)


def test_normalize_output_ignores_trailing_spaces_and_final_newline() -> None:
    assert normalize_output("hello  \nworld\n") == "hello\nworld"


async def test_evaluate_challenge_counts_passing_hidden_tests() -> None:
    sandbox = FakeSandbox(["Welcome, Kai\n", "Welcome, Amina\n", "Welcome, Leo\n"])
    summary = await evaluate_challenge(sandbox, "1-6", "print('stub')", "request-1")
    assert summary.passed == 3
    assert summary.total == 3
    assert summary.results == [True, True, True]


async def test_evaluate_challenge_records_failed_output_without_exposing_expected_value() -> None:
    sandbox = FakeSandbox(["wrong\n"])
    summary = await evaluate_challenge(sandbox, "1-1", "print('wrong')", "request-2")
    assert summary.passed == 0
    assert summary.results == [False]
