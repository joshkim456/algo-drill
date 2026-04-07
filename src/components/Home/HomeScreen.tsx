import { useStorage } from '../../hooks/useStorage'
import { getByTopicAndSection } from '../../data/questionBank'
import type { Topic } from '../../data/schema'
import Header from './Header'
import TopicCard from './TopicCard'

const TOPICS: Topic[] = ["sorting", "heaps", "bst", "llrb", "hashtables", "graphs", "strings", "unionfind", "adt"]

export default function HomeScreen() {
  const storage = useStorage()

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Header />

      {/* Resume banner */}
      {storage.getMidRound() && (
        <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-between">
          <span className="text-blue-300 text-sm">You have an unfinished round.</span>
          <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
            Resume
          </button>
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
