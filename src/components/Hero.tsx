'use client'

import { ArrowRight, Play, Star, Clock, CreditCard, Unlock } from 'lucide-react'
import { useRotatingPhrase } from '../hooks/useRotatingPhrase'
import HeroDemoWindow from './hero/HeroDemoWindow'

const rotatingPhrases = [
  'actually want to use.',
  'set up in minutes.',
  'without the bloat.',
  'that closes more deals.',
  'that runs your follow-ups.',
  'at a fraction of the price.',
  'your team will love.',
]

const trustChips = [
  { icon: Clock, label: '14-day free trial', bg: 'bg-brand-500/[0.15]', border: 'border-brand-500/20', color: 'text-brand-400' },
  { icon: CreditCard, label: 'No credit card required', bg: 'bg-emerald-500/[0.14]', border: 'border-emerald-500/20', color: 'text-emerald-400' },
  { icon: Unlock, label: 'Cancel anytime', bg: 'bg-amber-500/[0.14]', border: 'border-amber-500/20', color: 'text-amber-400' },
]

const proofAvatars = [
  { initials: 'SC', color: 'bg-blue-500' },
  { initials: 'MR', color: 'bg-violet-500' },
  { initials: 'JW', color: 'bg-emerald-500' },
  { initials: 'PK', color: 'bg-amber-500' },
  { initials: 'LN', color: 'bg-pink-500' },
]

const stats = [
  { value: '2,400+', label: 'Teams' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '$29', label: 'Per user·mo' },
  { value: '5 min', label: 'Setup' },
]

export default function Hero() {
  const { phrase } = useRotatingPhrase(rotatingPhrases, 2800)

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden pt-16 bg-[#07070f]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-[600px] h-[600px] bg-brand-600/20 -top-40 -left-40" />
        <div className="orb w-[500px] h-[500px] bg-violet-700/15 -top-20 right-0" />
        <div className="orb w-[400px] h-[400px] bg-indigo-800/10 top-1/2 left-1/3" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.08),transparent)]" />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#07070f] to-transparent" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Hero content */}
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 pt-24 pb-12 text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 mb-8 animate-fade-up"
            style={{ animationFillMode: 'both' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse-dot" />
            <span className="text-brand-300 text-sm font-medium">Early access · New spots every week</span>
            <ArrowRight size={13} className="text-brand-400" />
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-[76px] font-black tracking-tight leading-[1.05] mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            <span className="text-white">The CRM small teams</span>
            <br />
            <span key={phrase} className="text-brand-400 inline-block animate-word-in">
              {phrase}
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="max-w-[640px] mx-auto text-lg sm:text-xl text-white/[0.58] leading-relaxed mb-10 animate-fade-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            Everything you need to manage contacts, close deals, and automate follow-ups —
            without HubSpot's complexity or price tag. Built for teams of 1–5 who move fast.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fade-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            <a
              href="https://forms.gle/sb2mHm97oRNFRmUY9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto justify-center"
            >
              Join waitlist
              <ArrowRight size={16} />
            </a>
            <a
              href="https://forms.gle/sb2mHm97oRNFRmUY9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto justify-center"
            >
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                <Play size={9} className="text-white/60 ml-0.5" />
              </div>
              Watch demo
            </a>
          </div>

          {/* Trust chips */}
          <div
            className="flex flex-wrap items-center justify-center gap-2.5 mb-7 animate-fade-up"
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
          >
            {trustChips.map(({ icon: Icon, label, bg, border, color }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.07] rounded-full pl-[7px] pr-4 py-1.5"
              >
                <span className={`w-[26px] h-[26px] rounded-full ${bg} border ${border} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={13} className={color} />
                </span>
                <span className="text-[13px] text-white/60 font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Proof row */}
          <div
            className="flex items-center justify-center gap-[18px] animate-fade-up"
            style={{ animationDelay: '0.45s', animationFillMode: 'both' }}
          >
            <div className="flex">
              {proofAvatars.map((a, i) => (
                <span
                  key={a.initials}
                  className={`w-7 h-7 rounded-full ${a.color} border-2 border-[#07070f] flex items-center justify-center text-[9px] font-bold text-white ${i > 0 ? '-ml-2' : ''}`}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <div className="w-px h-[26px] bg-white/10" />
            <div className="text-left">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                ))}
                <span className="text-xs font-bold text-white ml-1">4.9/5</span>
              </div>
              <p className="text-xs text-white/40 mt-0.5">
                Loved by <span className="text-white/75 font-semibold">2,400+ small teams</span> in early access
              </p>
            </div>
          </div>
        </div>

        {/* Interactive product demo */}
        <div
          className="max-w-[1152px] mx-auto w-full px-6 lg:px-8 animate-fade-up"
          style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
        >
          <HeroDemoWindow />
        </div>

        {/* Stats bar */}
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 mt-16 mb-0">
          <div className="border-t border-white/[0.06] pt-10 pb-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black gradient-text-brand mb-1">{stat.value}</p>
                <p className="text-sm text-white/35">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-8" />
      </div>
    </section>
  )
}
