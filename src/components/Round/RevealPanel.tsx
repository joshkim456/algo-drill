import type { ImplementationQuestion } from '../../data/schema'
import CodeEditor from './CodeEditor'

interface RevealPanelProps {
  question: ImplementationQuestion
  userCode: string
  language: 'pseudocode' | 'python'
}

export default function RevealPanel({ question, userCode, language }: RevealPanelProps) {
  const modelAnswer = question.solutions[language]

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="text-sm font-medium text-slate-400 mb-2">Your Answer</h3>
        <CodeEditor
          value={userCode}
          readOnly
          language={language}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-green-400 mb-2">Model Answer</h3>
        <CodeEditor
          value={modelAnswer}
          readOnly
          language={language}
        />
      </div>
    </div>
  )
}
