import { useParams, useNavigate } from 'react-router-dom'
import { TOPIC_LABELS } from '../../data/schema'
import type { Topic } from '../../data/schema'

export default function RoundScreen() {
  const { section, topic } = useParams<{ section: string; topic: string }>()
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-white">
          {TOPIC_LABELS[topic as Topic]} — {section === 'implementation' ? 'Implementation' : 'Trace'}
        </h1>
        <button
          onClick={() => navigate('/')}
          className="text-slate-400 hover:text-white transition-colors"
        >
          Esc to quit
        </button>
      </div>
      <div className="rounded-lg bg-[#1a1d27] border border-[#2e303a] p-8 text-center text-slate-400">
        Round screen — coming in Phase 3
      </div>
    </div>
  )
}
