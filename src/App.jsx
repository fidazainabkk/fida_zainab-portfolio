import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { ArrowDown, ArrowUp, Download, ExternalLink, Menu, Monitor, Moon, Sun, X } from 'lucide-react'
import { BASE, education, experience, filters, marquee, projects } from './data'
import Skills from './Skills'
import Contact from './Contact'

const CV = BASE + 'Fida-Zainab-CV.pdf'
const LINKS = [['about', 'About'], ['skills', 'Skills'], ['experience', 'Experience'], ['projects', 'Projects'], ['resume', 'Resume'], ['education', 'Education']]
const btn = 'inline-flex items-center gap-2 rounded-full border-2 border-ink px-7 py-3 font-semibold transition hover:-translate-y-0.5'

/* ---------- theme: system / light / dark ---------- */
const MODES = ['system', 'light', 'dark']
const ICONS = { system: Monitor, light: Sun, dark: Moon }
function applyTheme(mode) {
  const dark = mode === 'dark' || (mode === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
}
function ThemeToggle() {
  const [mode, setMode] = useState(() => { try { return localStorage.getItem('theme') || 'system' } catch { return 'system' } })
  useEffect(() => {
    applyTheme(mode)
    try { localStorage.setItem('theme', mode) } catch {}
    if (mode !== 'system') return
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const fn = () => applyTheme('system')
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [mode])
  const next = MODES[(MODES.indexOf(mode) + 1) % 3]
  const Icon = ICONS[mode]
  return (
    <button onClick={() => setMode(next)} title={`Theme: ${mode}`} aria-label={`Theme: ${mode}. Switch to ${next}`}
      className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink transition hover:bg-ink hover:text-paper">
      <Icon size={18} aria-hidden="true" />
    </button>
  )
}

/* ---------- navigation ---------- */
function Nav() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setCurrent(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    ;[...LINKS.map(([id]) => id), 'contact'].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  const link = (id) => `font-medium transition hover:text-ink ${current === id ? 'text-ink underline underline-offset-8' : 'text-muted'}`
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-10">
        <a href="#top" className="font-display text-base font-extrabold sm:text-xl">Fida Zainab Karekadavath</a>
        <div className="flex items-center gap-3">
          <nav aria-label="Main" className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col gap-4 border-b border-line bg-paper px-5 py-5 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:p-0`}>
            {LINKS.map(([id, label]) => (
              <a key={id} href={'#' + id} onClick={() => setOpen(false)} aria-current={current === id ? 'true' : undefined} className={link(id)}>{label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="w-fit rounded-full bg-ink px-5 py-1.5 font-medium text-paper">Contact</a>
          </nav>
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink md:hidden">
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  )
}

/* ---------- layout helper ---------- */
function Section({ id, title, note, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
      <div className="mb-8 flex items-center gap-5">
        <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">{title}</h2>
        <motion.span aria-hidden="true" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: 'easeOut' }}
          className="hidden h-0.5 flex-1 origin-left bg-ink md:block" />
      </div>
      {note && <p className="-mt-4 mb-6 text-muted">{note}</p>}
      {children}
    </section>
  )
}

/* ---------- hero ---------- */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }
const rise = { hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] } } }
const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

function Hero() {
  return (
    <>
      <motion.section id="top" variants={stagger} initial="hidden" animate="show"
        className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-8 px-5 py-12 md:px-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
        <motion.p variants={fade} className="mb-2 text-lg font-semibold text-muted md:text-xl">Hi, I'm a</motion.p>
        <h1 className="mb-8 font-display text-[clamp(3.2rem,9vw,8rem)] font-extrabold leading-[0.9] tracking-tighter">
          {['Software', 'Engineer'].map((w) => (
            <span key={w} className="block overflow-hidden pb-[0.08em]"><motion.span variants={rise} className="block">{w}</motion.span></span>
          ))}
        </h1>
        <motion.p variants={fade} className="max-w-xl text-lg text-muted">
I’m Fida Zainab Karekadavath — a Tech Professional with a background in Computer Science, full-stack web development, and manual QA testing. Eager to leverage my technical problem-solving skills across Software Engineering, QA, and IT Support roles. Highly adaptable and quick to master new frameworks, tools, and workflows to deliver reliable IT solutions. Based in Dubai, United Arab Emirates.        </motion.p>
        <motion.div variants={fade} className="mt-8 flex flex-wrap gap-3">
          <a href="#about" className={`${btn} bg-ink text-paper`}>Explore <ArrowDown size={18} aria-hidden="true" /></a>
          <a href={CV} download className={btn}><Download size={18} aria-hidden="true" />Download CV</a>
        </motion.div>
        </div>
        <HeroArt />
      </motion.section>
      <div className="marquee overflow-hidden border-y border-line py-4" aria-label="Technologies I work with">
        <div className="marquee-track" aria-hidden="true">
          {[...marquee, ...marquee].map((t, i) => <span key={i} className="px-7 font-display text-xl font-bold text-muted">{t}</span>)}
        </div>
      </div>
    </>
  )
}


/* ---------- hero illustration (decorative, theme-aware) ---------- */
const float = (d, delay = 0) => ({ animate: { y: [0, -10, 0] }, transition: { duration: d, repeat: Infinity, ease: 'easeInOut', delay } })
const card = 'absolute overflow-hidden rounded-2xl border-2 border-ink bg-card'
function HeroArt() {
  return (
    <motion.div variants={fade} aria-hidden="true" className="relative mx-auto mt-10 h-[400px] w-full max-w-md lg:mt-0">
      <motion.div {...float(7)} className={`${card} left-0 top-6 w-[86%] shadow-[8px_8px_0_var(--ink)]`}>
        <div className="flex gap-1.5 border-b-2 border-ink px-4 py-2.5">
          {[0, 1, 2].map((i) => <i key={i} className="h-2.5 w-2.5 rounded-full border-2 border-ink" />)}
          <span className="ml-3 font-mono text-xs text-muted">portfolio.js</span>
        </div>
        <pre className="m-0 p-4 font-mono text-[13px] leading-6">
{`const dev = {
  role: "Software Engineer",
  stack: ["HTML5/CSS3","JavaScript","MongoDB", "React", "Node","MS Office","C"],
  tests: "passing",
  support: "System Troubleshooting"
  status : "Available to join immediately",
};`}
        </pre>
      </motion.div>

      <motion.div {...float(6, 1)} className={`${card} right-0 top-0 z-10 w-36 p-3`}>
        <p className="mb-1 font-mono text-xs font-bold">Data</p>
        <svg viewBox="0 0 100 50" className="h-14 w-full" fill="currentColor">
          {[20, 32, 26, 44, 38].map((h, i) => <rect key={i} x={2 + i * 20} y={50 - h} width="14" height={h} rx="2" />)}
        </svg>
      </motion.div>

      <motion.div {...float(8, 2)} className={`${card} bottom-6 right-0 z-10 w-[72%] p-4`}>
        <p className="mb-2 font-mono text-xs font-bold">Test suite</p>
        {['Login flow', 'Seat lock', 'Edge cases'].map((t) => (
          <div key={t} className="flex items-center justify-between py-1 font-mono text-xs">
            <span>{t}</span><span className="rounded border border-ink px-1.5 font-bold">PASS</span>
          </div>
        ))}
      </motion.div>

      <motion.span {...float(5)} className="absolute bottom-8 left-0 grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-paper font-mono text-sm font-bold">&lt;/&gt;</motion.span>
      <motion.span {...float(6, 1.5)} className="absolute right-0 top-44 grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-paper font-mono text-xs font-bold">SQL</motion.span>
    </motion.div>
  )
}

/* ---------- projects ---------- */
function Projects() {
  const [tag, setTag] = useState('All')
  const [open, setOpen] = useState('seat')
  const list = projects.filter((p) => tag === 'All' || p.tags.includes(tag))
  return (
    <Section id="projects" title="Projects" note="Filter by technology, then select a project to read the details.">
      <div role="group" aria-label="Filter projects by technology" className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f} aria-pressed={tag === f} onClick={() => setTag(f)}
            className={`rounded-full border-2 px-4 py-1.5 font-semibold transition ${tag === f ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'}`}>{f}</button>
        ))}
      </div>
      <div className="grid max-w-3xl gap-3">
        <AnimatePresence mode="popLayout">
          {list.length === 0 && <p className="text-muted">No project uses {tag} yet.</p>}
          {list.map((p) => (
            <motion.article key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} whileHover={{ y: -2 }}
              className="rounded-2xl border border-line bg-card">
              <button onClick={() => setOpen(open === p.id ? null : p.id)} aria-expanded={open === p.id} aria-controls={'proj-' + p.id}
                className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4 text-left">
                <span className="flex-1 font-display text-lg font-bold">{p.title}</span>
                <span className="text-sm text-muted">{p.year}</span>
                <span className="rounded-full border border-ink px-3 text-sm font-semibold">{p.stack}</span>
                <span aria-hidden="true" className="font-display text-2xl font-bold">{open === p.id ? '\u2212' : '+'}</span>
              </button>
              <AnimatePresence initial={false}>
                {open === p.id && (
                  <motion.div id={'proj-' + p.id} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="grid gap-3 px-5 pb-5">
                      <p>{p.summary}</p>
                      <ul className="grid list-disc gap-1 pl-5">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
                      <p className="text-sm text-muted">{p.tools}</p>
                      {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-1.5 font-semibold underline underline-offset-4">View on GitHub <ExternalLink size={16} aria-hidden="true" /></a>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  )
}

/* ---------- page ---------- */
export default function App() {
  const { scrollYProgress } = useScroll()
  return (
    <>
      <motion.div aria-hidden="true" style={{ scaleX: scrollYProgress }} className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-ink" />
      <a href="#main" className="absolute -left-[999px] z-50 bg-ink px-4 py-2 text-paper focus:left-4 focus:top-4">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />

        <Section id="about" title="About me">
          <div className="mb-6 flex items-center gap-4">
            <img src={BASE + 'photo.jpg'} alt="Fida Zainab Karekadavath" width="72" height="72" className="h-[72px] w-[72px] rounded-full border-2 border-ink object-cover object-[50%_20%] grayscale" />
            <p className="font-display text-xl font-bold">Fida Zainab Karekadavath<span className="block text-base font-medium text-muted">Dubai, UAE</span></p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-ink bg-paper border-2 border-ink rounded-2xl shadow-[6px_6px_0px_0px_#000] p-6 md:p-8">
            {/* Left Column: Background & Engineering */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-ink/60 font-bold">// Background & Expertise</h3>
              <h2 className="text-xl font-bold tracking-tight">Software Engineer & Tech Professional</h2>
              <p className="text-sm leading-relaxed text-ink/90">
                Graduate in Computer Science and Engineering <span className="font-semibold">(2024, CGPA 8.46/10)</span>, I bring a strong foundation in computer science, full-stack web development backed by a MERN Stack internship and NACTET certification, and hands-on manual QA testing experience, along with analytical training from my Google Data Analytics certification. Currently based in the UAE on a Job Seeking and available to join immediately. I enjoy working across software development, IT support, and related technology roles. Backed by professional training in data analytics, bringing a well-rounded perspective to building reliable systems and tracking insights.
              </p>
            </div>

            {/* Right Column: Availability & Highlights */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-ink/60 font-bold">// Status & Highlights</h3>
              <div className="p-3.5 bg-ink/5 border border-ink/20 rounded-xl">
                <p className="text-xs font-mono font-bold text-ink mb-1">STATUS:</p>
                <p className="text-sm font-semibold text-ink">
                  Based in the UAE • <span className="underline decoration-2">Available to join immediately</span>
                </p>
              </div>
              <ul className="space-y-2 text-sm text-ink/90">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-xs mt-0.5">🔹</span>
                  <span>Full-stack web architecture & strong CS fundamentals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-xs mt-0.5">🔹</span>
                  <span>Manual QA, structured test cases, & bug tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-xs mt-0.5">🔹</span>
                  <span>Data analytics perspective & system troubleshooting</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <Section id="skills" title="Skills"><Skills /></Section>

        <Section id="experience" title="Experience">
          <ol className="grid max-w-3xl gap-10 border-l-2 border-ink pl-6">
            {experience.map((x) => (
              <li key={x.role} className="relative">
                <span aria-hidden="true" className="absolute -left-[33px] top-2 h-3 w-3 rounded-full border-[3px] border-ink bg-paper" />
                <p className="font-semibold text-muted">{x.when}</p>
                <h3 className="font-display text-xl font-bold">{x.role}</h3>
                <p className="mb-2 text-muted">{x.org}</p>
                <ul className="grid list-disc gap-1 pl-5">{x.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </li>
            ))}
          </ol>
        </Section>

        <Projects />

        <Section id="resume" title="Resume" note="Read it here or download the PDF.">
          <div className="mb-5 flex flex-wrap gap-3">
            <a href={CV} download className={`${btn} bg-ink text-paper`}><Download size={18} aria-hidden="true" />Download PDF</a>
            <a href={CV} target="_blank" rel="noopener noreferrer" className={btn}><ExternalLink size={18} aria-hidden="true" />Open in new tab</a>
          </div>
          <object data={CV + '#view=FitH'} type="application/pdf" aria-label="Resume PDF" className="h-[75vh] w-full rounded-xl border border-line">
            <p className="p-6">Your browser can't show the PDF here. <a className="underline" href={CV}>Open it instead</a>.</p>
          </object>
        </Section>

        <Section id="education" title="Education and certificates">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {education.map((e) => (
              <motion.article key={e.title} whileHover={{ y: -4 }} className="rounded-2xl border border-line bg-card p-5">
                <h3 className="font-display text-lg font-bold">{e.title}</h3>
                <p className="text-muted">{e.org}</p>
                <p className="mt-2 font-semibold">{e.meta}</p>
              </motion.article>
            ))}
          </div>
        </Section>

        <div className="border-t border-line">
          <Section id="contact" title="Let's work together" note="Hiring for a developer, tester or junior analyst role? Send me a note and I'll reply soon.">
            <Contact />
          </Section>
        </div>
      </main>
      <footer className="flex items-center justify-between border-t border-line px-5 py-8 text-muted md:px-10">
        <p>&copy; {new Date().getFullYear()} Fida Zainab Karekadavath</p>
        <a href="#top" aria-label="Back to top" title="Back to top" className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink text-ink transition hover:-translate-y-0.5 hover:bg-ink hover:text-paper"><ArrowUp size={18} aria-hidden="true" /></a>
      </footer>
    </>
  )
}
