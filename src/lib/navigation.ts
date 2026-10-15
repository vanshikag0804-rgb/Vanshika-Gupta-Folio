import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useScrollTo } from './lenis'

/**
 * Single entry point for every link on the site:
 * - "#section" scrolls smoothly if the section is on this page, otherwise opens the home page at it
 * - "/path" or "/path#section" changes route
 */
export function useGo() {
  const navigate = useNavigate()
  const scrollTo = useScrollTo()

  return (href: string) => {
    if (href.startsWith('#')) {
      if (document.getElementById(href.slice(1))) scrollTo(href)
      else navigate(`/${href}`)
      return
    }
    navigate(href)
  }
}

/** On route change, jump to the top — or to the URL hash once the new page has rendered. */
export function useRouteScroll() {
  const { pathname, hash } = useLocation()
  const scrollTo = useScrollTo()

  useEffect(() => {
    if (hash) {
      const id = window.setTimeout(() => scrollTo(hash), 60)
      return () => window.clearTimeout(id)
    }
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- scrollTo is recreated each render
  }, [pathname, hash])
}

/** Id of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join(',')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of key.split(',')) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [key])

  return active
}
