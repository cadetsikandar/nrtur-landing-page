'use client'

import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Check } from 'lucide-react'

const WAITLIST = 'https://forms.gle/sb2mHm97oRNFRmUY9'

type Plan = {
  key: string
  name: string
  badge: string | null
  highlight: boolean
  perSeat: boolean
  annual: number
  annualBilled: number
  monthly: number
  bestFor: string
  features: string[]
}

const plans: Plan[] = [
  {
    key: 'solo',
    name: 'Solo',
    badge: null,
    highlight: false,
    perSeat: false,
    annual: 9,
    annualBilled: 108,
    monthly: 19,
    bestFor: 'Solopreneurs & solo reps',
    features: [
      'Hard-locked to 1 user',
      '5,000 contacts',
      '1 pipeline · 25 custom fields',
      '1 synced mailbox',
      'Pay-as-you-go SMS',
      'Community & email support',
    ],
  },
  {
    key: 'starter',
    name: 'Starter',
    badge: null,
    highlight: false,
    perSeat: true,
    annual: 29,
    annualBilled: 348,
    monthly: 39,
    bestFor: 'Small teams (1–3 reps)',
    features: [
      'Unlimited users',
      '10,000 contacts',
      '3 pipelines · 50 custom fields',
      '5 active automations',
      '1 mailbox + 250 SMS / seat',
      'Standard email support',
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    badge: 'Most popular',
    highlight: true,
    perSeat: true,
    annual: 59,
    annualBilled: 708,
    monthly: 79,
    bestFor: 'Growing sales teams (2–10)',
    features: [
      'Everything in Starter, plus:',
      '40,000 contacts · 10 pipelines',
      '50 automations (capped AI)',
      'Sequences & marketing (email & SMS)',
      'Push / in-app messaging',
      'Limited API access',
      '2 mailboxes + 1,000 SMS / seat',
      'Priority email support',
    ],
  },
  {
    key: 'business',
    name: 'Business',
    badge: null,
    highlight: false,
    perSeat: true,
    annual: 99,
    annualBilled: 1188,
    monthly: 129,
    bestFor: 'Scaling agencies & ops (10+)',
    features: [
      'Everything in Pro, plus:',
      'Unlimited contacts · 25 pipelines',
      '200 automations + API/AI actions',
      'Custom objects, SSO & sandbox',
      'Full read/write API + webhooks',
      '3 mailboxes + 2,500 SMS / seat',
      'Phone + dedicated CSM',
    ],
  },
]

type CellValue = string | boolean

const featureRows: { feature: string; values: CellValue[] }[] = [
  { feature: 'Max team size', values: ['1 user', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { feature: 'Contacts', values: ['5,000', '10,000', '40,000', 'Unlimited'] },
  { feature: 'Pipelines', values: ['1', '3', '10', '25'] },
  { feature: 'Custom fields', values: ['25', '50', '100', 'Unlimited'] },
  { feature: 'Active automations', values: ['0', '5', '50', '200 + API/AI'] },
  { feature: 'Sequences & marketing', values: [false, false, true, true] },
  { feature: 'Push / in-app messaging', values: [false, false, true, true] },
  { feature: 'API access', values: [false, false, 'Limited', 'Full + webhooks'] },
  { feature: 'Custom objects', values: [false, false, false, true] },
  { feature: 'Sandbox & SSO', values: [false, false, false, true] },
  { feature: 'Synced mailboxes', values: ['1 total', '1 / seat', '2 / seat', '3 / seat'] },
  { feature: 'Included SMS / mo', values: ['0', '250 / seat', '1,000 / seat', '2,500 / seat'] },
  { feature: 'Support', values: ['Community', 'Standard email', 'Priority email', 'Phone + CSM'] },
]

const addOns = [
  { name: 'SMS overage', price: '$0.02–0.025 / segment', description: 'Beyond your pooled monthly allowance.' },
  { name: 'Outbound calling', price: '$0.03 / min', description: 'Native click-to-call, metered per minute.' },
  { name: 'Dedicated phone number', price: '$3 / line / mo', description: 'Local or toll-free numbers for your team.' },
  { name: 'Additional synced mailbox', price: '$5 / mailbox / mo', description: 'Add inboxes beyond your plan allowance.' },
  { name: 'Extra storage', price: '$5 / 10 GB / mo', description: 'More room for files and attachments.' },
  { name: 'White-label / agency mode', price: 'Flat monthly add-on', description: 'Host under your domain with your branding.' },
]

const GRID = 'grid grid-cols-[minmax(190px,1.3fr)_repeat(4,minmax(0,1fr))]'

function Cell({ value }: { value: CellValue }) {
  if (value === true) return <Check size={14} className="text-pos" />
  if (value === false) return <span className="text-[13px] text-ink-3">—</span>
  return <span className="text-[13px] font-medium text-ink text-center">{value}</span>
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
            Start month-to-month, or save up to 52% paying annually. No hidden fees and no
            enterprise sales calls — pick a plan and start today.
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
              Annual
              <span className="text-[11px] bg-pos-soft border border-line text-pos-ink px-2 py-0.5 rounded-full font-semibold">
                Save up to 52%
              </span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="reveal reveal-delay-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`glass-card p-6 flex flex-col relative h-full ${
                plan.highlight ? 'border-accent shadow-pop xl:-translate-y-2' : ''
              }`}
            >
              {/* Badge row (reserved height so headers align) */}
              <div className="h-6 mb-1">
                {plan.badge && (
                  <span className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wider bg-accent text-on-solid px-2.5 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-ink">{plan.name}</h3>
              <p className="text-[13px] text-ink-3 mt-0.5 mb-4">{plan.bestFor}</p>

              {/* Price */}
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-ink tracking-tight">
                  ${yearly ? plan.annual : plan.monthly}
                </span>
                <span className="text-sm text-ink-3">{plan.perSeat ? '/seat/mo' : '/mo'}</span>
              </div>
              <p className="mt-1.5 mb-5 text-xs text-ink-3 h-4">
                {yearly
                  ? `billed $${plan.annualBilled.toLocaleString()}${plan.perSeat ? '/seat' : ''}/yr`
                  : 'billed monthly'}
              </p>

              {/* CTA */}
              <a
                href={WAITLIST}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center text-sm font-semibold rounded-xl py-2.5 px-4 transition-all ${
                  plan.highlight
                    ? 'bg-btn-bg hover:bg-btn-bg-hover text-btn-fg shadow-sm hover:-translate-y-0.5'
                    : 'bg-surface hover:bg-surface-2 border border-line-2 text-ink shadow-sm hover:border-line-3'
                }`}
              >
                Join waitlist
              </a>

              {/* Features */}
              <ul className="mt-6 pt-5 border-t border-line-2 space-y-2.5">
                {plan.features.map((f) =>
                  f.startsWith('Everything') ? (
                    <li key={f} className="text-xs font-semibold text-ink-3">
                      {f}
                    </li>
                  ) : (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-2">
                      <Check size={15} className="text-accent mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <p className="reveal text-center text-[13px] text-ink-3 mt-6 mb-16">
          Every plan starts with a 14-day free trial of Pro — no credit card required.
        </p>

        {/* Detailed comparison matrix */}
        <div className="reveal mb-14">
          <p className="text-center font-mono text-sm font-semibold text-ink-3 uppercase tracking-widest mb-6">
            Compare plans in detail
          </p>
          <div className="overflow-x-auto pb-1">
            <div className="glass-card overflow-hidden min-w-[860px]">
              {/* Header row */}
              <div className={`${GRID} border-b border-line`}>
                <div className="px-5 py-4 flex items-center">
                  <span className="font-mono text-xs font-semibold tracking-wider uppercase text-ink-3">Feature</span>
                </div>
                {plans.map((plan) => (
                  <div
                    key={plan.key}
                    className={`px-3 py-3 text-center border-l border-line ${plan.highlight ? 'bg-surface-2' : ''}`}
                  >
                    <p className="font-bold text-sm text-ink mb-0.5">{plan.name}</p>
                    <span className="text-[13px] font-semibold text-ink">
                      ${yearly ? plan.annual : plan.monthly}
                      {plan.perSeat ? '/seat' : ''}/mo
                    </span>
                  </div>
                ))}
              </div>

              {/* Feature rows */}
              {featureRows.map((row) => (
                <div key={row.feature} className={`${GRID} border-b border-line-2`}>
                  <div className="px-5 py-3 flex items-center">
                    <span className="text-sm font-medium text-ink-2">{row.feature}</span>
                  </div>
                  {plans.map((plan, i) => (
                    <div
                      key={plan.key}
                      className={`px-3 py-3 flex items-center justify-center border-l ${
                        plan.highlight ? 'border-line bg-surface-2' : 'border-line-2'
                      }`}
                    >
                      <Cell value={row.values[i]} />
                    </div>
                  ))}
                </div>
              ))}

              {/* Footer CTA row */}
              <div className={`${GRID} bg-surface-2 border-t border-line`}>
                <div className="px-5 py-4 flex items-center">
                  <span className="text-[13px] text-ink-2">14-day free trial of Pro. No card required.</span>
                </div>
                {plans.map((plan) => (
                  <div key={plan.key} className="p-3 flex justify-center items-center border-l border-line">
                    <a
                      href={WAITLIST}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs font-semibold rounded-[9px] py-[7px] px-3.5 whitespace-nowrap transition-all ${
                        plan.highlight
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
        </div>

        {/* Add-ons */}
        <div className="reveal">
          <p className="text-center font-mono text-sm font-semibold text-ink-3 uppercase tracking-widest mb-6">
            Add-ons & metered usage
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {addOns.map((a) => (
              <div key={a.name} className="glass-card p-5 hover:border-line-3 transition-all">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="text-sm font-semibold text-ink">{a.name}</p>
                  <span className="text-sm font-bold text-accent whitespace-nowrap">{a.price}</span>
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
