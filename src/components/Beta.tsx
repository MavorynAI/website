import { useRef, useState, type FormEvent } from 'react'
import { ArrowIcon, Button, CheckIcon } from './ui/Button'
import { Reveal } from './ui/Primitives'
import { logoUrl } from './Logo'
import './Beta.css'

type Status = 'idle' | 'submitting' | 'done'

/**
 * Early-access capture.
 *
 * NOTE — unchanged from the previous implementation, this form does not post
 * anywhere: `handleSubmit` calls `preventDefault()` and nothing else. The
 * states below are presentation only. To make it real, replace the marked
 * block with a request to your list provider and surface failures through
 * `setStatus('idle')` plus an error message.
 */
export function Beta() {
  const [status, setStatus] = useState<Status>('idle')
  const [email, setEmail] = useState('')
  const timer = useRef<number | undefined>(undefined)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status !== 'idle') return

    setStatus('submitting')

    // ---- Replace with the real signup request ----------------------------
    // The short delay exists so the pending state is perceptible rather than
    // flashing past; it is not doing any work.
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setStatus('done'), 900)
    // ----------------------------------------------------------------------
  }

  return (
    <section className="beta section" id="beta">
      <span className="ambient beta__glow beta__glow--1" aria-hidden="true" />
      <span className="ambient beta__glow beta__glow--2" aria-hidden="true" />

      <div className="wrap beta__inner">
        <Reveal className="beta__mark" direction="scale">
          <img src={logoUrl} alt="MavorynAI logo" width={110} height={110} />
        </Reveal>

        <Reveal className="beta__kicker" direction="fade" delay={60}>
          <span className="beta__dot" aria-hidden="true" />
          Private beta · Arizona
        </Reveal>

        <Reveal as="h2" className="display-2 beta__title" delay={100}>
          A healthier way
          <br />
          through healthcare.
        </Reveal>

        <Reveal className="beta__lede" delay={140}>
          Join the first group shaping MavorynAI.
        </Reveal>

        <Reveal className="beta__form-wrap" direction="scale" delay={200}>
          {status === 'done' ? (
            <p className="beta__success" role="status">
              <span className="beta__success-icon" aria-hidden="true">
                <CheckIcon />
              </span>
              Thanks, we’ll be in touch about early access.
            </p>
          ) : (
            <form className="beta__form" onSubmit={handleSubmit} noValidate={false}>
              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={status === 'submitting'}
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                magnetic={false}
                className="beta__submit"
                aria-busy={status === 'submitting'}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    Requesting
                  </>
                ) : (
                  <>
                    Request access <ArrowIcon />
                  </>
                )}
              </Button>
            </form>
          )}
        </Reveal>

        <Reveal className="beta__note" direction="fade" delay={260}>
          For healthcare students, trainees, clinicians, and professionals. No spam. Ever.
        </Reveal>
      </div>
    </section>
  )
}
