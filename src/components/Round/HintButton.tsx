interface HintButtonProps {
  hints: [string, string, string]
  hintsRevealed: number
  onReveal: () => void
}

export default function HintButton({ hints, hintsRevealed, onReveal }: HintButtonProps) {
  return (
    <div>
      {hintsRevealed > 0 && (
        <div className="mb-3 space-y-2">
          {hints.slice(0, hintsRevealed).map((hint, i) => (
            <div key={i} className="p-3 rounded bg-amber-500/10 border border-amber-500/20 text-sm text-amber-200">
              <span className="text-amber-400 font-medium mr-2">Hint {i + 1}:</span>
              <span className="whitespace-pre-wrap">{hint}</span>
            </div>
          ))}
        </div>
      )}
      {hintsRevealed < 3 && (
        <button
          onClick={onReveal}
          className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
        >
          Hint {hintsRevealed + 1}/3 <span className="text-amber-500/60">(H)</span>
        </button>
      )}
    </div>
  )
}
