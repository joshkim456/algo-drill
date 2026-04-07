import type { ImplementationQuestion, TableTraceQuestion } from '../schema'

export const graphQuestions: (ImplementationQuestion | TableTraceQuestion)[] = [
  {
    id: "graphs-dfs-recursive-full",
    type: "implement",
    topic: "graphs",
    tier: "full",
    title: "DFS (Recursive)",
    prompt: "Implement depth-first search on an undirected graph represented as an adjacency list. Mark all vertices reachable from a source vertex s.",
    hints: [
      "Function signature: dfs(graph, s, visited[])",
      "Mark s as visited, then recursively visit all unvisited neighbours.",
      "function dfs(graph, s, visited):\n  visited[s] = true\n  for each v in graph.adj(s):\n    if not visited[v]: dfs(graph, v, visited)",
    ],
    solutions: {
      pseudocode: `function dfs(graph, s, visited[]):
  visited[s] = true
  for each v in graph.adj(s):
    if not visited[v]:
      dfs(graph, v, visited)`,
      python: `def dfs(graph: list[list[int]], s: int, visited: list[bool]) -> None:
    visited[s] = True
    for v in graph[s]:
        if not visited[v]:
            dfs(graph, v, visited)`,
    },
    complexity: {
      question: "What is the time complexity of DFS?",
      answer: "O(V + E) — visits each vertex once and examines each edge twice (once from each endpoint).",
    },
    source: "21-22 Q3a; syllabus",
  },
  {
    id: "graphs-bfs-full",
    type: "implement",
    topic: "graphs",
    tier: "full",
    title: "BFS (Iterative with Queue)",
    prompt: "Implement breadth-first search on a graph represented as an adjacency list. Track distances from source vertex s and the edgeTo[] array for path reconstruction.",
    hints: [
      "Function signature: bfs(graph, s) → (distTo[], edgeTo[])",
      "Use a queue. Enqueue s with distance 0. For each dequeued vertex, enqueue all unvisited neighbours with distance + 1.",
      "queue.enqueue(s)\ndistTo[s] = 0\nwhile queue not empty:\n  v = queue.dequeue()\n  for each w in adj(v):\n    if distTo[w] == -1:\n      distTo[w] = distTo[v] + 1\n      edgeTo[w] = v\n      queue.enqueue(w)",
    ],
    solutions: {
      pseudocode: `function bfs(graph, s, V):
  distTo = new int[V], fill with -1
  edgeTo = new int[V], fill with -1
  distTo[s] = 0
  queue = new Queue()
  queue.enqueue(s)
  while not queue.isEmpty():
    v = queue.dequeue()
    for each w in graph.adj(v):
      if distTo[w] == -1:
        distTo[w] = distTo[v] + 1
        edgeTo[w] = v
        queue.enqueue(w)
  return (distTo, edgeTo)`,
      python: `from collections import deque

def bfs(graph: list[list[int]], s: int) -> tuple[list[int], list[int]]:
    V = len(graph)
    dist_to = [-1] * V
    edge_to = [-1] * V
    dist_to[s] = 0
    queue = deque([s])
    while queue:
        v = queue.popleft()
        for w in graph[v]:
            if dist_to[w] == -1:
                dist_to[w] = dist_to[v] + 1
                edge_to[w] = v
                queue.append(w)
    return dist_to, edge_to`,
    },
    complexity: {
      question: "What is the time complexity of BFS?",
      answer: "O(V + E) — same as DFS. Each vertex is enqueued and dequeued once; each edge is examined once.",
    },
    source: "21-22 Q3a(ii) (8 marks)",
  },
  {
    id: "graphs-trace-dijkstra",
    type: "trace-table",
    topic: "graphs",
    tier: "full",
    title: "Dijkstra Trace",
    prompt: "Trace Dijkstra's algorithm on the following weighted graph starting from vertex 0.\nEdges: 0→1 (w=4), 0→2 (w=1), 1→3 (w=1), 2→1 (w=2), 2→3 (w=5)\nShow the vertex dequeued, distTo[], and edgeTo[] after each relaxation step.",
    inputData: "4 vertices, edges: 0→1(4), 0→2(1), 1→3(1), 2→1(2), 2→3(5)",
    table: {
      columns: ["Step", "Vertex Dequeued", "distTo[0]", "distTo[1]", "distTo[2]", "distTo[3]"],
      rows: 4,
      solution: [
        ["1", "0", "0", "4", "1", "∞"],
        ["2", "2", "0", "3", "1", "6"],
        ["3", "1", "0", "3", "1", "4"],
        ["4", "3", "0", "3", "1", "4"],
      ],
    },
    hints: [
      "Start: distTo = [0, ∞, ∞, ∞]. Dequeue vertex 0 (smallest distance).",
      "After dequeuing 0: relax edges 0→1 (dist=4) and 0→2 (dist=1). Next: dequeue vertex 2.",
      "After dequeuing 2: relax 2→1 (dist=1+2=3 < 4, update) and 2→3 (dist=1+5=6). Next: dequeue vertex 1.",
    ],
    source: "22-23 Q3a (21 marks), 21-22 Practice Q3b",
  },
]
