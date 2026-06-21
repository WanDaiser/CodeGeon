export type World = {
  id: number;
  slug: string;
  name: string;
  theme: string;
  mascot: string;
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
  bonus?: string;
};

export const worlds: World[] = [
  {
    id: 1,
    slug: "data-village",
    name: "Data Village",
    theme: "Variables and values",
    mascot: "Byte",
    palette: { bg: "#9be7ff", ground: "#7ccf7a", accent: "#ffd166", dark: "#19324a" },
    summary: "Name values, change types, and print friendly messages.",
  },
  {
    id: 2,
    slug: "decision-castle",
    name: "Decision Castle",
    theme: "If statements",
    mascot: "Ivy",
    palette: { bg: "#b7a9ff", ground: "#8172d9", accent: "#ff8fab", dark: "#20183f" },
    summary: "Teach programs to choose paths with conditions.",
  },
  {
    id: 3,
    slug: "loop-forest",
    name: "Loop Forest",
    theme: "Loops",
    mascot: "Fern",
    palette: { bg: "#b9fbc0", ground: "#4d9f6c", accent: "#f9c74f", dark: "#173b2f" },
    summary: "Repeat patterns without repeating yourself.",
  },
  {
    id: 4,
    slug: "data-structure-island",
    name: "Data Structure Island",
    theme: "Collections",
    mascot: "Nori",
    palette: { bg: "#90dbf4", ground: "#00a6a6", accent: "#ffbf69", dark: "#073b4c" },
    summary: "Store groups of things in lists, dictionaries, sets, and tuples.",
  },
  {
    id: 5,
    slug: "function-tower",
    name: "Function Tower",
    theme: "Functions",
    mascot: "Pip",
    palette: { bg: "#ffc8dd", ground: "#cdb4db", accent: "#a2d2ff", dark: "#43213d" },
    summary: "Bundle useful code into reusable spells.",
  },
  {
    id: 6,
    slug: "algorithm-summit",
    name: "Algorithm Summit",
    theme: "Algorithms",
    mascot: "Mina",
    palette: { bg: "#caf0f8", ground: "#48cae4", accent: "#f77f00", dark: "#023047" },
    summary: "Watch searching and sorting ideas move as pixel blocks.",
  },
];

export const levels: Level[] = [
  {
    id: "1-1",
    worldId: 1,
    order: 1,
    title: "Name Your First Treasure",
    concept: "variables",
    mascotLine: "Variables are labels for things your program remembers. Give the treasure a name, then show it on screen.",
    taskDescription: "Create a variable called `treasure` with the text `gold coin`. Then print it.",
    starterCode: "treasure = \"\"\nprint(treasure)\n",
    expectedHint: "Expected output: gold coin",
    bonus: "Change the treasure to your own item and print `I found a ...`.",
  },
  {
    id: "1-2",
    worldId: 1,
    order: 2,
    title: "Counting Apples",
    concept: "numbers",
    mascotLine: "Numbers let programs count, score, and measure. Store the apple count, then print it.",
    taskDescription: "Set `apples` to `7` and print it.",
    starterCode: "apples = 0\nprint(apples)\n",
    expectedHint: "Expected output: 7",
  },
  {
    id: "1-3",
    worldId: 1,
    order: 3,
    title: "Badge Maker",
    concept: "f-strings",
    mascotLine: "An f-string can tuck variables into a sentence. It is like making a tiny name badge.",
    taskDescription: "Print `Hello, Nova!` using the `name` variable and an f-string.",
    starterCode: "name = \"Nova\"\nprint()\n",
    expectedHint: "Expected output: Hello, Nova!",
  },
  {
    id: "1-4",
    worldId: 1,
    order: 4,
    title: "Number to Text",
    concept: "type conversion",
    mascotLine: "Sometimes Python needs help combining numbers and text. `str()` turns a number into text.",
    taskDescription: "Make the code print `Level 3` without causing a TypeError.",
    starterCode: "level = 3\nprint(\"Level \" + level)\n",
    expectedHint: "Expected output: Level 3",
  },
  {
    id: "1-5",
    worldId: 1,
    order: 5,
    title: "Truth Lantern",
    concept: "booleans",
    mascotLine: "A boolean is either `True` or `False`. Programs use these to make decisions later.",
    taskDescription: "Set `has_lantern` to `True` and print it.",
    starterCode: "has_lantern = False\nprint(has_lantern)\n",
    expectedHint: "Expected output: True",
  },
  {
    id: "1-6",
    worldId: 1,
    order: 6,
    title: "Village Greeting",
    concept: "input",
    mascotLine: "`input()` asks the player for text. For tests, CodeQuest sends the answer for you.",
    taskDescription: "Ask for a name with `input()` and print `Welcome, NAME`.",
    starterCode: "name = input()\nprint()\n",
    expectedHint: "Expected output for input Kai: Welcome, Kai",
  },
  {
    id: "1-7",
    worldId: 1,
    order: 7,
    title: "Tiny Calculator",
    concept: "operators",
    mascotLine: "Python can do arithmetic just like a calculator. Store the result before you print it.",
    taskDescription: "Add `8` and `5`, store the result in `total`, then print it.",
    starterCode: "total = 0\nprint(total)\n",
    expectedHint: "Expected output: 13",
  },
  {
    id: "1-8",
    worldId: 1,
    order: 8,
    title: "Village Capstone",
    concept: "variables capstone",
    mascotLine: "This combines names, numbers, and f-strings. One neat sentence is all you need.",
    taskDescription: "Use `hero` and `coins` to print `Mira has 12 coins`.",
    starterCode: "hero = \"Mira\"\ncoins = 12\nprint()\n",
    expectedHint: "Expected output: Mira has 12 coins",
    bonus: "Also print one more sentence using a boolean variable.",
  },
  {
    id: "2-1",
    worldId: 2,
    order: 1,
    title: "Castle Gate",
    concept: "if",
    mascotLine: "`if` lets your program open one path only when a condition is true.",
    taskDescription: "If `has_key` is true, print `Gate opened`.",
    starterCode: "has_key = True\n\n",
    expectedHint: "Expected output: Gate opened",
  },
  {
    id: "2-2",
    worldId: 2,
    order: 2,
    title: "Torch Check",
    concept: "else",
    mascotLine: "`else` is the fallback path. It runs when the `if` condition is not true.",
    taskDescription: "Print `Too dark` when `has_torch` is false.",
    starterCode: "has_torch = False\n\n",
    expectedHint: "Expected output: Too dark",
  },
  {
    id: "2-3",
    worldId: 2,
    order: 3,
    title: "Guard Score",
    concept: "comparison operators",
    mascotLine: "Comparisons ask questions like bigger, smaller, or equal. Their answer is a boolean.",
    taskDescription: "If `score` is at least `10`, print `Pass`.",
    starterCode: "score = 12\n\n",
    expectedHint: "Expected output: Pass",
  },
  {
    id: "2-4",
    worldId: 2,
    order: 4,
    title: "Two Keys",
    concept: "logical operators",
    mascotLine: "`and` checks that both conditions are true. It is perfect for double locks.",
    taskDescription: "Print `Unlocked` only when both key variables are true.",
    starterCode: "left_key = True\nright_key = True\n\n",
    expectedHint: "Expected output: Unlocked",
  },
  {
    id: "3-1",
    worldId: 3,
    order: 1,
    title: "Three Steps",
    concept: "for loops",
    mascotLine: "A `for` loop repeats code for each item in a sequence. Let the loop do the walking.",
    taskDescription: "Use `range()` to print the numbers 1, 2, and 3.",
    starterCode: "for number in range(1, 4):\n    print()\n",
    expectedHint: "Expected output: 1, 2, 3 on separate lines",
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
