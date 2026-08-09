// components/creator/types.ts

// Legacy accent typing kept only so existing imports (e.g. in builder-card.tsx,
// which still references `ACCENTS[state.accent]` for backward compatibility)
// continue to compile. There is no Accent UI anywhere in the app anymore —
// this is not reintroducing the old accent system, just a minimal stub.
export type AccentKey = 'default'

export const ACCENTS: Record<AccentKey, { ring: string }> = {
  default: {
    ring: '#2EA043',
  },
}

export type Template = 'frame' | 'card'

export type CreatorState = {
  imageSrc: string | null
  zoom: number
  offsetX: number
  offsetY: number
  name: string
  role: string
  location: string
  teamName: string
  accent: AccentKey
  template: Template
  builderId: string
}

export function generateBuilderId(): string {
  const randomDigits = (n: number) => {
    return Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('')
  }
  return `${randomDigits(4)}-${randomDigits(3)}`
}

export const DEFAULT_STATE: CreatorState = {
  imageSrc: null,
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
  name: 'Your Name',
  role: 'Builder',
  location: 'Goa, India',
  teamName: 'Solo Builder',
  accent: 'default',
  template: 'frame',
  builderId: '',
}

export type TitleRarity = 'common' | 'uncommon' | 'rare'

export const BUILDER_TITLES: Record<TitleRarity, string[]> = {
  common: [
    'Builder',
    'Creator',
    'Developer',
    'Maker',
    'Explorer',
    'Engineer',
    'Designer',
    'Hacker',
    'Coder',
    'Architect',
    'Founder',
    'Innovator',
    'Prototyper',
    'Tinkerer',
    'Debugger',
    'Scripter',
    'Assembler',
    'Craftsman',
    'Technologist',
    'Problem Solver',
    'Idea Maker',
    'Product Builder',
    'Full Stack Builder',
    'Frontend Explorer',
    'Backend Explorer',
    'Systems Thinker',
    'Rapid Builder',
    'Weekend Founder',
    'Night Owl Coder',
    'Early Riser Builder',
    'Team Player',
    'Solo Builder',
    'Community Builder',
    'Open Source Contributor',
    'Curious Learner',
    'Fast Shipper',
    'Feature Builder',
    'App Maker',
    'Web Builder',
    'Mobile Builder',
    'Data Explorer',
    'Cloud Builder',
    'API Crafter',
    'UI Builder',
    'UX Explorer',
    'Design Thinker',
    'Growth Hacker',
    'Startup Builder',
    'Goa Builder',
    'Sunrise Builder',
    'Sunset Coder',
    'Beachside Hacker',
    'Monsoon Coder',
    'Console Explorer',
    'Sprint Runner',
    'Palm Tree Programmer',
    'Byte Wrangler',
    'Logic Crafter',
    'Query Master',
    'Demo Day Builder',
  ],

  uncommon: [
    'Protocol Architect',
    'Launch Machine',
    'Cloud Navigator',
    'Product Alchemist',
    'Vision Builder',
    'Stack Explorer',
    'Midnight Builder',
    'Bug Hunter',
    'Idea Synthesizer',
    'Prototype Pilot',
    'AI Whisperer',
    'Terminal Wizard',
    'Creative Engineer',
    'Startup Alchemist',
    'Builder in Public',
    'Iteration Expert',
    'Latency Slayer',
    'Merge Master',
    'Code Nomad',
    'Ocean Coder',
    'Pixel Crafter',
    'Prompt Engineer',
    'Deploy Ninja',
    'Systems Alchemist',
    'Signal Hunter',
    'Momentum Builder',
    'Velocity Engineer',
    'Framework Forger',
    'Data Alchemist',
    'Innovation Scout',
  ],

  rare: [
    'Genesis Builder',
    'Chaos Engineer',
    'Neural Cartographer',
    'Zero Day Architect',
    'Singularity Founder',
    'Quantum Architect',
    'Legendary Shipper',
    'Midnight Oracle',
    'Infinite Loop Master',
    'Goa Visionary',
    'Founding Architect',
    'Beyond the Stack',
    'Reality Compiler',
    'Timeline Bender',
    'First Principles Founder',
  ],
}

const RARITY_WEIGHTS: {
  rarity: TitleRarity
  weight: number
}[] = [
  { rarity: 'common', weight: 70 },
  { rarity: 'uncommon', weight: 25 },
  { rarity: 'rare', weight: 5 },
]

function pickRarity(): TitleRarity {
  const total = RARITY_WEIGHTS.reduce((sum, w) => sum + w.weight, 0)

  let roll = Math.random() * total

  for (const { rarity, weight } of RARITY_WEIGHTS) {
    if (roll < weight) return rarity
    roll -= weight
  }

  return 'common'
}

export function rollBuilderTitle(current?: string): string {
  let next: string | undefined
  let attempts = 0

  while ((!next || next === current) && attempts < 20) {
    const pool = BUILDER_TITLES[pickRarity()]
    next = pool[Math.floor(Math.random() * pool.length)]
    attempts++
  }

  return next ?? BUILDER_TITLES.common[0]
}