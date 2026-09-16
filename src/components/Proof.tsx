import { Marquee } from './ui/Primitives'
import './Proof.css'

const CONTEXTS = [
  'EXAM WEEKS',
  'CLINICAL ROTATIONS',
  'NIGHT SHIFTS',
  'ON-CALL DAYS',
  'BOARD PREP',
]

/**
 * Context strip between the hero and the problem statement. Kept as a marquee
 * at every breakpoint — the list is a rhythm, not a checklist, and motion makes
 * it read as "ongoing" rather than "exhaustive".
 */
export function Proof() {
  return (
    <section className="proof" aria-label="Product use cases">
      <p className="proof__label mono-label">Made for the realities of healthcare</p>
      <Marquee items={CONTEXTS} speed={38} />
    </section>
  )
}
