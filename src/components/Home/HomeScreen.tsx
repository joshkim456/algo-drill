import { useNavigate } from 'react-router-dom'
import { useStorage } from '../../hooks/useStorage'
import { getAllQuestions, getByTopicAndSection } from '../../data/questionBank'
import type { Topic } from '../../data/schema'
import type { MidRoundState } from '../../hooks/useRound'
import Header from './Header'
import TopicCard from './TopicCard'

const TOPICS: Topic[] = ["sorting", "heaps", "bst", "llrb", "hashtables", "graphs", "strings", "unionfind", "adt"]

export default function HomeScreen() {
  const storage = useStorage()
  const navigate = useNavigate()

  // Overall progress
  const all = getAllQuestions()
  const masteredCount = all.filter(q => storage.getMastery(q.id) === 'mastered').length
  const overallPct = all.length > 0 ? Math.round((masteredCount / all.length) * 100) : 0

  // Starred questions
  const starred = storage.getStarred()
  const starredCount = starred.size

  // Difficult questions (missed 2+ times)
  const difficultIds = all.filter(q => storage.getMissCount(q.id) >= 2).map(q => q.id)
  const difficultCount = difficultIds.length

  // Mid-round state for resume
  const midRound = storage.getMidRound() as MidRoundState | null

  const handleResume = () => {
    if (!midRound) return
    navigate(`/round/${midRound.section}/${midRound.topic}`, {
      state: { resume: true },
    })
  }

  const handleStudyStarred = () => {
    const ids = Array.from(starred)
    if (ids.length === 0) return
    navigate('/round/implementation/sorting', {
      state: { questionIds: ids, label: 'Starred Questions' },
    })
  }

  const handleStudyDifficult = () => {
    if (difficultIds.length === 0) return
    navigate('/round/implementation/sorting', {
      state: { questionIds: difficultIds, label: 'Difficult Questions' },
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Header />

      {/* Overall progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-500">Overall Progress</span>
          <span className="text-xs text-slate-500">{masteredCount}/{all.length} mastered ({overallPct}%)</span>
        </div>
        <div className="h-2 bg-[#242836] rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>

      {/* Resume banner */}
      {midRound && (
        <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-between">
          <span className="text-blue-300 text-sm">You have an unfinished round.</span>
          <button
            onClick={handleResume}
            className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Resume
          </button>
        </div>
      )}

      {/* Special study modes */}
      {(starredCount > 0 || difficultCount > 0) && (
        <div className="mb-6 flex gap-3">
          {starredCount > 0 && (
            <button
              onClick={handleStudyStarred}
              className="px-4 py-2 rounded-lg bg-[#1a1d27] border border-[#2e303a] hover:border-amber-500/50 text-sm text-amber-400 transition-colors"
            >
              Study Starred ({starredCount})
            </button>
          )}
          {difficultCount > 0 && (
            <button
              onClick={handleStudyDifficult}
              className="px-4 py-2 rounded-lg bg-[#1a1d27] border border-[#2e303a] hover:border-red-500/50 text-sm text-red-400 transition-colors"
            >
              Study Difficult ({difficultCount})
            </button>
          )}
        </div>
      )}

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4">Implementation</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TOPICS.map(t => {
            const questions = getByTopicAndSection(t, 'implementation')
            return (
              <TopicCard
                key={`impl-${t}`}
                topic={t}
                section="implementation"
                questions={questions}
                getMastery={storage.getMastery}
              />
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Trace</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TOPICS.map(t => {
            const questions = getByTopicAndSection(t, 'trace')
            return (
              <TopicCard
                key={`trace-${t}`}
                topic={t}
                section="trace"
                questions={questions}
                getMastery={storage.getMastery}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}
