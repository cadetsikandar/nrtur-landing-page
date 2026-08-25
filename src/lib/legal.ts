import type { LucideIcon } from 'lucide-react'

/** Single source of truth for the entity + contact details quoted across /privacy and /terms.
 *
 *  `email` must stay pointed at a mailbox someone actually reads — GDPR Art. 13 and the
 *  US state privacy laws all require a working contact channel, so a bounced address is a
 *  real compliance gap, not a cosmetic one. Swap it to privacy@ / legal@ once those
 *  aliases exist. Same for `address`: fill in the registered street address when available. */
export const LEGAL = {
  // Wyoming LLC, not a corporation — "Inc." on a legal page names a controller that
  // does not exist. TODO: replace with the exact name on the Wyoming filing if the
  // registered string differs in capitalisation or punctuation.
  company: 'nrtur LLC',
  shortName: 'nrtur',
  // TODO: GDPR Art. 13 and several US state laws expect a real registered postal
  // address, not a state. This is the last blocking placeholder on these pages.
  address: 'Wyoming, USA',
  governingLaw: 'the State of Wyoming, United States',
  email: 'ops@nrtur.io',
  site: 'nrtur.io',
  effective: 'August 18, 2026',
  updated: 'August 18, 2026',
} as const

/** Content blocks a legal section can be built from. Text supports two inline forms:
 *  `**bold**` and `[label](href)` — see `inline()` in views/LegalPage. */
export type Block =
  | { t: 'p'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'note'; tone?: 'accent' | 'pos' | 'warn'; title?: string; text: string }

export type LegalSection = {
  /** Anchor id — also the TOC target, so keep it stable once published. */
  id: string
  title: string
  blocks: Block[]
}

export type Pledge = { icon: LucideIcon; title: string; body: string }

export type LegalDoc = {
  eyebrow: string
  title: string
  lede: string
  /** Plain-English summary shown above the fold. Never the operative text — the
   *  numbered sections below it are what actually binds. */
  summaryTitle: string
  summaryNote: string
  pledges: Pledge[]
  sections: LegalSection[]
  /** Cross-link to the companion document. */
  sibling: { label: string; href: string }
  /** Contracts have an effective date; a security overview only has a last-reviewed
   *  date, so the pill is opt-out. Defaults to shown. */
  showEffective?: boolean
  /** Closing contact block. Defaults to the privacy/terms wording. */
  cta?: { title: string; body: string }
}
