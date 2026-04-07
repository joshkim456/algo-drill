import type { ImplementationQuestion } from '../schema'

export const unionFindQuestions: ImplementationQuestion[] = [
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
]
