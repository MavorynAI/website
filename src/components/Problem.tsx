import { Reveal, SurfaceCard } from './ui/Primitives'
import './Problem.css'

const STATS = [
  {
    value: 'One score',
    detail: 'turns daily health signals into a clear personal snapshot',
  },
  {
    value: 'Full context',
    detail: 'connects exams, rotations, shifts, and on-call days to your trends',
  },
  {
    value: '30 sec',
    detail: 'is all it takes to check in with yourself',
  },
]

/** 01 — the problem. Two-column statement, then three supporting stat cards. */
export function Problem() {
  return (
    <section className="problem section wrap" id="product">
      <Reveal className="section-tag" direction="fade">
        01 / The problem
      </Reveal>

      <div className="problem__grid">
        <Reveal as="h2" className="display-2 problem__title" delay={60}>
          You care for everyone.
          <br />
          <em>Don’t lose sight of you.</em>
        </Reveal>

        <Reveal className="problem__copy" direction="left" delay={140}>
          <p className="body-copy">
            Healthcare education and practice demand focus, long hours, and emotional endurance.
            Students, residents, doctors, nurses, and other professionals can miss the early
            signals that stress is outpacing recovery.
          </p>
          <p className="problem__accent">
            MavorynAI makes those patterns visible before pressure compounds.
          </p>
        </Reveal>
      </div>

      <div className="problem__stats">
        {STATS.map((stat, index) => (
          <Reveal key={stat.value} direction="scale" delay={index * 90}>
            <SurfaceCard className="stat-card">
              <span className="stat-card__index mono-label">
                {String(index + 1).padStart(2, '0')}
              </span>
              <strong className="stat-card__value">{stat.value}</strong>
              <span className="stat-card__detail">{stat.detail}</span>
            </SurfaceCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
