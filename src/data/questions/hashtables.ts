import type { ImplementationQuestion, TableTraceQuestion } from '../schema'

export const hashTableQuestions: (ImplementationQuestion | TableTraceQuestion)[] = [
  {
    id: "hashtables-linear-probing-full",
    type: "implement",
    topic: "hashtables",
    tier: "full",
    title: "Linear Probing — Insert and Search",
    prompt: "Implement insert and search for a hash table using linear probing. The hash table uses an array of key-value pairs with null for empty slots.",
    hints: [
      "Function signatures: put(keys[], vals[], M, key, val) and get(keys[], vals[], M, key) → val",
      "To insert: compute hash, scan right until an empty slot or matching key is found. To search: same scan, return null if empty slot hit.",
      "put: i = hash(key) % M; while keys[i] != null: if keys[i] == key: vals[i] = val; return; i = (i+1) % M; keys[i] = key; vals[i] = val",
    ],
    solutions: {
      pseudocode: `function put(keys[], vals[], M, key, val):
  i = hash(key) % M
  while keys[i] != null:
    if keys[i] == key:
      vals[i] = val
      return
    i = (i + 1) % M
  keys[i] = key
  vals[i] = val

function get(keys[], vals[], M, key):
  i = hash(key) % M
  while keys[i] != null:
    if keys[i] == key:
      return vals[i]
    i = (i + 1) % M
  return null`,
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
    return None`,
    },
    complexity: {
      question: "What is the expected time complexity of linear probing insert and search?",
      answer: "Expected O(1) with load factor α < 1. Average probes for search hit: ~½(1 + 1/(1-α)). Degrades as table fills. Worst case O(n) with clustering.",
    },
    source: "21-22 Q2b, 21-22 Practice Q2b",
  },
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
]
