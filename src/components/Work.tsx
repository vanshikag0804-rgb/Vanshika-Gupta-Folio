import { caseStudies } from '../caseStudies'
import { projects, workHeading, type Project } from '../data'
import { useParallax } from '../hooks/useParallax'
import { useScrollTo } from '../lib/lenis'
import { Button } from './Button'
import { Reveal } from './Reveal'
import { TwoTone } from './TwoTone'
import { Wordmark } from './Wordmark'

function ProjectBlock({ project, next }: { project: Project; next?: Project }) {
  const floatRef = useParallax<HTMLDivElement>(0.06, 24)
  const scrollTo = useScrollTo()

  return (
    <article id={project.id} className="scroll-mt-20 py-10 text-center sm:py-14">
      <Reveal variant="flip" className="relative mx-auto max-w-2xl">
        {/* Soft brand-tinted glow under the device */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[15%] bottom-[8%] h-1/3 rounded-full opacity-25 blur-3xl"
          style={{ background: project.accent }}
        />
        <div ref={floatRef}>
          <img
            src={`/images/${project.id}.webp`}
            alt={`${project.brand.name} product screens`}
            loading="lazy"
            className="relative mx-auto w-full max-w-[640px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.02]"
          />
        </div>
      </Reveal>

      <Reveal className="relative z-10 mx-auto mt-12 max-w-xl px-2">
        <Wordmark brand={project.brand} className="text-[2.1rem] sm:text-[2.5rem]" />
        <h3 className="mt-6 text-xl text-mute">{project.role}</h3>
        <p className="mt-2 leading-relaxed text-mute">{project.description}</p>
      </Reveal>

      <Reveal delay={100}>
        <ul className="mx-auto mt-7 flex max-w-lg flex-wrap justify-center gap-2 px-2">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-[#e3e3e6] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-mute">
              {tag}
            </li>
          ))}
        </ul>
        <Button href={caseStudies[project.id] ? `/work/${project.id}` : '/contact'} variant="outline-light" size="lg" className="mt-8 px-5 py-3 text-base">
          View Case Story
        </Button>
      </Reveal>

      {next && (
        <button
          onClick={() => scrollTo(`#${next.id}`)}
          aria-label={`Next project: ${next.brand.name}`}
          className="mx-auto mt-14 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-accent shadow-sm transition-colors hover:bg-white"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 animate-nudge" aria-hidden>
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </article>
  )
}

export function WorkSection() {
  return (
    <section id="work" className="bg-canvas pb-16 pt-20 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <TwoTone segments={workHeading} className="max-w-[18ch] text-[clamp(1.9rem,4.2vw,2.75rem)] leading-[1.12]" />
        </Reveal>
        <div className="mt-10 sm:mt-16">
          {projects.map((p, i) => (
            <ProjectBlock key={p.id} project={p} next={projects[i + 1]} />
          ))}
        </div>
      </div>
    </section>
  )
}
