'use client'

import Link from 'next/link'
import { useScrollReveal } from '../hooks/useScrollReveal'

const rows = [
  { feature: 'Comparable plan', nrtur: '$29/user/mo', hubspot: '$90/mo · Pro', nrturWins: true },
  { feature: 'Setup time', nrtur: '~5 minutes', hubspot: '1–4 weeks', nrturWins: true },
  { feature: 'Automations', nrtur: 'Included, unlimited on Pro', hubspot: 'Paid add-on', nrturWins: true },
  { feature: 'Email sync', nrtur: 'Included', hubspot: 'Included', nrturWins: false },
  { feature: 'Onboarding', nrtur: 'Human, 1:1', hubspot: 'Documentation', nrturWins: true },
  { feature: 'Contracts', nrtur: 'Month-to-month', hubspot: 'Annual plans', nrturWins: true },
  { feature: 'Enterprise upsells', nrtur: 'None', hubspot: 'Frequent', nrturWins: true },
  { feature: 'Best for', nrtur: 'Teams of 1–5', hubspot: 'Mid-market & up', nrturWins: false },
]

const verdictChips = [
  { label: 'Automations included, not a paid add-on', emphasis: true },
  { label: 'Set up in minutes, not weeks', emphasis: false },
  { label: 'No annual lock-in', emphasis: false },
]

export default function Comparison() {
  const ref = useScrollReveal()

  return (
    <section id="comparison" className="py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-paper to-surface-2" />
      <div className="orb w-96 h-96 bg-surface-2 top-1/4 -right-48 absolute pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="reveal section-label mb-4">
            <span>Why nrtur</span>
          </div>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-serif font-semibold tracking-tight text-ink mb-5">
            Everything included.<br />None of the bloat.
          </h2>
          <p className="reveal reveal-delay-2 max-w-xl mx-auto text-lg text-ink-2 leading-relaxed">
            The big CRMs push you toward pricier tiers as you grow. nrtur keeps the core —
            contacts, pipeline, email sync, automations — included from day one. Here&rsquo;s how
            it looks next to HubSpot.
          </p>
        </div>

        {/* Verdict chips */}
        <div className="reveal reveal-delay-3 flex flex-wrap justify-center gap-2.5 mb-6">
          {verdictChips.map((chip) => (
            <span
              key={chip.label}
              className={`text-[13px] font-medium rounded-full px-3.5 py-1.5 border ${
                chip.emphasis
                  ? 'text-ink bg-surface border-line-3'
                  : 'text-ink-2 bg-surface border-line'
              }`}
            >
              {chip.label}
            </span>
          ))}
        </div>

        {/* Table */}
        <div className="reveal reveal-delay-3 glass-card overflow-hidden">
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_180px_180px] border-b border-line">
            <div className="px-6 py-[18px] flex items-center">
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-ink-3">Feature</span>
            </div>
            <div className="px-4 py-[14px] text-center border-l border-line bg-surface-2">
              <div className="flex items-center justify-center gap-2 mb-0.5">
                <img src="/nrtur-logo.png" alt="nrtur" className="w-5 h-5 object-contain" />
                <span className="font-bold text-ink text-sm">nrtur</span>
              </div>
              <span className="text-[11px] text-ink-2 font-medium">from $29/mo</span>
            </div>
            <div className="px-4 py-[14px] text-center border-l border-line flex flex-col justify-center">
              <p className="font-semibold text-ink-2 text-sm mb-0.5">HubSpot</p>
              <span className="text-[11px] text-ink-3">$90/mo · Pro</span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row) => (
            <div
              key={row.feature}
              className="grid grid-cols-[1fr_180px_180px] border-b border-line-2 last:border-b-0"
            >
              <div className="px-6 py-3.5 flex items-center">
                <span className="text-sm text-ink-2">{row.feature}</span>
              </div>
              <div className="px-4 py-3.5 flex items-center justify-center border-l border-line bg-surface-2">
                <span
                  className={`text-[13px] text-center ${
                    row.nrturWins ? 'text-ink font-semibold' : 'text-ink-2'
                  }`}
                >
                  {row.nrtur}
                </span>
              </div>
              <div className="px-4 py-3.5 flex items-center justify-center border-l border-line-2">
                <span className="text-[13px] font-medium text-ink-2 text-center">{row.hubspot}</span>
              </div>
            </div>
          ))}

          {/* Footer CTA row */}
          <div className="grid grid-cols-[1fr_180px_180px] bg-surface-2 border-t border-line">
            <div className="px-6 py-[18px] flex items-center">
              <span className="text-[13px] text-ink-2">
                HubSpot is a great suite — if you're 50+ people. You're not paying for that yet.
              </span>
            </div>
            <div className="px-4 py-3.5 flex justify-center items-center border-l border-line">
              <a
                href="https://forms.gle/sb2mHm97oRNFRmUY9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-[13px] py-2 px-[18px] whitespace-nowrap"
              >
                Join waitlist
              </a>
            </div>
            <div className="px-4 py-3.5 flex justify-center items-center border-l border-line">
              <span className="text-[13px] text-ink-3">Stay with HubSpot</span>
            </div>
          </div>
        </div>

        {/* Link to full comparison hub */}
        <p className="reveal text-center mt-7">
          <Link href="/compare/" className="text-sm text-ink-2 font-medium hover:text-ink transition-colors">
            See how nrtur compares to Salesforce, Pipedrive &amp; Zoho →
          </Link>
        </p>
      </div>
    </section>
  )
}
