'use client'

import { useState } from 'react'
import { Check, X, Plus, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useRotatingPhrase } from '../hooks/useRotatingPhrase'
import {
  crmProfiles,
  narratives,
  competitorOrder,
  FEATURES,
  type CrmId,
  type CompetitorId,
} from './compare-data'

const phrases = [
  'the big CRMs.',
  'the price tags.',
  'the enterprise bloat.',
  'the annual lock-ins.',
]

function CellValue({ value, highlight }: { value: string; highlight?: boolean }) {
  if (value === '✓' || value === 'true') {
    return (
      <div className="flex justify-center">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center ${
            highlight ? 'bg-emerald-500/15' : 'bg-white/[0.06]'
          }`}
        >
          <Check size={13} className={highlight ? 'text-emerald-400' : 'text-white/40'} />
        </div>
      </div>
    )
  }
  if (value === '✗' || value === 'false') {
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
  const [primary, setPrimary] = useState<CompetitorId>('hubspot')
  const [secondary, setSecondary] = useState<CompetitorId | null>(null)
  const ref = useScrollReveal()
  const { phrase } = useRotatingPhrase(phrases, 2800)

  // nrtur is always the anchor column; then the primary competitor, then an
  // optional second competitor so people can weigh two rivals side by side.
  const cols: CrmId[] = ['nrtur', primary, ...(secondary ? [secondary] : [])]
  const gridTemplate = `minmax(132px,1.4fr) ${cols.map(() => 'minmax(104px,1fr)').join(' ')}`
  const minWidth = 132 + cols.length * 118

  const narrative = narratives[primary]

  function choosePrimary(id: CompetitorId) {
    setPrimary(id)
    if (secondary === id) setSecondary(null)
  }

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
            Pick your current CRM, and add a second to weigh them against each other.
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section className="relative pt-2 pb-24" ref={ref}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Primary competitor tabs */}
          <div className="reveal flex justify-center gap-2 flex-wrap mb-4">
            {competitorOrder.map((id) => {
              const isActive = id === primary
              return (
                <button
                  key={id}
                  onClick={() => choosePrimary(id)}
                  className={`px-[18px] py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-500/15 border border-brand-500/30 text-brand-300 shadow-brand'
                      : 'bg-white/[0.03] border border-white/[0.06] text-white/40 hover:text-white/60'
                  }`}
                >
                  {crmProfiles[id].tabLabel}
                </button>
              )
            })}
          </div>

          {/* Optional 2nd competitor (adds a 3rd column) */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap mb-8">
            <span className="text-[13px] text-white/30 mr-1">Add another to compare:</span>
            {competitorOrder
              .filter((id) => id !== primary)
              .map((id) => {
                const isOn = secondary === id
                return (
                  <button
                    key={id}
                    onClick={() => setSecondary(isOn ? null : id)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                      isOn
                        ? 'bg-violet-500/15 border border-violet-500/30 text-violet-300'
                        : 'bg-white/[0.03] border border-white/[0.06] text-white/40 hover:text-white/60'
                    }`}
                  >
                    {isOn ? <Check size={12} /> : <Plus size={12} />}
                    {crmProfiles[id].name}
                  </button>
                )
              })}
          </div>

          {/* Verdict chips (about the primary matchup) */}
          <div className="flex justify-center gap-2.5 flex-wrap mb-6">
            {narrative.chips.map((chip) => (
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

          {/* Table (scrolls horizontally on small screens instead of clipping) */}
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <div style={{ minWidth }}>
                {/* Column headers */}
                <div
                  className="grid border-b border-white/[0.06]"
                  style={{ gridTemplateColumns: gridTemplate }}
                >
                  <div className="px-5 py-[18px] flex items-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/30">
                      Feature
                    </span>
                  </div>
                  {cols.map((id) => {
                    const p = crmProfiles[id]
                    return (
                      <div
                        key={id}
                        className={`px-3 py-[14px] text-center border-l ${
                          p.accent
                            ? 'border-brand-500/20 bg-brand-500/[0.06]'
                            : 'border-white/[0.06]'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1.5 mb-0.5">
                          {p.accent && (
                            <span className="w-5 h-5 rounded-md bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center">
                              <span className="text-white font-black text-[9px]">n</span>
                            </span>
                          )}
                          <span
                            className={
                              p.accent
                                ? 'font-bold text-white text-sm'
                                : 'font-semibold text-white/50 text-sm'
                            }
                          >
                            {p.name}
                          </span>
                        </div>
                        <span
                          className={`text-[11px] ${p.accent ? 'text-brand-400 font-medium' : 'text-white/25'}`}
                        >
                          {p.price}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Feature rows */}
                {FEATURES.map((f) => (
                  <div
                    key={f.key}
                    className="grid border-b border-white/[0.04] last:border-b-0"
                    style={{ gridTemplateColumns: gridTemplate }}
                  >
                    <div className="px-5 py-[14px] flex items-center">
                      <span className="text-sm text-white/60">{f.label}</span>
                    </div>
                    {cols.map((id) => {
                      const p = crmProfiles[id]
                      return (
                        <div
                          key={id}
                          className={`px-3 py-[14px] flex items-center justify-center text-center border-l ${
                            p.accent
                              ? 'border-brand-500/10 bg-brand-500/[0.03]'
                              : 'border-white/[0.04]'
                          }`}
                        >
                          <CellValue value={p.values[f.key]} highlight={p.wins.includes(f.key)} />
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verdict + CTA band */}
          <div className="mt-8 relative overflow-hidden bg-brand-500/[0.05] border border-brand-500/[0.15] rounded-2xl px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center gap-5">
            <p className="text-[15px] text-white/55 leading-relaxed flex-1 text-center sm:text-left">
              {narrative.verdict}
            </p>
            <a
              href="https://forms.gle/sb2mHm97oRNFRmUY9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-[11px] px-6 whitespace-nowrap flex-shrink-0"
            >
              Join waitlist
              <ArrowRight size={15} />
            </a>
          </div>

          <p className="text-center mt-8 text-xs text-white/25">
            Competitor pricing from public pricing pages, July 2026. Tiers compared at closest
            feature parity.
          </p>
        </div>
      </section>
    </>
  )
}
