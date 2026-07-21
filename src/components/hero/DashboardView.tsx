const kpis = [
  { label: 'Weighted Forecast', value: '$262.1k', change: '+8%', up: true },
  { label: 'Win Rate', value: '73%', change: '-2%', up: false },
]

const funnel = [
  { label: 'All leads', value: '11', pct: '100%', width: '100%', color: 'bg-info' },
  { label: 'Sales-Ready', value: '3 · 27%', pct: '27%', width: '27%', color: 'bg-violet' },
  { label: 'Won', value: '8 · 73%', pct: '73%', width: '73%', color: 'bg-pos' },
]

const leaderboard = [
  { name: 'Sarah Chen', value: '$160.4k', width: '100%', color: 'bg-avatar-pink' },
  { name: 'Alex Morgan', value: '$139k', width: '87%', color: 'bg-avatar-blue' },
  { name: 'Marcus Rios', value: '$137k', width: '85%', color: 'bg-avatar-amber' },
  { name: 'Jamie Kim', value: '$120k', width: '75%', color: 'bg-avatar-violet' },
]

export default function DashboardView() {
  return (
    <div className="h-[500px] flex flex-col box-border overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-line flex items-center justify-between flex-shrink-0">
        <div>
          <p className="text-ink text-sm font-semibold leading-none mb-0.5">Good evening, Alex</p>
          <p className="text-ink-3 text-[11px]">July 13, 2026 — Here is where things stand today.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-ink-2 bg-surface-2 border border-line rounded-lg px-2.5 py-1.5">Customize</span>
          <span className="text-[11px] text-accent-ink font-medium bg-accent-soft border border-accent-line rounded-lg px-2.5 py-1.5">+ New Contact</span>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-2.5 px-4 pt-3.5 flex-shrink-0">
        {kpis.map((k) => (
          <div key={k.label} className="bg-surface-2 border border-line rounded-xl p-3">
            <p className="text-[9px] font-semibold tracking-wider uppercase text-ink-3 mb-2">{k.label}</p>
            <div className="flex items-center justify-between">
              <p className="font-mono text-xl font-bold text-ink leading-none">{k.value}</p>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${k.up ? 'bg-pos-soft text-pos-ink' : 'bg-neg-soft text-neg-ink'}`}>
                {k.change}
              </span>
            </div>
          </div>
        ))}
        <div className="bg-surface-2 border border-line rounded-xl p-3">
          <p className="text-[9px] font-semibold tracking-wider uppercase text-ink-3 mb-2">Pipeline Coverage</p>
          <p className="font-mono text-xl font-bold text-ink leading-none mb-1.5">
            3.2x <span className="text-[10px] font-medium text-ink-3">/ 4x</span>
          </p>
          <div className="h-[5px] rounded-full bg-surface-3 overflow-hidden">
            <div className="h-full rounded-full bg-accent" style={{ width: '80%' }} />
          </div>
        </div>
        <div className="bg-surface-2 border border-line rounded-xl p-3">
          <p className="text-[9px] font-semibold tracking-wider uppercase text-ink-3 mb-2">Avg Deal Cycle</p>
          <div className="flex items-center justify-between">
            <p className="font-mono text-xl font-bold text-ink leading-none">50d</p>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-pos-soft text-pos-ink">-3d</span>
          </div>
        </div>
      </div>

      {/* Funnel + leaderboard */}
      <div className="grid grid-cols-[1.15fr_1fr] gap-2.5 px-4 py-3.5 flex-1 min-h-0">
        <div className="bg-surface-2 border border-line rounded-xl p-3.5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-ink">Conversion Funnel</p>
              <p className="text-[9px] text-ink-3 mt-0.5">Lead &rarr; Sales-Ready &rarr; Won</p>
            </div>
            <span className="text-[10px] text-accent">View &rarr;</span>
          </div>
          {funnel.map((f) => (
            <div key={f.label}>
              <div className="flex justify-between mb-1">
                <span className="text-[10px] text-ink-2">{f.label}</span>
                <span className="text-[10px] font-semibold text-ink">{f.value}</span>
              </div>
              <div className="h-2 rounded-full bg-surface-3">
                <div className={`h-full rounded-full ${f.color}`} style={{ width: f.width }} />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-surface-2 border border-line rounded-xl p-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-ink">Team Leaderboard</p>
              <p className="text-[9px] text-ink-3 mt-0.5">Sum of Amount by Owner</p>
            </div>
            <span className="text-[10px] text-accent">View &rarr;</span>
          </div>
          {leaderboard.map((l) => (
            <div key={l.name}>
              <div className="flex justify-between mb-0.5">
                <span className="text-[10px] text-ink-2">{l.name}</span>
                <span className="text-[10px] font-semibold text-ink">{l.value}</span>
              </div>
              <div className="h-1 rounded-full bg-surface-3">
                <div className={`h-full rounded-full ${l.color}`} style={{ width: l.width }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
