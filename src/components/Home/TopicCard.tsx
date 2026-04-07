import { Link } from 'react-router-dom'
import { TOPIC_LABELS } from '../../data/schema'
import type { Topic, Question, MasteryState } from '../../data/schema'

interface TopicCardProps {
  topic: Topic
  section: 'implementation' | 'trace'
  questions: Question[]
  getMastery: (id: string) => MasteryState
}

const MASTERY_COLORS: Record<MasteryState, string> = {
  mastered: 'bg-green-500',
  familiar: 'bg-amber-500',
  missed: 'bg-red-500',
  not_started: 'bg-slate-700',
}

export default function TopicCard({ topic, section, questions, getMastery }: TopicCardProps) {
  if (questions.length === 0) return null

  const masteredCount = questions.filter(q => getMastery(q.id) === 'mastered').length
  const familiarCount = questions.filter(q => getMastery(q.id) === 'familiar').length
  const missedCount = questions.filter(q => getMastery(q.id) === 'missed').length
  const notStartedCount = questions.length - masteredCount - familiarCount - missedCount

  const allMastered = masteredCount === questions.length

  return (
    <Link
      to={`/round/${section}/${topic}`}
      className={`block rounded-lg bg-[#1a1d27] border p-4 hover:border-blue-500 transition-colors ${
        allMastered ? 'border-green-500/30' : 'border-[#2e303a]'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-medium">{TOPIC_LABELS[topic]}</span>
        <span className="text-xs text-slate-500">
          {masteredCount}/{questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[#242836] rounded-full overflow-hidden flex">
        {masteredCount > 0 && (
          <div className={`${MASTERY_COLORS.mastered} h-full`} style={{ width: `${(masteredCount / questions.length) * 100}%` }} />
        )}
        {familiarCount > 0 && (
          <div className={`${MASTERY_COLORS.familiar} h-full`} style={{ width: `${(familiarCount / questions.length) * 100}%` }} />
        )}
        {missedCount > 0 && (
          <div className={`${MASTERY_COLORS.missed} h-full`} style={{ width: `${(missedCount / questions.length) * 100}%` }} />
        )}
      </div>

      {/* Tier chips */}
      <div className="mt-2 flex gap-1 flex-wrap">
        {Array.from(new Set(questions.map(q => q.tier))).map(tier => (
          <span key={tier} className="text-[10px] px-1.5 py-0.5 rounded bg-[#242836] text-slate-500">
            {tier}
          </span>
        ))}
      </div>
    </Link>
  )
}
