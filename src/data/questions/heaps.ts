import type { ImplementationQuestion, TableTraceQuestion } from '../schema'

export const heapQuestions: (ImplementationQuestion | TableTraceQuestion)[] = [
  // ── Implementation: swim ──
  {
    id: "heaps-swim-small",
    type: "implement",
    topic: "heaps",
    tier: "small",
    title: "Heap swim (bubble-up)",
    prompt: "Implement the swim operation for a max-heap stored in a 1-indexed array. swim(k) should restore the heap order by moving the element at index k upward.",
    hints: [
      "Function signature: swim(a[], k)",
      "Compare a[k] with its parent a[k/2]. If a[k] > a[k/2], swap them and continue upward.",
      "while k > 1 and a[k] > a[k/2]:\n  swap(a[k], a[k/2])\n  k = k / 2",
    ],
    solutions: {
      pseudocode: `function swim(a[], k):
  while k > 1 and a[k] > a[k/2]:
    swap(a[k], a[k/2])
    k = k / 2`,
      python: `def swim(a: list, k: int) -> None:
    while k > 1 and a[k] > a[k // 2]:
        a[k], a[k // 2] = a[k // 2], a[k]
        k = k // 2`,
    },
    complexity: {
      question: "What is the time complexity of swim?",
      answer: "O(log n) — at most the height of the heap, which is floor(log2(n)).",
    },
    source: "18-19 Q4d (verbatim 'provide code')",
  },

  // ── Implementation: sink ──
  {
    id: "heaps-sink-small",
    type: "implement",
    topic: "heaps",
    tier: "small",
    title: "Heap sink (bubble-down)",
    prompt: "Implement the sink operation for a max-heap stored in a 1-indexed array of size n. sink(k, n) should restore heap order by moving the element at index k downward.",
    hints: [
      "Function signature: sink(a[], k, n)",
      "Find the larger child (2k or 2k+1). If it's larger than a[k], swap and continue downward.",
      "while 2*k <= n:\n  j = 2*k\n  if j < n and a[j] < a[j+1]: j++\n  if a[k] >= a[j]: break\n  swap(a[k], a[j])\n  k = j",
    ],
    solutions: {
      pseudocode: `function sink(a[], k, n):
  while 2*k <= n:
    j = 2*k
    if j < n and a[j] < a[j+1]:
      j = j + 1
    if a[k] >= a[j]:
      break
    swap(a[k], a[j])
    k = j`,
      python: `def sink(a: list, k: int, n: int) -> None:
    while 2 * k <= n:
        j = 2 * k
        if j < n and a[j] < a[j + 1]:
            j += 1
        if a[k] >= a[j]:
            break
        a[k], a[j] = a[j], a[k]
        k = j`,
    },
    complexity: {
      question: "What is the time complexity of sink?",
      answer: "O(log n) — at most the height of the heap.",
    },
    source: "18-19 Q4d; core subroutine of heapsort",
  },

  // ── Trace Table: Heap insert sequence ──
  {
    id: "heaps-trace-insert",
    type: "trace-table",
    topic: "heaps",
    tier: "small",
    title: "Heap Insert Sequence Trace",
    prompt: "Starting from an empty max-heap (1-indexed array), insert the keys 5, 8, 3, 10, 2 one at a time. Show the heap array after each insertion (after swim completes).",
    inputData: "Insert sequence: 5, 8, 3, 10, 2",
    table: {
      columns: ["Key Inserted", "Heap Array (1-indexed)"],
      rows: 5,
      solution: [
        ["5", "5"],
        ["8", "8, 5"],
        ["3", "8, 5, 3"],
        ["10", "10, 8, 3, 5"],
        ["2", "10, 8, 3, 5, 2"],
      ],
    },
    hints: [
      "To insert: append to end of array, then swim up.",
      "After inserting 8: array is [5, 8]. swim(2): 8 > 5, swap → [8, 5].",
      "After inserting 10: array is [8, 5, 3, 10]. swim(4): 10 > 5, swap → [8, 10, 3, 5]. swim(2): 10 > 8, swap → [10, 8, 3, 5].",
    ],
    source: "23-24 Q2b, 21-22 LSA Q2a, Midterm Q2b",
  },
]
