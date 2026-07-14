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
    return <Check size={14} className="text-emerald-400" />
  }
  if (value === false) {
    return <span className="text-[13px] text-white/20">—</span>
  }
  return (
    <span className={`text-[13px] text-center ${tinted ? 'font-medium text-white/75' : 'text-white/55'}`}>
      {value}
    </span>
  )
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false)
  const ref = useScrollReveal()

  return (
    <section id="pricing" className="py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-[#09091a]" />
      <div className="orb w-[500px] h-[500px] bg-brand-600/10 top-0 right-0 absolute pointer-events-none" />
      <div className="orb w-96 h-96 bg-violet-600/8 bottom-0 left-0 absolute pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="reveal section-label mb-4"><span>Pricing</span></div>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-black tracking-tight text-white mb-5">
            Honest pricing.<br />No surprises.
          </h2>
          <p className="reveal reveal-delay-2 max-w-xl mx-auto text-lg text-white/40 leading-relaxed mb-8">
            Everything is month-to-month. No annual lock-in, no enterprise sales calls.
            Just pick a plan and start using it today.
          </p>

          {/* Toggle */}
          <div className="reveal reveal-delay-3 inline-flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-full p-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                !yearly ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                yearly ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
              }`}
            >
              Yearly
              <span className="text-[11px] bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plan comparison matrix */}
        <div className="reveal reveal-delay-4 mb-14">
          <p className="text-center text-sm font-semibold text-white/30 uppercase tracking-widest mb-6">
            Compare plans in detail
          </p>
          <div className="glass-card overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_150px_150px_150px] border-b border-white/[0.06]">
              <div className="px-6 py-[18px] flex items-center">
                <span className="text-xs font-semibold tracking-wider uppercase text-white/30">Feature</span>
              </div>
              {plans.map((plan) => (
                <div
                  key={plan.key}
                  className={`px-3 py-[14px] text-center border-l ${
                    plan.tinted ? 'border-brand-500/20 bg-brand-500/[0.06]' : 'border-white/[0.06]'
                  }`}
                >
                  <p className={`font-bold text-sm mb-0.5 ${plan.tinted ? 'text-brand-300' : 'text-white'}`}>{plan.name}</p>
                  <span className={`text-[11px] ${plan.tinted ? 'text-brand-400' : 'text-white/35'}`}>
                    ${yearly ? plan.yearlyPrice : plan.monthlyPrice}/user/mo
                  </span>
                  {yearly && (
                    <p className="mt-[3px] text-[10px] text-emerald-400">
                      Billed ${plan.yearlyPrice * 12}/yr per user
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Feature rows */}
            {featureRows.map((row) => (
              <div key={row.feature} className="grid grid-cols-[1fr_150px_150px_150px] border-b border-white/[0.04]">
                <div className="px-6 py-[13px] flex items-center">
                  <span className="text-sm text-white/60">{row.feature}</span>
                </div>
                {plans.map((plan, i) => (
                  <div
                    key={plan.key}
                    className={`px-3 py-[13px] flex items-center justify-center border-l ${
                      plan.tinted ? 'border-brand-500/[0.12] bg-brand-500/[0.04]' : 'border-white/[0.04]'
                    }`}
                  >
                    <Cell value={row.values[i]} tinted={plan.tinted} />
                  </div>
                ))}
              </div>
            ))}

            {/* Footer CTA row */}
            <div className="grid grid-cols-[1fr_150px_150px_150px] bg-brand-500/[0.04] border-t border-brand-500/15">
              <div className="px-6 py-4 flex items-center">
                <span className="text-[13px] text-white/35">Every plan starts with a 14-day free trial.</span>
              </div>
              {plans.map((plan) => (
                <div
                  key={plan.key}
                  className={`p-3 flex justify-center items-center border-l ${
                    plan.tinted ? 'border-brand-500/15' : 'border-white/[0.06]'
                  }`}
                >
                  <a
                    href="https://forms.gle/sb2mHm97oRNFRmUY9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs font-semibold rounded-[9px] py-[7px] px-3.5 whitespace-nowrap transition-all ${
                      plan.tinted
                        ? 'bg-brand-500 hover:bg-brand-400 text-white shadow-brand hover:-translate-y-0.5'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white font-medium'
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
          <p className="text-center text-sm font-semibold text-white/30 uppercase tracking-widest mb-6">Add-ons</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {addOns.map((a) => (
              <div key={a.name} className="glass-card p-5 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-white/70">{a.name}</p>
                  <span className="text-sm font-bold text-brand-400">{a.price}</span>
                </div>
                <p className="text-xs text-white/30">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
