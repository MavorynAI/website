import { Reveal, SectionHeading, SurfaceCard } from './ui/Primitives'
import './Founders.css'

/* ---------------------------------------------------------------------------
   To add a founder or edit a bio, change this array — nothing else. `link` is
   optional: add a LinkedIn or personal URL and the card grows a link; leave
   the key out and it doesn't.
   ------------------------------------------------------------------------ */

type Founder = {
  initials: string
  name: string
  role: string
  credential: string
  discipline: string
  bio: string
  link?: string
}

const FOUNDERS: Founder[] = [
  {
    initials: 'SR',
    name: 'Santhoshkumar Rajeshkannan',
    role: 'Co-founder, Healthcare',
    credential: 'D.Pharm',
    discipline: 'Healthcare',
    bio: 'A pharmacy professional who has worked the hours this product measures. Now pursuing an MS in Bioinformatics and Data Science at ASU, he leads everything clinical, and makes sure the science earns your trust.',
  },
  {
    initials: 'AS',
    name: 'Ananth Sundararajan Sekar',
    role: 'Co-founder, Technology',
    credential: '',
    discipline: 'Technology',
    bio: 'Pursuing an MS in Computer Science at ASU, he leads everything technical, builds every part of MavorynAI you touch, and sweats the details most people will never notice.',
  },
]

/**
 * 05 — the founders.
 *
 * Sits between the mission and the beta signup: the last thing a visitor reads
 * before deciding whether to hand over health data is who is accountable for
 * it. Deliberately restrained — two cards, one line each — so it reads as
 * credentials rather than as an about-us page.
 */
export function Founders() {
  return (
    <section className="founders section" id="founders">
      <div className="wrap">
        <SectionHeading
          tag="05 / The founders"
          title={
            <>
              Built by the people
              <br />
              who <em>live it.</em>
            </>
          }
          lede="A healthcare professional and an engineer, both at ASU, building the tool they needed during the hardest stretches of training."
        />

        <div className="founders__grid">
          {FOUNDERS.map((founder, index) => (
            <Reveal key={founder.role} direction="scale" delay={index * 90}>
              <SurfaceCard className="founder">
                <div className="founder__head">
                  <span className="founder__avatar" aria-hidden="true">
                    {founder.initials}
                  </span>
                  <span className="founder__discipline mono-label">{founder.discipline}</span>
                </div>

                <h3 className="founder__name">
                  {founder.name}
                  {founder.credential && (
                    <span className="founder__credential">, {founder.credential}</span>
                  )}
                </h3>

                <p className="founder__role">{founder.role}</p>
                <p className="founder__bio">{founder.bio}</p>

                {founder.link && (
                  <a
                    className="founder__link"
                    href={founder.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M7 13 13 7M8 7h5v5" />
                    </svg>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </SurfaceCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
