import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Proof } from './components/Proof'
import { Problem } from './components/Problem'
import { Experience } from './components/Experience'
import { Privacy } from './components/Privacy'
import { Mission } from './components/Mission'
import { Founders } from './components/Founders'
import { Beta } from './components/Beta'
import { Footer } from './components/Footer'
import { useTheme } from './hooks/useTheme'
import { useScrollReveal } from './hooks/useScrollReveal'

/**
 * MavorynAI marketing site.
 *
 * Each band of the page is its own component with co-located styles; shared
 * values live in src/styles/tokens.css and shared behaviour in src/hooks.
 * App itself only owns the two page-wide concerns: the theme attribute and the
 * single scroll-reveal observer.
 */
function App() {
  const { theme, toggle } = useTheme()
  useScrollReveal()

  return (
    <>
      <a className="skip-link" href="#product">
        Skip to content
      </a>

      <Nav theme={theme} onToggleTheme={toggle} />

      <main id="main">
        <Hero />
        <Proof />
        <Problem />
        <Experience />
        <Privacy />
        <Mission />
        <Founders />
        <Beta />
      </main>

      <Footer />

      <div className="grain" aria-hidden="true" />
    </>
  )
}

export default App
