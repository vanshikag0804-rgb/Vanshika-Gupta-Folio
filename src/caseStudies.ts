// Case study content. Add an entry keyed by project id to give that project its
// own page at /work/<id>; projects without one link back to the home page.
// Image paths are placeholders reusing the home-page renders — swap them freely.

import {
  ArrowUp,
  Crosshair,
  DollarSign,
  Flag,
  ListOrdered,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'

export type InfoCard = { icon: LucideIcon; title: string; body: string }

export type CaseStudy = {
  /** Headline; the typewriter effect types it out on load. Use \n for a line break. */
  title: string
  role: string
  intro: string[]
  tags: string[]
  heroImage: string
  opportunities: InfoCard[]
  approach: InfoCard[]
  approachImage: string
  impact: InfoCard[]
  outputs: {
    showcaseImage: string
    journeyImages: string[]
  }
  next: { id: string; tagline: string; image: string; label: string }
}

export const caseStudies: Record<string, CaseStudy> = {
  northwind: {
    title: 'Growing Design to\nGrow the Business.',
    role: 'Head of Product Design',
    intro: [
      'I led product design for a savings and goals app used by millions of people, balancing an experience customers love with results the business could measure.',
      'Most of my energy went into creating the conditions for designers to do their best work — the rituals, processes and partnerships with product and engineering that let us ship simpler experiences with real commercial impact.',
    ],
    tags: ['Leadership', 'Design Strategy', 'Experience Led', 'Fintech', 'Strategic Research', 'Experience Vision', 'Stakeholder Management', 'Staff'],
    heroImage: '/images/northwind.webp',
    opportunities: [
      { icon: Flag, title: 'Shared Metrics', body: 'How could teams, leadership and customers agree on what a good experience actually looks like?' },
      { icon: TrendingUp, title: 'Better Retention', body: 'Where are people dropping out of key journeys, and what would keep them going?' },
      { icon: ArrowUp, title: 'Revenue Growth', body: 'How do we tie experience improvements directly to the behaviours that earn revenue?' },
      { icon: TrendingDown, title: 'Lower Costs', body: 'Which experience fixes would show up as fewer support tickets and less rework?' },
      { icon: Users, title: 'Experience First', body: 'How can customer outcomes sit alongside strategy so they steer where the business goes?' },
      { icon: Target, title: 'Simpler Core', body: 'What would it take to make the everyday saving flow feel effortless again?' },
    ],
    approach: [
      {
        icon: Flag,
        title: 'Foundations',
        body: 'Set up the team, tools and rituals that let designers lead with research, and use those insights to shape saving and investing journeys people return to.',
      },
      {
        icon: Users,
        title: 'Insight',
        body: 'Run research continuously so we kept finding and removing pain points, while shaping a scalable experience ready for new capabilities.',
      },
      {
        icon: DollarSign,
        title: 'Collaboration',
        body: 'Build better ways of working with product and engineering partners to find and ship the value that moves retention and revenue.',
      },
    ],
    approachImage: '/images/northwind.webp',
    impact: [
      {
        icon: Flag,
        title: 'Aligned Priorities',
        body: 'Design work was mapped to leadership goals, giving everyone the same measurable outcomes — cutting support volume, lifting revenue and reducing churn step by step.',
      },
      {
        icon: Users,
        title: 'A Research Habit',
        body: 'Regular customer research moved the team from shipping features on request to understanding problems first, which led to sharper decisions earlier.',
      },
      {
        icon: Crosshair,
        title: 'Focus on the Core',
        body: 'Linking long-standing usability debt to operating costs and churn made the case for fixing the core product, and leadership backed it.',
      },
      {
        icon: ListOrdered,
        title: 'A Clearer Roadmap',
        body: 'Teams re-prioritised around the core experience, tackling what drove churn and surfacing new opportunities along the way.',
      },
    ],
    outputs: {
      showcaseImage: '/images/tapsy.webp',
      journeyImages: ['/images/northwind.webp', '/images/ledgerly.webp', '/images/carely.webp', '/images/bankbridge.webp'],
    },
    next: {
      id: 'ledgerly',
      tagline: 'Making money flows easy to follow',
      image: '/images/bring.webp',
      label: 'View Ledgerly',
    },
  },
}
