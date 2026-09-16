import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { useMagnetic } from '../../hooks/usePointer'
import './Button.css'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type CommonProps = {
  variant?: Variant
  size?: Size
  /** Magnetic pull toward the cursor. Off for dense/inline placements. */
  magnetic?: boolean
  children: ReactNode
  className?: string
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string }

function classes(variant: Variant, size: Size, magnetic: boolean, extra?: string) {
  return ['btn', `btn--${variant}`, `btn--${size}`, magnetic && 'btn--magnetic', extra]
    .filter(Boolean)
    .join(' ')
}

/**
 * The single button in the system. Every visual state — rest, hover, active,
 * focus, disabled — is defined once in Button.css so nothing drifts.
 *
 * The inner `.btn__label` exists so the press-scale can be applied to the
 * surface while the label stays crisp, and so the sheen sweep has an element
 * to travel across.
 */
export function Button(props: ButtonProps): React.JSX.Element
export function Button(props: LinkProps): React.JSX.Element
export function Button({
  variant = 'primary',
  size = 'md',
  magnetic = true,
  children,
  className,
  as = 'button',
  ...rest
}: ButtonProps | LinkProps) {
  const magnetRef = useMagnetic<HTMLElement>(0.18, magnetic)
  const content = (
    <>
      <span className="btn__sheen" aria-hidden="true" />
      <span className="btn__label">{children}</span>
    </>
  )

  if (as === 'a') {
    return (
      <a
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        ref={magnetRef as React.Ref<HTMLAnchorElement>}
        className={classes(variant, size, magnetic, className)}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      ref={magnetRef as React.Ref<HTMLButtonElement>}
      className={classes(variant, size, magnetic, className)}
    >
      {content}
    </button>
  )
}

/** Understated text link with an animated underline and a nudging arrow. */
export function QuietLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a href={href} className={['quiet-link', className].filter(Boolean).join(' ')}>
      <span className="quiet-link__text">{children}</span>
      <ArrowIcon />
    </a>
  )
}

export function ArrowIcon() {
  return (
    <svg className="icon-arrow" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg className="icon-check" viewBox="0 0 20 20" aria-hidden="true">
      <path d="m5 10 3 3 7-7" />
    </svg>
  )
}
