// ── Topic enum ──
export type Topic =
  | "sorting"
  | "heaps"
  | "bst"
  | "llrb"
  | "hashtables"
  | "graphs"
  | "strings"
  | "unionfind"
  | "adt";

export const TOPIC_LABELS: Record<Topic, string> = {
  sorting: "Sorting",
  heaps: "Heaps",
  bst: "BST",
  llrb: "LLRB Trees",
  hashtables: "Hash Tables",
  graphs: "Graphs",
  strings: "Strings",
  unionfind: "Union-Find",
  adt: "ADTs",
};

// ── Mastery states ──
export type MasteryState = "not_started" | "familiar" | "mastered" | "missed";

// ── Implementation questions ──
export interface ImplementationQuestion {
  id: string;
  type: "implement";
  topic: Topic;
  tier: "small" | "full" | "exam" | "conceptual";
  title: string;
  prompt: string;
  hints: [string, string, string];
  solutions: {
    pseudocode: string;
  };
  complexity: {
    question: string;
    answer: string;
  };
  source: string;
}

// ── Table trace questions ──
export interface TableTraceQuestion {
  id: string;
  type: "trace-table";
  topic: Topic;
  tier: "small" | "full" | "exam";
  title: string;
  prompt: string;
  inputData: string;
  table: {
    columns: string[];
    rows: number;
    solution: string[][];
  };
  hints: [string, string, string];
  source: string;
}

// ── Canvas trace questions ──
export interface CanvasTraceQuestion {
  id: string;
  type: "trace-canvas";
  topic: Topic;
  tier: "small" | "full" | "exam";
  title: string;
  prompt: string;
  inputData: string;
  canvasType: "bst" | "llrb" | "huffman" | "trie";
  solution: CanvasSolution;
  hints: [string, string, string];
  source: string;
}

// ── Canvas solution types ──
export type CanvasSolution = BSTSolution | LLRBSolution | HuffmanSolution | TrieSolution;

export interface TreeNode {
  key: string;
  left: TreeNode | null;
  right: TreeNode | null;
}

export interface BSTSolution {
  type: "bst";
  root: TreeNode | null;
}

export interface LLRBNode extends TreeNode {
  left: LLRBNode | null;
  right: LLRBNode | null;
  edgeColor: "red" | "black";
}

export interface LLRBSolution {
  type: "llrb";
  root: LLRBNode | null;
}

export interface HuffmanNode {
  char: string | null;
  freq: number;
  left: HuffmanNode | null;
  right: HuffmanNode | null;
}

export interface HuffmanSolution {
  type: "huffman";
  root: HuffmanNode | null;
  codewords: Record<string, string>;
}

export interface TrieNode {
  char: string;
  value: string | null;
  children: TrieNode[];
}

export interface TrieSolution {
  type: "trie";
  variant: "rway" | "3way";
  root: TrieNode | null;
}

// ── Union type for all questions ──
export type Question = ImplementationQuestion | TableTraceQuestion | CanvasTraceQuestion;

// ── Section type (for home screen grouping) ──
export type Section = "implementation" | "trace";

export function getQuestionSection(q: Question): Section {
  return q.type === "implement" ? "implementation" : "trace";
}
