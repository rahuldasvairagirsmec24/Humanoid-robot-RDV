import { useMemo, useState } from 'react'
import {
  Activity, ArrowDownRight, ArrowUpRight, Atom, BarChart3, BookOpen,
  ChevronRight, CircleDot, Cpu, Footprints, Gauge, Github, Menu, Radio,
  ShieldCheck, Waves, X, Zap
} from 'lucide-react'
import {
  Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis
} from 'recharts'

const gaitData = Array.from({ length: 31 }, (_, i) => {
  const t = i * 0.1
  return {
    time: t.toFixed(1),
    com: 0.48 + 0.055 * Math.sin(i * 0.42),
    zmp: 0.46 + 0.035 * Math.sin(i * 0.42 + 0.8),
    pitch: 1.1 * Math.sin(i * 0.34) + 0.15 * Math.cos(i * 0.7),
  }
})

const pressureData = Array.from({ length: 21 }, (_, i) => ({
  time: (i * 0.1).toFixed(1),
  heel: Math.max(0, 34 * Math.sin(i * 0.29 + 0.4)),
  midfoot: Math.max(0, 22 * Math.sin(i * 0.29 - 0.8)),
  forefoot: Math.max(0, 39 * Math.sin(i * 0.29 - 1.7)),
}))

const sections = [
  ['Overview', 'overview'],
  ['Research', 'research'],
  ['Robot Design', 'robot'],
  ['Dashboard', 'dashboard'],
  ['Publications', 'publications'],
]

function SectionTitle({ eyebrow, title, text }) {
  return <div className="section-title"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>
}

function Metric({ label, value, unit, note, icon: Icon }) {
  return <div className="metric-card"><div className="metric-top"><span>{label}</span><Icon size={17} /></div><div className="metric-value">{value}<small>{unit}</small></div><div className="metric-note">{note}</div></div>
}

function Dashboard() {
  const [range, setRange] = useState('10 s')
  const [mode, setMode] = useState('Simulation')
  const displayed = useMemo(() => gaitData, [range])
  return (
    <section id="dashboard" className="section dashboard-section">
      <div className="section-heading-row">
        <SectionTitle eyebrow="LIVE LAB / DASHBOARD" title="Locomotion monitoring" text="A research-oriented view of gait, balance and foot-contact signals. Current values are illustrative demo data." />
        <div className="demo-pill"><span /> DEMO DATA ONLY</div>
      </div>
      <div className="dashboard-shell">
        <div className="dash-toolbar">
          <div className="dash-device"><div className="device-icon"><Activity size={18}/></div><div><b>RDV Robo / v2</b><span>Humanoid research platform</span></div></div>
          <div className="dash-controls">
            <select value={mode} onChange={e => setMode(e.target.value)} aria-label="Operating mode"><option>Simulation</option><option>Offline replay</option></select>
            <select value={range} onChange={e => setRange(e.target.value)} aria-label="Time range"><option>10 s</option><option>5 s</option><option>3 s</option></select>
            <span className="status-chip"><span/> {mode}</span>
          </div>
        </div>
        <div className="metrics-grid">
          <Metric label="Robot mass" value="5.86" unit="kg" note="Project reference specification" icon={Gauge}/>
          <Metric label="Degrees of freedom" value="14" unit="DOF" note="Model configuration reference" icon={Cpu}/>
          <Metric label="Simulation step" value="1" unit="ms" note="Reference model time step" icon={Zap}/>
          <Metric label="Gait phase" value="0.64" unit="" note="Illustrative normalized phase" icon={Footprints}/>
        </div>
        <div className="chart-grid">
          <div className="chart-card chart-wide">
            <div className="chart-heading"><div><b>COM / ZMP tracking</b><span>Illustrative normalized trajectory</span></div><div className="legend"><i className="legend-com"/> COM <i className="legend-zmp"/> ZMP</div></div>
            <div className="chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={displayed}><CartesianGrid strokeDasharray="3 5" stroke="#202b3c"/><XAxis dataKey="time" tick={{ fill:'#8290a4', fontSize:11 }} tickLine={false} axisLine={false}/><YAxis domain={[0.35,0.6]} tick={{ fill:'#8290a4', fontSize:11 }} tickLine={false} axisLine={false}/><Tooltip contentStyle={{background:'#111b2a',border:'1px solid #29364a',borderRadius:10,color:'#e8eef8'}}/><Line type="monotone" dataKey="com" name="COM" stroke="#6ee7b7" strokeWidth={2.4} dot={false}/><Line type="monotone" dataKey="zmp" name="ZMP" stroke="#73a7ff" strokeWidth={2.4} dot={false}/></LineChart></ResponsiveContainer></div>
          </div>
          <div className="chart-card">
            <div className="chart-heading"><div><b>Body pitch</b><span>Illustrative orientation signal</span></div><span className="chart-unit">degrees</span></div>
            <div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={displayed}><CartesianGrid strokeDasharray="3 5" stroke="#202b3c"/><XAxis dataKey="time" tick={{fill:'#8290a4',fontSize:10}} tickLine={false} axisLine={false}/><YAxis tick={{fill:'#8290a4',fontSize:10}} tickLine={false} axisLine={false}/><Tooltip contentStyle={{background:'#111b2a',border:'1px solid #29364a',borderRadius:10}}/><Area type="monotone" dataKey="pitch" stroke="#c49bff" fill="#8b5cf6" fillOpacity={0.14} strokeWidth={2}/></AreaChart></ResponsiveContainer></div>
          </div>
          <div className="chart-card">
            <div className="chart-heading"><div><b>Foot pressure distribution</b><span>Illustrative segmented-foot signals</span></div><span className="chart-unit">a.u.</span></div>
            <div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={pressureData}><CartesianGrid strokeDasharray="3 5" stroke="#202b3c"/><XAxis dataKey="time" tick={{fill:'#8290a4',fontSize:10}} tickLine={false} axisLine={false}/><YAxis tick={{fill:'#8290a4',fontSize:10}} tickLine={false} axisLine={false}/><Tooltip contentStyle={{background:'#111b2a',border:'1px solid #29364a',borderRadius:10}}/><Area type="monotone" dataKey="heel" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25}/><Area type="monotone" dataKey="midfoot" stackId="1" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.25}/><Area type="monotone" dataKey="forefoot" stackId="1" stroke="#34d399" fill="#34d399" fillOpacity={0.25}/></AreaChart></ResponsiveContainer></div>
            <div className="legend pressure-legend"><i className="legend-heel"/> Heel <i className="legend-mid"/> Midfoot <i className="legend-fore"/> Forefoot</div>
          </div>
        </div>
        <div className="dash-footnote"><ShieldCheck size={15}/> These values are sample data for interface demonstration. No physical robot or live ROS 2 topic is connected.</div>
      </div>
    </section>
  )
}

function App() {
  const [active, setActive] = useState('overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const go = id => { setActive(id); setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }) }
  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#overview" onClick={() => setActive('overview')}><div className="brand-mark">RDV<span>.</span></div><div className="brand-name">HUMANOID <small>RESEARCH PLATFORM</small></div></a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>{sections.map(([label,id]) => <button key={id} className={active===id?'nav-link active':'nav-link'} onClick={() => go(id)}>{label}</button>)}</nav>
        <a className="github-link" href="https://github.com/rahuldasvairagirsmec24/Humanoid-robot-RDV" target="_blank" rel="noreferrer"><Github size={16}/> Repository <ChevronRight size={14}/></a>
      </header>

      <main>
        <section id="overview" className="hero">
          <div className="hero-grid"/>
          <div className="hero-content">
            <div className="hero-kicker"><span className="pulse"/> HUMANOID LOCOMOTION · AI · ROBOTICS</div>
            <h1>Engineering the next<br/><em>step in humanoid</em><br/>locomotion.</h1>
            <p className="hero-copy">A research platform for AI-based gait analysis, adaptive foot mechanics and balance-aware control in lightweight humanoid robots.</p>
            <div className="hero-actions"><button className="primary-btn" onClick={() => go('research')}>Explore research <ArrowUpRight size={17}/></button><button className="secondary-btn" onClick={() => go('dashboard')}>Open dashboard <BarChart3 size={17}/></button></div>
            <div className="hero-meta"><span><i/> RESEARCH PROJECT</span><span>RDV ROBO / V2</span><span>MECHANICAL ENGINEERING</span></div>
          </div>
          <div className="hero-visual">
            <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
            <div className="robot-stage">
              <div className="robot-head"><div className="robot-face"><i/><i/></div></div>
              <div className="robot-neck"/>
              <div className="robot-torso"><div className="torso-core"/><div className="torso-line"/></div>
              <div className="robot-shoulder left"/><div className="robot-shoulder right"/>
              <div className="robot-arm left"><div/><div/></div><div className="robot-arm right"><div/><div/></div>
              <div className="robot-hip"/><div className="robot-leg left"><div className="joint"/><div className="shin"/><div className="foot"/></div><div className="robot-leg right"><div className="joint"/><div className="shin"/><div className="foot"/></div>
              <div className="robot-shadow"/>
            </div>
            <div className="visual-label label-top"><span>01 / PLATFORM</span><b>Lightweight humanoid</b></div>
            <div className="visual-label label-bottom"><span>02 / FOCUS</span><b>Adaptive foot · gait stability</b></div>
            <div className="visual-cross cross-a">+</div><div className="visual-cross cross-b">+</div>
          </div>
          <div className="hero-bottom"><span>01 — RESEARCH OVERVIEW</span><span>SCROLL TO EXPLORE ↓</span><span>EST. RDV RESEARCH</span></div>
        </section>

        <section className="stats-strip">
          <div><strong>5.86 <small>kg</small></strong><span>Reference robot mass</span></div><div><strong>14</strong><span>Model DOF reference</span></div><div><strong>3</strong><span>Segment adaptive foot</span></div><div><strong>AI + CONTROL</strong><span>Research direction</span></div>
        </section>

        <section id="research" className="section">
          <SectionTitle eyebrow="01 / RESEARCH DIRECTION" title="From gait understanding to robust walking" text="The platform brings together mechanical design, biomechanical analysis and intelligent control to study stable humanoid locomotion."/>
          <div className="research-grid">
            <article className="research-card featured"><div className="card-number">01</div><div className="research-icon"><Activity/></div><h3>AI-based gait analysis</h3><p>Study lower-limb motion, gait phases and locomotion patterns using sensor-informed and learning-based methods.</p><span className="tag">GAIT INTELLIGENCE</span></article>
            <article className="research-card"><div className="card-number">02</div><div className="research-icon"><Footprints/></div><h3>Adaptive segmented foot</h3><p>Investigate passive heel, midfoot and forefoot compliance for improved contact adaptation during walking.</p><span className="tag">FOOT MECHANICS</span></article>
            <article className="research-card"><div className="card-number">03</div><div className="research-icon"><Atom/></div><h3>Balance-aware control</h3><p>Explore COM, ZMP and VHIP-informed stabilization strategies for dynamic bipedal locomotion.</p><span className="tag">LOCOMOTION CONTROL</span></article>
          </div>
        </section>

        <section id="robot" className="section robot-section">
          <div className="robot-info">
            <SectionTitle eyebrow="02 / ROBOT PLATFORM" title="RDV Robo / v2" text="A lightweight humanoid research platform intended for simulation-led development and progressive hardware validation."/>
            <div className="spec-list"><div><span>Reference mass</span><b>5.86 kg</b></div><div><span>Model configuration</span><b>14 DOF</b></div><div><span>Simulation environment</span><b>MuJoCo / Gazebo</b></div><div><span>Middleware</span><b>ROS 2 Humble</b></div><div><span>Foot concept</span><b>3-segment passive compliance</b></div></div>
            <p className="small-note">Specifications shown here are project reference values and should be updated if the final hardware configuration changes.</p>
          </div>
          <div className="foot-panel"><div className="foot-panel-head"><span className="eyebrow">MECHANICAL CONCEPT</span><span className="panel-index">FIG. 01</span></div><h3>Segmented plantar interface</h3><p>Three compliant regions designed to study load transfer and ground contact across the gait cycle.</p><div className="foot-diagram"><div className="foot-shape"><div className="foot-seg heel"><span>01</span></div><div className="foot-seg mid"><span>02</span></div><div className="foot-seg fore"><span>03</span></div><div className="foot-toe"/></div><div className="foot-labels"><span><i className="heel-dot"/> HEEL</span><span><i className="mid-dot"/> MIDFOOT</span><span><i className="fore-dot"/> FOREFOOT</span></div></div><div className="foot-caption">CONCEPTUAL DIAGRAM · NOT A MANUFACTURING DRAWING</div></div>
        </section>

        <Dashboard/>

        <section id="publications" className="section publications-section">
          <SectionTitle eyebrow="04 / KNOWLEDGE & OUTPUT" title="Research publications" text="A dedicated space for manuscripts, conference papers, datasets and validated experimental results."/>
          <div className="publication-placeholder"><div className="pub-icon"><BookOpen/></div><div><b>Publication library is being prepared</b><p>Peer-reviewed papers and accepted manuscripts will be listed here with DOI and publisher links when available.</p></div><span className="tag">COMING SOON</span></div>
          <div className="closing-banner"><div><span className="eyebrow">RDV HUMANOID RESEARCH</span><h2>Building a bridge between<br/>simulation and reality.</h2></div><button className="secondary-btn" onClick={() => go('dashboard')}>Explore the dashboard <ArrowUpRight size={16}/></button></div>
        </section>
      </main>
      <footer className="footer"><a className="brand" href="#overview"><div className="brand-mark">RDV<span>.</span></div><div className="brand-name">HUMANOID <small>RESEARCH PLATFORM</small></div></a><span>Research platform · Humanoid locomotion</span><a href="https://github.com/rahuldasvairagirsmec24/Humanoid-robot-RDV" target="_blank" rel="noreferrer">GitHub repository <ArrowUpRight size={13}/></a></footer>
    </div>
  )
}

export default App
