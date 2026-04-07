import { useStorage } from '../../hooks/useStorage'

export default function Header() {
  const storage = useStorage()
  const streak = storage.getStreak()
  const language = storage.getLanguage()

  const toggleLanguage = () => {
    storage.setLanguage(language === 'pseudocode' ? 'python' : 'pseudocode')
    // Force re-render by updating window
    window.dispatchEvent(new Event('storage-change'))
  }

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
        {/* Language toggle */}
        <button
          onClick={toggleLanguage}
          className="px-3 py-1.5 rounded-lg bg-[#242836] border border-[#2e303a] text-sm text-slate-300 hover:border-blue-500 transition-colors"
        >
          {language === 'pseudocode' ? 'Pseudocode' : 'Python'}
        </button>
      </div>
    </header>
  )
}
