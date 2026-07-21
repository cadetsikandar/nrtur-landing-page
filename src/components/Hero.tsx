'use client'

import { ArrowRight, Play, Sparkles, Clock, CreditCard, Unlock } from 'lucide-react'
import { useRotatingPhrase } from '../hooks/useRotatingPhrase'
import HeroDemoWindow from './hero/HeroDemoWindow'

const rotatingPhrases = [
  'actually want to use.',
  'set up in minutes.',
  'without the bloat.',
  'that closes more deals.',
  'that runs your follow-ups.',
  'with everything included.',
  'your team will love.',
]

const trustChips = [
  { icon: Clock, label: '14-day free trial', bg: 'bg-accent-soft', border: 'border-accent-line', color: 'text-accent-ink' },
  { icon: CreditCard, label: 'No credit card required', bg: 'bg-pos-soft', border: 'border-line', color: 'text-pos-ink' },
  { icon: Unlock, label: 'Cancel anytime', bg: 'bg-warn-soft', border: 'border-line', color: 'text-warn-ink' },
]

const stats = [
  { value: '$29', label: 'Per user·mo' },
  { value: '5 min', label: 'Average setup' },
  { value: '$0', label: 'Setup fees' },
  { value: '1–5', label: 'Team size it fits' },
]

export default function Hero() {
  const { phrase } = useRotatingPhrase(rotatingPhrases, 2800)

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden pt-16 bg-paper">
      {/* Background — flat and calm: one soft neutral top-glow, no colored wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,var(--surface-2),transparent_70%)]" />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-paper to-transparent" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Hero content */}
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 pt-24 pb-12 text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-surface border border-line rounded-full px-4 py-1.5 mb-8 animate-fade-up"
            style={{ animationFillMode: 'both' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
            <span className="text-ink-2 text-sm font-medium">Early access · New spots every week</span>
            <ArrowRight size={13} className="text-ink-3" />
          </div>

          {/* Headline */}
          <h1
            className="font-serif text-5xl sm:text-6xl lg:text-[76px] xl:text-[86px] font-medium tracking-[-0.02em] leading-[1.05] mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            <span className="text-ink">The CRM small teams</span>
            <br />
            <span key={phrase} className="hero-emph italic inline-block animate-word-in">
              {phrase}
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="max-w-[640px] mx-auto text-lg sm:text-xl text-ink-2 leading-relaxed mb-10 animate-fade-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            Everything you need to manage contacts, close deals, and automate follow-ups —
            without HubSpot's complexity or enterprise pricing. Built for teams of 1–5 who move fast.
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
            <button
              type="button"
              onClick={() =>
                document.getElementById('hero-demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
              className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto justify-center"
            >
              <div className="w-5 h-5 rounded-full bg-surface-3 flex items-center justify-center">
                <Play size={9} className="text-ink-3 ml-0.5" />
              </div>
              See it in action
            </button>
          </div>

          {/* Trust chips */}
          <div
            className="flex flex-wrap items-center justify-center gap-2.5 mb-7 animate-fade-up"
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
          >
            {trustChips.map(({ icon: Icon, label, bg, border, color }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2.5 bg-surface border border-line rounded-full pl-[7px] pr-4 py-1.5"
              >
                <span className={`w-[26px] h-[26px] rounded-full ${bg} border ${border} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={13} className={color} />
                </span>
                <span className="text-[13px] text-ink-3 font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Positioning line — honest at prototype stage (no fabricated proof) */}
          <div
            className="flex items-center justify-center gap-2.5 animate-fade-up"
            style={{ animationDelay: '0.45s', animationFillMode: 'both' }}
          >
            <Sparkles size={15} className="text-accent flex-shrink-0" />
            <p className="text-sm text-ink-3">
              Built for teams of 1–5 —{' '}
              <span className="text-ink-2 font-semibold">no bloat, no lock-in, no sales calls.</span>
            </p>
          </div>
        </div>

        {/* Interactive product demo */}
        <div
          id="hero-demo"
          className="max-w-[1152px] mx-auto w-full px-6 lg:px-8 scroll-mt-24 animate-fade-up"
          style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
        >
          <HeroDemoWindow />
        </div>

        {/* Stats bar */}
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 mt-16 mb-0">
          <div className="border-t border-line pt-10 pb-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-mono text-3xl font-bold tracking-tight text-ink mb-1">{stat.value}</p>
                <p className="text-sm text-ink-3">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-8" />
      </div>
    </section>
  )
}
