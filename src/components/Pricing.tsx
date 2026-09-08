'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import PlanCards from './pricing/PlanCards'
import { MAX_YEARLY_SAVING_PCT, TRIAL_DAYS, TRIAL_USERS } from '../lib/pricing'

/** Homepage teaser. The full rate card — add-ons, the wallet, the comparison matrix and the
 *  billing rules — lives at /pricing/, and src/lib/pricing.ts is the source for both. */
export default function Pricing() {
  const [yearly, setYearly] = useState(true)
  const ref = useScrollReveal()

  return (
    <section id="pricing" className="py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-surface-2" />
      <div className="orb w-[500px] h-[500px] bg-surface-2 top-0 right-0 absolute pointer-events-none" />
      <div className="orb w-96 h-96 bg-surface-2 bottom-0 left-0 absolute pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="reveal section-label mb-4">
            <span>Pricing</span>
          </div>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-serif font-semibold tracking-tight text-ink mb-5">
            Honest pricing.
            <br />
            No surprises.
          </h2>
          <p className="reveal reveal-delay-2 max-w-xl mx-auto text-lg text-ink-2 leading-relaxed mb-8">
            A mailbox and a phone line for every user, inside the plan. Calls and texts come out of a
            prepaid balance, so nothing bills you after the money runs out.
          </p>

          <div className="reveal reveal-delay-3 inline-flex items-center gap-3 bg-surface border border-line rounded-pill p-1">
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

        <div className="reveal reveal-delay-4">
          <PlanCards yearly={yearly} />
        </div>

        <div className="reveal text-center mt-8">
          <p className="text-[13px] text-ink-3 mb-5">
            Every plan starts with a {TRIAL_DAYS}-day free trial of Pro, for up to {TRIAL_USERS}{' '}
            users — no card to start.
          </p>
          <Link href="/pricing/" className="btn-secondary text-sm py-2.5 px-5">
            See the full rate card
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
