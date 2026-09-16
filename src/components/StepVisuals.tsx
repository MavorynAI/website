import type { CSSProperties } from 'react'
import { CheckIcon } from './ui/Button'
import { useInView } from '../hooks/useCountUp'
import './StepVisuals.css'

/* ------------------------------------------------------------------ 01 --- */

const ENERGY = ['Low', 'Okay', 'Good', 'Great']

/** Daily check-in screen. The chosen option settles in once the card is seen. */
export function CheckInVisual() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3)

  return (
    <div ref={ref} className={`visual visual--checkin${inView ? ' is-live' : ''}`}>
      <div className="mini-phone">
        <small className="mono-label">Daily check-in · 1 of 4</small>
        <h4>
          How is your
          <br />
          energy today?
        </h4>
        <div className="energy">
          {ENERGY.map((option, index) => (
            <button
              key={option}
              type="button"
              tabIndex={-1}
              className={`energy__option${option === 'Good' ? ' is-selected' : ''}`}
              style={{ '--i': index } as CSSProperties}
            >
              {option}
              {option === 'Good' && <CheckIcon />}
            </button>
          ))}
        </div>
        <div className="mini-progress">
          <i />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ 02 --- */

const SIGNALS = [
  { label: 'Sleep', angle: -90 },
  { label: 'Night shift', angle: -18 },
  { label: 'Exam', angle: 54 },
  { label: 'Stress', angle: 126 },
  { label: 'Activity', angle: 198 },
]

/**
 * Signals orbiting the MavorynAI mark. Nodes are placed by angle on a shared
 * radius, so the ring stays even at any size, and each node counter-rotates so
 * its label never turns upside down.
 */
export function SignalsVisual() {
  const [ref, inView] = useInView<HTMLDivElement>(0.25)

  return (
    <div ref={ref} className={`visual visual--signals${inView ? ' is-live' : ''}`}>
      <div className="signal-map">
        <span className="signal-map__ring signal-map__ring--1" />
        <span className="signal-map__ring signal-map__ring--2" />
        <span className="signal-map__core">M</span>
        <div className="signal-map__orbit">
          {SIGNALS.map((signal, index) => (
            <span
              key={signal.label}
              className="signal-map__node"
              style={{ '--a': `${signal.angle}deg`, '--i': index } as CSSProperties}
            >
              <i>{signal.label}</i>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ 03 --- */

const FACTORS = [
  { label: 'Sleep', value: 82 },
  { label: 'Stress', value: 64 },
  { label: 'Energy', value: 76 },
  { label: 'Mood', value: 80 },
  { label: 'Activity', value: 71 },
]

/** Health Score breakdown. Bars fill in sequence; the headline score counts up. */
export function ScoreVisual() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3)

  return (
    <div ref={ref} className={`visual visual--score${inView ? ' is-live' : ''}`}>
      <div className="breakdown">
        <header className="breakdown__head">
          <div>
            <small className="mono-label">Today’s Health Score</small>
            <strong>78</strong>
          </div>
          <b className="breakdown__badge">Improving ↗</b>
        </header>

        <ul className="breakdown__list" role="list">
          {FACTORS.map((factor, index) => (
            <li key={factor.label} style={{ '--i': index } as CSSProperties}>
              <span>{factor.label}</span>
              <i className="breakdown__bar">
                <b style={{ '--v': `${factor.value}%` } as CSSProperties} />
              </i>
              <strong>{factor.value}</strong>
            </li>
          ))}
        </ul>

        <p className="breakdown__foot">Most improved · Sleep after your recovery day</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ 04 --- */

const MICRO = [35, 55, 40, 62, 48, 72, 88]

/** Weekly AI insight card with a seven-day micro chart. */
export function InsightVisual() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3)

  return (
    <div ref={ref} className={`visual visual--insight${inView ? ' is-live' : ''}`}>
      <div className="insight-card">
        <header className="insight-card__head">
          <span className="insight-card__spark" aria-hidden="true">
            ✦
          </span>
          <small className="mono-label">Your AI health insight</small>
          <b>Improving</b>
        </header>

        <p className="insight-card__quote">
          “Your stress rose across three night shifts while sleep declined. On days you walked
          before work, your energy was higher.”
        </p>

        <div className="micro-bars" aria-hidden="true">
          {MICRO.map((height, index) => (
            <i
              key={index}
              className={index === MICRO.length - 1 ? 'is-peak' : undefined}
              style={{ '--h': `${height}%`, '--i': index } as CSSProperties}
            />
          ))}
        </div>

        <p className="insight-card__rec">
          Recommendation · Protect a 20-minute walk and a consistent wind-down before your next
          shift.
        </p>
      </div>
    </div>
  )
}
