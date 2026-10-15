import type { Brand } from '../data'

const styles: Record<Brand['style'], string> = {
  geometric: 'font-display font-semibold tracking-[-0.04em]',
  rounded: 'font-display font-bold tracking-[0.06em]',
  serif: 'font-serif font-semibold italic',
  mono: 'font-mono font-semibold tracking-tight',
  heavy: 'font-sans font-extrabold tracking-[-0.05em]',
  light: 'font-display font-normal tracking-[-0.03em]',
}

function Mark({ kind, color }: { kind: NonNullable<Brand['mark']>; color: string }) {
  const common = 'h-[0.85em] w-[0.85em] shrink-0'
  switch (kind) {
    case 'dot':
      return <span className={`${common} rounded-full`} style={{ background: color }} />
    case 'square':
      return <span className={`${common} rounded-[3px]`} style={{ background: color }} />
    case 'play':
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden>
          <circle cx="12" cy="12" r="12" fill={color} />
          <path d="M9.5 7.5v9l7-4.5z" fill="#fff" />
        </svg>
      )
    case 'wave':
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden>
          <circle cx="12" cy="12" r="12" fill={color} />
          <path d="M6 9.5c4-1.3 8.5-1 12 1M6.8 12.6c3.4-1 7-.7 10 .9M7.5 15.5c2.8-.8 5.6-.5 8 .7" stroke="#fff" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        </svg>
      )
    case 'bolt':
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden>
          <path d="M3 4h18v6h-7v10H9V10H3z" fill={color} />
        </svg>
      )
  }
}

type WordmarkProps = {
  brand: Brand
  /** Override the brand colour, e.g. to render all logos in grey inside a marquee. */
  color?: string
  className?: string
}

/** Text-based logo placeholder. Swap for an <img> of the real logo when you have it. */
export function Wordmark({ brand, color, className = '' }: WordmarkProps) {
  const c = color ?? brand.color
  return (
    <span className={`inline-flex items-center gap-[0.3em] leading-none whitespace-nowrap ${styles[brand.style]} ${className}`} style={{ color: c }}>
      {brand.mark && <Mark kind={brand.mark} color={c} />}
      {brand.name}
    </span>
  )
}
