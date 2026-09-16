import type { CSSProperties } from 'react'
import { Logo } from './Logo'
import { useCountUp, useInView } from '../hooks/useCountUp'
import './PhoneMock.css'

/** Seven-day Health Score trend shown in the device. Last point is today. */
const TREND = [54, 63, 58, 71, 66, 73, 78]
const SCORE = 78

/**
 * The hero device. Everything inside animates on entry: the ring sweeps to the
 * score, the bars grow from the baseline in sequence, and the number counts up.
 * It is decorative, so the whole subtree is hidden from assistive tech and the
 * surrounding copy carries the meaning.
 */
export function PhoneMock() {
  const [scoreRef, score] = useCountUp(SCORE, { duration: 1600 })
  const [chartRef, chartInView] = useInView<HTMLDivElement>(0.35)
  const peak = Math.max(...TREND)

  return (
    <div className="phone" aria-hidden="true">
      <div className="phone__screen">
        <div className="phone__status">
          <span>9:41</span>
          <i className="phone__battery" />
        </div>

        <div className="phone__appbar">
          <Logo compact />
          <button className="phone__more" type="button" tabIndex={-1}>
            •••
          </button>
        </div>

        <div className="phone__hello">
          <span>Good morning, Maya</span>
          <h3>
            How are you
            <br />
            feeling today?
          </h3>
        </div>

        <div className="score-card">
          <div className="score-card__meta">
            <span>Today’s Health Score</span>
            <strong ref={scoreRef as React.Ref<HTMLElement>}>{Math.round(score)}</strong>
            <small>+6 from yesterday</small>
          </div>
          <ScoreRing value={SCORE} />
        </div>

        <div className="phone__trend">
          <span>Night-shift week</span>
          <b>Improving ↗</b>
        </div>

        <div ref={chartRef} className={`phone__chart${chartInView ? ' is-live' : ''}`}>
          {TREND.map((point, index) => (
            <span
              key={point + '-' + index}
              className={`phone__bar${index === TREND.length - 1 ? ' is-today' : ''}`}
              style={
                {
                  '--h': `${(point / peak) * 100}%`,
                  '--i': index,
                } as CSSProperties
              }
            >
              <i>{point}</i>
            </span>
          ))}
        </div>

        <button className="phone__cta" type="button" tabIndex={-1}>
          Daily check-in <span>30 sec</span>
        </button>
      </div>
    </div>
  )
}

/**
 * Circular score gauge drawn with SVG rather than a rotated border, so the arc
 * can be animated precisely with stroke-dashoffset and stays crisp at any size.
 */
function ScoreRing({ value }: { value: number }) {
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const [ref, inView] = useInView<HTMLDivElement>(0.4)

  return (
    <div ref={ref} className="score-ring">
      <svg viewBox="0 0 72 72">
        <defs>
          <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#35d4dc" />
            <stop offset="100%" stopColor="#5b82ff" />
          </linearGradient>
        </defs>
        <circle className="score-ring__track" cx="36" cy="36" r={radius} />
        <circle
          className="score-ring__value"
          cx="36"
          cy="36"
          r={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: inView
              ? circumference - (value / 100) * circumference
              : circumference,
          }}
        />
      </svg>
      <b>{value}</b>
    </div>
  )
}
