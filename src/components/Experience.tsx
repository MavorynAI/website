import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Chip, Reveal, SectionHeading } from './ui/Primitives'
import { CheckInVisual, InsightVisual, ScoreVisual, SignalsVisual } from './StepVisuals'
import './Experience.css'

type Step = {
  id: string
  number: string
  title: ReactNode
  body: string
  chip: { icon: string; label: string }
  visual: ReactNode
  flip?: boolean
}

const STEPS: Step[] = [
  {
    id: 'check-in',
    number: '01',
    title: (
      <>
        Check in.
        <br />
        Without slowing down.
      </>
    ),
    body: 'Four thoughtful prompts about mood, stress, energy, and sleep. Designed to fit between rounds, classes, or study blocks.',
    chip: { icon: '◷', label: 'Under 30 seconds' },
    visual: <CheckInVisual />,
  },
  {
    id: 'context',
    number: '02',
    title: (
      <>
        Add the context
        <br />
        that matters.
      </>
    ),
    body: 'Log exams, rotations, night shifts, on-call days, and recovery days. With permission, MavorynAI also adds read-only Apple Health trends such as sleep, activity, workouts, and heart rate.',
    chip: { icon: '⌁', label: 'Read-only. Always optional.' },
    visual: <SignalsVisual />,
    flip: true,
  },
  {
    id: 'score',
    number: '03',
    title: (
      <>
        Understand your
        <br />
        Health Score.
      </>
    ),
    body: 'Your daily score from 0–100 brings together sleep, stress, energy, mood, and activity. A clear breakdown shows what moved the score and how your health is trending over time.',
    chip: { icon: '◎', label: 'Transparent and personal' },
    visual: <ScoreVisual />,
  },
  {
    id: 'insight',
    number: '04',
    title: (
      <>
        Turn insight
        <br />
        into a better week.
      </>
    ),
    body: 'MavorynAI connects your schedule and health trends to provide practical AI-powered recommendations for sleep, movement, recovery time, and coping with stress, without diagnosing or replacing professional care.',
    chip: { icon: '✦', label: 'Personal, practical, non-clinical' },
    visual: <InsightVisual />,
    flip: true,
  },
]

/**
 * 02 — the experience.
 *
 * The four steps are sticky siblings: each pins near the top of the viewport
 * and the next slides over it, so the section reads as one continuous stack
 * rather than four separate blocks. A rail on the left tracks which card is
 * currently on top. The stack degrades to a plain vertical list wherever
 * sticky positioning or the viewport height can't support it.
 */
export function Experience() {
  const [active, setActive] = useState(0)
  const stackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stack = stackRef.current
    if (!stack) return

    const cards = Array.from(stack.querySelectorAll<HTMLElement>('.step'))
    if (!cards.length) return

    // The card whose top edge is closest to (but not far past) the pin line is
    // the one the reader is looking at.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = cards.indexOf(entry.target as HTMLElement)
          if (index !== -1) setActive(index)
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="experience section" id="how">
      <div className="wrap">
        <SectionHeading
          tag="02 / The experience"
          title={
            <>
              One small ritual.
              <br />
              <em>A clearer week.</em>
            </>
          }
          lede="Active reflection meets passive health signals, turning scattered data into calm, useful perspective."
        />

        <div className="experience__body">
          <nav className="step-rail" aria-label="Steps">
            <span
              className="step-rail__progress"
              style={{ '--active': active } as CSSProperties}
              aria-hidden="true"
            />
            {STEPS.map((step, index) => (
              <a
                key={step.id}
                href={`#${step.id}`}
                className={`step-rail__item${index === active ? ' is-active' : ''}`}
              >
                <span className="step-rail__dot" aria-hidden="true" />
                <span className="step-rail__label">{step.number}</span>
              </a>
            ))}
          </nav>

          <div className="steps" ref={stackRef}>
            {STEPS.map((step, index) => (
              <article
                key={step.id}
                id={step.id}
                className={`step${step.flip ? ' step--flip' : ''}`}
                style={{ '--i': index } as CSSProperties}
              >
                <div className="step__copy">
                  <Reveal className="step__number mono-label" direction="fade">
                    {step.number}
                  </Reveal>
                  <Reveal as="h3" className="display-3 step__title" delay={60}>
                    {step.title}
                  </Reveal>
                  <Reveal className="step__body body-copy" delay={120}>
                    {step.body}
                  </Reveal>
                  <Reveal delay={180}>
                    <Chip icon={step.chip.icon}>{step.chip.label}</Chip>
                  </Reveal>
                </div>
                <div className="step__visual">{step.visual}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
