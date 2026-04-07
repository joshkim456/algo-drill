import { useState } from 'react'
import { formatCopyForClaude } from '../../utils/clipboard'

interface CopyForClaudeProps {
  questionPrompt: string
  userCode: string
  modelAnswer: string
}

export default function CopyForClaude({ questionPrompt, userCode, modelAnswer }: CopyForClaudeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = formatCopyForClaude(questionPrompt, userCode, modelAnswer)
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
    >
      {copied ? 'Copied!' : 'Copy for Claude'}{' '}
      <span className="text-blue-500/60">(Cmd+Shift+C)</span>
    </button>
  )
}
