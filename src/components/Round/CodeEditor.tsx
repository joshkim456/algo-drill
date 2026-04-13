import { useRef, useEffect, useCallback } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { oneDark } from '@codemirror/theme-one-dark'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view'
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language'
import { bracketMatching } from '@codemirror/language'
import { indentOnInput } from '@codemirror/language'

interface CodeEditorProps {
  value?: string
  onChange?: (value: string) => void
  readOnly?: boolean
  placeholder?: string
  onFocusChange?: (focused: boolean) => void
}

export default function CodeEditor({
  value = '',
  onChange,
  readOnly = false,
  placeholder,
  onFocusChange,
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const onFocusChangeRef = useRef(onFocusChange)
  onFocusChangeRef.current = onFocusChange

  useEffect(() => {
    if (!containerRef.current) return

    const extensions = [
      lineNumbers(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      history(),
      bracketMatching(),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      oneDark,
      keymap.of([...defaultKeymap, ...historyKeymap]),
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          onChangeRef.current?.(update.state.doc.toString())
        }
        if (update.focusChanged) {
          onFocusChangeRef.current?.(update.view.hasFocus)
        }
      }),
    ]

    if (readOnly) {
      extensions.push(EditorState.readOnly.of(true))
    }

    if (placeholder) {
      extensions.push(EditorView.contentAttributes.of({ 'aria-placeholder': placeholder }))
    }

    // Tab inserts spaces (2)
    extensions.push(
      EditorState.tabSize.of(2),
      keymap.of([{
        key: 'Tab',
        run: (view) => {
          view.dispatch(view.state.replaceSelection('  '))
          return true
        },
      }]),
    )

    const state = EditorState.create({
      doc: value,
      extensions,
    })

    const view = new EditorView({
      state,
      parent: containerRef.current,
    })

    viewRef.current = view

    return () => {
      view.destroy()
      viewRef.current = null
    }
    // Only recreate editor when readOnly or language changes, not on every value change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readOnly])

  // Expose a way to get the current value
  const getValue = useCallback(() => {
    return viewRef.current?.state.doc.toString() ?? ''
  }, [])

  // Store getValue on the container element so parent can access it
  useEffect(() => {
    if (containerRef.current) {
      (containerRef.current as any).__getValue = getValue
    }
  }, [getValue])

  return (
    <div
      ref={containerRef}
      className="rounded-lg overflow-hidden border border-[#2e303a] bg-[#1a1d27]"
      style={{ minHeight: readOnly ? 'auto' : '200px' }}
    />
  )
}
