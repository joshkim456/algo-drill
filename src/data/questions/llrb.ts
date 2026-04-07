import type { ImplementationQuestion } from '../schema'

export const llrbQuestions: ImplementationQuestion[] = [
  {
    id: "llrb-rotateLeft-small",
    type: "implement",
    topic: "llrb",
    tier: "small",
    title: "LLRB rotateLeft",
    prompt: "Implement the rotateLeft operation for a left-leaning red-black tree. Given a node h whose right link is red, rotate left to fix the violation.",
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
      answer: "O(1) — constant number of pointer reassignments.",
    },
    source: "Syllabus; counted in 21-22 Q2a",
  },
  {
    id: "llrb-flipColors-small",
    type: "implement",
    topic: "llrb",
    tier: "small",
    title: "LLRB flipColours",
    prompt: "Implement the flipColours operation for a left-leaning red-black tree. Flip the colours of a node and its two children (used when both children are red).",
    hints: [
      "Function signature: flipColours(h)",
      "Flip h from black to red, and both children from red to black (or vice versa).",
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
]
