import { Logo } from './Logo'
import './Footer.css'

const LINKS = [
  { href: '#privacy', label: 'Privacy' },
  { href: '#home', label: 'Terms' },
  { href: 'mailto:hello@mavorynai.com', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <a className="footer__brand" href="#home" aria-label="MavorynAI home">
          <Logo compact />
        </a>

        <nav className="footer__links" aria-label="Footer">
          {LINKS.map(({ href, label }) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <span className="footer__legal">
          © 2026 MavorynAI · A general wellness product, not a medical device.
        </span>
      </div>
    </footer>
  )
}
