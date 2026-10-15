import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { caseStudies } from '../caseStudies'
import { navLinks, projects } from '../data'
import { useLenis } from '../lib/lenis'
import { useActiveSection, useGo } from '../lib/navigation'

export type SubLink = { label: string; id: string }

// Only in-page links ("#…") map to sections the home page can highlight.
const homeSectionIds = [...navLinks.filter((l) => l.href.startsWith('#')).map((l) => l.href.slice(1)), 'work']

/** Work items open their case study when one exists, otherwise jump to the project on the home page. */
const workHref = (id: string) => (caseStudies[id] ? `/work/${id}` : `#${id}`)

function SubNav({ links, onGo }: { links: SubLink[]; onGo: (href: string) => void }) {
  const active = useActiveSection(links.map((l) => l.id))

  return (
    <div className="border-t border-white/5 bg-[#0d1a1a]/85 backdrop-blur-xl">
      <ul className="mx-auto flex h-12 max-w-6xl items-center gap-1 overflow-x-auto px-4 [scrollbar-width:none] md:justify-center" data-lenis-prevent>
        {links.map((link) => (
          <li key={link.id} className="shrink-0">
            <button
              onClick={() => onGo(`#${link.id}`)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                active === link.id ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Navbar({ subLinks }: { subLinks?: SubLink[] }) {
  const [workOpen, setWorkOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const homeActive = useActiveSection(isHome ? homeSectionIds : [])
  const active = isHome ? homeActive : pathname === '/contact' ? 'contact' : 'work'
  const go = useGo()
  const lenis = useLenis()

  // Slide the bar away when scrolling down, bring it back when scrolling up.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > last && y > 120)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!workOpen) return
    const onDown = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setWorkOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setWorkOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [workOpen])

  // Freeze smooth scrolling while the mobile menu covers the page.
  useEffect(() => {
    if (menuOpen) lenis?.stop()
    else lenis?.start()
  }, [menuOpen, lenis])

  const navigate = (href: string) => {
    setWorkOpen(false)
    setMenuOpen(false)
    go(href)
  }

  const linkClass = (id: string) =>
    `rounded-full px-3.5 py-1.5 text-[15px] font-medium transition-colors duration-300 ${
      active === id ? 'bg-white/15 text-white' : 'text-white/75 hover:text-white'
    }`

  // With a sub-nav, only the main row slides away so section links stay reachable.
  const hiddenClass = subLinks ? '-translate-y-16' : '-translate-y-full'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hidden && !menuOpen ? hiddenClass : 'translate-y-0'
      }`}
    >
      <div className="bg-black/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:justify-center" aria-label="Main">
          <button onClick={() => navigate('#home')} className="font-display text-lg font-semibold tracking-tight text-white md:hidden">
            Vanshika
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button onClick={() => navigate(link.href)} className={linkClass(link.href.slice(1))}>
                  {link.label}
                </button>
              </li>
            ))}
            <li className="relative" ref={dropdownRef}>
              <button onClick={() => setWorkOpen((o) => !o)} aria-expanded={workOpen} className={`${linkClass('work')} inline-flex items-center gap-1`}>
                Work
                <svg viewBox="0 0 12 12" className={`h-3 w-3 transition-transform duration-300 ${workOpen ? 'rotate-180' : ''}`} aria-hidden>
                  <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </button>
              <div
                className={`absolute left-1/2 top-full mt-3 w-60 -translate-x-1/2 origin-top rounded-2xl border border-white/10 bg-[#161617]/95 p-2 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  workOpen ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
                }`}
              >
                {projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => navigate(workHref(p.id))}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-white/10 hover:text-white ${
                      pathname === `/work/${p.id}` ? 'bg-white/10 text-white' : 'text-white/80'
                    }`}
                  >
                    <span>{p.brand.name}</span>
                    <span className="text-xs text-white/40">{caseStudies[p.id] ? 'Case study' : p.role.split(' ').slice(-1)}</span>
                  </button>
                ))}
              </div>
            </li>
          </ul>

          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`absolute h-0.5 w-5 rounded bg-current transition-transform duration-300 ${menuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute h-0.5 w-5 rounded bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`absolute h-0.5 w-5 rounded bg-current transition-transform duration-300 ${menuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${menuOpen ? 'max-h-[calc(100dvh-4rem)]' : 'max-h-0'}`}
          data-lenis-prevent
        >
          <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 pb-8 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className="block w-full border-b border-white/10 py-4 text-left font-display text-2xl font-medium text-white"
              >
                {link.label}
              </button>
            ))}
            <p className="pb-2 pt-6 text-xs font-semibold uppercase tracking-widest text-white/40">Work</p>
            <div className="grid grid-cols-2 gap-2">
              {projects.map((p) => (
                <button key={p.id} onClick={() => navigate(workHref(p.id))} className="rounded-xl bg-white/5 px-3 py-2.5 text-left text-sm text-white/80">
                  {p.brand.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {subLinks && !menuOpen && <SubNav links={subLinks} onGo={navigate} />}
    </header>
  )
}
