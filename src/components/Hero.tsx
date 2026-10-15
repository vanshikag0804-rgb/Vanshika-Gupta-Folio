import type { CSSProperties } from 'react'
import { profile } from '../data'
import { Button } from './Button'
import { TwoTone } from './TwoTone'

const delay = (ms: number) => ({ '--appear-delay': `${ms}ms` }) as CSSProperties

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-night pb-20 pt-32 text-center sm:pb-24 sm:pt-36">
      {/* Cool blue glow behind the portrait */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 50% 22%, rgba(20,60,90,0.55) 0%, rgba(13,13,13,0) 70%), linear-gradient(180deg, #0b1219 0%, #0d0d0d 70%)',
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4">
        <div className="appear mx-auto h-28 w-28 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10 sm:h-36 sm:w-36" style={delay(0)}>
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" fetchPriority="high" />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-display text-4xl text-white">{profile.initials}</span>
          )}
        </div>

        <div className="appear" style={delay(120)}>
          <TwoTone
            as="h1"
            tone="dark"
            segments={profile.heroLead}
            className="mx-auto mt-10 max-w-[18ch] text-[clamp(2.1rem,5.5vw,3.4rem)] leading-[1.1]"
          />
        </div>

        <p className="appear mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg" style={delay(240)}>
          {profile.heroSub}
        </p>

        <div className="appear mt-9" style={delay(360)}>
          <Button href="/contact">Let's Connect</Button>
        </div>
      </div>
    </section>
  )
}
