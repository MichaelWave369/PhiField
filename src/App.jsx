import React, { useMemo, useState } from 'react'
import FieldCanvas from './FieldCanvas.jsx'
import { filters, links, portals, principles } from './data.js'

function Arrow({ diagonal = false }) {
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" fill="none">
    {diagonal
      ? <path d="M4 16 16 4M6 4h10v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      : <path d="M3 10h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    }
  </svg>
}

function Brand({ subtle = false }) {
  return <a className={'brand' + (subtle ? ' brand-subtle' : '')} href="#top" aria-label="Φ-Field, back to top">
    <span className="brand-symbol" aria-hidden="true">
      <span className="brand-rings">Φ</span>
    </span>
    <span className="brand-word">PHI<span className="brand-divider">/</span>FIELD<small>SOVEREIGN CREATIVE UNIVERSE</small></span>
  </a>
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = () => setMenuOpen(false)
  return <header className="site-header">
    <div className="container header-inner">
      <Brand />
      <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </button>
      <nav id="main-navigation" aria-label="Main navigation" className={'site-nav' + (menuOpen ? ' open' : '')}>
        <a href="#explore" onClick={navigate}>Explore</a>
        <a href="#systems" onClick={navigate}>The systems</a>
        <a href="#commons" onClick={navigate}>The commons</a>
        <a href="#principles" onClick={navigate}>Our code</a>
        <a className="nav-enter" href={links.github} target="_blank" rel="noopener noreferrer" onClick={navigate}>
          SOURCE / GITHUB <Arrow diagonal />
        </a>
      </nav>
    </div>
  </header>
}

function HeroOrbit() {
  return <div className="hero-orbit" aria-hidden="true">
    <span className="orbit-halo orbit-halo-one" />
    <span className="orbit-halo orbit-halo-two" />
    <span className="orbit-halo orbit-halo-three" />
    <span className="orbit-crosshair orbit-crosshair-h" />
    <span className="orbit-crosshair orbit-crosshair-v" />
    <span className="orbit-emblem">Φ</span>
    <span className="orbit-point orbit-point-one" />
    <span className="orbit-point orbit-point-two" />
    <span className="orbit-data orbit-data-top">ORIGIN / 369</span>
    <span className="orbit-data orbit-data-bottom">FIELD // 001</span>
  </div>
}

function Hero() {
  const [resonance, setResonance] = useState(0.62)
  const [isPlaying, setIsPlaying] = useState(true)
  return <section className="hero-section" id="top">
    <FieldCanvas resonance={resonance} isPlaying={isPlaying} />
    <div className="hero-grid" aria-hidden="true" />
    <div className="container hero-layout">
      <div className="hero-copy">
        <div className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> INDEPENDENT BY DESIGN <span className="eyebrow-serial">/ EST. Φ369</span></div>
        <h1>Ideas have<br /><span>gravity.</span></h1>
        <p className="hero-kicker">WELCOME TO THE FIELD.</p>
        <p className="hero-description">A sovereign creative universe at the intersection of imagination, mathematics, code, music, and artificial intelligence. Not one project. A living constellation of them.</p>
        <div className="hero-actions">
          <a href="#explore" className="button button-primary">ENTER THE FIELD <Arrow /></a>
          <a href="#commons" className="button button-outline">DISCOVER THE COMMONS <Arrow diagonal /></a>
        </div>
        <div className="hero-bottom-line"><span>OPEN WORLDS</span><span className="tiny-star">✳</span><span>PUBLIC RESEARCH</span><span className="tiny-star">✳</span><span>INDEPENDENT SYSTEMS</span></div>
      </div>
      <div className="hero-visual">
        <HeroOrbit />
        <div className="visual-coordinate visual-coordinate-left">X: 0.369<br />Y: 0.618</div>
        <div className="visual-coordinate visual-coordinate-right">NOT A GATE.<br />A POSSIBILITY.</div>
      </div>
    </div>
    <div className="hero-controls container">
      <div className="field-readout"><span className="readout-light" /> GENERATIVE FIELD <span className="muted">/ LOCAL SIMULATION</span></div>
      <div className="field-slider">
        <label htmlFor="resonance">RESONANCE <span>{Math.round(resonance * 100)}%</span></label>
        <input id="resonance" aria-label="Resonance intensity" type="range" min="0" max="100" value={Math.round(resonance * 100)}
          onChange={(event) => setResonance(Number(event.target.value) / 100)} />
      </div>
      <button className="field-pause" type="button" onClick={() => setIsPlaying(!isPlaying)}
        aria-pressed={!isPlaying} aria-label={isPlaying ? 'Pause field motion' : 'Resume field motion'}>
        {isPlaying ? 'Ⅱ PAUSE MOTION' : '▷ RESUME MOTION'}
      </button>
    </div>
    <div className="hero-edge" aria-hidden="true"><span>SCROLL TO EXPLORE</span><span className="edge-line" /></div>
  </section>
}

function PortalArt({ type }) {
  return <div className={'portal-art portal-art-' + type} aria-hidden="true">
    <span className="portal-art-ring one" /><span className="portal-art-ring two" /><span className="portal-art-ring three" />
    <span className="portal-art-axis axis-x" /><span className="portal-art-axis axis-y" />
    <span className="portal-art-glyph">
      {type === 'bridge' ? 'Ξ ⇄ Φ' :
        type === 'world' ? '◎' :
        type === 'os' ? 'Φ' :
        type === 'vessel' ? '∴' :
        type === 'atlas' ? '◈' :
        type === 'stars' ? '✧' :
        type === 'research' ? '∑' : '❋'}
    </span>
  </div>
}

function PortalCard({ portal }) {
  return <a className={'portal-card' + (portal.featured ? ' portal-featured' : '')}
    style={{ '--card-accent': portal.accent }} href={portal.url} target="_blank" rel="noopener noreferrer"
    aria-label={portal.title + ', opens external project in a new tab'}>
    <div className="portal-header"><span className="micro-label">{portal.eyebrow}</span><span className="portal-number">/{portal.number}</span></div>
    <PortalArt type={portal.art} />
    <div className="portal-content">
      <h3>{portal.title}</h3>
      <p>{portal.description}</p>
      <div className="portal-footer"><span>{portal.cta}</span><Arrow diagonal /></div>
    </div>
    <span className="portal-meta">{portal.meta}</span>
  </a>
}

function Explore() {
  const [active, setActive] = useState('all')
  const items = useMemo(() => active === 'all'
    ? portals : portals.filter((portal) => portal.category === active), [active])
  return <section className="explore-section section-pad" id="explore">
    <div className="container">
      <div className="section-topline"><span className="micro-label">001 / THE OPEN CONSTELLATION</span><span className="section-reference">INFINITE POSSIBILITIES / FINITE BROWSER TABS</span></div>
      <div className="section-heading">
        <div><h2>Pick a doorway.<br /><em>Find a universe.</em></h2></div>
        <p>From interactive worlds to sovereign systems and reproducible research. Each doorway opens an existing public project. Not everything is finished. That's half the adventure.</p>
      </div>
      <div className="portal-toolbar">
        <div className="filter-list" role="group" aria-label="Filter projects">
          {filters.map((item) => <button type="button" key={item.id}
            onClick={() => setActive(item.id)} aria-pressed={active === item.id}
            className={'filter-button' + (active === item.id ? ' active' : '')}>
            {item.title}
          </button>)}
        </div>
        <div className="portal-count">{String(items.length).padStart(2, '0')} VISIBLE / {String(portals.length).padStart(2, '0')} TOTAL</div>
      </div>
      <div className="portal-grid">
        {items.map((portal) => <PortalCard portal={portal} key={portal.id} />)}
      </div>
      <div className="explore-postscript"><span className="asterisk">✳</span><p>These are curated public entry points, not an exhaustive directory. Each project has its own maturity, source, and permissions.</p>
        <a href={links.atlas} target="_blank" rel="noopener noreferrer">SEE THE WIDER ATLAS <Arrow diagonal /></a>
      </div>
    </div>
  </section>
}

function Systems() {
  return <section className="systems-section section-pad" id="systems">
    <div className="container systems-layout">
      <div className="systems-left">
        <div className="micro-label">002 / SOVEREIGN BY DESIGN</div>
        <h2>Built to<br /><em>belong</em><br />to the field.</h2>
        <p>We build with a simple instinct: tools should extend what people can imagine and make, without quietly stealing control from them.</p>
        <a className="text-link" href={links.phios} target="_blank" rel="noopener noreferrer">EXPLORE THE ΦOS SOURCE <Arrow diagonal /></a>
      </div>
      <div className="systems-right">
        <div className="system-diagram">
          <div className="diagram-header"><span>Φ-SYSTEMS / OPEN PROTOTYPES</span><span>TOPOLOGY / 01</span></div>
          <div className="system-outer">
            <div className="system-circle circle-one" /><div className="system-circle circle-two" />
            <div className="system-core"><span>Φ</span><small>CREATOR AT CENTER</small></div>
            <div className="satellite sat-one">AGENTS</div><div className="satellite sat-two">TOOLS</div>
            <div className="satellite sat-three">MEMORY</div><div className="satellite sat-four">WORLDS</div>
          </div>
          <div className="diagram-footer"><span>COMPOSABLE / NOT CENTRALIZED</span><span className="diagram-live">● IN DEVELOPMENT</span></div>
        </div>
      </div>
    </div>
  </section>
}

function Commons() {
  return <section className="commons-section section-pad" id="commons">
    <div className="container">
      <div className="section-topline"><span className="micro-label">003 / INTEROPERABILITY WITHOUT OWNERSHIP</span><span className="section-reference">Ξ-FIELD / Φ-FIELD</span></div>
      <div className="commons-layout">
        <div className="commons-copy">
          <h2>Two fields.<br /><em>One commons.</em></h2>
          <p>Ξ and Φ can meet without becoming the same house. The Commons Gateway is a public, evidence-first place to explore protocols, operator controls, and potential collaboration.</p>
          <p>It does <strong>not</strong> claim joint operation, active Xi credentials, an authenticated live connection, or permission to use another team's infrastructure.</p>
          <a className="button button-primary" href={links.commons} target="_blank" rel="noopener noreferrer">VISIT PUBLIC COMMONS <Arrow diagonal /></a>
        </div>
        <div className="commons-topology" aria-label="Illustration: independent Xi and Phi houses connected through a public proposal gateway, not a live link">
          <div className="topology-line" />
          <div className="topology-house xi-house"><span className="house-index">HOUSE / 01</span><strong>Ξ</strong><span>INDEPENDENT XI SIDE</span></div>
          <div className="topology-junction"><span>⇄</span><small>PUBLIC<br />GATEWAY</small></div>
          <div className="topology-house phi-house"><span className="house-index">HOUSE / 02</span><strong>Φ</strong><span>THIS FIELD</span></div>
          <div className="topology-status"><span className="status-amber">● STATIC GATEWAY</span><span>LIVE CROSSING / NOT VERIFIED</span></div>
        </div>
      </div>
    </div>
  </section>
}

function Principles() {
  return <section className="principles-section section-pad" id="principles">
    <div className="container">
      <div className="section-topline"><span className="micro-label">004 / THE RULES WE KEEP</span><span className="section-reference">SOURCE ABOVE STORY</span></div>
      <div className="section-heading principles-intro">
        <h2>Imagination needs<br /><em>an honest ledger.</em></h2>
        <p>Big ambitions are useful. So are clear boundaries. These principles keep our experiments grounded as the ecosystem grows.</p>
      </div>
      <div className="principles-grid">
        {principles.map((item) => <article className="principle-card" key={item.index}>
          <span className="principle-index">/{item.index}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>)}
      </div>
    </div>
  </section>
}

function ResearchStrip() {
  return <section className="research-strip" id="research">
    <div className="container research-inner">
      <div className="research-mark" aria-hidden="true">∴</div>
      <div><div className="micro-label">PAPERS, REPRODUCIBLE EXPERIMENTS & OPEN QUESTIONS</div>
        <h2>Follow the evidence.<br /><em>Question everything else.</em></h2>
        <p>The Φ369 Research Lab keeps publications and experimental work visible, with space for uncertainty as well as discovery.</p>
      </div>
      <a href={links.zenodo} target="_blank" rel="noopener noreferrer" className="button button-outline">OPEN RESEARCH ARCHIVE <Arrow diagonal /></a>
    </div>
  </section>
}

function Footer() {
  return <footer className="footer">
    <div className="container">
      <div className="footer-upper">
        <div><Brand subtle /><p>Build something strange.<br />Make it real. Keep it open.</p></div>
        <div className="footer-links">
          <div><span>EXPLORE</span><a href="#explore">Portals</a><a href="#commons">The Commons</a><a href="#principles">Principles</a></div>
          <div><span>CONNECT</span><a href={links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href={links.parent} target="_blank" rel="noopener noreferrer">Enter the Field ↗</a>
            <a href={links.zenodo} target="_blank" rel="noopener noreferrer">Research ↗</a></div>
        </div>
      </div>
      <div className="footer-rule" />
      <div className="footer-lower">
        <span>© {new Date().getFullYear()} Φ-FIELD / LEDGER ABOVE EGO</span>
        <span>INDEPENDENT Φ-SIDE PROJECT · LINKS ≠ AUTHORITY</span>
        <a href="#top">BACK TO TOP ↑</a>
      </div>
    </div>
  </footer>
}

export default function App() {
  return <>
    <a className="skip-link" href="#explore">Skip to projects</a>
    <SiteHeader />
    <main>
      <Hero />
      <div className="interlude" aria-hidden="true"><span>Φ</span><span>EXPLORE / CREATE / CONNECT / VERIFY</span><span>369</span></div>
      <Explore />
      <Systems />
      <Commons />
      <Principles />
      <ResearchStrip />
    </main>
    <Footer />
  </>
}
