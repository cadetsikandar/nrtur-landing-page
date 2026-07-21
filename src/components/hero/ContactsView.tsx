const contacts = [
  { initials: 'SC', color: 'bg-avatar-blue', name: 'Sarah Chen', email: 'sarah@meridian.co', company: 'Meridian Agency', status: 'Customer', owner: 'AM', value: '$39.4k' },
  { initials: 'JR', color: 'bg-avatar-violet', name: 'James Rivera', email: 'james@summit.co', company: 'Summit Digital', status: 'Prospect', owner: 'JK', value: '$31k' },
  { initials: 'ML', color: 'bg-avatar-pink', name: 'Maria Lopez', email: 'maria@bloom.co', company: 'Bloom Creative', status: 'Prospect', owner: 'SC', value: '$18k' },
  { initials: 'RL', color: 'bg-avatar-green', name: 'Ravi Lee', dnc: true, email: 'ravi@vertex.co', company: 'Vertex Labs', status: 'Prospect', owner: 'RL', value: '$6.2k' },
  { initials: 'ET', color: 'bg-avatar-amber', name: 'Emily Tran', email: 'emily@forge.co', company: 'Forge & Co', status: 'Customer', owner: 'AM', value: '$44k' },
  { initials: 'PN', color: 'bg-avatar-teal', name: 'Priya Nair', email: 'priya@atlas.co', company: 'Atlas Consult', status: 'Prospect', owner: 'SC', value: '$18k' },
]

const gridCols = '28px 1.3fr 1fr 90px 60px 70px'

export default function ContactsView() {
  return (
    <div className="h-[500px] flex flex-col box-border overflow-hidden">
      {/* Top bar */}
      <div className="px-5 py-3 border-b border-line flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex bg-surface-2 border border-line rounded-lg p-0.5">
            <span className="text-[11px] font-medium text-accent-ink bg-accent-soft rounded-md px-2.5 py-1">Contacts</span>
            <span className="text-[11px] text-ink-3 px-2.5 py-1">Companies</span>
            <span className="text-[11px] text-ink-3 px-2.5 py-1">Leads</span>
          </div>
          <span className="text-xs font-semibold text-ink">
            All Contacts <span className="text-[10px] text-ink-3 font-medium">18</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-ink-2 bg-surface-2 border border-line rounded-lg px-2.5 py-1.5">Import</span>
          <span className="text-[11px] text-ink-2 bg-surface-2 border border-line rounded-lg px-2.5 py-1.5">Export</span>
          <span className="text-[11px] text-btn-fg font-medium bg-btn-bg rounded-lg px-2.5 py-1.5">+ New Contact</span>
        </div>
      </div>

      {/* Column headers */}
      <div
        className="grid items-center gap-3 px-5 py-2 border-b border-line-2 flex-shrink-0"
        style={{ gridTemplateColumns: gridCols }}
      >
        <span />
        <span className="text-[9px] tracking-wider uppercase text-ink-3">Name</span>
        <span className="text-[9px] tracking-wider uppercase text-ink-3">Company</span>
        <span className="text-[9px] tracking-wider uppercase text-ink-3">Status</span>
        <span className="text-[9px] tracking-wider uppercase text-ink-3">Owner</span>
        <span className="text-[9px] tracking-wider uppercase text-ink-3 text-right">Deal value</span>
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((c) => (
          <div
            key={c.email}
            className="grid items-center gap-3 px-5 py-2.5 border-b border-line-2 last:border-b-0"
            style={{ gridTemplateColumns: gridCols }}
          >
            <span className={`w-[26px] h-[26px] rounded-full ${c.color} flex items-center justify-center text-[10px] font-bold text-on-solid`}>
              {c.initials}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-ink leading-tight flex items-center gap-1.5">
                {c.name}
                {c.dnc && (
                  <span className="text-[8px] text-ink-3 border border-line-3 rounded px-1 py-0.5 leading-none">DNC</span>
                )}
              </p>
              <p className="text-[10px] text-ink-3 mt-0.5 truncate">{c.email}</p>
            </div>
            <span className="text-[11px] text-ink-2 truncate">{c.company}</span>
            <span
              className={`text-[9px] font-medium px-2 py-0.5 rounded-full justify-self-start ${
                c.status === 'Customer' ? 'bg-pos-soft text-pos-ink' : 'bg-accent-soft text-accent-ink'
              }`}
            >
              {c.status}
            </span>
            <span className="w-5 h-5 rounded-full bg-accent-soft border border-accent-line flex items-center justify-center text-[8px] font-bold text-accent-ink">
              {c.owner}
            </span>
            <span className="text-[11px] font-semibold text-ink-2 text-right">{c.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
