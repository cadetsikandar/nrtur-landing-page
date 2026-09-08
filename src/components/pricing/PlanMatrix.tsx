'use client'

import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { matrix, money, plans, yearlySavingPct, type MatrixValue } from '@/lib/pricing'

const GRID = 'grid grid-cols-[minmax(220px,1.5fr)_repeat(4,minmax(0,1fr))]'

function Cell({ value }: { value: MatrixValue }) {
  if (value === true) return <Check size={15} className="text-pos" aria-label="Included" />
  if (value === false)
    return (
      <span className="text-[13px] text-ink-4" aria-label="Not included">
        —
      </span>
    )
  return <span className="text-[13px] font-medium text-ink text-center">{value}</span>
}

/** Price rows sit above the feature bands and change with the billing toggle. */
function priceRows(yearly: boolean) {
  return [
    {
      label: yearly ? 'Per month, billed yearly' : 'Per month, billed monthly',
      values: plans.map((p) => money(yearly ? p.yearly : p.monthly)) as MatrixValue[],
    },
    {
      label: 'Each extra user',
      values: plans.map((p) => {
        const extra = yearly ? p.extraYearly : p.extraMonthly
        return extra === null ? false : `+${money(extra)}`
      }) as MatrixValue[],
    },
    {
      label: 'Saving when you pay yearly',
      values: plans.map((p) => `${yearlySavingPct(p)}%`) as MatrixValue[],
    },
    {
      label: 'Users',
      values: plans.map((p) =>
        p.maxUsers === 1 ? '1 only' : p.minUsers > 1 ? `${p.minUsers} or more` : '1 or more'
      ) as MatrixValue[],
    },
  ]
}

export default function PlanMatrix({ yearly }: { yearly: boolean }) {
  const [openPlan, setOpenPlan] = useState(0)
  const bands = [{ band: 'Price', rows: priceRows(yearly) }, ...matrix]

  return (
    <>
      {/* ---------- Desktop ---------- */}
      <div className="hidden lg:block overflow-x-auto pb-1">
        <div className="glass-card overflow-hidden min-w-[900px]">
          <div className={`${GRID} border-b border-line`}>
            <div className="px-5 py-4 flex items-end">
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-ink-3">
                Feature
              </span>
            </div>
            {plans.map((plan) => (
              <div
                key={plan.key}
                className={`px-3 py-3 text-center border-l border-line ${
                  plan.highlight ? 'bg-surface-2' : ''
                }`}
              >
                <p className="font-bold text-sm text-ink mb-0.5">{plan.name}</p>
                <span className="text-[13px] font-semibold font-mono tabular-nums text-ink">
                  {money(yearly ? plan.yearly : plan.monthly)}/mo
                </span>
              </div>
            ))}
          </div>

          {bands.map((group) => (
            <div key={group.band}>
              <div className={`${GRID} bg-surface-3 border-b border-line`}>
                <div className="px-5 py-2.5 col-span-5">
                  <span className="font-mono text-[11px] font-semibold tracking-widest uppercase text-ink-3">
                    {group.band}
                  </span>
                </div>
              </div>
              {group.rows.map((row) => (
                <div key={row.label} className={`${GRID} border-b border-line-2 last:border-b-0`}>
                  <div className="px-5 py-3 flex items-center">
                    <span className="text-sm font-medium text-ink-2">{row.label}</span>
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
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Mobile: one accordion per plan ---------- */}
      <div className="lg:hidden glass-card overflow-hidden">
        {plans.map((plan, planIndex) => {
          const isOpen = openPlan === planIndex
          return (
            <div key={plan.key} className="border-b border-line last:border-b-0">
              <button
                onClick={() => setOpenPlan((current) => (current === planIndex ? -1 : planIndex))}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="flex items-baseline gap-2.5">
                  <span className="text-base font-bold text-ink">{plan.name}</span>
                  <span className="text-[13px] font-mono tabular-nums text-ink-3">
                    {money(yearly ? plan.yearly : plan.monthly)}/mo
                  </span>
                </span>
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    isOpen
                      ? 'bg-accent-soft border border-accent-line rotate-180'
                      : 'bg-surface border border-line'
                  }`}
                >
                  <ChevronDown size={14} className={isOpen ? 'text-accent' : 'text-ink-4'} />
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5">
                  {bands.map((group) => (
                    <div key={group.band} className="mt-4 first:mt-0">
                      <p className="font-mono text-[11px] font-semibold tracking-widest uppercase text-ink-3 mb-1.5">
                        {group.band}
                      </p>
                      <dl>
                        {group.rows.map((row) => (
                          <div
                            key={row.label}
                            className="flex items-start justify-between gap-6 py-2 border-b border-line-2 last:border-b-0"
                          >
                            <dt className="text-[13px] text-ink-2">{row.label}</dt>
                            <dd className="flex-none">
                              <Cell value={row.values[planIndex]} />
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
