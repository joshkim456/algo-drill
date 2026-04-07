import { Link } from 'react-router-dom'
import { TOPIC_LABELS } from '../../data/schema'
import type { Topic } from '../../data/schema'

const TOPICS: Topic[] = ["sorting", "heaps", "bst", "llrb", "hashtables", "graphs", "strings", "unionfind", "adt"];

export default function HomeScreen() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white">AlgoDrill</h1>
        <p className="text-slate-400 mt-1">COMP0005 Algorithm Implementation & Trace Drill</p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Implementation</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TOPICS.map(t => (
            <Link
              key={`impl-${t}`}
              to={`/round/implementation/${t}`}
              className="block rounded-lg bg-[#1a1d27] border border-[#2e303a] p-4 hover:border-blue-500 transition-colors"
            >
              <span className="text-white font-medium">{TOPIC_LABELS[t]}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Trace</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TOPICS.map(t => (
            <Link
              key={`trace-${t}`}
              to={`/round/trace/${t}`}
              className="block rounded-lg bg-[#1a1d27] border border-[#2e303a] p-4 hover:border-blue-500 transition-colors"
            >
              <span className="text-white font-medium">{TOPIC_LABELS[t]}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
