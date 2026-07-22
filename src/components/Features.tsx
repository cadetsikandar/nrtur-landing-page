import {
  Users, GitBranch, Mail, Zap, Shield, BarChart3,
  Globe, Clock, Layers,
} from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Contact Management',
    description:
      'A single source of truth for every contact. Enrich profiles, track interactions, and keep your team in sync — all in one clean view.',
    tag: 'Core',
    tile: 'bg-info-soft',
    iconColor: 'text-info-ink',
    highlights: ['Smart deduplication', 'Custom fields', 'Activity timeline'],
    wide: true,
  },
  {
    icon: GitBranch,
    title: 'Sales Pipelines',
    description:
      'Drag-and-drop kanban boards that match how you actually sell. Forecast revenue, spot bottlenecks, and never let a deal go cold.',
    tag: 'Core',
    tile: 'bg-accent-soft',
    iconColor: 'text-accent',
    highlights: ['Multiple pipelines', 'Deal scoring', 'Win/loss tracking'],
    wide: false,
  },
  {
    icon: Mail,
    title: 'Email Sync',
    description:
      'Two-way email sync with Gmail and Outlook. Every thread lands in the right contact record automatically — no copy-pasting ever.',
    tag: 'Core',
    tile: 'bg-violet-soft',
    iconColor: 'text-violet-ink',
    highlights: ['Gmail & Outlook', 'Thread tracking', 'Email templates'],
    wide: false,
  },
  {
    icon: Zap,
    title: 'Automations',
    description:
      'Set it and forget it. Build automated workflows that follow up, assign tasks, and move deals — so nothing slips through the cracks.',
    tag: 'Core',
    tile: 'bg-warn-soft',
    iconColor: 'text-warn-ink',
    highlights: ['Visual workflow builder', 'Trigger-based rules', '50+ actions'],
    wide: false,
  },
  {
    icon: Shield,
    title: 'Team Management',
    description:
      'Role-based permissions, shared pipelines, and activity logs. Everyone sees what they should — nothing more, nothing less.',
    tag: 'Core',
    tile: 'bg-pos-soft',
    iconColor: 'text-pos-ink',
    highlights: ['Role-based access', 'Team views', 'Audit logs'],
    wide: false,
  },
  {
    icon: BarChart3,
    title: 'Reporting & Analytics',
    description:
      'Real-time dashboards that tell you what\'s working and what isn\'t. Export-ready reports for clients and stakeholders.',
    tag: 'Included',
    tile: 'bg-neg-soft',
    iconColor: 'text-neg-ink',
    highlights: ['Revenue forecasting', 'Conversion funnels', 'Custom reports'],
    wide: false,
  },
]

const extras = [
  { icon: Globe, label: 'Works in any timezone' },
  { icon: Clock, label: '5-minute onboarding' },
  { icon: Layers, label: 'Integrates with 100+ tools' },
]

export default function Features() {
  return (
    <section id="features" className="py-28 relative">
      <div className="absolute inset-0 bg-surface-2" />
      <div className="orb w-[500px] h-[500px] bg-surface-2 top-1/2 -left-60 absolute pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal section-label mb-4">
            <span>Features</span>
          </div>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-serif font-semibold tracking-tight text-ink mb-5">
            Everything you need.<br />Nothing you don't.
          </h2>
          <p className="reveal reveal-delay-2 max-w-xl mx-auto text-lg text-ink-2 leading-relaxed">
            Five core modules. Every one designed to feel obvious, fast, and reliable —
            the moment you open it for the first time.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className={`reveal reveal-delay-${Math.min(i + 1, 5)} group glass-card p-7 hover:shadow-md hover:border-line-3 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  f.wide ? 'lg:col-span-2' : ''
                }`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl ${f.tile} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className={f.iconColor} />
                </div>

                {/* Content */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-ink">{f.title}</h3>
                  <span className="flex-shrink-0 text-[11px] font-semibold text-accent-ink bg-accent-soft border border-accent-line px-2 py-0.5 rounded-full">
                    {f.tag}
                  </span>
                </div>
                <p className="text-sm text-ink-2 leading-relaxed mb-5">{f.description}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {f.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[11px] text-ink-3 bg-surface-2 border border-line px-2.5 py-1 rounded-full"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Extras row */}
        <div className="reveal mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {extras.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 glass-card px-5 py-4">
              <div className="w-8 h-8 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
                <Icon size={15} className="text-accent" />
              </div>
              <span className="text-sm text-ink-2 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
