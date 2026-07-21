'use client'

import { ArrowRight, Clock, CreditCard, Unlock, ArrowRightLeft } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const trustChips = [
  { icon: Clock, label: '14-day free trial', bg: 'bg-accent-soft', border: 'border-accent-line', iconColor: 'text-accent-ink' },
  { icon: CreditCard, label: 'No credit card required', bg: 'bg-pos-soft', border: 'border-line', iconColor: 'text-pos-ink' },
  { icon: Unlock, label: 'Cancel anytime', bg: 'bg-warn-soft', border: 'border-line', iconColor: 'text-warn-ink' },
  { icon: ArrowRightLeft, label: 'Free data migration help', bg: 'bg-violet-soft', border: 'border-line', iconColor: 'text-violet-ink' },
]

export default function FinalCTA() {
  const ref = useScrollReveal()

  return (
    <section className="py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-surface-2" />

      {/* Glow orbs */}
      <div className="orb w-[700px] h-[700px] bg-surface-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute pointer-events-none" />
      <div className="orb w-96 h-96 bg-surface-2 top-1/2 left-1/4 -translate-y-1/2 absolute pointer-events-none" />
      <div className="orb w-96 h-96 bg-surface-2 top-1/2 right-1/4 -translate-y-1/2 absolute pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent,var(--surface-2)_80%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="reveal inline-flex items-center gap-2 bg-surface border border-line rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-glow-pulse" />
          <span className="text-ink-2 text-sm font-medium">Early access · Limited spots remaining</span>
        </div>

        {/* Headline */}
        <h2 className="reveal reveal-delay-1 font-serif text-5xl sm:text-6xl lg:text-[68px] font-semibold tracking-tight leading-[1.05] text-ink mb-6">
          Your team deserves<br />a better CRM.
        </h2>

        <p className="reveal reveal-delay-2 max-w-2xl mx-auto text-xl text-ink-2 leading-relaxed mb-10">
          Stop paying for features you'll never use. Stop fighting your CRM instead of closing deals.
          Start your free trial today and feel the difference in the first hour.
        </p>

        {/* CTA */}
        <div className="reveal reveal-delay-3 flex justify-center gap-3 mb-8">
          <a
            href="https://forms.gle/sb2mHm97oRNFRmUY9"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-7 py-3.5 whitespace-nowrap justify-center"
          >
            Join waitlist
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Trust chips */}
        <div className="reveal reveal-delay-4 flex flex-wrap items-center justify-center gap-2.5">
          {trustChips.map(({ icon: Icon, label, bg, border, iconColor }) => (
            <div
              key={label}
              className="inline-flex items-center gap-[9px] bg-surface border border-line rounded-full py-1.5 pl-[7px] pr-4"
            >
              <span className={`w-[26px] h-[26px] rounded-full ${bg} border ${border} inline-flex items-center justify-center flex-shrink-0`}>
                <Icon size={13} className={iconColor} />
              </span>
              <span className="text-[13px] text-ink-3 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
