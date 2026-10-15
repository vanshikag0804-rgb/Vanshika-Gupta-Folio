import { navLinks, profile } from '../data'
import { useGo } from '../lib/navigation'
import { LogoMarquee } from './LogoMarquee'
import { Reveal } from './Reveal'

export function Footer() {
  const go = useGo()
  return (
    <footer id="contact" className="bg-night text-white">
      <LogoMarquee />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-widest text-white/40">Let's talk</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 inline-block font-display text-[clamp(1.8rem,5vw,3rem)] font-medium tracking-[-0.04em] transition-opacity hover:opacity-70"
            >
              {profile.email}
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/55">
            {navLinks.map((l) => (
              <li key={l.href}>
                <button onClick={() => go(l.href)} className="transition-colors hover:text-white">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
        <p className="mt-14 border-t border-white/10 pt-6 text-xs text-white/35">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
