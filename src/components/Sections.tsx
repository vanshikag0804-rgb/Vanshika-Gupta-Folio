import { useState } from 'react'
import { expertise, expertiseHeading, featured, roles, rolesHeading } from '../data'
import { useParallax } from '../hooks/useParallax'
import { Reveal } from './Reveal'
import { TwoTone } from './TwoTone'
import { Wordmark } from './Wordmark'

const headingSize = 'text-[clamp(1.9rem,4.2vw,2.75rem)] leading-[1.12]'

export function RolesSection() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? roles : roles.slice(0, 2)

  return (
    <section id="roles" className="bg-gradient-to-b from-[#0e1a22] to-[#0d0d0d] py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <TwoTone tone="dark" segments={rolesHeading} className={`max-w-[22ch] ${headingSize}`} />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {visible.map((role, i) => (
            <Reveal key={role.brand.name} delay={(i % 2) * 100}>
              <article className="group h-full rounded-[18px] bg-white/5 p-6 ring-1 ring-white/5 transition-all duration-500 hover:bg-white/[0.08] hover:ring-white/15 sm:p-7">
                <Wordmark brand={role.brand} color="#ffffff" className="text-2xl opacity-85 transition-opacity group-hover:opacity-100" />
                <p className="mt-6 font-medium text-white">{role.title}</p>
                <p className="mt-1 text-sm text-white/45">{role.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="rounded-full border border-white/70 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.03] hover:bg-white hover:text-ink"
          >
            {expanded ? 'Fewer Roles' : 'More Roles'}
          </button>
        </Reveal>
      </div>
    </section>
  )
}

export function ExpertiseSection() {
  return (
    <section id="expertise" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <TwoTone segments={expertiseHeading} className={`max-w-[20ch] ${headingSize}`} />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 100}>
              <article className="h-full rounded-[18px] bg-cloud p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)] sm:p-7">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-mute">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturedSection() {
  const deviceRef = useParallax<HTMLDivElement>(0.08)

  return (
    <section className="relative overflow-hidden bg-night py-20 text-white sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_20%_10%,rgba(30,60,80,0.35),transparent)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Reveal>
            <TwoTone tone="dark" segments={featured.heading} className={`max-w-[20ch] ${headingSize}`} />
          </Reveal>
          <Reveal delay={100}>
            <Wordmark brand={featured.brand} color="#ffffff" className="mt-12 text-3xl" />
            <h3 className="mt-8 text-xl font-medium">{featured.role}</h3>
            <p className="mt-3 max-w-lg leading-relaxed text-white/65">{featured.body}</p>
          </Reveal>
          <Reveal delay={200}>
            <ul className="mt-10 flex max-w-lg flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/55">
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal variant="device" className="lg:-mr-[22vw]">
          <div ref={deviceRef}>
            <img src="/images/featured.webp" alt="Invoicing web app shown on a tablet" loading="lazy" className="w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
