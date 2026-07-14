'use client'

import Link from 'next/link'
import { useScrollReveal } from '../hooks/useScrollReveal'

const rows = [
  { feature: 'Starting price', nrtur: '$29/user/mo', hubspot: '$90/user/mo', nrturWins: true },
  { feature: 'Setup time', nrtur: '~5 minutes', hubspot: '1–4 weeks', nrturWins: true },
  { feature: 'Automations', nrtur: 'Included, unlimited on Pro', hubspot: 'Paid add-on', nrturWins: true },
  { feature: 'Email sync', nrtur: 'Included', hubspot: 'Included', nrturWins: false },
  { feature: 'Onboarding', nrtur: 'Human, 1:1', hubspot: 'Documentation', nrturWins: true },
  { feature: 'Contracts', nrtur: 'Month-to-month', hubspot: 'Annual plans', nrturWins: true },
  { feature: 'Enterprise upsells', nrtur: 'None', hubspot: 'Frequent', nrturWins: true },
  { feature: 'Best for', nrtur: 'Teams of 1–5', hubspot: 'Mid-market & up', nrturWins: false },
]

const verdictChips = [
  { label: '3× cheaper to start', emphasis: true },
  { label: 'Set up in minutes, not weeks', emphasis: false },
  { label: 'No annual lock-in', emphasis: false },
]

export default function Comparison() {
  const ref = useScrollReveal()

  return (
    <section id="comparison" className="py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070f] to-[#09091a]" />
      <div className="orb w-96 h-96 bg-brand-600/10 top-1/4 -right-48 absolute pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="reveal section-label mb-4">
            <span>Why nrtur</span>
          </div>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-black tracking-tight text-white mb-5">
            The obvious upgrade<br />from HubSpot
          </h2>
          <p className="reveal reveal-delay-2 max-w-xl mx-auto text-lg text-white/40 leading-relaxed">
            HubSpot was built for enterprise. nrtur is built for you.
            Same core power, fraction of the price, none of the bloat.
          </p>
        </div>

        {/* Verdict chips */}
        <div className="reveal reveal-delay-3 flex flex-wrap justify-center gap-2.5 mb-6">
          {verdictChips.map((chip) => (
            <span
              key={chip.label}
              className={`text-[13px] font-medium rounded-full px-3.5 py-1.5 border ${
                chip.emphasis
                  ? 'text-emerald-400 bg-emerald-500/[0.08] border-emerald-500/20'
                  : 'text-white/55 bg-white/[0.03] border-white/[0.08]'
              }`}
            >
              {chip.label}
            </span>
          ))}
        </div>

        {/* Table */}
        <div className="reveal reveal-delay-3 glass-card overflow-hidden">
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_180px_180px] border-b border-white/[0.06]">
            <div className="px-6 py-[18px] flex items-center">
              <span className="text-xs font-semibold tracking-wider uppercase text-white/30">Feature</span>
            </div>
            <div className="px-4 py-[14px] text-center border-l border-brand-500/20 bg-brand-500/[0.06]">
              <div className="flex items-center justify-center gap-2 mb-0.5">
                <img src="/nrtur-logo.png" alt="nrtur" className="w-5 h-5 object-contain" />
                <span className="font-bold text-white text-sm">nrtur</span>
              </div>
              <span className="text-[11px] text-brand-400 font-medium">from $29/mo</span>
            </div>
            <div className="px-4 py-[14px] text-center border-l border-white/[0.06] flex flex-col justify-center">
              <p className="font-semibold text-white/40 text-sm mb-0.5">HubSpot</p>
              <span className="text-[11px] text-white/25">from $90/mo</span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row) => (
            <div
              key={row.feature}
              className="grid grid-cols-[1fr_180px_180px] border-b border-white/[0.04] last:border-b-0"
            >
              <div className="px-6 py-3.5 flex items-center">
                <span className="text-sm text-white/60">{row.feature}</span>
              </div>
              <div className="px-4 py-3.5 flex items-center justify-center border-l border-brand-500/10 bg-brand-500/[0.03]">
                <span
                  className={`text-[13px] font-medium text-center ${
                    row.nrturWins ? 'text-emerald-400' : 'text-white/65'
                  }`}
                >
                  {row.nrtur}
                </span>
              </div>
              <div className="px-4 py-3.5 flex items-center justify-center border-l border-white/[0.04]">
                <span className="text-[13px] font-medium text-white/50 text-center">{row.hubspot}</span>
              </div>
            </div>
          ))}

          {/* Footer CTA row */}
          <div className="grid grid-cols-[1fr_180px_180px] bg-brand-500/[0.04] border-t border-brand-500/15">
            <div className="px-6 py-[18px] flex items-center">
              <span className="text-[13px] text-white/40">
                HubSpot is a great suite — if you're 50+ people. You're not paying for that yet.
              </span>
            </div>
            <div className="px-4 py-3.5 flex justify-center items-center border-l border-brand-500/15">
              <a
                href="https://forms.gle/sb2mHm97oRNFRmUY9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-[13px] py-2 px-[18px] whitespace-nowrap"
              >
                Join waitlist
              </a>
            </div>
            <div className="px-4 py-3.5 flex justify-center items-center border-l border-white/[0.06]">
              <span className="text-[13px] text-white/25">Stay with HubSpot</span>
            </div>
          </div>
        </div>

        {/* Link to full comparison hub */}
        <p className="reveal text-center mt-7">
          <Link href="/compare/" className="text-sm text-brand-400 font-medium hover:text-brand-300 transition-colors">
            See how nrtur compares to Salesforce, Pipedrive &amp; Zoho →
          </Link>
        </p>
      </div>
    </section>
  )
}
