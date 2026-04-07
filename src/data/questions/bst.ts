import type { ImplementationQuestion, CanvasTraceQuestion } from '../schema'

export const bstQuestions: (ImplementationQuestion | CanvasTraceQuestion)[] = [
  // ── Implementation: BST insert ──
  {
    id: "bst-insert-small",
    type: "implement",
    topic: "bst",
    tier: "small",
    title: "BST Insert",
    prompt: "Implement the insert operation for a binary search tree. Insert a new key into the BST, maintaining the BST property. Use recursive approach.",
    hints: [
      "Function signature: insert(node, key) → Node",
      "If node is null, create a new node. If key < node.key, recurse left. If key > node.key, recurse right.",
      "function insert(node, key):\n  if node == null: return new Node(key)\n  if key < node.key: node.left = insert(node.left, key)\n  else if key > node.key: node.right = insert(node.right, key)\n  return node",
    ],
    solutions: {
      pseudocode: `function insert(node, key):
  if node == null:
    return new Node(key)
  if key < node.key:
    node.left = insert(node.left, key)
  else if key > node.key:
    node.right = insert(node.right, key)
  return node`,
      python: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def insert(node: Node | None, key: int) -> Node:
    if node is None:
        return Node(key)
    if key < node.key:
        node.left = insert(node.left, key)
    elif key > node.key:
        node.right = insert(node.right, key)
    return node`,
    },
    complexity: {
      question: "What is the time complexity of BST insert in the best and worst case?",
      answer: "Best/Average: O(log n) — balanced tree. Worst: O(n) — degenerate tree (sorted insertion order, becomes a linked list).",
    },
    source: "18-19 Q1a, 22-23 Q2a (6 marks each)",
  },

  // ── Canvas Trace: BST Construction ──
  {
    id: "bst-trace-construction",
    type: "trace-canvas",
    topic: "bst",
    tier: "small",
    title: "BST Construction from Insertion Sequence",
    prompt: "Build a BST by inserting the following keys in order: 7, 3, 11, 1, 5, 9, 13. Draw the resulting tree.",
    inputData: "Insert sequence: 7, 3, 11, 1, 5, 9, 13",
    canvasType: "bst",
    solution: {
      type: "bst",
      root: {
        key: "7",
        left: {
          key: "3",
          left: { key: "1", left: null, right: null },
          right: { key: "5", left: null, right: null },
        },
        right: {
          key: "11",
          left: { key: "9", left: null, right: null },
          right: { key: "13", left: null, right: null },
        },
      },
    },
    hints: [
      "7 is the root (first insertion). 3 < 7 so it goes left. 11 > 7 so it goes right.",
      "1 < 7, 1 < 3 → left child of 3. 5 < 7, 5 > 3 → right child of 3.",
      "9 > 7, 9 < 11 → left child of 11. 13 > 7, 13 > 11 → right child of 11.",
    ],
    source: "18-19 Q1a (6 marks), 22-23 Q2a (6 marks)",
  },
]
