import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import type { Brand } from '../../data'
import { Reveal } from '../Reveal'
import { Wordmark } from '../Wordmark'

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

/** Rounded presentation slide with the brand mark in the corner. */
export function Panel({ children, bg, brand, markColor, className = '' }: { children: ReactNode; bg: string; brand: Brand; markColor: string; className?: string }) {
  return (
    <Reveal className={`overflow-hidden rounded-[18px] ${className}`}>
      <div className="relative p-6 pb-16 sm:p-10 sm:pb-16 lg:p-14 lg:pb-20" style={{ background: bg }}>
        {children}
        <Wordmark brand={brand} color={markColor} className="absolute bottom-6 right-6 text-xl sm:bottom-8 sm:right-8 sm:text-2xl" />
      </div>
    </Reveal>
  )
}

function PanelTitle({ title, subtitle, color, sub }: { title: string; subtitle?: string; color: string; sub?: string }) {
  return (
    <div>
      <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold tracking-[-0.03em]" style={{ color }}>
        {title}
      </h3>
      {subtitle && (
        <p className="mt-2 text-base font-medium sm:text-lg" style={{ color: sub ?? color }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

/* ---------- Where our time goes ---------- */

function Bubble({ size, color, children, className = '', style }: { size: string; color: string; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`pop flex items-center justify-center rounded-full p-2 text-center text-white ${size} ${className}`} style={{ background: color, ...style }}>
      <div>{children}</div>
    </div>
  )
}

export function TimeSplit({ brand }: { brand: Brand }) {
  const dark = '#0b5e4c'
  const light = '#14b394'
  return (
    <Panel bg="#ecf2fb" brand={brand} markColor="#111">
      <PanelTitle title="Where our time goes" subtitle="Investing more of it in understanding the problem" color="#111" sub="#444" />
      <div className="mt-12 grid items-start gap-12 md:grid-cols-3 md:gap-6">
        <div className="text-center">
          <div className="relative mx-auto h-64 w-64">
            <Bubble size="absolute inset-8" color={dark} style={d(0)}>
              <p className="text-base font-semibold leading-tight">Understand the problem</p>
              <p className="mt-2 text-lg font-bold">30%</p>
            </Bubble>
            <Bubble size="absolute -left-2 -top-2 h-[5.5rem] w-[5.5rem]" color={light} className="text-sm leading-tight" style={d(250)}>
              Customer value
            </Bubble>
            <Bubble size="absolute -right-2 -top-2 h-[5.5rem] w-[5.5rem]" color={light} className="text-sm leading-tight" style={d(350)}>
              Business goals
            </Bubble>
            <Bubble size="absolute -bottom-2 -left-2 h-[5.5rem] w-[5.5rem]" color={light} className="text-sm leading-tight" style={d(450)}>
              Team health
            </Bubble>
            <Bubble size="absolute -bottom-2 -right-2 h-[5.5rem] w-[5.5rem]" color={light} className="text-sm leading-tight" style={d(550)}>
              Learning
            </Bubble>
          </div>
          <p className="rise mt-6 font-semibold text-[#111]" style={d(600)}>
            Everyone now starts from the same problem
          </p>
        </div>
        {[
          { label: 'Shape the right solution', pct: '25%', note: 'Fewer surprises once we start building', color: dark },
          { label: 'Build it well', pct: '45%', note: 'More reliable estimates and smoother releases', color: light },
        ].map((item, i) => (
          <div key={item.label} className="text-center">
            <Bubble size="mx-auto h-56 w-56" color={item.color} style={d(200 + i * 200)}>
              <p className="text-lg font-semibold leading-tight">{item.label}</p>
              <p className="mt-2 text-lg font-bold">{item.pct}</p>
            </Bubble>
            <p className="rise mt-10 font-semibold text-[#111]" style={d(700 + i * 150)}>
              {item.note}
            </p>
          </div>
        ))}
      </div>
    </Panel>
  )
}

/* ---------- Ecosystem maps ---------- */

type Node = { x: number; y: number; r: number; label?: string; tone: 'core' | 'service' | 'legacy' }
const tones = { core: '#22c55e', service: '#a855f7', legacy: '#9ca3af' }

function EcoMap({ title, subtitle, caption, center, nodes, links, ring }: {
  title: string
  subtitle: string
  caption: string
  center: string
  nodes: Node[]
  links: [number, number][]
  ring?: boolean
}) {
  return (
    <div className="text-center">
      <h4 className="font-display text-xl font-bold text-white sm:text-2xl">{title}</h4>
      <p className="mt-1 text-sm text-white/70">{subtitle}</p>
      <svg viewBox="0 0 400 400" className="mx-auto mt-6 w-full max-w-[400px]" role="img" aria-label={`${title}: ${caption}`}>
        <circle cx="200" cy="200" r="190" fill="#0a3a32" />
        <circle cx="200" cy="200" r="105" fill="#0f6b5c" opacity="0.7" />
        <text x="200" y="38" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600">
          {caption}
        </text>
        {ring && <circle className="draw" style={{ '--len': 290 } as CSSProperties} cx="200" cy="200" r="46" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" />}
        {links.map(([a, b], i) => (
          <path
            key={i}
            className="pop"
            style={d(400 + i * 30)}
            d={`M${nodes[a].x},${nodes[a].y} L${nodes[a].x},${nodes[b].y} L${nodes[b].x},${nodes[b].y}`}
            fill="none"
            stroke="#cbd5e1"
            strokeOpacity="0.55"
            strokeWidth="1"
          />
        ))}
        <text x="200" y="196" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">
          {center.split('\n')[0]}
        </text>
        <text x="200" y="213" textAnchor="middle" fill="#fff" fontSize="12">
          {center.split('\n')[1]}
        </text>
        {nodes.map((n, i) => (
          <g key={i} className="pop" style={d(i * 35)}>
            <circle cx={n.x} cy={n.y} r={n.r} fill={tones[n.tone]} />
            {n.label && (
              <text x={n.x} y={n.y + 3.5} textAnchor="middle" fill="#fff" fontSize={n.r > 18 ? 10 : 8} fontWeight="600">
                {n.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}

// "Before": features scattered with tangled links. Indices 0-6 core, 7-9 legacy, rest services.
const beforeNodes: Node[] = [
  { x: 150, y: 150, r: 22, label: 'Goals', tone: 'core' },
  { x: 240, y: 140, r: 20, label: 'Rules', tone: 'core' },
  { x: 140, y: 230, r: 22, label: 'Invest', tone: 'core' },
  { x: 265, y: 205, r: 19, label: 'Cards', tone: 'core' },
  { x: 190, y: 285, r: 20, label: 'Rewards', tone: 'core' },
  { x: 200, y: 92, r: 15, tone: 'core' },
  { x: 105, y: 180, r: 13, tone: 'core' },
  { x: 245, y: 262, r: 22, label: 'Legacy', tone: 'legacy' },
  { x: 290, y: 300, r: 13, tone: 'legacy' },
  { x: 205, y: 335, r: 12, tone: 'legacy' },
  { x: 70, y: 120, r: 12, tone: 'service' },
  { x: 95, y: 70, r: 11, tone: 'service' },
  { x: 160, y: 60, r: 12, tone: 'service' },
  { x: 285, y: 75, r: 12, tone: 'service' },
  { x: 330, y: 125, r: 12, tone: 'service' },
  { x: 345, y: 190, r: 11, tone: 'service' },
  { x: 60, y: 250, r: 12, tone: 'service' },
  { x: 85, y: 305, r: 12, tone: 'service' },
  { x: 130, y: 345, r: 11, tone: 'service' },
  { x: 320, y: 255, r: 11, tone: 'service' },
]
const beforeLinks: [number, number][] = [
  [10, 0], [11, 6], [12, 5], [13, 1], [14, 1], [15, 3], [16, 2], [17, 2], [18, 4], [19, 7], [0, 1], [2, 4], [3, 7], [7, 8], [4, 9],
]

// "After": four core services around a shared centre, with services orbiting in order.
const afterCore: Node[] = [
  { x: 155, y: 155, r: 22, label: 'Save', tone: 'core' },
  { x: 245, y: 155, r: 22, label: 'Spend', tone: 'core' },
  { x: 155, y: 245, r: 22, label: 'Invest', tone: 'core' },
  { x: 245, y: 245, r: 22, label: 'Plan', tone: 'core' },
]
const afterServices: Node[] = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2 - Math.PI / 2 + 0.26
  return { x: Math.round(200 + Math.cos(a) * 148), y: Math.round(200 + Math.sin(a) * 148), r: 12, tone: 'service' as const }
})
const afterNodes = [...afterCore, ...afterServices]
const afterLinks = afterServices.map((s, i): [number, number] => [i + 4, (s.y < 200 ? 0 : 2) + (s.x < 200 ? 0 : 1)])

export function Ecosystem({ brand }: { brand: Brand }) {
  return (
    <Panel bg="#0b4a40" brand={brand} markColor="#5eead4">
      <div className="grid gap-12 md:grid-cols-2 md:gap-8">
        <EcoMap
          title="Before: many features"
          subtitle="A disconnected core experience"
          caption="Built on request"
          center={`${brand.name}\nfeature list`}
          nodes={beforeNodes}
          links={beforeLinks}
        />
        <EcoMap
          title="After: one connected service"
          subtitle="A joined-up experience"
          caption="A platform of services"
          center={`${brand.name}\nservice platform`}
          nodes={afterNodes}
          links={afterLinks}
          ring
        />
      </div>
    </Panel>
  )
}

/* ---------- Pyramids ---------- */

type Level = { label: string; note: string; fill: string; text: string }

function useIsWide() {
  const query = '(min-width: 768px)'
  const [wide, setWide] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setWide(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return wide
}

function Pyramid({ levels, divider, ink }: { levels: Level[]; divider?: { after: number; above: string; below: string }; ink: string }) {
  const h = 74
  const H = levels.length * h
  const cx = 260
  const base = 240
  const half = (y: number) => (y / H) * base
  // Side notes are hidden on small screens, so crop the canvas to the pyramid itself.
  const width = useIsWide() ? 780 : cx + base + 20

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${H + 10}`} className="w-full" role="img" aria-label={levels.map((l) => `${l.label}: ${l.note}`).join('. ')}>
        {levels.map((lvl, i) => {
          const y0 = i * h + (i ? 3 : 0)
          const y1 = (i + 1) * h
          const pts = `${cx - half(y0)},${y0} ${cx + half(y0)},${y0} ${cx + half(y1)},${y1} ${cx - half(y1)},${y1}`
          const ty = i === 0 ? y0 + h * 0.68 : (y0 + y1) / 2 + 5
          return (
            <g key={lvl.label} className="rise" style={d(i * 140)}>
              <polygon points={pts} fill={lvl.fill} />
              <text x={cx} y={ty} textAnchor="middle" fill={lvl.text} fontSize={i === 0 ? 13 : 15} fontWeight="600">
                {lvl.label}
              </text>
              <line x1={cx + half(y1) + 6} y1={y1} x2={i === divider?.after ? 770 : cx + half(y1) + 170} y2={y1} stroke={ink} strokeOpacity="0.5" strokeDasharray="4 4" className="max-md:hidden" />
              <text x={cx + half((y0 + y1) / 2) + 26} y={(y0 + y1) / 2 + 5} fill={ink} fontSize="15" fontWeight="500" className="max-md:hidden">
                {lvl.note}
              </text>
            </g>
          )
        })}
        {divider && (
          <g className="rise max-md:hidden" style={d(levels.length * 140)}>
            <text x="770" y={(divider.after + 1) * h - 10} textAnchor="end" fill={ink} fontSize="12" fontWeight="700">
              {divider.above}
            </text>
            <text x="770" y={(divider.after + 1) * h + 20} textAnchor="end" fill={ink} fontSize="12" fontWeight="700">
              {divider.below}
            </text>
          </g>
        )}
      </svg>
      {/* On small screens the side notes would be unreadable, so list them instead. */}
      <dl className="mt-6 grid gap-2 text-sm md:hidden" style={{ color: ink }}>
        {levels.map((l) => (
          <div key={l.label} className="flex gap-2">
            <dt className="font-semibold">{l.label}:</dt>
            <dd>{l.note}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function MaturityPyramid({ brand }: { brand: Brand }) {
  const ink = '#064e3b'
  const fill = '#059f7f'
  return (
    <Panel bg="#c8f2e8" brand={brand} markColor="#0f2f2a">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_2fr]">
        <PanelTitle title="Building design maturity" subtitle="A step-by-step plan" color={ink} />
        <Pyramid
          ink={ink}
          levels={[
            { label: 'Shape', note: 'Design at the leadership table', fill, text: '#fff' },
            { label: 'Guide decisions', note: 'Influencing what gets built', fill, text: '#fff' },
            { label: 'Track progress', note: 'Baselines everyone trusts', fill, text: '#fff' },
            { label: 'Link design to company goals', note: 'Raising awareness of UX', fill, text: '#fff' },
            { label: "Map today's experience", note: 'More research, earlier', fill, text: '#fff' },
          ]}
        />
      </div>
    </Panel>
  )
}

export function StrategyPyramid({ brand }: { brand: Brand }) {
  const ink = '#312e81'
  const light = { fill: '#d4d4f7', text: '#312e81' }
  const deep = { fill: '#1e2a8a', text: '#fff' }
  return (
    <Panel bg="#e6def5" brand={brand} markColor="#1e1b4b">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_2fr]">
        <PanelTitle title="Strategy meets execution" subtitle="How each layer of our work connects" color={ink} />
        <Pyramid
          ink={ink}
          divider={{ after: 1, above: 'Execution — day to day', below: 'Direction — long term' }}
          levels={[
            { label: 'Daily work', note: 'Tasks', ...light },
            { label: 'What we ship', note: 'Features', ...light },
            { label: 'How we get there', note: 'Roadmap', ...deep },
            { label: 'Are we on track?', note: 'Objectives', ...deep },
            { label: 'Why it matters to customers', note: 'Vision', ...deep },
          ]}
        />
      </div>
    </Panel>
  )
}

/* ---------- Horizons ---------- */

export function Horizons({ brand }: { brand: Brand }) {
  const rings = [
    { r: 200, fill: '#34d1b0', label: 'Vision' },
    { r: 158, fill: '#14b394', label: 'Year' },
    { r: 116, fill: '#0b9b7e', label: 'Quarter' },
    { r: 74, fill: '#08473d', label: 'Sprint' },
  ]
  return (
    <Panel bg="#c8f2e8" brand={brand} markColor="#0f2f2a">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
        <div>
          <PanelTitle title="Outcomes at every horizon" color="#064e3b" />
          <p className="mt-4 max-w-sm text-lg font-semibold leading-snug text-[#064e3b]">
            The same outcome thinking applies to a two-week sprint, a quarterly plan and the long-term vision.
          </p>
        </div>
        <svg viewBox="0 0 420 420" className="mx-auto w-full max-w-[440px]" role="img" aria-label="Nested horizons: vision, year, quarter and sprint">
          {rings.map((ring, i) => (
            <g key={ring.label} className="pop" style={d(i * 160)}>
              <circle cx="210" cy="210" r={ring.r} fill={ring.fill} />
              <text x="210" y={210 - ring.r + 26} textAnchor="middle" fill="#ecfdf5" fontSize="15" fontWeight="600">
                {ring.label}
              </text>
            </g>
          ))}
          {[0, 1, 2, 3, 4].map((b) => (
            <rect key={b} className="rise" style={d(700 + b * 80)} x={163 + b * 19} y={b === 0 || b === 4 ? 205 : 217} width="16" height={b === 0 || b === 4 ? 32 : 20} rx="3" fill="#d1fae5" />
          ))}
        </svg>
      </div>
    </Panel>
  )
}

/* ---------- Ways of working ---------- */

const habits = [
  'Research and learning happen before we commit',
  'Success is measured in outcomes, not output',
  'Every project starts with the change we want to see',
  'We solve customer problems, not feature requests',
  'Design covers the whole experience, not just screens',
  'Discovery is planned, not squeezed in',
  'Estimates are based on what we have learned',
  'Stories come from real behaviour and needs',
  'Done means the outcome was reached',
]

export function WaysOfWorking({ brand }: { brand: Brand }) {
  const ink = '#064e3b'
  const circumference = Math.round(2 * Math.PI * 140)
  return (
    <Panel bg="#c8f2e8" brand={brand} markColor="#0f2f2a">
      <div className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <PanelTitle title="How we work now" color={ink} />
          <ul className="mt-8 space-y-3">
            {habits.map((h, i) => (
              <li key={h} className="rise flex gap-4 font-semibold text-[#065f46]" style={d(i * 70)}>
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#064e3b]" />
                {h}
              </li>
            ))}
          </ul>
        </div>
        <svg viewBox="0 0 320 320" className="mx-auto w-full max-w-[320px]" role="img" aria-label="Outcome-led">
          <circle
            className="draw"
            style={{ '--len': circumference } as CSSProperties}
            cx="160"
            cy="160"
            r="140"
            fill="none"
            stroke={ink}
            strokeWidth="5"
            strokeLinecap="round"
            transform="rotate(-90 160 160)"
          />
          <text className="pop" style={d(900)} x="160" y="170" textAnchor="middle" fill={ink} fontSize="34" fontWeight="700" fontFamily="Manrope, sans-serif">
            Outcome-led
          </text>
        </svg>
      </div>
    </Panel>
  )
}
