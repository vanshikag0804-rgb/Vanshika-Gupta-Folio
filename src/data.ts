// All site content lives here. Replace the placeholder copy, brands and
// projects with your own — components read everything from this file.

/** A heading split into muted and emphasised runs, e.g. "I help you **ship**". */
export type Segment = { text: string; strong?: boolean }

export type Brand = {
  name: string
  /** Visual style for the text wordmark. */
  style: 'geometric' | 'rounded' | 'serif' | 'mono' | 'heavy' | 'light'
  color: string
  mark?: 'dot' | 'square' | 'play' | 'wave' | 'bolt'
}


export type Project = {
  id: string
  brand: Brand
  role: string
  description: string
  tags: string[]
  /** Brand accent, used for the glow behind the mockup. */
  accent: string
}

export const profile = {
  name: 'Vanshika',
  initials: 'V',
  /** Path to an image in /public. Leave empty to show initials instead. */
  avatar: '/images/avatar.webp',
  heroLead: [
    { text: "I'm Vanshika, " },
    { text: 'turning product vision into results you can measure.', strong: true },
  ] satisfies Segment[],
  heroSub:
    'I help product teams cut through ambiguity and ship with confidence, using design as a lever for business growth.',
  email: 'hello@example.com',
  /** Replace with your profile URL. */
  linkedin: 'https://www.linkedin.com/',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Resume', href: '#roles' },
  { label: 'Contact', href: '/contact' },
]

export const brands: Record<string, Brand> = {
  northwind: { name: 'Northwind', style: 'geometric', color: '#111111' },
  ledgerly: { name: 'Ledgerly', style: 'heavy', color: '#111111', mark: 'square' },
  paycrest: { name: 'Paycrest', style: 'heavy', color: '#0b1f4d' },
  cartwheel: { name: 'CARTWHEEL', style: 'rounded', color: '#3fcfa4' },
  bankbridge: { name: 'Bankbridge', style: 'geometric', color: '#111111', mark: 'bolt' },
  pageturn: { name: 'Pageturn', style: 'geometric', color: '#3a3a3c', mark: 'square' },
  tapsy: { name: 'Tapsy.', style: 'heavy', color: '#111111' },
  streamline: { name: 'streamline', style: 'light', color: '#1d1d1f', mark: 'play' },
  carely: { name: 'carely', style: 'rounded', color: '#3a3a3c', mark: 'dot' },
  wavelength: { name: 'Wavelength', style: 'heavy', color: '#1db954', mark: 'wave' },
}

export const marqueeBrands = Object.values(brands)

export const rolesHeading: Segment[] = [
  { text: "I've partnered as a " },
  { text: 'product design consultant', strong: true },
  { text: ' and ' },
  { text: 'design leader', strong: true },
  { text: ' with:' },
]

export const roles = [
  { brand: brands.paycrest, title: 'Lead UX Designer', note: 'Grew adoption of business invoicing' },
  { brand: brands.northwind, title: 'Head of Product Design', note: 'Built a design org for scale' },
  { brand: brands.ledgerly, title: 'Area Design Lead', note: 'Unified money flows across two platforms' },
  { brand: brands.cartwheel, title: 'Senior Experience Designer', note: 'Lifted checkout conversion' },
  { brand: brands.pageturn, title: 'Experience Design Lead', note: 'Shaped the reading experience' },
  { brand: brands.wavelength, title: 'Senior Product Designer', note: 'Tools for content curators' },
]

export const expertiseHeading: Segment[] = [
  { text: 'I make ' },
  { text: 'complicated systems feel', strong: true },
  { text: ' ' },
  { text: 'simple to use.', strong: true },
]

export const expertise = [
  {
    title: 'AI, Fintech & SaaS',
    body: 'Making payments, invoicing, investing and AI-assisted products clear and trustworthy.',
  },
  {
    title: 'Streaming & Subscriptions',
    body: 'Helping people discover more, stay engaged and keep coming back to subscription services.',
  },
  {
    title: 'Commerce & Payments',
    body: 'Removing friction from checkout across web, mobile and point-of-sale.',
  },
  {
    title: 'Digital Media',
    body: 'Designing reading and listening experiences that are effortless to dive into.',
  },
  {
    title: 'Open Banking & A2A',
    body: 'Making bank-to-bank payments feel safe, fast and easy to understand.',
  },
  {
    title: 'Platforms & Internal Tools',
    body: 'Turning dense operational workflows into tools teams actually enjoy using.',
  },
]

export const featured = {
  heading: [
    { text: 'Most recently I ' },
    { text: 'led design at Paycrest', strong: true },
    { text: ', ' },
    { text: 'reshaping', strong: false },
    { text: ' ' },
    { text: 'how businesses get paid.', strong: true },
  ] satisfies Segment[],
  brand: brands.paycrest,
  role: 'Lead UX Designer',
  body: 'I ran the invoicing design pod, reworking the end-to-end flow to raise adoption, add flexibility and make getting paid faster for small businesses.',
  tags: [
    'Lead Designer',
    'Gen AI',
    'Design Strategy',
    'Experience Vision',
    'Stakeholder Management',
    'Hands-on',
    'Product Delivery',
    'Prototyping',
    'Discovery',
    'Visual Design',
  ],
}

export const workHeading: Segment[] = [
  { text: 'Selected work', strong: true },
  { text: ' that makes ' },
  { text: 'life easier', strong: true },
  { text: ' and ' },
  { text: 'businesses stronger.', strong: true },
]

export const projects: Project[] = [
  {
    id: 'northwind',
    brand: brands.northwind,
    role: 'Head of Product Design',
    description:
      'Grew and led the product design team, hiring senior talent, building a healthy culture and positioning design as a driver of product and business success.',
    tags: ['Leadership', 'Design Strategy', 'Experience Led', 'Fintech', 'Strategic Research', 'Experience Vision', 'Staff', 'Stakeholder Management'],
    accent: '#22b8cf',
  },
  {
    id: 'ledgerly',
    brand: brands.ledgerly,
    role: 'Area Design Lead',
    description:
      'Mapped how money moves between two merged platforms and turned complex financial processes into clearer, calmer experiences for merchants.',
    tags: ['Area Lead', 'Experience Led', 'Fintech', 'Transformation', 'Design Strategy', 'Stakeholder Management'],
    accent: '#6d5dfc',
  },
  {
    id: 'paycrest',
    brand: brands.paycrest,
    role: 'Senior Experience Designer',
    description:
      'Designed a business debit card with multi-cardholder support, giving teams more flexible and efficient control over company spending.',
    tags: ['Fintech', 'Product Delivery', 'Discovery', 'Hands-on', 'Visual Design', 'Prototyping', 'Usability', 'Web', 'App'],
    accent: '#1d4ed8',
  },
  {
    id: 'cartwheel',
    brand: brands.cartwheel,
    role: 'Senior Experience Designer',
    description:
      'Reimagined checkout for shoppers and merchants alike, raising conversion and driving adoption across leading online stores.',
    tags: ['Fintech', 'Product Delivery', 'Discovery', 'Visual Design', 'Hands-on', 'In-store', 'Prototyping', 'Vision', 'Design Principles', 'Web', 'App'],
    accent: '#3fcfa4',
  },
  {
    id: 'bankbridge',
    brand: brands.bankbridge,
    role: 'UX Strategist & Advisor',
    description:
      'Worked with leadership to build a high-performing design team, sharpening existing products and defining future services around adoption and efficiency.',
    tags: ['Fintech', 'Design Strategy', 'Discovery', 'Product Led', 'Hands-on', 'Leadership', 'Team Building', 'Prototyping', 'Vision', 'Web'],
    accent: '#22c55e',
  },
  {
    id: 'pageturn',
    brand: brands.pageturn,
    role: 'Experience Design Lead',
    description:
      'Brought a vision for digital magazines to life with cross-functional teams, turning journey insights into a future experience that lifted retention.',
    tags: ['Design Lead', 'Design Strategy', 'Rapid Growth', 'Discovery', 'Prototyping', 'Team Building', 'App', 'Visual Design', 'Hands-on', 'Experience Vision'],
    accent: '#f6a623',
  },
  {
    id: 'tapsy',
    brand: brands.tapsy,
    role: 'Senior Product Designer',
    description:
      'Rethought the in-store payment moment through journey mapping and interaction design, making it smoother for both shoppers and merchants.',
    tags: ['Fintech', 'Discovery', 'Prototyping', 'Concept', 'Visual Design', 'Hands-on', 'Experience Vision', 'Design Excellence', 'App'],
    accent: '#ff7aa8',
  },
  {
    id: 'streamline',
    brand: brands.streamline,
    role: 'Experience Design Lead',
    description:
      'Shaped a new live-sports experience with a narrative flow that surfaced timely content, increasing engagement and session length.',
    tags: ['Lead Designer', 'Research Led', 'Prototyping', 'Concept', 'Discovery', 'Visual Design', 'Multiple Platforms', 'Product Delivery', 'Experience Vision', 'Hands-on'],
    accent: '#e3006d',
  },
  {
    id: 'carely',
    brand: brands.carely,
    role: 'Senior Experience Designer',
    description:
      'Partnered with the founder on the foundations of a patient-centred care platform, making preventive and digital healthcare more accessible.',
    tags: ['Design Strategy', 'Discovery', 'Prototyping', 'Concept', 'Hands-on', 'App', 'Startup', 'Experience Vision', 'Product Delivery'],
    accent: '#ef5b5b',
  },
  {
    id: 'wavelength',
    brand: brands.wavelength,
    role: 'Senior Product Designer',
    description:
      'Led discovery for a next-generation curation platform, giving music editors better tools and enabling more personal listening experiences.',
    tags: ['Discovery', 'Prototyping', 'Internal Tool', 'Concept', 'Hands-on', 'User Interviews', 'Design Excellence', 'Experience Led', 'Product Delivery'],
    accent: '#1db954',
  },
]
