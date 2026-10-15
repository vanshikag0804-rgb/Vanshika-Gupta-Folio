import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  /** up: content · device: product shots · flip: project mockups · tilt: wide panels */
  variant?: 'up' | 'device' | 'flip' | 'tilt'
  delay?: number
  className?: string
  id?: string
}

/** Animates its children into place the first time they scroll into view. */
export function Reveal({ children, as: Tag = 'div', variant = 'up', delay = 0, className = '', id }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal reveal-${variant} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
