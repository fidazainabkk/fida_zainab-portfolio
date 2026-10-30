import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send, Mail, ArrowUpRight } from 'lucide-react'
import { EMAIL, WEB3FORMS_KEY } from './data'

const empty = { name: '', email: '', message: '', company: '' }
const validate = (v) => {
  const e = {}
  if (!v.name.trim()) e.name = 'Enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = 'Enter a valid email, like name@example.com.'
  if (v.message.trim().length < 10) e.message = 'Write at least 10 characters.'
  return e
}
const input = 'w-full rounded-lg border-2 border-line bg-card px-4 py-3 focus:border-ink focus:outline-none aria-[invalid=true]:border-ink'

export default function Contact() {
  const [v, setV] = useState(empty)
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 6000)
    return () => clearTimeout(t)
  }, [toast])

  const set = (k) => (e) => setV({ ...v, [k]: e.target.value })

  async function onSubmit(ev) {
    ev.preventDefault()
    if (v.company) return // honeypot
    const errs = validate(v)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) { document.getElementById(first)?.focus(); return }
    setBusy(true)
    try {
      if (WEB3FORMS_KEY) {
        const r = await fetch('https://api.web3forms.com/submit', {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ access_key: WEB3FORMS_KEY, name: v.name, email: v.email, message: v.message, subject: 'Portfolio message from ' + v.name }),
        })
        const out = await r.json()
        if (!out.success) throw new Error(out.message)
        setV(empty)
        setToast({ type: 'ok', text: 'Message sent. Thank you, I will reply soon.' })
      } else {
        const su = encodeURIComponent('Portfolio message from ' + v.name)
        const body = encodeURIComponent(`${v.message}\n\nFrom: ${v.name} (${v.email})`)
        window.open(`https://mail.google.com/mail/?view=cm&to=${EMAIL}&su=${su}&body=${body}`, '_blank', 'noopener')
        setToast({ type: 'ok', text: 'Opening Gmail with your message. Press send there to finish.' })
      }
    } catch {
      setToast({ type: 'error', text: `Could not send. Please email ${EMAIL} directly.` })
    } finally { setBusy(false) }
  }

  const field = (id, label, el, hint) => (
    <div>
      <label htmlFor={id} className="mb-1 block font-semibold">{label}</label>
      {el}
      {errors[id] && <p id={id + '-err'} className="mt-1 text-sm font-medium">{errors[id]}</p>}
    </div>
  )
  const aria = (id) => ({ id, name: id, 'aria-invalid': !!errors[id], 'aria-describedby': errors[id] ? id + '-err' : undefined })

  return (
    <div className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
      <ul className="grid content-start gap-4 font-display text-xl font-bold">
        <li><a className="inline-flex items-center gap-2 underline underline-offset-4" href={`mailto:${EMAIL}`}><Mail size={20} aria-hidden="true" />{EMAIL}</a></li>
        {[['LinkedIn', 'https://linkedin.com/in/fida-zainab-karekadavath'], ['GitHub', 'https://github.com/fidazainabkk'], ['WhatsApp', 'https://wa.me/+971545794058']].map(([n, h]) => (
          <li key={n}><a className="inline-flex items-center gap-2 underline underline-offset-4" href={h} target="_blank" rel="noopener noreferrer">{n}<ArrowUpRight size={20} aria-hidden="true" /></a></li>
        ))}
      </ul>

      <form onSubmit={onSubmit} noValidate className="grid gap-4">
        {field('name', 'Your name', <input {...aria('name')} autoComplete="name" value={v.name} onChange={set('name')} className={input} />)}
        {field('email', 'Your email', <input {...aria('email')} type="email" autoComplete="email" value={v.email} onChange={set('email')} className={input} />)}
        {field('message', 'Message', <textarea {...aria('message')} rows={5} value={v.message} onChange={set('message')} className={input} />)}
        <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.company} onChange={set('company')} className="absolute -left-[9999px]" />
        <button disabled={busy} className="inline-flex items-center gap-2 justify-self-start rounded-full border-2 border-ink bg-ink px-7 py-3 font-semibold text-paper transition hover:-translate-y-0.5 disabled:opacity-50">
          <Send size={18} aria-hidden="true" />{busy ? 'Sending...' : 'Send message'}
        </button>
      </form>

      <AnimatePresence>
        {toast && (
          <motion.div role={toast.type === 'error' ? 'alert' : 'status'} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm rounded-xl bg-ink px-5 py-4 font-medium text-paper shadow-2xl">
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
