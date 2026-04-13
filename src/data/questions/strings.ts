import type { ImplementationQuestion, TableTraceQuestion, CanvasTraceQuestion } from '../schema'

export const stringQuestions: (ImplementationQuestion | TableTraceQuestion | CanvasTraceQuestion)[] = [
  // ════════════════════════════════════════════════════════════════
  // IMPLEMENTATION QUESTIONS (9)
  // ════════════════════════════════════════════════════════════════

  // ── 1. R-way Trie — get, put, contains ──
  {
    id: "strings-rway-trie-full",
    type: "implement",
    topic: "strings",
    tier: "full",
    title: "R-way Trie — get, put, contains",
    prompt: "Implement an R-way trie (R = 256 for extended ASCII). Provide the node structure and implement get(key), put(key, val), and contains(key). Each node has an array of R children and a value field (null for non-terminal nodes).",
    hints: [
      "Node structure: value (or null), children[R]. Functions: get(node, key, d) where d is current character depth. put(node, key, val, d).",
      "get: if node is null, return null. If d == key.length, return node.value. Otherwise, recurse on children[key.charAt(d)]. put: if node is null, create new node. If d == key.length, set node.value. Otherwise, recurse.",
      "function get(node, key, d):\n  if node == null: return null\n  if d == len(key): return node.val\n  c = key[d]\n  return get(node.children[c], key, d+1)\n\nfunction put(node, key, val, d):\n  if node == null: node = new Node()\n  if d == len(key): node.val = val; return node\n  c = key[d]\n  node.children[c] = put(node.children[c], key, val, d+1)\n  return node",
    ],
    solutions: {
      pseudocode: `class TrieNode:
  val = null
  children = new Node[R]       // R = 256

class RWayTrie:
  root = null

  function get(key):
    node = _get(root, key, 0)
    if node == null: return null
    return node.val

  function _get(node, key, d):
    if node == null: return null
    if d == length(key): return node
    c = charAt(key, d)
    return _get(node.children[c], key, d + 1)

  function put(key, val):
    root = _put(root, key, val, 0)

  function _put(node, key, val, d):
    if node == null: node = new TrieNode()
    if d == length(key):
      node.val = val
      return node
    c = charAt(key, d)
    node.children[c] = _put(node.children[c], key, val, d + 1)
    return node

  function contains(key):
    return get(key) != null`,
    },
    complexity: {
      question: "What is the time complexity of get/put in an R-way trie? What is the space complexity?",
      answer: "Time: O(L) where L is key length — independent of the number of keys. Space: O(R * N * w) where N is number of nodes and w is average key length. The R-wide arrays at each node make space usage the main drawback.",
    },
    source: "Syllabus; supports 21-22 Q4b auto-complete",
  },

  // ── 2. Trie: all keys with a given prefix ──
  {
    id: "strings-trie-prefix-small",
    type: "implement",
    topic: "strings",
    tier: "small",
    title: "Trie: collect all keys with prefix",
    prompt: "Given an R-way trie, implement an operation that returns all keys in the trie that start with a given prefix string. Assume the trie already supports get and put.",
    hints: [
      "Function signature: prefixMatch(prefix) -> list of keys. First, navigate to the subtrie rooted at the last character of the prefix using _get.",
      "Once you have the subtrie root node, do a DFS/collect over that subtrie, building up the prefix as you go. When you reach a node with a non-null value, add the accumulated prefix to the results.",
      "function prefixMatch(prefix):\n  results = []\n  node = _get(root, prefix, 0)\n  collect(node, prefix, results)\n  return results\n\nfunction collect(node, prefix, results):\n  if node == null: return\n  if node.val != null: results.add(prefix)\n  for c = 0 to R-1:\n    collect(node.children[c], prefix + char(c), results)",
    ],
    solutions: {
      pseudocode: `function prefixMatch(prefix):
  results = []
  node = _get(root, prefix, 0)
  collect(node, prefix, results)
  return results

function collect(node, prefix, results):
  if node == null: return
  if node.val != null:
    results.add(prefix)
  for c = 0 to R-1:
    if node.children[c] != null:
      collect(node.children[c], prefix + char(c), results)`,
    },
    complexity: {
      question: "What is the time complexity of collecting all keys with a given prefix?",
      answer: "O(L + S) where L is the prefix length (to navigate to the subtrie) and S is the total number of characters in all matching keys (to traverse the subtrie and collect results).",
    },
    source: "Core of auto-complete (21-22 Q4b, 20 marks)",
  },

  // ── 3. Ternary Search Trie — get, put ──
  {
    id: "strings-tst-full",
    type: "implement",
    topic: "strings",
    tier: "full",
    title: "Ternary Search Trie — get, put",
    prompt: "Implement a ternary search trie (TST). Each node stores a character c, a value (null if non-terminal), and three children: left (< c), mid (== c, advance to next char), right (> c). Implement get(key) and put(key, val).",
    hints: [
      "Node structure: char c, value val, left/mid/right children. get(node, key, d): compare key[d] with node.c to decide left/mid/right.",
      "If key[d] < node.c, go left. If key[d] > node.c, go right. If equal and d < len(key)-1, go mid with d+1. If equal and d == len(key)-1, return node.val.",
      "function get(node, key, d):\n  if node == null: return null\n  c = key[d]\n  if c < node.c: return get(node.left, key, d)\n  if c > node.c: return get(node.right, key, d)\n  if d < len(key)-1: return get(node.mid, key, d+1)\n  return node.val",
    ],
    solutions: {
      pseudocode: `class TSTNode:
  c = character
  val = null
  left = null, mid = null, right = null

class TST:
  root = null

  function get(key):
    node = _get(root, key, 0)
    if node == null: return null
    return node.val

  function _get(node, key, d):
    if node == null: return null
    c = charAt(key, d)
    if c < node.c:
      return _get(node.left, key, d)
    else if c > node.c:
      return _get(node.right, key, d)
    else if d < length(key) - 1:
      return _get(node.mid, key, d + 1)
    else:
      return node

  function put(key, val):
    root = _put(root, key, val, 0)

  function _put(node, key, val, d):
    c = charAt(key, d)
    if node == null:
      node = new TSTNode()
      node.c = c
    if c < node.c:
      node.left = _put(node.left, key, val, d)
    else if c > node.c:
      node.right = _put(node.right, key, val, d)
    else if d < length(key) - 1:
      node.mid = _put(node.mid, key, val, d + 1)
    else:
      node.val = val
    return node`,
    },
    complexity: {
      question: "What is the time complexity of TST get/put? How does space compare to an R-way trie?",
      answer: "Time: O(L + ln N) where L is key length and N is number of keys — the ln N factor comes from the BST-like left/right branching at each level. Space: O(3N) — each node has only 3 child pointers instead of R, making TSTs far more space-efficient than R-way tries.",
    },
    source: "22-23 Q4a (12 marks)",
  },

  // ── 4. KMP — DFA Construction ──
  {
    id: "strings-kmp-full",
    type: "implement",
    topic: "strings",
    tier: "full",
    title: "KMP — DFA Construction",
    prompt: "Implement the DFA construction phase of the Knuth-Morris-Pratt string search algorithm. Given a pattern, build the DFA transition table where dfa[c][j] gives the next state when character c is seen in state j.",
    hints: [
      "Function signature: buildDFA(pattern, R) -> dfa[R][M] where R is alphabet size, M is pattern length",
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
    },
    complexity: {
      question: "What is the time complexity of KMP DFA construction and KMP search?",
      answer: "DFA construction: O(R*M) where R is alphabet size, M is pattern length. Search: O(M+N) where M is pattern length and N is text length — guaranteed linear, no backup in the text.",
    },
    source: "21-22 Q4a (10 marks), 21-22 Practice Q4b",
  },

  // ── 5. Boyer-Moore — Bad-Character Table ──
  {
    id: "strings-boyermoore-full",
    type: "implement",
    topic: "strings",
    tier: "full",
    title: "Boyer-Moore — Bad-Character Table",
    prompt: "Implement the Boyer-Moore string search algorithm using the bad-character heuristic. First build the right[] table where right[c] is the rightmost index of character c in the pattern (-1 if absent). Then implement the search that scans right-to-left within the pattern and uses right[] to compute skip distances.",
    hints: [
      "Function signatures: buildRight(pattern, R) -> right[R], search(text, pattern) -> first match index or -1. right[c] = rightmost position of c in pattern.",
      "Search: align pattern at text position i. Compare right-to-left (j from M-1 to 0). On mismatch at text[i+j]: skip = max(1, j - right[text[i+j]]). On full match: return i.",
      "right = [-1] * R\nfor j = 0 to M-1: right[pat[j]] = j\n\ni = 0\nwhile i <= N-M:\n  skip = 0\n  for j = M-1 downto 0:\n    if pat[j] != text[i+j]:\n      skip = max(1, j - right[text[i+j]])\n      break\n  if skip == 0: return i   // found\n  i += skip\nreturn -1",
    ],
    solutions: {
      pseudocode: `function buildRight(pattern, R):
  right = new int[R], fill with -1
  for j = 0 to length(pattern) - 1:
    right[pattern[j]] = j
  return right

function search(text, pattern):
  N = length(text)
  M = length(pattern)
  R = 256
  right = buildRight(pattern, R)
  i = 0
  while i <= N - M:
    skip = 0
    for j = M - 1 downto 0:
      if pattern[j] != text[i + j]:
        skip = max(1, j - right[text[i + j]])
        break
    if skip == 0:
      return i               // match found
    i = i + skip
  return -1                   // no match`,
    },
    complexity: {
      question: "What is the time complexity of Boyer-Moore with the bad-character heuristic?",
      answer: "Best case: O(N/M) — sublinear, skipping large chunks. Worst case: O(N*M) — e.g. pattern 'aab' in text 'aaa...a'. The full Boyer-Moore with the good-suffix rule guarantees O(N) worst case, but the exam focuses on the bad-character heuristic alone.",
    },
    source: "21-22 LSA Q4b (16 marks)",
  },

  // ── 6. LSD Radix Sort with Counting Sort ──
  {
    id: "strings-lsd-full",
    type: "implement",
    topic: "strings",
    tier: "full",
    title: "LSD Radix Sort with Counting Sort",
    prompt: "Implement LSD (Least-Significant-Digit first) radix sort for fixed-length strings. Use counting sort as the stable sort for each character position. Process characters from right (position W-1) to left (position 0).",
    hints: [
      "Function signature: lsdSort(a[], W) where all strings have length W. Process from d = W-1 down to 0. At each position, use counting sort with R = 256.",
      "Counting sort has 4 steps: (1) count frequencies, (2) compute cumulates, (3) distribute (move data), (4) copy back. Use count[] of size R+1.",
      "for d = W-1 downto 0:\n  count = new int[R+1]\n  for i: count[a[i][d] + 1]++           // frequency\n  for r = 0 to R-1: count[r+1] += count[r]  // cumulates\n  for i: aux[count[a[i][d]]++] = a[i]   // distribute\n  for i: a[i] = aux[i]                  // copy back",
    ],
    solutions: {
      pseudocode: `function lsdSort(a[], W):
  N = length(a)
  R = 256
  aux = new String[N]
  for d = W - 1 downto 0:
    count = new int[R + 1]
    // 1. Count frequencies
    for i = 0 to N - 1:
      count[charAt(a[i], d) + 1] = count[charAt(a[i], d) + 1] + 1
    // 2. Compute cumulates
    for r = 0 to R - 1:
      count[r + 1] = count[r + 1] + count[r]
    // 3. Distribute
    for i = 0 to N - 1:
      aux[count[charAt(a[i], d)]] = a[i]
      count[charAt(a[i], d)] = count[charAt(a[i], d)] + 1
    // 4. Copy back
    for i = 0 to N - 1:
      a[i] = aux[i]`,
    },
    complexity: {
      question: "What is the time complexity of LSD radix sort?",
      answer: "O(W * (N + R)) where W is string length, N is number of strings, R is alphabet size. Each of the W passes does a counting sort in O(N + R). LSD is linear when W is constant and R is bounded.",
    },
    source: "21-22 LSA Q4a (9 marks)",
  },

  // ── 7. Huffman Tree Construction ──
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
      "while pq.size() > 1:\n  left = pq.extractMin()\n  right = pq.extractMin()\n  parent = new Node(freq=left.freq+right.freq, left=left, right=right)\n  pq.insert(parent)",
    ],
    solutions: {
      pseudocode: `function buildHuffmanTree(chars[], freqs[]):
  pq = new MinPriorityQueue()
  for i = 0 to length(chars)-1:
    pq.insert(new Node(chars[i], freqs[i], null, null))
  while pq.size() > 1:
    left = pq.extractMin()
    right = pq.extractMin()
    parent = new Node(null, left.freq + right.freq, left, right)
    pq.insert(parent)
  return pq.extractMin()`,
    },
    complexity: {
      question: "What is the time complexity of Huffman tree construction?",
      answer: "O(n log n) — n insertions into and n extractions from a priority queue, each O(log n).",
    },
    source: "23-24 Q4b (16 marks)",
  },

  // ── 8. Prefix-Free Code Verification ──
  {
    id: "strings-prefix-free-exam",
    type: "implement",
    topic: "strings",
    tier: "exam",
    title: "Prefix-Free Code Verification",
    prompt: "Design an algorithm to verify whether a given set of binary codewords forms a valid prefix-free code (no codeword is a prefix of another). Return true if the code is prefix-free, false otherwise. Justify your approach and its complexity.",
    hints: [
      "A prefix-free code means no codeword is a prefix of any other. Think about what data structure is perfect for prefix lookups.",
      "Build a trie of the codewords. Insert each codeword bit-by-bit. If you ever reach a node that is already marked as terminal before finishing the current word, or if you finish at a node that has children, the code is not prefix-free.",
      "Insert codewords into a binary trie (left = 0, right = 1).\nFor each codeword:\n  Walk the trie bit by bit.\n  If any intermediate node is a terminal: return false (existing word is prefix of current).\n  At the end, if the final node has children: return false (current word is prefix of existing).\n  Mark final node as terminal.\nReturn true.",
    ],
    solutions: {
      pseudocode: `class TrieNode:
  isTerminal = false
  children = [null, null]   // 0 = left, 1 = right

function isPrefixFree(codewords[]):
  root = new TrieNode()
  for each word in codewords:
    node = root
    for i = 0 to length(word) - 1:
      bit = word[i]         // '0' or '1'
      if node.isTerminal:
        return false        // existing word is prefix of current
      if node.children[bit] == null:
        node.children[bit] = new TrieNode()
      node = node.children[bit]
    // finished inserting current word
    if node.children[0] != null or node.children[1] != null:
      return false          // current word is prefix of existing
    node.isTerminal = true
  return true`,
    },
    complexity: {
      question: "What is the time and space complexity of the prefix-free verification?",
      answer: "Time: O(sum of all codeword lengths) — each codeword is inserted into the trie character by character. Space: O(sum of all codeword lengths) for the trie nodes. This is optimal since we must read every bit of every codeword.",
    },
    source: "21-22 Practice Q4a (15 marks)",
  },

  // ── 9. Auto-Complete Engine Design ──
  {
    id: "strings-autocomplete-exam",
    type: "implement",
    topic: "strings",
    tier: "exam",
    title: "Auto-Complete Engine Design",
    prompt: "Design an auto-complete system. Given a dictionary of words with associated weights (popularity scores), implement: (1) insert(word, weight), (2) autocomplete(prefix, k) that returns the top-k words matching the prefix, ordered by weight descending. Describe your data structure, algorithms, and complexity.",
    hints: [
      "Use a trie to store words. Each leaf stores the word's weight. autocomplete = collect all keys with prefix + sort by weight.",
      "Optimisation: store the maximum weight in each node's subtrie, so you can prune branches that can't beat the current top-k. But the basic approach (collect all matches, sort by weight, take top k) is the expected exam answer.",
      "insert: standard trie put with weight as value.\nautocomplete(prefix, k):\n  node = _get(root, prefix, 0)\n  if node == null: return []\n  results = []\n  collect(node, prefix, results)  // collect all (word, weight) pairs\n  sort results by weight descending\n  return results[0..k-1]",
    ],
    solutions: {
      pseudocode: `class AutoComplete:
  // Uses an R-way trie where val = weight

  function insert(word, weight):
    root = _put(root, word, weight, 0)

  function _put(node, word, weight, d):
    if node == null: node = new TrieNode()
    if d == length(word):
      node.val = weight
      return node
    c = charAt(word, d)
    node.children[c] = _put(node.children[c], word, weight, d + 1)
    return node

  function autocomplete(prefix, k):
    node = _get(root, prefix, 0)
    if node == null: return []
    results = []
    collect(node, prefix, results)
    sort results by weight descending
    return first k entries of results

  function collect(node, prefix, results):
    if node == null: return
    if node.val != null:
      results.add((prefix, node.val))
    for c = 0 to R-1:
      if node.children[c] != null:
        collect(node.children[c], prefix + char(c), results)

  function _get(node, key, d):
    if node == null: return null
    if d == length(key): return node
    c = charAt(key, d)
    return _get(node.children[c], key, d + 1)`,
    },
    complexity: {
      question: "What is the complexity of autocomplete(prefix, k)?",
      answer: "O(L + S + S log S) where L = prefix length (to reach the subtrie), S = number of matching keys (to collect), and S log S to sort by weight. With a max-weight annotation in each node and a priority queue, this can be improved to O(L + k log k) but the basic approach is expected at exam level.",
    },
    source: "21-22 Q4b (20 marks)",
  },

  // ════════════════════════════════════════════════════════════════
  // CONCEPTUAL QUESTIONS (4)
  // ════════════════════════════════════════════════════════════════

  // ── 10. MSD Radix Sort (conceptual) ──
  {
    id: "strings-msd-conceptual",
    type: "implement",
    topic: "strings",
    tier: "conceptual",
    title: "MSD Radix Sort",
    prompt: "Explain MSD (Most-Significant-Digit first) radix sort. How does it differ from LSD? What is the recursive idea? When does it degenerate in performance, and how is this addressed?",
    hints: [
      "MSD processes characters left-to-right (most significant first), unlike LSD which goes right-to-left.",
      "MSD partitions strings by their first character using counting sort, then recursively sorts each partition on the next character.",
      "Think about what happens when many strings share a long common prefix — how many empty subarrays does counting sort create?",
    ],
    solutions: {
      pseudocode: `MSD radix sort works left-to-right, recursively:

1. PARTITION by the d-th character using counting sort (same 4 steps as LSD).
2. RECURSE on each of the R resulting subarrays for character position d+1.
3. BASE CASE: subarray of size 0 or 1, or all characters exhausted.

Key differences from LSD:
- LSD: right-to-left, requires fixed-length keys, always does exactly W passes.
- MSD: left-to-right, handles variable-length keys, can stop early when subarrays are small.
- LSD is non-recursive (W flat passes). MSD is recursive (divide by first char, recurse).

Performance issue:
- Creates R subarrays at each level, even if most are empty.
- For small subarrays, the overhead of counting sort (initialising count[R+1]) dominates.
- Fix: switch to insertion sort for small subarrays (cutoff ~15).

Handles variable-length strings by treating end-of-string as a character smaller than any real character (index -1 + 1 = 0 in count[]).`,
    },
    complexity: {
      question: "",
      answer: "",
    },
    source: "Syllabus; never examined (0/6), Section B curveball",
  },

  // ── 11. 3-Way Radix Quicksort (conceptual) ──
  {
    id: "strings-3way-radix-qs-conceptual",
    type: "implement",
    topic: "strings",
    tier: "conceptual",
    title: "3-Way Radix Quicksort",
    prompt: "Explain 3-way radix quicksort (also called 3-way string quicksort). What is the core idea? How does it combine quicksort partitioning with MSD-style character processing? When does it beat standard MSD radix sort?",
    hints: [
      "It applies 3-way partitioning (Dutch National Flag) on a single character at each recursive level.",
      "Pick a pivot character v = a[lo].charAt(d). Partition into three groups: < v, == v, > v. Then recurse: < and > groups on same character d, == group on character d+1.",
      "Think about when many strings share the same character at position d — MSD creates R buckets (wasteful), but 3-way partitioning handles this efficiently.",
    ],
    solutions: {
      pseudocode: `3-way radix quicksort combines quicksort's 3-way partitioning with MSD's character-by-character processing:

ALGORITHM:
  sort(a[], lo, hi, d):
    if lo >= hi: return
    v = charAt(a[lo], d)          // pivot character
    lt = lo, gt = hi, i = lo + 1
    while i <= gt:
      c = charAt(a[i], d)
      if c < v:    swap(a[lt++], a[i++])
      else if c > v: swap(a[i], a[gt--])
      else:        i++
    // Now: a[lo..lt-1] < v, a[lt..gt] == v, a[gt+1..hi] > v
    sort(a, lo, lt - 1, d)        // recurse on < group, same char
    if v >= 0:                     // v == -1 means end-of-string
      sort(a, lt, gt, d + 1)      // recurse on == group, next char
    sort(a, gt + 1, hi, d)        // recurse on > group, same char

WHY IT BEATS MSD:
- MSD creates R subarrays per level via counting sort. When R is large (256) and most buckets are empty, this wastes time initialising count[].
- 3-way partitioning adapts to the data: it only creates 3 groups, avoiding the R-bucket overhead.
- Especially effective when strings have long common prefixes (the == group advances to the next character without any wasted partitioning).
- Does not need an auxiliary array (in-place via swaps).

COMPLEXITY:
- O(N * W) worst case, but typically O(N * ln N) for random strings.
- Uses O(W) extra space (recursion stack) vs O(N + W*R) for MSD.`,
    },
    complexity: {
      question: "",
      answer: "",
    },
    source: "Syllabus; never examined (0/6), Section B curveball",
  },

  // ── 12. Rabin-Karp (conceptual) ──
  {
    id: "strings-rabinkarp-conceptual",
    type: "implement",
    topic: "strings",
    tier: "conceptual",
    title: "Rabin-Karp",
    prompt: "Explain the Rabin-Karp string search algorithm. What is the rolling hash idea? What are the expected and worst-case time complexities? When might you prefer Rabin-Karp over KMP or Boyer-Moore?",
    hints: [
      "Rabin-Karp uses hashing: compute a hash of the pattern, then slide a window across the text computing the hash of each M-character substring.",
      "The key insight is the rolling hash: when sliding the window one position right, you can update the hash in O(1) by subtracting the contribution of the leftmost character and adding the new rightmost character.",
      "Think about hash collisions: what happens when the text hash matches the pattern hash? What is the Monte Carlo vs Las Vegas distinction?",
    ],
    solutions: {
      pseudocode: `Rabin-Karp uses a rolling hash to search for a pattern in text:

IDEA:
  1. Compute hash of pattern: hash_pat = hash(pattern[0..M-1])
  2. Compute hash of first M characters of text: hash_txt = hash(text[0..M-1])
  3. Slide window across text. At each position i:
     - If hash_txt == hash_pat: either declare match (Monte Carlo) or verify char-by-char (Las Vegas)
     - Update hash_txt by removing text[i] and adding text[i+M] in O(1)

ROLLING HASH (Horner's method mod a large prime Q):
  hash(s[0..M-1]) = (s[0] * R^(M-1) + s[1] * R^(M-2) + ... + s[M-1]) mod Q

  To slide from position i to i+1:
  hash_txt = (hash_txt - text[i] * R^(M-1)) * R + text[i + M]) mod Q

  Precompute R^(M-1) mod Q to avoid recomputing.

MONTE CARLO vs LAS VEGAS:
  - Monte Carlo: on hash match, declare "found" without verifying. Probability of false positive ~ 1/Q. No worst case but theoretically can be wrong.
  - Las Vegas: on hash match, verify character by character. Always correct. Worst case O(N*M) if many hash collisions.

COMPLEXITY:
  - Expected: O(N + M) — hash each position in O(1), very few false matches.
  - Worst case: O(N*M) — Las Vegas with adversarial input causing many collisions.

WHEN TO PREFER:
  - Multi-pattern search: can check multiple pattern hashes simultaneously.
  - 2D pattern matching.
  - When you need a simple implementation and expected-case is acceptable.`,
    },
    complexity: {
      question: "",
      answer: "",
    },
    source: "Syllabus; never examined (0/6), Section B curveball",
  },

  // ── 13. Counting Sort (conceptual) ──
  {
    id: "strings-key-indexed-counting-conceptual",
    type: "implement",
    topic: "strings",
    tier: "conceptual",
    title: "Counting Sort",
    prompt: "Explain counting sort, the stable sorting subroutine used within LSD and MSD radix sort. What are the four steps? Why is the +1 offset in the count array needed? Why must the sort be stable?",
    hints: [
      "Counting sort sorts N items whose keys are integers in the range [0, R-1]. It uses a count[] array of size R+1.",
      "The four steps are: (1) count frequencies, (2) compute cumulates, (3) distribute items to aux[], (4) copy back.",
      "Think about why stability matters: in LSD, each pass must preserve the order established by previous passes on less-significant characters.",
    ],
    solutions: {
      pseudocode: `Counting sort sorts N items with integer keys in range [0, R-1] in O(N + R) time.

THE FOUR STEPS:

1. COUNT FREQUENCIES
   count = new int[R + 1], initialised to 0
   for i = 0 to N-1:
     count[key(a[i]) + 1]++
   // The +1 offset: count[r+1] holds the frequency of key r.
   // This sets up step 2 to work correctly.

2. COMPUTE CUMULATES
   for r = 0 to R-1:
     count[r+1] += count[r]
   // After this, count[r] = number of items with key < r.
   // This gives the starting index in aux[] for items with key r.

3. DISTRIBUTE (move items to correct position in aux[])
   for i = 0 to N-1:
     aux[count[key(a[i])]] = a[i]
     count[key(a[i])]++
   // The post-increment ensures items with the same key are placed
   // in the order they appeared in the input (stability).

4. COPY BACK
   for i = 0 to N-1:
     a[i] = aux[i]

WHY THE +1 OFFSET?
- By storing freq of key r in count[r+1], the cumulate step naturally
  converts frequencies into starting indices. count[0] starts at 0,
  count[1] = freq of key 0 (start index for key 1), etc.

WHY STABILITY IS ESSENTIAL:
- In LSD radix sort, we sort by the least significant character first.
  Each subsequent pass must preserve the relative order from previous passes.
  If the sort were unstable, characters sorted in earlier passes would be
  scrambled, producing an incorrect final order.
- Stability is what makes LSD work: by the time we sort on the most
  significant character, ties are broken correctly by all less-significant
  characters (already sorted in previous stable passes).`,
    },
    complexity: {
      question: "",
      answer: "",
    },
    source: "Syllabus; sub-routine of LSD, not standalone exam Q",
  },

  // ════════════════════════════════════════════════════════════════
  // TRACE TABLE QUESTIONS (2)
  // ════════════════════════════════════════════════════════════════

  // ── 14. KMP DFA Construction Trace Table ──
  // Pattern: "AABAA"
  // Alphabet shown: {A, B} (rows for relevant chars only)
  //
  // DFA construction for pattern "AABAA":
  //   j=0: dfa[A][0]=1 (match on first char)
  //   j=1: X=0. Copy mismatch from col 0: dfa[A][1]=0, dfa[B][1]=0.
  //         Match: dfa[A][1]=2. Update X: X=dfa[A][0]=1.
  //   j=2: X=1. Copy mismatch from col 1: dfa[A][2]=2, dfa[B][2]=0.
  //         Match: dfa[B][2]=3. Update X: X=dfa[B][1]=0.
  //   j=3: X=0. Copy mismatch from col 0: dfa[A][3]=0, dfa[B][3]=0.
  //         Match: dfa[A][3]=4. Update X: X=dfa[A][0]=1.
  //   j=4: X=1. Copy mismatch from col 1: dfa[A][4]=2, dfa[B][4]=0.
  //         Match: dfa[A][4]=5. Update X: X=dfa[A][1]=2.
  //
  // DFA table:
  //     j:  0  1  2  3  4
  //   A:    1  2  2  4  5
  //   B:    0  0  3  0  0
  {
    id: "strings-trace-kmp-dfa",
    type: "trace-table",
    topic: "strings",
    tier: "full",
    title: "KMP DFA Construction Trace",
    prompt: "Build the KMP DFA transition table for pattern \"AABAA\" over alphabet {A, B}. Fill in dfa[c][j] for each character c and each state j (0 to M-1). The table has one row per alphabet character and one column per pattern position.",
    inputData: "Pattern: \"AABAA\", Alphabet: {A, B}",
    table: {
      columns: ["char \\ j", "0", "1", "2", "3", "4"],
      rows: 2,
      solution: [
        ["A", "1", "2", "2", "4", "5"],
        ["B", "0", "0", "3", "0", "0"],
      ],
    },
    hints: [
      "Initialise: dfa[A][0] = 1 (match on first char). All other dfa[c][0] = 0. Restart state X = 0.",
      "For each j from 1 to 4: first copy all entries from column X (mismatch transitions), then overwrite the match transition dfa[pat[j]][j] = j+1, then update X = dfa[pat[j]][X].",
      "j=1: X=0, copy col 0, match dfa[A][1]=2, X->1. j=2: X=1, copy col 1, match dfa[B][2]=3, X->0. j=3: X=0, copy col 0, match dfa[A][3]=4, X->1. j=4: X=1, copy col 1, match dfa[A][4]=5, X->2.",
    ],
    source: "21-22 Q4a (10 marks), 21-22 Practice Q4b",
  },

  // ── 15. Boyer-Moore Search Trace Table ──
  // Pattern: "NEEDLE", Text: "INAHAYSTACKNEEDLEINA"
  // right[] for NEEDLE: N=0, E=5(last E at 5), D=3, L=4. Others=-1.
  // Actually: N at 0, E at 1 and 5, D at 3, L at 4, E at 5.
  // right[N]=0, right[E]=5, right[D]=3, right[L]=4. All others=-1.
  //
  // M=6, N=20
  // Align i=0: compare right-to-left
  //   j=5: text[0+5]='S', pat[5]='E'. Mismatch. right[S]=-1. skip=max(1, 5-(-1))=6. i=0+6=6.
  // Align i=6:
  //   j=5: text[6+5]='K', pat[5]='E'. Mismatch. right[K]=-1. skip=max(1,5-(-1))=6. i=6+6=12.
  // Align i=12:
  //   j=5: text[12+5]='L', pat[5]='E'. Mismatch. right[L]=4. skip=max(1,5-4)=1. i=12+1=13.
  //   Wait, let me recount. Text: I N A H A Y S T A C K N E E D L E I N A
  //   indices:                    0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19
  //
  // Align i=0: text[0..5] = "INAHAY"
  //   j=5: text[5]='Y', pat[5]='E'. Mismatch. right[Y]=-1. skip=max(1,5-(-1))=6. i=6.
  // Align i=6: text[6..11] = "STACKN"
  //   j=5: text[11]='N', pat[5]='E'. Mismatch. right[N]=0. skip=max(1,5-0)=5. i=11.
  // Align i=11: text[11..16] = "NEEDLE"
  //   j=5: text[16]='E', pat[5]='E'. Match.
  //   j=4: text[15]='L', pat[4]='L'. Match.
  //   j=3: text[14]='D', pat[3]='D'. Match.
  //   j=2: text[13]='E', pat[2]='E'. Match.
  //   j=1: text[12]='E', pat[1]='E'. Match.
  //   j=0: text[11]='N', pat[0]='N'. Match.
  //   Full match at i=11.
  {
    id: "strings-trace-boyermoore",
    type: "trace-table",
    topic: "strings",
    tier: "full",
    title: "Boyer-Moore Search Trace",
    prompt: "Trace the Boyer-Moore bad-character search for pattern \"NEEDLE\" in text \"INAHAYSTACKNEEDLEINA\". For each alignment position i, show the first mismatch (or full match), the character compared, and the skip distance. right[] values: N=0, E=5, D=3, L=4, all others=-1.",
    inputData: "Text: \"INAHAYSTACKNEEDLEINA\", Pattern: \"NEEDLE\", M=6",
    table: {
      columns: ["Alignment i", "j (R-to-L)", "text[i+j]", "pat[j]", "Action / Skip"],
      rows: 4,
      solution: [
        ["0", "5", "Y", "E", "Mismatch: right[Y]=-1, skip=max(1,5-(-1))=6, i->6"],
        ["6", "5", "N", "E", "Mismatch: right[N]=0, skip=max(1,5-0)=5, i->11"],
        ["11", "5", "E", "E", "Match j=5,4,3,2,1,0 — all match"],
        ["11", "0", "N", "N", "Full match found at i=11"],
      ],
    },
    hints: [
      "Start with i=0, compare text[i+j] vs pat[j] from j=M-1 down to 0. On mismatch, skip = max(1, j - right[text[i+j]]).",
      "i=0: text[5]='Y', not in pattern (right=-1), skip 6. i=6: text[11]='N', right[N]=0, skip=max(1,5-0)=5. i=11.",
      "i=11: text[11..16]=\"NEEDLE\". Compare j=5: E=E, j=4: L=L, j=3: D=D, j=2: E=E, j=1: E=E, j=0: N=N. Full match at 11.",
    ],
    source: "21-22 LSA Q4b (16 marks)",
  },

  // ════════════════════════════════════════════════════════════════
  // CANVAS TRACE QUESTIONS (2)
  // ════════════════════════════════════════════════════════════════

  // ── 16. R-way Trie Construction (Canvas Trace) ──
  // Insert words: "sea", "she", "the" into an R-way trie.
  //
  // After inserting "sea" (val="0"):
  //   root -> s -> e -> a (val=0)
  //
  // After inserting "she" (val="1"):
  //   root -> s -> e -> a (val=0)
  //              -> h -> e (val=1)
  //
  // After inserting "the" (val="2"):
  //   root -> s -> e -> a (val=0)
  //              -> h -> e (val=1)
  //        -> t -> h -> e (val=2)
  //
  // Using TrieNode: { char, value, children[] }
  {
    id: "strings-trace-trie",
    type: "trace-canvas",
    topic: "strings",
    tier: "full",
    title: "R-way Trie Construction",
    prompt: "Build an R-way trie by inserting the following words in order: \"sea\" (value 0), \"she\" (value 1), \"the\" (value 2). Draw the resulting trie, marking terminal nodes with their values.",
    inputData: "Insert: sea=0, she=1, the=2",
    canvasType: "trie",
    solution: {
      type: "trie",
      variant: "rway",
      root: {
        char: "",
        value: null,
        children: [
          {
            char: "s",
            value: null,
            children: [
              {
                char: "e",
                value: null,
                children: [
                  {
                    char: "a",
                    value: "0",
                    children: [],
                  },
                ],
              },
              {
                char: "h",
                value: null,
                children: [
                  {
                    char: "e",
                    value: "1",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            char: "t",
            value: null,
            children: [
              {
                char: "h",
                value: null,
                children: [
                  {
                    char: "e",
                    value: "2",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    hints: [
      "Insert \"sea\": create path root -> s -> e -> a, mark a as terminal with value 0.",
      "Insert \"she\": traverse root -> s, then branch: s already has child e, but we need h. Create s -> h -> e, mark e as terminal with value 1.",
      "Insert \"the\": root has no child t. Create root -> t -> h -> e, mark e as terminal with value 2. Final trie has root with children s and t.",
    ],
    source: "22-23 Q4a (12 marks)",
  },

  // ── 17. Huffman Tree Construction (Canvas Trace) ──
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
