import Link from 'next/link'

const rows = [
  { feature: 'Comparable plan', hubspot: '$90/mo · Pro', salesforce: '$165/mo · Ent.', nrtur: '$29/user/mo', nrturWins: true },
  { feature: 'Setup time', hubspot: '1–4 weeks', salesforce: 'Weeks to months', nrtur: '~5 minutes', nrturWins: true },
  { feature: 'Automations', hubspot: 'Paid add-on', salesforce: 'Flow — powerful, complex', nrtur: 'Included, unlimited on Pro', nrturWins: true },
  { feature: 'Email sync', hubspot: 'Included', salesforce: 'Included', nrtur: 'Included', nrturWins: false },
  { feature: 'Onboarding', hubspot: 'Documentation', salesforce: 'Paid / partner', nrtur: 'Human, 1:1', nrturWins: true },
  { feature: 'Contracts', hubspot: 'Annual plans', salesforce: 'Annual required', nrtur: 'Month-to-month', nrturWins: true },
  { feature: 'Enterprise upsells', hubspot: 'Frequent', salesforce: 'Frequent', nrtur: 'None', nrturWins: true },
  { feature: 'Best for', hubspot: 'Mid-market & up', salesforce: 'Large sales orgs', nrtur: 'Teams of 1–5', nrturWins: false },
]

const verdictChips = [
  { label: 'Automations included, not a paid add-on', emphasis: true },
  { label: 'Set up in minutes, not weeks', emphasis: false },
  { label: 'No annual lock-in', emphasis: false },
]

export default function Comparison() {
  return (
    <section id="comparison" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-paper to-surface-2" />
      <div className="orb w-96 h-96 bg-surface-2 top-1/4 -right-48 absolute pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="reveal section-label mb-4">
            <span>Why nrtur</span>
          </div>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-serif font-semibold tracking-tight text-ink mb-5">
            Compare HubSpot vs Salesforce.<br />And where we fit.
          </h2>
          <p className="reveal reveal-delay-2 max-w-xl mx-auto text-lg text-ink-2 leading-relaxed">
            The big CRMs are built for enterprise scale, and priced for it. nrtur keeps the core —
            contacts, pipeline, email sync, automations — included from day one, without the enterprise complexity. Here&rsquo;s how it looks.
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
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              {/* Column headers */}
              <div className="grid grid-cols-[1fr_150px_150px_150px] border-b border-line">
                <div className="px-6 py-[18px] flex items-center">
                  <span className="font-mono text-xs font-semibold tracking-wider uppercase text-ink-3">Feature</span>
                </div>
                <div className="px-4 py-[14px] text-center border-l border-line flex flex-col justify-center">
                  <p className="font-semibold text-ink text-sm mb-0.5">HubSpot</p>
                  <span className="text-[11px] text-ink-2">$90/mo · Pro</span>
                </div>
                <div className="px-4 py-[14px] text-center border-l border-line flex flex-col justify-center">
                  <p className="font-semibold text-ink text-sm mb-0.5">Salesforce</p>
                  <span className="text-[11px] text-ink-2">$165/mo · Ent.</span>
                </div>
                <div className="px-4 py-[14px] text-center border-l border-accent-line bg-accent-soft">
                  <div className="flex items-center justify-center gap-2 mb-0.5">
                    <img src="/nrtur-logo.png" alt="nrtur" className="w-5 h-5 object-contain" />
                    <span className="font-bold text-ink text-sm">nrtur</span>
                  </div>
                  <span className="text-[11px] text-accent font-medium">from $29/mo</span>
                </div>
              </div>

              {/* Rows */}
              {rows.map((row) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-[1fr_150px_150px_150px] border-b border-line-2 last:border-b-0"
                >
                  <div className="px-6 py-3.5 flex items-center">
                    <span className="text-sm font-medium text-ink-2">{row.feature}</span>
                  </div>
                  <div className="px-4 py-3.5 flex items-center justify-center border-l border-line-2">
                    <span className="text-[13px] font-medium text-ink text-center">{row.hubspot}</span>
                  </div>
                  <div className="px-4 py-3.5 flex items-center justify-center border-l border-line-2">
                    <span className="text-[13px] font-medium text-ink text-center">{row.salesforce}</span>
                  </div>
                  <div className="px-4 py-3.5 flex items-center justify-center border-l border-accent-line bg-accent-soft">
                    <span
                      className={`text-[13px] text-center ${
                        row.nrturWins ? 'text-ink font-semibold' : 'text-ink-2'
                      }`}
                    >
                      {row.nrtur}
                    </span>
                  </div>
                </div>
              ))}

              {/* Footer CTA row */}
              <div className="grid grid-cols-[1fr_150px_150px_150px] bg-surface-2 border-t border-line">
                <div className="px-6 py-[18px] flex items-center">
                  <span className="text-[13px] text-ink-2">
                    If you have 50+ people, you need them. You're not paying for that yet.
                  </span>
                </div>
                <div className="px-4 py-3.5 flex justify-center items-center border-l border-line">
                  <span className="text-[13px] font-medium text-ink-2">HubSpot</span>
                </div>
                <div className="px-4 py-3.5 flex justify-center items-center border-l border-line">
                  <span className="text-[13px] font-medium text-ink-2">Salesforce</span>
                </div>
                <div className="px-4 py-3.5 flex justify-center items-center border-l border-line bg-surface">
                  <a
                    href="https://forms.gle/sb2mHm97oRNFRmUY9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-[13px] py-2 px-[18px] whitespace-nowrap"
                  >
                    Join waitlist
                  </a>
                </div>
              </div>
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
