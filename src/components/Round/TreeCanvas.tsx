import { useRef, useState, useCallback, useEffect } from 'react'
import type { CanvasTraceQuestion, TreeNode, BSTSolution, LLRBNode, LLRBSolution, HuffmanNode, HuffmanSolution, TrieNode, TrieSolution } from '../../data/schema'

// ── Internal node representation ──
interface CanvasNode {
  id: string
  key: string
  x: number
  y: number
  parentId: string | null
  isLeft: boolean | null // null for root
  edgeColor?: 'red' | 'black' // for LLRB
  value?: string | null // for trie terminal nodes
  freq?: number // for huffman
}

interface TreeCanvasProps {
  question: CanvasTraceQuestion
  onSubmit: () => void
  readOnly?: boolean
  showSolution?: boolean
}

const NODE_RADIUS = 22
const LEVEL_HEIGHT = 60
const MIN_HORIZONTAL_GAP = 50
const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = 350

// ── Convert solution tree to flat CanvasNode array for display ──
function solutionToNodes(solution: CanvasTraceQuestion['solution']): CanvasNode[] {
  const nodes: CanvasNode[] = []

  function layoutBST(node: TreeNode | null, parentId: string | null, isLeft: boolean | null, depth: number, xMin: number, xMax: number, edgeColor?: 'red' | 'black') {
    if (!node) return
    const id = `sol-${nodes.length}`
    const x = (xMin + xMax) / 2
    const y = 40 + depth * LEVEL_HEIGHT
    nodes.push({ id, key: node.key, x, y, parentId, isLeft, edgeColor })
    layoutBST(node.left, id, true, depth + 1, xMin, x, (node.left as LLRBNode)?.edgeColor)
    layoutBST(node.right, id, false, depth + 1, x, xMax, (node.right as LLRBNode)?.edgeColor)
  }

  function layoutHuffman(node: HuffmanNode | null, parentId: string | null, isLeft: boolean | null, depth: number, xMin: number, xMax: number) {
    if (!node) return
    const id = `sol-${nodes.length}`
    const x = (xMin + xMax) / 2
    const y = 40 + depth * LEVEL_HEIGHT
    const label = node.char ? `${node.char}:${node.freq}` : `${node.freq}`
    nodes.push({ id, key: label, x, y, parentId, isLeft, freq: node.freq })
    layoutHuffman(node.left, id, true, depth + 1, xMin, x)
    layoutHuffman(node.right, id, false, depth + 1, x, xMax)
  }

  function layoutTrie(node: TrieNode | null, parentId: string | null, depth: number, xMin: number, xMax: number) {
    if (!node) return
    const id = `sol-${nodes.length}`
    const x = (xMin + xMax) / 2
    const y = 40 + depth * LEVEL_HEIGHT
    const label = node.value ? `${node.char}(${node.value})` : node.char
    nodes.push({ id, key: label, x, y, parentId, isLeft: null, value: node.value })
    const childWidth = (xMax - xMin) / Math.max(node.children.length, 1)
    node.children.forEach((child, i) => {
      layoutTrie(child, id, depth + 1, xMin + i * childWidth, xMin + (i + 1) * childWidth)
    })
  }

  switch (solution.type) {
    case 'bst':
      layoutBST((solution as BSTSolution).root, null, null, 0, 0, CANVAS_WIDTH)
      break
    case 'llrb':
      if ((solution as LLRBSolution).root) {
        layoutBST((solution as LLRBSolution).root, null, null, 0, 0, CANVAS_WIDTH, 'black')
      }
      break
    case 'huffman':
      layoutHuffman((solution as HuffmanSolution).root, null, null, 0, 0, CANVAS_WIDTH)
      break
    case 'trie':
      layoutTrie((solution as TrieSolution).root, null, 0, 0, CANVAS_WIDTH)
      break
  }

  return nodes
}

// ── Draw tree on canvas ──
function drawTree(
  ctx: CanvasRenderingContext2D,
  nodes: CanvasNode[],
  selectedId: string | null,
  canvasType: string,
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const nodeMap = new Map(nodes.map(n => [n.id, n]))

  // Draw edges
  for (const node of nodes) {
    if (node.parentId) {
      const parent = nodeMap.get(node.parentId)
      if (parent) {
        ctx.beginPath()
        ctx.moveTo(parent.x, parent.y + NODE_RADIUS)
        ctx.lineTo(node.x, node.y - NODE_RADIUS)

        if (canvasType === 'llrb' && node.edgeColor === 'red') {
          ctx.strokeStyle = '#ef4444'
          ctx.lineWidth = 3
        } else {
          ctx.strokeStyle = '#4b5563'
          ctx.lineWidth = 2
        }
        ctx.stroke()
      }
    }
  }

  // Draw nodes
  for (const node of nodes) {
    ctx.beginPath()
    ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2)
    ctx.fillStyle = node.id === selectedId ? '#3b82f6' : '#1e293b'
    ctx.fill()
    ctx.strokeStyle = node.id === selectedId ? '#60a5fa' : '#475569'
    ctx.lineWidth = 2
    ctx.stroke()

    // Node label
    ctx.fillStyle = '#e2e8f0'
    ctx.font = '13px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(node.key, node.x, node.y)
  }
}

export default function TreeCanvas({ question, onSubmit, readOnly = false, showSolution = false }: TreeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [nodes, setNodes] = useState<CanvasNode[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [nextId, setNextId] = useState(0)

  const solutionNodes = solutionToNodes(question.solution)

  // Redraw on state change
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawTree(ctx, readOnly || showSolution ? solutionNodes : nodes, selectedId, question.canvasType)
  }, [nodes, selectedId, readOnly, showSolution, solutionNodes, question.canvasType])

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (readOnly) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if clicking on existing node
    const clicked = nodes.find(n => {
      const dx = n.x - x
      const dy = n.y - y
      return dx * dx + dy * dy <= NODE_RADIUS * NODE_RADIUS
    })

    if (clicked) {
      setSelectedId(prev => prev === clicked.id ? null : clicked.id)
      return
    }

    // Add new node
    const key = prompt('Enter node key:')
    if (!key) return

    const newNode: CanvasNode = {
      id: `user-${nextId}`,
      key,
      x,
      y,
      parentId: selectedId,
      isLeft: selectedId ? x < (nodes.find(n => n.id === selectedId)?.x ?? 0) : null,
    }

    setNodes(prev => [...prev, newNode])
    setNextId(prev => prev + 1)
    setSelectedId(null)
  }, [nodes, selectedId, nextId, readOnly])

  const handleContextMenu = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (readOnly) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const clicked = nodes.find(n => {
      const dx = n.x - x
      const dy = n.y - y
      return dx * dx + dy * dy <= NODE_RADIUS * NODE_RADIUS
    })

    if (clicked) {
      // Delete node and its subtree
      const toDelete = new Set<string>()
      const collectChildren = (id: string) => {
        toDelete.add(id)
        nodes.filter(n => n.parentId === id).forEach(n => collectChildren(n.id))
      }
      collectChildren(clicked.id)
      setNodes(prev => prev.filter(n => !toDelete.has(n.id)))
      setSelectedId(null)
    }
  }, [nodes, readOnly])

  const handleEdgeColorToggle = useCallback(() => {
    if (question.canvasType !== 'llrb' || !selectedId) return
    setNodes(prev => prev.map(n => {
      if (n.id === selectedId) {
        return { ...n, edgeColor: n.edgeColor === 'red' ? 'black' : 'red' }
      }
      return n
    }))
  }, [selectedId, question.canvasType])

  if (showSolution) {
    // Comparison mode: side by side
    return (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-slate-400 mb-2">Your Tree</h3>
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="rounded-lg bg-[#0f1117] border border-[#2e303a] w-full"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-green-400 mb-2">Model Answer</h3>
          <SolutionCanvas solution={question.solution} canvasType={question.canvasType} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={handleCanvasClick}
        onContextMenu={handleContextMenu}
        className="rounded-lg bg-[#0f1117] border border-[#2e303a] cursor-crosshair w-full"
      />
      <div className="mt-2 flex items-center justify-between">
        <div className="flex gap-2 text-xs text-slate-500">
          <span>Click: add/select node</span>
          <span>Right-click: delete</span>
          {question.canvasType === 'llrb' && selectedId && (
            <button onClick={handleEdgeColorToggle} className="text-blue-400 hover:text-blue-300">
              Toggle edge color
            </button>
          )}
        </div>
        {!readOnly && (
          <button
            onClick={onSubmit}
            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
          >
            Submit <span className="text-blue-200 text-sm">(Cmd+Enter)</span>
          </button>
        )}
      </div>
    </div>
  )
}

// ── Separate canvas for the solution display ──
function SolutionCanvas({ solution, canvasType }: { solution: CanvasTraceQuestion['solution']; canvasType: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const solutionNodes = solutionToNodes(solution as CanvasTraceQuestion['solution'])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawTree(ctx, solutionNodes, null, canvasType)
  }, [solutionNodes, canvasType])

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="rounded-lg bg-[#0f1117] border border-[#2e303a] w-full"
    />
  )
}
