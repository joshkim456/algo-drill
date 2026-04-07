import type { SessionStats as Stats } from '../../hooks/useRound'

interface SessionStatsProps {
  stats: Stats
}

export default function SessionStats({ stats }: SessionStatsProps) {
  const elapsed = Math.round((Date.now() - stats.startTime) / 1000)
  const minutes = Math.floor(elapsed / 60)
  const seconds = elapsed % 60
  const accuracy = stats.questionsReviewed > 0
    ? Math.round((stats.gotItCount / stats.questionsReviewed) * 100)
    : 0

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="rounded-lg bg-[#1a1d27] border border-[#2e303a] p-3 text-center">
        <div className="text-2xl font-bold text-white">{stats.questionsReviewed}</div>
        <div className="text-xs text-slate-500 mt-1">Reviewed</div>
      </div>
      <div className="rounded-lg bg-[#1a1d27] border border-[#2e303a] p-3 text-center">
        <div className="text-2xl font-bold text-green-400">{accuracy}%</div>
        <div className="text-xs text-slate-500 mt-1">Accuracy</div>
      </div>
      <div className="rounded-lg bg-[#1a1d27] border border-[#2e303a] p-3 text-center">
        <div className="text-2xl font-bold text-white">{minutes}:{seconds.toString().padStart(2, '0')}</div>
        <div className="text-xs text-slate-500 mt-1">Time</div>
      </div>
      <div className="rounded-lg bg-[#1a1d27] border border-[#2e303a] p-3 text-center">
        <div className="text-2xl font-bold text-amber-400">{stats.hintsUsed}</div>
        <div className="text-xs text-slate-500 mt-1">Hints</div>
      </div>
    </div>
  )
}
