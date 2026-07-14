export type CompetitorId = 'hubspot' | 'salesforce' | 'pipedrive' | 'zoho'

export interface CompareRow {
  feature: string
  nrtur: string | boolean
  nrturHighlight?: boolean
  competitor: string | boolean
  competitorHighlight?: boolean
}

export interface CompareChip {
  label: string
  highlight?: boolean
}

export interface CompetitorData {
  id: CompetitorId
  tabLabel: string
  name: string
  nrturPrice: string
  competitorPrice: string
  chips: CompareChip[]
  rows: CompareRow[]
  verdict: string
  stayLabel: string
}

export const competitors: Record<CompetitorId, CompetitorData> = {
  hubspot: {
    id: 'hubspot',
    tabLabel: 'vs HubSpot',
    name: 'HubSpot',
    nrturPrice: 'from $29/mo',
    competitorPrice: 'from $90/mo',
    chips: [
      { label: '3× cheaper to start', highlight: true },
      { label: 'Set up in minutes, not weeks' },
      { label: 'No annual lock-in' },
    ],
    rows: [
      { feature: 'Starting price', nrtur: '$29/user/mo', nrturHighlight: true, competitor: '$90/user/mo' },
      { feature: 'Setup time', nrtur: '~5 minutes', nrturHighlight: true, competitor: '1–4 weeks' },
      { feature: 'Automations', nrtur: 'Included, unlimited on Pro', nrturHighlight: true, competitor: 'Paid add-on' },
      { feature: 'Email sync', nrtur: 'Included', competitor: 'Included' },
      { feature: 'Onboarding', nrtur: 'Human, 1:1', nrturHighlight: true, competitor: 'Documentation' },
      { feature: 'Contracts', nrtur: 'Month-to-month', nrturHighlight: true, competitor: 'Annual plans' },
      { feature: 'Enterprise upsells', nrtur: 'None', nrturHighlight: true, competitor: 'Frequent' },
      { feature: 'Best for', nrtur: 'Teams of 1–5', competitor: 'Mid-market & up' },
    ],
    verdict: "HubSpot is a great suite — if you're 50+ people. You're not paying for that yet.",
    stayLabel: 'Stay with HubSpot',
  },
  salesforce: {
    id: 'salesforce',
    tabLabel: 'vs Salesforce',
    name: 'Salesforce',
    nrturPrice: 'from $29/mo',
    competitorPrice: 'from $165/mo',
    chips: [
      { label: '5× cheaper to start', highlight: true },
      { label: 'No admin required' },
      { label: 'Productive in the first hour' },
    ],
    rows: [
      { feature: 'Starting price', nrtur: '$29/user/mo', nrturHighlight: true, competitor: '$165/user/mo' },
      { feature: 'Setup time', nrtur: '~5 minutes', nrturHighlight: true, competitor: 'Weeks to months' },
      { feature: 'Dedicated admin needed', nrtur: 'No', nrturHighlight: true, competitor: 'Usually yes' },
      { feature: 'Learning curve', nrtur: 'First hour', nrturHighlight: true, competitor: 'Formal training' },
      { feature: 'Automations', nrtur: 'Visual builder, included', nrturHighlight: true, competitor: 'Flow — powerful, complex' },
      { feature: 'Customization depth', nrtur: 'Focused on essentials', competitor: 'Deepest in class', competitorHighlight: true },
      { feature: 'Contracts', nrtur: 'Month-to-month', nrturHighlight: true, competitor: 'Annual required' },
      { feature: 'Best for', nrtur: 'Teams of 1–5', competitor: 'Large sales orgs' },
    ],
    verdict: "If you need Salesforce's depth, you'll know. Until then, it's paying enterprise prices to fight enterprise complexity.",
    stayLabel: 'Stay with Salesforce',
  },
  pipedrive: {
    id: 'pipedrive',
    tabLabel: 'vs Pipedrive',
    name: 'Pipedrive',
    nrturPrice: 'from $29/mo',
    competitorPrice: 'from $49/mo (Advanced)',
    chips: [
      { label: 'Email sync on every plan', highlight: true },
      { label: 'Automations without caps' },
      { label: 'Closest match — see the ties' },
    ],
    rows: [
      { feature: 'Starting price', nrtur: '$29/user/mo', nrturHighlight: true, competitor: '$49/user/mo for parity' },
      { feature: 'Ease of use', nrtur: 'Excellent', competitor: 'Excellent — credit where due', competitorHighlight: true },
      { feature: 'Email sync', nrtur: 'Included on all plans', nrturHighlight: true, competitor: 'Advanced tier and up' },
      { feature: 'Automations', nrtur: 'Unlimited on Pro', nrturHighlight: true, competitor: 'Capped per plan' },
      { feature: 'Reporting', nrtur: 'Included', nrturHighlight: true, competitor: 'Limited on lower tiers' },
      { feature: 'Onboarding', nrtur: 'Human, 1:1', nrturHighlight: true, competitor: 'Docs + paid onboarding' },
      { feature: 'Contracts', nrtur: 'Month-to-month', competitor: 'Month-to-month' },
    ],
    verdict: 'Pipedrive is genuinely good. nrtur gives you its best features one tier cheaper, with human onboarding.',
    stayLabel: 'Stay with Pipedrive',
  },
  zoho: {
    id: 'zoho',
    tabLabel: 'vs Zoho CRM',
    name: 'Zoho CRM',
    nrturPrice: 'from $29/mo',
    competitorPrice: 'from $20/mo + add-ons',
    chips: [
      { label: 'One focused tool, not 40 apps', highlight: true },
      { label: 'Minutes to set up, not days' },
      { label: 'Human support, not a ticket queue' },
    ],
    rows: [
      { feature: 'Starting price', nrtur: '$29 — everything included', competitor: '$20 sticker — climbs with add-ons', competitorHighlight: true },
      { feature: 'Setup time', nrtur: '~5 minutes', nrturHighlight: true, competitor: 'Days of configuration' },
      { feature: 'Interface', nrtur: 'Clean, focused', nrturHighlight: true, competitor: 'Dense, 40+ app ecosystem' },
      { feature: 'Automations', nrtur: 'Included', nrturHighlight: true, competitor: 'Tier-gated' },
      { feature: 'Email sync', nrtur: 'Included', competitor: 'Included' },
      { feature: 'Support', nrtur: 'Human, 1:1', nrturHighlight: true, competitor: 'Ticket queue' },
      { feature: 'Best for', nrtur: 'Teams of 1–5', competitor: 'Teams already on Zoho One' },
    ],
    verdict: "Zoho's sticker price is lower — until you add the pieces nrtur ships with. Then you're paying more to manage more.",
    stayLabel: 'Stay with Zoho',
  },
}

export const competitorOrder: CompetitorId[] = ['hubspot', 'salesforce', 'pipedrive', 'zoho']
