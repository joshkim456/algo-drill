import { useEffect, useRef, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TOPIC_LABELS } from '../../data/schema'
import type { Topic, ImplementationQuestion, TableTraceQuestion } from '../../data/schema'
import { useStorage } from '../../hooks/useStorage'
import { useRound } from '../../hooks/useRound'
import { useKeyboard } from '../../hooks/useKeyboard'
import { gradeTable } from '../../utils/gradeTable'
import QuestionCard from './QuestionCard'
import CodeEditor from './CodeEditor'
import TraceTable from './TraceTable'
import RevealPanel from './RevealPanel'
import GradeButtons from './GradeButtons'
import HintButton from './HintButton'
import CopyForClaude from './CopyForClaude'
import { formatCopyForClaude } from '../../utils/clipboard'

export default function RoundScreen() {
  const { section, topic } = useParams<{ section: string; topic: string }>()
  const navigate = useNavigate()
  const storage = useStorage()
  const round = useRound(storage)
  const language = storage.getLanguage()
  const [editorFocused, setEditorFocused] = useState(false)
  const [userCode, setUserCode] = useState('')
  const editorContainerRef = useRef<HTMLDivElement>(null)

  // Trace table state
  const [tableValues, setTableValues] = useState<string[][] | null>(null)
  const [tableResult, setTableResult] = useState<ReturnType<typeof gradeTable> | null>(null)

  // Start round on mount
  useEffect(() => {
    if (topic && section) {
      round.startRound(topic as Topic, section as 'implementation' | 'trace')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, section])

  // Reset state when question changes
  useEffect(() => {
    setUserCode('')
    setTableValues(null)
    setTableResult(null)
  }, [round.currentQuestion?.id])

  // Get user code from editor
  const getUserCode = useCallback(() => {
    if (editorContainerRef.current) {
      const editorEl = editorContainerRef.current.querySelector('[class*="cm-editor"]')?.parentElement
      if (editorEl && (editorEl as any).__getValue) {
        return (editorEl as any).__getValue()
      }
    }
    return userCode
  }, [userCode])

  const handleSubmit = useCallback(() => {
    if (round.state?.phase === 'answering') {
      const q = round.currentQuestion
      if (q?.type === 'trace-table') {
        // Don't use round.submitAnswer — TraceTable handles its own submit
        return
      }
      setUserCode(getUserCode())
      round.submitAnswer()
    }
  }, [round, getUserCode])

  const handleTableSubmit = useCallback((values: string[][], result: ReturnType<typeof gradeTable>) => {
    setTableValues(values)
    setTableResult(result)
    // If 100% correct and no self-grade cells → auto "Got it"
    if (result.correct === result.total && !result.hasSelfGrade) {
      round.submitAnswer()
      // Slight delay then auto-grade
      setTimeout(() => round.gradeGotIt(), 100)
    } else {
      round.submitAnswer()
    }
  }, [round])

  const handleQuit = useCallback(() => {
    round.quitRound()
    navigate('/summary', {
      state: round.state ? {
        stats: round.state.stats,
        topic: round.state.topic,
        section: round.state.section,
        questions: round.state.questions.map(q => ({
          id: q.id,
          title: q.title,
          mastery: storage.getMastery(q.id),
        })),
      } : undefined,
    })
  }, [round, navigate, storage])

  const handleCopyForClaude = useCallback(() => {
    if (!round.currentQuestion || round.currentQuestion.type !== 'implement') return
    const q = round.currentQuestion as ImplementationQuestion
    const text = formatCopyForClaude(q.prompt, userCode, q.solutions[language])
    navigator.clipboard.writeText(text)
  }, [round.currentQuestion, userCode, language])

  // Keyboard shortcuts
  useKeyboard({
    onSubmit: handleSubmit,
    onGotIt: round.state?.phase === 'revealed' ? round.gradeGotIt : undefined,
    onMissed: round.state?.phase === 'revealed' ? round.gradeMissed : undefined,
    onHint: round.state?.phase === 'answering' ? round.revealHint : undefined,
    onStar: round.currentQuestion ? () => storage.toggleStar(round.currentQuestion!.id) : undefined,
    onUndo: round.canUndo ? round.undo : undefined,
    onQuit: handleQuit,
    onCopyForClaude: handleCopyForClaude,
  })

  // ── Loading / empty state ──
  if (!round.state) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8 text-slate-400">
        Loading...
      </div>
    )
  }

  // ── Round complete ──
  if (round.state.phase === 'complete') {
    navigate('/summary', {
      state: {
        stats: round.state.stats,
        topic: round.state.topic,
        section: round.state.section,
        questions: round.state.questions.map(q => ({
          id: q.id,
          title: q.title,
          mastery: storage.getMastery(q.id),
        })),
      },
    })
    return null
  }

  const q = round.currentQuestion
  if (!q) return null

  const isImplement = q.type === 'implement'
  const isTraceTable = q.type === 'trace-table'
  const isTraceCanvas = q.type === 'trace-canvas'
  const isConceptual = isImplement && q.tier === 'conceptual'
  const implQ = isImplement ? (q as ImplementationQuestion) : null
  const tableQ = isTraceTable ? (q as TableTraceQuestion) : null
  const isStarred = storage.getStarred().has(q.id)

  return (
    <div className="max-w-5xl mx-auto px-6 py-6">
      {/* Round header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-white">
            {TOPIC_LABELS[topic as Topic]}
          </h1>
          <span className="text-sm text-slate-500">
            {round.state.currentIndex + 1} of {round.state.questions.length}
          </span>
          <div className="w-32 h-1.5 bg-[#242836] rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${((round.state.currentIndex) / round.state.questions.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => storage.toggleStar(q.id)}
            className={`text-lg ${isStarred ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'} transition-colors`}
            title="Star (S)"
          >
            {isStarred ? '★' : '☆'}
          </button>
          <button
            onClick={handleQuit}
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            Quit (Esc)
          </button>
        </div>
      </div>

      {/* Question */}
      <QuestionCard question={q} />

      {/* Hints */}
      <div className="my-4">
        <HintButton
          hints={q.type === 'implement' ? (q as ImplementationQuestion).hints : (q as any).hints}
          hintsRevealed={round.state.hintsRevealed}
          onReveal={round.revealHint}
        />
      </div>

      {/* ── Input area: ANSWERING phase ── */}
      {round.state.phase === 'answering' && (
        <div ref={editorContainerRef}>
          {isTraceTable && tableQ ? (
            <TraceTable question={tableQ} onSubmit={handleTableSubmit} />
          ) : isTraceCanvas ? (
            <div className="p-8 rounded-lg bg-[#1a1d27] border border-[#2e303a] text-slate-500 text-center">
              Canvas tree builder — coming in Phase 6
            </div>
          ) : isConceptual ? (
            <textarea
              value={userCode}
              onChange={e => setUserCode(e.target.value)}
              placeholder="Write your answer here..."
              className="w-full h-48 p-4 rounded-lg bg-[#1a1d27] border border-[#2e303a] text-slate-200 resize-y focus:outline-none focus:border-blue-500"
            />
          ) : isImplement ? (
            <CodeEditor
              language={language}
              onChange={setUserCode}
              onFocusChange={setEditorFocused}
            />
          ) : null}

          {/* Submit button (not for trace-table, which has its own) */}
          {!isTraceTable && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
              >
                Submit <span className="text-blue-200 text-sm">(Cmd+Enter)</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Revealed: Implementation ── */}
      {round.state.phase === 'revealed' && implQ && (
        <div>
          <RevealPanel question={implQ} userCode={userCode} language={language} />
          <div className="mt-4 flex items-center justify-between">
            <CopyForClaude
              questionPrompt={implQ.prompt}
              userCode={userCode}
              modelAnswer={implQ.solutions[language]}
            />
            {round.canUndo && (
              <button onClick={round.undo} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                Undo (U)
              </button>
            )}
          </div>
          <GradeButtons question={implQ} onGotIt={round.gradeGotIt} onMissed={round.gradeMissed} />
        </div>
      )}

      {/* ── Revealed: Trace Table ── */}
      {round.state.phase === 'revealed' && tableQ && tableResult && (
        <div>
          <TraceTable
            question={tableQ}
            onSubmit={() => {}}
            readOnly
            gradeResult={tableResult}
            userValues={tableValues ?? undefined}
          />
          {/* Grade buttons if not auto-graded */}
          {!(tableResult.correct === tableResult.total && !tableResult.hasSelfGrade) && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={round.gradeGotIt}
                className="flex-1 py-3 rounded-lg bg-green-600 hover:bg-green-500 text-white font-medium transition-colors"
              >
                Got it <span className="text-green-200 text-sm ml-1">(→ or 1)</span>
              </button>
              <button
                onClick={round.gradeMissed}
                className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition-colors"
              >
                Missed it <span className="text-red-200 text-sm ml-1">(← or 2)</span>
              </button>
            </div>
          )}
          {round.canUndo && (
            <button onClick={round.undo} className="mt-2 text-sm text-slate-500 hover:text-slate-300 transition-colors">
              Undo (U)
            </button>
          )}
        </div>
      )}

      {/* ── Revealed: Trace Canvas (placeholder) ── */}
      {round.state.phase === 'revealed' && isTraceCanvas && (
        <div>
          <div className="p-8 rounded-lg bg-[#1a1d27] border border-[#2e303a] text-slate-500 text-center">
            Canvas comparison — coming in Phase 6
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={round.gradeGotIt}
              className="flex-1 py-3 rounded-lg bg-green-600 hover:bg-green-500 text-white font-medium transition-colors"
            >
              Got it
            </button>
            <button
              onClick={round.gradeMissed}
              className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition-colors"
            >
              Missed it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
