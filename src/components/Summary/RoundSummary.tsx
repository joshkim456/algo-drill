import { useNavigate } from 'react-router-dom'

export default function RoundSummary() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-xl font-semibold text-white mb-6">Round Summary</h1>
      <div className="rounded-lg bg-[#1a1d27] border border-[#2e303a] p-8 text-center text-slate-400">
        Summary — coming in Phase 4
      </div>
      <button
        onClick={() => navigate('/')}
        className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors"
      >
        Back to Home
      </button>
    </div>
  )
}
