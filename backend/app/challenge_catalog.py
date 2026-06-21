from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class HiddenTest:
    stdin: str
    expected_output: str


CHALLENGE_TESTS: dict[str, tuple[HiddenTest, ...]] = {
    "1-1": (HiddenTest("", "gold coin"),),
    "1-2": (HiddenTest("", "7"),),
    "1-3": (HiddenTest("", "Hello, Nova!"),),
    "1-4": (HiddenTest("", "Level 3"),),
    "1-5": (HiddenTest("", "True"),),
    "1-6": (
        HiddenTest("Kai\n", "Welcome, Kai"),
        HiddenTest("Amina\n", "Welcome, Amina"),
        HiddenTest("Leo\n", "Welcome, Leo"),
    ),
    "1-7": (HiddenTest("", "13"),),
    "1-8": (HiddenTest("", "Mira has 12 coins"),),
    "2-1": (HiddenTest("", "Gate opened"),),
    "2-2": (
        HiddenTest("yes\n", "Path lit"),
        HiddenTest("no\n", "Too dark"),
    ),
    "2-3": (
        HiddenTest("12\n", "Pass"),
        HiddenTest("10\n", "Pass"),
        HiddenTest("7\n", "Train more"),
    ),
    "2-4": (
        HiddenTest("sun\n", "Courtyard"),
        HiddenTest("rain\n", "Library"),
        HiddenTest("snow\n", "Great hall"),
    ),
    "2-5": (
        HiddenTest("yes\nyes\n", "Unlocked"),
        HiddenTest("yes\nno\n", "Locked"),
        HiddenTest("no\nyes\n", "Locked"),
    ),
    "2-6": (
        HiddenTest("saturday\n", "Rest day"),
        HiddenTest("sunday\n", "Rest day"),
        HiddenTest("monday\n", "Quest day"),
    ),
    "2-7": (
        HiddenTest("yes\n", "Quiet"),
        HiddenTest("no\n", "Wake the guard"),
    ),
    "2-8": (
        HiddenTest("12\nyes\n", "Champion path"),
        HiddenTest("8\nyes\n", "Training path"),
        HiddenTest("12\nno\n", "Find the key"),
        HiddenTest("4\nno\n", "Find the key"),
    ),
    "3-1": (HiddenTest("", "1\n2\n3"),),
    "3-2": (
        HiddenTest("cat\n", "c\na\nt"),
        HiddenTest("loop\n", "l\no\no\np"),
    ),
    "3-3": (
        HiddenTest("3\n", "3\n2\n1\nGo!"),
        HiddenTest("1\n", "1\nGo!"),
    ),
    "3-4": (
        HiddenTest("4\n", "10"),
        HiddenTest("6\n", "21"),
        HiddenTest("1\n", "1"),
    ),
}
