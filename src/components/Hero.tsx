import type { CSSProperties } from 'react'
import { ArrowIcon, Button, QuietLink } from './ui/Button'
import { PhoneMock } from './PhoneMock'
import { useViewportTilt } from '../hooks/usePointer'
import './Hero.css'

/**
 * Headline split into lines, then words, so each word can rise on its own beat.
 * The running `order` is baked in here rather than counted during render, so
 * the stagger is a property of the data and not of render timing.
 */
const HEADLINE: { word: string; order: number; accent: boolean }[][] = (() => {
  const lines = [
    ['Stay', 'strong'],
    ['through', 'the', 'hard', 'parts.'],
  ]
  let order = 0
  return lines.map((line) =>
    line.map((word) => ({
      word,
      order: order++,
      accent: word === 'hard' || word === 'parts.',
    })),
  )
})()

export function Hero() {
  const stageRef = useViewportTilt<HTMLDivElement>()

  return (
    <section className="hero" id="home">
      {/* Aurora — three offset washes on slow, desynchronised drifts. */}
      <div className="hero__aurora" aria-hidden="true">
        <span className="ambient hero__glow hero__glow--1" />
        <span className="ambient hero__glow hero__glow--2" />
        <span className="ambient hero__glow hero__glow--3" />
      </div>
      <div className="hero__grid-lines" aria-hidden="true" />

      <div className="hero__inner wrap">
        <div className="hero__copy">
          <p className="hero__kicker">
            <span className="hero__pulse" aria-hidden="true" />
            Health intelligence for healthcare
          </p>

          <h1 className="display-1 hero__title">
            {HEADLINE.map((line, lineIndex) => (
              <span className="hero__line" key={lineIndex}>
                {line.map(({ word, order, accent }) => (
                  <span
                    className="hero__word"
                    key={word + order}
                    style={{ '--w': order } as CSSProperties}
                  >
                    <span
                      className={accent ? 'hero__word-inner hero__accent' : 'hero__word-inner'}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="hero__lede">
            MavorynAI helps healthcare trainees and professionals understand how shifts, exams,
            sleep, activity, and stress affect their health, then turns those patterns into
            practical ways to recover.
          </p>

          <div className="hero__actions">
            <Button as="a" href="#beta" variant="primary" size="lg">
              Join the early access list <ArrowIcon />
            </Button>
            <QuietLink href="#product">See how it works</QuietLink>
          </div>

          <div className="hero__trust">
            <span className="hero__avatars" aria-hidden="true">
              <i>MD</i>
              <i>RN</i>
              <i>PA</i>
            </span>
            <span>
              Built for students, clinicians,
              <br />
              and healthcare professionals.
            </span>
          </div>
        </div>

        <div className="hero__stage" ref={stageRef}>
          <span className="hero__ring hero__ring--1" aria-hidden="true" />
          <span className="hero__ring hero__ring--2" aria-hidden="true" />
          <span className="hero__spotlight" aria-hidden="true" />

          {/* The frame is exactly the size of the device, so the floating
              cards can be offset from the phone's own edges rather than from
              the stage — which is what keeps them off the screen content at
              every width. On narrow screens the frame becomes a column and
              the cards flow underneath instead of overlapping. */}
          <div className="hero__frame">
            <div className="hero__device">
              <PhoneMock />
            </div>

            <div className="hero__floats">
              <FloatCard
                className="hero__float hero__float--sleep"
                icon="☾"
                label="Sleep"
                value="7h 42m"
                delta="+12%"
              />
              <FloatCard
                className="hero__float hero__float--insight"
                icon="✦"
                label="AI recommendation"
                value="Protect a 20-minute walk before tonight’s shift."
              />
            </div>
          </div>
        </div>
      </div>

      <a className="hero__scroll wrap" href="#product">
        <span className="hero__scroll-label">Scroll to explore</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  )
}

function FloatCard({
  className,
  icon,
  label,
  value,
  delta,
}: {
  className: string
  icon: string
  label: string
  value: React.ReactNode
  delta?: string
}) {
  return (
    <div className={className}>
      <span className="float-card__icon" aria-hidden="true">
        {icon}
      </span>
      <div className="float-card__text">
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
      {delta && <b className="float-card__delta">{delta}</b>}
    </div>
  )
}
