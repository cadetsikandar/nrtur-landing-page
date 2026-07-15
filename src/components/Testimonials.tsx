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
    color: 'bg-blue-500',
    stars: 5,
  },
  {
    quote:
      'We were running our pipeline across spreadsheets and email and kept losing track of follow-ups. Having everything in one place we actually like opening has been the difference for us.',
    company: 'Prowork',
    role: 'Early-access partner',
    avatar: 'PW',
    color: 'bg-violet-500',
    stars: 5,
  },
  {
    quote:
      "Every other CRM felt built for teams ten times our size. nrtur is the first one that didn't make us pay for — or dig through — features we'll never touch.",
    company: 'Nawaytech',
    role: 'Early-access partner',
    avatar: 'NT',
    color: 'bg-emerald-500',
    stars: 5,
  },
]

export default function Testimonials() {
  const ref = useScrollReveal()

  return (
    <section className="py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-[#07070f]" />
      <div className="orb w-[600px] h-[600px] bg-brand-600/8 top-0 left-1/2 -translate-x-1/2 absolute pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal section-label mb-4"><span>Early access</span></div>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-black tracking-tight gradient-text mb-5">
            The first teams<br />building on nrtur
          </h2>
          <p className="reveal reveal-delay-2 max-w-xl mx-auto text-lg text-white/40 leading-relaxed">
            A few of the teams already running their pipelines on nrtur in early access.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.company}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} group glass-card p-7 flex flex-col hover:border-white/10 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300`}
            >
              {/* Stars */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-0.5">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <Quote size={16} className="text-brand-500/40 group-hover:text-brand-500/60 transition-colors" />
              </div>

              {/* Quote */}
              <p className="text-[14px] text-white/55 leading-relaxed mb-6 flex-1">"{t.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-none mb-0.5">{t.company}</p>
                  <p className="text-[12px] text-white/35">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
