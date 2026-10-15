import type { CSSProperties } from 'react'
import { marqueeBrands } from '../data'
import { Wordmark } from './Wordmark'

/** Infinite logo ticker. The list is rendered twice so the -50% loop is seamless. */
export function LogoMarquee({ className = '' }: { className?: string }) {
  const items = [...marqueeBrands, ...marqueeBrands]

  return (
    <div className={`bg-[#161617] py-7 ${className}`}>
      <div className="marquee-mask group overflow-hidden">
        <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]" style={{ '--marquee-duration': '45s' } as CSSProperties}>
          {items.map((brand, i) => (
            <li key={i} aria-hidden={i >= marqueeBrands.length} className="px-7 sm:px-10">
              <Wordmark brand={brand} color="#ffffff" className="text-xl opacity-40 transition-opacity duration-300 hover:opacity-90 sm:text-2xl" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
