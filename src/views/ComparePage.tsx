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

// Short competitor names so the "nrtur vs" line balances the rotating line
// (and it's the exact set of rivals this page lets you compare against).
const phrases = [
  'HubSpot.',
  'Salesforce.',
  'Pipedrive.',
  'Zoho CRM.',
]

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
        <div className="orb w-[500px] h-[500px] bg-surface-2 -top-52 left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="section-label mb-4">
            <span>Compare</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif font-semibold tracking-tight leading-[1.05] mb-5">
            <span className="text-ink">nrtur vs</span>
            <br />
            <span key={phrase} className="hero-emph italic inline-block animate-word-in">
              {phrase}
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-ink-3 leading-relaxed">
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
                      ? 'bg-accent-soft border border-accent-line text-accent-ink shadow-md'
                      : 'bg-surface border border-line text-ink-4 hover:text-ink-3'
                  }`}
                >
                  {crmProfiles[id].tabLabel}
                </button>
              )
            })}
          </div>

          {/* Optional 2nd competitor (adds a 3rd column) */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap mb-8">
            <span className="text-[13px] text-ink-4 mr-1">Add another to compare:</span>
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
                        ? 'bg-violet-soft border border-violet text-violet-ink'
                        : 'bg-surface border border-line text-ink-4 hover:text-ink-3'
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
                    ? 'text-pos-ink bg-pos-soft border-pos'
                    : 'text-ink-3 bg-surface border-line'
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
                  className="grid border-b border-line"
                  style={{ gridTemplateColumns: gridTemplate }}
                >
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
                          p.accent
                            ? 'border-accent-line bg-accent-soft'
                            : 'border-line'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1.5 mb-0.5">
                          {p.accent && (
                            <span className="w-5 h-5 rounded-md bg-btn-bg flex items-center justify-center">
                              <span className="text-btn-fg font-black text-[9px]">n</span>
                            </span>
                          )}
                          <span
                            className={
                              p.accent
                                ? 'font-bold text-ink text-sm'
                                : 'font-semibold text-ink-3 text-sm'
                            }
                          >
                            {p.name}
                          </span>
                        </div>
                        <span
                          className={`text-[11px] ${p.accent ? 'text-accent font-medium' : 'text-ink-4'}`}
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
                            p.accent
                              ? 'border-accent-line bg-accent-soft'
                              : 'border-line-2'
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
            Prices shown are each tool's plan that matches nrtur's included features — most offer
            cheaper entry tiers that gate those features behind higher plans or add-ons. Public
            pricing, July 2026.
          </p>
        </div>
      </section>
    </>
  )
}
