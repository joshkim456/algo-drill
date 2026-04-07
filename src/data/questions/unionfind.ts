import type { ImplementationQuestion, TableTraceQuestion } from '../schema'

export const unionFindQuestions: (ImplementationQuestion | TableTraceQuestion)[] = [
  // ── Implementation: Weighted Quick-Union ──
  {
    id: "unionfind-weighted-qu-full",
    type: "implement",
    topic: "unionfind",
    tier: "full",
    title: "Weighted Quick-Union",
    prompt: "Implement weighted quick-union with union and find operations. Use a parent[] array and a size[] array to always attach the smaller tree under the larger tree.",
    hints: [
      "Function signatures: find(parent[], i) → root, union(parent[], size[], p, q)",
      "find: follow parent links until parent[i] == i. union: find roots of p and q, attach smaller tree under larger.",
      "find: while parent[i] != i: i = parent[i]; return i\nunion: rootP = find(p), rootQ = find(q); if rootP == rootQ: return; if size[rootP] < size[rootQ]: parent[rootP] = rootQ; size[rootQ] += size[rootP]; else: parent[rootQ] = rootP; size[rootP] += size[rootQ]",
    ],
    solutions: {
      pseudocode: `function find(parent[], i):
  while parent[i] != i:
    i = parent[i]
  return i

function union(parent[], size[], p, q):
  rootP = find(parent, p)
  rootQ = find(parent, q)
  if rootP == rootQ:
    return
  if size[rootP] < size[rootQ]:
    parent[rootP] = rootQ
    size[rootQ] = size[rootQ] + size[rootP]
  else:
    parent[rootQ] = rootP
    size[rootP] = size[rootP] + size[rootQ]`,
      python: `def find(parent: list[int], i: int) -> int:
    while parent[i] != i:
        i = parent[i]
    return i

def union(parent: list[int], size: list[int], p: int, q: int) -> None:
    root_p = find(parent, p)
    root_q = find(parent, q)
    if root_p == root_q:
        return
    if size[root_p] < size[root_q]:
        parent[root_p] = root_q
        size[root_q] += size[root_p]
    else:
        parent[root_q] = root_p
        size[root_p] += size[root_q]`,
    },
    complexity: {
      question: "What is the time complexity of find and union in weighted quick-union?",
      answer: "find: O(log n) — tree height is at most log2(n). union: O(log n) — dominated by two find calls. With path compression, amortised nearly O(1) per operation.",
    },
    source: "Required for Kruskal; 23-24 Q3b cost table",
  },

  // ── Conceptual: Quick-Find ──
  {
    id: "unionfind-quick-find-conceptual",
    type: "implement",
    topic: "unionfind",
    tier: "conceptual",
    title: "Quick-Find",
    prompt: "Explain the quick-find approach to union-find. Describe the data structure, how find and union work, and state the time complexity of each operation. Why is quick-find impractical for large inputs?",
    hints: [
      "Think about what the id[] array stores: id[i] is the component identifier for element i. Two elements are connected iff they have the same id.",
      "find is trivial — just return id[i]. But what does union have to do to merge two components?",
      "union(p, q) must scan the entire id[] array and change every entry equal to id[p] to id[q] (or vice versa). That's O(N) per union call.",
    ],
    solutions: {
      pseudocode: `Quick-find maintains an id[] array where id[i] is the component identifier for element i.

find(i): return id[i]  →  O(1), just an array access.

union(p, q):
  - Let pid = id[p], qid = id[q].
  - Scan the entire id[] array: for every index i where id[i] == pid, set id[i] = qid.
  - This is O(N) because it touches every element.

connected(p, q): return id[p] == id[q]  →  O(1).

Example: id = [0, 1, 2, 3, 4]
  union(3, 4): scan array, change all 3s to 4 → id = [0, 1, 2, 4, 4]
  union(0, 3): scan array, change all 0s to 4 → id = [4, 1, 2, 4, 4]

Why impractical: N union operations on N objects costs O(N²) total. For 10⁹ objects, this is far too slow. Quick-find has fast find but unacceptably slow union.`,
      python: `Quick-find maintains an id[] array where id[i] is the component identifier for element i.

find(i): return id[i]  →  O(1), just an array access.

union(p, q):
  - Let pid = id[p], qid = id[q].
  - Scan the entire id[] array: for every index i where id[i] == pid, set id[i] = qid.
  - This is O(N) because it touches every element.

connected(p, q): return id[p] == id[q]  →  O(1).

Example: id = [0, 1, 2, 3, 4]
  union(3, 4): scan array, change all 3s to 4 → id = [0, 1, 2, 4, 4]
  union(0, 3): scan array, change all 0s to 4 → id = [4, 1, 2, 4, 4]

Why impractical: N union operations on N objects costs O(N²) total. For 10⁹ objects, this is far too slow. Quick-find has fast find but unacceptably slow union.`,
    },
    complexity: {
      question: "",
      answer: "",
    },
    source: "Never standalone; baseline for understanding weighted QU",
  },

  // ── Conceptual: Quick-Union ──
  {
    id: "unionfind-quick-union-conceptual",
    type: "implement",
    topic: "unionfind",
    tier: "conceptual",
    title: "Quick-Union",
    prompt: "Explain the quick-union approach to union-find. Describe the parent[] tree structure, how find and union work, and explain why quick-union can degrade to O(N) per operation. What causes this worst case?",
    hints: [
      "parent[i] stores the parent of element i. The root of a tree satisfies parent[r] == r. find chases parent pointers up to the root.",
      "union(p, q) just sets the root of p's tree to point to the root of q's tree — one link change, but find is the bottleneck.",
      "The worst case happens when unions always create a tall, skinny tree (like a linked list). e.g., union(0,1), union(1,2), union(2,3),... creates a chain of depth N.",
    ],
    solutions: {
      pseudocode: `Quick-union uses a parent[] array representing a forest of trees. parent[i] is the parent of i; roots satisfy parent[r] == r.

find(i): chase parent pointers until parent[i] == i → return i.
  while parent[i] != i: i = parent[i]
  This is O(tree height).

union(p, q):
  rootP = find(p)
  rootQ = find(q)
  parent[rootP] = rootQ   ← just one link change, O(1) after find
  Total: O(tree height) due to the two find calls.

connected(p, q): return find(p) == find(q).

Why it degrades:
  There is no guarantee that trees stay balanced. If you union in a bad order, trees can become tall and skinny — essentially linked lists.

  Example (worst case): starting from parent = [0, 1, 2, 3, 4]
    union(0, 1): parent = [1, 1, 2, 3, 4]    tree: 0→1
    union(1, 2): parent = [1, 2, 2, 3, 4]    tree: 0→1→2
    union(2, 3): parent = [1, 2, 3, 3, 4]    tree: 0→1→2→3
    union(3, 4): parent = [1, 2, 3, 4, 4]    tree: 0→1→2→3→4

  Now find(0) must follow 4 pointers — O(N). N find operations costs O(N²).
  This is what motivates weighted quick-union: always attach the smaller tree under the larger one.`,
      python: `Quick-union uses a parent[] array representing a forest of trees. parent[i] is the parent of i; roots satisfy parent[r] == r.

find(i): chase parent pointers until parent[i] == i → return i.
  while parent[i] != i: i = parent[i]
  This is O(tree height).

union(p, q):
  rootP = find(p)
  rootQ = find(q)
  parent[rootP] = rootQ   ← just one link change, O(1) after find
  Total: O(tree height) due to the two find calls.

connected(p, q): return find(p) == find(q).

Why it degrades:
  There is no guarantee that trees stay balanced. If you union in a bad order, trees can become tall and skinny — essentially linked lists.

  Example (worst case): starting from parent = [0, 1, 2, 3, 4]
    union(0, 1): parent = [1, 1, 2, 3, 4]    tree: 0→1
    union(1, 2): parent = [1, 2, 2, 3, 4]    tree: 0→1→2
    union(2, 3): parent = [1, 2, 3, 3, 4]    tree: 0→1→2→3
    union(3, 4): parent = [1, 2, 3, 4, 4]    tree: 0→1→2→3→4

  Now find(0) must follow 4 pointers — O(N). N find operations costs O(N²).
  This is what motivates weighted quick-union: always attach the smaller tree under the larger one.`,
    },
    complexity: {
      question: "",
      answer: "",
    },
    source: "Never standalone; motivates weighting in weighted QU",
  },

  // ── Conceptual: Weighted QU + Path Compression ──
  {
    id: "unionfind-wqu-path-compression-conceptual",
    type: "implement",
    topic: "unionfind",
    tier: "conceptual",
    title: "Weighted QU + Path Compression",
    prompt: "Explain path compression as a modification to weighted quick-union. What change is made to the find operation? What is the resulting amortised time complexity, and why does this matter for Kruskal's algorithm?",
    hints: [
      "Path compression modifies find so that every node visited on the way to the root ends up pointing closer to (or directly at) the root.",
      "Two variants: full path compression (two-pass: find root, then set every node's parent to root) and one-pass halving (parent[i] = parent[parent[i]] during the chase).",
      "With both weighting and path compression, M union-find operations on N objects takes O(N + M α(N)) where α is the inverse Ackermann function — effectively O(1) amortised per operation.",
    ],
    solutions: {
      pseudocode: `Path compression modifies the find operation so that trees become nearly flat over time.

Two-pass path compression (full):
  find(i):
    root = i
    while parent[root] != root: root = parent[root]    ← find the root
    while parent[i] != root:                             ← second pass: point everything to root
      next = parent[i]
      parent[i] = root
      i = next
    return root

One-pass path halving (simpler, same asymptotic bound):
  find(i):
    while parent[i] != i:
      parent[i] = parent[parent[i]]    ← make every other node point to its grandparent
      i = parent[i]
    return root

Effect: after find(i), every node on the path from i to root has its parent set to root (or grandparent). Subsequent finds on the same nodes are O(1).

Amortised complexity:
  With weighted union + path compression, M union-find operations on N objects takes O(N + M·α(N)), where α is the inverse Ackermann function. α(N) ≤ 5 for any physically possible N, so this is effectively O(1) amortised per operation.

Why it matters for Kruskal:
  Kruskal's processes E edges, each requiring a find + possibly a union. Without path compression, this is O(E log V). With path compression, it's O(E·α(V)) ≈ O(E), making union-find essentially free — Kruskal's bottleneck becomes the initial sort of edges at O(E log E).`,
      python: `Path compression modifies the find operation so that trees become nearly flat over time.

Two-pass path compression (full):
  find(i):
    root = i
    while parent[root] != root: root = parent[root]    ← find the root
    while parent[i] != root:                             ← second pass: point everything to root
      next = parent[i]
      parent[i] = root
      i = next
    return root

One-pass path halving (simpler, same asymptotic bound):
  find(i):
    while parent[i] != i:
      parent[i] = parent[parent[i]]    ← make every other node point to its grandparent
      i = parent[i]
    return root

Effect: after find(i), every node on the path from i to root has its parent set to root (or grandparent). Subsequent finds on the same nodes are O(1).

Amortised complexity:
  With weighted union + path compression, M union-find operations on N objects takes O(N + M·α(N)), where α is the inverse Ackermann function. α(N) ≤ 5 for any physically possible N, so this is effectively O(1) amortised per operation.

Why it matters for Kruskal:
  Kruskal's processes E edges, each requiring a find + possibly a union. Without path compression, this is O(E log V). With path compression, it's O(E·α(V)) ≈ O(E), making union-find essentially free — Kruskal's bottleneck becomes the initial sort of edges at O(E log E).`,
    },
    complexity: {
      question: "",
      answer: "",
    },
    source: "Concept tested within Kruskal cost analysis; 23-24 Q3b",
  },

  // ── Trace Table: Union-Find Operations Trace ──
  //
  // Operations on 6 elements (0..5), using weighted quick-union (no path compression):
  //   1. union(3, 4)   — sizes equal (1,1), 4's root set to 3. parent=[0,1,2,3,3,5] size=[1,1,1,2,1,1]
  //   2. union(0, 1)   — sizes equal (1,1), 1's root set to 0. parent=[0,0,2,3,3,5] size=[2,1,1,2,1,1]
  //   3. union(1, 3)   — roots are 0 and 3, sizes 2 and 2 (tie: attach 3 under 0). parent=[0,0,2,0,3,5] size=[4,1,1,2,1,1]
  //   4. union(5, 2)   — sizes equal (1,1), 2's root set to 5. parent=[0,0,5,0,3,5] size=[4,1,1,2,1,2]
  //   5. union(2, 4)   — roots are 5 and 0, sizes 2 and 4, smaller under larger: parent[5]=0. parent=[0,0,5,0,3,0] size=[6,1,1,2,1,2]
  //   6. find(4)       — 4→3→0 (root is 0). parent unchanged.
  //
  {
    id: "unionfind-trace-operations-full",
    type: "trace-table",
    topic: "unionfind",
    tier: "full",
    title: "Union-Find Operations Trace",
    prompt: "Trace the following weighted quick-union operations on 6 elements (0–5). No path compression.\nInitial state: parent = [0, 1, 2, 3, 4, 5], size = [1, 1, 1, 1, 1, 1]\n\nOperations:\n  1. union(3, 4)\n  2. union(0, 1)\n  3. union(1, 3)\n  4. union(5, 2)\n  5. union(2, 4)\n  6. find(4)\n\nAfter each operation, write the parent[] and size[] arrays. For find, also write the result (root found).",
    inputData: "6 elements (0–5). Operations: union(3,4), union(0,1), union(1,3), union(5,2), union(2,4), find(4)",
    table: {
      columns: ["Operation", "parent[0]", "parent[1]", "parent[2]", "parent[3]", "parent[4]", "parent[5]", "size[0]", "size[1]", "size[2]", "size[3]", "size[4]", "size[5]", "find result"],
      rows: 6,
      solution: [
        ["union(3,4)", "0", "1", "2", "3", "3", "5", "1", "1", "1", "2", "1", "1", "—"],
        ["union(0,1)", "0", "0", "2", "3", "3", "5", "2", "1", "1", "2", "1", "1", "—"],
        ["union(1,3)", "0", "0", "2", "0", "3", "5", "4", "1", "1", "2", "1", "1", "—"],
        ["union(5,2)", "0", "0", "5", "0", "3", "5", "4", "1", "1", "2", "1", "2", "—"],
        ["union(2,4)", "0", "0", "5", "0", "3", "0", "6", "1", "1", "2", "1", "2", "—"],
        ["find(4)",    "0", "0", "5", "0", "3", "0", "6", "1", "1", "2", "1", "2", "0"],
      ],
    },
    hints: [
      "union(3,4): roots are 3 and 4 (both self-roots). Sizes equal (1,1) — by convention, attach second root under first: parent[4]=3, size[3]=2.",
      "union(1,3): find(1)=0 (via 1→0), find(3)=3. Sizes: size[0]=2, size[3]=2. Tie — attach root of q (3) under root of p (0): parent[3]=0, size[0]=4.",
      "union(2,4): find(2)=5 (via 2→5), find(4)=0 (via 4→3→0). size[5]=2 < size[0]=4, so attach smaller under larger: parent[5]=0, size[0]=6.",
    ],
    source: "Curveball prep; foundation for Kruskal trace",
  },
]
