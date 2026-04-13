import type { ImplementationQuestion, CanvasTraceQuestion } from '../schema'

export const bstQuestions: (ImplementationQuestion | CanvasTraceQuestion)[] = [
  // ═══════════════════════════════════════════════════════
  // IMPLEMENTATION QUESTIONS
  // ═══════════════════════════════════════════════════════

  // ── 1. Conceptual: BST Search ──
  {
    id: "bst-search-conceptual",
    type: "implement",
    topic: "bst",
    tier: "conceptual",
    title: "BST Search — Worst/Best Case & Insertion Order",
    prompt: "Explain the best-case and worst-case time complexity of searching in a BST. Why does insertion order matter? Give an example of an insertion order that produces each case.",
    hints: [
      "Think about the shape of the tree. What determines how many comparisons a search needs?",
      "A balanced tree has height O(log n). What insertion order produces a balanced tree? What order produces the worst shape?",
      "The worst case is when the tree degenerates into a linked list — this happens when keys are inserted in sorted (or reverse-sorted) order.",
    ],
    solutions: {
      pseudocode: `BST search compares the target key against each node, going left or right.
The number of comparisons equals the depth of the target node (+ 1 for the root).

Best case: O(log n) — the tree is balanced.
  Example insertion order: 7, 3, 11, 1, 5, 9, 13
  This produces a balanced tree of height 2 (for 7 nodes).
  Every search visits at most 3 nodes.

Worst case: O(n) — the tree is a degenerate chain (linked list).
  Example insertion order: 1, 2, 3, 4, 5, 6, 7
  Every node has only a right child. Searching for 7 visits all 7 nodes.

Why insertion order matters:
  The first key inserted becomes the root. Subsequent keys are placed
  by the BST insert rule (left if smaller, right if larger). A sorted
  sequence always goes right, producing a right-skewed chain. A sequence
  where the median is inserted first (then medians of sub-halves) produces
  a balanced tree. The BST has no rebalancing — its shape is entirely
  determined by insertion order.

Average case (random insertion order): O(log n) — a randomly built BST
has expected height ~2 ln n ≈ 1.39 log2 n.`,
    },
    complexity: {
      question: "",
      answer: "",
    },
    source: "Syllabus; tested implicitly via construction",
  },

  // ── 2. Implementation: BST Insert (small) ──
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
      pseudocode: `class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.left = None
        self.right = None

def put(self, key, value):
    if key == self.key:
        self.value = value
    elif key < self.key:
        if self.left is None:
            self.left = Node(key, value)
        else:
            self.left.put(key, value)
    elif key > self.key:
        if self.right is None:
            self.right = Node(key, value)
        else:
            self.right.put(key, value)`,
    },
    complexity: {
      question: "What is the time complexity of BST insert in the best and worst case?",
      answer: "Best/Average: O(log n) — balanced tree. Worst: O(n) — degenerate tree (sorted insertion order, becomes a linked list).",
    },
    source: "18-19 Q1a, 22-23 Q2a (6 marks each)",
  },

  // ── 3. Implementation: BST Delete (full) ──
  {
    id: "bst-delete-full",
    type: "implement",
    topic: "bst",
    tier: "full",
    title: "BST Delete (3 cases)",
    prompt: "Implement the delete operation for a binary search tree. Handle all three cases: (1) deleting a leaf, (2) deleting a node with one child, (3) deleting a node with two children (Hibbard deletion — replace with in-order successor).",
    hints: [
      "Function signature: delete(node, key) → Node. First, search for the key by recursing left/right. The three cases are handled when you find the node to delete.",
      "Case 1 (leaf): return null. Case 2 (one child): return the non-null child. Case 3 (two children): find the in-order successor (minimum of right subtree), copy its key into the current node, then delete the successor from the right subtree.",
      "To find the minimum: go left until node.left is null.\nCase 3 pseudocode:\n  successor = min(node.right)\n  node.key = successor.key\n  node.right = delete(node.right, successor.key)\n  return node",
    ],
    solutions: {
      pseudocode: `function delete(node, key):
  if node == null:
    return null

  if key < node.key:
    node.left = delete(node.left, key)
  else if key > node.key:
    node.right = delete(node.right, key)
  else:
    // Found the node to delete
    // Case 1: leaf (both children null) — handled by case 2
    // Case 2: one child (or no children)
    if node.left == null:
      return node.right
    if node.right == null:
      return node.left
    // Case 3: two children — Hibbard deletion
    successor = min(node.right)
    node.key = successor.key
    node.right = delete(node.right, successor.key)

  return node

function min(node):
  while node.left != null:
    node = node.left
  return node`,
    },
    complexity: {
      question: "What is the time complexity of BST delete? Why can repeated deletions degrade performance?",
      answer: "O(h) where h is the height of the tree — O(log n) best case, O(n) worst case. Repeated Hibbard deletions create an asymmetry (always replacing with the in-order successor from the right) that tends to make the tree less balanced over time, degrading expected height from O(log n) toward O(sqrt(n)).",
    },
    source: "18-19 Q1a(iii) (6 marks)",
  },

  // ── 4. Conceptual: In-order Traversal Property ──
  {
    id: "bst-inorder-conceptual",
    type: "implement",
    topic: "bst",
    tier: "conceptual",
    title: "In-order Traversal Property & Role in BST Deletion",
    prompt: "Explain the in-order traversal property of a BST. Then explain what the 'in-order successor' is and why it is used in BST deletion (Hibbard deletion) when the node to delete has two children.",
    hints: [
      "In-order traversal visits: left subtree, then current node, then right subtree. What order does this produce for a BST?",
      "The in-order successor of node X is the node with the smallest key that is larger than X's key. Where in the tree is it located?",
      "When deleting a node with two children, you need a replacement that preserves the BST property for both subtrees. The in-order successor is the minimum of the right subtree — it's larger than everything in the left subtree and smaller than everything else in the right subtree.",
    ],
    solutions: {
      pseudocode: `In-order traversal property:
  An in-order traversal of a BST visits nodes in ascending key order.
  Algorithm: inorder(node) = inorder(node.left), visit(node), inorder(node.right).
  This works because the BST property guarantees:
    - All keys in the left subtree < node.key
    - All keys in the right subtree > node.key
  So visiting left-self-right produces a sorted sequence.

In-order successor:
  The in-order successor of node X is the next node in the sorted order —
  the node with the smallest key greater than X.key.
  Location: it is the leftmost (minimum) node in X's right subtree.
  To find it: go to X.right, then follow left pointers until left is null.

Role in BST deletion (Hibbard deletion):
  When deleting a node with two children, we cannot simply remove it —
  both subtrees need a parent. We replace the deleted node's key with
  its in-order successor's key, then delete the successor from the
  right subtree (which is simpler — the successor has at most one child,
  since it has no left child by definition of being the minimum).

  Why the in-order successor works:
    - It is greater than every key in the left subtree (BST property).
    - It is less than every other key in the right subtree (it was the min).
    - So placing it at the deleted node's position preserves the BST property.

  Note: you could equally use the in-order predecessor (maximum of the
  left subtree). The standard Hibbard deletion uses the successor.`,
    },
    complexity: {
      question: "",
      answer: "",
    },
    source: "Syllabus; in-order successor used in deletion",
  },

  // ═══════════════════════════════════════════════════════
  // CANVAS TRACE QUESTIONS
  // ═══════════════════════════════════════════════════════

  // ── 5. Canvas Trace: BST Construction ──
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

  // ── 6. Canvas Trace: BST Deletion (3 cases) ──
  {
    id: "bst-trace-deletion",
    type: "trace-canvas",
    topic: "bst",
    tier: "full",
    title: "BST Deletion — 3 Cases",
    prompt: "Starting from the BST built by inserting 7, 3, 11, 1, 5, 9, 13 (in that order), perform the following deletions in sequence and draw the final tree:\n\n1. Delete 1 (leaf node)\n2. Delete 3 (node with one child)\n3. Delete 7 (node with two children — use in-order successor)\n\nDraw the tree after all three deletions.",
    inputData: "Initial BST from insert sequence 7, 3, 11, 1, 5, 9, 13. Then delete 1, delete 3, delete 7 (in that order).",
    canvasType: "bst",
    solution: {
      type: "bst",
      root: {
        key: "9",
        left: { key: "5", left: null, right: null },
        right: {
          key: "11",
          left: null,
          right: { key: "13", left: null, right: null },
        },
      },
    },
    hints: [
      "Delete 1: it is a leaf (no children). Simply remove it. Tree becomes: 7 with left=3(right=5), right=11(left=9, right=13).",
      "Delete 3: it has one child (right child = 5). Replace 3 with its child 5. Tree becomes: 7 with left=5, right=11(left=9, right=13).",
      "Delete 7: it has two children (left=5, right=11). In-order successor = min of right subtree = 9. Replace 7's key with 9, then delete 9 from the right subtree (9 is a leaf of 11). Final tree: root=9, left=5, right=11(right=13).",
    ],
    source: "18-19 Q1a(iii) (6 marks)",
  },
]
