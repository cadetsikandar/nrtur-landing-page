import { Users, UserPlus, Mail, GitBranch, Send, Hash, CheckSquare } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

function Connector() {
  return (
    <div className="flex flex-col items-center">
      <span className="w-px h-[5px] bg-line-3 block" />
      <span className="w-[15px] h-[15px] rounded-full bg-surface border border-line-3 text-ink-3 text-[10px] flex items-center justify-center leading-none">
        +
      </span>
      <span className="w-px h-[5px] bg-line-3 block" />
    </div>
  )
}

function Node({
  icon: Icon,
  iconBg,
  iconColor,
  railColor,
  title,
  subtitle,
  width = 210,
  ringed = false,
}: {
  icon: LucideIcon
  iconBg: string
  iconColor: string
  railColor: string
  title: string
  subtitle: string
  width?: number
  ringed?: boolean
}) {
  return (
    <div
      className={`bg-surface border border-line rounded-[10px] px-2.5 py-2 flex items-center gap-2 shadow-sm ${
        ringed ? 'ring-1 ring-accent-line' : ''
      }`}
      style={{ width, borderLeft: `3px solid ${railColor}` }}
    >
      <span className={`w-[26px] h-[26px] rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon size={13} className={iconColor} />
      </span>
      <span className="min-w-0">
        <p className="text-[11px] font-semibold text-ink leading-tight">{title}</p>
        <p className="text-[9px] text-ink-3 leading-tight mt-0.5">{subtitle}</p>
      </span>
    </div>
  )
}

export default function AutomationView() {
  return (
    <div className="h-[500px] flex flex-col box-border overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-line flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-ink-3">&lsaquo; Automations /</span>
          <span className="text-xs font-semibold text-ink">New Automation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-ink-2 bg-surface-2 border border-line rounded-full px-2 py-1">
            Inactive
            <span className="w-4 h-[9px] rounded-full bg-surface-3 inline-block relative">
              <span className="absolute left-px top-px w-[7px] h-[7px] rounded-full bg-ink-4 block" />
            </span>
          </span>
          <span className="text-[10px] text-ink-2 bg-surface-2 border border-line rounded-lg px-2.5 py-1">Run history</span>
          <span className="text-[10px] text-ink-2 bg-surface-2 border border-line rounded-lg px-2.5 py-1">&#9654; Test</span>
          <span className="text-[10px] text-btn-fg font-medium bg-btn-bg rounded-lg px-3 py-1">Save</span>
        </div>
      </div>

      {/* Canvas */}
      <div
        className="flex-1 relative overflow-auto p-4"
        style={{ backgroundImage: 'radial-gradient(var(--line-2) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
      >
        <div className="w-max mx-auto flex flex-col items-center">
          <p className="text-[8px] font-bold tracking-[0.18em] uppercase text-accent mb-1">Trigger</p>
          <Node icon={Users} iconBg="bg-accent-soft" iconColor="text-accent" railColor="var(--accent)" title="Contact created" subtitle="Fires when a new person is added" />
          <Connector />
          <Node icon={UserPlus} iconBg="bg-info-soft" iconColor="text-info-ink" railColor="var(--info)" title="Assign to rep" subtitle="Round-robin" />
          <Connector />
          <Node icon={Mail} iconBg="bg-violet-soft" iconColor="text-violet-ink" railColor="var(--violet)" title="Send welcome email" subtitle="Template: Introduction" />
          <Connector />
          <Node icon={GitBranch} iconBg="bg-violet-soft" iconColor="text-violet-ink" railColor="var(--violet)" title="If / then branch" subtitle="Deal value greater than $10k" ringed />
          <span className="w-px h-2 bg-line-3 block" />

          <div className="flex gap-6 items-start">
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-bold tracking-wider text-pos-ink bg-pos-soft rounded-full px-2 py-0.5 mb-1.5">YES</span>
              <Node icon={Send} iconBg="bg-accent-soft" iconColor="text-accent" railColor="var(--accent)" title="Send proposal" subtitle="Template: Proposal" width={190} />
              <Connector />
              <Node icon={Hash} iconBg="bg-pos-soft" iconColor="text-pos-ink" railColor="var(--pos)" title="Notify Slack" subtitle="Post to #sales" width={190} />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-bold tracking-wider text-ink-3 bg-surface-3 rounded-full px-2 py-0.5 mb-1.5">NO</span>
              <Node icon={CheckSquare} iconBg="bg-warn-soft" iconColor="text-warn-ink" railColor="var(--warn)" title="Create task" subtitle='"Follow up with new contact"' width={190} />
            </div>
          </div>
        </div>

        {/* Flow summary */}
        <div className="absolute top-3 right-3.5 w-40 bg-surface border border-line rounded-xl p-3">
          <p className="text-[8px] font-bold tracking-[0.14em] uppercase text-ink-3 mb-2">Flow summary</p>
          <div className="flex justify-between mb-1.5">
            <span className="text-[10px] text-ink-2"><span className="text-accent">&#9679;</span> Actions</span>
            <span className="text-[10px] font-bold text-ink">5</span>
          </div>
          <div className="flex justify-between mb-1.5">
            <span className="text-[10px] text-ink-2"><span className="text-violet">&#9679;</span> Conditions</span>
            <span className="text-[10px] font-bold text-ink">1</span>
          </div>
          <div className="flex justify-between mb-1.5">
            <span className="text-[10px] text-ink-2"><span className="text-pos">&#9679;</span> Branches</span>
            <span className="text-[10px] font-bold text-ink">2</span>
          </div>
          <div className="flex justify-between mb-2.5">
            <span className="text-[10px] text-ink-2"><span className="text-warn">&#9679;</span> Waits</span>
            <span className="text-[10px] font-bold text-ink">0</span>
          </div>
          <div className="text-center text-[10px] text-ink-2 bg-surface-2 border border-line rounded-lg py-1.5">
            &#9654; Test this flow
          </div>
        </div>
      </div>
    </div>
  )
}
