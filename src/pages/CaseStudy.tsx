import { ChevronDown } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { caseStudies, type InfoCard } from '../caseStudies'
import { Button } from '../components/Button'
import { Ecosystem, Horizons, MaturityPyramid, StrategyPyramid, TimeSplit, WaysOfWorking } from '../components/case/Diagrams'
import { Footer } from '../components/Closing'
import { Navbar, type SubLink } from '../components/Navbar'
import { Reveal } from '../components/Reveal'
import { Typewriter } from '../components/Typewriter'
import { Wordmark } from '../components/Wordmark'
import { projects } from '../data'
import { useParallax } from '../hooks/useParallax'
import { useScrollTo } from '../lib/lenis'

const subLinks: SubLink[] = [
  { label: 'My role', id: 'role' },
  { label: 'Opportunities', id: 'opportunities' },
  { label: 'Approach', id: 'approach' },
  { label: 'Impact and Outcomes', id: 'impact' },
  { label: 'Glimpse of Outputs', id: 'outputs' },
]

const sectionTitle = 'font-display text-[clamp(2rem,4vw,2.75rem)] font-medium tracking-[-0.04em]'

function Card({ card, tone, className = '' }: { card: InfoCard; tone: 'dark' | 'light'; className?: string }) {
  const Icon = card.icon
  const dark = tone === 'dark'
  return (
    <article
      className={`flex h-full flex-col justify-end rounded-[18px] p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 sm:p-7 ${
        dark ? 'bg-white/[0.06] ring-1 ring-white/5 hover:bg-white/[0.09]' : 'bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.3)]'
      } ${className}`}
    >
      <Icon className={`h-6 w-6 ${dark ? 'text-white/80' : 'text-soft'}`} strokeWidth={1.5} />
      <h3 className={`mt-4 font-display text-2xl font-medium tracking-[-0.03em] sm:text-[1.7rem] ${dark ? 'text-white' : 'text-ink'}`}>{card.title}</h3>
      <p className={`mt-2 leading-relaxed ${dark ? 'text-white/65' : 'text-mute'}`}>{card.body}</p>
    </article>
  )
}

export default function CaseStudy() {
  const { id = '' } = useParams()
  const study = caseStudies[id]
  const project = projects.find((p) => p.id === id)
  const scrollTo = useScrollTo()
  const heroImgRef = useParallax<HTMLDivElement>(0.1, 60)

  if (!study || !project) return <Navigate to="/" replace />
  const next = projects.find((p) => p.id === study.next.id)
  const nextHref = caseStudies[study.next.id] ? `/work/${study.next.id}` : `#${study.next.id}`

  return (
    <>
      <Navbar subLinks={subLinks} />
      <main className="bg-night text-white">
        {/* Hero + role */}
        <section id="role" className="relative overflow-hidden bg-gradient-to-b from-[#0b3a35] via-[#07211f] to-[#050505] pt-40 sm:pt-44">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="pb-16 lg:pb-28">
              <Typewriter text={study.title} className="font-display text-[clamp(2.6rem,6.5vw,4.6rem)] font-medium leading-[1.05] tracking-[-0.045em]" />
              <p className="appear mt-6 flex items-center gap-3 text-white/70" style={{ '--appear-delay': '600ms' } as CSSProperties}>
                <Wordmark brand={project.brand} color="#fff" className="text-lg" />
                <span className="h-4 w-px bg-white/40" />
                <span className="text-sm sm:text-base">{study.role}</span>
              </p>

              <Reveal className="mt-14">
                <h2 className={sectionTitle}>My role</h2>
                {study.intro.map((para) => (
                  <p key={para} className="mt-4 max-w-xl leading-relaxed text-white/75">
                    {para}
                  </p>
                ))}
              </Reveal>
              <Reveal delay={120}>
                <ul className="mt-7 flex max-w-xl flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/60">
                      {tag}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo('#opportunities')}
                  aria-label="Scroll to opportunities"
                  className="mt-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20"
                >
                  <ChevronDown className="h-5 w-5 animate-nudge" />
                </button>
              </Reveal>
            </div>

            <Reveal variant="device" delay={200} className="self-end">
              <div ref={heroImgRef} className="animate-float">
                <img src={study.heroImage} alt={`${project.brand.name} app`} className="mx-auto w-full max-w-[560px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]" fetchPriority="high" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Opportunities */}
        <section id="opportunities" className="bg-[#111] py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className={sectionTitle}>Opportunities</h2>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-[1.4fr_1fr_1fr]">
              {study.opportunities.slice(0, 3).map((card, i) => (
                <Reveal key={card.title} delay={i * 90}>
                  <Card card={card} tone="dark" className={i === 0 ? 'md:min-h-[240px]' : 'md:min-h-[200px]'} />
                </Reveal>
              ))}
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.4fr_1fr]">
              {study.opportunities.slice(3).map((card, i) => (
                <Reveal key={card.title} delay={i * 90}>
                  <Card card={card} tone="dark" className={i === 1 ? 'md:min-h-[220px]' : 'md:min-h-[200px]'} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Approach */}
        <section id="approach" className="overflow-hidden bg-[#f2f2f4] pt-20 text-ink sm:pt-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className={sectionTitle}>Approach</h2>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {study.approach.map((card, i) => (
                <Reveal key={card.title} delay={i * 100}>
                  <Card card={card} tone="light" />
                </Reveal>
              ))}
            </div>
            <Reveal variant="device" className="mx-auto mt-14 max-w-3xl">
              <img src={study.approachImage} alt="" loading="lazy" className="-mb-[14%] w-full" />
            </Reveal>
          </div>
        </section>

        {/* Impact */}
        <section id="impact" className="relative bg-night py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className={sectionTitle}>Impact and Outcomes</h2>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {study.impact.map((card, i) => (
                <Reveal key={card.title} delay={(i % 2) * 100}>
                  <Card card={card} tone="dark" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Outputs */}
        <section id="outputs" className="bg-night pb-20 sm:pb-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className={sectionTitle}>Glimpse of Outputs</h2>
            </Reveal>
            <div className="mt-10 space-y-4">
              <Reveal variant="tilt" className="relative overflow-hidden rounded-[18px] bg-[#f4f5f7]">
                <img src={study.outputs.showcaseImage} alt="Selected product screens" loading="lazy" className="mx-auto w-full max-w-4xl" />
                <Wordmark brand={project.brand} className="absolute bottom-5 left-6 text-2xl" />
              </Reveal>

              <TimeSplit brand={project.brand} />
              <Ecosystem brand={project.brand} />

              <Reveal className="rounded-[18px] bg-[#f3f5f4] p-6 sm:p-10">
                <h3 className="text-center font-display text-[clamp(1.4rem,3vw,2.1rem)] font-bold tracking-[-0.03em] text-ink">
                  One experience across every account
                </h3>
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {study.outputs.journeyImages.map((src, i) => (
                    <div key={src + i} className="rise overflow-hidden rounded-2xl bg-white" style={{ '--d': `${i * 120}ms` } as CSSProperties}>
                      <img src={src} alt="" loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                  ))}
                </div>
              </Reveal>

              <MaturityPyramid brand={project.brand} />
              <StrategyPyramid brand={project.brand} />
              <Horizons brand={project.brand} />
              <WaysOfWorking brand={project.brand} />
            </div>
          </div>
        </section>

        {/* Next case */}
        {next && (
          <section className="bg-night px-4 pb-20 sm:px-6">
            <Reveal variant="tilt" className="mx-auto max-w-6xl">
              <div className="grid items-center gap-8 rounded-[18px] bg-white/[0.04] p-5 sm:p-6 md:grid-cols-[1fr_1.2fr] md:gap-10">
                <div className="overflow-hidden rounded-xl">
                  <img src={study.next.image} alt={`${next.brand.name} case preview`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105" />
                </div>
                <div className="pb-4 md:pb-0">
                  <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.25rem)] font-medium tracking-[-0.04em]">Next case</h2>
                  <p className="mt-2 text-white/70">{study.next.tagline}</p>
                  <Button href={nextHref} variant="solid-light" size="lg" className="mt-7">
                    {study.next.label}
                  </Button>
                </div>
              </div>
            </Reveal>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
