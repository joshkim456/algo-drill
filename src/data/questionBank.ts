import type { Question, Topic, Section } from './schema'
import { sortingQuestions } from './questions/sorting'
import { heapQuestions } from './questions/heaps'
import { bstQuestions } from './questions/bst'
import { llrbQuestions } from './questions/llrb'
import { hashTableQuestions } from './questions/hashtables'
import { graphQuestions } from './questions/graphs'
import { stringQuestions } from './questions/strings'
import { unionFindQuestions } from './questions/unionfind'
import { adtQuestions } from './questions/adt'

// ── All questions, keyed by ID for fast lookup ──
const ALL_QUESTIONS: Question[] = [
  ...sortingQuestions,
  ...heapQuestions,
  ...bstQuestions,
  ...llrbQuestions,
  ...hashTableQuestions,
  ...graphQuestions,
  ...stringQuestions,
  ...unionFindQuestions,
  ...adtQuestions,
]

const BY_ID = new Map<string, Question>(ALL_QUESTIONS.map(q => [q.id, q]))

// ── Query functions ──

export function getAllQuestions(): Question[] {
  return ALL_QUESTIONS
}

export function getById(id: string): Question | undefined {
  return BY_ID.get(id)
}

export function getByTopic(topic: Topic): Question[] {
  return ALL_QUESTIONS.filter(q => q.topic === topic)
}

export function getBySection(section: Section): Question[] {
  if (section === 'implementation') {
    return ALL_QUESTIONS.filter(q => q.type === 'implement')
  }
  return ALL_QUESTIONS.filter(q => q.type === 'trace-table' || q.type === 'trace-canvas')
}

export function getByTopicAndSection(topic: Topic, section: Section): Question[] {
  return ALL_QUESTIONS.filter(q => {
    if (q.topic !== topic) return false
    if (section === 'implementation') return q.type === 'implement'
    return q.type === 'trace-table' || q.type === 'trace-canvas'
  })
}

export function getByTier(tier: string): Question[] {
  return ALL_QUESTIONS.filter(q => q.tier === tier)
}

/**
 * Get questions that haven't been mastered yet.
 * Takes a mastery lookup function to check current state.
 */
export function getUnmastered(
  questions: Question[],
  getMastery: (id: string) => string,
): Question[] {
  return questions.filter(q => getMastery(q.id) !== 'mastered')
}
