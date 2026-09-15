import { useEffect, useState } from 'react'
import './App.css'

const Arrow = () => <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4" /></svg>
const Check = () => <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10 3 3 7-7" /></svg>

function Logo({ compact = false }: { compact?: boolean }) {
  return <span className={`logo ${compact ? 'compact' : ''}`}><img src="/mavoryn-mark.png" alt="" /><span>Mavoryn<span className="wordmark-a">A</span><span className="wordmark-i">I</span></span></span>
}

function App() {
  const [light, setLight] = useState(false)
  useEffect(() => {
    document.documentElement.dataset.theme = light ? 'light' : 'dark'
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('seen')), { threshold: .14 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [light])

  return <main>
    <header className="nav wrap">
      <a href="#home" aria-label="MavorynAI home"><Logo compact /></a>
      <nav aria-label="Primary"><a href="#product">Product</a><a href="#how">How it works</a><a href="#privacy">Privacy</a><a href="#mission">Mission</a></nav>
      <div className="nav-end"><button className="theme" onClick={() => setLight(!light)} aria-label={`Use ${light ? 'dark' : 'light'} theme`}><span /><span /></button><a className="pill nav-cta" href="#beta">Join the beta <Arrow /></a></div>
    </header>

    <section className="hero wrap" id="home">
      <div className="ambient a1" /><div className="ambient a2" />
      <div className="hero-copy reveal"><div className="kicker"><i /> Health intelligence for healthcare</div><h1>Stay strong<br />through the <em>hard parts.</em></h1><p>MavorynAI helps healthcare trainees and professionals understand how shifts, exams, sleep, activity, and stress affect their health—then turns those patterns into practical ways to recover.</p><div className="actions"><a className="pill primary" href="#beta">Join the early access list <Arrow /></a><a className="quiet-link" href="#product"><span>See how it works</span><Arrow /></a></div><div className="trust-row"><div className="avatars"><i>MD</i><i>RN</i><i>PA</i></div><span>Built for students, clinicians,<br />and healthcare professionals.</span></div></div>
      <div className="phone-stage reveal">
        <div className="orbit-ring ring-one"/><div className="orbit-ring ring-two"/>
        <div className="phone"><div className="phone-top"><span>9:41</span><i /></div><div className="app-head"><Logo compact /><button>•••</button></div><div className="hello"><span>Good morning, Maya</span><h3>How are you<br />feeling today?</h3></div><div className="score-card"><div><span>Today’s Health Score</span><strong>78</strong><small>+6 from yesterday</small></div><div className="score-ring"><b>78</b><span /></div></div><div className="trend-label"><span>Night-shift week</span><b>Improving ↗</b></div><div className="chart"><span className="chart-line"/><i>54</i><i>63</i><i>58</i><i>71</i><i>66</i><i>73</i><i>78</i></div><button className="check-button">Daily check-in <span>30 sec</span></button></div>
        <div className="float-card sleep"><span className="float-icon">☾</span><div><small>Sleep</small><strong>7h 42m</strong></div><b>+12%</b></div><div className="float-card insight"><span className="sparkle">✦</span><div><small>AI recommendation</small><strong>Protect a 20-minute walk<br />before tonight’s shift.</strong></div></div>
      </div>
      <div className="scroll-note">Scroll to explore <span /></div>
    </section>

    <section className="proof wrap reveal" aria-label="Product use cases"><p>Made for the realities of healthcare</p><div><span>EXAM WEEKS</span><i>•</i><span>CLINICAL ROTATIONS</span><i>•</i><span>NIGHT SHIFTS</span><i>•</i><span>ON-CALL DAYS</span><i>•</i><span>BOARD PREP</span></div></section>

    <section className="intro wrap section" id="product"><div className="section-tag reveal">01 / The problem</div><div className="intro-grid"><h2 className="reveal">You care for everyone.<br /><em>Don’t lose sight of you.</em></h2><div className="reveal"><p>Healthcare education and practice demand focus, long hours, and emotional endurance. Students, residents, doctors, nurses, and other professionals can miss the early signals that stress is outpacing recovery.</p><p className="accent-copy">MavorynAI makes those patterns visible before pressure compounds.</p></div></div><div className="stats reveal"><article><strong>One score</strong><span>turns daily health signals into a clear personal snapshot</span></article><article><strong>Full context</strong><span>connects exams, rotations, shifts, and on-call days to your trends</span></article><article><strong>30 sec</strong><span>is all it takes to check in with yourself</span></article></div></section>

    <section className="experience section" id="how"><div className="wrap"><div className="section-tag reveal">02 / The experience</div><div className="section-head reveal"><h2>One small ritual.<br /><em>A clearer week.</em></h2><p>Active reflection meets passive health signals, turning scattered data into calm, useful perspective.</p></div><div className="steps">
      <article className="step reveal"><div className="step-copy"><span>01</span><h3>Check in.<br />Without slowing down.</h3><p>Four thoughtful prompts about mood, stress, energy, and sleep. Designed to fit between rounds, classes, or study blocks.</p><div className="time-chip">◷ Under 30 seconds</div></div><div className="step-visual checkin"><div className="mini-phone"><small>DAILY CHECK-IN · 1 OF 4</small><h4>How is your<br />energy today?</h4><div className="energy-options"><button>Low</button><button>Okay</button><button className="selected">Good <Check /></button><button>Great</button></div><div className="mini-progress"><i /></div></div></div></article>
      <article className="step flip reveal"><div className="step-copy"><span>02</span><h3>Add the context<br />that matters.</h3><p>Log exams, rotations, night shifts, on-call days, and recovery days. With permission, MavorynAI also adds read-only Apple Health trends such as sleep, activity, workouts, and heart rate.</p><div className="private-chip">⌁ Read-only. Always optional.</div></div><div className="step-visual signals"><div className="signal-map"><span className="center-mark">M</span><i className="s1">Sleep</i><i className="s2">Night shift</i><i className="s3">Exam</i><i className="s4">Stress</i><i className="s5">Activity</i></div></div></article>
      <article className="step reveal"><div className="step-copy"><span>03</span><h3>Understand your<br />Health Score.</h3><p>Your daily score from 0–100 brings together sleep, stress, energy, mood, and activity. A clear breakdown shows what moved the score and how your health is trending over time.</p><div className="time-chip">◎ Transparent and personal</div></div><div className="step-visual score-detail"><div className="breakdown"><div className="breakdown-head"><div><small>TODAY’S HEALTH SCORE</small><strong>78</strong></div><b>Improving ↗</b></div><ul><li><span>Sleep</span><i><b style={{width:'82%'}} /></i><strong>82</strong></li><li><span>Stress</span><i><b style={{width:'64%'}} /></i><strong>64</strong></li><li><span>Energy</span><i><b style={{width:'76%'}} /></i><strong>76</strong></li><li><span>Mood</span><i><b style={{width:'80%'}} /></i><strong>80</strong></li><li><span>Activity</span><i><b style={{width:'71%'}} /></i><strong>71</strong></li></ul><p>Most improved · Sleep after your recovery day</p></div></div></article>
      <article className="step flip reveal"><div className="step-copy"><span>04</span><h3>Turn insight<br />into a better week.</h3><p>MavorynAI connects your schedule and health trends to provide practical AI-powered recommendations for sleep, movement, recovery time, and coping with stress—without diagnosing or replacing professional care.</p><div className="time-chip">✦ Personal, practical, non-clinical</div></div><div className="step-visual weekly"><div className="insight-card"><div className="insight-top"><span>✦</span><small>YOUR AI HEALTH INSIGHT</small><b>Improving</b></div><p>“Your stress rose across three night shifts while sleep declined. On days you walked before work, your energy was higher.”</p><div className="micro-bars"><i/><i/><i/><i/><i/><i/><i/></div><span className="suggestion">Recommendation · Protect a 20-minute walk and a consistent wind-down before your next shift.</span></div></div></article>
    </div></div></section>

    <section className="privacy section" id="privacy"><div className="privacy-glow"/><div className="wrap privacy-grid"><div className="reveal"><div className="section-tag">03 / Your data</div><h2>Your wellbeing<br />is not a <em>data product.</em></h2><p>Privacy isn’t a settings page. It is the architecture.</p><a className="quiet-link" href="#beta">Read our privacy commitment <Arrow /></a></div><div className="promise-grid reveal"><article><span>01</span><h3>Never sold.</h3><p>Your health, mood, and recovery data will never be sold or used for advertising.</p></article><article><span>02</span><h3>Yours alone.</h3><p>Schools never see individual data. Future institution insights are anonymous and aggregated.</p></article><article><span>03</span><h3>No labels.</h3><p>No diagnoses, “high risk” tags, leaderboards, or comparison with other trainees.</p></article><article><span>04</span><h3>Delete means delete.</h3><p>You stay in control, including the ability to remove your account and data.</p></article></div></div></section>

    <section className="mission section wrap" id="mission"><div className="section-tag reveal">04 / The mission</div><div className="mission-copy reveal"><span>Better health supports better care.</span><h2>Care for others<br />without losing <em>yourself.</em></h2><p>We’re starting in Arizona and building toward a future where recovery and mental fitness are treated as part of healthcare excellence—from the first exam to a lifetime in practice.</p></div><div className="arizona reveal"><div className="az-mark">AZ</div><div><span>Starting local</span><strong>Arizona’s healthcare community</strong><p>Students · Residents · Fellows · Doctors · Nurses · Pharmacists · PAs · Therapists · Healthcare teams</p></div></div></section>

    <section className="beta section" id="beta"><div className="wrap beta-inner reveal"><img src="/mavoryn-mark.png" alt="MavorynAI logo" /><div className="kicker">Private beta · Arizona</div><h2>A healthier way<br />through healthcare.</h2><p>Join the first group shaping MavorynAI.</p><form onSubmit={e => e.preventDefault()}><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" placeholder="Your email address" required/><button className="pill primary" type="submit">Request access <Arrow /></button></form><small>For healthcare students, trainees, clinicians, and professionals. No spam. Ever.</small></div></section>
    <footer className="footer wrap"><Logo compact/><div><a href="#privacy">Privacy</a><a href="#home">Terms</a><a href="mailto:hello@mavorynai.com">Contact</a></div><span>© 2026 MavorynAI · A general wellness product, not a medical device.</span></footer>
  </main>
}

export default App
