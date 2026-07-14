import { useState } from 'react'
import { LayoutDashboard, Users, GitBranch, Mail, Zap, Settings, Check, ChevronDown } from 'lucide-react'
import PipelineView from './PipelineView'
import DashboardView from './DashboardView'
import ContactsView from './ContactsView'
import EmailView from './EmailView'
import AutomationView from './AutomationView'

export type HeroView = 'dashboard' | 'contacts' | 'pipeline' | 'email' | 'automation'

const navItems: { id: HeroView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'pipeline', label: 'Pipeline', icon: GitBranch },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'automation', label: 'Automations', icon: Zap },
]

const activity = [
  { initial: 'S', color: 'bg-blue-500', action: 'Moved deal to Proposal', time: '2m ago' },
  { initial: 'J', color: 'bg-violet-500', action: 'Sent proposal to Forge', time: '14m ago' },
  { initial: 'R', color: 'bg-emerald-500', action: 'Closed Kapoor & Assoc', time: '1h ago' },
  { initial: 'M', color: 'bg-amber-500', action: 'Added 3 new contacts', time: '2h ago' },
  { initial: 'S', color: 'bg-pink-500', action: 'Automated email sent', time: '3h ago' },
]

export default function HeroDemoWindow() {
  const [heroView, setHeroView] = useState<HeroView>('pipeline')

  return (
    <div>
      {/* Switcher row */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-white/35 mr-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
          Live demo — click around
        </span>
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = heroView === id
          return (
            <button
              key={id}
              onClick={() => setHeroView(id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                active
                  ? 'bg-brand-500/15 border border-brand-500/35 text-brand-300'
                  : 'bg-white/[0.03] border border-white/[0.07] text-white/45 hover:text-white/70 hover:bg-white/[0.06]'
              }`}
            >
              <Icon size={12} />
              {label}
            </button>
          )
        })}
      </div>

      {/* Window + toasts */}
      <div className="relative">
        <div className="absolute -inset-8 bg-brand-500/10 rounded-3xl blur-3xl pointer-events-none" />

        {/* Toast: deal won */}
        <div
          className="absolute z-20 bg-[#0d0d1f]/90 border border-white/[0.09] rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-sm"
          style={{ top: -22, left: -14, transform: 'rotate(-2deg)', animation: 'float 7s ease-in-out infinite' }}
        >
          <span className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
            <Check size={14} className="text-emerald-400" />
          </span>
          <span>
            <p className="text-xs font-semibold text-white leading-tight">Deal won — $44,000</p>
            <p className="text-[10px] text-white/35 leading-tight mt-0.5">Forge &amp; Co · just now</p>
          </span>
        </div>

        {/* Toast: automation ran */}
        <div
          className="absolute z-20 bg-[#0d0d1f]/90 border border-white/[0.09] rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-sm"
          style={{ bottom: 52, right: -16, transform: 'rotate(2deg)', animation: 'float 6s ease-in-out 0.9s infinite' }}
        >
          <span className="w-7 h-7 rounded-lg bg-brand-500/15 flex items-center justify-center flex-shrink-0">
            <Zap size={14} className="text-brand-400" />
          </span>
          <span>
            <p className="text-xs font-semibold text-white leading-tight">Automation ran</p>
            <p className="text-[10px] text-white/35 leading-tight mt-0.5">Welcome email sent to 3 new leads</p>
          </span>
        </div>

        <div className="relative animate-float">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_32px_120px_rgba(0,0,0,0.7)]">
            {/* Window chrome */}
            <div className="bg-[#0b0b18] px-4 py-3 flex items-center gap-3 border-b border-white/[0.05]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57] block" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e] block" />
                <span className="w-3 h-3 rounded-full bg-[#28c840] block" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white/[0.05] border border-white/[0.06] rounded-md px-3 py-1 text-[11px] text-white/25 w-44 text-center">
                  app.nrtur.com
                </div>
              </div>
            </div>

            <div className="flex bg-[#09091a]" style={{ height: 500 }}>
              {/* Sidebar */}
              <div className="w-14 bg-[#07070f] border-r border-white/[0.05] flex flex-col items-center py-5 gap-2 flex-shrink-0">
                <img src="/nrtur-logo.png" alt="nrtur" className="w-[30px] h-[30px] object-contain mb-4" />
                {navItems.map(({ id, icon: Icon, label }) => {
                  const active = heroView === id
                  return (
                    <button
                      key={id}
                      title={label}
                      onClick={() => setHeroView(id)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        active
                          ? 'bg-brand-500/20 text-brand-400 shadow-[0_0_0_1px_rgba(99,102,241,0.25)]'
                          : 'text-white/25 hover:text-white/45 hover:bg-white/[0.04]'
                      }`}
                    >
                      <Icon size={15} />
                    </button>
                  )
                })}
                <div className="mt-auto w-9 h-9 rounded-xl flex items-center justify-center text-white/20">
                  <Settings size={15} />
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 min-w-0 relative overflow-hidden">
                {heroView === 'pipeline' && <PipelineView />}
                {heroView === 'dashboard' && <DashboardView />}
                {heroView === 'contacts' && <ContactsView />}
                {heroView === 'email' && <EmailView />}
                {heroView === 'automation' && <AutomationView />}
              </div>

              {/* Activity panel — pipeline only */}
              {heroView === 'pipeline' && (
                <div className="w-48 bg-[#07070f] border-l border-white/[0.05] p-4 flex-shrink-0 box-border hidden lg:block">
                  <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-4">Activity</p>
                  {activity.map((a, i) => (
                    <div key={i} className="flex gap-2 mb-3.5">
                      <div className={`w-5 h-5 rounded-full ${a.color} flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-white mt-0.5`}>
                        {a.initial}
                      </div>
                      <div>
                        <p className="text-[10px] text-white/60 leading-tight">{a.action}</p>
                        <p className="text-[9px] text-white/20 mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status bar */}
            <div className="bg-[#07070f] border-t border-white/[0.05] px-5 py-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                <span className="text-[10px] text-white/25">All systems operational</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-white/20">3 team members online</span>
                <div className="flex -space-x-1">
                  {['bg-blue-500', 'bg-violet-500', 'bg-emerald-500'].map((c, i) => (
                    <div key={i} className={`w-4 h-4 rounded-full ${c} border border-[#07070f]`} />
                  ))}
                </div>
                <ChevronDown size={10} className="text-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
