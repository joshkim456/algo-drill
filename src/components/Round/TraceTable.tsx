import { useState, useRef, useCallback } from 'react'
import type { TableTraceQuestion } from '../../data/schema'
import { gradeTable } from '../../utils/gradeTable'

interface TraceTableProps {
  question: TableTraceQuestion
  onSubmit: (userValues: string[][], result: ReturnType<typeof gradeTable>) => void
  readOnly?: boolean
  gradeResult?: ReturnType<typeof gradeTable>
  userValues?: string[][]
}

export default function TraceTable({
  question,
  onSubmit,
  readOnly = false,
  gradeResult,
  userValues: externalValues,
}: TraceTableProps) {
  const { table } = question
  const [values, setValues] = useState<string[][]>(() =>
    externalValues ?? Array.from({ length: table.rows }, () => Array(table.columns.length).fill(''))
  )
  const inputRefs = useRef<(HTMLInputElement | null)[][]>(
    Array.from({ length: table.rows }, () => Array(table.columns.length).fill(null))
  )

  const handleChange = useCallback((row: number, col: number, value: string) => {
    setValues(prev => {
      const next = prev.map(r => [...r])
      next[row][col] = value
      return next
    })
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent, row: number, col: number) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      // Move to next cell
      let nextCol = col + 1
      let nextRow = row
      if (nextCol >= table.columns.length) {
        nextCol = 0
        nextRow = row + 1
      }
      if (nextRow < table.rows) {
        inputRefs.current[nextRow]?.[nextCol]?.focus()
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      // Move down
      if (row + 1 < table.rows) {
        inputRefs.current[row + 1]?.[col]?.focus()
      }
    }
  }, [table.columns.length, table.rows])

  const handleSubmit = useCallback(() => {
    const result = gradeTable(values, table.solution)
    onSubmit(values, result)
  }, [values, table.solution, onSubmit])

  const getCellClass = (row: number, col: number): string => {
    if (!gradeResult) return 'bg-[#1a1d27] border-[#2e303a] text-slate-200'
    const result = gradeResult.cellResults[row]?.[col]
    if (result === null) return 'bg-blue-500/10 border-blue-500/30 text-blue-300'
    if (result === true) return 'bg-green-500/10 border-green-500/30 text-green-300'
    return 'bg-red-500/10 border-red-500/30 text-red-300'
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {table.columns.map((col, i) => (
                <th
                  key={i}
                  className="px-3 py-2 text-left text-xs font-medium text-slate-400 bg-[#242836] border border-[#2e303a] first:rounded-tl last:rounded-tr"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: table.rows }, (_, row) => (
              <tr key={row}>
                {table.columns.map((_, col) => (
                  <td key={col} className={`border ${getCellClass(row, col)} p-0`}>
                    {readOnly ? (
                      <div className="px-3 py-1.5 text-sm font-mono min-h-[32px]">
                        {values[row]?.[col] ?? ''}
                        {gradeResult && gradeResult.cellResults[row]?.[col] === false && (
                          <span className="ml-2 text-green-400 text-xs">
                            ({table.solution[row]?.[col]})
                          </span>
                        )}
                      </div>
                    ) : (
                      <input
                        ref={el => {
                          if (!inputRefs.current[row]) inputRefs.current[row] = []
                          inputRefs.current[row][col] = el
                        }}
                        type="text"
                        value={values[row]?.[col] ?? ''}
                        onChange={e => handleChange(row, col, e.target.value)}
                        onKeyDown={e => handleKeyDown(e, row, col)}
                        className="w-full px-3 py-1.5 text-sm font-mono bg-transparent outline-none focus:ring-1 focus:ring-blue-500 min-h-[32px]"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!readOnly && !gradeResult && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
          >
            Submit <span className="text-blue-200 text-sm">(Cmd+Enter)</span>
          </button>
        </div>
      )}

      {gradeResult && (
        <div className="mt-3 text-sm">
          <span className={gradeResult.correct === gradeResult.total ? 'text-green-400' : 'text-amber-400'}>
            {gradeResult.correct}/{gradeResult.total} cells correct
          </span>
          {gradeResult.hasSelfGrade && (
            <span className="ml-2 text-blue-400">(some cells require self-grading)</span>
          )}
        </div>
      )}
    </div>
  )
}
