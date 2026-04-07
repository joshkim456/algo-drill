import { useState, useCallback, useRef } from 'react'
import type { Question, MasteryState, Topic, Section } from '../data/schema'
import type { StorageAPI } from './useStorage'
import { getByTopicAndSection, getUnmastered } from '../data/questionBank'

// ── Round phases ──
export type RoundPhase = 'answering' | 'revealed' | 'grading' | 'complete'

// ── History entry for undo ──
interface HistoryEntry {
  questionId: string
  previousMastery: MasteryState
  previousMissCount: number
  queueSnapshot: string[]        // question IDs in queue at that point
  indexSnapshot: number
}

// ── Session stats ──
export interface SessionStats {
  questionsReviewed: number
  gotItCount: number
  missedCount: number
  hintsUsed: number
  startTime: number
}

// ── Serializable mid-round state ──
export interface MidRoundState {
  topic: Topic
  section: Section
  queueIds: string[]
  currentIndex: number
  stats: SessionStats
}

// ── Round state ──
export interface RoundState {
  questions: Question[]
  currentIndex: number
  phase: RoundPhase
  hintsRevealed: number
  stats: SessionStats
  topic: Topic
  section: Section
}

const ROUND_SIZE = 7

/**
 * Build the question queue for a round.
 * Priority: missed > familiar > not_started.
 * Cap at ROUND_SIZE.
 */
function buildQueue(
  topic: Topic,
  section: Section,
  getMastery: (id: string) => MasteryState,
): Question[] {
  const all = getByTopicAndSection(topic, section)
  const unmastered = getUnmastered(all, getMastery)

  // Sort by priority
  const priority: Record<MasteryState, number> = {
    missed: 0,
    familiar: 1,
    not_started: 2,
    mastered: 3,
  }

  const sorted = [...unmastered].sort((a, b) => {
    return priority[getMastery(a.id)] - priority[getMastery(b.id)]
  })

  return sorted.slice(0, ROUND_SIZE)
}

export function useRound(storage: StorageAPI) {
  const [state, setState] = useState<RoundState | null>(null)
  const historyRef = useRef<HistoryEntry[]>([])

  // ── Start a new round ──
  const startRound = useCallback((topic: Topic, section: Section) => {
    const questions = buildQueue(topic, section, storage.getMastery)

    if (questions.length === 0) {
      // All mastered — nothing to do
      setState({
        questions: [],
        currentIndex: 0,
        phase: 'complete',
        hintsRevealed: 0,
        stats: { questionsReviewed: 0, gotItCount: 0, missedCount: 0, hintsUsed: 0, startTime: Date.now() },
        topic,
        section,
      })
      return
    }

    historyRef.current = []
    storage.clearMidRound()

    setState({
      questions,
      currentIndex: 0,
      phase: 'answering',
      hintsRevealed: 0,
      stats: {
        questionsReviewed: 0,
        gotItCount: 0,
        missedCount: 0,
        hintsUsed: 0,
        startTime: Date.now(),
      },
      topic,
      section,
    })
  }, [storage])

  // ── Resume a saved round ──
  const resumeRound = useCallback((): boolean => {
    const saved = storage.getMidRound() as MidRoundState | null
    if (!saved) return false

    const allForTopic = getByTopicAndSection(saved.topic, saved.section)
    const byId = new Map(allForTopic.map(q => [q.id, q]))
    const questions = saved.queueIds.map(id => byId.get(id)).filter(Boolean) as Question[]

    if (questions.length === 0) return false

    historyRef.current = []
    setState({
      questions,
      currentIndex: saved.currentIndex,
      phase: 'answering',
      hintsRevealed: 0,
      stats: saved.stats,
      topic: saved.topic,
      section: saved.section,
    })
    return true
  }, [storage])

  // ── Submit answer (show model answer) ──
  const submitAnswer = useCallback(() => {
    setState(prev => prev ? { ...prev, phase: 'revealed' } : null)
  }, [])

  // ── Reveal next hint ──
  const revealHint = useCallback(() => {
    setState(prev => {
      if (!prev || prev.hintsRevealed >= 3) return prev
      return {
        ...prev,
        hintsRevealed: prev.hintsRevealed + 1,
        stats: { ...prev.stats, hintsUsed: prev.stats.hintsUsed + 1 },
      }
    })
  }, [])

  // ── Grade: Got It ──
  const gradeGotIt = useCallback(() => {
    setState(prev => {
      if (!prev) return null
      const q = prev.questions[prev.currentIndex]
      const currentMastery = storage.getMastery(q.id)

      // Save history for undo
      historyRef.current.push({
        questionId: q.id,
        previousMastery: currentMastery,
        previousMissCount: storage.getMissCount(q.id),
        queueSnapshot: prev.questions.map(q => q.id),
        indexSnapshot: prev.currentIndex,
      })

      // Mastery transitions for "Got it"
      let newMastery: MasteryState
      switch (currentMastery) {
        case 'not_started': newMastery = 'familiar'; break
        case 'familiar': newMastery = 'mastered'; break
        case 'missed': newMastery = 'familiar'; break
        default: newMastery = currentMastery
      }
      storage.setMastery(q.id, newMastery)

      const newStats = {
        ...prev.stats,
        questionsReviewed: prev.stats.questionsReviewed + 1,
        gotItCount: prev.stats.gotItCount + 1,
      }

      // Move to next question
      const nextIndex = prev.currentIndex + 1
      if (nextIndex >= prev.questions.length) {
        // Check if any questions still need to be mastered
        const remaining = prev.questions.filter(
          q => storage.getMastery(q.id) !== 'mastered'
        )
        if (remaining.length === 0) {
          storage.clearMidRound()
          storage.recordStudyDay()
          return { ...prev, phase: 'complete' as const, stats: newStats }
        }
        // Start another pass through non-mastered questions
        return {
          ...prev,
          questions: remaining,
          currentIndex: 0,
          phase: 'answering' as const,
          hintsRevealed: 0,
          stats: newStats,
        }
      }

      return {
        ...prev,
        currentIndex: nextIndex,
        phase: 'answering' as const,
        hintsRevealed: 0,
        stats: newStats,
      }
    })
  }, [storage])

  // ── Grade: Missed It ──
  const gradeMissed = useCallback(() => {
    setState(prev => {
      if (!prev) return null
      const q = prev.questions[prev.currentIndex]
      const currentMastery = storage.getMastery(q.id)

      // Save history for undo
      historyRef.current.push({
        questionId: q.id,
        previousMastery: currentMastery,
        previousMissCount: storage.getMissCount(q.id),
        queueSnapshot: prev.questions.map(q => q.id),
        indexSnapshot: prev.currentIndex,
      })

      // Missed → always set to missed, increment miss count
      storage.setMastery(q.id, 'missed')
      storage.incrementMissCount(q.id)

      const newStats = {
        ...prev.stats,
        questionsReviewed: prev.stats.questionsReviewed + 1,
        missedCount: prev.stats.missedCount + 1,
      }

      // Recycle the missed question: append to end of queue if not already there later
      const newQuestions = [...prev.questions]
      // If this question isn't already appearing later in the queue, append it
      const futureOccurrences = newQuestions.slice(prev.currentIndex + 1).filter(fq => fq.id === q.id)
      if (futureOccurrences.length === 0) {
        newQuestions.push(q)
      }

      const nextIndex = prev.currentIndex + 1
      if (nextIndex >= newQuestions.length) {
        // This shouldn't happen since we just appended, but handle gracefully
        storage.clearMidRound()
        storage.recordStudyDay()
        return { ...prev, questions: newQuestions, phase: 'complete' as const, stats: newStats }
      }

      return {
        ...prev,
        questions: newQuestions,
        currentIndex: nextIndex,
        phase: 'answering' as const,
        hintsRevealed: 0,
        stats: newStats,
      }
    })
  }, [storage])

  // ── Undo last grade ──
  const undo = useCallback(() => {
    const entry = historyRef.current.pop()
    if (!entry) return

    // Restore mastery state
    storage.setMastery(entry.questionId, entry.previousMastery)

    setState(prev => {
      if (!prev) return null

      // Rebuild queue from snapshot
      const allForTopic = getByTopicAndSection(prev.topic, prev.section)
      const byId = new Map(allForTopic.map(q => [q.id, q]))
      const questions = entry.queueSnapshot.map(id => byId.get(id)).filter(Boolean) as Question[]

      return {
        ...prev,
        questions,
        currentIndex: entry.indexSnapshot,
        phase: 'answering' as const,
        hintsRevealed: 0,
        stats: {
          ...prev.stats,
          questionsReviewed: Math.max(0, prev.stats.questionsReviewed - 1),
        },
      }
    })
  }, [storage])

  // ── Quit round (save mid-round state) ──
  const quitRound = useCallback(() => {
    if (!state) return
    storage.saveMidRound({
      topic: state.topic,
      section: state.section,
      queueIds: state.questions.map(q => q.id),
      currentIndex: state.currentIndex,
      stats: state.stats,
    } satisfies MidRoundState)
    storage.recordStudyDay()
  }, [state, storage])

  // Current question helper
  const currentQuestion = state && state.currentIndex < state.questions.length
    ? state.questions[state.currentIndex]
    : null

  // ── Start a custom round with a pre-built question list ──
  const startCustomRound = useCallback((questions: Question[], label: { topic: Topic; section: Section }) => {
    if (questions.length === 0) {
      setState({
        questions: [],
        currentIndex: 0,
        phase: 'complete',
        hintsRevealed: 0,
        stats: { questionsReviewed: 0, gotItCount: 0, missedCount: 0, hintsUsed: 0, startTime: Date.now() },
        topic: label.topic,
        section: label.section,
      })
      return
    }

    historyRef.current = []
    storage.clearMidRound()

    setState({
      questions: questions.slice(0, ROUND_SIZE),
      currentIndex: 0,
      phase: 'answering',
      hintsRevealed: 0,
      stats: {
        questionsReviewed: 0,
        gotItCount: 0,
        missedCount: 0,
        hintsUsed: 0,
        startTime: Date.now(),
      },
      topic: label.topic,
      section: label.section,
    })
  }, [storage])

  return {
    state,
    currentQuestion,
    startRound,
    startCustomRound,
    resumeRound,
    submitAnswer,
    revealHint,
    gradeGotIt,
    gradeMissed,
    undo,
    quitRound,
    canUndo: historyRef.current.length > 0,
  }
}
