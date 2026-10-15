import { Fragment, useEffect, useState } from 'react'

function withBreaks(text: string) {
  return text.split('\n').map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ))
}

type TypewriterProps = {
  text: string
  className?: string
  /** Milliseconds per character. */
  speed?: number
  startDelay?: number
}

/**
 * Types the heading out character by character with a blinking caret.
 * An invisible copy of the full text reserves the final layout so nothing shifts.
 */
export function Typewriter({ text, className = '', speed = 45, startDelay = 300 }: TypewriterProps) {
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [count, setCount] = useState(reduced ? text.length : 0)

  useEffect(() => {
    if (reduced) return
    let timer = window.setTimeout(function tick() {
      setCount((c) => {
        if (c + 1 < text.length) timer = window.setTimeout(tick, speed)
        return c + 1
      })
    }, startDelay)
    return () => window.clearTimeout(timer)
  }, [text, speed, startDelay, reduced])

  return (
    <h1 className={`relative ${className}`} aria-label={text.replace('\n', ' ')}>
      <span aria-hidden className="invisible">
        {withBreaks(text)}
      </span>
      <span aria-hidden className="absolute inset-0">
        {withBreaks(text.slice(0, count))}
        <span className="caret ml-[0.04em] inline-block h-[0.95em] w-[0.09em] translate-y-[0.12em] bg-white/45" />
      </span>
    </h1>
  )
}
