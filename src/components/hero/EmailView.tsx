import { FileText } from 'lucide-react'

const threads = [
  {
    id: 'sarah',
    name: 'Sarah Chen',
    starred: true,
    time: '11:42 AM',
    subject: 'Re: Proposal for Q3 engagement',
    preview: "Love what you've shared — can we jump on a call…",
    active: true,
  },
  {
    id: 'james',
    name: 'James R.',
    unread: true,
    time: '9:12 AM',
    subject: 'Summit Digital contract renewal',
    preview: "We're ready to proceed. Need the updated agree…",
    active: false,
  },
  {
    id: 'marcus',
    name: 'Marcus R.',
    time: '8:04 AM',
    subject: 'Pivot Studio — proposal v2',
    preview: 'Attached the revised scope with the timeline…',
    active: false,
  },
  {
    id: 'priya',
    name: 'Priya K.',
    time: 'Mon',
    subject: 'Onboarding check-in',
    preview: 'Team is settled in, starting the data migration…',
    active: false,
  },
]

export default function EmailView() {
  return (
    <div className="h-[500px] flex box-border overflow-hidden">
      {/* Thread list */}
      <div className="w-[235px] border-r border-line flex flex-col flex-shrink-0">
        <div className="px-3.5 py-3 border-b border-line flex items-center justify-between flex-shrink-0">
          <span className="text-xs font-semibold text-ink">
            Inbox <span className="text-[10px] text-ink-3 font-medium">· 2 unread</span>
          </span>
          <span className="text-[10px] text-btn-fg font-medium bg-btn-bg rounded-md px-2 py-1">Compose</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {threads.map((t) => (
            <div
              key={t.id}
              className={`px-3.5 py-2.5 border-b border-line-2 ${
                t.active ? 'bg-accent-soft border-l-2 border-l-accent' : ''
              }`}
            >
              <div className="flex justify-between mb-0.5">
                <span className={`text-[11px] font-semibold ${t.active || t.unread ? 'text-ink' : 'text-ink-2 font-medium'}`}>
                  {t.name} {t.starred && <span className="text-warn">&#9733;</span>}
                  {t.unread && <span className="inline-block w-[5px] h-[5px] rounded-full bg-accent ml-1 align-middle" />}
                </span>
                <span className="text-[9px] text-ink-3 flex-shrink-0">{t.time}</span>
              </div>
              <p className={`text-[10px] mb-0.5 truncate ${t.active ? 'text-ink-2' : t.unread ? 'text-ink-2' : 'text-ink-3'}`}>
                {t.subject}
              </p>
              <p className="text-[9px] text-ink-3 truncate">{t.preview}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto px-3.5 py-2.5 border-t border-line-2 flex items-center gap-1.5 flex-shrink-0">
          <span className="w-[5px] h-[5px] rounded-full bg-pos animate-pulse-dot" />
          <span className="text-[9px] text-ink-3">Mail · live sync · 2 accounts</span>
        </div>
      </div>

      {/* Reading pane */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="px-4 py-2.5 border-b border-line flex items-center justify-between gap-2.5 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-[26px] h-[26px] rounded-full bg-avatar-blue flex items-center justify-center text-[10px] font-bold text-on-solid flex-shrink-0">
              SC
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-ink leading-tight truncate">
                Sarah Chen <span className="font-normal text-ink-3">· CEO · Meridian Agency</span>
              </p>
              <p className="text-[9px] text-ink-3 mt-0.5 truncate">
                <span className="text-accent">&#9679; Prospecting</span> · $8,400 · Meridian — Managed CRM
              </p>
            </div>
          </div>
          <span className="text-[10px] text-accent flex-shrink-0">View contact &#8599;</span>
        </div>

        <div className="mx-4 mt-2.5 bg-accent-soft border border-accent-line rounded-lg px-3 py-2 flex items-center gap-2 flex-wrap flex-shrink-0">
          <span className="text-[8px] font-bold tracking-wider uppercase text-accent-ink">&#10022; Suggested next steps</span>
          <span className="text-[10px] text-ink-2 bg-surface-2 border border-line rounded-md px-2 py-1">&#8617; Reply</span>
          <span className="text-[10px] text-ink-2 bg-surface-2 border border-line rounded-md px-2 py-1">Create task — schedule the call</span>
        </div>

        <div className="px-4 pt-3 pb-1 flex-shrink-0">
          <p className="text-[15px] font-bold text-ink mb-1">Re: Proposal for Q3 engagement</p>
          <p className="text-[9px] text-ink-3">
            <span className="text-pos">&#9679;</span> Inbox · 2 messages · Last activity 11:42 AM
          </p>
        </div>

        <div className="mx-4 mt-2 mb-3.5 bg-surface-2 border border-line rounded-lg p-3.5 flex-1 overflow-hidden flex flex-col">
          <div className="flex justify-between mb-2">
            <span className="text-[10px] font-semibold text-ink-2">
              Sarah Chen <span className="font-normal text-ink-3">&lt;sarah@meridian.co&gt; · to me</span>
            </span>
            <span className="text-[9px] text-ink-3 flex-shrink-0">Today · 11:42 AM</span>
          </div>
          <p className="text-[11px] text-ink-2 leading-relaxed mb-2">
            Hey Alex, love what you've shared in the proposal — the scope is super clear and the timeline looks workable on
            our end. A couple of small things on the deliverables section I want to align on before we sign.
          </p>
          <p className="text-[11px] text-ink-2 leading-relaxed mb-2.5">
            Can we jump on a 30-minute call to finalize? I'm free Thursday after 2pm PT or any time Friday morning.
          </p>
          <div className="mt-auto inline-flex items-center gap-2 bg-surface border border-line rounded-lg px-2.5 py-1.5 self-start">
            <span className="w-5 h-5 rounded-md bg-accent-soft flex items-center justify-center flex-shrink-0">
              <FileText size={10} className="text-accent" />
            </span>
            <span>
              <p className="text-[9px] font-semibold text-ink-2 leading-tight">Meridian-Q3-Notes.pdf</p>
              <p className="text-[8px] text-ink-3 leading-tight">184 KB · PDF</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
