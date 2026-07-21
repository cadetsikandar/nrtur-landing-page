// Per-CRM feature profiles. Each CRM (including nrtur) is stated ONCE, so a
// comparison is just "pick 2–3 profiles and render columns" — no per-pair
// duplication. `wins` marks the cells where a CRM has the honest edge.

export type CrmId = 'nrtur' | 'hubspot' | 'salesforce' | 'pipedrive' | 'zoho'
export type CompetitorId = Exclude<CrmId, 'nrtur'>

export interface Feature {
  key: string
  label: string
}

/** Canonical feature set — row order for the table. */
export const FEATURES: Feature[] = [
  { key: 'price', label: 'Comparable plan' },
  { key: 'setup', label: 'Setup time' },
  { key: 'ease', label: 'Ease of use' },
  { key: 'automations', label: 'Automations' },
  { key: 'emailSync', label: 'Email sync' },
  { key: 'reporting', label: 'Reporting' },
  { key: 'customization', label: 'Customization depth' },
  { key: 'support', label: 'Onboarding & support' },
  { key: 'contracts', label: 'Contracts' },
  { key: 'bestFor', label: 'Best for' },
]

export interface CrmProfile {
  id: CrmId
  name: string
  /** Tab / selector label. */
  tabLabel: string
  /** Headline price shown under the column name. */
  price: string
  /** true for nrtur — drives the brand column styling. */
  accent?: boolean
  values: Record<string, string>
  /** Feature keys where this CRM has the highlighted edge (honest, incl. rivals). */
  wins: string[]
}

export const crmProfiles: Record<CrmId, CrmProfile> = {
  nrtur: {
    id: 'nrtur',
    name: 'nrtur',
    tabLabel: 'nrtur',
    price: 'from $29/mo',
    accent: true,
    values: {
      price: '$29 — all-in',
      setup: '~5 minutes',
      ease: 'Excellent',
      automations: 'Unlimited on Pro',
      emailSync: 'All plans',
      reporting: 'Included',
      customization: 'Focused on essentials',
      support: 'Human, 1:1',
      contracts: 'Month-to-month',
      bestFor: 'Teams of 1–5',
    },
    wins: ['price', 'setup', 'automations', 'emailSync', 'reporting', 'support', 'contracts'],
  },
  hubspot: {
    id: 'hubspot',
    name: 'HubSpot',
    tabLabel: 'vs HubSpot',
    price: '$90/mo · Pro',
    values: {
      price: '$90/user/mo',
      setup: '1–4 weeks',
      ease: 'Polished, broad',
      automations: 'Paid add-on',
      emailSync: 'Included',
      reporting: 'Strong (higher tiers)',
      customization: 'Extensive',
      support: 'Docs; paid onboarding',
      contracts: 'Annual plans',
      bestFor: 'Mid-market & up',
    },
    wins: [],
  },
  salesforce: {
    id: 'salesforce',
    name: 'Salesforce',
    tabLabel: 'vs Salesforce',
    price: '$165/mo · Ent.',
    values: {
      price: '$165/user/mo',
      setup: 'Weeks to months',
      ease: 'Steep; training',
      automations: 'Flow — powerful, complex',
      emailSync: 'Included',
      reporting: 'Advanced',
      customization: 'Deepest in class',
      support: 'Paid / partner',
      contracts: 'Annual required',
      bestFor: 'Large sales orgs',
    },
    wins: ['customization'],
  },
  pipedrive: {
    id: 'pipedrive',
    name: 'Pipedrive',
    tabLabel: 'vs Pipedrive',
    price: '$49/mo · parity',
    values: {
      price: '$49/user/mo (parity)',
      setup: 'Fast',
      ease: 'Excellent',
      automations: 'Capped per plan',
      emailSync: 'Advanced tier & up',
      reporting: 'Limited on lower tiers',
      customization: 'Moderate',
      support: 'Docs + paid onboarding',
      contracts: 'Month-to-month',
      bestFor: 'Sales-led SMBs',
    },
    wins: ['ease'],
  },
  zoho: {
    id: 'zoho',
    name: 'Zoho CRM',
    tabLabel: 'vs Zoho CRM',
    price: '$20/mo + add-ons',
    values: {
      price: '$20 + add-ons',
      setup: 'Days of config',
      ease: 'Dense (40+ apps)',
      automations: 'Tier-gated',
      emailSync: 'Included',
      reporting: 'Included',
      customization: 'Broad (Zoho One)',
      support: 'Ticket queue',
      contracts: 'Month-to-month',
      bestFor: 'Teams on Zoho One',
    },
    wins: ['price'],
  },
}

/** nrtur-vs-competitor narrative shown for the primary competitor. */
export interface CompetitorNarrative {
  chips: { label: string; highlight?: boolean }[]
  verdict: string
  stayLabel: string
}

export const narratives: Record<CompetitorId, CompetitorNarrative> = {
  hubspot: {
    chips: [
      { label: 'Automations included, not a paid add-on', highlight: true },
      { label: 'Set up in minutes, not weeks' },
      { label: 'No annual lock-in' },
    ],
    verdict: "HubSpot is a great suite — if you're 50+ people. You're not paying for that yet.",
    stayLabel: 'Stay with HubSpot',
  },
  salesforce: {
    chips: [
      { label: 'One flat plan — no enterprise contract', highlight: true },
      { label: 'No admin required' },
      { label: 'Productive in the first hour' },
    ],
    verdict:
      "If you need Salesforce's depth, you'll know. Until then, it's paying enterprise prices to fight enterprise complexity.",
    stayLabel: 'Stay with Salesforce',
  },
  pipedrive: {
    chips: [
      { label: 'Email sync on every plan', highlight: true },
      { label: 'Automations without caps' },
      { label: 'Closest match — see the ties' },
    ],
    verdict:
      "Pipedrive's sticker price starts lower, but the features a real pipeline needs sit on its upper tiers — nrtur bundles them in, with human onboarding instead of docs.",
    stayLabel: 'Stay with Pipedrive',
  },
  zoho: {
    chips: [
      { label: 'One focused tool, not 40 apps', highlight: true },
      { label: 'Minutes to set up, not days' },
      { label: 'Human support, not a ticket queue' },
    ],
    verdict:
      "Zoho's sticker price is lower — until you add the pieces nrtur ships with. Then you're paying more to manage more.",
    stayLabel: 'Stay with Zoho',
  },
}

export const competitorOrder: CompetitorId[] = ['hubspot', 'salesforce', 'pipedrive', 'zoho']

/** Curated competitor-vs-competitor matchups. The compare page LEADS with these — the
 *  well-known brand terms people actually search — and adds nrtur as a natural third
 *  column ("…and where nrtur fits"), rather than centering every page on "nrtur vs X". */
export interface Matchup {
  a: CompetitorId
  b: CompetitorId
  title: string
  /** Neutral, even-handed framing of the two big brands. */
  blurb: string
  /** How nrtur fits as the small-team third option. */
  nrturAngle: string
}

export const matchups: Matchup[] = [
  {
    a: 'hubspot',
    b: 'salesforce',
    title: 'HubSpot vs Salesforce',
    blurb:
      'The two enterprise heavyweights. HubSpot is the friendlier all-in-one marketing-and-sales suite; Salesforce is the deepest, most customizable platform — and the steepest to run. Both are built for scale, and priced for it.',
    nrturAngle:
      'For a team of 1–5, both are far more CRM than you need. nrtur covers the core — contacts, pipeline, email sync, automations — without the setup, admin, or price tag.',
  },
  {
    a: 'pipedrive',
    b: 'hubspot',
    title: 'Pipedrive vs HubSpot',
    blurb:
      'The lean sales tool versus the all-in-one suite. Pipedrive is fast and sales-first; HubSpot bundles marketing, service, and CRM — powerful, but it nudges you up its pricing tiers as you grow.',
    nrturAngle:
      'nrtur sits where a small team actually works: Pipedrive-style focus, with email sync and automations included on every plan instead of gated behind higher tiers or add-ons.',
  },
  {
    a: 'zoho',
    b: 'hubspot',
    title: 'Zoho CRM vs HubSpot',
    blurb:
      'Breadth versus polish. Zoho is inexpensive and enormous — dozens of apps in one suite; HubSpot is more polished but climbs in price quickly. Both ask you to grow into a lot of product.',
    nrturAngle:
      'nrtur is the opposite bet: one focused tool a small team can set up in minutes — not a suite to configure for weeks.',
  },
]
