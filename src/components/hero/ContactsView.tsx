const contacts = [
  { initials: 'SC', color: 'bg-blue-500', name: 'Sarah Chen', email: 'sarah@meridian.co', company: 'Meridian Agency', status: 'Customer', owner: 'AM', value: '$39.4k' },
  { initials: 'JR', color: 'bg-violet-500', name: 'James Rivera', email: 'james@summit.co', company: 'Summit Digital', status: 'Prospect', owner: 'JK', value: '$31k' },
  { initials: 'ML', color: 'bg-pink-500', name: 'Maria Lopez', email: 'maria@bloom.co', company: 'Bloom Creative', status: 'Prospect', owner: 'SC', value: '$18k' },
  { initials: 'RL', color: 'bg-emerald-500', name: 'Ravi Lee', dnc: true, email: 'ravi@vertex.co', company: 'Vertex Labs', status: 'Prospect', owner: 'RL', value: '$6.2k' },
  { initials: 'ET', color: 'bg-amber-500', name: 'Emily Tran', email: 'emily@forge.co', company: 'Forge & Co', status: 'Customer', owner: 'AM', value: '$44k' },
  { initials: 'PN', color: 'bg-teal-500', name: 'Priya Nair', email: 'priya@atlas.co', company: 'Atlas Consult', status: 'Prospect', owner: 'SC', value: '$18k' },
]

const gridCols = '28px 1.3fr 1fr 90px 60px 70px'

export default function ContactsView() {
  return (
    <div className="h-[500px] flex flex-col box-border overflow-hidden">
      {/* Top bar */}
      <div className="px-5 py-3 border-b border-white/[0.05] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex bg-white/[0.04] border border-white/[0.06] rounded-lg p-0.5">
            <span className="text-[11px] font-medium text-brand-300 bg-brand-500/20 rounded-md px-2.5 py-1">Contacts</span>
            <span className="text-[11px] text-white/35 px-2.5 py-1">Companies</span>
            <span className="text-[11px] text-white/35 px-2.5 py-1">Leads</span>
          </div>
          <span className="text-xs font-semibold text-white">
            All Contacts <span className="text-[10px] text-white/30 font-medium">18</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/40 bg-white/[0.04] border border-white/[0.06] rounded-lg px-2.5 py-1.5">Import</span>
          <span className="text-[11px] text-white/40 bg-white/[0.04] border border-white/[0.06] rounded-lg px-2.5 py-1.5">Export</span>
          <span className="text-[11px] text-white font-medium bg-brand-500 rounded-lg px-2.5 py-1.5">+ New Contact</span>
        </div>
      </div>

      {/* Column headers */}
      <div
        className="grid items-center gap-3 px-5 py-2 border-b border-white/[0.04] flex-shrink-0"
        style={{ gridTemplateColumns: gridCols }}
      >
        <span />
        <span className="text-[9px] tracking-wider uppercase text-white/25">Name</span>
        <span className="text-[9px] tracking-wider uppercase text-white/25">Company</span>
        <span className="text-[9px] tracking-wider uppercase text-white/25">Status</span>
        <span className="text-[9px] tracking-wider uppercase text-white/25">Owner</span>
        <span className="text-[9px] tracking-wider uppercase text-white/25 text-right">Deal value</span>
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((c) => (
          <div
            key={c.email}
            className="grid items-center gap-3 px-5 py-2.5 border-b border-white/[0.03] last:border-b-0"
            style={{ gridTemplateColumns: gridCols }}
          >
            <span className={`w-[26px] h-[26px] rounded-full ${c.color} flex items-center justify-center text-[10px] font-bold text-white`}>
              {c.initials}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white/85 leading-tight flex items-center gap-1.5">
                {c.name}
                {c.dnc && (
                  <span className="text-[8px] text-white/30 border border-white/15 rounded px-1 py-0.5 leading-none">DNC</span>
                )}
              </p>
              <p className="text-[10px] text-white/30 mt-0.5 truncate">{c.email}</p>
            </div>
            <span className="text-[11px] text-white/50 truncate">{c.company}</span>
            <span
              className={`text-[9px] font-medium px-2 py-0.5 rounded-full justify-self-start ${
                c.status === 'Customer' ? 'bg-emerald-500/[0.12] text-emerald-400' : 'bg-brand-500/[0.12] text-brand-400'
              }`}
            >
              {c.status}
            </span>
            <span className="w-5 h-5 rounded-full bg-brand-500/20 border border-brand-500/20 flex items-center justify-center text-[8px] font-bold text-brand-400">
              {c.owner}
            </span>
            <span className="text-[11px] font-semibold text-white/60 text-right">{c.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
