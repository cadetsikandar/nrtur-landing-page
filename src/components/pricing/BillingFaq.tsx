'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { pricingFaqs } from '@/lib/pricing-faq'

export default function BillingFaq() {
  const [open, setOpen] = useState(-1)

  return (
    <div className="glass-card px-7">
      {pricingFaqs.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className="border-b border-line last:border-b-0">
            <button
              onClick={() => setOpen((current) => (current === i ? -1 : i))}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-5 text-left group"
            >
              <p className="text-base font-semibold text-ink-2 group-hover:text-ink transition-colors">
                {item.q}
              </p>
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
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-[32rem] opacity-100 pb-5' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-base text-ink-2 leading-relaxed pr-12">{item.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
