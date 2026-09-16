import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'mavoryn-theme'

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    /* Private mode or blocked storage — fall through to the default. */
  }
  return 'dark'
}

/**
 * Owns the `data-theme` attribute on <html>, persists the choice, and keeps the
 * browser UI colour in step so the notch/toolbar does not flash the wrong shade
 * on mobile. Dark remains the brand default.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f5f7fc' : '#070a12')

    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* Non-fatal: the theme still applies for this session. */
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle, isLight: theme === 'light' } as const
}
