/**
 * Calculate if two date strings (YYYY-MM-DD) are consecutive days.
 */
export function areConsecutiveDays(dateA: string, dateB: string): boolean {
  const a = new Date(dateA + 'T00:00:00')
  const b = new Date(dateB + 'T00:00:00')
  const diff = Math.abs(a.getTime() - b.getTime())
  return diff === 86400000 // exactly 1 day in ms
}

/**
 * Get today's date as YYYY-MM-DD in the browser's local timezone.
 */
export function todayLocal(): string {
  return new Date().toLocaleDateString('en-CA') // YYYY-MM-DD format
}
