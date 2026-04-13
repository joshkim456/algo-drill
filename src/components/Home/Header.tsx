import { useStorage } from '../../hooks/useStorage'

export default function Header() {
  const storage = useStorage()
  const streak = storage.getStreak()

  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white">AlgoDrill</h1>
        <p className="text-slate-500 text-sm mt-0.5">COMP0005 Algorithm Drill</p>
      </div>
      <div className="flex items-center gap-4">
        {/* Streak */}
        {streak.current > 0 && (
          <div className="flex items-center gap-1.5 text-amber-400">
            <span className="text-lg">🔥</span>
            <span className="text-sm font-medium">{streak.current} day{streak.current !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </header>
  )
}
