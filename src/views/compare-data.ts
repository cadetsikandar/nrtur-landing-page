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
      'Pipedrive is genuinely good. nrtur gives you its best features one tier cheaper, with human onboarding.',
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
