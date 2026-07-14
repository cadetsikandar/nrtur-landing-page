'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useRotatingPhrase } from '../hooks/useRotatingPhrase'
import { competitors, competitorOrder, type CompetitorId } from './compare-data'

const phrases = [
  'the big CRMs.',
  'the price tags.',
  'the enterprise bloat.',
  'the annual lock-ins.',
]


function CellValue({ value, highlight }: { value: string | boolean; highlight?: boolean }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${highlight ? 'bg-emerald-500/15' : 'bg-white/[0.06]'}`}>
          <Check size={13} className={highlight ? 'text-emerald-400' : 'text-white/40'} />
        </div>
      </div>
    )
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center">
          <X size={13} className="text-red-400/70" />
        </div>
      </div>
    )
  }
  return (
    <span className={`text-sm font-medium ${highlight ? 'text-emerald-400' : 'text-white/50'}`}>
      {value}
    </span>
  )
}

export default function ComparePage() {
  const [competitor, setCompetitor] = useState<CompetitorId>('hubspot')
  const ref = useScrollReveal()
  const { phrase } = useRotatingPhrase(phrases, 2800)

  const active = competitors[competitor]

  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-brand-600/15 -top-52 left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="section-label mb-4">
            <span>Compare</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.05] mb-5">
            <span className="text-white">nrtur vs</span>
            <br />
            <span key={phrase} className="text-brand-400 inline-block animate-word-in">
              {phrase}
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-white/45 leading-relaxed">
            Honest, side-by-side breakdowns — including the rows where the other tool wins.
            Pick your current CRM to see the trade-offs.
          </p>
        </div>
      </section>

      {/* Comparison tables */}
      <section className="relative pt-2 pb-24" ref={ref}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Competitor tabs */}
          <div className="reveal flex justify-center gap-2 flex-wrap mb-9">
            {competitorOrder.map((id) => {
              const isActive = id === competitor
              return (
                <button
                  key={id}
                  onClick={() => setCompetitor(id)}
                  className={`px-[18px] py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-500/15 border border-brand-500/30 text-brand-300 shadow-brand'
                      : 'bg-white/[0.03] border border-white/[0.06] text-white/40 hover:text-white/60'
                  }`}
                >
                  {competitors[id].tabLabel}
                </button>
              )
            })}
          </div>

          {/* Verdict chips */}
          <div className="flex justify-center gap-2.5 flex-wrap mb-6">
            {active.chips.map((chip) => (
              <span
                key={chip.label}
                className={`text-[13px] font-medium rounded-full px-3.5 py-1.5 border ${
                  chip.highlight
                    ? 'text-emerald-400 bg-emerald-500/[0.08] border-emerald-500/20'
                    : 'text-white/55 bg-white/[0.03] border-white/[0.08]'
                }`}
              >
                {chip.label}
              </span>
            ))}
          </div>

          {/* Table */}
          <div className="glass-card overflow-hidden">
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_180px_180px] border-b border-white/[0.06]">
              <div className="px-6 py-[18px] flex items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/30">Feature</span>
              </div>
              <div className="px-4 py-[14px] text-center border-l border-brand-500/20 bg-brand-500/[0.06]">
                <div className="flex items-center justify-center gap-2 mb-0.5">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center">
                    <span className="text-white font-black text-[9px]">n</span>
                  </div>
                  <span className="font-bold text-white text-sm">nrtur</span>
                </div>
                <span className="text-[11px] text-brand-400 font-medium">{active.nrturPrice}</span>
              </div>
              <div className="px-4 py-[14px] text-center border-l border-white/[0.06] flex flex-col justify-center">
                <p className="mb-0.5 font-semibold text-white/40 text-sm">{active.name}</p>
                <span className="text-[11px] text-white/25">{active.competitorPrice}</span>
              </div>
            </div>

            {/* Rows */}
            {active.rows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-[1fr_180px_180px] border-b border-white/[0.04] last:border-b-0"
              >
                <div className="px-6 py-[14px] flex items-center">
                  <span className="text-sm text-white/60">{row.feature}</span>
                </div>
                <div className="px-4 py-[14px] flex items-center justify-center border-l border-brand-500/10 bg-brand-500/[0.03]">
                  <CellValue value={row.nrtur} highlight={row.nrturHighlight} />
                </div>
                <div className="px-4 py-[14px] flex items-center justify-center border-l border-white/[0.04]">
                  <CellValue value={row.competitor} highlight={row.competitorHighlight} />
                </div>
              </div>
            ))}

            {/* Verdict row */}
            <div className="grid grid-cols-[1fr_180px_180px] bg-brand-500/[0.04] border-t border-brand-500/15">
              <div className="px-6 py-[18px] flex items-center">
                <span className="text-[13px] text-white/40">{active.verdict}</span>
              </div>
              <div className="px-4 py-[14px] flex justify-center items-center border-l border-brand-500/15">
                <a
                  href="https://forms.gle/sb2mHm97oRNFRmUY9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-[13px] py-2 px-[18px] whitespace-nowrap"
                >
                  Join waitlist
                </a>
              </div>
              <div className="px-4 py-[14px] flex justify-center items-center border-l border-white/[0.06]">
                <span className="text-[13px] text-white/25">{active.stayLabel}</span>
              </div>
            </div>
          </div>

          <p className="text-center mt-8 text-xs text-white/25">
            Competitor pricing from public pricing pages, July 2026. Tiers compared at closest feature parity.
          </p>
        </div>
      </section>
    </>
  )
}
