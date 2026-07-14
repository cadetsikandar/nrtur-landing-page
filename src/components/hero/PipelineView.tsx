import { Search, Bell, MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react'

const metrics = [
  { label: 'Pipeline Value', value: '$324k', change: '+12%', up: true },
  { label: 'Won This Month', value: '$134k', change: '+31%', up: true },
  { label: 'Avg Deal Size', value: '$11.5k', change: '+4%', up: true },
  { label: 'Win Rate', value: '68%', change: '-2%', up: false },
]

const stages = [
  {
    name: 'Prospecting',
    dot: 'bg-slate-400',
    value: '$42k',
    count: 8,
    deals: [
      { company: 'Meridian Agency', value: '$8,400', owner: 'SC', tag: 'Follow up', tagColor: 'bg-blue-500/15 text-blue-400' },
      { company: 'Bloom Creative', value: '$12,000', owner: 'JK', tag: 'New lead', tagColor: 'bg-emerald-500/15 text-emerald-400' },
      { company: 'Vertex Labs', value: '$6,200', owner: 'RL', tag: 'Call booked', tagColor: 'bg-violet-500/15 text-violet-400' },
    ],
  },
  {
    name: 'Qualified',
    dot: 'bg-brand-400',
    value: '$81k',
    count: 5,
    deals: [
      { company: 'Pivot Studio', value: '$22,500', owner: 'SC', tag: 'Proposal sent', tagColor: 'bg-amber-500/15 text-amber-400' },
      { company: 'Atlas Consult', value: '$18,000', owner: 'MR', tag: 'Demo done', tagColor: 'bg-brand-500/15 text-brand-400' },
    ],
  },
  {
    name: 'Proposal',
    dot: 'bg-violet-400',
    value: '$67k',
    count: 4,
    deals: [
      { company: 'Summit Digital', value: '$31,000', owner: 'JK', tag: 'Negotiating', tagColor: 'bg-orange-500/15 text-orange-400' },
      { company: 'Nova Growth', value: '$15,500', owner: 'RL', tag: 'Review', tagColor: 'bg-pink-500/15 text-pink-400' },
    ],
  },
  {
    name: 'Closed Won',
    dot: 'bg-emerald-400',
    value: '$134k',
    count: 11,
    deals: [
      { company: 'Forge & Co', value: '$44,000', owner: 'SC', tag: 'Won 🎉', tagColor: 'bg-emerald-500/15 text-emerald-400' },
      { company: 'Kapoor & Assoc', value: '$28,000', owner: 'MR', tag: 'Won 🎉', tagColor: 'bg-emerald-500/15 text-emerald-400' },
    ],
  },
]

export default function PipelineView() {
  return (
    <div className="h-[500px] flex flex-col box-border">
      {/* Top bar */}
      <div className="px-5 py-3.5 border-b border-white/[0.05] flex items-center justify-between flex-shrink-0">
        <div>
          <p className="text-white text-sm font-semibold leading-none mb-0.5">Sales Pipeline</p>
          <p className="text-white/30 text-[11px]">Q2 2025 · 28 open deals · $324k total</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg px-2.5 py-1.5">
            <Search size={11} className="text-white/25" />
            <span className="text-[11px] text-white/25">Search deals...</span>
          </div>
          <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30">
            <Bell size={12} />
          </div>
          <div className="flex items-center gap-1.5 bg-brand-500/10 border border-brand-500/20 rounded-lg px-2.5 py-1.5 cursor-pointer hover:bg-brand-500/15 transition-colors">
            <span className="text-[11px] text-brand-400 font-medium">+ New Deal</span>
          </div>
        </div>
      </div>

      {/* Metrics strip */}
      <div className="px-5 py-3 border-b border-white/[0.04] flex items-center gap-6 flex-shrink-0 overflow-x-auto">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center gap-2 flex-shrink-0">
            <div>
              <p className="text-[10px] text-white/30 leading-none mb-0.5">{m.label}</p>
              <p className="text-sm font-semibold text-white leading-none">{m.value}</p>
            </div>
            <div className={`flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full ${m.up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
              {m.up ? <TrendingUp size={8} /> : <TrendingDown size={8} />}
              {m.change}
            </div>
          </div>
        ))}
      </div>

      {/* Kanban */}
      <div className="flex gap-3 p-4 flex-1 overflow-x-auto">
        {stages.map((stage) => (
          <div key={stage.name} className="min-w-[180px] flex-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${stage.dot}`} />
                <span className="text-[11px] font-semibold text-white/50">{stage.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-white/25">{stage.value}</span>
                <span className="text-[10px] bg-white/[0.06] rounded-full w-4 h-4 flex items-center justify-center text-white/30">{stage.count}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {stage.deals.map((deal) => (
                <div
                  key={deal.company}
                  className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-2.5 hover:border-white/10 hover:bg-white/[0.05] transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-[12px] font-medium text-white/80 leading-tight">{deal.company}</p>
                    <MoreHorizontal size={11} className="text-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-1" />
                  </div>
                  <p className="text-[11px] font-semibold text-white/50 mb-2">{deal.value}</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-brand-500/20 border border-brand-500/20 flex items-center justify-center text-[9px] font-bold text-brand-400 flex-shrink-0">
                      {deal.owner}
                    </div>
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${deal.tagColor}`}>
                      {deal.tag}
                    </span>
                  </div>
                </div>
              ))}
              <div className="border border-dashed border-white/[0.06] rounded-xl p-2 flex items-center justify-center cursor-pointer hover:border-white/[0.12] transition-colors">
                <span className="text-[10px] text-white/15">+ Add deal</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
