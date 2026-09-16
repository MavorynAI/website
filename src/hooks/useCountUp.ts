import { useEffect, useRef, useState } from 'react'

/**
 * Counts a number up once its element scrolls into view, easing out so the
 * last digits settle rather than snap. Used for the Health Score and the score
 * breakdown bars, where watching the value arrive sells "this is live data".
 */
export function useCountUp(target: number, { duration = 1400, decimals = 0 } = {}) {
  const ref = useRef<HTMLElement>(null)
  // Reduced motion skips the animation entirely, so the final value is the
  // initial value — no effect needs to run to correct it.
  const [value, setValue] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? target
      : 0,
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let start = 0

    const step = (now: number) => {
      if (!start) start = now
      const t = Math.min(1, (now - start) / duration)
      // easeOutExpo — fast departure, long graceful settle.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setValue(Number((target * eased).toFixed(decimals)))
      if (t < 1) frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        frame = requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, duration, decimals])

  return [ref, value] as const
}

/**
 * Fires once when the element first enters the viewport. Cheaper than
 * useCountUp when all a component needs is "have I been seen yet?" — for
 * example to start a bar-fill transition or a staggered list animation.
 */
export function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setInView(true)
        observer.disconnect()
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView] as const
}
