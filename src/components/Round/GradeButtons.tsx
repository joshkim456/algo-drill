import { useState } from 'react'
import type { ImplementationQuestion } from '../../data/schema'

interface GradeButtonsProps {
  question: ImplementationQuestion
  onGotIt: () => void
  onMissed: () => void
}

export default function GradeButtons({ question, onGotIt, onMissed }: GradeButtonsProps) {
  const [showComplexity, setShowComplexity] = useState(false)

  const isConceptual = question.tier === 'conceptual'

  return (
    <div className="mt-4">
      {/* Complexity follow-up (not for conceptual) */}
      {!isConceptual && !showComplexity && (
        <button
          onClick={() => setShowComplexity(true)}
          className="mb-3 text-sm text-slate-400 hover:text-slate-300 underline"
        >
          Show complexity question
        </button>
      )}
      {showComplexity && (
        <div className="mb-4 p-3 rounded bg-[#242836] border border-[#2e303a]">
          <p className="text-sm text-slate-300 font-medium mb-1">{question.complexity.question}</p>
          <p className="text-sm text-green-400">{question.complexity.answer}</p>
        </div>
      )}

      {/* Grade buttons */}
      <div className="flex gap-3">
        <button
          onClick={onGotIt}
          className="flex-1 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors"
        >
          Override: Mark Correct <span className="text-amber-200 text-sm ml-1">(→ or 1)</span>
        </button>
        <button
          onClick={onMissed}
          className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition-colors"
        >
          Missed it <span className="text-red-200 text-sm ml-1">(← or 2)</span>
        </button>
      </div>
    </div>
  )
}
