# AlgoDrill

A flashcard-style web app for drilling algorithms and data structures. Practice implementing algorithms from scratch, trace through execution tables, and build tree structures — all with instant self-grading and mastery tracking.

Built for the UCL COMP0005 Algorithms course, but useful for anyone studying core CS algorithms.

## Features

**93 questions across 9 topics:**
Sorting, Heaps, BST, LLRB Trees, Hash Tables, Graphs, Strings, Union-Find, and ADTs.

**Three question types:**
- **Implementation** — write the algorithm in pseudocode or Python, then compare against a model solution
- **Trace Table** — fill in step-by-step execution tables (e.g. partitioning arrays, heap operations) with auto-grading
- **Trace Canvas** — interactively build tree structures (BST, LLRB, Huffman, Trie) by clicking to place nodes

**Progress tracking:**
- Mastery states per question (not started / familiar / mastered / missed)
- Overall progress bar across all topics
- Daily study streak
- Star questions for later review
- "Difficult" mode for questions you've missed 2+ times
- Mid-round resume — pick up where you left off

**Keyboard-driven workflow:**
| Shortcut | Action |
|---|---|
| `Cmd+Enter` | Submit answer |
| `→` or `1` | Got it (mark mastered) |
| `←` or `2` | Missed it |
| `H` | Reveal next hint |
| `S` | Star/unstar question |
| `U` | Undo last grade |
| `Esc` | Quit round |

**Other:**
- Toggle between pseudocode and Python solutions
- 3 progressive hints per question
- Complexity Q&A for implementation questions
- "Copy for Claude" button — copies your code + the model answer for AI-assisted review
- Round summary with session stats

## Getting Started

```bash
git clone https://github.com/joshuakim/algo-drill.git
cd algo-drill
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for dev/build
- **Tailwind CSS v4** for styling
- **CodeMirror** for the code editor (Python syntax highlighting, One Dark theme)
- **React Router v7** (HashRouter for static hosting)

All progress is stored in **localStorage** — no backend, no accounts, fully offline.

## Project Structure

```
src/
├── components/
│   ├── Home/       # Topic selection grid, progress bar, streak
│   ├── Round/      # Question display, code editor, trace table, tree canvas
│   └── Summary/    # Round results and session stats
├── data/
│   ├── schema.ts      # TypeScript types for questions and mastery
│   ├── questionBank.ts # Question lookup and filtering
│   └── questions/     # All 93 questions organized by topic
├── hooks/
│   ├── useStorage.ts  # localStorage persistence (mastery, stars, streak)
│   ├── useRound.ts    # Round state machine (answering → revealed → next)
│   └── useKeyboard.ts # Global keyboard shortcuts
└── utils/             # Grading logic, clipboard formatting
```

## Topics Covered

| Topic | Implementation | Trace |
|---|---|---|
| Sorting | Insertion, selection, merge, quick, LSD/MSD radix | Partition traces, merge steps |
| Heaps | Swim, sink, insert, delMax, heapsort | Heap operation traces |
| BST | Search, insert, delete, floor, rank | BST construction |
| LLRB Trees | Insert, rotations, color flips | LLRB construction with rebalancing |
| Hash Tables | Linear probing, separate chaining, resize | Probing sequences |
| Graphs | BFS, DFS, Dijkstra, Prim, Kruskal, topological sort | Traversal order traces |
| Strings | Huffman encoding, trie operations, KMP, LSD/MSD | Huffman tree, trie construction |
| Union-Find | Quick-find, quick-union, weighted QU | Union operation traces |
| ADTs | Stack, queue, linked list, iterator | — |

## Deploying

Build for production:

```bash
npm run build
```

The `dist/` folder can be deployed to any static host (GitHub Pages, Netlify, Vercel, etc.). The app uses `HashRouter` so it works without server-side routing configuration.

## License

MIT
