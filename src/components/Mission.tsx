import { Reveal } from './ui/Primitives'
import './Mission.css'

const ROLES = [
  'Students',
  'Residents',
  'Fellows',
  'Doctors',
  'Nurses',
  'Pharmacists',
  'PAs',
  'Therapists',
  'Healthcare teams',
]

/** 04 — the mission. Centred statement, then the Arizona starting-point panel. */
export function Mission() {
  return (
    <section className="mission section wrap" id="mission">
      <Reveal className="section-tag mission__tag" direction="fade">
        04 / The mission
      </Reveal>

      <div className="mission__copy">
        <Reveal className="mission__eyebrow mono-label" direction="fade" delay={40}>
          Better health supports better care.
        </Reveal>

        <Reveal as="h2" className="display-2 mission__title" delay={100}>
          Care for others
          <br />
          without losing <em>yourself.</em>
        </Reveal>

        <Reveal className="mission__lede body-copy" delay={160}>
          We’re starting in Arizona and building toward a future where recovery and mental fitness
          are treated as part of healthcare excellence, from the first exam to a lifetime in
          practice.
        </Reveal>
      </div>

      <Reveal className="arizona" direction="scale" delay={80}>
        <span className="arizona__mark" aria-hidden="true">
          AZ
        </span>
        <div className="arizona__text">
          <span className="mono-label">Starting local</span>
          <strong>Arizona’s healthcare community</strong>
          <ul className="arizona__roles" role="list">
            {ROLES.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
