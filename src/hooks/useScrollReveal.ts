import { useEffect } from 'react'

const SELECTOR = '[data-reveal]:not(.is-revealed)'

/**
 * One IntersectionObserver for the whole page, watching every `[data-reveal]`
 * element. A single observer is meaningfully cheaper than one per element, and
 * elements are unobserved the moment they reveal so the callback list shrinks
 * as the user scrolls.
 *
 * A MutationObserver picks up nodes added later (conditional sections, the
 * beta success state) without the caller needing to re-register anything.
 *
 * The scroll sweep is not redundant with the observer. An element that goes
 * from below the viewport to above it within a single frame — an anchor jump,
 * find-in-page, a restored scroll position, or a flick on a trackpad — never
 * changes intersection state, so no entry is ever delivered and the element
 * would stay invisible permanently. The sweep reveals anything the reader has
 * already scrolled past.
 */
export function useScrollReveal() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const revealAll = () =>
      document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add('is-revealed'))

    if (reduced) {
      revealAll()
      // Later-mounted nodes still need revealing, but without any animation.
      const mutations = new MutationObserver(revealAll)
      mutations.observe(document.body, { childList: true, subtree: true })
      return () => mutations.disconnect()
    }

    const reveal = (el: Element) => {
      el.classList.add('is-revealed')
      observer.unobserve(el)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target)
          } else if (entry.boundingClientRect.bottom < 0) {
            // Already scrolled past before it was ever observed.
            reveal(entry.target)
          }
        }
      },
      // Trip slightly before the element is fully on screen, and never wait for
      // tall elements to be 14% visible — that reads as "late" on mobile.
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    const observeAll = () =>
      document.querySelectorAll(SELECTOR).forEach((el) => observer.observe(el))

    observeAll()

    const mutations = new MutationObserver(observeAll)
    mutations.observe(document.body, { childList: true, subtree: true })

    let frame = 0
    const sweep = () => {
      frame = 0
      const pending = document.querySelectorAll(SELECTOR)
      if (!pending.length) return
      pending.forEach((el) => {
        if (el.getBoundingClientRect().bottom < 0) reveal(el)
      })
    }

    const scheduleSweep = () => {
      if (!frame) frame = requestAnimationFrame(sweep)
    }

    window.addEventListener('scroll', scheduleSweep, { passive: true })
    window.addEventListener('hashchange', scheduleSweep)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      mutations.disconnect()
      window.removeEventListener('scroll', scheduleSweep)
      window.removeEventListener('hashchange', scheduleSweep)
    }
  }, [])
}
