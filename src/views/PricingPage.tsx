'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import BillingFaq from '../components/pricing/BillingFaq'
import PlanCards from '../components/pricing/PlanCards'
import PlanMatrix from '../components/pricing/PlanMatrix'
import { WAITLIST_URL } from '../lib/links'
import {
  connections,
  COVERAGE_NOTE,
  MAX_YEARLY_SAVING_PCT,
  MIN_TOPUP,
  money,
  TRIAL_DAYS,
  TRIAL_RECORD_CAP,
  TRIAL_USERS,
  USAGE_TAX_NOTE,
  walletRates,
} from '../lib/pricing'

export default function PricingPage() {
  const [yearly, setYearly] = useState(true)

  return (
    <>
      {/* ---------- Header + billing toggle ---------- */}
      <section className="relative pt-36 pb-12 overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-surface-2 -top-[200px] left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="section-label mb-4">
            <span>Pricing</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-serif font-semibold tracking-tight leading-[1.05] text-ink mb-5">
            Every limit is a number
            <br />
            you can read.
          </h1>
          <p className="max-w-[560px] mx-auto text-lg text-ink-2 leading-relaxed mb-8">
            Four plans, each with a mailbox and a phone line for every user. Calls and texts come
            out of a prepaid balance, so nothing can bill you after the money runs out.
          </p>

          <div className="inline-flex items-center gap-3 bg-surface border border-line rounded-pill p-1">
            <button
              onClick={() => setYearly(false)}
              aria-pressed={!yearly}
              className={`px-5 py-2 rounded-pill text-sm font-medium transition-all ${
                !yearly ? 'bg-surface-3 text-ink shadow-sm' : 'text-ink-3 hover:text-ink-2'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              aria-pressed={yearly}
              className={`px-5 py-2 rounded-pill text-sm font-medium transition-all flex items-center gap-2 ${
                yearly ? 'bg-surface-3 text-ink shadow-sm' : 'text-ink-3 hover:text-ink-2'
              }`}
            >
              Yearly
              <span className="text-[11px] bg-pos-soft border border-line text-pos-ink px-2 py-0.5 rounded-pill font-semibold">
                Save up to {MAX_YEARLY_SAVING_PCT}%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ---------- Plan cards ---------- */}
      <section className="pb-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <PlanCards yearly={yearly} />
          <p className="text-center text-[13px] text-ink-3 mt-6">
            Each plan includes its first user. Extra users cost less than the first, because the
            first one carries the workspace.
          </p>
        </div>
      </section>

      {/* ---------- Mailboxes and phone lines ---------- */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-surface-2" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold tracking-tight text-ink mb-3">
            Mailboxes and phone lines
          </h2>
          <p className="text-ink-2 leading-relaxed mb-8">
            Available on every plan, including Solo. Anything beyond what your plan already includes
            bills monthly at the price below.
          </p>

          <div className="glass-card overflow-hidden">
            {connections.map((c) => (
              <div key={c.key} className="px-6 py-5 border-b border-line-2 last:border-b-0">
                <div className="flex items-baseline justify-between gap-6 mb-1.5">
                  <h3 className="text-sm font-semibold text-ink">{c.name}</h3>
                  <span className="text-base font-bold font-mono tabular-nums text-ink flex-none">
                    {money(c.price)}
                    <span className="text-sm font-normal text-ink-3">/mo</span>
                  </span>
                </div>
                <p className="text-[13px] text-ink-2 leading-relaxed pr-4">{c.includes}</p>
                {c.commitment && (
                  <p className="mt-2 inline-flex items-center text-[11px] font-semibold uppercase tracking-wider text-warn-ink bg-warn-soft border border-line px-2 py-0.5 rounded-pill">
                    {c.commitment}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* The per-message and per-minute rates live here rather than in a section of
              their own — a customer should never have to leave the pricing page to find
              out what a text costs. */}
          <div className="mt-5 space-y-1.5 text-[13px] text-ink-3 leading-relaxed">
            <p>
              Texting is priced per workspace, not per line. Turning it on covers every line you
              hold.
            </p>
            <p>
              Calls and texts come out of a prepaid balance you top up from {money(MIN_TOPUP)} —
              never an invoice after the fact.{' '}
              <span className="text-ink-2">
                {walletRates.map((r) => `${r.name} ${r.rate}`).join(' · ')}.
              </span>
            </p>
            <p>{USAGE_TAX_NOTE}</p>
            <p>{COVERAGE_NOTE}</p>
          </div>
        </div>
      </section>

      {/* ---------- Full comparison matrix ---------- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold tracking-tight text-ink mb-8 text-center">
            Compare every plan
          </h2>
          <PlanMatrix yearly={yearly} />
        </div>
      </section>

      {/* ---------- The trial ---------- */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-surface-2" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
          <div className="glass-card p-7 sm:p-9">
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight text-ink mb-4">
              The trial
            </h2>
            <p className="text-lg text-ink font-medium mb-4">
              {TRIAL_DAYS} days on Pro features. Up to {TRIAL_USERS} users. No card to start.
            </p>
            <ul className="space-y-2.5 text-sm text-ink-2 mb-5">
              {[
                `Trials hold up to ${TRIAL_RECORD_CAP.toLocaleString('en-US')} records.`,
                'A card is required before you connect a mailbox or claim a phone line — both cost us money from the first day.',
                'CSV export unlocks once a card is added.',
                'When a trial ends the workspace goes read-only for 12 months, with an export link, rather than vanishing.',
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check size={15} className="text-accent mt-1 flex-none" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={WAITLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-[11px] px-6"
            >
              Join waitlist
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold tracking-tight text-ink mb-8 text-center">
            Questions about the bill
          </h2>
          <BillingFaq />
        </div>
      </section>
    </>
  )
}
