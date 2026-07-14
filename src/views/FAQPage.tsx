'use client'

import { useState } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useRotatingPhrase } from '../hooks/useRotatingPhrase'
import { faqs } from '../lib/schema'

const phrases = ['need to know.', 'wanted to ask.', 'before switching.']


function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <p className="text-base font-semibold text-white/80 group-hover:text-white transition-colors">{q}</p>
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            isOpen
              ? 'bg-brand-500/15 border border-brand-500/25 rotate-180'
              : 'bg-white/[0.04] border border-white/[0.06]'
          }`}
        >
          <ChevronDown size={14} className={`transition-colors ${isOpen ? 'text-brand-400' : 'text-white/30'}`} />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-base text-white/45 leading-relaxed pr-12">{a}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const ref = useScrollReveal()
  const { phrase } = useRotatingPhrase(phrases)
  const [openFaq, setOpenFaq] = useState(-1)

  return (
    <>
      {/* Header */}
      <section className="relative pt-36 pb-10 overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-brand-600/15 -top-[200px] left-1/2 -translate-x-1/2" />

        <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="reveal section-label mb-4">
            <span>FAQ</span>
          </div>
          <h1 className="reveal reveal-delay-1 text-5xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-5">
            <span className="text-white">Everything you</span>
            <br />
            <span key={phrase} className="text-brand-400 animate-word-in">
              {phrase}
            </span>
          </h1>
          <p className="reveal reveal-delay-2 max-w-[520px] mx-auto text-lg text-white/45 leading-relaxed">
            Can't find what you're looking for?{' '}
            <a href="#" className="text-brand-400 hover:text-brand-300 transition-colors">
              Chat with us
            </a>{' '}
            — we reply within minutes.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="relative pt-4 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="glass-card px-7">
            {faqs.map((item, i) => (
              <FAQItem
                key={item.q}
                q={item.q}
                a={item.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq((current) => (current === i ? -1 : i))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Still stuck CTA */}
      <section className="pb-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-brand-500/[0.06] border border-brand-500/[0.15] rounded-[20px] px-8 py-9 text-center">
            <div className="orb w-[300px] h-[300px] bg-brand-500/[0.12] blur-[80px] -top-[150px] left-1/2 -translate-x-1/2" />
            <div className="relative">
              <h2 className="text-2xl font-extrabold tracking-tight text-white mb-2">Still have a question?</h2>
              <p className="text-sm text-white/40 mb-5">Ask us anything — a founder reads every message.</p>
              <a
                href="https://forms.gle/sb2mHm97oRNFRmUY9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm py-[11px] px-6"
              >
                Join waitlist
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
