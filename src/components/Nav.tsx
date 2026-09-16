import { useCallback, useEffect, useRef, useState } from 'react'
import { Logo } from './Logo'
import { ArrowIcon, Button } from './ui/Button'
import type { Theme } from '../hooks/useTheme'
import './Nav.css'

const LINKS = [
  { href: '#product', label: 'Product' },
  { href: '#how', label: 'How it works' },
  { href: '#privacy', label: 'Privacy' },
  { href: '#mission', label: 'Mission' },
  { href: '#founders', label: 'Team' },
] as const

export function Nav({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)

  /* --- Condense the bar once the hero starts leaving ---------------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* The mobile sheet is a sibling of the bar (it must be, since the bar's
     backdrop-filter would otherwise become its containing block), so the
     current bar height is published on the root for it to read. */
  useEffect(() => {
    document.documentElement.style.setProperty('--nav-h', scrolled ? '72px' : '88px')
  }, [scrolled])

  /* --- Scroll spy ---------------------------------------------------------
     Watches a band across the middle of the viewport so the highlighted link
     matches the section the reader is actually looking at, not the one whose
     top edge happens to be closest. */
  useEffect(() => {
    const sections = LINKS.map(({ href }) => document.querySelector(href)).filter(
      (el): el is Element => Boolean(el),
    )
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  /* --- Slide the pill indicator under the active link ---------------------
     Measured rather than CSS-guessed so it stays exact at every font size. */
  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const target = active
      ? list.querySelector<HTMLAnchorElement>(`a[href="${active}"]`)
      : null

    if (!target) {
      list.style.setProperty('--indicator-opacity', '0')
      return
    }

    list.style.setProperty('--indicator-x', `${target.offsetLeft}px`)
    list.style.setProperty('--indicator-w', `${target.offsetWidth}px`)
    list.style.setProperty('--indicator-opacity', '1')
  }, [active])

  /* --- Mobile sheet: lock scroll, close on Escape ------------------------- */
  useEffect(() => {
    if (!menuOpen) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner wrap">
          <a className="nav__brand" href="#home" aria-label="MavorynAI home">
            <Logo compact />
          </a>

          <nav className="nav__links" aria-label="Primary">
            <ul ref={listRef} className="nav__list">
              <li className="nav__indicator" aria-hidden="true" />
              {LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={active === href ? 'is-active' : undefined}
                    aria-current={active === href ? 'true' : undefined}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__end">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <Button as="a" href="#beta" variant="secondary" size="sm" className="nav__cta">
              Join the beta <ArrowIcon />
            </Button>
            <button
              type="button"
              className={`nav__burger${menuOpen ? ' is-open' : ''}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Reading-progress hairline pinned to the bottom edge of the bar. */}
        <span className="nav__progress" aria-hidden="true" />
      </header>

      <div
        id="mobile-menu"
        className={`sheet${menuOpen ? ' is-open' : ''}`}
        hidden={!menuOpen}
      >
        <button className="sheet__scrim" aria-label="Close menu" onClick={closeMenu} />
        <div className="sheet__panel" role="dialog" aria-modal="true" aria-label="Menu">
          <nav aria-label="Mobile">
            {LINKS.map(({ href, label }, index) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                style={{ '--i': index } as React.CSSProperties}
              >
                <span>{label}</span>
                <ArrowIcon />
              </a>
            ))}
          </nav>
          <Button as="a" href="#beta" variant="primary" size="lg" onClick={closeMenu}>
            Join the beta <ArrowIcon />
          </Button>
        </div>
      </div>
    </>
  )
}

/**
 * Theme switch. The knob travels on a spring; the sun rays and moon crescent
 * cross-fade so neither icon pops in.
 */
function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const isLight = theme === 'light'
  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-checked={isLight}
      aria-label={`Use ${isLight ? 'dark' : 'light'} theme`}
      onClick={onToggle}
    >
      <span className="theme-toggle__track">
        <span className="theme-toggle__knob">
          <svg viewBox="0 0 24 24" className="theme-toggle__moon" aria-hidden="true">
            <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
          </svg>
          <svg viewBox="0 0 24 24" className="theme-toggle__sun" aria-hidden="true">
            <circle cx="12" cy="12" r="4.4" />
            <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
          </svg>
        </span>
      </span>
    </button>
  )
}
