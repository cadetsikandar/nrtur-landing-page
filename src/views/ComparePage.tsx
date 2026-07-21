'use client'

import { useState } from 'react'
import { Check, X, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  crmProfiles,
  narratives,
  competitorOrder,
  matchups,
  FEATURES,
  type CrmId,
  type CompetitorId,
} from './compare-data'

function CellValue({ value, highlight }: { value: string; highlight?: boolean }) {
  if (value === '✓' || value === 'true') {
    return (
      <div className="flex justify-center">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center ${
            highlight ? 'bg-pos-soft' : 'bg-surface-2'
          }`}
        >
          <Check size={13} className={highlight ? 'text-pos' : 'text-ink-4'} />
        </div>
      </div>
    )
  }
  if (value === '✗' || value === 'false') {
    return (
      <div className="flex justify-center">
        <div className="w-6 h-6 rounded-full bg-neg-soft flex items-center justify-center">
          <X size={13} className="text-neg" />
        </div>
      </div>
    )
  }
  return (
    <span className={`text-sm font-medium ${highlight ? 'text-pos' : 'text-ink-3'}`}>
      {value}
    </span>
  )
}

/** Feature-by-feature table for any set of columns. nrtur renders with its accent styling
 *  wherever it appears — first column in a direct comparison, third in a brand-vs-brand one. */
function ComparisonTable({ cols }: { cols: CrmId[] }) {
  const gridTemplate = `minmax(132px,1.4fr) ${cols.map(() => 'minmax(104px,1fr)').join(' ')}`
  const minWidth = 132 + cols.length * 118

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <div style={{ minWidth }}>
          {/* Column headers */}
          <div className="grid border-b border-line" style={{ gridTemplateColumns: gridTemplate }}>
            <div className="px-5 py-[18px] flex items-center">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-4">
                Feature
              </span>
            </div>
            {cols.map((id) => {
              const p = crmProfiles[id]
              return (
                <div
                  key={id}
                  className={`px-3 py-[14px] text-center border-l ${
                    p.accent ? 'border-accent-line bg-accent-soft' : 'border-line'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    {p.accent && (
                      <span className="w-5 h-5 rounded-md bg-btn-bg flex items-center justify-center">
                        <span className="text-btn-fg font-black text-[9px]">n</span>
                      </span>
                    )}
                    <span
                      className={p.accent ? 'font-bold text-ink text-sm' : 'font-semibold text-ink-3 text-sm'}
                    >
                      {p.name}
                    </span>
                  </div>
                  <span className={`text-[11px] ${p.accent ? 'text-accent font-medium' : 'text-ink-4'}`}>
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
              className="grid border-b border-line-2 last:border-b-0"
              style={{ gridTemplateColumns: gridTemplate }}
            >
              <div className="px-5 py-[14px] flex items-center">
                <span className="text-sm text-ink-3">{f.label}</span>
              </div>
              {cols.map((id) => {
                const p = crmProfiles[id]
                return (
                  <div
                    key={id}
                    className={`px-3 py-[14px] flex items-center justify-center text-center border-l ${
                      p.accent ? 'border-accent-line bg-accent-soft' : 'border-line-2'
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
  )
}

export default function ComparePage() {
  const [matchupIdx, setMatchupIdx] = useState(0)
  const [competitor, setCompetitor] = useState<CompetitorId>('hubspot')
  const ref = useScrollReveal()

  const m = matchups[matchupIdx]
  const narrative = narratives[competitor]

  return (
    <>
      {/* Header — neutral, brand-forward (the terms people actually search) */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-surface-2 -top-52 left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="section-label mb-4">
            <span>Compare</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif font-semibold tracking-tight leading-[1.05] mb-5">
            <span className="text-ink">How the big CRMs</span>
            <br />
            <span className="hero-emph italic">stack up</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-ink-3 leading-relaxed">
            Honest, side-by-side breakdowns of the CRMs you&rsquo;re weighing — HubSpot,
            Salesforce, Pipedrive, and Zoho — plus where nrtur fits for a team of 1&ndash;5.
          </p>
        </div>
      </section>

      {/* Lead: brand-vs-brand matchups, nrtur as the third column */}
      <section className="relative pt-2 pb-16" ref={ref}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Matchup selector */}
          <div className="reveal flex justify-center gap-2 flex-wrap mb-6">
            {matchups.map((mm, i) => {
              const isActive = i === matchupIdx
              return (
                <button
                  key={mm.title}
                  onClick={() => setMatchupIdx(i)}
                  className={`px-[18px] py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-accent-soft border border-accent-line text-accent-ink shadow-md'
                      : 'bg-surface border border-line text-ink-4 hover:text-ink-3'
                  }`}
                >
                  {mm.title}
                </button>
              )
            })}
          </div>

          {/* Neutral, even-handed blurb about the two brands */}
          <p className="reveal max-w-2xl mx-auto text-center text-[15px] text-ink-3 leading-relaxed mb-8">
            {m.blurb}
          </p>

          {/* Table: competitor A | competitor B | nrtur */}
          <div className="reveal">
            <ComparisonTable cols={[m.a, m.b, 'nrtur']} />
          </div>

          {/* Where nrtur fits + CTA */}
          <div className="mt-8 relative overflow-hidden bg-accent-soft border border-accent-line rounded-2xl px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center gap-5">
            <div className="flex-1 text-center sm:text-left">
              <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-accent-ink mb-1.5">
                Where nrtur fits
              </p>
              <p className="text-[15px] text-ink-2 leading-relaxed">{m.nrturAngle}</p>
            </div>
            <a
              href="https://forms.gle/sb2mHm97oRNFRmUY9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-[11px] px-6 whitespace-nowrap flex-shrink-0"
            >
              Try nrtur
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* Demoted: direct nrtur head-to-head (kept, but no longer the lead) */}
      <section className="relative pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight text-ink mb-2">
              Prefer a head-to-head with nrtur?
            </h2>
            <p className="text-[15px] text-ink-3">
              Pick the tool you&rsquo;re leaving and see it against nrtur directly.
            </p>
          </div>

          {/* Competitor picker */}
          <div className="flex justify-center gap-2 flex-wrap mb-6">
            {competitorOrder.map((id) => {
              const isActive = id === competitor
              return (
                <button
                  key={id}
                  onClick={() => setCompetitor(id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-accent-soft border border-accent-line text-accent-ink shadow-md'
                      : 'bg-surface border border-line text-ink-4 hover:text-ink-3'
                  }`}
                >
                  {crmProfiles[id].name}
                </button>
              )
            })}
          </div>

          {/* Verdict chips */}
          <div className="flex justify-center gap-2.5 flex-wrap mb-6">
            {narrative.chips.map((chip) => (
              <span
                key={chip.label}
                className={`text-[13px] font-medium rounded-full px-3.5 py-1.5 border ${
                  chip.highlight ? 'text-pos-ink bg-pos-soft border-pos' : 'text-ink-3 bg-surface border-line'
                }`}
              >
                {chip.label}
              </span>
            ))}
          </div>

          <div className="reveal">
            <ComparisonTable cols={['nrtur', competitor]} />
          </div>

          <div className="mt-8 relative overflow-hidden bg-surface border border-line shadow-md rounded-2xl px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center gap-5">
            <p className="text-[15px] text-ink-3 leading-relaxed flex-1 text-center sm:text-left">
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

          <p className="text-center mt-8 text-xs text-ink-4">
            Prices shown are each tool&rsquo;s plan that matches nrtur&rsquo;s included features —
            most offer cheaper entry tiers that gate those features behind higher plans or add-ons.
            Public pricing, July 2026.
          </p>
        </div>
      </section>
    </>
  )
}
