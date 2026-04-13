import type { ImplementationQuestion, TableTraceQuestion } from '../schema'

export const graphQuestions: (ImplementationQuestion | TableTraceQuestion)[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // IMPLEMENTATION QUESTIONS (10)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 1. DFS Recursive ──
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
    },
    complexity: {
      question: "What is the time complexity of DFS?",
      answer: "O(V + E) — visits each vertex once and examines each edge twice (once from each endpoint).",
    },
    source: "21-22 Q3a; syllabus",
  },

  // ── 2. DFS Iterative with Explicit Stack ──
  {
    id: "graphs-dfs-iterative-full",
    type: "implement",
    topic: "graphs",
    tier: "full",
    title: "DFS (Iterative with Explicit Stack)",
    prompt: "Implement depth-first search using an explicit stack instead of recursion. Mark all vertices reachable from source vertex s and record the edgeTo[] array for path reconstruction.",
    hints: [
      "Function signature: dfs_iterative(graph, s, V) → (visited[], edgeTo[])",
      "Push s onto the stack. While stack is not empty: pop a vertex v, if not visited mark it and push all unvisited neighbours.",
      "stack.push(s)\nwhile not stack.isEmpty():\n  v = stack.pop()\n  if not visited[v]:\n    visited[v] = true\n    for each w in graph.adj(v):\n      if not visited[w]:\n        edgeTo[w] = v\n        stack.push(w)",
    ],
    solutions: {
      pseudocode: `function dfs_iterative(graph, s, V):
  visited = new boolean[V], fill with false
  edgeTo = new int[V], fill with -1
  stack = new Stack()
  stack.push(s)
  while not stack.isEmpty():
    v = stack.pop()
    if not visited[v]:
      visited[v] = true
      for each w in graph.adj(v):
        if not visited[w]:
          edgeTo[w] = v
          stack.push(w)
  return (visited, edgeTo)`,
    },
    complexity: {
      question: "What is the time complexity of iterative DFS, and how does it differ from recursive DFS?",
      answer: "O(V + E) — same as recursive DFS. The explicit stack replaces the call stack. A vertex may be pushed multiple times (once per edge), but is only processed once due to the visited check after popping.",
    },
    source: "Syllabus; 21-22 Q3a 'LIFO queue' trick",
  },

  // ── 3. BFS Iterative with Queue ──
  {
    id: "graphs-bfs-full",
    type: "implement",
    topic: "graphs",
    tier: "full",
    title: "BFS (Iterative with Queue)",
    prompt: "Implement breadth-first search on a graph represented as an adjacency list. Track distances from source vertex s and the edgeTo[] array for path reconstruction.",
    hints: [
      "Function signature: bfs(graph, s) → (distToSource[], edgeTo[])",
      "Use a queue. Enqueue s with distance 0. For each dequeued vertex, enqueue all unvisited neighbours with distance + 1.",
      "queue.enqueue(s)\ndistToSource[s] = 0\nwhile queue not empty:\n  v = queue.dequeue()\n  for each w in adj(v):\n    if distToSource[w] == -1:\n      distToSource[w] = distToSource[v] + 1\n      edgeTo[w] = v\n      queue.enqueue(w)",
    ],
    solutions: {
      pseudocode: `function bfs(graph, s, V):
  distToSource = new int[V], fill with -1
  edgeTo = new int[V], fill with -1
  distToSource[s] = 0
  queue = new Queue()
  queue.enqueue(s)
  while not queue.isEmpty():
    v = queue.dequeue()
    for each w in graph.adj(v):
      if distToSource[w] == -1:
        distToSource[w] = distToSource[v] + 1
        edgeTo[w] = v
        queue.enqueue(w)
  return (distToSource, edgeTo)`,
    },
    complexity: {
      question: "What is the time complexity of BFS?",
      answer: "O(V + E) — same as DFS. Each vertex is enqueued and dequeued once; each edge is examined once.",
    },
    source: "21-22 Q3a(ii) (8 marks)",
  },

  // ── 4. Bipartiteness Check via BFS 2-Colouring ──
  {
    id: "graphs-bipartite-exam",
    type: "implement",
    topic: "graphs",
    tier: "exam",
    title: "Bipartiteness Check (BFS 2-Colouring)",
    prompt: "Given an undirected graph as an adjacency list, determine whether it is bipartite. Use BFS to attempt a 2-colouring: assign alternating colours to vertices level by level. If any edge connects two vertices of the same colour, the graph is not bipartite.",
    hints: [
      "Function signature: isBipartite(graph, V) → boolean. Use a colour[] array initialised to -1 (uncoloured).",
      "For each uncoloured vertex, run BFS: colour it 0, enqueue it. For each dequeued vertex v, colour all uncoloured neighbours with 1 - colour[v]. If a neighbour already has the same colour as v, return false.",
      "for each vertex s where colour[s] == -1:\n  colour[s] = 0\n  queue.enqueue(s)\n  while queue not empty:\n    v = queue.dequeue()\n    for w in adj(v):\n      if colour[w] == -1:\n        colour[w] = 1 - colour[v]\n        queue.enqueue(w)\n      else if colour[w] == colour[v]:\n        return false\nreturn true",
    ],
    solutions: {
      pseudocode: `function isBipartite(graph, V):
  colour = new int[V], fill with -1
  for s = 0 to V-1:
    if colour[s] != -1:
      continue
    colour[s] = 0
    queue = new Queue()
    queue.enqueue(s)
    while not queue.isEmpty():
      v = queue.dequeue()
      for each w in graph.adj(v):
        if colour[w] == -1:
          colour[w] = 1 - colour[v]
          queue.enqueue(w)
        else if colour[w] == colour[v]:
          return false
  return true`,
    },
    complexity: {
      question: "What is the time complexity of the bipartiteness check?",
      answer: "O(V + E) — standard BFS. The outer loop handles disconnected components but each vertex and edge is still visited once overall.",
    },
    source: "21-22 LSA Q3 (25 marks, entire question)",
  },

  // ── 5. Graph Diameter via BFS from Every Vertex ──
  {
    id: "graphs-diameter-exam",
    type: "implement",
    topic: "graphs",
    tier: "exam",
    title: "Graph Diameter via BFS",
    prompt: "Compute the diameter of an unweighted, connected graph — the maximum shortest-path distance between any pair of vertices. Use BFS from every vertex to find all pairwise shortest distances, then return the maximum.",
    hints: [
      "Function signature: diameter(graph, V) → int. Run BFS from each vertex and record the maximum distance found.",
      "For each vertex s, run BFS to compute distTo[]. The eccentricity of s is max(distTo[]). The diameter is the maximum eccentricity across all vertices.",
      "maxDist = 0\nfor s = 0 to V-1:\n  distTo = bfs(graph, s)\n  for d in distTo:\n    maxDist = max(maxDist, d)\nreturn maxDist",
    ],
    solutions: {
      pseudocode: `function diameter(graph, V):
  maxDist = 0
  for s = 0 to V-1:
    distTo = new int[V], fill with -1
    distTo[s] = 0
    queue = new Queue()
    queue.enqueue(s)
    while not queue.isEmpty():
      v = queue.dequeue()
      for each w in graph.adj(v):
        if distTo[w] == -1:
          distTo[w] = distTo[v] + 1
          queue.enqueue(w)
    for each d in distTo:
      maxDist = max(maxDist, d)
  return maxDist`,
    },
    complexity: {
      question: "What is the time complexity of computing the graph diameter this way?",
      answer: "O(V(V + E)) — we run BFS V times, each taking O(V + E). For sparse graphs (E ~ V), this is O(V^2). For dense graphs (E ~ V^2), this is O(V^3).",
    },
    source: "21-22 Practice Q3a (15 marks)",
  },

  // ── 6. Dijkstra's Algorithm ──
  {
    id: "graphs-dijkstra-full",
    type: "implement",
    topic: "graphs",
    tier: "full",
    title: "Dijkstra's Algorithm",
    prompt: "Implement Dijkstra's shortest-path algorithm for a weighted directed graph with non-negative edge weights. Use a min-priority queue (one that supports decrease-key, or a simpler lazy variant). Return distTo[] and edgeTo[] arrays.",
    hints: [
      "Function signature: dijkstra(graph, s, V) → (distTo[], edgeTo[]). Initialise distTo[s] = 0, all others = ∞.",
      "Use a min-priority queue keyed by distTo[]. Repeatedly extract the vertex v with minimum distance. For each neighbour w, relax edge v→w: if distTo[v] + weight(v,w) < distTo[w], update distTo[w] and edgeTo[w].",
      "pq.insert(s, 0)\nwhile not pq.isEmpty():\n  v = pq.extractMin()\n  for each edge v→w with weight wt:\n    if distTo[v] + wt < distTo[w]:\n      distTo[w] = distTo[v] + wt\n      edgeTo[w] = v\n      pq.decreaseKey(w, distTo[w])  // or insert if not present",
    ],
    solutions: {
      pseudocode: `function dijkstra(graph, s, V):
  distTo = new double[V], fill with ∞
  edgeTo = new int[V], fill with -1
  distTo[s] = 0
  pq = new MinPriorityQueue()     // supports decrease-key
  pq.insert(s, 0.0)
  while not pq.isEmpty():
    v = pq.extractMin()
    for each edge (v, w, weight) in graph.adj(v):
      if distTo[v] + weight < distTo[w]:
        distTo[w] = distTo[v] + weight
        edgeTo[w] = v
        if pq.contains(w):
          pq.decreaseKey(w, distTo[w])
        else:
          pq.insert(w, distTo[w])
  return (distTo, edgeTo)`,
    },
    complexity: {
      question: "What is the time complexity of Dijkstra's algorithm with a binary-heap min-priority queue that supports decrease-key?",
      answer: "O(E log V) — each of the E edge relaxations may trigger a decrease-key operation costing O(log V). Each of the V extract-min operations also costs O(log V).",
    },
    source: "22-23 Q3a (21 marks), 21-22 Practice Q3b",
  },

  // ── 7. Monotonic Shortest Path ──
  {
    id: "graphs-monotonic-sp-exam",
    type: "implement",
    topic: "graphs",
    tier: "exam",
    title: "Monotonic Shortest Path",
    prompt: "Given a weighted directed graph, find the shortest path from s to every vertex such that edge weights along the path are strictly increasing. Modify Dijkstra's algorithm: when relaxing edges from vertex v, only relax edge v→w if weight(v→w) > the weight of the last edge used to reach v. Track the last edge weight used to reach each vertex.",
    hints: [
      "Key insight: the state is (vertex, last_edge_weight), not just vertex. A vertex can be reached via different 'last weights', each enabling different future edges.",
      "Use a min-PQ of (distance, vertex, last_weight). For each state popped, relax edges with weight strictly greater than last_weight. Update distTo[w] only if the new distance is shorter.",
      "pq = [(0, s, -∞)]\nwhile pq not empty:\n  (d, v, lastWt) = pq.extractMin()\n  for each edge v→w with weight wt:\n    if wt > lastWt and d + wt < distTo[w]:\n      distTo[w] = d + wt\n      edgeTo[w] = v\n      pq.insert((distTo[w], w, wt))",
    ],
    solutions: {
      pseudocode: `function monotonicSP(graph, s, V):
  distTo = new double[V], fill with ∞
  edgeTo = new int[V], fill with -1
  distTo[s] = 0
  pq = new MinPriorityQueue()  // entries: (distance, vertex, lastEdgeWeight)
  pq.insert((0, s, -∞))
  while not pq.isEmpty():
    (d, v, lastWt) = pq.extractMin()
    if d > distTo[v]:
      continue            // stale entry — already found a better path
    for each edge (v, w, weight) in graph.adj(v):
      if weight > lastWt:                    // monotonicity constraint
        newDist = distTo[v] + weight
        if newDist < distTo[w]:
          distTo[w] = newDist
          edgeTo[w] = v
          pq.insert((newDist, w, weight))
  return (distTo, edgeTo)`,
    },
    complexity: {
      question: "What is the time complexity of monotonic shortest path?",
      answer: "O(E log E) in the worst case — each edge may generate a PQ entry (since the same vertex can be reached with different last-weights). With E entries, each insert/extract-min is O(log E).",
    },
    source: "22-23 Q3b (14 marks, verbatim)",
  },

  // ── 8. Kruskal's Algorithm ──
  {
    id: "graphs-kruskal-full",
    type: "implement",
    topic: "graphs",
    tier: "full",
    title: "Kruskal's Algorithm",
    prompt: "Implement Kruskal's algorithm to find the minimum spanning tree (MST) of a weighted undirected graph. Sort edges by weight, then greedily add each edge if it doesn't create a cycle (use Union-Find to detect cycles). Return the list of MST edges.",
    hints: [
      "Function signature: kruskal(edges[], V) → mstEdges[]. Sort all edges by weight ascending.",
      "Initialise a Union-Find with V components. For each edge (u, v, w) in sorted order: if find(u) != find(v), add edge to MST and union(u, v). Stop when MST has V-1 edges.",
      "sort edges by weight\nuf = new UnionFind(V)\nmst = []\nfor each (u, v, w) in edges:\n  if uf.find(u) != uf.find(v):\n    mst.add((u, v, w))\n    uf.union(u, v)\n    if |mst| == V - 1: break\nreturn mst",
    ],
    solutions: {
      pseudocode: `function kruskal(edges[], V):
  sort edges by weight ascending
  uf = new UnionFind(V)
  mst = []
  for each (u, v, weight) in edges:
    if uf.find(u) != uf.find(v):
      mst.add((u, v, weight))
      uf.union(u, v)
      if mst.size() == V - 1:
        break
  return mst`,
    },
    complexity: {
      question: "What is the time complexity of Kruskal's algorithm?",
      answer: "O(E log E) — dominated by sorting edges. The Union-Find operations (with weighted union) cost O(log V) each, so processing edges is O(E log V). Since log E ≤ 2 log V, the sort dominates.",
    },
    source: "21-22 Q3b (15 marks), 23-24 Q3a",
  },

  // ── 9. Prim's Algorithm ──
  {
    id: "graphs-prim-full",
    type: "implement",
    topic: "graphs",
    tier: "full",
    title: "Prim's Algorithm",
    prompt: "Implement Prim's algorithm (lazy version) to find the minimum spanning tree of a weighted undirected graph. Start from vertex 0. Use a min-priority queue of crossing edges. Return the list of MST edges.",
    hints: [
      "Function signature: prim(graph, V) → mstEdges[]. Mark vertex 0 as visited and add all its edges to the PQ.",
      "While PQ is not empty and MST has fewer than V-1 edges: extract min-weight edge (u, v, w). If v is already visited, skip (lazy deletion). Otherwise, mark v visited, add edge to MST, and enqueue all edges from v to unvisited vertices.",
      "visit(0)\nwhile not pq.isEmpty() and |mst| < V-1:\n  (u, v, w) = pq.extractMin()\n  if visited[v]: continue\n  visited[v] = true\n  mst.add((u, v, w))\n  for each (v, x, wt) in adj(v):\n    if not visited[x]: pq.insert((v, x, wt))",
    ],
    solutions: {
      pseudocode: `function prim(graph, V):
  visited = new boolean[V], fill with false
  mst = []
  pq = new MinPriorityQueue()    // keyed by edge weight

  // visit vertex 0
  visited[0] = true
  for each (0, w, weight) in graph.adj(0):
    pq.insert((0, w, weight))

  while not pq.isEmpty() and mst.size() < V - 1:
    (u, v, weight) = pq.extractMin()
    if visited[v]:
      continue        // lazy deletion
    visited[v] = true
    mst.add((u, v, weight))
    for each (v, x, wt) in graph.adj(v):
      if not visited[x]:
        pq.insert((v, x, wt))
  return mst`,
    },
    complexity: {
      question: "What is the time complexity of lazy Prim's algorithm?",
      answer: "O(E log E) time, O(E) extra space — each edge may be inserted into the PQ once, and each insert/extract-min is O(log E). The eager version (with a min-PQ supporting decrease-key) achieves O(E log V).",
    },
    source: "23-24 Q3c (12 marks)",
  },

  // ── 10. Topological Sort — DFS Reverse Post-Order ──
  {
    id: "graphs-topo-sort-full",
    type: "implement",
    topic: "graphs",
    tier: "full",
    title: "Topological Sort (DFS Reverse Post-Order)",
    prompt: "Implement topological sort on a directed acyclic graph (DAG) using DFS reverse post-order. Return the vertices in topological order (a linear ordering such that for every directed edge u→v, u appears before v).",
    hints: [
      "Function signature: topologicalSort(graph, V) → order[]. Run DFS and record the post-order (when a vertex finishes, push it onto a stack or append to a list).",
      "Post-order: after all neighbours of v are fully explored, record v. Reverse post-order gives topological order.",
      "function dfs(v):\n  visited[v] = true\n  for each w in adj(v):\n    if not visited[w]: dfs(w)\n  reversePost.push(v)\n\nfor each v in 0..V-1:\n  if not visited[v]: dfs(v)\nreturn reversePost reversed",
    ],
    solutions: {
      pseudocode: `function topologicalSort(graph, V):
  visited = new boolean[V], fill with false
  reversePost = new Stack()

  function dfs(v):
    visited[v] = true
    for each w in graph.adj(v):
      if not visited[w]:
        dfs(w)
    reversePost.push(v)     // post-order: record after all descendants done

  for v = 0 to V-1:
    if not visited[v]:
      dfs(v)

  // pop from stack gives reverse post-order = topological order
  order = []
  while not reversePost.isEmpty():
    order.add(reversePost.pop())
  return order`,
    },
    complexity: {
      question: "What is the time complexity of topological sort via DFS?",
      answer: "O(V + E) — standard DFS. The reversal is O(V). Only works on DAGs; if the graph has a cycle, the result is not a valid topological order.",
    },
    source: "Syllabus; DFS RPO tested in 21-22 Q3a",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONCEPTUAL QUESTIONS (4)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 11. Kosaraju's SCC (Conceptual) ──
  {
    id: "graphs-kosaraju-conceptual",
    type: "implement",
    topic: "graphs",
    tier: "conceptual",
    title: "Kosaraju's SCC Algorithm",
    prompt: "Describe Kosaraju's algorithm for finding strongly connected components (SCCs) in a directed graph. Explain the two-pass idea, what each pass does, and justify its correctness. State the time complexity.",
    hints: [
      "The algorithm has two DFS passes and uses the reverse graph G^R.",
      "Pass 1: Run DFS on the reverse graph G^R and record the reverse post-order. Pass 2: Run DFS on the original graph G, processing vertices in the reverse post-order from Pass 1.",
      "Think about why reverse post-order on G^R ensures that in Pass 2, we always start from a 'source SCC' — one with no incoming edges from other SCCs in the DAG of SCCs.",
    ],
    solutions: {
      pseudocode: `Kosaraju's Algorithm — Two-Pass SCC Detection:

1. Compute reverse post-order of G^R (the reverse graph):
   - Build G^R by reversing all edges in G.
   - Run DFS on G^R, recording finish times.
   - The reverse post-order of G^R is the reverse of the DFS finish order.

2. Run DFS on original graph G in that order:
   - Process vertices in the reverse post-order from step 1.
   - Each DFS tree in this pass is one strongly connected component.
   - All vertices reached from a single DFS root belong to the same SCC.

Correctness:
- The reverse post-order of G^R gives a topological order of the
  "meta-graph" (DAG of SCCs). Processing in this order ensures we
  start from an SCC with no incoming edges from other SCCs, so
  DFS on G cannot escape into a different SCC.

Time complexity: O(V + E)
- Two DFS passes (each O(V + E)) plus O(V + E) to build G^R.`,
    },
    complexity: {
      question: "",
      answer: "",
    },
    source: "Never examined (0/6); Section B curveball",
  },

  // ── 12. Bellman-Ford (Conceptual) ──
  {
    id: "graphs-bellman-ford-conceptual",
    type: "implement",
    topic: "graphs",
    tier: "conceptual",
    title: "Bellman-Ford Algorithm",
    prompt: "Describe the Bellman-Ford algorithm for single-source shortest paths. Explain: (1) What it does, (2) how the V-1 relaxation rounds work, (3) how to detect negative cycles, and (4) when to use it instead of Dijkstra.",
    hints: [
      "Bellman-Ford relaxes ALL edges in each round, not just edges from the minimum-distance vertex.",
      "After V-1 rounds, all shortest paths are found (a shortest path has at most V-1 edges). A V-th round that still relaxes an edge indicates a negative cycle.",
      "Key difference from Dijkstra: Bellman-Ford works with negative edge weights. Dijkstra fails because it assumes 'once a vertex is settled, its distance is final' — negative edges can violate this.",
    ],
    solutions: {
      pseudocode: `Bellman-Ford Algorithm:

What it does: Computes shortest paths from a source s to all vertices
in a weighted directed graph, even with NEGATIVE edge weights.

Algorithm (V-1 rounds of full relaxation):
  distTo[s] = 0, distTo[all others] = ∞
  Repeat V-1 times:
    for each edge (u, v, w) in ALL edges:
      if distTo[u] + w < distTo[v]:
        distTo[v] = distTo[u] + w
        edgeTo[v] = u

Why V-1 rounds suffice:
  A shortest path visits at most V-1 edges (no repeated vertices in
  the absence of negative cycles). Round k correctly computes all
  shortest paths using at most k edges. After V-1 rounds, all
  shortest paths are found.

Negative cycle detection:
  Run one more (V-th) round of relaxation. If ANY edge is still
  relaxed, a negative-weight cycle is reachable from s.

When to use over Dijkstra:
  - Graph has negative-weight edges (Dijkstra assumes non-negative).
  - Need to detect negative cycles.
  - Dijkstra fails with negative edges because its greedy "settle
    the closest vertex" assumption breaks — a later edge with
    negative weight can reduce a previously-settled distance.

Time complexity: O(VE) — V-1 rounds, each examining all E edges.
Space: O(V) for distTo[] and edgeTo[].`,
    },
    complexity: {
      question: "",
      answer: "",
    },
    source: "Never examined; comparison point for Dijkstra",
  },

  // ── 13. Floyd-Warshall (Conceptual) ──
  {
    id: "graphs-floyd-warshall-conceptual",
    type: "implement",
    topic: "graphs",
    tier: "conceptual",
    title: "Floyd-Warshall Algorithm",
    prompt: "Describe the Floyd-Warshall algorithm for all-pairs shortest paths. State the DP recurrence, explain what the 'intermediate vertex' k means, and give the time and space complexity.",
    hints: [
      "Floyd-Warshall considers paths that pass through intermediate vertices {0, 1, ..., k} and builds up from k=0 to k=V-1.",
      "The recurrence is: dist[i][j] through vertices {0..k} = min(dist[i][j] through {0..k-1}, dist[i][k] + dist[k][j]).",
      "Three nested loops: for k, for i, for j. The order matters — k must be the outermost loop.",
    ],
    solutions: {
      pseudocode: `Floyd-Warshall Algorithm — All-Pairs Shortest Paths:

Problem: Find shortest paths between ALL pairs of vertices.

DP Recurrence:
  Let dist_k(i, j) = shortest path from i to j using only
  intermediate vertices from {0, 1, ..., k}.

  dist_k(i, j) = min(
    dist_{k-1}(i, j),          // best path NOT through k
    dist_{k-1}(i, k) + dist_{k-1}(k, j)  // path through k
  )

  Base case: dist_{-1}(i, j) = weight(i, j) if edge exists, else ∞.
             dist_{-1}(i, i) = 0.

Algorithm:
  Initialise dist[i][j] from adjacency matrix (∞ for no edge, 0 on diagonal).
  for k = 0 to V-1:
    for i = 0 to V-1:
      for j = 0 to V-1:
        if dist[i][k] + dist[k][j] < dist[i][j]:
          dist[i][j] = dist[i][k] + dist[k][j]

Why k is outermost:
  When computing dist_k, we need all values of dist_{k-1} to be
  available. If k is the outer loop, the i-j updates for round k
  correctly use values from round k-1 (in-place update is safe
  because dist[i][k] and dist[k][j] don't change during round k).

Time complexity: O(V^3) — three nested loops over V.
Space complexity: O(V^2) — the distance matrix (can be done in-place).

Handles negative weights (but not negative cycles).
Detects negative cycles if dist[i][i] < 0 for any i after running.`,
    },
    complexity: {
      question: "",
      answer: "",
    },
    source: "Never examined; Section B",
  },

  // ── 14. Decrease-Key for Dijkstra/Prim (Conceptual) ──
  {
    id: "graphs-indexed-pq-conceptual",
    type: "implement",
    topic: "graphs",
    tier: "conceptual",
    title: "Decrease-Key for Dijkstra/Prim",
    prompt: "Explain why Dijkstra's and Prim's algorithms benefit from a decrease-key operation on the priority queue, how the PQ must be augmented to support it efficiently, and compare the resulting complexity with and without decrease-key.",
    hints: [
      "In Dijkstra/Prim, when we relax an edge to vertex w, we need to update w's priority if it's already in the PQ.",
      "A plain binary heap doesn't support decrease-key efficiently because you can't find w's position in O(1).",
      "Augment the heap with a position array: pos[v] = index of v in the heap. This allows O(1) lookup of w's position, then O(log n) bubble-up to restore heap order.",
    ],
    solutions: {
      pseudocode: `Why Dijkstra/Prim Need decrease-key:

The problem:
  In Dijkstra's (and Prim's), when we relax edge v→w:
    - If w is not yet in the PQ: insert w with its new priority.
    - If w IS already in the PQ with a higher priority: we need to
      DECREASE its key (update its priority to a lower value).

  Without decrease-key, we must either:
    (a) Insert duplicate entries for w (lazy approach — O(E log E)),
    (b) Or do a linear scan to find and update w (O(V) per update).

How to support decrease-key efficiently:
  Augment the binary heap with a position array so we can find a
  vertex's heap position in O(1):

    - keys[v] = priority of vertex v
    - heap[k] = which vertex is at heap position k
    - pos[v]  = heap position of vertex v  (the INDEX array)

  Key operations and their complexity:
    insert(v, key):      O(log n)  — append + bubble-up
    extractMin():        O(log n)  — swap root with last + bubble-down
    decreaseKey(v, key): O(log n)  — update keys[v], then bubble-up(pos[v])
    contains(v):         O(1)      — check if pos[v] is valid

  The pos[] array is the crucial addition — it lets us find vertex v's
  position in the heap in O(1), making decrease-key O(log n).

Complexity comparison for Dijkstra:
  With decrease-key PQ: O(E log V) — E relaxations × O(log V) each
  With lazy PQ:         O(E log E) — may have E entries in PQ
  Since log E ≤ 2 log V, lazy is at most 2x slower in practice.

Why it matters:
  Supporting decrease-key is the theoretically optimal approach.
  Prim's eager version also uses it: each vertex appears in the PQ
  at most once, and we decrease-key when we find a cheaper crossing edge.`,
    },
    complexity: {
      question: "",
      answer: "",
    },
    source: "Never standalone; tested within Dijkstra cost analysis",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TRACE TABLE QUESTIONS (5)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 15. DFS Traversal Order Trace ──
  {
    id: "graphs-trace-dfs-order-full",
    type: "trace-table",
    topic: "graphs",
    tier: "full",
    title: "DFS Traversal Order Trace",
    prompt: "Trace DFS on the following directed graph starting from vertex 0. Process adjacency lists in numerical order. Record the pre-order (when first visited), post-order (when finished), and reverse post-order.\n\nAdjacency lists:\n0: [1, 2]\n1: [3]\n2: [3, 4]\n3: [5]\n4: [5]\n5: []",
    inputData: "6 vertices (DAG). 0→1, 0→2, 1→3, 2→3, 2→4, 3→5, 4→5. Start: vertex 0.",
    table: {
      columns: ["Vertex", "Pre-order #", "Post-order #"],
      rows: 6,
      solution: [
        ["0", "1", "6"],
        ["1", "2", "4"],
        ["2", "5", "5"],
        ["3", "3", "2"],
        ["4", "6", "4"],
        ["5", "4", "1"],
      ],
    },
    hints: [
      "Start DFS from 0: pre(0)=1. Visit neighbour 1: pre(1)=2. Visit 1's neighbour 3: pre(3)=3.",
      "From 3, visit 5: pre(5)=4. Vertex 5 has no neighbours → post(5)=1. Backtrack to 3 (finished) → post(3)=2.",
      "Backtrack to 1 (finished) → post(1)=3. Backtrack to 0, visit 2: pre(2)=5. From 2, neighbour 3 already visited, visit 4: pre(4)=6. From 4, neighbour 5 already visited → post(4)=4. Backtrack to 2 → post(2)=5. Backtrack to 0 → post(0)=6. Reverse post-order: [0, 2, 4, 1, 3, 5].",
    ],
    source: "21-22 Q3a(i)",
  },

  // ── 16. BFS Traversal + Dequeue Order Trace ──
  {
    id: "graphs-trace-bfs-order-full",
    type: "trace-table",
    topic: "graphs",
    tier: "full",
    title: "BFS Traversal Trace",
    prompt: "Trace BFS on the following undirected graph starting from vertex 0. Process adjacency lists in numerical order. Show the queue state and vertex dequeued at each step.\n\nAdjacency lists:\n0: [1, 3]\n1: [0, 2, 3]\n2: [1, 4]\n3: [0, 1, 4]\n4: [2, 3]",
    inputData: "5 vertices (undirected). Edges: 0-1, 0-3, 1-2, 1-3, 2-4, 3-4. Start: vertex 0.",
    table: {
      columns: ["Step", "Dequeued", "Queue after enqueuing neighbours", "distToSource[]"],
      rows: 5,
      solution: [
        ["1", "0", "[1, 3]", "[0, 1, -, 1, -]"],
        ["2", "1", "[3, 2]", "[0, 1, 2, 1, -]"],
        ["3", "3", "[2, 4]", "[0, 1, 2, 1, 2]"],
        ["4", "2", "[4]", "[0, 1, 2, 1, 2]"],
        ["5", "4", "[]", "[0, 1, 2, 1, 2]"],
      ],
    },
    hints: [
      "Start: enqueue 0 with dist 0. Dequeue 0, enqueue unvisited neighbours 1 (dist 1) and 3 (dist 1).",
      "Dequeue 1. Its neighbours: 0 (visited), 2 (unvisited, dist 2), 3 (already discovered). Enqueue 2.",
      "Dequeue 3. Its neighbours: 0 (visited), 1 (visited), 4 (unvisited, dist 2). Enqueue 4. Continue until queue empty.",
    ],
    source: "21-22 Q3a(ii)",
  },

  // ── 17. Dijkstra Trace ──
  {
    id: "graphs-trace-dijkstra-full",
    type: "trace-table",
    topic: "graphs",
    tier: "full",
    title: "Dijkstra Trace",
    prompt: "Trace Dijkstra's algorithm on the following weighted directed graph starting from vertex 0.\nEdges: 0→1 (w=4), 0→2 (w=1), 1→3 (w=1), 2→1 (w=2), 2→3 (w=5)\nShow the vertex dequeued, distTo[], and edgeTo[] after each relaxation step.",
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

  // ── 18. Kruskal Trace ──
  {
    id: "graphs-trace-kruskal-full",
    type: "trace-table",
    topic: "graphs",
    tier: "full",
    title: "Kruskal Trace",
    prompt: "Trace Kruskal's algorithm on the following weighted undirected graph with 6 vertices (0-5).\nEdges sorted by weight: (0,1,1), (2,3,2), (1,2,3), (0,3,4), (3,4,5), (4,5,6), (1,3,7), (2,5,8)\nFor each edge considered, show whether it was accepted or rejected (would form a cycle), and the Union-Find state.",
    inputData: "6 vertices, 8 edges sorted by weight: 0-1(1), 2-3(2), 1-2(3), 0-3(4), 3-4(5), 4-5(6), 1-3(7), 2-5(8)",
    table: {
      columns: ["Edge", "Weight", "Accepted?", "Reason", "MST edges so far"],
      rows: 6,
      solution: [
        ["0-1", "1", "Yes", "Different components", "0-1"],
        ["2-3", "2", "Yes", "Different components", "0-1, 2-3"],
        ["1-2", "3", "Yes", "Different components", "0-1, 2-3, 1-2"],
        ["0-3", "4", "No", "Same component (cycle)", "0-1, 2-3, 1-2"],
        ["3-4", "5", "Yes", "Different components", "0-1, 2-3, 1-2, 3-4"],
        ["4-5", "6", "Yes", "Different components", "0-1, 2-3, 1-2, 3-4, 4-5"],
      ],
    },
    hints: [
      "Start: each vertex is its own component. Edge 0-1 (w=1): 0 and 1 in different components → accept, union(0,1).",
      "Edge 2-3 (w=2): different components → accept. Edge 1-2 (w=3): 1 is in {0,1} and 2 is in {2,3}, different → accept. Now {0,1,2,3} are connected.",
      "Edge 0-3 (w=4): both in {0,1,2,3} → reject (cycle). Edge 3-4 (w=5): 3 in {0,1,2,3}, 4 alone → accept. Edge 4-5 (w=6): accept. MST complete with 5 edges.",
    ],
    source: "21-22 Q3b, 23-24 Q3a",
  },

  // ── 19. Prim Trace ──
  {
    id: "graphs-trace-prim-full",
    type: "trace-table",
    topic: "graphs",
    tier: "full",
    title: "Prim Trace",
    prompt: "Trace Prim's algorithm (lazy version) on the following weighted undirected graph starting from vertex 0.\nAdjacency lists:\n0: [(1,4), (2,8)]\n1: [(0,4), (2,2), (3,5)]\n2: [(0,8), (1,2), (3,1), (4,3)]\n3: [(1,5), (2,1), (4,7)]\n4: [(2,3), (3,7)]\nShow the vertex added to the MST, the edge used, and the PQ state after each step.",
    inputData: "5 vertices, edges: 0-1(4), 0-2(8), 1-2(2), 1-3(5), 2-3(1), 2-4(3), 3-4(7). Start from vertex 0.",
    table: {
      columns: ["Step", "Vertex Added", "Edge Used", "MST Weight So Far"],
      rows: 5,
      solution: [
        ["1", "0", "—", "0"],
        ["2", "1", "0-1 (w=4)", "4"],
        ["3", "2", "1-2 (w=2)", "6"],
        ["4", "3", "2-3 (w=1)", "7"],
        ["5", "4", "2-4 (w=3)", "10"],
      ],
    },
    hints: [
      "Start: mark 0 as visited, add edges (0,1,4) and (0,2,8) to PQ. Min edge: (0,1,4). Mark 1 as visited.",
      "From 1: add edges (1,2,2) and (1,3,5) to PQ. Min edge in PQ: (1,2,2). Mark 2 as visited.",
      "From 2: add edges (2,3,1) and (2,4,3). Edge (2,0,8) skipped (0 visited). Min edge: (2,3,1). Mark 3. From 3: add (3,4,7). Min of remaining: (2,4,3). Mark 4. MST total = 4+2+1+3 = 10.",
    ],
    source: "23-24 Q3c (12 marks)",
  },
]
