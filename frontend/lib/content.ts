export type World = {
  id: number;
  slug: string;
  name: string;
  theme: string;
  mascot: string;
  mascotSprite: string;
  palette: {
    bg: string;
    ground: string;
    accent: string;
    dark: string;
  };
  summary: string;
};

export type Level = {
  id: string;
  worldId: number;
  order: number;
  title: string;
  concept: string;
  mascotLine: string;
  taskDescription: string;
  starterCode: string;
  expectedHint: string;
  lesson: string[];
  usesInput?: boolean;
  inputPlaceholder?: string;
  bonus?: string;
};

export const worlds: World[] = [
  {
    id: 1,
    slug: "data-village",
    name: "Data Village",
    theme: "Variables and values",
    mascot: "Byte",
    mascotSprite: "/mascots/byte.png",
    palette: { bg: "#9be7ff", ground: "#7ccf7a", accent: "#ffd166", dark: "#19324a" },
    summary: "Name values, change types, and print friendly messages.",
  },
  {
    id: 2,
    slug: "decision-castle",
    name: "Decision Castle",
    theme: "If statements",
    mascot: "Ivy",
    mascotSprite: "/mascots/ivy.png",
    palette: { bg: "#b7a9ff", ground: "#8172d9", accent: "#ff8fab", dark: "#20183f" },
    summary: "Teach programs to choose paths with conditions.",
  },
  {
    id: 3,
    slug: "loop-forest",
    name: "Loop Forest",
    theme: "Loops",
    mascot: "Fern",
    mascotSprite: "/mascots/fern.png",
    palette: { bg: "#b9fbc0", ground: "#4d9f6c", accent: "#f9c74f", dark: "#173b2f" },
    summary: "Repeat patterns without repeating yourself.",
  },
  {
    id: 4,
    slug: "data-structure-island",
    name: "Data Structure Island",
    theme: "Collections",
    mascot: "Nori",
    mascotSprite: "/mascots/nori.png",
    palette: { bg: "#90dbf4", ground: "#00a6a6", accent: "#ffbf69", dark: "#073b4c" },
    summary: "Store groups of things in lists, dictionaries, sets, and tuples.",
  },
  {
    id: 5,
    slug: "function-tower",
    name: "Function Tower",
    theme: "Functions",
    mascot: "Pip",
    mascotSprite: "/mascots/pip.png",
    palette: { bg: "#ffc8dd", ground: "#cdb4db", accent: "#a2d2ff", dark: "#43213d" },
    summary: "Bundle useful code into reusable spells.",
  },
  {
    id: 6,
    slug: "algorithm-summit",
    name: "Algorithm Summit",
    theme: "Algorithms",
    mascot: "Mina",
    mascotSprite: "/mascots/mina.png",
    palette: { bg: "#caf0f8", ground: "#48cae4", accent: "#f77f00", dark: "#023047" },
    summary: "Watch searching and sorting ideas move as pixel blocks.",
  },
];

export const levels: Level[] = [
  {
    id: "1-1", worldId: 1, order: 1, title: "Name Your First Treasure", concept: "variables",
    mascotLine: "A variable is a named place where Python remembers a value. The name stays useful even when the value changes.",
    taskDescription: "Create a variable called `treasure` containing the string `gold coin`, then print it.",
    starterCode: "treasure = \"\"\nprint(treasure)\n", expectedHint: "Expected output: gold coin",
    lesson: ["Variables connect a readable name to a value.", "The `=` symbol assigns the value on the right to the name on the left.", "Text values are called strings and need quotes."],
    bonus: "Change the treasure and use an f-string to print `I found a ...`.",
  },
  {
    id: "1-2", worldId: 1, order: 2, title: "Numbers in the Basket", concept: "int and float",
    mascotLine: "Python uses integers for whole numbers and floats for numbers with a decimal point. Both can be used in calculations.",
    taskDescription: "Set `apples` to the integer `7` and print it.", starterCode: "apples = 0\nprint(apples)\n",
    expectedHint: "Expected output: 7", lesson: ["`int` values are whole numbers such as 7 or -2.", "`float` values include a decimal point, such as 3.5.", "Numbers do not use quotation marks."],
  },
  {
    id: "1-3", worldId: 1, order: 3, title: "Badge Maker", concept: "strings and f-strings",
    mascotLine: "Strings store text. An f-string places a variable inside text using curly braces.",
    taskDescription: "Print `Hello, Nova!` using `name` and an f-string.", starterCode: "name = \"Nova\"\nprint()\n",
    expectedHint: "Expected output: Hello, Nova!", lesson: ["Strings are sequences of characters surrounded by quotes.", "Start an f-string with `f` before the opening quote.", "Put variable names inside `{}` to include their values."],
  },
  {
    id: "1-4", worldId: 1, order: 4, title: "Number to Text", concept: "type conversion",
    mascotLine: "A value's type tells Python what operations make sense. Conversion creates a value of another type.",
    taskDescription: "Use `str()` so the code prints `Level 3` without a TypeError.", starterCode: "level = 3\nprint(\"Level \" + level)\n",
    expectedHint: "Expected output: Level 3", lesson: ["`type(value)` reveals a value's data type.", "`str()` converts a value to text; `int()` converts suitable text to a whole number.", "Python does not automatically join a string and an integer with `+`."],
  },
  {
    id: "1-5", worldId: 1, order: 5, title: "Truth Lantern", concept: "booleans",
    mascotLine: "A boolean represents one of two states: true or false. These values power decisions throughout programs.",
    taskDescription: "Set `has_lantern` to the boolean `True` and print it.", starterCode: "has_lantern = False\nprint(has_lantern)\n",
    expectedHint: "Expected output: True", lesson: ["The only boolean values are `True` and `False`.", "They begin with capital letters and do not use quotes.", "Comparisons such as `5 > 2` also produce booleans."],
  },
  {
    id: "1-6", worldId: 1, order: 6, title: "Village Greeting", concept: "input",
    mascotLine: "`input()` pauses the program and returns what the player typed as a string.",
    taskDescription: "Read a name with `input()` and print `Welcome, NAME` using an f-string.", starterCode: "name = input()\nprint()\n",
    expectedHint: "Hidden tests try several different names.", lesson: ["`input()` always returns a string.", "Store the result in a variable so it can be reused.", "CodeQuest's input box lets you preview your program; hidden tests use other names."],
    usesInput: true, inputPlaceholder: "Kai", bonus: "Add an exclamation mark after the name.",
  },
  {
    id: "1-7", worldId: 1, order: 7, title: "Tiny Calculator", concept: "operators",
    mascotLine: "Operators create new values from existing ones. Python follows the usual order of operations.",
    taskDescription: "Add `8` and `5`, store the result in `total`, then print it.", starterCode: "total = 0\nprint(total)\n",
    expectedHint: "Expected output: 13", lesson: ["Use `+`, `-`, `*`, and `/` for basic arithmetic.", "The result of `/` is a float, even when it divides evenly.", "Parentheses make calculation order explicit."],
  },
  {
    id: "1-8", worldId: 1, order: 8, title: "Village Capstone", concept: "data capstone",
    mascotLine: "Bring strings, integers, variables, and f-strings together in one clear message.",
    taskDescription: "Use `hero` and `coins` to print exactly `Mira has 12 coins`.", starterCode: "hero = \"Mira\"\ncoins = 12\nprint()\n",
    expectedHint: "Expected output: Mira has 12 coins", lesson: ["Good variable names explain what their values mean.", "Different data types can appear together inside an f-string.", "A program is easier to change when values are stored once and reused."],
    bonus: "Create a boolean named `ready` and print it in a second sentence.",
  },
  {
    id: "2-1", worldId: 2, order: 1, title: "Castle Gate", concept: "if",
    mascotLine: "An `if` block runs only when its condition is true. Indentation shows which lines belong to it.",
    taskDescription: "If `has_key` is true, print `Gate opened`.", starterCode: "has_key = True\n\n",
    expectedHint: "Expected output: Gate opened", lesson: ["An `if` line ends with a colon.", "The condition must produce `True` or `False`.", "Indented lines belong to the conditional block."],
  },
  {
    id: "2-2", worldId: 2, order: 2, title: "Torch Check", concept: "if and else",
    mascotLine: "`else` provides a second path when the `if` condition is false.",
    taskDescription: "Read `yes` or `no`. Print `Path lit` for yes; otherwise print `Too dark`.", starterCode: "answer = input()\n\n",
    expectedHint: "Hidden tests try both paths.", lesson: ["Exactly one branch of an `if`/`else` pair runs.", "Use `==` to compare values; `=` assigns a value.", "Keep both branches aligned at the same indentation level."], usesInput: true, inputPlaceholder: "yes",
  },
  {
    id: "2-3", worldId: 2, order: 3, title: "Guard Score", concept: "comparisons",
    mascotLine: "Comparison operators turn questions about values into booleans.",
    taskDescription: "Read a score. Print `Pass` when it is at least 10; otherwise print `Train more`.", starterCode: "score = int(input())\n\n",
    expectedHint: "The boundary score 10 is tested.", lesson: ["`>=` means greater than or equal to.", "Convert numeric input with `int()` before comparing it to a number.", "Boundary values are important test cases."], usesInput: true, inputPlaceholder: "12",
  },
  {
    id: "2-4", worldId: 2, order: 4, title: "Weather Routes", concept: "elif",
    mascotLine: "`elif` adds another condition between the first `if` and final `else`.",
    taskDescription: "Read `sun`, `rain`, or another weather. Print `Courtyard`, `Library`, or `Great hall` respectively.", starterCode: "weather = input()\n\n",
    expectedHint: "Three weather paths are tested.", lesson: ["Conditions are checked from top to bottom.", "The first true branch runs and the rest are skipped.", "A final `else` catches values not handled earlier."], usesInput: true, inputPlaceholder: "rain",
  },
  {
    id: "2-5", worldId: 2, order: 5, title: "Two Keys", concept: "and",
    mascotLine: "The `and` operator is true only when both conditions are true.",
    taskDescription: "Read two yes/no answers. Print `Unlocked` only when both are `yes`; otherwise print `Locked`.", starterCode: "left_key = input()\nright_key = input()\n\n",
    expectedHint: "Different key combinations are tested.", lesson: ["`A and B` requires both A and B.", "Break a long condition across named boolean variables when it improves readability.", "Truth tables list every possible combination."], usesInput: true, inputPlaceholder: "yes\nyes",
  },
  {
    id: "2-6", worldId: 2, order: 6, title: "Weekend Watch", concept: "or",
    mascotLine: "The `or` operator is true when at least one condition is true.",
    taskDescription: "Read a day. Print `Rest day` for saturday or sunday; otherwise print `Quest day`.", starterCode: "day = input()\n\n",
    expectedHint: "Both weekend days and a weekday are tested.", lesson: ["`A or B` needs one or both conditions to be true.", "Compare the variable on both sides: `day == ... or day == ...`.", "Strings are case-sensitive."], usesInput: true, inputPlaceholder: "saturday",
  },
  {
    id: "2-7", worldId: 2, order: 7, title: "Sleeping Guard", concept: "not",
    mascotLine: "`not` flips a boolean: true becomes false and false becomes true.",
    taskDescription: "Read whether the guard is sleeping. Print `Quiet` for yes; use `not` to print `Wake the guard` otherwise.", starterCode: "sleeping = input() == \"yes\"\n\n",
    expectedHint: "Sleeping and awake states are tested.", lesson: ["`not condition` reverses the condition's truth value.", "Store a comparison result directly as a boolean.", "Choose positive boolean names such as `sleeping` instead of confusing double negatives."], usesInput: true, inputPlaceholder: "no",
  },
  {
    id: "2-8", worldId: 2, order: 8, title: "Castle Capstone", concept: "decision capstone",
    mascotLine: "Combine comparisons and logical operators to guide every visitor to exactly one path.",
    taskDescription: "Read a score and key answer. With no key print `Find the key`; otherwise print `Champion path` for scores 10+ or `Training path`.", starterCode: "score = int(input())\nhas_key = input() == \"yes\"\n\n",
    expectedHint: "Four combinations of score and key are tested.", lesson: ["Handle the most important blocking condition first.", "Nested decisions can express rules that depend on earlier answers.", "Every input should lead to one clear output."], usesInput: true, inputPlaceholder: "12\nyes", bonus: "Rewrite the solution with the fewest clear branches you can.",
  },
  {
    id: "3-1", worldId: 3, order: 1, title: "Three Steps", concept: "for and range",
    mascotLine: "A `for` loop takes each value from a sequence and runs its block once for that value.",
    taskDescription: "Use `range()` to print 1, 2, and 3 on separate lines.", starterCode: "for number in range(1, 4):\n    print()\n",
    expectedHint: "Expected output: 1 through 3.", lesson: ["`range(start, stop)` includes start but excludes stop.", "The loop variable changes automatically each round.", "Indentation marks the repeated block."],
  },
  {
    id: "3-2", worldId: 3, order: 2, title: "Letter Trail", concept: "iterating strings",
    mascotLine: "Strings are sequences, so a loop can visit their characters one at a time.",
    taskDescription: "Read a word and print each character on its own line using a `for` loop.", starterCode: "word = input()\n\n",
    expectedHint: "Hidden tests use words of different lengths.", lesson: ["A `for` loop works with any iterable sequence.", "Each character is a one-character string.", "The same code adapts to short and long words."], usesInput: true, inputPlaceholder: "cat",
  },
  {
    id: "3-3", worldId: 3, order: 3, title: "Launch Countdown", concept: "while loops",
    mascotLine: "A `while` loop repeats as long as its condition remains true. Its variables must move toward stopping.",
    taskDescription: "Read a positive number, count down to 1 with `while`, then print `Go!`.", starterCode: "count = int(input())\n\n",
    expectedHint: "Different starting counts are tested.", lesson: ["A `while` condition is checked before every round.", "Update `count` inside the loop to avoid an infinite loop.", "Use `count -= 1` to subtract one and store the result."], usesInput: true, inputPlaceholder: "3",
  },
  {
    id: "3-4", worldId: 3, order: 4, title: "Forest Capstone", concept: "loop accumulator",
    mascotLine: "An accumulator remembers a growing result while a loop visits many values.",
    taskDescription: "Read `n`, add every integer from 1 through `n`, and print the total.", starterCode: "n = int(input())\ntotal = 0\n\n",
    expectedHint: "Hidden tests use several values of n.", lesson: ["Initialize an accumulator before the loop.", "Update it once per iteration.", "`range(1, n + 1)` includes n because the stop value itself is excluded."], usesInput: true, inputPlaceholder: "4", bonus: "Print only the total, then solve it again with a `while` loop.",
  },
];

export function getWorld(worldId: number) {
  return worlds.find((world) => world.id === worldId);
}

export function getLevelsForWorld(worldId: number) {
  return levels.filter((level) => level.worldId === worldId);
}

export function getLevel(levelId: string) {
  return levels.find((level) => level.id === levelId);
}
