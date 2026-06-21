from __future__ import annotations

from dataclasses import dataclass

from app.challenge_catalog import CHALLENGE_TESTS
from app.services.sandbox import PythonSandbox, SandboxResult


@dataclass(frozen=True)
class TestSummary:
    passed: int
    total: int
    results: list[bool]
    first_failure: SandboxResult | None = None


def normalize_output(value: str) -> str:
    return "\n".join(line.rstrip() for line in value.strip().splitlines())


async def evaluate_challenge(
    sandbox: PythonSandbox,
    challenge_id: str,
    code: str,
    request_id: str,
) -> TestSummary:
    tests = CHALLENGE_TESTS.get(challenge_id)
    if tests is None:
        raise KeyError(challenge_id)

    results: list[bool] = []
    first_failure: SandboxResult | None = None

    for index, test in enumerate(tests):
        result = await sandbox.run_code(code, test.stdin, f"{request_id}:test:{index}")
        passed = result.passed_runtime and normalize_output(result.stdout) == normalize_output(test.expected_output)
        results.append(passed)
        if not passed and first_failure is None:
            first_failure = result
        if result.cancelled:
            break

    return TestSummary(
        passed=sum(results),
        total=len(tests),
        results=results,
        first_failure=first_failure,
    )
