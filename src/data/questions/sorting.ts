import type { ImplementationQuestion, TableTraceQuestion } from '../schema'

export const sortingQuestions: (ImplementationQuestion | TableTraceQuestion)[] = [
  // ═══════════════════════════════════════════════════════════════
  // IMPLEMENTATION QUESTIONS (11)
  // ═══════════════════════════════════════════════════════════════

  // ── 1. Insertion Sort (full) ──
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
      pseudocode: `i++
for(j=i; j>0; j--)
     if (a[j] < a[j-1])
          swap(a[j], a[j-1])`,
    },
    complexity: {
      question: "What is the time complexity of insertion sort in the best, average, and worst case?",
      answer: "Best: O(n) — already sorted. Average and Worst: O(n^2) — reversed array requires ~n^2/2 swaps.",
    },
    source: "21-22 Q1, 21-22 LSA Q1, Midterm Q4",
  },

  // ── 2. Selection Sort (full) ──
  {
    id: "sorting-selection-full",
    type: "implement",
    topic: "sorting",
    tier: "full",
    title: "Selection Sort",
    prompt: "Implement selection sort. The algorithm should sort an array in-place in ascending order by repeatedly finding the minimum element from the unsorted portion and placing it at the beginning.",
    hints: [
      "Function signature: selectionSort(a[], n)",
      "On pass i, find the index of the minimum element in a[i..n-1], then swap it with a[i].",
      "for i = 0 to n-2:\n  minIdx = i\n  for j = i+1 to n-1:\n    if a[j] < a[minIdx]: minIdx = j\n  swap(a[i], a[minIdx])",
    ],
    solutions: {
      pseudocode: `i++
min=i
for(j=i+1; j<N; j++)
     if (a[j] < a[min]) min = j
swap(a[i], a[min])`,
    },
    complexity: {
      question: "What is the time complexity of selection sort? Does it depend on input order?",
      answer: "Always O(n^2) — regardless of input order, we scan the entire unsorted portion on every pass. It is not adaptive. It performs O(n) swaps, which is optimal.",
    },
    source: "21-22 Q1, 21-22 LSA Q1, Midterm Q4",
  },

  // ── 3. MergeSort top-down recursive (full) ──
  {
    id: "sorting-mergesort-topdown-full",
    type: "implement",
    topic: "sorting",
    tier: "full",
    title: "MergeSort (top-down recursive)",
    prompt: "Implement top-down recursive merge sort. Write both the sort function and the merge subroutine. Use an auxiliary array for merging.",
    hints: [
      "Function signatures: mergeSort(a[], aux[], lo, hi) and merge(a[], aux[], lo, mid, hi)",
      "sort: compute mid = lo + (hi - lo) / 2, recursively sort left half and right half, then merge. merge: copy a[lo..hi] into aux, then use two pointers i=lo, j=mid+1 to merge back into a.",
      "merge(a, aux, lo, mid, hi):\n  copy a[lo..hi] to aux[lo..hi]\n  i = lo, j = mid+1\n  for k = lo to hi:\n    if i > mid: a[k] = aux[j++]\n    elif j > hi: a[k] = aux[i++]\n    elif aux[j] < aux[i]: a[k] = aux[j++]\n    else: a[k] = aux[i++]",
    ],
    solutions: {
      pseudocode: `sort(a[], aux[], lo, hi):
     if (hi <= lo) return;
     mid = lo + (hi - lo) / 2;
     sort(a, aux, lo, mid);
     sort(a, aux, mid+1, hi);
     merge(a, aux, lo, mid, hi);

sort(a, aux, 0, a.length-1)

merge(a[], aux[], lo, mid, hi):
     for (k = lo; k <= hi; k++)
          aux[k] = a[k];
     i = lo;
     j = mid+1;
     for (k = lo; k <= hi; k++)
          if (i > mid)              a[k] = aux[j]; j++;
          else if (j > hi)          a[k] = aux[i]; i++;
          else if (aux[j] < aux[i]) a[k] = aux[j]; j++;
          else                      a[k] = aux[i]; i++;`,
    },
    complexity: {
      question: "What is the time and space complexity of top-down merge sort?",
      answer: "Time: O(n log n) in all cases — each level does O(n) work across all merges, and there are log n levels. Space: O(n) for the auxiliary array. It is not in-place.",
    },
    source: "22-23 Q1b, Midterm Q1b, Syllabus",
  },

  // ── 4. Merge subroutine (small) ──
  {
    id: "sorting-merge-small",
    type: "implement",
    topic: "sorting",
    tier: "small",
    title: "Merge Subroutine",
    prompt: "Implement the merge subroutine used in merge sort. Given array a[] and auxiliary array aux[], merge the two sorted halves a[lo..mid] and a[mid+1..hi] into a single sorted sequence in a[lo..hi].",
    hints: [
      "Function signature: merge(a[], aux[], lo, mid, hi)",
      "First copy a[lo..hi] into aux. Then use two read pointers: i starting at lo (left half) and j starting at mid+1 (right half). Write back into a[k] by picking the smaller of aux[i] and aux[j].",
      "Copy a[lo..hi] to aux\ni = lo, j = mid+1\nfor k = lo to hi:\n  if i > mid: a[k] = aux[j++]\n  elif j > hi: a[k] = aux[i++]\n  elif aux[j] < aux[i]: a[k] = aux[j++]\n  else: a[k] = aux[i++]",
    ],
    solutions: {
      pseudocode: `merge(a[], aux[], lo, mid, hi):
     for (k = lo; k <= hi; k++)
          aux[k] = a[k];
     i = lo;
     j = mid+1;
     for (k = lo; k <= hi; k++)
          if (i > mid)              a[k] = aux[j]; j++;
          else if (j > hi)          a[k] = aux[i]; i++;
          else if (aux[j] < aux[i]) a[k] = aux[j]; j++;
          else                      a[k] = aux[i]; i++;`,
    },
    complexity: {
      question: "What is the time and space complexity of the merge subroutine?",
      answer: "Time: O(n) where n = hi - lo + 1 — each element is copied once and written back once. Space: O(n) for the auxiliary array (allocated once and reused across all merges).",
    },
    source: "Syllabus; underpins 22-23 Q1b trace",
  },

  // ── 5. MergeSort bottom-up iterative (full) ──
  {
    id: "sorting-mergesort-bottomup-full",
    type: "implement",
    topic: "sorting",
    tier: "full",
    title: "MergeSort (bottom-up iterative)",
    prompt: "Implement bottom-up (iterative) merge sort. Instead of recursion, merge subarrays of width 1, then 2, then 4, etc., doubling the width each pass until the entire array is sorted.",
    hints: [
      "Function signature: mergeSortBU(a[], n). Reuse the same merge(a, aux, lo, mid, hi) subroutine.",
      "Outer loop: width = 1, 2, 4, ... while width < n. Inner loop: for lo = 0; lo < n - width; lo += 2*width. Compute mid = lo + width - 1 and hi = min(lo + 2*width - 1, n - 1).",
      "width = 1\nwhile width < n:\n  for lo = 0; lo < n - width; lo += 2*width:\n    mid = lo + width - 1\n    hi = min(lo + 2*width - 1, n - 1)\n    merge(a, aux, lo, mid, hi)\n  width = width * 2",
    ],
    solutions: {
      pseudocode: `function mergeSortBU(a[], n):
  aux = new array of size n
  width = 1
  while width < n:
    for lo = 0; lo < n - width; lo = lo + 2*width:
      mid = lo + width - 1
      hi = min(lo + 2*width - 1, n - 1)
      merge(a, aux, lo, mid, hi)
    width = width * 2`,
    },
    complexity: {
      question: "What is the time and space complexity of bottom-up merge sort? How does it compare to top-down?",
      answer: "Time: O(n log n) — same as top-down. There are log n passes (width doubles each time), each doing O(n) work across all merges. Space: O(n) for the auxiliary array. The key difference: bottom-up avoids recursion overhead and is slightly simpler to implement.",
    },
    source: "21-22 Practice Q1b (verbatim pseudocode ask)",
  },

  // ── 6. QuickSort recursive (full) ──
  {
    id: "sorting-quicksort-full",
    type: "implement",
    topic: "sorting",
    tier: "full",
    title: "QuickSort (recursive)",
    prompt: "Implement recursive QuickSort using the leftmost element as pivot. Write both the quickSort driver and the partition subroutine.",
    hints: [
      "Function signatures: quickSort(a[], lo, hi) and partition(a[], lo, hi) → int",
      "quickSort: if hi <= lo return. Partition to get pivot index j. Recursively sort a[lo..j-1] and a[j+1..hi]. partition: use a[lo] as pivot. Scan i from left, j from right, swap when they stop, place pivot at j.",
      "partition: pivot = a[lo], i = lo, j = hi+1\nloop: i++ while a[i] < pivot; j-- while a[j] > pivot; if i >= j break; swap(a[i], a[j])\nswap(a[lo], a[j]); return j",
    ],
    solutions: {
      pseudocode: `sort(a[], lo, hi):
     if (hi <= lo) return;
     j = partition(a, lo, hi);
     sort(a, lo, j-1);
     sort(a, j+1, hi);

randomShuffle(a);
sort(a, 0, a.length-1);

partition(a[], lo, hi):
     i = lo;
     j = hi+1;
     p = a[lo]
     while (true)
          while (a[++i] < p)
               if (i == hi) break;
          while (p < a[--j])
               if (j == lo) break;
          if (i >= j) break;
          swap(a[i], a[j]);
     swap(a[lo], a[j]);
     return j;`,
    },
    complexity: {
      question: "What is the time complexity of QuickSort in the best, average, and worst case? When does the worst case occur?",
      answer: "Best and Average: O(n log n) — balanced partitions give log n levels of O(n) work. Worst: O(n^2) — occurs when the array is already sorted or reverse-sorted (pivot is always the extreme element, giving one empty partition). Space: O(log n) average for the recursion stack, O(n) worst case.",
    },
    source: "22-23 Q1a (15 marks), Midterm Q1a",
  },

  // ── 7. QuickSort partition single-scan (small) ──
  {
    id: "sorting-partition-single-small",
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
      pseudocode: `partition(a[], lo, hi):
     i = lo;
     j = hi+1;
     p = a[lo]
     while (true)
          while (a[++i] < p)
               if (i == hi) break;
          while (p < a[--j])
               if (j == lo) break;
          if (i >= j) break;
          swap(a[i], a[j]);
     swap(a[lo], a[j]);
     return j;`,
    },
    complexity: {
      question: "What is the time complexity of the partition subroutine?",
      answer: "O(n) — linear scan across the subarray. Each element is compared to the pivot at most once.",
    },
    source: "Syllabus; exam calls partition() generically",
  },

  // ── 8. QuickSort partition two-pointer (small) ──
  {
    id: "sorting-partition-twoptr-small",
    type: "implement",
    topic: "sorting",
    tier: "small",
    title: "QuickSort Partition (two-pointer / Lomuto)",
    prompt: "Implement the Lomuto partition scheme for QuickSort. Use a[hi] as the pivot. Maintain a boundary pointer i such that a[lo..i] <= pivot. Return the final pivot index.",
    hints: [
      "Function signature: partition(a[], lo, hi) → int",
      "Use a[hi] as pivot. Keep pointer i = lo - 1 (boundary of the 'small' region). Scan j from lo to hi - 1: if a[j] <= pivot, increment i and swap a[i] with a[j]. Finally swap a[i+1] with a[hi].",
      "pivot = a[hi]\ni = lo - 1\nfor j = lo to hi - 1:\n  if a[j] <= pivot:\n    i = i + 1\n    swap(a[i], a[j])\nswap(a[i+1], a[hi])\nreturn i + 1",
    ],
    solutions: {
      pseudocode: `function partition(a[], lo, hi):
  pivot = a[hi]
  i = lo - 1
  for j = lo to hi - 1:
    if a[j] <= pivot:
      i = i + 1
      swap(a[i], a[j])
  swap(a[i + 1], a[hi])
  return i + 1`,
    },
    complexity: {
      question: "How does Lomuto partition compare to Hoare's two-pointer partition?",
      answer: "Both are O(n). Lomuto uses a[hi] as pivot and does ~n comparisons and up to n swaps. Hoare's (two-pointer from both ends) does ~n/2 swaps on average, making it faster in practice. Lomuto is simpler to implement but performs more swaps, especially on arrays with many duplicates.",
    },
    source: "Syllabus; alternative partition implementation",
  },

  // ── 9. Iterative QuickSort with explicit stack (exam) ──
  {
    id: "sorting-quicksort-iterative-exam",
    type: "implement",
    topic: "sorting",
    tier: "exam",
    title: "Iterative QuickSort with Explicit Stack",
    prompt: "Implement QuickSort iteratively using an explicit stack instead of recursion. Push subarray bounds (lo, hi) onto the stack. To guarantee O(log n) stack space, always push the larger partition first (process the smaller one first).",
    hints: [
      "Function signature: quickSortIterative(a[], n). Use a stack of (lo, hi) pairs.",
      "Push (0, n-1) onto the stack. While the stack is not empty: pop (lo, hi), partition to get j, then push the LARGER subarray first and the SMALLER subarray second (so the smaller is processed first). This ensures the stack never exceeds O(log n) depth.",
      "stack.push((0, n-1))\nwhile stack is not empty:\n  (lo, hi) = stack.pop()\n  if hi <= lo: continue\n  j = partition(a, lo, hi)\n  // push larger partition first\n  if (j - lo) > (hi - j):\n    stack.push((lo, j-1))\n    stack.push((j+1, hi))\n  else:\n    stack.push((j+1, hi))\n    stack.push((lo, j-1))",
    ],
    solutions: {
      pseudocode: `function quickSortIterative(a[], n):
  stack = new Stack()
  stack.push((0, n - 1))
  while not stack.isEmpty():
    (lo, hi) = stack.pop()
    if hi <= lo:
      continue
    j = partition(a, lo, hi)
    // push larger partition first (processed last)
    // so smaller partition is processed first → O(log n) stack
    if (j - lo) > (hi - j):
      stack.push((lo, j - 1))
      stack.push((j + 1, hi))
    else:
      stack.push((j + 1, hi))
      stack.push((lo, j - 1))`,
    },
    complexity: {
      question: "Why does pushing the larger partition first guarantee O(log n) stack space?",
      answer: "By always processing the smaller partition first (popping it next), the smaller partition is fully sorted before the larger one is touched. The larger partition waiting on the stack is at most n/2 the size of its parent. Each level of the stack holds one such 'waiting' partition, and since each is at most half the previous, there can be at most log n levels on the stack at any time.",
    },
    source: "21-22 LSA Q1b (10 marks, verbatim)",
  },

  // ── 10. HeapSort (full) ──
  {
    id: "sorting-heapsort-full",
    type: "implement",
    topic: "sorting",
    tier: "full",
    title: "HeapSort",
    prompt: "Implement heap sort using a 1-indexed max-heap in-place. Phase 1: build the max-heap by calling bubble-down from n/2 down to 1. Phase 2: repeatedly swap the root (max) with the last unsorted element and bubble-down to restore the heap.",
    hints: [
      "Function signatures: heapSort(a[], n) and bubbleDown(a[], k, n). Use 1-indexed array (a[1] to a[n]).",
      "Build phase: for k = n/2 down to 1, call bubbleDown(a, k, n). Sort-down phase: while n > 1, swap a[1] with a[n], decrement n, bubbleDown(a, 1, n). bubble-down: compare a[k] with its larger child a[2k] or a[2k+1], swap down if needed.",
      "bubbleDown(a, k, n):\n  while 2*k <= n:\n    j = 2*k\n    if j < n and a[j] < a[j+1]: j++\n    if a[k] >= a[j]: break\n    swap(a[k], a[j])\n    k = j",
    ],
    solutions: {
      pseudocode: `function heapSort(a[], n):
  // Phase 1: build max-heap (1-indexed)
  for k = n/2 down to 1:
    bubbleDown(a, k, n)
  // Phase 2: sort-down
  while n > 1:
    swap(a[1], a[n])
    n = n - 1
    bubbleDown(a, 1, n)

function bubbleDown(a[], k, n):
  while 2*k <= n:
    j = 2*k
    if j < n and a[j] < a[j+1]:
      j = j + 1
    if a[k] >= a[j]:
      break
    swap(a[k], a[j])
    k = j`,
    },
    complexity: {
      question: "What is the time complexity of heap sort? What makes the build phase O(n) rather than O(n log n)?",
      answer: "Overall: O(n log n). Build phase: O(n) — most nodes are near the bottom and bubble-down a short distance. Formally, sum of (n/2^(h+1)) * O(h) for h = 0 to log n converges to O(n). Sort-down phase: O(n log n) — n extractions each requiring O(log n) bubble-down. Space: O(1) — in-place.",
    },
    source: "18-19 Q4f, 21-22 LSA Q2b, 21-22 Practice Q1a",
  },

  // ── 11. Recursive → iterative conversion pattern (full) ──
  {
    id: "sorting-recursive-to-iterative-full",
    type: "implement",
    topic: "sorting",
    tier: "full",
    title: "Recursive to Iterative Conversion Pattern",
    prompt: "Demonstrate the general pattern for converting a recursive algorithm into an iterative one using an explicit stack. Show both the generic pattern and apply it to a concrete example (e.g., converting recursive QuickSort to iterative).",
    hints: [
      "The key idea: replace the call stack with an explicit data structure (usually a stack). Each 'frame' on the stack holds the arguments that would have been passed to the recursive call.",
      "Generic pattern: (1) Create a stack. (2) Push initial arguments. (3) While stack not empty: pop arguments, do the non-recursive work, push new sub-problems (in reverse order so the first sub-problem is processed first).",
      "For QuickSort:\nRecursive: qsort(lo, hi) → partition → qsort(lo, j-1), qsort(j+1, hi)\nIterative: push (lo, hi) → pop → partition → push (j+1, hi), push (lo, j-1)",
    ],
    solutions: {
      pseudocode: `// ── Generic pattern ──
// Given a recursive function:
//   function solve(args):
//     if base_case(args): return
//     [do work]
//     solve(sub_args_1)
//     solve(sub_args_2)
//
// Convert to iterative:
function solveIterative(initial_args):
  stack = new Stack()
  stack.push(initial_args)
  while not stack.isEmpty():
    args = stack.pop()
    if base_case(args):
      continue
    [do work]
    stack.push(sub_args_2)   // pushed first, processed last
    stack.push(sub_args_1)   // pushed second, processed first

// ── Concrete example: QuickSort ──
function quickSortIterative(a[], n):
  stack = new Stack()
  stack.push((0, n - 1))
  while not stack.isEmpty():
    (lo, hi) = stack.pop()
    if hi <= lo:
      continue
    j = partition(a, lo, hi)
    stack.push((j + 1, hi))   // right half (pushed first)
    stack.push((lo, j - 1))   // left half (pushed second, processed first)`,
    },
    complexity: {
      question: "What are the trade-offs of iterative vs recursive implementations?",
      answer: "Iterative avoids stack overflow risk on deep recursion (e.g., QuickSort worst case O(n) deep). With the 'smaller partition first' optimisation, iterative QuickSort guarantees O(log n) stack space. Recursive versions are typically cleaner and easier to reason about. Iterative versions give explicit control over memory usage. Both have the same time complexity.",
    },
    source: "21-22 LSA Q1b, Practice Q1b, 2019 Q2",
  },

  // ═══════════════════════════════════════════════════════════════
  // CONCEPTUAL QUESTIONS (1)
  // ═══════════════════════════════════════════════════════════════

  // ── 12. 3-way partition / Dutch National Flag (conceptual) ──
  {
    id: "sorting-3way-partition-conceptual",
    type: "implement",
    topic: "sorting",
    tier: "conceptual",
    title: "3-Way Partition / Dutch National Flag",
    prompt: "Explain the 3-way partition (Dutch National Flag) algorithm. How does it partition an array into three regions (less than, equal to, greater than the pivot)? Why is it useful for arrays with many duplicate keys? What is its time complexity?",
    hints: [
      "Think of three regions: elements < pivot on the left, elements == pivot in the middle, elements > pivot on the right. You need three pointers to maintain these boundaries.",
      "The three pointers: lt (less-than boundary), i (current scanner), gt (greater-than boundary). Invariant: a[lo..lt-1] < pivot, a[lt..i-1] == pivot, a[gt+1..hi] > pivot.",
      "Start: lt = lo, i = lo, gt = hi, pivot = a[lo].\nIf a[i] < pivot: swap a[lt], a[i]; lt++; i++\nIf a[i] == pivot: i++\nIf a[i] > pivot: swap a[i], a[gt]; gt--\nStop when i > gt.",
    ],
    solutions: {
      pseudocode: `The 3-way partition (Dutch National Flag problem, Dijkstra) partitions an
array into three regions around a pivot value v:
  - a[lo..lt-1]   : elements < v
  - a[lt..gt]      : elements == v
  - a[gt+1..hi]    : elements > v

Algorithm:
  lt = lo, i = lo, gt = hi
  pivot = a[lo]
  while i <= gt:
    if a[i] < pivot:    swap(a[lt], a[i]); lt++; i++
    else if a[i] > pivot: swap(a[i], a[gt]); gt--
    else:               i++

Why it helps with duplicates:
Standard 2-way partition puts one pivot in its final position per call.
If the array has many duplicates, those equal elements still get recursed
into. 3-way partition groups ALL elements equal to the pivot in the middle
— they are excluded from further recursion. This makes 3-way QuickSort
linear O(n) on arrays where every element is the same, and O(n log n) in
general. Entropy-optimal: proportional to the Shannon entropy of the
key distribution.

Time complexity: O(n) for a single partition pass (each element is
examined at most once — i only moves right, gt only moves left).`,
    },
    complexity: {
      question: "",
      answer: "",
    },
    source: "Syllabus; never examined as pseudocode, conceptual only",
  },

  // ═══════════════════════════════════════════════════════════════
  // TRACE TABLE QUESTIONS (7)
  // ═══════════════════════════════════════════════════════════════

  // ── 13. Insertion Sort trace ──
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

  // ── 14. Selection Sort trace ──
  {
    id: "sorting-trace-selection",
    type: "trace-table",
    topic: "sorting",
    tier: "small",
    title: "Selection Sort Trace",
    prompt: "Trace selection sort on the array [5, 3, 8, 1, 2]. For each pass, show the minimum element selected from the unsorted portion, and the array state after the swap.",
    inputData: "[5, 3, 8, 1, 2]",
    table: {
      columns: ["Pass", "Min Selected", "Array State"],
      rows: 5,
      solution: [
        ["0", "-", "5, 3, 8, 1, 2"],
        ["1", "1", "1, 3, 8, 5, 2"],
        ["2", "2", "1, 2, 8, 5, 3"],
        ["3", "3", "1, 2, 3, 5, 8"],
        ["4", "5", "1, 2, 3, 5, 8"],
      ],
    },
    hints: [
      "On each pass, scan the unsorted portion (from position i to the end) to find the minimum.",
      "Pass 1: unsorted = [5,3,8,1,2]. Min is 1 at index 3. Swap a[0] and a[3].",
      "Pass 2: unsorted = [3,8,5,2]. Min is 2 at index 4. Swap a[1] and a[4].",
    ],
    source: "21-22 Q1a, 21-22 LSA Q1a",
  },

  // ── 15. MergeSort recursive call sequence trace ──
  {
    id: "sorting-trace-mergesort-calls",
    type: "trace-table",
    topic: "sorting",
    tier: "full",
    title: "MergeSort Recursive Call Sequence",
    prompt: "Trace the recursive call sequence of top-down MergeSort on the array [38, 27, 43, 3, 9, 82, 10]. Show each call to sort(lo, hi) and merge(lo, mid, hi) in the order they execute. Also show the array state after each merge.",
    inputData: "[38, 27, 43, 3, 9, 82, 10]",
    table: {
      columns: ["Step", "Operation", "Array After"],
      rows: 11,
      solution: [
        ["1", "sort(0,6)", "38, 27, 43, 3, 9, 82, 10"],
        ["2", "sort(0,3)", "38, 27, 43, 3, 9, 82, 10"],
        ["3", "sort(0,1)", "38, 27, 43, 3, 9, 82, 10"],
        ["4", "merge(0,0,1)", "27, 38, 43, 3, 9, 82, 10"],
        ["5", "sort(2,3)", "27, 38, 43, 3, 9, 82, 10"],
        ["6", "merge(2,2,3)", "27, 38, 3, 43, 9, 82, 10"],
        ["7", "merge(0,1,3)", "3, 27, 38, 43, 9, 82, 10"],
        ["8", "sort(4,6)", "3, 27, 38, 43, 9, 82, 10"],
        ["9", "sort(4,5)", "3, 27, 38, 43, 9, 82, 10"],
        ["10", "merge(4,4,5)", "3, 27, 38, 43, 9, 82, 10"],
        ["11", "merge(4,5,6)", "3, 27, 38, 43, 9, 10, 82"],
      ],
    },
    hints: [
      "Top-down MergeSort processes left subtree fully before right subtree. sort(0,6) splits into sort(0,3) and sort(4,6).",
      "sort(0,3) splits into sort(0,1) and sort(2,3). sort(0,1) splits into sort(0,0) and sort(1,1) — both base cases — then merge(0,0,1).",
      "After all left-side merges complete with merge(0,1,3), the right side sort(4,6) begins.",
    ],
    source: "22-23 Q1b (10 marks), Midterm Q1b",
  },

  // ── 16. QuickSort partition trace ──
  {
    id: "sorting-trace-quicksort-partition",
    type: "trace-table",
    topic: "sorting",
    tier: "full",
    title: "QuickSort Partition Trace",
    prompt: "Trace the partition subroutine (Hoare-style, two-pointer scan) on the array [7, 2, 1, 6, 8, 5, 3, 4] with pivot = a[0] = 7. Show the pointer positions and array state after each swap.",
    inputData: "[7, 2, 1, 6, 8, 5, 3, 4]",
    table: {
      columns: ["Step", "i", "j", "Action", "Array State"],
      rows: 5,
      solution: [
        ["0", "-", "-", "Start, pivot = 7", "7, 2, 1, 6, 8, 5, 3, 4"],
        ["1", "4", "7", "a[4]=8 >= 7, a[7]=4 <= 7, swap", "7, 2, 1, 6, 4, 5, 3, 8"],
        ["2", "7", "6", "a[7]=8 >= 7, a[6]=3 <= 7, i > j, stop", "7, 2, 1, 6, 4, 5, 3, 8"],
        ["3", "-", "6", "Swap pivot a[0] with a[j=6]", "3, 2, 1, 6, 4, 5, 7, 8"],
        ["4", "-", "-", "Pivot 7 at index 6", "3, 2, 1, 6, 4, 5, 7, 8"],
      ],
    },
    hints: [
      "Pivot = a[0] = 7. i starts at index 0 (will increment to 1 first), j starts at index 8 (will decrement first). i scans right for elements >= pivot, j scans left for elements <= pivot.",
      "First scan: i moves right past 2,1,6 (all < 7) and stops at index 4 (a[4]=8). j moves left and stops at index 7 (a[7]=4). Since i < j, swap them.",
      "Second scan: i moves from 5 past 5,3 (both < 7) and stops at index 7 (a[7]=8). j moves from 6 and stops at index 6 (a[6]=3). Since i > j, stop. Place pivot by swapping a[0] with a[j=6].",
    ],
    source: "22-23 Q1a (15 marks), Midterm Q1a",
  },

  // ── 17. HeapSort trace (build + sort-down) ──
  {
    id: "sorting-trace-heapsort",
    type: "trace-table",
    topic: "sorting",
    tier: "full",
    title: "HeapSort Trace (Build + Sort-down)",
    prompt: "Trace heap sort on the array [4, 10, 3, 5, 1] (1-indexed: a[1]=4, a[2]=10, a[3]=3, a[4]=5, a[5]=1). Show the array state after each bubble-down during the build phase, and after each swap+bubble-down during the sort-down phase.",
    inputData: "[_, 4, 10, 3, 5, 1] (1-indexed)",
    table: {
      columns: ["Phase", "Operation", "Array State (1-indexed)"],
      rows: 7,
      solution: [
        ["Build", "Initial", "4, 10, 3, 5, 1"],
        ["Build", "bubble-down(2): 10 > children, no change", "4, 10, 3, 5, 1"],
        ["Build", "bubble-down(1): swap 4↔10, then swap 4↔5", "10, 5, 3, 4, 1"],
        ["Sort", "swap a[1]↔a[5], bubble-down(1) in n=4", "5, 4, 3, 1, | 10"],
        ["Sort", "swap a[1]↔a[4], bubble-down(1) in n=3", "4, 1, 3, | 5, 10"],
        ["Sort", "swap a[1]↔a[3], bubble-down(1) in n=2", "3, 1, | 4, 5, 10"],
        ["Sort", "swap a[1]↔a[2], done", "1, | 3, 4, 5, 10"],
      ],
    },
    hints: [
      "Build phase: bubble-down from n/2 = 2 down to 1. bubble-down(2): a[2]=10, children a[4]=5, a[5]=1. 10 is already >= both, no swap.",
      "bubble-down(1): a[1]=4, children a[2]=10, a[3]=3. Larger child is 10 at index 2. Swap 4↔10 → [10,4,3,5,1]. Now bubble-down position 2: children a[4]=5, a[5]=1. Larger child is 5 at index 4. Swap 4↔5 → [10,5,3,4,1].",
      "Sort-down: swap root 10 with last element 1 → [1,5,3,4,10]. Reduce n to 4. bubble-down(1): 1 vs children 5,3 → swap with 5 → [5,1,3,4,10]. Then 1 vs child 4 → swap → [5,4,3,1,10].",
    ],
    source: "21-22 Practice Q1a (10 marks)",
  },

  // ── 18. LSD radix sort trace ──
  {
    id: "sorting-trace-lsd-radix",
    type: "trace-table",
    topic: "sorting",
    tier: "full",
    title: "LSD Radix Sort Trace",
    prompt: "Trace LSD (Least Significant Digit) radix sort on the following 3-digit integers: [170, 045, 075, 090, 002, 024, 802, 066]. Show the array after each pass (sorting by ones digit, then tens, then hundreds).",
    inputData: "[170, 045, 075, 090, 002, 024, 802, 066]",
    table: {
      columns: ["Pass", "Digit Position", "Array State"],
      rows: 4,
      solution: [
        ["0", "Initial", "170, 045, 075, 090, 002, 024, 802, 066"],
        ["1", "Ones (d=0)", "170, 090, 002, 802, 024, 045, 075, 066"],
        ["2", "Tens (d=1)", "002, 802, 024, 045, 066, 170, 075, 090"],
        ["3", "Hundreds (d=2)", "002, 024, 045, 066, 075, 090, 170, 802"],
      ],
    },
    hints: [
      "LSD radix sort processes digits from least significant to most significant. Each pass uses a stable sort (counting sort) on one digit position.",
      "Pass 1 (ones digit): Group by last digit: 0→[170,090], 2→[002,802], 4→[024], 5→[045,075], 6→[066]. Concatenate in order.",
      "Pass 2 (tens digit): Group by middle digit from the pass-1 result. Stability preserves the ones-digit ordering within each group. Pass 3 completes the sort.",
    ],
    source: "21-22 LSA Q4a (9 marks)",
  },

  // ── 19. "Which sort produced this?" ──
  {
    id: "sorting-trace-identify-exam",
    type: "trace-table",
    topic: "sorting",
    tier: "exam",
    title: "Which Sort Produced This?",
    prompt: "The original array is [5, 3, 8, 1, 2, 7, 4, 6]. After exactly 3 passes of a comparison-based sorting algorithm, the array is in the state shown below. Identify which sorting algorithm produced each intermediate state. Justify your answer.",
    inputData: "Original: [5, 3, 8, 1, 2, 7, 4, 6]",
    table: {
      columns: ["State After 3 Passes", "Algorithm", "Justification"],
      rows: 3,
      solution: [
        ["1, 2, 3, 8, 5, 7, 4, 6", "SELF_GRADE", "SELF_GRADE"],
        ["1, 3, 5, 8, 2, 7, 4, 6", "SELF_GRADE", "SELF_GRADE"],
        ["2, 3, 5, 8, 1, 7, 4, 6", "SELF_GRADE", "SELF_GRADE"],
      ],
    },
    hints: [
      "Selection sort after k passes: the first k elements are the k smallest in sorted order, the rest are in their original relative positions (among the unsorted). Insertion sort after k passes: the first k+1 elements are sorted among themselves, but they are the original first k+1 elements (not necessarily the overall smallest).",
      "State [1,2,3,8,5,7,4,6]: the first 3 elements are the 3 globally smallest → Selection Sort. State [1,3,5,8,2,7,4,6]: the first 4 elements (original a[0..3] = 5,3,8,1) are sorted among themselves → Insertion Sort.",
      "State [2,3,5,8,1,7,4,6]: the first 4 elements are sorted but 2 is not the global minimum (1 is at index 4) — so it cannot be selection sort. The set {2,3,5,8} is exactly {a[0..3]} rearranged → this could be insertion sort on a different starting array, or a partial merge sort result. Examine carefully which algorithm's invariant matches.",
    ],
    source: "21-22 Q1a, 21-22 LSA Q1a, Midterm Q4a (15 marks each)",
  },
]
