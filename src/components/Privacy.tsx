import { QuietLink } from './ui/Button'
import { Reveal, SurfaceCard } from './ui/Primitives'
import './Privacy.css'

const PROMISES = [
  {
    number: '01',
    title: 'Never sold.',
    body: 'Your health, mood, and recovery data will never be sold or used for advertising.',
  },
  {
    number: '02',
    title: 'Yours alone.',
    body: 'Schools never see individual data. Future institution insights are anonymous and aggregated.',
  },
  {
    number: '03',
    title: 'No labels.',
    body: 'No diagnoses, “high risk” tags, leaderboards, or comparison with other trainees.',
  },
  {
    number: '04',
    title: 'Delete means delete.',
    body: 'You stay in control, including the ability to remove your account and data.',
  },
]

/** 03 — the data promise. Statement on the left, four promise cards on the right. */
export function Privacy() {
  return (
    <section className="privacy section" id="privacy">
      <span className="ambient privacy__glow" aria-hidden="true" />

      <div className="wrap privacy__grid">
        <div className="privacy__intro">
          <Reveal className="section-tag" direction="fade">
            03 / Your data
          </Reveal>

          <Reveal as="h2" className="display-2 privacy__title" delay={60}>
            Your wellbeing
            <br />
            is not a <em>data product.</em>
          </Reveal>

          <Reveal className="privacy__lede body-copy" delay={120}>
            Privacy isn’t a settings page. It is the architecture.
          </Reveal>

          <Reveal delay={180}>
            <QuietLink href="#beta">Read our privacy commitment</QuietLink>
          </Reveal>
        </div>

        <div className="privacy__cards">
          {PROMISES.map((promise, index) => (
            <Reveal key={promise.number} direction="scale" delay={index * 80}>
              <SurfaceCard className="promise">
                <span className="promise__number mono-label">{promise.number}</span>
                <h3 className="promise__title">{promise.title}</h3>
                <p className="promise__body">{promise.body}</p>
              </SurfaceCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
