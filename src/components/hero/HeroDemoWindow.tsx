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
  { initial: 'S', color: 'bg-avatar-blue', action: 'Moved deal to Proposal', time: '2m ago' },
  { initial: 'J', color: 'bg-avatar-violet', action: 'Sent proposal to Forge', time: '14m ago' },
  { initial: 'R', color: 'bg-avatar-green', action: 'Closed Kapoor & Assoc', time: '1h ago' },
  { initial: 'M', color: 'bg-avatar-amber', action: 'Added 3 new contacts', time: '2h ago' },
  { initial: 'S', color: 'bg-avatar-pink', action: 'Automated email sent', time: '3h ago' },
]

export default function HeroDemoWindow() {
  const [heroView, setHeroView] = useState<HeroView>('pipeline')

  return (
    <div>
      {/* Switcher row */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-3 mr-1">
          <span className="w-1.5 h-1.5 rounded-full bg-pos animate-pulse-dot" />
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
                  ? 'bg-accent-soft border border-accent-line text-accent-ink'
                  : 'bg-surface border border-line text-ink-3 hover:text-ink hover:bg-surface-2'
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
        <div className="absolute -inset-8 bg-surface-2 rounded-3xl blur-3xl pointer-events-none opacity-70" />

        {/* Toast: deal won */}
        <div
          className="absolute z-20 bg-surface border border-line rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-pop"
          style={{ top: -22, left: -14, transform: 'rotate(-2deg)', animation: 'float 7s ease-in-out infinite' }}
        >
          <span className="w-7 h-7 rounded-lg bg-pos-soft flex items-center justify-center flex-shrink-0">
            <Check size={14} className="text-pos-ink" />
          </span>
          <span>
            <p className="text-xs font-semibold text-ink leading-tight">Deal won — $44,000</p>
            <p className="text-[10px] text-ink-3 leading-tight mt-0.5">Forge &amp; Co · just now</p>
          </span>
        </div>

        {/* Toast: automation ran */}
        <div
          className="absolute z-20 bg-surface border border-line rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-pop"
          style={{ bottom: 52, right: -16, transform: 'rotate(2deg)', animation: 'float 6s ease-in-out 0.9s infinite' }}
        >
          <span className="w-7 h-7 rounded-lg bg-accent-soft flex items-center justify-center flex-shrink-0">
            <Zap size={14} className="text-accent" />
          </span>
          <span>
            <p className="text-xs font-semibold text-ink leading-tight">Automation ran</p>
            <p className="text-[10px] text-ink-3 leading-tight mt-0.5">Welcome email sent to 3 new leads</p>
          </span>
        </div>

        <div className="relative animate-float">
          <div className="relative rounded-2xl overflow-hidden border border-line shadow-pop">
            {/* Window chrome */}
            <div className="bg-surface-2 px-4 py-3 flex items-center gap-3 border-b border-line">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57] block" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e] block" />
                <span className="w-3 h-3 rounded-full bg-[#28c840] block" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-surface-3 border border-line rounded-md px-3 py-1 text-[11px] text-ink-3 w-44 text-center">
                  app.nrtur.com
                </div>
              </div>
            </div>

            <div className="flex bg-surface" style={{ height: 500 }}>
              {/* Sidebar */}
              <div className="w-14 bg-surface-2 border-r border-line flex flex-col items-center py-5 gap-2 flex-shrink-0">
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
                          ? 'bg-accent-soft text-accent shadow-[0_0_0_1px_var(--accent-line)]'
                          : 'text-ink-3 hover:text-ink hover:bg-hover'
                      }`}
                    >
                      <Icon size={15} />
                    </button>
                  )
                })}
                <div className="mt-auto w-9 h-9 rounded-xl flex items-center justify-center text-ink-4">
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
                <div className="w-48 bg-surface-2 border-l border-line p-4 flex-shrink-0 box-border hidden lg:block">
                  <p className="text-[10px] font-semibold text-ink-3 uppercase tracking-widest mb-4">Activity</p>
                  {activity.map((a, i) => (
                    <div key={i} className="flex gap-2 mb-3.5">
                      <div className={`w-5 h-5 rounded-full ${a.color} flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-on-solid mt-0.5`}>
                        {a.initial}
                      </div>
                      <div>
                        <p className="text-[10px] text-ink-2 leading-tight">{a.action}</p>
                        <p className="text-[9px] text-ink-4 mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status bar */}
            <div className="bg-surface-2 border-t border-line px-5 py-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pos animate-pulse-dot" />
                <span className="text-[10px] text-ink-3">All systems operational</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-ink-4">3 team members online</span>
                <div className="flex -space-x-1">
                  {['bg-avatar-blue', 'bg-avatar-violet', 'bg-avatar-green'].map((c, i) => (
                    <div key={i} className={`w-4 h-4 rounded-full ${c} border border-surface-2`} />
                  ))}
                </div>
                <ChevronDown size={10} className="text-ink-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
