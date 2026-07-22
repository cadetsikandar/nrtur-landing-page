'use client'

import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Users, GitBranch, Mail, Zap, BarChart3 } from 'lucide-react'

const tabs = [
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'pipeline', label: 'Pipeline', icon: GitBranch },
  { id: 'email', label: 'Email Sync', icon: Mail },
  { id: 'automations', label: 'Automations', icon: Zap },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
]

const contacts = [
  { name: 'Sarah Chen', company: 'Meridian Agency', email: 'sarah@meridian.co', status: 'Active', value: '$24k', avatar: 'SC', color: 'bg-avatar-blue' },
  { name: 'James Whitfield', company: 'Summit Digital', email: 'james@summit.io', status: 'Follow-up', value: '$18k', avatar: 'JW', color: 'bg-avatar-violet' },
  { name: 'Priya Kapoor', company: 'Kapoor & Assoc', email: 'priya@kapoor.com', status: 'Active', value: '$31k', avatar: 'PK', color: 'bg-avatar-green' },
  { name: 'Marcus Rodriguez', company: 'Pivot Studio', email: 'marcus@pivot.studio', status: 'New', value: '$8k', avatar: 'MR', color: 'bg-avatar-amber' },
  { name: 'Lisa Nakamura', company: 'Nova Growth', email: 'lisa@novagrowth.co', status: 'Active', value: '$42k', avatar: 'LN', color: 'bg-avatar-pink' },
]

const workflows = [
  { trigger: 'New lead created', steps: ['Assign to rep', 'Send welcome email', 'Create follow-up task in 2 days'], active: true, runs: 284 },
  { trigger: 'Deal moved to Proposal', steps: ['Send proposal template', 'Notify team channel', 'Set reminder in 5 days'], active: true, runs: 91 },
  { trigger: 'Deal inactive 7 days', steps: ['Send re-engagement email', 'Flag deal for manager review'], active: false, runs: 47 },
]

const pipelineStages = [
  {
    name: 'Prospecting',
    dotColor: 'bg-ink-3',
    total: '$42k',
    count: 8,
    deals: [
      { company: 'Meridian Agency', value: '$8,400', owner: 'SC', tag: 'Follow up', tagColor: 'bg-info-soft text-info-ink' },
      { company: 'Bloom Creative', value: '$12,000', owner: 'JK', tag: 'New lead', tagColor: 'bg-pos-soft text-pos-ink' },
    ],
  },
  {
    name: 'Qualified',
    dotColor: 'bg-accent',
    total: '$81k',
    count: 5,
    deals: [
      { company: 'Pivot Studio', value: '$22,500', owner: 'SC', tag: 'Proposal sent', tagColor: 'bg-warn-soft text-warn-ink' },
      { company: 'Atlas Consult', value: '$18,000', owner: 'MR', tag: 'Demo done', tagColor: 'bg-accent-soft text-accent-ink' },
    ],
  },
  {
    name: 'Proposal',
    dotColor: 'bg-violet',
    total: '$67k',
    count: 4,
    deals: [
      { company: 'Summit Digital', value: '$31,000', owner: 'JK', tag: 'Negotiating', tagColor: 'bg-warn-soft text-warn-ink' },
      { company: 'Nova Growth', value: '$15,500', owner: 'RL', tag: 'Review', tagColor: 'bg-violet-soft text-violet-ink' },
    ],
  },
  {
    name: 'Closed Won',
    dotColor: 'bg-pos',
    total: '$134k',
    count: 11,
    deals: [
      { company: 'Forge & Co', value: '$44,000', owner: 'SC', tag: 'Won 🎉', tagColor: 'bg-pos-soft text-pos-ink' },
      { company: 'Kapoor & Assoc', value: '$28,000', owner: 'MR', tag: 'Won 🎉', tagColor: 'bg-pos-soft text-pos-ink' },
    ],
  },
]

const emailThreads = [
  { from: 'Sarah Chen', subject: 'Re: Proposal for Q3 engagement', preview: "Love what you've shared — can we jump on a call to finalize the scope?", time: '11:42 AM', unread: true, avatar: 'SC', color: 'bg-avatar-blue' },
  { from: 'James Whitfield', subject: 'Summit Digital contract renewal', preview: "We're ready to proceed. Need the updated agreement before end of week.", time: 'Yesterday', unread: false, avatar: 'JW', color: 'bg-avatar-violet' },
  { from: 'Priya Kapoor', subject: 'Onboarding check-in', preview: "Team is settled in, starting the data migration tomorrow.", time: 'Mon', unread: false, avatar: 'PK', color: 'bg-avatar-green' },
]

const statusColor: Record<string, string> = {
  Active: 'bg-pos-soft text-pos-ink',
  'Follow-up': 'bg-warn-soft text-warn-ink',
  New: 'bg-info-soft text-info-ink',
}

function ContactsView() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-line">
        <div>
          <p className="text-sm font-semibold text-ink">All Contacts</p>
          <p className="text-[11px] text-ink-3">284 contacts · Last updated now</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-surface-2 border border-line text-ink-2 text-xs px-3 py-1.5 rounded-lg">Filter</div>
          <div className="bg-surface-2 border border-line text-ink-2 text-xs px-3 py-1.5 rounded-lg">Import</div>
          <div className="bg-accent-soft border border-accent-line text-accent-ink text-xs px-3 py-1.5 rounded-lg">+ New</div>
        </div>
      </div>
      <div className="grid grid-cols-[auto_1fr_1fr_auto_auto] text-[10px] text-ink-3 uppercase tracking-wider px-5 py-2.5 border-b border-line-2 gap-4">
        <span />
        <span>Name / Company</span>
        <span>Email</span>
        <span>Status</span>
        <span className="text-right">Pipeline</span>
      </div>
      {contacts.map((c) => (
        <div key={c.name} className="grid grid-cols-[auto_1fr_1fr_auto_auto] items-center px-5 py-3 border-b border-line-2 hover:bg-surface-2 gap-4 cursor-pointer transition-colors">
          <div className={`w-7 h-7 rounded-full ${c.color} flex items-center justify-center text-[11px] font-bold text-on-solid flex-shrink-0`}>{c.avatar}</div>
          <div>
            <p className="text-[13px] font-medium text-ink leading-none mb-0.5">{c.name}</p>
            <p className="text-[11px] text-ink-3">{c.company}</p>
          </div>
          <p className="text-[12px] text-ink-3 truncate">{c.email}</p>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColor[c.status]}`}>{c.status}</span>
          <p className="text-[12px] font-semibold text-ink-2 text-right">{c.value}</p>
        </div>
      ))}
    </div>
  )
}

function PipelineView() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-line">
        <div>
          <p className="text-sm font-semibold text-ink">Sales Pipeline</p>
          <p className="text-[11px] text-ink-3">Q2 2025 · 28 open deals · $324k total · drag &amp; drop across stages</p>
        </div>
        <div className="bg-accent-soft border border-accent-line text-accent-ink text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">+ New Deal</div>
      </div>
      <div className="flex gap-3 p-5 overflow-x-auto">
        {pipelineStages.map((stage) => (
          <div key={stage.name} className="flex-1 min-w-[140px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${stage.dotColor}`} />
                <span className="text-[11px] font-semibold text-ink-2">{stage.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-ink-3">{stage.total}</span>
                <span className="text-[10px] bg-surface-3 rounded-full w-4 h-4 flex items-center justify-center text-ink-3">{stage.count}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {stage.deals.map((deal) => (
                <div key={deal.company} className="bg-surface-2 border border-line rounded-xl p-2.5">
                  <p className="text-xs font-medium text-ink mb-1.5">{deal.company}</p>
                  <p className="text-[11px] font-semibold text-ink-2 mb-2">{deal.value}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-accent-soft border border-accent-line flex items-center justify-center text-[9px] font-bold text-accent-ink">
                      {deal.owner}
                    </span>
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${deal.tagColor}`}>{deal.tag}</span>
                  </div>
                </div>
              ))}
              <div className="border border-dashed border-line rounded-xl p-2 flex items-center justify-center">
                <span className="text-[10px] text-ink-4">+ Add deal</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EmailView() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-line">
        <div>
          <p className="text-sm font-semibold text-ink">Email Sync</p>
          <p className="text-[11px] text-ink-3">Gmail connected · 2 accounts synced</p>
        </div>
        <div className="flex items-center gap-1.5 bg-pos-soft border border-line rounded-lg px-3 py-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-pos animate-pulse" />
          <span className="text-[11px] text-pos-ink font-medium">Live sync</span>
        </div>
      </div>
      {emailThreads.map((e) => (
        <div key={e.subject} className={`flex gap-3 px-5 py-4 border-b border-line-2 hover:bg-surface-2 cursor-pointer transition-colors ${e.unread ? 'bg-surface-2' : ''}`}>
          <div className={`w-8 h-8 rounded-full ${e.color} flex items-center justify-center text-[11px] font-bold text-on-solid flex-shrink-0`}>{e.avatar}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <p className={`text-[13px] font-semibold truncate ${e.unread ? 'text-ink' : 'text-ink-2'}`}>{e.from}</p>
              <span className="text-[10px] text-ink-3 flex-shrink-0">{e.time}</span>
            </div>
            <p className={`text-[12px] truncate mb-0.5 ${e.unread ? 'text-ink-2' : 'text-ink-3'}`}>{e.subject}</p>
            <p className="text-[11px] text-ink-3 truncate">{e.preview}</p>
          </div>
          {e.unread && <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-1.5" />}
        </div>
      ))}
      <div className="px-5 py-4 flex items-center justify-center">
        <p className="text-[11px] text-ink-4">All emails are automatically linked to contacts</p>
      </div>
    </div>
  )
}

function AutomationsView() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-line">
        <div>
          <p className="text-sm font-semibold text-ink">Automations</p>
          <p className="text-[11px] text-ink-3">3 active workflows · 422 runs this month</p>
        </div>
        <div className="bg-accent-soft border border-accent-line text-accent-ink text-xs px-3 py-1.5 rounded-lg">+ New Workflow</div>
      </div>
      <div className="flex flex-col gap-3 p-5">
        {workflows.map((w) => (
          <div key={w.trigger} className="glass-card p-4 hover:border-line-3 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${w.active ? 'bg-pos' : 'bg-ink-4'} ${w.active ? 'animate-pulse' : ''}`} />
                <p className="text-[13px] font-semibold text-ink">When: {w.trigger}</p>
              </div>
              <span className="text-[10px] text-ink-3">{w.runs} runs</span>
            </div>
            <div className="flex items-start gap-2 ml-4">
              <div className="flex flex-col items-center mt-0.5">
                {w.steps.map((_, i) => (
                  <div key={i}>
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {i < w.steps.length - 1 && <div className="w-px h-3 bg-line-3 ml-[2.5px]" />}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                {w.steps.map((step) => (
                  <p key={step} className="text-[11px] text-ink-3">{step}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AnalyticsView() {
  const bars = [
    { label: 'Jan', value: 65, deals: 14 },
    { label: 'Feb', value: 48, deals: 11 },
    { label: 'Mar', value: 78, deals: 18 },
    { label: 'Apr', value: 92, deals: 21 },
    { label: 'May', value: 86, deals: 19 },
    { label: 'Jun', value: 100, deals: 24 },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-line">
        <div>
          <p className="text-sm font-semibold text-ink">Revenue Analytics</p>
          <p className="text-[11px] text-ink-3">Q2 2025 · Updated live</p>
        </div>
        <div className="flex gap-2">
          {['1M', '3M', '6M', '1Y'].map((t, i) => (
            <button key={t} className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${i === 2 ? 'bg-accent-soft text-accent-ink' : 'text-ink-3 hover:text-ink-2'}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Revenue', value: '$134k', change: '+31%', up: true },
            { label: 'Deals Won', value: '107', change: '+18%', up: true },
            { label: 'Win Rate', value: '68%', change: '-2%', up: false },
          ].map((m) => (
            <div key={m.label} className="glass-card p-3">
              <p className="text-[10px] text-ink-3 mb-1">{m.label}</p>
              <p className="font-mono text-lg font-bold text-ink leading-none mb-1">{m.value}</p>
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${m.up ? 'bg-pos-soft text-pos-ink' : 'bg-neg-soft text-neg-ink'}`}>{m.change}</span>
            </div>
          ))}
        </div>

        <div className="glass-card p-4 flex-1">
          <p className="text-[11px] text-ink-3 mb-4">Revenue by month</p>
          <div className="flex items-end gap-3 h-24">
            {bars.map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-1.5 flex-1">
                <span className="text-[9px] text-ink-3">{b.deals}</span>
                <div
                  className="w-full rounded-t-md bg-accent transition-all"
                  style={{ height: `${b.value}%` }}
                />
                <span className="text-[9px] text-ink-3">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Showcase() {
  const [active, setActive] = useState('contacts')
  const ref = useScrollReveal()

  return (
    <section className="py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-paper" />
      <div className="orb w-96 h-96 bg-surface-2 bottom-0 left-1/2 -translate-x-1/2 absolute pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="reveal section-label mb-4"><span>Product</span></div>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-serif font-semibold tracking-tight text-ink mb-5">
            See it in action
          </h2>
          <p className="reveal reveal-delay-2 max-w-xl mx-auto text-lg text-ink-2 leading-relaxed">
            Every view is built with the same philosophy: clarity first.
            No training required, no onboarding headache.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="reveal reveal-delay-3 flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active === id
                  ? 'bg-accent-soft border border-accent-line text-accent-ink shadow-sm'
                  : 'bg-surface border border-line-2 text-ink shadow-sm hover:bg-surface-2 hover:border-line-3'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Product window */}
        <div className="reveal reveal-delay-4">
          <div className="relative">
            <div className="absolute -inset-4 bg-surface-2 rounded-3xl blur-2xl pointer-events-none" />
            <div className="relative rounded-2xl overflow-hidden border border-line shadow-pop">
              {/* Window chrome */}
              <div className="bg-surface-2 px-4 py-3 flex items-center gap-3 border-b border-line">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-surface-3 border border-line rounded-md px-3 py-1 text-[11px] text-ink-3 w-44 text-center">
                    app.nrtur.com
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="bg-surface" style={{ minHeight: 380 }}>
                {active === 'contacts' && <ContactsView />}
                {active === 'pipeline' && <PipelineView />}
                {active === 'email' && <EmailView />}
                {active === 'automations' && <AutomationsView />}
                {active === 'analytics' && <AnalyticsView />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
