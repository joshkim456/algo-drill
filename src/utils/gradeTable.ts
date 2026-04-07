/**
 * Auto-grading logic for table trace cells.
 * Per spec Section 13.
 */

const SELF_GRADE = 'SELF_GRADE'

/**
 * Compare a user cell value against the expected solution.
 * Returns true if they match (per the comparison rules), null if self-grade.
 */
export function gradeTableCell(userValue: string, expected: string): boolean | null {
  // Self-grade sentinel
  if (expected === SELF_GRADE) return null

  const u = userValue.trim()
  const e = expected.trim()

  // Empty cell check
  if (e === '') return u === ''
  if (u === '') return false

  // Infinity normalization
  const infVariants = ['∞', 'inf', 'infinity']
  if (infVariants.includes(e.toLowerCase()) && infVariants.includes(u.toLowerCase())) {
    return true
  }

  // Numeric comparison
  const uNum = parseFloat(u)
  const eNum = parseFloat(e)
  if (!isNaN(uNum) && !isNaN(eNum)) {
    return uNum === eNum
  }

  // String comparison (case-insensitive)
  return u.toLowerCase() === e.toLowerCase()
}

/**
 * Grade an entire table. Returns per-cell results and a score.
 */
export function gradeTable(
  userValues: string[][],
  solution: string[][],
): {
  cellResults: (boolean | null)[][]
  correct: number
  total: number
  hasSelfGrade: boolean
} {
  let correct = 0
  let total = 0
  let hasSelfGrade = false

  const cellResults = solution.map((row, r) =>
    row.map((expected, c) => {
      const userVal = userValues[r]?.[c] ?? ''
      const result = gradeTableCell(userVal, expected)
      if (result === null) {
        hasSelfGrade = true
        return null
      }
      total++
      if (result) correct++
      return result
    })
  )

  return { cellResults, correct, total, hasSelfGrade }
}
