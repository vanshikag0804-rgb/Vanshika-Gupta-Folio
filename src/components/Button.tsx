import type { MouseEvent, ReactNode } from 'react'
import { useGo } from '../lib/navigation'

type ButtonProps = {
  /** "#section" for in-page links or a route such as "/work/northwind". */
  href: string
  children: ReactNode
  variant?: 'outline-dark' | 'outline-light' | 'solid-light'
  size?: 'md' | 'lg'
  className?: string
}

const variants = {
  // Outlined pill on dark backgrounds.
  'outline-dark': 'border border-white/70 text-white hover:bg-white hover:text-ink',
  // Outlined pill on light backgrounds.
  'outline-light': 'border border-line bg-white text-ink hover:border-ink hover:bg-ink hover:text-white',
  'solid-light': 'bg-white text-ink hover:bg-white/85',
}

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-[17px]',
}

/** Pill link. Clicks are routed through useGo so in-page targets scroll smoothly with Lenis. */
export function Button({ href, children, variant = 'outline-dark', size = 'md', className = '' }: ButtonProps) {
  const go = useGo()
  const external = /^(https?:|mailto:)/.test(href)
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (external || e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    go(href)
  }

  return (
    <a
      href={href}
      onClick={onClick}
      {...(external && href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </a>
  )
}
