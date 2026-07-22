'use client'

import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Check } from 'lucide-react'

const plans = [
  { key: 'starter', name: 'Starter', monthlyPrice: 29, yearlyPrice: 23, tinted: false },
  { key: 'pro', name: 'Pro', monthlyPrice: 59, yearlyPrice: 47, tinted: true },
  { key: 'business', name: 'Business', monthlyPrice: 99, yearlyPrice: 79, tinted: false },
] as const

type Cell = string | boolean

const featureRows: { feature: string; values: [Cell, Cell, Cell] }[] = [
  { feature: 'Users', values: ['Up to 2', 'Up to 5', 'Unlimited'] },
  { feature: 'Contacts', values: ['5,000', '25,000', 'Unlimited'] },
  { feature: 'Pipelines', values: ['2', 'Unlimited', 'Unlimited'] },
  { feature: 'Email sync accounts', values: ['1', '3', 'Unlimited'] },
  { feature: 'Automation workflows', values: ['5', 'Unlimited', 'Unlimited + webhooks'] },
  { feature: 'Reporting', values: ['Standard', 'Advanced + forecasting', 'Custom builder'] },
  { feature: 'Mobile app', values: [true, true, true] },
  { feature: 'API access', values: [false, true, true] },
  { feature: 'Custom fields', values: [false, true, true] },
  { feature: 'SSO / SAML', values: [false, false, true] },
  { feature: 'Audit logs & permissions', values: [false, false, true] },
  { feature: 'Support', values: ['Email', 'Priority', 'Dedicated + SLA'] },
]

const addOns = [
  { name: 'Extra email account sync', price: '$5/mo per account', description: 'Add additional email accounts beyond your plan limit' },
  { name: 'White-label reports', price: '$15/mo', description: 'Brand reports with your company logo for client delivery' },
]

function Cell({ value, tinted }: { value: Cell; tinted?: boolean }) {
  if (value === true) {
    return <Check size={14} className="text-pos" />
  }
  if (value === false) {
    return <span className="text-[13px] text-ink-3">—</span>
  }
  return (
    <span className={`text-[13px] text-center ${tinted ? 'font-medium text-ink' : 'font-medium text-ink'}`}>
      {value}
    </span>
  )
}

export default function Pricing() {
  const [yearly, setYearly] = useState(true)
  const ref = useScrollReveal()

  return (
    <section id="pricing" className="py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-surface-2" />
      <div className="orb w-[500px] h-[500px] bg-surface-2 top-0 right-0 absolute pointer-events-none" />
      <div className="orb w-96 h-96 bg-surface-2 bottom-0 left-0 absolute pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="reveal section-label mb-4"><span>Pricing</span></div>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-serif font-semibold tracking-tight text-ink mb-5">
            Honest pricing.<br />No surprises.
          </h2>
          <p className="reveal reveal-delay-2 max-w-xl mx-auto text-lg text-ink-2 leading-relaxed mb-8">
            Everything is month-to-month. No annual lock-in, no enterprise sales calls.
            Just pick a plan and start using it today.
          </p>

          {/* Toggle */}
          <div className="reveal reveal-delay-3 inline-flex items-center gap-3 bg-surface border border-line rounded-full p-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                !yearly ? 'bg-surface-3 text-ink shadow-sm' : 'text-ink-3 hover:text-ink-2'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                yearly ? 'bg-surface-3 text-ink shadow-sm' : 'text-ink-3 hover:text-ink-2'
              }`}
            >
              Yearly
              <span className="text-[11px] bg-pos-soft border border-line text-pos-ink px-2 py-0.5 rounded-full font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plan comparison matrix */}
        <div className="reveal reveal-delay-4 mb-14">
          <p className="text-center font-mono text-sm font-semibold text-ink-3 uppercase tracking-widest mb-6">
            Compare plans in detail
          </p>
          <div className="glass-card overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_150px_150px_150px] border-b border-line">
              <div className="px-6 py-[18px] flex items-center">
                <span className="font-mono text-xs font-semibold tracking-wider uppercase text-ink-3">Feature</span>
              </div>
              {plans.map((plan) => (
                <div
                  key={plan.key}
                  className={`px-3 py-[14px] text-center border-l ${
                    plan.tinted ? 'border-line bg-surface-2' : 'border-line'
                  }`}
                >
                  <p className="font-bold text-sm mb-0.5 text-ink">{plan.name}</p>
                  <span className="text-[13px] font-semibold text-ink">
                    ${yearly ? plan.yearlyPrice : plan.monthlyPrice}/user/mo
                  </span>
                  {yearly && (
                    <p className="mt-[3px] text-[11px] text-ink-2">
                      Billed ${plan.yearlyPrice * 12}/yr per user
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Feature rows */}
            {featureRows.map((row) => (
              <div key={row.feature} className="grid grid-cols-[1fr_150px_150px_150px] border-b border-line-2">
                <div className="px-6 py-[13px] flex items-center">
                  <span className="text-sm font-medium text-ink-2">{row.feature}</span>
                </div>
                {plans.map((plan, i) => (
                  <div
                    key={plan.key}
                    className={`px-3 py-[13px] flex items-center justify-center border-l ${
                      plan.tinted ? 'border-line bg-surface-2' : 'border-line-2'
                    }`}
                  >
                    <Cell value={row.values[i]} tinted={plan.tinted} />
                  </div>
                ))}
              </div>
            ))}

            {/* Footer CTA row */}
            <div className="grid grid-cols-[1fr_150px_150px_150px] bg-surface-2 border-t border-line">
              <div className="px-6 py-4 flex items-center">
                <span className="text-[13px] text-ink-2">Every plan starts with a 14-day free trial.</span>
              </div>
              {plans.map((plan) => (
                <div
                  key={plan.key}
                  className="p-3 flex justify-center items-center border-l border-line"
                >
                  <a
                    href="https://forms.gle/sb2mHm97oRNFRmUY9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs font-semibold rounded-[9px] py-[7px] px-3.5 whitespace-nowrap transition-all ${
                      plan.tinted
                        ? 'bg-btn-bg hover:bg-btn-bg-hover text-btn-fg shadow-sm hover:-translate-y-0.5'
                        : 'bg-surface hover:bg-surface-2 border border-line-2 text-ink shadow-sm hover:border-line-3'
                    }`}
                  >
                    Join waitlist
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add-ons */}
        <div className="reveal">
          <p className="text-center font-mono text-sm font-semibold text-ink-3 uppercase tracking-widest mb-6">Add-ons</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {addOns.map((a) => (
              <div key={a.name} className="glass-card p-5 hover:border-line-3 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-ink">{a.name}</p>
                  <span className="text-sm font-bold text-accent">{a.price}</span>
                </div>
                <p className="text-xs text-ink-3">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
