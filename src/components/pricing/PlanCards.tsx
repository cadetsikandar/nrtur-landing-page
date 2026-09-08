import { Check } from 'lucide-react'
import { WAITLIST_URL } from '@/lib/links'
import { money, plans, seatsTotal, type Plan } from '@/lib/pricing'

function priceFootnote(plan: Plan, yearly: boolean) {
  if (!yearly) return 'billed monthly'
  const saved = (plan.monthly - plan.yearly) * 12
  return `billed ${money(plan.yearly * 12)}/yr — you save ${money(saved)}`
}

function seatNote(plan: Plan, yearly: boolean) {
  const extra = yearly ? plan.extraYearly : plan.extraMonthly
  if (extra === null) return 'Solo is a single-person plan'
  if (plan.minUsers > 1) {
    return `+${money(extra)} per extra user · from ${money(
      seatsTotal(plan, plan.minUsers, yearly)
    )}/mo for ${plan.minUsers}`
  }
  return `+${money(extra)} per extra user`
}

export default function PlanCards({ yearly }: { yearly: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
      {plans.map((plan) => (
        <div
          key={plan.key}
          className={`glass-card p-6 flex flex-col relative h-full ${
            plan.highlight ? 'border-accent shadow-pop xl:-translate-y-2' : ''
          }`}
        >
          {/* Reserved height so every card's name sits on the same line */}
          <div className="h-6 mb-1">
            {plan.badge && (
              <span
                className={`inline-flex items-center text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-pill ${
                  plan.highlight
                    ? 'bg-accent text-on-solid'
                    : 'bg-surface-3 text-ink-3 border border-line'
                }`}
              >
                {plan.badge}
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-ink">{plan.name}</h3>
          <p className="text-[13px] text-ink-3 mt-0.5 mb-4">{plan.tagline}</p>

          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold font-mono tabular-nums text-ink tracking-tight">
              {money(yearly ? plan.yearly : plan.monthly)}
            </span>
            <span className="text-sm text-ink-3">/mo</span>
          </div>
          <p className="mt-1.5 text-xs text-ink-3">{priceFootnote(plan, yearly)}</p>
          <p className="mt-1 mb-5 text-xs font-medium text-accent-ink">{seatNote(plan, yearly)}</p>

          <a
            href={WAITLIST_URL}
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
  )
}
