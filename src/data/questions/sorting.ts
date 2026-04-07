import type { ImplementationQuestion, TableTraceQuestion } from '../schema'

export const sortingQuestions: (ImplementationQuestion | TableTraceQuestion)[] = [
  // ── Implementation: Insertion Sort ──
  {
    id: "sorting-insertion-full",
    type: "implement",
    topic: "sorting",
    tier: "full",
    title: "Insertion Sort",
    prompt: "Implement insertion sort. The algorithm should sort an array in-place in ascending order.",
    hints: [
      "Function signature: insertionSort(a[], n)",
      "For each element at position i, swap it leftward until it's in the correct position among a[0..i].",
      "for i = 1 to n-1:\n  j = i\n  while j > 0 and a[j] < a[j-1]: swap a[j], a[j-1]; j--",
    ],
    solutions: {
      pseudocode: `function insertionSort(a[], n):
  for i = 1 to n-1:
    j = i
    while j > 0 and a[j] < a[j-1]:
      swap(a[j], a[j-1])
      j = j - 1`,
      python: `def insertion_sort(a: list) -> None:
    for i in range(1, len(a)):
        j = i
        while j > 0 and a[j] < a[j - 1]:
            a[j], a[j - 1] = a[j - 1], a[j]
            j -= 1`,
    },
    complexity: {
      question: "What is the time complexity of insertion sort in the best, average, and worst case?",
      answer: "Best: O(n) — already sorted. Average and Worst: O(n^2) — reversed array requires ~n^2/2 swaps.",
    },
    source: "21-22 Q1, 21-22 LSA Q1, Midterm Q4",
  },

  // ── Implementation: QuickSort Partition ──
  {
    id: "sorting-partition-small",
    type: "implement",
    topic: "sorting",
    tier: "small",
    title: "QuickSort Partition (single-scan)",
    prompt: "Implement the partition subroutine for QuickSort using a single left-to-right scan. Use a[lo] as the pivot. Return the final pivot index.",
    hints: [
      "Function signature: partition(a[], lo, hi) → int",
      "Use two pointers: i starts at lo, j starts at hi+1. Scan i right until a[i] >= pivot, scan j left until a[j] <= pivot. Swap when both stop. Stop when i >= j.",
      "pivot = a[lo]\ni = lo, j = hi + 1\nloop:\n  i++; while a[i] < pivot: i++\n  j--; while a[j] > pivot: j--\n  if i >= j: break\n  swap(a[i], a[j])\nswap(a[lo], a[j])\nreturn j",
    ],
    solutions: {
      pseudocode: `function partition(a[], lo, hi):
  pivot = a[lo]
  i = lo
  j = hi + 1
  while true:
    i = i + 1
    while i <= hi and a[i] < pivot:
      i = i + 1
    j = j - 1
    while j >= lo and a[j] > pivot:
      j = j - 1
    if i >= j:
      break
    swap(a[i], a[j])
  swap(a[lo], a[j])
  return j`,
      python: `def partition(a: list, lo: int, hi: int) -> int:
    pivot = a[lo]
    i = lo + 1
    j = hi
    while True:
        while i <= hi and a[i] < pivot:
            i += 1
        while j >= lo and a[j] > pivot:
            j -= 1
        if i >= j:
            break
        a[i], a[j] = a[j], a[i]
        i += 1
        j -= 1
    a[lo], a[j] = a[j], a[lo]
    return j`,
    },
    complexity: {
      question: "What is the time complexity of the partition subroutine?",
      answer: "O(n) — linear scan across the subarray. Each element is compared to the pivot at most once.",
    },
    source: "Syllabus; exam calls partition() generically",
  },

  // ── Trace Table: Insertion Sort ──
  {
    id: "sorting-trace-insertion",
    type: "trace-table",
    topic: "sorting",
    tier: "small",
    title: "Insertion Sort Trace",
    prompt: "Trace insertion sort on the array [5, 3, 8, 1, 2]. Show the array state after each pass (after each element is inserted into its correct position).",
    inputData: "[5, 3, 8, 1, 2]",
    table: {
      columns: ["Pass", "Array State"],
      rows: 5,
      solution: [
        ["0", "5, 3, 8, 1, 2"],
        ["1", "3, 5, 8, 1, 2"],
        ["2", "3, 5, 8, 1, 2"],
        ["3", "1, 3, 5, 8, 2"],
        ["4", "1, 2, 3, 5, 8"],
      ],
    },
    hints: [
      "Pass i inserts a[i] into its correct position among a[0..i].",
      "Pass 1: insert 3 before 5. Pass 2: 8 is already in place.",
      "Pass 3: insert 1 — it needs to go all the way to position 0.",
    ],
    source: "21-22 Q1a, 21-22 LSA Q1a, Midterm Q4a",
  },
]
