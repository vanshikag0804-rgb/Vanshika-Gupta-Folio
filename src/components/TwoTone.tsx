import type { ElementType } from 'react'
import type { Segment } from '../data'

type TwoToneProps = {
  segments: Segment[]
  tone?: 'light' | 'dark'
  as?: ElementType
  className?: string
}

/** Heading where emphasised runs are full-contrast and the rest is muted. */
export function TwoTone({ segments, tone = 'light', as: Tag = 'h2', className = '' }: TwoToneProps) {
  const strong = tone === 'dark' ? 'text-white' : 'text-ink'
  const muted = tone === 'dark' ? 'text-white/45' : 'text-soft'

  return (
    <Tag className={`font-display font-medium tracking-[-0.04em] ${className}`}>
      {segments.map((s, i) => (
        <span key={i} className={s.strong ? strong : muted}>
          {s.text}
        </span>
      ))}
    </Tag>
  )
}
