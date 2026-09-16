import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useSpotlight } from '../../hooks/usePointer'
import './Primitives.css'

/* ---------------------------------------------------------------------------
   Reveal
   Declarative wrapper over the `[data-reveal]` contract in base.css. The shared
   observer in useScrollReveal picks it up automatically.
   ------------------------------------------------------------------------ */

type RevealDirection = 'up' | 'left' | 'right' | 'scale' | 'fade'

export function Reveal({
  children,
  as: Tag = 'div',
  direction = 'up',
  delay = 0,
  className,
  style,
  ...rest
}: {
  children: ReactNode
  as?: ElementType
  direction?: RevealDirection
  /** Stagger in ms. Keep siblings under ~90ms apart or the page feels slow. */
  delay?: number
  className?: string
  style?: CSSProperties
} & Record<string, unknown>) {
  return (
    <Tag
      data-reveal={direction === 'up' ? '' : direction}
      className={className}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ---------------------------------------------------------------------------
   SurfaceCard
   The base card: hairline border, layered elevation, and a cursor-following
   spotlight film. One component so radius, border and shadow never diverge.
   ------------------------------------------------------------------------ */

export function SurfaceCard({
  children,
  className,
  interactive = true,
  as: Tag = 'article',
  ...rest
}: {
  children: ReactNode
  className?: string
  interactive?: boolean
  as?: ElementType
} & Record<string, unknown>) {
  const ref = useSpotlight<HTMLElement>(interactive)

  return (
    <Tag
      ref={ref}
      className={['surface-card', interactive && 'surface-card--interactive', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span className="surface-card__spot" aria-hidden="true" />
      <span className="surface-card__edge" aria-hidden="true" />
      <div className="surface-card__body">{children}</div>
    </Tag>
  )
}

/* ---------------------------------------------------------------------------
   Chip — small mono-type pill used for metadata and reassurances.
   ------------------------------------------------------------------------ */

export function Chip({
  children,
  icon,
  tone = 'mint',
}: {
  children: ReactNode
  icon?: ReactNode
  tone?: 'mint' | 'muted'
}) {
  return (
    <span className={`chip chip--${tone}`}>
      {icon && <span className="chip__icon">{icon}</span>}
      {children}
    </span>
  )
}

/* ---------------------------------------------------------------------------
   SectionHeading — the tag + headline + optional lede pattern, reused by
   every major band so vertical rhythm is identical throughout the page.
   ------------------------------------------------------------------------ */

export function SectionHeading({
  tag,
  title,
  lede,
  align = 'split',
}: {
  tag: string
  title: ReactNode
  lede?: ReactNode
  align?: 'split' | 'center' | 'start'
}) {
  return (
    <header className={`section-heading section-heading--${align}`}>
      <Reveal className="section-tag" direction="fade">
        {tag}
      </Reveal>
      <div className="section-heading__row">
        <Reveal as="h2" className="display-2 section-heading__title" delay={60}>
          {title}
        </Reveal>
        {lede && (
          <Reveal className="section-heading__lede body-copy" delay={140}>
            {lede}
          </Reveal>
        )}
      </div>
    </header>
  )
}

/* ---------------------------------------------------------------------------
   Marquee — seamless horizontal ticker. The track is duplicated and the
   animation translates exactly -50%, so the loop has no visible seam.
   ------------------------------------------------------------------------ */

export function Marquee({ items, speed = 42 }: { items: string[]; speed?: number }) {
  const track = (
    <div className="marquee__track" aria-hidden="true">
      {items.map((item, index) => (
        <span className="marquee__item" key={`${item}-${index}`}>
          {item}
          <i className="marquee__dot" />
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee" style={{ '--marquee-speed': `${speed}s` } as CSSProperties}>
      {/* Visually hidden, semantically complete list for assistive tech. */}
      <span className="sr-only">{items.join(', ')}</span>
      <div className="marquee__viewport">
        {track}
        {track}
      </div>
    </div>
  )
}
