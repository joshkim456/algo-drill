import type { Question } from '../../data/schema'

const TIER_COLORS: Record<string, string> = {
  small: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  full: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  exam: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  conceptual: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
}

interface QuestionCardProps {
  question: Question
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const tierClass = TIER_COLORS[question.tier] ?? TIER_COLORS.small

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs px-2 py-0.5 rounded border ${tierClass}`}>
          {question.tier}
        </span>
        <span className="text-slate-500 text-xs">{question.source}</span>
      </div>
      <h2 className="text-lg font-semibold text-white mb-2">{question.title}</h2>
      <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{question.prompt}</p>
      {question.type !== 'implement' && 'inputData' in question && (
        <div className="mt-3 px-3 py-2 rounded bg-[#242836] text-sm text-slate-300 font-mono">
          {question.inputData}
        </div>
      )}
    </div>
  )
}
