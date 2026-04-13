import { createContext, useContext, useState, createElement, type ReactNode } from 'react'
import type { MasteryState } from '../data/schema'

const PREFIX = 'algodrill_v1_'

// ── Storage API ──
export interface StorageAPI {
  getMastery: (questionId: string) => MasteryState
  setMastery: (questionId: string, state: MasteryState) => void
  getMissCount: (questionId: string) => number
  incrementMissCount: (questionId: string) => void
  getStarred: () => Set<string>
  toggleStar: (questionId: string) => void
  getStreak: () => { current: number; lastDate: string }
  recordStudyDay: () => void
  saveMidRound: (state: unknown) => void
  getMidRound: () => unknown | null
  clearMidRound: () => void
}

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJSON(key: string, value: unknown) {
  localStorage.setItem(PREFIX + key, JSON.stringify(value))
}

function createStorageAPI(): StorageAPI {
  return {
    getMastery(questionId: string): MasteryState {
      return readJSON<Record<string, MasteryState>>('mastery', {})[questionId] ?? 'not_started'
    },
    setMastery(questionId: string, state: MasteryState) {
      const all = readJSON<Record<string, MasteryState>>('mastery', {})
      all[questionId] = state
      writeJSON('mastery', all)
    },
    getMissCount(questionId: string): number {
      return readJSON<Record<string, number>>('missCounts', {})[questionId] ?? 0
    },
    incrementMissCount(questionId: string) {
      const all = readJSON<Record<string, number>>('missCounts', {})
      all[questionId] = (all[questionId] ?? 0) + 1
      writeJSON('missCounts', all)
    },
    getStarred(): Set<string> {
      return new Set(readJSON<string[]>('starred', []))
    },
    toggleStar(questionId: string) {
      const starred = readJSON<string[]>('starred', [])
      const idx = starred.indexOf(questionId)
      if (idx >= 0) starred.splice(idx, 1)
      else starred.push(questionId)
      writeJSON('starred', starred)
    },
    getStreak() {
      return readJSON('streak', { current: 0, lastDate: '' })
    },
    recordStudyDay() {
      const today = new Date().toLocaleDateString('en-CA') // YYYY-MM-DD in local tz
      const streak = readJSON('streak', { current: 0, lastDate: '' })
      if (streak.lastDate === today) return // already recorded

      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toLocaleDateString('en-CA')

      if (streak.lastDate === yesterdayStr) {
        streak.current += 1
      } else {
        streak.current = 1
      }
      streak.lastDate = today
      writeJSON('streak', streak)
    },
    saveMidRound(state: unknown) {
      writeJSON('midRound', state)
    },
    getMidRound(): unknown | null {
      return readJSON('midRound', null)
    },
    clearMidRound() {
      localStorage.removeItem(PREFIX + 'midRound')
    },
  }
}

// ── React Context ──
const StorageContext = createContext<StorageAPI | null>(null)

export function StorageProvider({ children }: { children: ReactNode }) {
  const [api] = useState(createStorageAPI)
  return createElement(StorageContext.Provider, { value: api }, children)
}

export function useStorage(): StorageAPI {
  const ctx = useContext(StorageContext)
  if (!ctx) throw new Error('useStorage must be used within StorageProvider')
  return ctx
}
