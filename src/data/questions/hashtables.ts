import type { ImplementationQuestion, TableTraceQuestion } from '../schema'

export const hashTableQuestions: (ImplementationQuestion | TableTraceQuestion)[] = [
  // ═══════════════════════════════════════════════════════════════════
  // IMPLEMENTATION QUESTIONS (3)
  // ═══════════════════════════════════════════════════════════════════

  // ── 1. Separate Chaining — Insert, Search, Delete (full) ──
  {
    id: "hashtables-separate-chaining-full",
    type: "implement",
    topic: "hashtables",
    tier: "full",
    title: "Separate Chaining — Insert, Search, Delete",
    prompt: "Implement a hash table using separate chaining with linked lists. Provide put(key, val), get(key), and delete(key) operations. The table is an array of M linked lists (buckets). Each node in a chain stores a key-value pair.",
    hints: [
      "Function signatures: put(table[], M, key, val), get(table[], M, key) → val, delete(table[], M, key). Hash to find bucket index: i = hash(key) % M.",
      "put: walk the chain at table[i]. If key found, update val. If not found, prepend a new node. get: walk the chain, return val if key found, else null. delete: walk the chain and remove the node with matching key.",
      "put: i = hash(key) % M; node = table[i]; while node != null: if node.key == key: node.val = val; return; node = node.next; table[i] = new Node(key, val, table[i])",
    ],
    solutions: {
      pseudocode: `class SeparateChainingHashTable:
    class Node:
        def __init__(self, key, value):
            self.key = key
            self.value = value
            self.next = None

    M = 97  # number of chains
    ht = Node[M]  # array of chains

    def hash(self, key):
        return key % self.M

    def get(self, key):
        i = self.hash(self, key)
        x = self.ht[i]
        while (x!=None):
            if (x.key==key) return x.value
            else x = x.next
        return None

    def put(self, key, value):
        i = self.hash(self, key)
        x = self.ht[i]
        while (x!=None):
            if (x.key==key)
                x.value = value
                return
            else x = x.next
        self.ht[i] = Node(key, value, self.ht[i])`,
      python: `class Node:
    def __init__(self, key, val, next_node=None):
        self.key = key
        self.val = val
        self.next = next_node

def put(table: list, M: int, key, val):
    i = hash(key) % M
    node = table[i]
    while node is not None:
        if node.key == key:
            node.val = val
            return
        node = node.next
    table[i] = Node(key, val, table[i])  # prepend

def get(table: list, M: int, key):
    i = hash(key) % M
    node = table[i]
    while node is not None:
        if node.key == key:
            return node.val
        node = node.next
    return None

def delete(table: list, M: int, key):
    i = hash(key) % M
    if table[i] is None:
        return
    if table[i].key == key:
        table[i] = table[i].next
        return
    prev = table[i]
    curr = prev.next
    while curr is not None:
        if curr.key == key:
            prev.next = curr.next
            return
        prev = curr
        curr = curr.next`,
    },
    complexity: {
      question: "What is the expected time complexity of separate chaining operations, and how does load factor affect performance?",
      answer: "Expected O(1 + n/M) per operation, where n/M = α (load factor). With M proportional to n, this is O(1). Average chain length is α. Worst case O(n) if all keys hash to the same bucket.",
    },
    source: "21-22 Practice Q2b",
  },

  // ── 2. Linear Probing — Insert, Search, Delete (full) ──
  {
    id: "hashtables-linear-probing-full",
    type: "implement",
    topic: "hashtables",
    tier: "full",
    title: "Linear Probing — Insert, Search, Delete",
    prompt: "Implement insert, search, and delete for a hash table using linear probing. The hash table uses parallel arrays keys[] and vals[] with null for empty slots. Delete must use the rehash-cluster technique (not tombstones).",
    hints: [
      "Function signatures: put(keys[], vals[], M, key, val), get(keys[], vals[], M, key) → val, delete(keys[], vals[], M, key). Hash index: i = hash(key) % M.",
      "put: scan right from hash(key) % M until empty slot or matching key. get: same scan, return null on empty slot. delete: remove the key, then rehash every subsequent key in the cluster until you hit an empty slot.",
      "delete: set keys[i] = null, vals[i] = null. Then j = (i+1) % M; while keys[j] != null: save key/val, set keys[j] = null, vals[j] = null, re-put the saved key/val; j = (j+1) % M.",
    ],
    solutions: {
      pseudocode: `class LinearProbingHashTable:
    M = N*2 + 1  #rule of thumb
    ht_keys = Key[M]  # array of keys
    ht_values = Value[M]  # array of values

    def hash(self, key):
        return key % self.M

    def get(self, key):
        i = self.hash(self, key)
        while (self.ht_keys[i]!=None):
            if (self.ht_keys[i]==key)
                return self.ht_values[i]
            else i=(i+1)%self.M
        return None

    def put(key, value):
        i = self.hash(self, key)
        while (self.ht_keys[i]!=None):
            if (self.ht_keys[i]==key)
                self.ht_values[i] = value
                return
            else i=(i+1)%self.M
        self.ht_keys[i] = key
        self.ht_values[i] = value`,
      python: `def put(keys: list, vals: list, M: int, key, val):
    i = hash(key) % M
    while keys[i] is not None:
        if keys[i] == key:
            vals[i] = val
            return
        i = (i + 1) % M
    keys[i] = key
    vals[i] = val

def get(keys: list, vals: list, M: int, key):
    i = hash(key) % M
    while keys[i] is not None:
        if keys[i] == key:
            return vals[i]
        i = (i + 1) % M
    return None

def delete(keys: list, vals: list, M: int, key):
    # find the key
    i = hash(key) % M
    while keys[i] is not None:
        if keys[i] == key:
            break
        i = (i + 1) % M
    if keys[i] is None:
        return  # key not found
    # delete it
    keys[i] = None
    vals[i] = None
    # rehash the rest of the cluster
    j = (i + 1) % M
    while keys[j] is not None:
        rehash_key = keys[j]
        rehash_val = vals[j]
        keys[j] = None
        vals[j] = None
        put(keys, vals, M, rehash_key, rehash_val)
        j = (j + 1) % M`,
    },
    complexity: {
      question: "What is the expected time complexity of linear probing insert and search?",
      answer: "Expected O(1) with load factor α < 1. Average probes for search hit: ~½(1 + 1/(1-α)). Average probes for search miss: ~½(1 + 1/(1-α)²). Degrades as table fills. Worst case O(n) with clustering. Delete is O(n) worst case due to cluster rehashing.",
    },
    source: "21-22 Q2b, 21-22 Practice Q2b",
  },

  // ── 3. Reverse-Engineer Insertion Order from Final LP Table (exam) ──
  {
    id: "hashtables-reverse-engineer-lp-exam",
    type: "implement",
    topic: "hashtables",
    tier: "exam",
    title: "Reverse-Engineer Insertion Order from LP Table",
    prompt: `You are given a linear probing hash table of size M = 7 with the following final state:

  Index:  0    1    2    3    4    5    6
  Key:    _    G    A    B    D    C    _

Hash function values: h(A)=2, h(B)=2, h(C)=5, h(D)=2, h(G)=1.

Determine a valid insertion order that produces this exact table. Explain your reasoning step by step, including which slots each key probes.`,
    hints: [
      "Start with keys that sit at their home slot — they must have been inserted when their home slot was empty. G is at index 1 and h(G)=1; A is at index 2 and h(A)=2; C is at index 5 and h(C)=5. These keys are in their natural positions.",
      "Now consider B at index 3: h(B)=2 but it's at 3, so slot 2 was occupied (by A) when B was inserted. So A was inserted before B. Similarly D at index 4: h(D)=2 but it's at 4, so slots 2 and 3 were occupied, meaning A and B were both inserted before D.",
      "One valid order: G, A, C, B, D. Verify: G→slot 1. A→slot 2. C→slot 5. B→h(B)=2, occupied, probe 3, empty→slot 3. D→h(D)=2, occupied, probe 3, occupied, probe 4, empty→slot 4. Final: [_, G, A, B, D, C, _]. Correct!",
    ],
    solutions: {
      pseudocode: `Reasoning approach:

1. Identify keys at their home positions (no displacement):
   - G: h(G)=1, at index 1 → home position
   - A: h(A)=2, at index 2 → home position
   - C: h(C)=5, at index 5 → home position
   These keys could have been inserted in any order relative
   to each other (they don't interfere).

2. Identify displaced keys and deduce ordering constraints:
   - B: h(B)=2, at index 3 → displaced by 1 probe.
     Slot 2 must have been occupied → A was inserted before B.
   - D: h(D)=2, at index 4 → displaced by 2 probes.
     Slots 2 and 3 must have been occupied → both A and B
     were inserted before D.

3. Ordering constraints: A before B, B before D.
   G and C are independent (different hash chains).

4. Valid insertion orders (among several):
   - G, A, C, B, D
   - A, G, B, C, D
   - A, B, G, D, C
   Any order satisfying A → B → D with G, C free.

Verification of G, A, C, B, D:
  G: h=1, slot 1 empty → insert at 1.  [_,G,_,_,_,_,_]
  A: h=2, slot 2 empty → insert at 2.  [_,G,A,_,_,_,_]
  C: h=5, slot 5 empty → insert at 5.  [_,G,A,_,_,C,_]
  B: h=2, slot 2 occ (A), probe slot 3, empty → insert at 3.
     [_,G,A,B,_,C,_]
  D: h=2, slot 2 occ (A), 3 occ (B), probe slot 4, empty → insert at 4.
     [_,G,A,B,D,C,_] ✓`,
      python: `"""
Reasoning approach:

1. Identify keys at their home positions (no displacement):
   - G: h(G)=1, at index 1 -> home position
   - A: h(A)=2, at index 2 -> home position
   - C: h(C)=5, at index 5 -> home position
   These keys could have been inserted in any order relative
   to each other (they don't interfere).

2. Identify displaced keys and deduce ordering constraints:
   - B: h(B)=2, at index 3 -> displaced by 1 probe.
     Slot 2 must have been occupied -> A was inserted before B.
   - D: h(D)=2, at index 4 -> displaced by 2 probes.
     Slots 2 and 3 must have been occupied -> both A and B
     were inserted before D.

3. Ordering constraints: A before B, B before D.
   G and C are independent (different hash chains).

4. Valid insertion orders (among several):
   - G, A, C, B, D
   - A, G, B, C, D
   - A, B, G, D, C
   Any order satisfying A -> B -> D with G, C free.

Verification of G, A, C, B, D:
  G: h=1, slot 1 empty -> insert at 1.  [_,G,_,_,_,_,_]
  A: h=2, slot 2 empty -> insert at 2.  [_,G,A,_,_,_,_]
  C: h=5, slot 5 empty -> insert at 5.  [_,G,A,_,_,C,_]
  B: h=2, slot 2 occ (A), probe slot 3, empty -> insert at 3.
     [_,G,A,B,_,C,_]
  D: h=2, slot 2 occ (A), 3 occ (B), probe slot 4, empty -> 4.
     [_,G,A,B,D,C,_]  (matches target)
"""`,
    },
    complexity: {
      question: "How many valid insertion orders exist in general for a given LP table state?",
      answer: "For each independent cluster (group of contiguously occupied slots sharing hash collisions), the number of valid orderings is constrained by displacement dependencies. Keys at their home slot are 'roots' of dependency chains. Displaced keys must come after all keys blocking their path. The total valid orders is the product of valid topological orderings across independent clusters.",
    },
    source: "21-22 Q2b (14 marks, verbatim)",
  },

  // ═══════════════════════════════════════════════════════════════════
  // CONCEPTUAL QUESTION (1)
  // ═══════════════════════════════════════════════════════════════════

  // ── 4. Chaining vs LP Comparison (conceptual) ──
  {
    id: "hashtables-chaining-vs-lp-conceptual",
    type: "implement",
    topic: "hashtables",
    tier: "conceptual",
    title: "Chaining vs Linear Probing Comparison",
    prompt: "Compare separate chaining and linear probing across these dimensions: (1) behaviour as load factor α increases, (2) clustering effects, (3) cache/memory performance, (4) deletion complexity, and (5) when you would choose one over the other.",
    hints: [
      "Think about what happens when α > 1 for each scheme. Can linear probing even handle α > 1?",
      "Clustering: in LP, occupied slots tend to form long runs. What does this do to probe sequences? Chaining distributes collisions across independent lists.",
      "Memory layout: LP stores everything in a flat array (cache-friendly). Chaining follows pointers to linked-list nodes scattered in memory (cache-unfriendly). But LP wastes space with empty slots to keep α low.",
    ],
    solutions: {
      pseudocode: `1. LOAD FACTOR (α = n/M):
   - Chaining: works for any α, even α > 1. Average chain
     length is α. Performance degrades gracefully.
   - LP: requires α < 1 (must have empty slots to terminate
     probes). Performance degrades sharply as α → 1.
     Typically resize when α > 0.5 to 0.75.

2. CLUSTERING:
   - Chaining: no clustering. Each bucket is independent.
     Collisions only affect keys with the same hash.
   - LP: suffers from primary clustering. Long runs of
     occupied slots form clusters. A new key hashing into
     any slot in a cluster extends it, making it grow
     faster — a positive feedback loop.

3. CACHE / MEMORY PERFORMANCE:
   - Chaining: each node is a separate heap allocation.
     Following next pointers causes cache misses.
     Extra memory overhead per node (key + val + pointer).
   - LP: keys stored in a contiguous array. Sequential
     probing is cache-friendly (prefetching helps).
     No pointer overhead. But table must be sparse
     (wasted empty slots).

4. DELETION:
   - Chaining: simple — remove node from linked list. O(1)
     once found.
   - LP: complex — cannot just null out a slot (breaks
     probe chains). Must either use tombstones (lazy
     deletion) or rehash the rest of the cluster.

5. WHEN TO CHOOSE:
   - Chaining: when load factor may be high or unpredictable,
     when deletion is frequent, when simplicity is valued.
   - LP: when cache performance matters, when load factor
     is kept low (α ≤ 0.5), when memory allocation overhead
     should be avoided (no linked list nodes).`,
      python: `"""
1. LOAD FACTOR (alpha = n/M):
   - Chaining: works for any alpha, even alpha > 1. Average
     chain length is alpha. Performance degrades gracefully.
   - LP: requires alpha < 1 (must have empty slots to
     terminate probes). Performance degrades sharply as
     alpha -> 1. Typically resize when alpha > 0.5 to 0.75.

2. CLUSTERING:
   - Chaining: no clustering. Each bucket is independent.
     Collisions only affect keys with the same hash.
   - LP: suffers from primary clustering. Long runs of
     occupied slots form clusters. A new key hashing into
     any slot in a cluster extends it, making it grow
     faster -- a positive feedback loop.

3. CACHE / MEMORY PERFORMANCE:
   - Chaining: each node is a separate heap allocation.
     Following next pointers causes cache misses.
     Extra memory overhead per node (key + val + pointer).
   - LP: keys stored in a contiguous array. Sequential
     probing is cache-friendly (prefetching helps).
     No pointer overhead. But table must be sparse
     (wasted empty slots).

4. DELETION:
   - Chaining: simple -- remove node from linked list.
     O(1) once found.
   - LP: complex -- cannot just null out a slot (breaks
     probe chains). Must either use tombstones (lazy
     deletion) or rehash the rest of the cluster.

5. WHEN TO CHOOSE:
   - Chaining: when load factor may be high or unpredictable,
     when deletion is frequent, when simplicity is valued.
   - LP: when cache performance matters, when load factor
     is kept low (alpha <= 0.5), when memory allocation
     overhead should be avoided (no linked list nodes).
"""`,
    },
    complexity: {
      question: "",
      answer: "",
    },
    source: "Syllabus; exam tests as short comparison, not full design",
  },

  // ═══════════════════════════════════════════════════════════════════
  // TRACE TABLE QUESTIONS (2)
  // ═══════════════════════════════════════════════════════════════════

  // ── 5. Linear Probing Insertion Trace (small) ──
  {
    id: "hashtables-trace-lp",
    type: "trace-table",
    topic: "hashtables",
    tier: "small",
    title: "Linear Probing Insertion Trace",
    prompt: "Insert the keys A, B, C, D into a hash table of size 7 using linear probing.\nHash values: h(A)=2, h(B)=2, h(C)=5, h(D)=2.\nShow the table state after each insertion.",
    inputData: "M=7, keys: A(h=2), B(h=2), C(h=5), D(h=2)",
    table: {
      columns: ["Key", "Hash", "Probes", "Table [0..6]"],
      rows: 4,
      solution: [
        ["A", "2", "0", "_, _, A, _, _, _, _"],
        ["B", "2", "1", "_, _, A, B, _, _, _"],
        ["C", "5", "0", "_, _, A, B, _, C, _"],
        ["D", "2", "2", "_, _, A, B, D, C, _"],
      ],
    },
    hints: [
      "A hashes to 2, slot 2 is empty → insert at 2.",
      "B hashes to 2, slot 2 is occupied (A) → probe to 3, empty → insert at 3.",
      "D hashes to 2, slots 2,3 occupied → probe to 4, empty → insert at 4.",
    ],
    source: "21-22 Practice Q2b",
  },

  // ── 6. Separate Chaining Insertion Trace (small) ──
  {
    id: "hashtables-trace-chaining",
    type: "trace-table",
    topic: "hashtables",
    tier: "small",
    title: "Separate Chaining Insertion Trace",
    prompt: "Insert the keys A, B, C, D, E into a hash table of size 5 using separate chaining (prepend to front of chain).\nHash values: h(A)=1, h(B)=3, h(C)=1, h(D)=4, h(E)=3.\nShow each bucket's chain state after each insertion. Write chains with → arrows, e.g. C→A.",
    inputData: "M=5, keys: A(h=1), B(h=3), C(h=1), D(h=4), E(h=3)",
    table: {
      columns: ["Key", "Hash", "Bucket 0", "Bucket 1", "Bucket 2", "Bucket 3", "Bucket 4"],
      rows: 5,
      solution: [
        ["A", "1", "_", "A", "_", "_", "_"],
        ["B", "3", "_", "A", "_", "B", "_"],
        ["C", "1", "_", "C→A", "_", "B", "_"],
        ["D", "4", "_", "C→A", "_", "B", "D"],
        ["E", "3", "_", "C→A", "_", "E→B", "D"],
      ],
    },
    hints: [
      "A hashes to bucket 1. Bucket 1 is empty → chain becomes: A.",
      "C hashes to bucket 1. Prepend to front of chain → chain becomes: C→A (C is the new head).",
      "E hashes to bucket 3. Bucket 3 already has B. Prepend → chain becomes: E→B.",
    ],
    source: "21-22 Practice Q2b",
  },
]
