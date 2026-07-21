'use client'

import { useScrollReveal } from '../hooks/useScrollReveal'
import { Star, Quote } from 'lucide-react'

// Real early-access clients. The quotes below are DRAFTS that capture the
// sentiment we've heard — replace each with the client's actual words and a
// named contact, and get their sign-off, before treating this as published.
const testimonials = [
  {
    quote:
      'We manage systems for our own clients, so our CRM had to stay out of the way. nrtur got us tracking every deal and follow-up in an afternoon — no bloated setup, just the parts a small team actually uses.',
    company: 'DevAXL',
    role: 'Early-access partner',
    avatar: 'DX',
    color: 'bg-avatar-blue',
    stars: 5,
  },
  {
    quote:
      'We were running our pipeline across spreadsheets and email and kept losing track of follow-ups. Having everything in one place we actually like opening has been the difference for us.',
    company: 'Prowork',
    role: 'Early-access partner',
    avatar: 'PW',
    color: 'bg-avatar-violet',
    stars: 5,
  },
  {
    quote:
      "Every other CRM felt built for teams ten times our size. nrtur is the first one that didn't make us pay for — or dig through — features we'll never touch.",
    company: 'Nawaytech',
    role: 'Early-access partner',
    avatar: 'NT',
    color: 'bg-avatar-green',
    stars: 5,
  },
  {
    quote:
      'As a growing clothing brand, our real deals are wholesale buyers and stockists — and I was tracking them across my inbox and notes. nrtur put every buyer and supplier conversation in one pipeline, so nothing slips between drops.',
    company: 'MinsaBloom',
    role: 'Early-access partner · Fashion ecommerce',
    avatar: 'MB',
    color: 'bg-avatar-pink',
    stars: 5,
  },
]

export default function Testimonials() {
  const ref = useScrollReveal()

  return (
    <section className="py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-paper" />
      <div className="orb w-[600px] h-[600px] bg-surface-2 top-0 left-1/2 -translate-x-1/2 absolute pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal section-label mb-4"><span>Early access</span></div>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-serif font-semibold tracking-tight text-ink mb-5">
            The first teams<br />building on nrtur
          </h2>
          <p className="reveal reveal-delay-2 max-w-xl mx-auto text-lg text-ink-2 leading-relaxed">
            A few of the teams already running their pipelines on nrtur in early access.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.company}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} group glass-card p-7 flex flex-col hover:border-line-3 hover:-translate-y-1 hover:shadow-md transition-all duration-300`}
            >
              {/* Stars */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-0.5">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} size={13} className="text-warn fill-warn" />
                  ))}
                </div>
                <Quote size={16} className="text-accent-line group-hover:text-accent transition-colors" />
              </div>

              {/* Quote */}
              <p className="text-[14px] text-ink-2 leading-relaxed mb-6 flex-1">"{t.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-sm font-bold text-on-solid flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink leading-none mb-0.5">{t.company}</p>
                  <p className="text-[12px] text-ink-3">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
