'use client'

import { ArrowRight, Clock, CreditCard, Unlock, ArrowRightLeft } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const trustChips = [
  { icon: Clock, label: '14-day free trial', bg: 'bg-brand-500/[0.15]', border: 'border-brand-500/20', iconColor: 'text-brand-400' },
  { icon: CreditCard, label: 'No credit card required', bg: 'bg-emerald-500/[0.14]', border: 'border-emerald-500/20', iconColor: 'text-emerald-400' },
  { icon: Unlock, label: 'Cancel anytime', bg: 'bg-amber-500/[0.14]', border: 'border-amber-500/20', iconColor: 'text-amber-400' },
  { icon: ArrowRightLeft, label: 'Free data migration help', bg: 'bg-violet-500/[0.14]', border: 'border-violet-500/20', iconColor: 'text-violet-400' },
]

export default function FinalCTA() {
  const ref = useScrollReveal()

  return (
    <section className="py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[#09091a]" />

      {/* Glow orbs */}
      <div className="orb w-[700px] h-[700px] bg-brand-600/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute pointer-events-none" />
      <div className="orb w-96 h-96 bg-violet-600/10 top-1/2 left-1/4 -translate-y-1/2 absolute pointer-events-none" />
      <div className="orb w-96 h-96 bg-indigo-600/10 top-1/2 right-1/4 -translate-y-1/2 absolute pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent,#09091a_80%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="reveal inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-glow-pulse" />
          <span className="text-brand-300 text-sm font-medium">Early access · Limited spots remaining</span>
        </div>

        {/* Headline */}
        <h2 className="reveal reveal-delay-1 text-5xl sm:text-6xl lg:text-[68px] font-black tracking-tight leading-[1.05] text-white mb-6">
          Your team deserves<br />a better CRM.
        </h2>

        <p className="reveal reveal-delay-2 max-w-2xl mx-auto text-xl text-white/45 leading-relaxed mb-10">
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
              className="inline-flex items-center gap-[9px] bg-white/[0.03] border border-white/[0.07] rounded-full py-1.5 pl-[7px] pr-4"
            >
              <span className={`w-[26px] h-[26px] rounded-full ${bg} border ${border} inline-flex items-center justify-center flex-shrink-0`}>
                <Icon size={13} className={iconColor} />
              </span>
              <span className="text-[13px] text-white/60 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
