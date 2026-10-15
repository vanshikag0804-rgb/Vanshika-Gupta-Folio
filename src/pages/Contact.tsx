import { Check, ChevronDown } from 'lucide-react'
import { useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { Button } from '../components/Button'
import { Footer } from '../components/Closing'
import { Navbar } from '../components/Navbar'
import { Reveal } from '../components/Reveal'
import { profile } from '../data'
import { useScrollTo } from '../lib/lenis'

const appear = (ms: number) => ({ '--appear-delay': `${ms}ms` }) as CSSProperties
const stagger = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

type Fields = { name: string; email: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

function validate({ name, email, message }: Fields): Errors {
  const errors: Errors = {}
  if (!name.trim()) errors.name = 'Please add your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Please add a valid email address.'
  if (message.trim().length < 10) errors.message = 'A few more words would help.'
  return errors
}

/** Placeholder-style field: the label is visually hidden but still read by screen readers. */
function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {children}
      <p id={`${id}-error`} className={`overflow-hidden px-1 text-left text-sm text-rose-300 transition-all duration-300 ${error ? 'mt-2 max-h-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        {error}
      </p>
    </div>
  )
}

const inputClass = (invalid: boolean) =>
  `w-full rounded-2xl bg-white px-5 py-4 text-[17px] text-ink placeholder:text-ink/80 outline-none transition-all duration-300 focus:ring-4 ${
    invalid ? 'ring-2 ring-rose-400 focus:ring-rose-400/40' : 'focus:ring-white/25'
  }`

function MessageForm() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const update = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length) return

    // No backend yet: hand the message to the visitor's email client.
    // To send from the page instead, post `fields` to a form service here.
    const subject = encodeURIComponent(`Hello from ${fields.name}`)
    const body = encodeURIComponent(`${fields.message}\n\n— ${fields.name} (${fields.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl bg-white/[0.05] px-6 py-12 text-center">
        <span className="appear flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink">
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-medium tracking-[-0.03em]">Your email is ready to send</h3>
        <p className="mt-2 max-w-sm text-white/60">Your mail app should have opened with the message filled in. If it didn't, write to me directly.</p>
        <a href={`mailto:${profile.email}`} className="mt-5 text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white">
          {profile.email}
        </a>
        <button
          onClick={() => {
            setSent(false)
            setFields({ name: '', email: '', message: '' })
          }}
          className="mt-8 text-sm text-white/50 transition-colors hover:text-white"
        >
          Write another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Reveal delay={0}>
          <Field id="contact-name" label="Name" error={errors.name}>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder="Name"
              value={fields.name}
              onChange={update('name')}
              aria-invalid={!!errors.name}
              aria-describedby="contact-name-error"
              className={inputClass(!!errors.name)}
            />
          </Field>
        </Reveal>
        <Reveal delay={80}>
          <Field id="contact-email" label="Email" error={errors.email}>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={fields.email}
              onChange={update('email')}
              aria-invalid={!!errors.email}
              aria-describedby="contact-email-error"
              className={inputClass(!!errors.email)}
            />
          </Field>
        </Reveal>
      </div>
      <Reveal delay={160}>
        <Field id="contact-message" label="Message" error={errors.message}>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder="Message"
            value={fields.message}
            onChange={update('message')}
            aria-invalid={!!errors.message}
            aria-describedby="contact-message-error"
            data-lenis-prevent
            className={`${inputClass(!!errors.message)} min-h-[200px] resize-y`}
          />
        </Field>
      </Reveal>
      <Reveal delay={240}>
        <button
          type="submit"
          className="w-full rounded-2xl bg-[#1c1c1e] py-4 text-[17px] font-semibold text-white transition-all duration-300 hover:bg-[#2a2a2d] active:scale-[0.99]"
        >
          Send
        </button>
      </Reveal>
    </form>
  )
}

export default function Contact() {
  const scrollTo = useScrollTo()

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-night text-white">
        {/* Soft blue glow that spans the hero and fades out behind the form */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[1100px]"
          style={{ background: 'radial-gradient(42% 50% at 50% 30%, rgba(20,54,72,0.6) 0%, rgba(13,13,13,0) 78%)' }}
        />

        {/* Hero */}
        <section className="relative px-4 pb-24 pt-40 text-center sm:pb-32 sm:pt-44">
          <div className="mx-auto max-w-2xl">
            <h1 className="appear font-display text-[clamp(3rem,8vw,5.5rem)] font-medium leading-none tracking-[-0.04em]" style={appear(0)}>
              Let's Connect.
            </h1>
            <p className="appear mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl" style={appear(120)}>
              Whether you need a hands-on design lead for a few months, a sounding board for your product strategy, or fresh eyes on a stubborn problem, I'd be glad to talk.
            </p>
            <div className="appear mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8" style={appear(240)}>
              <Button href={profile.linkedin} variant="solid-light" size="lg" className="w-full px-8 py-4 sm:w-auto">
                Connect on LinkedIn
              </Button>
              <Button href="#message" size="lg" className="w-full px-10 py-4 sm:w-auto">
                Send a Message
              </Button>
            </div>
            <Reveal variant="flip" delay={400} className="mt-12">
              <button
                onClick={() => scrollTo('#message')}
                aria-label="Scroll to the message form"
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] text-white/70 transition-colors hover:bg-white/15 hover:text-white"
              >
                <ChevronDown className="h-6 w-6 animate-nudge" />
              </button>
            </Reveal>
          </div>
        </section>

        {/* Message */}
        <section id="message" className="relative scroll-mt-20 px-4 pb-28 pt-8 text-center sm:pb-36 sm:pt-16">
          <div className="mx-auto max-w-[660px]">
            <Reveal>
              <h2 className="font-display text-[clamp(2.4rem,5.5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.045em]">Send a Message.</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-white/70">
                Tell me a little about your team and what you're working on. I usually reply within two working days.
              </p>
            </Reveal>
            <div className="mt-12">
              <MessageForm />
            </div>
          </div>
        </section>

        {/* What I Bring */}
        <section className="relative px-4 pb-24 sm:px-6">
          <Reveal variant="tilt" className="mx-auto max-w-[1270px]">
            <div className="grid items-center gap-8 rounded-[18px] bg-white/[0.05] p-5 sm:p-8 md:grid-cols-[1fr_1.2fr] md:gap-12">
              <div className="rise overflow-hidden rounded-xl" style={stagger(150)}>
                <img
                  src="/images/bring.webp"
                  alt="Case study page preview"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                />
              </div>
              <div className="pb-4 md:pb-0">
                <h2 className="rise font-display text-[clamp(2.4rem,5vw,3.75rem)] font-medium tracking-[-0.045em]" style={stagger(250)}>
                  What I Bring.
                </h2>
                <p className="rise mt-3 text-lg text-white/70 sm:text-xl" style={stagger(350)}>
                  See how my experience and way of working fit what your team needs.
                </p>
                <div className="rise mt-9 flex flex-wrap gap-4 sm:gap-6" style={stagger(450)}>
                  <Button href="/#expertise" variant="solid-light" size="lg" className="px-7 py-4 text-lg">
                    How I Work
                  </Button>
                  <Button href="/work/northwind" size="lg" className="px-7 py-4 text-lg">
                    View Case Study
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  )
}
