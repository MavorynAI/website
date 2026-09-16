import { useEffect, useRef } from 'react'

/**
 * Critically-damped-feeling spring, written as a plain lerp on a rAF loop.
 *
 * Every pointer- and scroll-driven effect on the page routes through this so
 * motion shares one physical character. Values are written straight to a CSS
 * custom property on the element rather than to React state: no re-render, no
 * reconciliation, and the browser animates a compositor-friendly property.
 */
export function createSpring(
  apply: (value: number) => void,
  { stiffness = 0.12, precision = 0.0005 } = {},
) {
  let current = 0
  let target = 0
  let frame = 0
  let running = false

  const tick = () => {
    const delta = target - current
    if (Math.abs(delta) < precision) {
      current = target
      apply(current)
      running = false
      return
    }
    current += delta * stiffness
    apply(current)
    frame = requestAnimationFrame(tick)
  }

  return {
    set(next: number) {
      target = next
      if (!running) {
        running = true
        frame = requestAnimationFrame(tick)
      }
    },
    jump(next: number) {
      target = next
      current = next
      apply(current)
    },
    stop() {
      cancelAnimationFrame(frame)
      running = false
    },
  }
}

/**
 * Reports how far an element has travelled through the viewport, as 0 → 1,
 * writing the result to `--progress` on that element. Used for scroll-linked
 * parallax and the sticky step section.
 *
 * `0` = element's top edge is at the bottom of the viewport.
 * `1` = element's bottom edge is at the top of the viewport.
 */
export function useScrollProgress<T extends HTMLElement>(
  enabled = true,
  onProgress?: (progress: number) => void,
) {
  const ref = useRef<T>(null)
  const callbackRef = useRef(onProgress)

  // Kept in a ref so a caller passing an inline arrow doesn't tear down and
  // rebuild the scroll listener on every render.
  useEffect(() => {
    callbackRef.current = onProgress
  }, [onProgress])

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    let frame = 0
    let last = -1

    const measure = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const span = rect.height + window.innerHeight
      const raw = span > 0 ? (window.innerHeight - rect.top) / span : 0
      const progress = Math.min(1, Math.max(0, raw))

      // Skip sub-pixel churn; below this the visual result is identical.
      if (Math.abs(progress - last) < 0.0008) return
      last = progress

      el.style.setProperty('--progress', progress.toFixed(4))
      callbackRef.current?.(progress)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [enabled])

  return ref
}
