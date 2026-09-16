import './Logo.css'

export const logoUrl = `${import.meta.env.BASE_URL}mavoryn-mark.png`

/**
 * Wordmark lockup. The "A" and "I" keep their brand tints; the mark gets a
 * subtle lift on hover when the lockup sits inside a link.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`logo${compact ? ' logo--compact' : ''}`}>
      <img className="logo__mark" src={logoUrl} alt="" width={42} height={42} />
      <span className="logo__word">
        Mavoryn<span className="logo__a">A</span>
        <span className="logo__i">I</span>
      </span>
    </span>
  )
}
