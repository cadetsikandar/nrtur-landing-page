import { Users, UserPlus, Mail, GitBranch, Send, Hash, CheckSquare } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

function Connector() {
  return (
    <div className="flex flex-col items-center">
      <span className="w-px h-[5px] bg-white/15 block" />
      <span className="w-[15px] h-[15px] rounded-full bg-white/5 border border-white/15 text-white/45 text-[10px] flex items-center justify-center leading-none">
        +
      </span>
      <span className="w-px h-[5px] bg-white/15 block" />
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
      className={`bg-[#0d0d1f] border border-white/[0.08] rounded-[10px] px-2.5 py-2 flex items-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.35)] ${
        ringed ? 'ring-1 ring-violet-400/30' : ''
      }`}
      style={{ width, borderLeft: `3px solid ${railColor}` }}
    >
      <span className={`w-[26px] h-[26px] rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon size={13} className={iconColor} />
      </span>
      <span className="min-w-0">
        <p className="text-[11px] font-semibold text-white leading-tight">{title}</p>
        <p className="text-[9px] text-white/35 leading-tight mt-0.5">{subtitle}</p>
      </span>
    </div>
  )
}

export default function AutomationView() {
  return (
    <div className="h-[500px] flex flex-col box-border overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-white/[0.05] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-white/30">&lsaquo; Automations /</span>
          <span className="text-xs font-semibold text-white">New Automation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-white/40 bg-white/[0.04] border border-white/[0.08] rounded-full px-2 py-1">
            Inactive
            <span className="w-4 h-[9px] rounded-full bg-white/15 inline-block relative">
              <span className="absolute left-px top-px w-[7px] h-[7px] rounded-full bg-white block" />
            </span>
          </span>
          <span className="text-[10px] text-white/40 bg-white/[0.04] border border-white/[0.06] rounded-lg px-2.5 py-1">Run history</span>
          <span className="text-[10px] text-white/40 bg-white/[0.04] border border-white/[0.06] rounded-lg px-2.5 py-1">&#9654; Test</span>
          <span className="text-[10px] text-white font-medium bg-brand-500 rounded-lg px-3 py-1">Save</span>
        </div>
      </div>

      {/* Canvas */}
      <div
        className="flex-1 relative overflow-auto p-4"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
      >
        <div className="w-max mx-auto flex flex-col items-center">
          <p className="text-[8px] font-bold tracking-[0.18em] uppercase text-brand-400 mb-1">Trigger</p>
          <Node icon={Users} iconBg="bg-brand-500/15" iconColor="text-brand-400" railColor="#6366f1" title="Contact created" subtitle="Fires when a new person is added" />
          <Connector />
          <Node icon={UserPlus} iconBg="bg-blue-500/15" iconColor="text-blue-400" railColor="#3b82f6" title="Assign to rep" subtitle="Round-robin" />
          <Connector />
          <Node icon={Mail} iconBg="bg-violet-500/15" iconColor="text-violet-400" railColor="#a78bfa" title="Send welcome email" subtitle="Template: Introduction" />
          <Connector />
          <Node icon={GitBranch} iconBg="bg-violet-500/15" iconColor="text-violet-400" railColor="#8b5cf6" title="If / then branch" subtitle="Deal value greater than $10k" ringed />
          <span className="w-px h-2 bg-white/15 block" />

          <div className="flex gap-6 items-start">
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-bold tracking-wider text-emerald-400 bg-emerald-500/[0.12] rounded-full px-2 py-0.5 mb-1.5">YES</span>
              <Node icon={Send} iconBg="bg-brand-500/15" iconColor="text-brand-400" railColor="#6366f1" title="Send proposal" subtitle="Template: Proposal" width={190} />
              <Connector />
              <Node icon={Hash} iconBg="bg-emerald-500/15" iconColor="text-emerald-400" railColor="#34d399" title="Notify Slack" subtitle="Post to #sales" width={190} />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-bold tracking-wider text-white/45 bg-white/[0.07] rounded-full px-2 py-0.5 mb-1.5">NO</span>
              <Node icon={CheckSquare} iconBg="bg-amber-500/15" iconColor="text-amber-400" railColor="#f59e0b" title="Create task" subtitle='"Follow up with new contact"' width={190} />
            </div>
          </div>
        </div>

        {/* Flow summary */}
        <div className="absolute top-3 right-3.5 w-40 bg-[#0d0d1f]/90 border border-white/[0.08] rounded-xl p-3 backdrop-blur-sm">
          <p className="text-[8px] font-bold tracking-[0.14em] uppercase text-white/35 mb-2">Flow summary</p>
          <div className="flex justify-between mb-1.5">
            <span className="text-[10px] text-white/50"><span className="text-brand-400">&#9679;</span> Actions</span>
            <span className="text-[10px] font-bold text-white">5</span>
          </div>
          <div className="flex justify-between mb-1.5">
            <span className="text-[10px] text-white/50"><span className="text-violet-400">&#9679;</span> Conditions</span>
            <span className="text-[10px] font-bold text-white">1</span>
          </div>
          <div className="flex justify-between mb-1.5">
            <span className="text-[10px] text-white/50"><span className="text-emerald-400">&#9679;</span> Branches</span>
            <span className="text-[10px] font-bold text-white">2</span>
          </div>
          <div className="flex justify-between mb-2.5">
            <span className="text-[10px] text-white/50"><span className="text-amber-400">&#9679;</span> Waits</span>
            <span className="text-[10px] font-bold text-white">0</span>
          </div>
          <div className="text-center text-[10px] text-white/60 bg-white/[0.04] border border-white/10 rounded-lg py-1.5">
            &#9654; Test this flow
          </div>
        </div>
      </div>
    </div>
  )
}
