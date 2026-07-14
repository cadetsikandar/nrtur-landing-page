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
      <div className="w-[235px] border-r border-white/[0.05] flex flex-col flex-shrink-0">
        <div className="px-3.5 py-3 border-b border-white/[0.05] flex items-center justify-between flex-shrink-0">
          <span className="text-xs font-semibold text-white">
            Inbox <span className="text-[10px] text-white/30 font-medium">· 2 unread</span>
          </span>
          <span className="text-[10px] text-white font-medium bg-brand-500 rounded-md px-2 py-1">Compose</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {threads.map((t) => (
            <div
              key={t.id}
              className={`px-3.5 py-2.5 border-b border-white/[0.04] ${
                t.active ? 'bg-brand-500/[0.08] border-l-2 border-l-brand-500' : ''
              }`}
            >
              <div className="flex justify-between mb-0.5">
                <span className={`text-[11px] font-semibold ${t.active || t.unread ? 'text-white' : 'text-white/60 font-medium'}`}>
                  {t.name} {t.starred && <span className="text-white/60">&#9733;</span>}
                  {t.unread && <span className="inline-block w-[5px] h-[5px] rounded-full bg-brand-400 ml-1 align-middle" />}
                </span>
                <span className="text-[9px] text-white/30 flex-shrink-0">{t.time}</span>
              </div>
              <p className={`text-[10px] mb-0.5 truncate ${t.active ? 'text-white/75' : t.unread ? 'text-white/60' : 'text-white/45'}`}>
                {t.subject}
              </p>
              <p className="text-[9px] text-white/30 truncate">{t.preview}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto px-3.5 py-2.5 border-t border-white/[0.04] flex items-center gap-1.5 flex-shrink-0">
          <span className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-pulse-dot" />
          <span className="text-[9px] text-white/25">Mail · live sync · 2 accounts</span>
        </div>
      </div>

      {/* Reading pane */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="px-4 py-2.5 border-b border-white/[0.05] flex items-center justify-between gap-2.5 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-[26px] h-[26px] rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
              SC
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-white leading-tight truncate">
                Sarah Chen <span className="font-normal text-white/35">· CEO · Meridian Agency</span>
              </p>
              <p className="text-[9px] text-white/35 mt-0.5 truncate">
                <span className="text-brand-400">&#9679; Prospecting</span> · $8,400 · Meridian — Managed CRM
              </p>
            </div>
          </div>
          <span className="text-[10px] text-brand-400 flex-shrink-0">View contact &#8599;</span>
        </div>

        <div className="mx-4 mt-2.5 bg-brand-500/[0.06] border border-brand-500/[0.15] rounded-lg px-3 py-2 flex items-center gap-2 flex-wrap flex-shrink-0">
          <span className="text-[8px] font-bold tracking-wider uppercase text-brand-400">&#10022; Suggested next steps</span>
          <span className="text-[10px] text-white/70 bg-white/5 border border-white/10 rounded-md px-2 py-1">&#8617; Reply</span>
          <span className="text-[10px] text-white/70 bg-white/5 border border-white/10 rounded-md px-2 py-1">Create task — schedule the call</span>
        </div>

        <div className="px-4 pt-3 pb-1 flex-shrink-0">
          <p className="text-[15px] font-bold text-white mb-1">Re: Proposal for Q3 engagement</p>
          <p className="text-[9px] text-white/30">
            <span className="text-emerald-400">&#9679;</span> Inbox · 2 messages · Last activity 11:42 AM
          </p>
        </div>

        <div className="mx-4 mt-2 mb-3.5 bg-white/[0.02] border border-white/[0.05] rounded-lg p-3.5 flex-1 overflow-hidden flex flex-col">
          <div className="flex justify-between mb-2">
            <span className="text-[10px] font-semibold text-white/70">
              Sarah Chen <span className="font-normal text-white/30">&lt;sarah@meridian.co&gt; · to me</span>
            </span>
            <span className="text-[9px] text-white/30 flex-shrink-0">Today · 11:42 AM</span>
          </div>
          <p className="text-[11px] text-white/55 leading-relaxed mb-2">
            Hey Alex, love what you've shared in the proposal — the scope is super clear and the timeline looks workable on
            our end. A couple of small things on the deliverables section I want to align on before we sign.
          </p>
          <p className="text-[11px] text-white/55 leading-relaxed mb-2.5">
            Can we jump on a 30-minute call to finalize? I'm free Thursday after 2pm PT or any time Friday morning.
          </p>
          <div className="mt-auto inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-lg px-2.5 py-1.5 self-start">
            <span className="w-5 h-5 rounded-md bg-brand-500/15 flex items-center justify-center flex-shrink-0">
              <FileText size={10} className="text-brand-400" />
            </span>
            <span>
              <p className="text-[9px] font-semibold text-white/70 leading-tight">Meridian-Q3-Notes.pdf</p>
              <p className="text-[8px] text-white/30 leading-tight">184 KB · PDF</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
