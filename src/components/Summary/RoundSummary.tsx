import { useLocation, useNavigate } from 'react-router-dom'
import { TOPIC_LABELS } from '../../data/schema'
import type { Topic, MasteryState } from '../../data/schema'
import type { SessionStats as StatsType } from '../../hooks/useRound'
import SessionStats from './SessionStats'

interface QuestionSummary {
  id: string
  title: string
  mastery: MasteryState
}

interface SummaryState {
  stats: StatsType
  topic: Topic
  section: 'implementation' | 'trace'
  questions: QuestionSummary[]
}

const MASTERY_STYLES: Record<MasteryState, { bg: string; text: string; label: string }> = {
  mastered: { bg: 'bg-green-500/10 border-green-500/20', text: 'text-green-400', label: 'Mastered' },
  familiar: { bg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-400', label: 'Familiar' },
  missed: { bg: 'bg-red-500/10 border-red-500/20', text: 'text-red-400', label: 'Missed' },
  not_started: { bg: 'bg-slate-500/10 border-slate-500/20', text: 'text-slate-400', label: 'Not Started' },
}

export default function RoundSummary() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as SummaryState | undefined

  if (!state) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <p className="text-slate-400">No round data available.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
        >
          Back to Home
        </button>
      </div>
    )
  }

  const { stats, topic, section, questions } = state

  // Group questions by mastery
  const mastered = questions.filter(q => q.mastery === 'mastered')
  const familiar = questions.filter(q => q.mastery === 'familiar')
  const missed = questions.filter(q => q.mastery === 'missed')

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-xl font-semibold text-white mb-1">Round Summary</h1>
      <p className="text-slate-500 text-sm mb-6">
        {TOPIC_LABELS[topic]} — {section === 'implementation' ? 'Implementation' : 'Trace'}
      </p>

      <SessionStats stats={stats} />

      {/* Three columns */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* Mastered */}
        <div>
          <h3 className="text-sm font-medium text-green-400 mb-2">Mastered ({mastered.length})</h3>
          <div className="space-y-1.5">
            {mastered.map(q => (
              <div key={q.id} className={`p-2 rounded border ${MASTERY_STYLES.mastered.bg} text-sm text-green-300`}>
                {q.title}
              </div>
            ))}
            {mastered.length === 0 && <p className="text-xs text-slate-600">None</p>}
          </div>
        </div>

        {/* Familiar */}
        <div>
          <h3 className="text-sm font-medium text-amber-400 mb-2">Familiar ({familiar.length})</h3>
          <div className="space-y-1.5">
            {familiar.map(q => (
              <div key={q.id} className={`p-2 rounded border ${MASTERY_STYLES.familiar.bg} text-sm text-amber-300`}>
                {q.title}
              </div>
            ))}
            {familiar.length === 0 && <p className="text-xs text-slate-600">None</p>}
          </div>
        </div>

        {/* Missed */}
        <div>
          <h3 className="text-sm font-medium text-red-400 mb-2">Missed ({missed.length})</h3>
          <div className="space-y-1.5">
            {missed.map(q => (
              <div key={q.id} className={`p-2 rounded border ${MASTERY_STYLES.missed.bg} text-sm text-red-300`}>
                {q.title}
              </div>
            ))}
            {missed.length === 0 && <p className="text-xs text-slate-600">None</p>}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        {(missed.length > 0 || familiar.length > 0) && (
          <button
            onClick={() => navigate(`/round/${section}/${topic}`)}
            className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
          >
            Study missed again
          </button>
        )}
        <button
          onClick={() => navigate(`/round/${section}/${topic}`)}
          className="px-4 py-2.5 rounded-lg bg-[#242836] border border-[#2e303a] text-slate-300 hover:border-blue-500 transition-colors"
        >
          New round
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2.5 rounded-lg bg-[#242836] border border-[#2e303a] text-slate-300 hover:border-blue-500 transition-colors"
        >
          Back to home
        </button>
      </div>
    </div>
  )
}
