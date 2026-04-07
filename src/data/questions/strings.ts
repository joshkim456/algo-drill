import type { ImplementationQuestion, CanvasTraceQuestion } from '../schema'

export const stringQuestions: (ImplementationQuestion | CanvasTraceQuestion)[] = [
  // ── Implementation: KMP DFA Construction ──
  {
    id: "strings-kmp-full",
    type: "implement",
    topic: "strings",
    tier: "full",
    title: "KMP — DFA Construction",
    prompt: "Implement the DFA construction phase of the Knuth-Morris-Pratt string search algorithm. Given a pattern, build the DFA transition table where dfa[c][j] gives the next state when character c is seen in state j.",
    hints: [
      "Function signature: buildDFA(pattern, R) → dfa[R][M] where R is alphabet size, M is pattern length",
      "Key insight: maintain a 'restart state' X. For mismatch transitions, copy from column X. For match, advance state. Then update X using dfa[pat[j]][X].",
      "dfa[pat[0]][0] = 1\nX = 0\nfor j = 1 to M-1:\n  for c = 0 to R-1: dfa[c][j] = dfa[c][X]  // copy mismatch\n  dfa[pat[j]][j] = j + 1                      // set match\n  X = dfa[pat[j]][X]                           // update restart",
    ],
    solutions: {
      pseudocode: `function buildDFA(pattern, R):
  M = length(pattern)
  dfa = new int[R][M]
  dfa[pattern[0]][0] = 1
  X = 0
  for j = 1 to M-1:
    for c = 0 to R-1:
      dfa[c][j] = dfa[c][X]       // mismatch transitions
    dfa[pattern[j]][j] = j + 1     // match transition
    X = dfa[pattern[j]][X]         // update restart state`,
      python: `def build_dfa(pattern: str, R: int = 256) -> list[list[int]]:
    M = len(pattern)
    dfa = [[0] * M for _ in range(R)]
    dfa[ord(pattern[0])][0] = 1
    X = 0
    for j in range(1, M):
        for c in range(R):
            dfa[c][j] = dfa[c][X]         # mismatch
        dfa[ord(pattern[j])][j] = j + 1   # match
        X = dfa[ord(pattern[j])][X]       # update restart
    return dfa`,
    },
    complexity: {
      question: "What is the time complexity of KMP DFA construction and KMP search?",
      answer: "DFA construction: O(R*M) where R is alphabet size, M is pattern length. Search: O(N) where N is text length — guaranteed linear, no backup in the text.",
    },
    source: "21-22 Q4a (10 marks), 21-22 Practice Q4b",
  },

  // ── Implementation: Huffman Tree Construction ──
  {
    id: "strings-huffman-full",
    type: "implement",
    topic: "strings",
    tier: "full",
    title: "Huffman Tree Construction",
    prompt: "Implement Huffman tree construction. Given an array of character frequencies, build the optimal prefix-free binary tree. Use a min-priority queue.",
    hints: [
      "Create a leaf node for each character with its frequency. Insert all into a min-PQ.",
      "Repeat until one node remains: extract two smallest, create a parent with freq = sum of children, insert parent back.",
      "while pq.size() > 1:\n  left = pq.delMin()\n  right = pq.delMin()\n  parent = new Node(freq=left.freq+right.freq, left=left, right=right)\n  pq.insert(parent)",
    ],
    solutions: {
      pseudocode: `function buildHuffmanTree(chars[], freqs[]):
  pq = new MinPQ()
  for i = 0 to length(chars)-1:
    pq.insert(new Node(chars[i], freqs[i], null, null))
  while pq.size() > 1:
    left = pq.delMin()
    right = pq.delMin()
    parent = new Node(null, left.freq + right.freq, left, right)
    pq.insert(parent)
  return pq.delMin()`,
      python: `import heapq

def build_huffman_tree(chars: list[str], freqs: list[int]):
    # Use (freq, id, node) tuples for heap ordering
    heap = []
    for i, (ch, f) in enumerate(zip(chars, freqs)):
        node = {"char": ch, "freq": f, "left": None, "right": None}
        heapq.heappush(heap, (f, i, node))
    counter = len(chars)
    while len(heap) > 1:
        f1, _, left = heapq.heappop(heap)
        f2, _, right = heapq.heappop(heap)
        parent = {"char": None, "freq": f1 + f2, "left": left, "right": right}
        heapq.heappush(heap, (f1 + f2, counter, parent))
        counter += 1
    return heap[0][2]`,
    },
    complexity: {
      question: "What is the time complexity of Huffman tree construction?",
      answer: "O(n log n) — n insertions into and n extractions from a priority queue, each O(log n).",
    },
    source: "23-24 Q4b (16 marks)",
  },

  // ── Canvas Trace: Huffman Tree ──
  {
    id: "strings-trace-huffman",
    type: "trace-canvas",
    topic: "strings",
    tier: "full",
    title: "Huffman Tree Construction",
    prompt: "Build a Huffman tree for the following character frequencies: A:5, B:2, C:1, D:3. Draw the tree and write the codeword for each character.",
    inputData: "A:5, B:2, C:1, D:3",
    canvasType: "huffman",
    solution: {
      type: "huffman",
      root: {
        char: null,
        freq: 11,
        left: {
          char: "A",
          freq: 5,
          left: null,
          right: null,
        },
        right: {
          char: null,
          freq: 6,
          left: {
            char: null,
            freq: 3,
            left: { char: "C", freq: 1, left: null, right: null },
            right: { char: "B", freq: 2, left: null, right: null },
          },
          right: {
            char: "D",
            freq: 3,
            left: null,
            right: null,
          },
        },
      },
      codewords: {
        A: "0",
        B: "111",
        C: "110",
        D: "10",
      },
    },
    hints: [
      "Start by combining the two lowest: C(1) + B(2) = CB(3).",
      "Next lowest pair: D(3) + CB(3) = DCB(6). Then A(5) + DCB(6) = root(11).",
      "Read codewords by path from root: left=0, right=1. A=0, D=10, C=110, B=111.",
    ],
    source: "23-24 Q4b (16 marks)",
  },
]
