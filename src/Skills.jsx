import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { skillGroups, places } from './data'

export default function Skills() {
  const [tab, setTab] = useState(0)
  const [active, setActive] = useState(null)
  const dlg = useRef(null)
  const group = skillGroups[tab]

  useEffect(() => {
    const d = dlg.current
    if (active && !d.open) d.showModal()
    if (!active && d.open) d.close()
  }, [active])

  const onKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const n = (tab + (e.key === 'ArrowRight' ? 1 : -1) + skillGroups.length) % skillGroups.length
    setTab(n)
    document.getElementById('tab-' + n)?.focus()
  }

  return (
    <>
      <div role="tablist" aria-label="Skill groups" onKeyDown={onKey} className="mb-6 flex flex-wrap gap-2">
        {skillGroups.map((g, i) => (
          <button key={g.label} id={'tab-' + i} role="tab" aria-selected={tab === i} aria-controls="skill-panel"
            tabIndex={tab === i ? 0 : -1} onClick={() => setTab(i)}
            className={`rounded-full border-2 px-5 py-2 font-semibold transition ${tab === i ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'}`}>
            {g.label}
          </button>
        ))}
      </div>

      <ul id="skill-panel" role="tabpanel" aria-labelledby={'tab-' + tab} className="flex min-h-24 flex-wrap gap-3">
        {group.skills.map(([name, level], i) => (
          <motion.li key={group.label + name} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}>
            <button onClick={() => setActive({ name, level, uses: group.skills[i][2] })} aria-haspopup="dialog"
              className="flex items-center gap-2.5 rounded-xl border border-line bg-card px-4 py-2.5 font-medium transition hover:-translate-y-0.5 hover:border-ink">
              <span aria-hidden="true" className={`h-3 w-3 rounded-full border-2 border-ink ${level ? 'bg-ink' : ''}`} />
              {name}
              <span className="sr-only">({level ? 'comfortable' : 'basics'}). Opens details.</span>
            </button>
          </motion.li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted">Filled dot: comfortable. Hollow dot: basics, still growing. Select a skill to see where I used it.</p>

      <dialog ref={dlg} onClose={() => setActive(null)} onClick={(e) => e.target === e.currentTarget && setActive(null)}
        aria-labelledby="skill-title" className="m-auto w-[min(92vw,30rem)] rounded-2xl border border-line bg-paper p-0 text-ink backdrop:bg-black/60">
        {active && (
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="skill-title" className="font-display text-2xl font-extrabold">{active.name}</h3>
                <p className="text-muted">{active.level ? 'Comfortable' : 'Basics, still growing'}</p>
              </div>
              <button onClick={() => setActive(null)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink hover:bg-ink hover:text-paper"><X size={18} aria-hidden="true" /></button>
            </div>
            <h4 className="mb-3 mt-6 font-semibold">Where I used it</h4>
            {active.uses.length ? (
              <ul className="grid gap-3">
                {active.uses.map((id) => (
                  <li key={id} className="rounded-xl border border-line bg-card p-4">
                    <p className="text-sm text-muted">{places[id].kind}, {places[id].year}</p>
                    <p className="font-semibold">{places[id].title}</p>
                    <p className="text-muted">{places[id].note}</p>
                  </li>
                ))}
              </ul>
            ) : <p className="text-muted">Studied and applied core fundamentals during my B.Tech in Computer Science and Engineering.</p>}
          </div>
        )}
        
      </dialog>
    </>
  )
}
