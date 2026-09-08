// The public rate card — single source of truth for every price on the site.
//
// Derived from the internal pricing specification v4 (2 September 2026). Cost inputs, margins,
// competitor cost analysis and unreleased-work notes from that document are deliberately absent:
// nothing in this file should be anything but customer-facing.
//
// NOTE: no 'use client' here, and don't add one. These exports are read by server components and
// serialised into JSON-LD; a client module's exports become empty proxies across the RSC boundary
// and JSON.stringify silently emits {} (same reason documented at the top of src/lib/schema.ts).

export type PlanKey = 'solo' | 'team' | 'pro' | 'business'

export type Plan = {
  key: PlanKey
  name: string
  badge: string | null
  highlight: boolean
  /** Who the plan is for — one short line under the plan name. */
  tagline: string
  /** First user, per month, billed yearly. */
  yearly: number
  /** First user, billed monthly. */
  monthly: number
  /** Each additional user, per month, billed yearly. `null` on Solo, which is one person. */
  extraYearly: number | null
  /** Each additional user, billed monthly. */
  extraMonthly: number | null
  minUsers: number
  /** `null` means no ceiling. */
  maxUsers: number | null
  /** One-time wallet credit on first payment. */
  welcomeCredit: number
  features: string[]
}

export const plans: Plan[] = [
  {
    key: 'solo',
    name: 'Solo',
    badge: null,
    highlight: false,
    tagline: 'One person, running their own book',
    yearly: 12,
    monthly: 15,
    extraYearly: null,
    extraMonthly: null,
    minUsers: 1,
    maxUsers: 1,
    welcomeCredit: 0,
    features: [
      '1 user — Solo is a single-person plan',
      '5,000 records · 1 pipeline',
      'Your mailbox, synced two ways',
      '50 custom fields per record type · 2 GB',
      '1 active automation',
      'Add a phone line and texting any time',
    ],
  },
  {
    key: 'team',
    name: 'Team',
    badge: null,
    highlight: false,
    tagline: 'A small team that shares one pipeline',
    yearly: 35,
    monthly: 45,
    extraYearly: 29,
    extraMonthly: 37,
    minUsers: 1,
    maxUsers: null,
    welcomeCredit: 15,
    features: [
      'A mailbox and a phone line for every user',
      '50,000 records · 3 pipelines',
      '5 active automations that can send',
      '1,000 automated sends a month',
      'Duplicate detection and merge',
      'No seat ceiling',
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    badge: 'Most popular',
    highlight: true,
    tagline: 'A sales team running real outbound',
    yearly: 69,
    monthly: 85,
    extraYearly: 55,
    extraMonthly: 68,
    minUsers: 1,
    maxUsers: null,
    welcomeCredit: 40,
    features: [
      'Everything in Team, plus:',
      '500,000 records · 25 pipelines',
      'Sequences and lead scoring',
      '50 automations · 25,000 sends a month',
      'Push and in-app messaging',
      'API access and webhooks',
    ],
  },
  {
    key: 'business',
    name: 'Business',
    badge: 'From 5 users',
    highlight: false,
    tagline: 'A company that needs SSO and an audit trail',
    yearly: 119,
    monthly: 145,
    extraYearly: 95,
    extraMonthly: 115,
    minUsers: 5,
    maxUsers: null,
    welcomeCredit: 75,
    features: [
      'Everything in Pro, plus:',
      '2,000,000 records · 100 pipelines',
      'Single sign-on (SAML) and audit log',
      'Custom objects and a sandbox',
      'Data migration — 1 source, 8 hours',
      'Phone support and a named contact',
    ],
  },
]

/** Whole-percent saving from paying yearly. Solo 20 · Team 22 · Pro 19 · Business 18. */
export function yearlySavingPct(plan: Plan): number {
  return Math.round(((plan.monthly - plan.yearly) / plan.monthly) * 100)
}

/** The largest saving any plan offers — the only honest number for a "save up to" badge. */
export const MAX_YEARLY_SAVING_PCT = Math.max(...plans.map(yearlySavingPct))

/** Seat subtotal per month: the first user carries the workspace, extra users cost less. */
export function seatsTotal(plan: Plan, users: number, yearly: boolean): number {
  const first = yearly ? plan.yearly : plan.monthly
  const extra = yearly ? plan.extraYearly : plan.extraMonthly
  if (extra === null) return first
  const clamped = Math.max(plan.minUsers, users)
  return first + extra * (clamped - 1)
}

// ---------------------------------------------------------------------------
// The comparison matrix — §02, banded.
// ---------------------------------------------------------------------------

/** `true` renders a check, `false` an em dash, a string renders as-is. Order matches `plans`. */
export type MatrixValue = string | boolean

export type MatrixBand = {
  band: string
  rows: { label: string; values: [MatrixValue, MatrixValue, MatrixValue, MatrixValue] }[]
}

export const matrix: MatrixBand[] = [
  {
    band: 'What you can store',
    rows: [
      {
        label: 'Records — contacts, leads, companies and deals combined',
        values: ['5,000', '50,000', '500,000', '2,000,000'],
      },
      { label: 'Pipelines', values: ['1', '3', '25', '100'] },
      { label: 'Custom fields per record type', values: ['50', '150', '300', '500'] },
      { label: 'File storage per user', values: ['2 GB', '10 GB', '25 GB', '100 GB'] },
    ],
  },
  {
    band: 'Email and phone',
    rows: [
      { label: 'Mailboxes included', values: ['1', '1 per user', '1 per user', '1 per user'] },
      { label: 'Phone lines included', values: [false, '1 per user', '1 per user', '1 per user'] },
      {
        label: 'Most mailboxes you can hold',
        values: ['2', '10 or 2 per user', '20 or 2 per user', '50 or 2 per user'],
      },
      {
        label: 'Most phone lines you can hold',
        values: ['1', '2 per user', '2 per user', '2 per user'],
      },
    ],
  },
  {
    band: 'Automation and outreach',
    rows: [
      { label: 'Active automations', values: ['1', '5', '50', '200'] },
      { label: 'Automations can send email and texts', values: [false, true, true, true] },
      { label: 'Automated sends per month', values: [false, '1,000', '25,000', '100,000'] },
      { label: 'Sequences', values: [false, false, true, true] },
      { label: 'Lead scoring', values: [false, false, true, true] },
      { label: 'Push and in-app messaging', values: [false, false, true, true] },
      { label: 'Duplicate detection and merge', values: [false, true, true, true] },
    ],
  },
  {
    band: 'For companies',
    rows: [
      { label: 'Single sign-on (SAML)', values: [false, false, false, true] },
      { label: 'Audit log', values: [false, false, false, true] },
      { label: 'API access and webhooks', values: [false, false, true, true] },
      { label: 'Custom objects', values: [false, false, false, true] },
      { label: 'Sandbox', values: [false, false, false, true] },
      { label: 'Data migration', values: [false, false, false, '1 source, 8 hrs'] },
      {
        label: 'Support',
        values: ['Email', 'Email', 'Priority email', 'Phone + named contact'],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Mailboxes, phone lines and texting — §04. Billed monthly, on top of the plan.
// ---------------------------------------------------------------------------

export type Connection = {
  key: 'mailbox' | 'line' | 'tollfree' | 'texting' | 'texting-hv'
  name: string
  price: number
  /** Shown under the price when the add-on carries a commitment. */
  commitment: string | null
  includes: string
}

export const connections: Connection[] = [
  {
    key: 'mailbox',
    name: 'Extra mailbox',
    price: 5,
    commitment: null,
    includes:
      "Two-way sync and sending through your own Google, Microsoft, iCloud or IMAP account.",
  },
  {
    key: 'line',
    name: 'Local phone line',
    price: 5,
    commitment: null,
    includes:
      'Calling in and out. Emergency service registration included — never a separate line item.',
  },
  {
    key: 'tollfree',
    name: 'Toll-free line',
    price: 8,
    commitment: null,
    includes: 'As above, on a toll-free number.',
  },
  {
    key: 'texting',
    name: 'Texting',
    price: 9,
    commitment: 'Three-month minimum',
    includes:
      'Per workspace, not per line — turns texting on for every line you hold. All carrier registration and monthly carrier fees included. Roughly 2,000 messages a day, a ceiling the carriers set.',
  },
  {
    key: 'texting-hv',
    name: 'Texting — high volume',
    price: 29,
    commitment: 'Three-month minimum',
    includes:
      'For senders above the standard daily ceiling. Full carrier brand vetting included.',
  },
]

// ---------------------------------------------------------------------------
// The wallet — §05. Prepaid balance, one rate for everyone.
// ---------------------------------------------------------------------------

/**
 * WITHHELD ON PURPOSE. The rates below are final and correct, but they are not
 * rendered anywhere yet.
 *
 * §11 of the pricing specification makes publishing them conditional on Finance
 * confirming whether resold calling and texting attract telecom tax or federal
 * universal-service contributions. That answer is still outstanding, and a published
 * price is expensive to change: the Terms in this same release promise 60 days'
 * notice and a 12-month price hold on any rise.
 *
 * To publish: flip this to `true` and render `walletRates` — the page copy in
 * PricingPage already branches on it.
 */
export const PUBLISH_USAGE_RATES: boolean = false

export const walletRates = [
  {
    name: 'Text message',
    rate: '$0.020',
    note: 'Per segment — 160 characters, or 70 if the message contains an emoji. The composer shows a live count.',
  },
  { name: 'Picture message', rate: '$0.050', note: 'Per message.' },
  {
    name: 'Calling',
    rate: '$0.030',
    note: 'Per minute of the call, rounded up. Local and toll-free outbound.',
  },
  {
    name: 'Calls to your toll-free number',
    rate: '$0.050',
    note: 'Per minute, inbound only. Toll-free means the caller does not pay — you do.',
  },
]

export const MIN_TOPUP = 20

export const TAX_NOTE = 'Prices are in US dollars and exclude tax.'

/** Stands in for the rate table while `PUBLISH_USAGE_RATES` is false. Says what the
 *  customer needs to know — prepaid, no invoice after the fact — without committing
 *  to a per-message figure we may still have to move. */
export const USAGE_PENDING_NOTE =
  'Calls and texts come out of a prepaid balance you top up yourself, so there is never a usage invoice after the fact. Per-message and per-minute rates are published before you can buy.'

export const COVERAGE_NOTE =
  'Calling and texting work to United States and Canadian numbers. Other destinations are refused at send time until they are enabled for your workspace against a published rate.'

// ---------------------------------------------------------------------------
// The trial — §03.
// ---------------------------------------------------------------------------

export const TRIAL_DAYS = 21
export const TRIAL_USERS = 3
export const TRIAL_RECORD_CAP = 2_500

export const money = (n: number) => `$${n.toLocaleString('en-US')}`
