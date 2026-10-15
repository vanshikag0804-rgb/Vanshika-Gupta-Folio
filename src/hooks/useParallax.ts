import { useEffect, useRef } from 'react'

/**
 * Translates the element vertically relative to its distance from the viewport
 * centre. Lenis drives native scroll, so the window scroll event stays in sync
 * with the smoothed position.
 */
export function useParallax<T extends HTMLElement>(speed = 0.12, maxShift = 40) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2
      const y = Math.max(-maxShift, Math.min(maxShift, -offset * speed))
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed, maxShift])

  return ref
}
