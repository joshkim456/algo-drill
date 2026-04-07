import type { ImplementationQuestion, TableTraceQuestion, CanvasTraceQuestion } from '../schema'

export const llrbQuestions: (ImplementationQuestion | TableTraceQuestion | CanvasTraceQuestion)[] = [
  // ═══════════════════════════════════════════
  // IMPLEMENTATION QUESTIONS (4)
  // ═══════════════════════════════════════════

  // ── 1. rotateLeft (small) ──
  {
    id: "llrb-rotateLeft-small",
    type: "implement",
    topic: "llrb",
    tier: "small",
    title: "LLRB rotateLeft",
    prompt: "Implement the rotateLeft operation for a left-leaning red-black tree. Given a node h whose right link is red, rotate left to fix the violation and return the new subtree root.",
    hints: [
      "Function signature: rotateLeft(h) → Node",
      "x = h.right becomes the new root of the subtree. h becomes x's left child. Transfer x's left child to h's right.",
      "x = h.right\nh.right = x.left\nx.left = h\nx.color = h.color\nh.color = RED\nreturn x",
    ],
    solutions: {
      pseudocode: `function rotateLeft(h):
  x = h.right
  h.right = x.left
  x.left = h
  x.color = h.color
  h.color = RED
  return x`,
      python: `def rotate_left(h):
    x = h.right
    h.right = x.left
    x.left = h
    x.color = h.color
    h.color = RED
    return x`,
    },
    complexity: {
      question: "What is the time complexity of rotateLeft?",
      answer: "O(1) — constant number of pointer reassignments and colour updates.",
    },
    source: "Syllabus; counted in 21-22 Q2a",
  },

  // ── 2. rotateRight (small) ──
  {
    id: "llrb-rotateRight-small",
    type: "implement",
    topic: "llrb",
    tier: "small",
    title: "LLRB rotateRight",
    prompt: "Implement the rotateRight operation for a left-leaning red-black tree. Given a node h whose left link is red (and left.left is also red), rotate right to fix the double-left-red violation and return the new subtree root.",
    hints: [
      "Function signature: rotateRight(h) → Node. It is the mirror of rotateLeft.",
      "x = h.left becomes the new root of the subtree. h becomes x's right child. Transfer x's right child to h's left.",
      "x = h.left\nh.left = x.right\nx.right = h\nx.color = h.color\nh.color = RED\nreturn x",
    ],
    solutions: {
      pseudocode: `function rotateRight(h):
  x = h.left
  h.left = x.right
  x.right = h
  x.color = h.color
  h.color = RED
  return x`,
      python: `def rotate_right(h):
    x = h.left
    h.left = x.right
    x.right = h
    x.color = h.color
    h.color = RED
    return x`,
    },
    complexity: {
      question: "What is the time complexity of rotateRight?",
      answer: "O(1) — constant number of pointer reassignments and colour updates.",
    },
    source: "Syllabus; counted in 21-22 Q2a",
  },

  // ── 3. flipColours (small) ──
  {
    id: "llrb-flipColours-small",
    type: "implement",
    topic: "llrb",
    tier: "small",
    title: "LLRB flipColours",
    prompt: "Implement the flipColours operation for a left-leaning red-black tree. Flip the colours of a node and its two children. This is used when both children are red — split the temporary 4-node by pushing the middle key up.",
    hints: [
      "Function signature: flipColours(h). Operates on h and both children.",
      "Flip h from black to red (it gets absorbed into its parent's node), and both children from red to black (they become separate 2-nodes).",
      "h.color = RED\nh.left.color = BLACK\nh.right.color = BLACK",
    ],
    solutions: {
      pseudocode: `function flipColours(h):
  h.color = RED
  h.left.color = BLACK
  h.right.color = BLACK`,
      python: `def flip_colours(h):
    h.color = RED
    h.left.color = BLACK
    h.right.color = BLACK`,
    },
    complexity: {
      question: "What is the time complexity of flipColours?",
      answer: "O(1) — three colour assignments.",
    },
    source: "Syllabus; counted in 21-22 Q2a (9 marks)",
  },

  // ── 4. LLRB insert (full) ──
  {
    id: "llrb-insert-full",
    type: "implement",
    topic: "llrb",
    tier: "full",
    title: "LLRB Insert (BST insert + fix-ups)",
    prompt: "Implement the full put (insert) operation for a left-leaning red-black tree. Perform a standard recursive BST insert with a RED link to the parent, then apply three fix-up rules on the way back up:\n1. Right child red, left child black → rotateLeft\n2. Left child red, left-left grandchild red → rotateRight\n3. Both children red → flipColours\nFinally, ensure the root is always black.",
    hints: [
      "Function signature: put(h, key) → Node. Base case: if h is null, return a new RED node. Recurse left/right based on key comparison. Apply three fix-ups after the recursive call. Wrapper sets root.color = BLACK.",
      "The three fix-ups happen in order after the recursive insert:\n  if isRed(h.right) and not isRed(h.left): h = rotateLeft(h)\n  if isRed(h.left) and isRed(h.left.left): h = rotateRight(h)\n  if isRed(h.left) and isRed(h.right): flipColours(h)",
      "function put(h, key):\n  if h == null: return new Node(key, RED)\n  if key < h.key: h.left = put(h.left, key)\n  else if key > h.key: h.right = put(h.right, key)\n  // fix-ups\n  if isRed(h.right) and not isRed(h.left): h = rotateLeft(h)\n  if isRed(h.left) and isRed(h.left.left): h = rotateRight(h)\n  if isRed(h.left) and isRed(h.right): flipColours(h)\n  return h",
    ],
    solutions: {
      pseudocode: `function put(h, key):
  if h == null:
    return new Node(key, RED)
  if key < h.key:
    h.left = put(h.left, key)
  else if key > h.key:
    h.right = put(h.right, key)
  else:
    h.value = value          // key already exists — update

  // fix-up: restore LLRB invariants on the way back up
  if isRed(h.right) and not isRed(h.left):
    h = rotateLeft(h)
  if isRed(h.left) and isRed(h.left.left):
    h = rotateRight(h)
  if isRed(h.left) and isRed(h.right):
    flipColours(h)

  return h

// wrapper:
function insert(key):
  root = put(root, key)
  root.color = BLACK`,
      python: `RED = True
BLACK = False

class Node:
    def __init__(self, key, color=RED):
        self.key = key
        self.color = color      # colour of link from parent to this node
        self.left = None
        self.right = None

def is_red(node):
    if node is None:
        return False
    return node.color == RED

def rotate_left(h):
    x = h.right
    h.right = x.left
    x.left = h
    x.color = h.color
    h.color = RED
    return x

def rotate_right(h):
    x = h.left
    h.left = x.right
    x.right = h
    x.color = h.color
    h.color = RED
    return x

def flip_colours(h):
    h.color = RED
    h.left.color = BLACK
    h.right.color = BLACK

def put(h, key):
    if h is None:
        return Node(key, RED)
    if key < h.key:
        h.left = put(h.left, key)
    elif key > h.key:
        h.right = put(h.right, key)

    # fix-up: restore LLRB invariants
    if is_red(h.right) and not is_red(h.left):
        h = rotate_left(h)
    if is_red(h.left) and is_red(h.left.left):
        h = rotate_right(h)
    if is_red(h.left) and is_red(h.right):
        flip_colours(h)

    return h

# wrapper
def insert(key):
    global root
    root = put(root, key)
    root.color = BLACK`,
    },
    complexity: {
      question: "What is the time and space complexity of LLRB insert?",
      answer: "Time: O(log n) — tree height is guaranteed O(log n) since the black-height is balanced and rotations/flips are O(1). Space: O(log n) for the recursive call stack.",
    },
    source: "22-23 Q2b (15 marks), 21-22 Practice Q2a (15 marks)",
  },

  // ═══════════════════════════════════════════
  // TRACE TABLE QUESTION (1)
  // ═══════════════════════════════════════════

  // ── 5. Count rotations and colour flips per insertion ──
  //
  // Trace for insertion sequence: S, E, A, R, C, H
  //
  // Insert S: new root. No fix-ups.
  //   → root = S. RL=0, RR=0, Flip=0.
  //
  // Insert E: E < S → left child of S (red link). No violations.
  //   → root = S. RL=0, RR=0, Flip=0.
  //
  // Insert A: A < S → left, A < E → left child of E (red).
  //   At S: left(E) is red AND left.left(A) is red → rotateRight(S).
  //     E becomes root, E.left=A(red), E.right=S(red).
  //   E: both children red → flipColours(E).
  //     A=black, S=black, E=red (then root forced black).
  //   → root = E. RL=0, RR=1, Flip=1.
  //
  // Insert R: R > E → right, R < S → left child of S (red).
  //   At S: left(R) is red, right is null — no violation triggered.
  //   At E: right(S) is black, left(A) is black — no violations.
  //   → root = E. RL=0, RR=0, Flip=0.
  //
  // Insert C: C < E → left, C > A → right child of A (red).
  //   At A: right(C) is red, left is null (black) → rotateLeft(A).
  //     C becomes subtree root (black), C.left=A(red).
  //   At E: left(C) is black — no further violations.
  //   → root = E. RL=1, RR=0, Flip=0.
  //
  // Insert H: H > E → right, H < S → left, H < R → left child of R (red).
  //   At S: left(R) is red, left.left(H) is red → rotateRight(S).
  //     R becomes subtree root (black), R.left=H(black via flip below), R.right=S(red).
  //   After rotateRight: R.left=H(red), R.right=S(red) → flipColours(R).
  //     H=black, S=black, R=red.
  //   At E: right(R) is now red, left(C) is black → rotateLeft(E).
  //     R becomes root (black), R.left=E(red), R.right=S(black).
  //   → root = R. RL=1, RR=1, Flip=1.
  {
    id: "llrb-trace-rotations-full",
    type: "trace-table",
    topic: "llrb",
    tier: "full",
    title: "LLRB Rotation & Flip Count Trace",
    prompt: "Insert the keys S, E, A, R, C, H (in that order) into an initially empty LLRB tree. For each insertion, record the number of rotateLeft calls, rotateRight calls, and flipColours calls that occur, plus the root key after the insertion completes.",
    inputData: "Insert sequence: S, E, A, R, C, H into an empty LLRB tree",
    table: {
      columns: ["Key", "Rotate-Left", "Rotate-Right", "Flip", "Root After"],
      rows: 6,
      solution: [
        ["S", "0", "0", "0", "S"],
        ["E", "0", "0", "0", "S"],
        ["A", "0", "1", "1", "E"],
        ["R", "0", "0", "0", "E"],
        ["C", "1", "0", "0", "E"],
        ["H", "1", "1", "1", "R"],
      ],
    },
    hints: [
      "S is the root. E goes left of S (red link) — no violations because the only red link is a left link.",
      "Inserting A creates a double-left-red: S←E(red)←A(red). rotateRight at S makes E the root with both children red, then flipColours splits the 4-node. Root is now E.",
      "Inserting C into A's right creates a right-leaning red link at A → rotateLeft fixes it. Inserting H triggers a chain: rotateRight at S (double-left-red via R←H), flipColours at R (both children red), then rotateLeft at E (right-leaning red link to R). New root is R.",
    ],
    source: "21-22 Q2a (9 marks), 21-22 Practice Q2a",
  },

  // ═══════════════════════════════════════════
  // CANVAS TRACE QUESTION (1)
  // ═══════════════════════════════════════════

  // ── 6. LLRB insertion sequence — draw the final tree ──
  //
  // Final tree after inserting S, E, A, R, C, H:
  //
  //            R (root, black)
  //           / \
  //         E    S
  //       (red) (black)
  //        / \
  //       C   H
  //    (blk) (blk)
  //      /
  //     A
  //   (red)
  //
  {
    id: "llrb-trace-insertion-canvas",
    type: "trace-canvas",
    topic: "llrb",
    tier: "full",
    title: "LLRB Insertion Sequence — Draw the Tree",
    prompt: "Insert the keys S, E, A, R, C, H (in that order) into an initially empty LLRB tree. Draw the final tree, showing each node and the colour (red or black) of every link.",
    inputData: "Insert sequence: S, E, A, R, C, H into an empty LLRB tree",
    canvasType: "llrb",
    solution: {
      type: "llrb",
      root: {
        key: "R",
        edgeColor: "black",     // root link is always black
        left: {
          key: "E",
          edgeColor: "red",     // E is red-linked to R (left-leaning)
          left: {
            key: "C",
            edgeColor: "black",
            left: {
              key: "A",
              edgeColor: "red", // A is red-linked to C (left-leaning)
              left: null,
              right: null,
            },
            right: null,
          },
          right: {
            key: "H",
            edgeColor: "black",
            left: null,
            right: null,
          },
        },
        right: {
          key: "S",
          edgeColor: "black",
          left: null,
          right: null,
        },
      },
    },
    hints: [
      "After inserting S, E, A: the tree is E(root)—A(left, black)—S(right, black). Insert A triggers a rotateRight then flipColours.",
      "After inserting R: R goes to S's left (red). After inserting C: C goes to A's right (red), triggering rotateLeft at A — now C is the left child of E with A as C's red left child.",
      "Inserting H triggers three fix-ups: rotateRight at S (double-left-red H←R), flipColours at R (both children red), rotateLeft at E (right-leaning red to R). Final root is R with E(red) left and S(black) right.",
    ],
    source: "22-23 Q2b (15 marks), 21-22 Practice Q2a",
  },
]
