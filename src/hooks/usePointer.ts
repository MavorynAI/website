import { useEffect, useRef } from 'react'
import { createSpring } from './useRafValue'

/**
 * Magnetic hover: the element eases a few pixels toward the cursor and returns
 * home on exit. Writes `--mx` / `--my` (in px) — the component decides whether
 * to spend them on translate, a glow position, or both.
 *
 * Skipped entirely on coarse pointers, where there is no hover to respond to.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.22, enabled = true) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const springX = createSpring((v) => el.style.setProperty('--mx', `${v.toFixed(2)}px`))
    const springY = createSpring((v) => el.style.setProperty('--my', `${v.toFixed(2)}px`))

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      springX.set((event.clientX - (rect.left + rect.width / 2)) * strength)
      springY.set((event.clientY - (rect.top + rect.height / 2)) * strength)
    }

    const onLeave = () => {
      springX.set(0)
      springY.set(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      springX.stop()
      springY.stop()
    }
  }, [strength, enabled])

  return ref
}

/**
 * Tracks the cursor's position inside an element as a 0 → 1 pair on `--px` /
 * `--py`, plus a `--spot` opacity that fades the highlight in and out. Drives
 * the spotlight film on cards and the tilt on the hero device.
 */
export function useSpotlight<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let frame = 0

    const onMove = (event: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--px', ((event.clientX - rect.left) / rect.width).toFixed(4))
        el.style.setProperty('--py', ((event.clientY - rect.top) / rect.height).toFixed(4))
      })
    }

    const onEnter = () => el.style.setProperty('--spot', '1')
    const onLeave = () => {
      el.style.setProperty('--spot', '0')
      cancelAnimationFrame(frame)
      frame = 0
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [enabled])

  return ref
}

/**
 * Normalised cursor position relative to the viewport centre, written to
 * `--tilt-x` / `--tilt-y` (-1 → 1) on the target. Lets a whole scene drift with
 * the pointer without each child wiring up its own listener.
 */
export function useViewportTilt<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const springX = createSpring((v) => el.style.setProperty('--tilt-x', v.toFixed(4)), {
      stiffness: 0.07,
    })
    const springY = createSpring((v) => el.style.setProperty('--tilt-y', v.toFixed(4)), {
      stiffness: 0.07,
    })

    const onMove = (event: PointerEvent) => {
      springX.set((event.clientX / window.innerWidth - 0.5) * 2)
      springY.set((event.clientY / window.innerHeight - 0.5) * 2)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      springX.stop()
      springY.stop()
    }
  }, [enabled])

  return ref
}
