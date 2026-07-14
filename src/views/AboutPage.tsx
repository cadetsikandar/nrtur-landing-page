'use client'

import { useState, type ReactNode } from 'react'
import {
  Linkedin,
  MapPin,
  DollarSign,
  Zap,
  Check,
  ArrowRight,
  Sparkles,
  Search,
  TrendingUp,
  Users,
  Rocket,
  type LucideIcon,
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useRotatingPhrase } from '../hooks/useRotatingPhrase'

const phrases = ['we always wanted.', 'that stays out of your way.', 'teams actually enjoy.']

type TeamMember = {
  slug: string
  name: string
  initials: string
  role: string
  location: string
  bio?: string
  linkedin: string
  ring: string
  /** Full path to the headshot in /public (any extension). Falls back to /team/{slug}.jpg. */
  photo?: string
}

const team: TeamMember[] = [
  {
    slug: 'touqeer-hassan',
    name: 'Touqeer Hassan',
    initials: 'TH',
    role: 'Founder',
    location: 'Wyoming, USA',
    bio: 'Founder of nrtur. Sets the product direction and works shoulder-to-shoulder with the team to build a CRM that stays simple as it grows.',
    linkedin: 'https://www.linkedin.com/in/touqeerhassan/',
    ring: 'from-brand-600 to-violet-600',
    photo: '/team/touqeer-hassan.jpeg',
  },
  {
    slug: 'saqib-hassan',
    name: 'Saqib Hassan',
    initials: 'SH',
    role: 'Founding Engineer & Technical Lead',
    location: 'Islamabad, Pakistan',
    bio: "Founding engineer and technical lead — owns nrtur's architecture and the hard engineering calls that keep the product fast and dependable as it grows.",
    linkedin: 'https://www.linkedin.com/in/saqib-hassan-2b79511b3/',
    ring: 'from-pink-600 to-rose-600',
    photo: '/team/Saqib-hassan.png',
  },
  {
    slug: 'sikandar-ali',
    name: 'Sikandar Ali',
    initials: 'SA',
    role: 'Software Engineer',
    location: 'Islamabad, Pakistan',
    bio: "Built nrtur's first working prototype and continues to shape the front-end — turning rough ideas into polished, intuitive screens.",
    linkedin: 'https://www.linkedin.com/in/sikandar-ali-nrtur',
    ring: 'from-emerald-600 to-teal-600',
    photo: '/team/Sikandar-Ali.png',
  },
  {
    slug: 'mujahid-raja',
    name: 'Mujahid Raja',
    initials: 'MR',
    role: 'Software Engineer',
    location: 'Islamabad, Pakistan',
    bio: 'Software engineer focused on the product core — building the features and integrations that keep everything running smoothly behind the scenes.',
    linkedin: 'https://www.linkedin.com/in/mujahid-raja-nrtur',
    ring: 'from-amber-600 to-orange-600',
    photo: '/team/Mujahid-raja.png',
  },
  {
    slug: 'qamar-ul-islam',
    name: 'Qamar Ul Islam',
    initials: 'QI',
    role: 'Backend Engineer',
    location: 'Rawalpindi, Pakistan',
    bio: "Backend engineer behind nrtur's data layer — designs and tunes the databases, SQL, and APIs that keep every contact, deal, and automation in sync.",
    linkedin: 'https://www.linkedin.com/in/qamar-ul-islam-193378202/',
    ring: 'from-blue-600 to-cyan-600',
    photo: '/team/Qamar.png',
  },
  {
    slug: 'shahbaz-khalid',
    name: 'Shahbaz Khalid',
    initials: 'SK',
    role: 'Software Engineer',
    location: 'Bahria Phase 1, Rawalpindi',
    bio: 'Full-stack engineer who builds and ships the features that keep nrtur fast, reliable, and easy to live in day to day.',
    linkedin: 'https://www.linkedin.com/in/shahbazkhalidweb/',
    ring: 'from-violet-600 to-blue-600',
    photo: '/team/shahbaz-khalid.jpg',
  },
]

const values = [
  {
    icon: DollarSign,
    title: 'Honest pricing',
    body: 'One published price, no enterprise upsell maze, no surprise renewals. What you see is what you pay.',
  },
  {
    icon: Zap,
    title: 'Fast to value',
    body: 'You should feel the difference in the first hour, not the first quarter. Setup takes minutes, not weeks.',
  },
  {
    icon: Check,
    title: 'Only what you use',
    body: "We say no to features far more than we say yes. Every screen earns its place or it's gone.",
  },
]

const journey = [
  {
    year: '2024',
    dot: 'bg-brand-400',
    label: 'text-brand-400',
    title: 'The idea',
    body: 'Frustrated by bloated, overpriced CRMs, we set out to build the one we actually wanted for a team our size.',
  },
  {
    year: 'Now',
    dot: 'bg-violet-400',
    label: 'text-violet-400',
    title: 'Building the prototype',
    body: 'A small remote team is building nrtur in the open and shaping it around real feedback.',
  },
  {
    year: 'Next',
    dot: 'bg-emerald-400 animate-glow-pulse',
    label: 'text-emerald-400',
    title: 'Early access',
    body: 'Opening up to the first teams soon — join the waitlist to be one of them.',
  },
]

/** A drop-in image slot: renders <img src> on top of a branded gradient + icon fallback.
 *  If the image is missing (or no src), the branded panel (and any children) shows through —
 *  same onError mechanic as FounderPhoto / CompanyLogo, generalized. */
function ImageSlot({
  src,
  alt,
  icon: Icon,
  gradient,
  aspect = 'aspect-[4/3]',
  rounded = 'rounded-3xl',
  children,
  className = '',
}: {
  src?: string
  alt: string
  icon: LucideIcon
  gradient: string
  aspect?: string
  rounded?: string
  children?: ReactNode
  className?: string
}) {
  const [errored, setErrored] = useState(false)

  return (
    <div className={`relative ${aspect} ${rounded} overflow-hidden border border-white/[0.06] ${className}`}>
      {/* Branded fallback layer (always underneath) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        {children ?? <Icon size={64} strokeWidth={1.25} className="text-white/25" />}
      </div>
      {/* Real image on top, swapped out on error */}
      {src && !errored && (
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  )
}

function FounderPhoto({ src, name, initials, ring }: { src: string; name: string; initials: string; ring: string }) {
  const [errored, setErrored] = useState(false)

  return (
    <div
      className={`w-[104px] h-[104px] rounded-full p-[3px] mb-[18px] shadow-brand bg-gradient-to-br ${ring} flex-shrink-0`}
    >
      <div className="relative w-full h-full rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
        <span className="text-lg font-black text-white/60">{initials}</span>
        {!errored && (
          <img
            src={src}
            alt={`${name} headshot`}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setErrored(true)}
          />
        )}
      </div>
    </div>
  )
}

function CompanyLogo({ name, initials }: { name: string; initials: string }) {
  return (
    <div
      className="relative w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden"
      aria-label={`${name} logo`}
    >
      <span className="text-lg font-black text-white/40">{initials}</span>
    </div>
  )
}


/** "Signal Field" — the nrtur mark as a glowing source, ringed by orbits, with glassy
 *  product-moment chips floating around it. Photo-free; distinct from the Mission window. */
function SignalField() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Cool jewel mesh (indigo/violet + a single restrained emerald spark) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 22% 14%,rgba(99,102,241,0.28),transparent 60%),radial-gradient(ellipse 55% 55% at 82% 88%,rgba(139,92,246,0.22),transparent 62%),radial-gradient(ellipse 35% 35% at 16% 84%,rgba(52,211,153,0.10),transparent 60%)',
        }}
      />
      {/* Edge-masked grid — softly vignetted so lines fade before the panel border */}
      <div
        className="absolute inset-0 grid-bg opacity-[0.25]"
        style={{
          maskImage: 'radial-gradient(ellipse 72% 72% at 50% 50%,#000 38%,transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 72% 72% at 50% 50%,#000 38%,transparent 80%)',
        }}
      />
      <div className="absolute inset-0 bg-noise opacity-[0.10] mix-blend-overlay" />
      {/* Panel-scale glows (plain blurred divs, not .orb) */}
      <div className="absolute -top-8 -left-6 w-40 h-40 rounded-full bg-brand-600/25 blur-3xl" />
      <div className="absolute -bottom-8 -right-6 w-40 h-40 rounded-full bg-violet-600/20 blur-2xl" />

      {/* Center source: glow + rings + butterfly mark */}
      <div className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(129,140,248,0.35),transparent 70%)' }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-white/[0.07]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 animate-spin-slow">
          <div className="absolute inset-0 rounded-full border border-white/[0.05]" />
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-300" />
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full bg-violet-400" />
        </div>
        <div
          className="relative w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.10] backdrop-blur-md grid place-items-center"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.25)' }}
        >
          <img
            src="/nrtur-logo.png"
            alt="nrtur"
            className="w-8 h-8 object-contain animate-float"
            style={{ filter: 'drop-shadow(0 0 12px rgba(129,140,248,0.55))' }}
          />
        </div>
      </div>

      {/* Chip A — Deal won */}
      <div className="absolute top-[7%] left-[4%] w-[50%] z-30" style={{ transform: 'rotate(-2deg)' }}>
        <div className="animate-float" style={{ animationDuration: '7s' }}>
          <div
            className="flex items-center gap-2.5 rounded-2xl bg-white/[0.07] border border-white/[0.10] backdrop-blur-md p-2.5"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,102,241,0.30), 0 0 60px rgba(99,102,241,0.18)' }}
          >
            <div className="relative w-8 h-8 rounded-lg grid place-items-center flex-shrink-0" style={{ background: 'rgba(52,211,153,0.14)' }}>
              <Check size={16} className="text-emerald-400" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white leading-tight">Deal won</p>
              <p className="text-[11px] text-white/45 leading-tight truncate">$12,400 · Acme Corp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chip B — KPI pill with micro bars */}
      <div className="absolute top-[15%] right-[4%] w-[40%] z-20" style={{ transform: 'rotate(3deg)' }}>
        <div className="animate-float" style={{ animationDuration: '8s', animationDelay: '-2s' }}>
          <div className="rounded-2xl bg-white/[0.07] border border-white/[0.10] backdrop-blur-md p-2.5" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.55)' }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingUp size={13} className="text-brand-300" />
              <span className="text-[15px] font-black gradient-text-brand leading-none">+38%</span>
            </div>
            <div className="flex items-end gap-[3px] h-6 mb-1">
              {[40, 58, 50, 72, 100].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-brand-600 to-brand-400" style={{ height: `${h}%`, opacity: i === 4 ? 1 : 0.7 }} />
              ))}
            </div>
            <p className="text-[10px] uppercase tracking-wider text-white/40">Reply rate · 7d</p>
          </div>
        </div>
      </div>

      {/* Chip C — Automation ran */}
      <div className="absolute bottom-[9%] left-[3%] w-[44%] z-20" style={{ transform: 'rotate(2deg)' }}>
        <div className="animate-float" style={{ animationDuration: '6.5s', animationDelay: '-1s' }}>
          <div className="flex items-center gap-2.5 rounded-2xl bg-white/[0.07] border border-white/[0.10] backdrop-blur-md p-2.5" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.55)' }}>
            <div className="relative w-8 h-8 rounded-lg grid place-items-center flex-shrink-0" style={{ background: 'rgba(99,102,241,0.14)' }}>
              <Zap size={15} className="text-brand-300" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-brand-400 animate-pulse-dot" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white leading-tight">Automation ran</p>
              <p className="text-[11px] text-white/45 leading-tight truncate">3 tasks · just now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chip D — New contact (gradient monogram, not a photo) */}
      <div className="absolute bottom-[12%] right-[3%] w-[46%] z-30" style={{ transform: 'rotate(-2deg)' }}>
        <div className="animate-float" style={{ animationDuration: '7.5s', animationDelay: '-3s' }}>
          <div className="flex items-center gap-2.5 rounded-2xl bg-white/[0.07] border border-white/[0.10] backdrop-blur-md p-2.5" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.55)' }}>
            <div className="w-8 h-8 rounded-full grid place-items-center flex-shrink-0 text-[11px] font-black text-white" style={{ background: 'linear-gradient(135deg,#4f46e5,#8b5cf6)' }}>
              MK
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white leading-tight">New contact</p>
              <p className="text-[11px] text-white/45 leading-tight truncate">Maya Kade · loop.io</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Static, non-interactive mini-CRM pipeline echoing the product — the Mission visual. */
const ownerRing: Record<string, string> = {
  TH: 'from-brand-600 to-violet-600',
  SK: 'from-violet-600 to-blue-600',
  SA: 'from-emerald-600 to-teal-600',
  MR: 'from-amber-600 to-orange-600',
  QI: 'from-blue-600 to-cyan-600',
}
const dealTag: Record<string, { cls: string; bar: string }> = {
  New: { cls: 'bg-slate-500/15 text-slate-300', bar: '#94a3b8' },
  Demo: { cls: 'bg-blue-500/15 text-blue-400', bar: '#60a5fa' },
  Proposal: { cls: 'bg-amber-500/15 text-amber-400', bar: '#fbbf24' },
  Won: { cls: 'bg-emerald-500/15 text-emerald-400', bar: '#34d399' },
}
const pipelineCols = [
  {
    label: 'Prospecting',
    dot: 'bg-slate-400',
    count: 2,
    deals: [
      { company: 'Northwind Ltd', value: '$4.2k', owner: 'SK', t: 'New' },
      { company: 'Acme Digital', value: '$2.8k', owner: 'MR', t: 'New' },
    ],
  },
  {
    label: 'Qualified',
    dot: 'bg-brand-400',
    count: 2,
    deals: [
      { company: 'DevAXL', value: '$9.5k', owner: 'TH', t: 'Proposal' },
      { company: 'BrightLabs', value: '$6.1k', owner: 'SA', t: 'Demo' },
    ],
  },
  {
    label: 'Won',
    dot: 'bg-emerald-400',
    count: 1,
    deals: [{ company: 'Meridian Co', value: '$12k', owner: 'QI', t: 'Won' }],
  },
]

function MissionMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-brand-500/10 rounded-3xl blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_32px_100px_rgba(0,0,0,0.6)]">
        {/* Chrome */}
        <div className="bg-[#0b0b18] px-4 py-3 flex items-center gap-3 border-b border-white/[0.05]">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white/[0.05] border border-white/[0.06] rounded-md px-3 py-1 text-[11px] text-white/25 w-44 text-center">
              app.nrtur.com/deals
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.06] grid place-items-center">
              <Search size={11} className="text-white/30" />
            </span>
            <span className="text-[10px] text-brand-400 font-medium bg-brand-500/10 border border-brand-500/20 rounded-md px-2 py-0.5">
              + New
            </span>
          </div>
        </div>
        {/* Pipeline body */}
        <div className="bg-[#09091a] p-3.5 grid grid-cols-3 gap-2.5" style={{ minHeight: 248 }}>
          {pipelineCols.map((col) => (
            <div key={col.label}>
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                <span className="text-[10px] font-semibold text-white/45">{col.label}</span>
                <span className="text-[9px] bg-white/[0.06] rounded-full w-4 h-4 grid place-items-center text-white/35 ml-auto">
                  {col.count}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {col.deals.map((d) => (
                  <div
                    key={d.company}
                    className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2"
                    style={{ borderLeft: `2px solid ${dealTag[d.t].bar}` }}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-semibold text-white/80 truncate">{d.company}</span>
                      <span className="text-[10px] text-white/45 tabular-nums">{d.value}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span
                        className={`w-4 h-4 rounded-full bg-gradient-to-br ${ownerRing[d.owner]} grid place-items-center text-[7px] font-black text-white/90`}
                      >
                        {d.owner}
                      </span>
                      <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${dealTag[d.t].cls}`}>
                        {d.t === 'Won' ? 'Won ✓' : d.t}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="bg-[#0b0b18] border-t border-white/[0.05] px-3.5 py-2 flex items-center justify-between">
          <span className="text-[10px] text-white/35">Pipeline</span>
          <span className="text-[10px] font-semibold text-white/60 tabular-nums">$34.6k</span>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  const { phrase } = useRotatingPhrase(phrases)
  const contentRef = useScrollReveal()

  return (
    <>
      <div ref={contentRef}>
        {/* Hero — asymmetric split (copy left, visual right) */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="orb w-[600px] h-[600px] bg-brand-600/[0.18] -top-52 -left-40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_-10%,rgba(99,102,241,0.08),transparent)] pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
            {/* Left: copy */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 mb-7 animate-fade-up">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-glow-pulse" />
                <span className="text-brand-300 text-sm font-medium">About nrtur</span>
              </div>

              <h1
                className="text-5xl sm:text-6xl lg:text-[60px] font-black tracking-tight leading-[1.05] mb-6 animate-fade-up"
                style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
              >
                <span className="text-white">We build the CRM</span>
                <br />
                <span key={phrase} className="text-brand-400 inline-block animate-word-in">
                  {phrase}
                </span>
              </h1>

              <p
                className="max-w-md text-lg text-white/50 leading-relaxed mb-6 animate-fade-up"
                style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
              >
                We spent years fighting bloated, overpriced CRMs at other companies — so we built
                the one we actually wanted to use.
              </p>

              <div
                className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-2 animate-fade-up"
                style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
              >
                <MapPin size={14} className="text-brand-400" />
                <span className="text-sm text-white/55 font-medium">Remote-first · HQ in Wyoming, USA</span>
              </div>
            </div>

            {/* Right: visual */}
            <div className="relative animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <div className="orb w-[360px] h-[360px] bg-violet-600/20 top-0 right-0" />
              <ImageSlot
                alt="nrtur in action"
                icon={Users}
                gradient="from-[#0b0b18] to-[#07070f]"
                className="relative shadow-card"
              >
                <SignalField />
              </ImageSlot>
            </div>
          </div>
        </section>

        {/* Our Mission — split, visual LEFT */}
        <section className="relative bg-white/[0.02] border-y border-white/[0.06] py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Visual left */}
            <div className="reveal">
              <MissionMockup />
            </div>
            {/* Copy right */}
            <div className="reveal reveal-delay-1 text-left">
              <div className="section-label mb-4">
                <span>Our mission</span>
              </div>
              <h2 className="text-3xl sm:text-[34px] font-black tracking-tight leading-[1.2] text-white mb-5">
                A CRM should get out of your team&rsquo;s way &mdash; not become another piece of
                software to manage.
              </h2>
              <p className="text-base text-white/40 leading-relaxed max-w-md">
                Every plan, every screen, and every price is built backward from that one sentence.
                If a feature doesn&rsquo;t make it easier to close deals and keep customers happy, it
                doesn&rsquo;t ship.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story — split, visual RIGHT */}
        <section className="relative py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Copy — first on desktop, second on mobile */}
            <div className="reveal order-2 md:order-1 text-left">
              <div className="section-label mb-4">
                <span>Our story</span>
              </div>
              <h2 className="text-4xl sm:text-[40px] font-black tracking-tight text-white mb-5">
                How we got here
              </h2>
              <p className="text-base text-white/45 leading-relaxed max-w-md">
                nrtur started in 2024 as a simple prototype — our answer to every bloated,
                overpriced CRM we&rsquo;d had to fight at other companies. It&rsquo;s still early:
                a small remote team building in the open and shaping the product around real
                feedback.
              </p>
            </div>
            {/* Visual — first on mobile, second (right) on desktop */}
            <div className="reveal order-1 md:order-2">
              <ImageSlot
                alt="nrtur’s early days"
                icon={Rocket}
                gradient="from-[#0a0a16] to-[#0d0b1e]"
                className="shadow-card"
              >
                {/* Dawn mesh: indigo/violet night sky melting into an amber/pink horizon */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse 60% 45% at 25% 8%,rgba(99,102,241,0.22),transparent 60%),radial-gradient(ellipse 55% 50% at 78% 18%,rgba(139,92,246,0.18),transparent 62%),radial-gradient(ellipse 75% 45% at 30% 102%,rgba(245,158,11,0.16),transparent 60%),radial-gradient(ellipse 60% 40% at 82% 98%,rgba(244,114,182,0.12),transparent 60%)',
                  }}
                />
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="absolute inset-0 bg-noise opacity-[0.12] mix-blend-overlay" />

                {/* Est. 2024 lockup */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
                  <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-white/40">Est.</span>
                  <span className="text-[44px] sm:text-[56px] leading-none font-black gradient-text-brand">2024</span>
                  <span className="h-px w-16 bg-white/10" />
                  <span className="text-xs text-white/45">Wyoming · Remote-first</span>
                </div>

                {/* Journey constellation — mirrors the milestones band below */}
                <div className="absolute left-[14%] right-[14%] bottom-[14%]">
                  <div className="absolute top-1 left-0 right-0 h-px bg-gradient-to-r from-brand-500/40 via-violet-500/40 to-emerald-500/40" />
                  <div className="relative flex items-start justify-between">
                    {journey.map((s) => (
                      <div key={s.year} className="flex flex-col items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${s.label}`}>{s.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ImageSlot>
            </div>
          </div>
        </section>

        {/* Milestones — full-width timeline band */}
        <section className="relative py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="reveal section-label mb-4">
              <span>The journey</span>
            </div>
            <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl font-black tracking-tight text-white mb-8">
              Where we are today
            </h2>
            <div className="relative">
              {/* Connector line — shows through the gaps between cards */}
              <div className="hidden sm:block absolute left-0 right-0 top-[52px] h-px bg-gradient-to-r from-brand-500/25 via-violet-500/25 to-emerald-500/25" />
              <div className="grid sm:grid-cols-3 gap-5">
                {journey.map((step, i) => (
                  <div key={step.year} className={`reveal reveal-delay-${i + 1} relative glass-card p-6`}>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className={`relative z-10 w-2 h-2 rounded-full ${step.dot}`} />
                      <span className={`text-xs font-bold tracking-widest uppercase ${step.label}`}>{step.year}</span>
                    </div>
                    <p className="text-[15px] font-bold text-white mb-1">{step.title}</p>
                    <p className="text-[13px] text-white/40 leading-relaxed">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* The Team — full-width card grid */}
        <section className="relative py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="reveal section-label mb-4">
              <span>The team</span>
            </div>
            <h2 className="reveal reveal-delay-1 text-4xl sm:text-[40px] font-black tracking-tight text-white mb-4">
              Meet the team
            </h2>
            <p className="reveal reveal-delay-2 max-w-md text-base text-white/45 leading-relaxed mb-10">
              A small, remote-first team building nrtur &mdash; and the same people who answer
              your emails.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {team.map((member, i) => (
                <div
                  key={member.slug}
                  className={`reveal reveal-delay-${i + 1} group glass-card p-7 flex flex-col items-start text-left hover:border-white/10 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300`}
                >
                  <FounderPhoto
                    src={member.photo ?? `/team/${member.slug}.jpg`}
                    name={member.name}
                    initials={member.initials}
                    ring={member.ring}
                  />

                  <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-brand-400 font-medium mb-1">{member.role}</p>
                  <p className="text-xs text-white/30 mb-4">{member.location}</p>
                  <div className="flex-1 mb-5">
                    {member.bio && <p className="text-sm text-white/45 leading-relaxed">{member.bio}</p>}
                  </div>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-white/[0.04] border border-white/[0.08] text-white/70 text-sm font-medium py-2.5 px-4 rounded-[10px] transition-all duration-200 hover:bg-[#0a66c2]/[0.15] hover:border-[#0a66c2]/40 hover:text-white"
                  >
                    <Linkedin size={15} className="text-[#0a66c2]" fill="#0a66c2" />
                    Connect on LinkedIn
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Spotlight — DevAXL (full-width proof band) */}
        <section className="relative py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="reveal glass-card bg-emerald-500/[0.03] p-9 sm:p-12 relative overflow-hidden hover:border-white/10 transition-all duration-300">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={14} className="text-emerald-400" />
                <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-400">
                  Early access spotlight
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 items-start text-left">
                <CompanyLogo name="DevAXL" initials="DX" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2.5">
                    How DevAXL runs client systems on nrtur
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed mb-5 max-w-xl">
                    DevAXL, an IT and managed-services agency, is one of our first pre-access
                    partners — using nrtur to manage systems across their clients while the
                    product is still taking shape.
                  </p>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full">
                    Pre-access partner
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What we believe — values, placed after the proof cluster */}
        <section className="relative py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="reveal section-label mb-4">
              <span>What we believe</span>
            </div>
            <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl font-black tracking-tight text-white mb-10">
              Three things we won&rsquo;t compromise on
            </h2>
            <div className="reveal grid grid-cols-1 sm:grid-cols-3 gap-5">
              {values.map((value) => (
                <div key={value.title} className="glass-card p-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center mb-3.5">
                    <value.icon size={18} className="text-brand-400" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">{value.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{value.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA — intentionally centered */}
        <section className="pb-24">
          <div className="max-w-[840px] mx-auto px-6 lg:px-8 text-center">
            <div className="relative overflow-hidden bg-brand-500/[0.06] border border-brand-500/[0.15] rounded-3xl px-8 py-14 sm:px-10">
              <div className="orb w-[400px] h-[400px] bg-brand-500/15 -top-52 left-1/2 -translate-x-1/2" />
              <div className="relative">
                <h2 className="text-4xl sm:text-[40px] font-black tracking-tight text-white mb-3">
                  Come build with us.
                </h2>
                <p className="max-w-md mx-auto text-base text-white/45 leading-relaxed mb-7">
                  We're opening up early access soon — join the waitlist and help shape what
                  nrtur becomes.
                </p>
                <a
                  href="https://forms.gle/sb2mHm97oRNFRmUY9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-[15px] px-7 py-3.5"
                >
                  Join waitlist
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
