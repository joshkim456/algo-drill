import { useEffect, useRef } from 'react'

interface KeyboardActions {
  onSubmit?: () => void          // Cmd+Enter
  onGotIt?: () => void           // → or 1
  onMissed?: () => void          // ← or 2
  onHint?: () => void            // H
  onStar?: () => void            // S
  onUndo?: () => void            // U or Cmd+Z
  onQuit?: () => void            // Esc
  onCopyForClaude?: () => void   // Cmd+Shift+C
}

/**
 * Global keyboard shortcut handler.
 * Single-key shortcuts are suppressed when CodeMirror (or any input/textarea) is focused.
 */
export function useKeyboard(actions: KeyboardActions) {
  const actionsRef = useRef(actions)
  actionsRef.current = actions

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isEditorFocused =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('.cm-editor') !== null

      // Cmd+Enter — submit (works even in editor)
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        actionsRef.current.onSubmit?.()
        return
      }

      // Cmd+Shift+C — copy for Claude (works even in editor)
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault()
        actionsRef.current.onCopyForClaude?.()
        return
      }

      // Cmd+Z — undo (works even in editor, but only when NOT in editor)
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !isEditorFocused) {
        e.preventDefault()
        actionsRef.current.onUndo?.()
        return
      }

      // Esc — quit round
      if (e.key === 'Escape') {
        actionsRef.current.onQuit?.()
        return
      }

      // Single-key shortcuts — suppressed when editor is focused
      if (isEditorFocused) return

      switch (e.key) {
        case 'ArrowRight':
        case '1':
          e.preventDefault()
          actionsRef.current.onGotIt?.()
          break
        case 'ArrowLeft':
        case '2':
          e.preventDefault()
          actionsRef.current.onMissed?.()
          break
        case 'h':
        case 'H':
          e.preventDefault()
          actionsRef.current.onHint?.()
          break
        case 's':
        case 'S':
          e.preventDefault()
          actionsRef.current.onStar?.()
          break
        case 'u':
        case 'U':
          e.preventDefault()
          actionsRef.current.onUndo?.()
          break
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
}
