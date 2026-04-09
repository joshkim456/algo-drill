import type { ImplementationQuestion, TableTraceQuestion } from '../schema'

export const heapQuestions: (ImplementationQuestion | TableTraceQuestion)[] = [
  // ═══════════════════════════════════════════════
  // IMPLEMENTATION QUESTIONS (5)
  // ═══════════════════════════════════════════════

  // ── 1. Implementation: swim (bubble-up) ──
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
      pseudocode: `swim(i):
  while (i > 1 && a[i/2]<a[i])
    swap(a[i], a[i/2]);
    i = i/2;`,
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

  // ── 2. Implementation: sink (bubble-down) ──
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
      pseudocode: `sink(i):
  while (2*i <= N)
    j = 2*i;
    if (j<N && a[j]<a[j+1]) j++;
    if (a[i]>=a[j]) break;
    swap(a[i], a[j]);
    i = j;`,
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

  // ── 3. Implementation: insert (append + swim) ──
  {
    id: "heaps-insert-small",
    type: "implement",
    topic: "heaps",
    tier: "small",
    title: "Heap insert",
    prompt: "Implement the insert operation for a max-heap stored in a 1-indexed array. The heap currently has n elements. Insert a new key and restore heap order. You may assume swim(a, k) is available.",
    hints: [
      "Function signature: insert(a[], n, key) — returns new size",
      "Append the new key at position n+1, then swim it up to restore order.",
      "n = n + 1\na[n] = key\nswim(a, n)\nreturn n",
    ],
    solutions: {
      pseudocode: `enqueue(key):
  a[++N]=key;
  swim(N);`,
      python: `def insert(a: list, n: int, key) -> int:
    n += 1
    if n >= len(a):
        a.append(key)
    else:
        a[n] = key
    swim(a, n)
    return n`,
    },
    complexity: {
      question: "What is the time complexity of heap insert?",
      answer: "O(log n) — the append is O(1), and swim is O(log n) in the worst case.",
    },
    source: "18-19 Q4e, 23-24 Q2b, Midterm Q2b",
  },

  // ── 4. Implementation: delMax (swap root + sink) ──
  {
    id: "heaps-delmax-small",
    type: "implement",
    topic: "heaps",
    tier: "small",
    title: "Heap delete-max",
    prompt: "Implement the delete-max operation for a max-heap stored in a 1-indexed array of size n. Remove and return the maximum element, then restore heap order. You may assume sink(a, k, n) is available.",
    hints: [
      "Function signature: delMax(a[], n) — returns the max and new size",
      "The max is at a[1]. Swap it with the last element a[n], shrink the heap, then sink the new root.",
      "max = a[1]\nswap(a[1], a[n])\nn = n - 1\nsink(a, 1, n)\nreturn max, n",
    ],
    solutions: {
      pseudocode: `dequeue():
  max=a[1];
  swap(a[1], a[N]);
  a[N--]=null;
  sink(1);
  return max;`,
      python: `def del_max(a: list, n: int) -> tuple:
    max_val = a[1]
    a[1], a[n] = a[n], a[1]
    n -= 1
    sink(a, 1, n)
    return max_val, n`,
    },
    complexity: {
      question: "What is the time complexity of delete-max?",
      answer: "O(log n) — the swap is O(1), and sink is O(log n) in the worst case.",
    },
    source: "18-19 Q4e, 23-24 Q2c, Midterm Q2c",
  },

  // ── 5. Implementation: Bottom-up heap construction ──
  {
    id: "heaps-bottomup-small",
    type: "implement",
    topic: "heaps",
    tier: "small",
    title: "Bottom-up heap construction",
    prompt: "Given an array a[1..n] of n elements, convert it into a max-heap in-place using bottom-up construction. You may assume sink(a, k, n) is available.",
    hints: [
      "Function signature: buildHeap(a[], n)",
      "Leaves are already valid heaps. Start from the last internal node (n/2) and sink each node down to 1.",
      "for k = n/2 down to 1:\n  sink(a, k, n)",
    ],
    solutions: {
      pseudocode: `for (k = N/2; k >= 1; k--)
  sink(k);`,
      python: `def build_heap(a: list, n: int) -> None:
    for k in range(n // 2, 0, -1):
        sink(a, k, n)`,
    },
    complexity: {
      question: "What is the time complexity of bottom-up heap construction? Why is it better than n successive inserts?",
      answer: "O(n) — not O(n log n). Most nodes are near the bottom and sink only a short distance. The sum of heights is at most n. By contrast, n successive inserts each cost O(log n), giving O(n log n) total.",
    },
    source: "21-22 Practice Q1a, 21-22 LSA Q2b",
  },

  // ═══════════════════════════════════════════════
  // TRACE TABLE QUESTIONS (3)
  // ═══════════════════════════════════════════════

  // ── 6. Trace Table: Heap insert sequence ──
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

  // ── 7. Trace Table: Heap delete-max sequence ──
  {
    id: "heaps-trace-delmax",
    type: "trace-table",
    topic: "heaps",
    tier: "small",
    title: "Heap Delete-Max Sequence Trace",
    prompt: "Starting from the max-heap [10, 8, 3, 5, 2] (1-indexed), perform delete-max four times. Show the deleted key and the heap array after each deletion (after sink completes).",
    inputData: "Max-heap: [10, 8, 3, 5, 2]",
    table: {
      columns: ["Deleted Key", "Heap Array After Sink"],
      rows: 4,
      solution: [
        ["10", "8, 5, 3, 2"],
        ["8", "5, 2, 3"],
        ["5", "3, 2"],
        ["3", "2"],
      ],
    },
    hints: [
      "Delete-max: swap a[1] with a[n], shrink heap by 1, then sink a[1].",
      "First deletion: swap 10 and 2 → [2, 8, 3, 5]. Sink 2: larger child is 8 (index 2), swap → [8, 2, 3, 5]. Sink 2: larger child is 5 (index 4), swap → [8, 5, 3, 2].",
      "Second deletion: swap 8 and 2 → [2, 5, 3]. Sink 2: larger child is 5 (index 2), swap → [5, 2, 3]. 2 has no children → done.",
    ],
    source: "23-24 Q2c, 21-22 LSA Q2a, Midterm Q2c",
  },

  // ── 8. Trace Table: Validate max-heap ──
  {
    id: "heaps-trace-validate",
    type: "trace-table",
    topic: "heaps",
    tier: "small",
    title: "Validate: Is This Array a Max-Heap?",
    prompt: "For each of the following 1-indexed arrays, determine whether it satisfies the max-heap property. For each parent-child pair, check that a[k] >= a[2k] and a[k] >= a[2k+1]. Write 'Yes' or 'No' and justify your answer by identifying a violating pair if one exists.",
    inputData: "Array A: [9, 7, 6, 5, 3, 2, 4]\nArray B: [8, 5, 9, 3, 4, 7, 1]\nArray C: [10, 4, 8, 3, 5, 7, 2]",
    table: {
      columns: ["Array", "Max-Heap?", "Justification"],
      rows: 3,
      solution: [
        ["A: [9, 7, 6, 5, 3, 2, 4]", "Yes", "SELF_GRADE"],
        ["B: [8, 5, 9, 3, 4, 7, 1]", "No", "SELF_GRADE"],
        ["C: [10, 4, 8, 3, 5, 7, 2]", "No", "SELF_GRADE"],
      ],
    },
    hints: [
      "A max-heap requires every parent to be >= both its children: a[k] >= a[2k] and a[k] >= a[2k+1] for all valid k.",
      "For Array B: check a[1]=8 vs a[3]=9. Is 8 >= 9? That's a violation at the root.",
      "For Array C: the root a[1]=10 is fine. Check a[2]=4 against its children a[4]=3 and a[5]=5. Is 4 >= 5?",
    ],
    source: "23-24 Q2d (9 marks), Midterm Q2d",
  },
]
