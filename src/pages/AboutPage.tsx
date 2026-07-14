import { useState, type ReactNode } from 'react'
import {
  Linkedin,
  MapPin,
  DollarSign,
  Zap,
  Check,
  ArrowRight,
  Sparkles,
  Quote,
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

const numbers = [
  { value: '28+', label: 'Years of combined experience' },
  { value: '4', label: 'SaaS companies built before nrtur' },
  { value: '$40M+', label: 'Total ARR scaled' },
  { value: '32', label: 'Countries where nrtur runs' },
]

const journey = [
  {
    year: '2024',
    dot: 'bg-brand-400',
    label: 'text-brand-400',
    title: 'Founded in Austin',
    body: 'A two-week prototype built to fix overpriced, over-complex CRMs.',
  },
  {
    year: 'Spring 2025',
    dot: 'bg-violet-400',
    label: 'text-violet-400',
    title: 'Early access opens',
    body: 'First 300 teams onboarded 1:1. Their feedback shaped every screen in the product today.',
  },
  {
    year: 'Today',
    dot: 'bg-emerald-400 animate-glow-pulse',
    label: 'text-emerald-400',
    title: '2,400+ teams and counting',
    body: 'Shipping weekly, onboarding new early-access teams, and saying no to feature bloat daily.',
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

function CompanyLogo({ slug, name, initials }: { slug: string; name: string; initials: string }) {
  const [errored, setErrored] = useState(false)

  return (
    <div className="relative w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
      <span className="text-lg font-black text-white/40">{initials}</span>
      {!errored && (
        <img
          src={`/customers/${slug}.png`}
          alt={`${name} logo`}
          className="absolute inset-0 w-full h-full object-contain p-2.5"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  )
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://nrtur.io/about/#aboutpage',
      url: 'https://nrtur.io/about/',
      name: 'About nrtur',
      about: { '@id': 'https://nrtur.io/#organization' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://nrtur.io/#organization',
      name: 'nrtur',
      legalName: 'nrtur, Inc.',
      slogan: 'The CRM small teams actually want to use.',
      url: 'https://nrtur.io/',
      logo: 'https://nrtur.io/nrtur-logo.png',
      description:
        'A CRM should get out of your team’s way, not become another piece of software to manage — nrtur gives small teams enterprise-grade CRM power without the enterprise price tag or complexity.',
      email: 'hello@nrtur.io',
      foundingDate: '2024',
      address: { '@type': 'PostalAddress', addressLocality: 'Austin', addressRegion: 'TX', addressCountry: 'US' },
      sameAs: ['https://twitter.com/nrtur', 'https://www.linkedin.com/company/nrtur', 'https://github.com/nrtur'],
      founder: [{ '@id': 'https://nrtur.io/about#touqeer-hassan' }],
      employee: [
        { '@id': 'https://nrtur.io/about#shahbaz-khalid' },
        { '@id': 'https://nrtur.io/about#sikandar-ali' },
        { '@id': 'https://nrtur.io/about#mujahid-raja' },
        { '@id': 'https://nrtur.io/about#qamar-ul-islam' },
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://nrtur.io/about#touqeer-hassan',
      name: 'Touqeer Hassan',
      jobTitle: 'Founder',
      worksFor: { '@id': 'https://nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Wyoming, USA' },
      image: 'https://nrtur.io/team/touqeer-hassan.jpeg',
      sameAs: ['https://www.linkedin.com/in/touqeerhassan/'],
    },
    {
      '@type': 'Person',
      '@id': 'https://nrtur.io/about#shahbaz-khalid',
      name: 'Shahbaz Khalid',
      jobTitle: 'Software Engineer',
      worksFor: { '@id': 'https://nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Rawalpindi, Pakistan' },
      image: 'https://nrtur.io/team/shahbaz-khalid.jpg',
      sameAs: ['https://www.linkedin.com/in/shahbazkhalidweb/'],
    },
    {
      '@type': 'Person',
      '@id': 'https://nrtur.io/about#sikandar-ali',
      name: 'Sikandar Ali',
      jobTitle: 'Software Engineer',
      worksFor: { '@id': 'https://nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Islamabad, Pakistan' },
      image: 'https://nrtur.io/team/Sikandar-Ali.png',
      sameAs: ['https://www.linkedin.com/in/sikandar-ali-nrtur'],
    },
    {
      '@type': 'Person',
      '@id': 'https://nrtur.io/about#mujahid-raja',
      name: 'Mujahid Raja',
      jobTitle: 'Software Engineer',
      worksFor: { '@id': 'https://nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Islamabad, Pakistan' },
      image: 'https://nrtur.io/team/Mujahid-raja.png',
      sameAs: ['https://www.linkedin.com/in/mujahid-raja-nrtur'],
    },
    {
      '@type': 'Person',
      '@id': 'https://nrtur.io/about#qamar-ul-islam',
      name: 'Qamar Ul Islam',
      jobTitle: 'Backend Engineer',
      worksFor: { '@id': 'https://nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Rawalpindi, Pakistan' },
      image: 'https://nrtur.io/team/Qamar.png',
      sameAs: ['https://www.linkedin.com/in/qamar-ul-islam-193378202/'],
    },
  ],
}

/** Overlapping cluster of the team avatar rings — the hero image-slot fallback. */
function TeamCluster() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5">
      <div className="flex -space-x-4">
        {team.map((m) => (
          <div key={m.slug} className={`w-16 h-16 rounded-full p-[2px] bg-gradient-to-br ${m.ring} ring-2 ring-black/25`}>
            <div className="w-full h-full rounded-full bg-[#07070f]/50 backdrop-blur-sm flex items-center justify-center text-sm font-black text-white/85">
              {m.initials}
            </div>
          </div>
        ))}
      </div>
      <div className="inline-flex items-center gap-1.5 bg-black/25 backdrop-blur-sm rounded-full px-3 py-1">
        <MapPin size={12} className="text-white/85" />
        <span className="text-xs font-medium text-white/85">Remote-first</span>
      </div>
    </div>
  )
}

/** Static, non-interactive window-chrome frame echoing the product's look — the Mission visual. */
function MissionMockup() {
  const cols = [
    { label: 'Prospecting', dot: 'bg-slate-400', cards: 2 },
    { label: 'Qualified', dot: 'bg-brand-400', cards: 2 },
    { label: 'Won', dot: 'bg-emerald-400', cards: 1 },
  ]
  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-brand-500/10 rounded-3xl blur-3xl pointer-events-none" />
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
              app.nrtur.com
            </div>
          </div>
        </div>
        {/* Faux pipeline body */}
        <div className="bg-[#09091a] p-4 grid grid-cols-3 gap-3" style={{ minHeight: 240 }}>
          {cols.map((col) => (
            <div key={col.label}>
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                <span className="text-[10px] font-semibold text-white/40">{col.label}</span>
              </div>
              <div className="flex flex-col gap-2">
                {Array.from({ length: col.cards }).map((_, i) => (
                  <div key={i} className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2.5">
                    <div className="h-1.5 w-3/4 rounded bg-white/10 mb-1.5" />
                    <div className="h-1.5 w-1/2 rounded bg-brand-500/30" />
                  </div>
                ))}
              </div>
            </div>
          ))}
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
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

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
                <span className="text-sm text-white/55 font-medium">Remote-first · HQ in Austin, Texas</span>
              </div>
            </div>

            {/* Right: visual */}
            <div className="relative animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <div className="orb w-[360px] h-[360px] bg-violet-600/20 top-0 right-0" />
              <ImageSlot
                src="/about/team.jpg"
                alt="The nrtur team"
                icon={Users}
                gradient="from-brand-600 to-violet-600"
                className="relative shadow-card"
              >
                <TeamCluster />
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
                Three operators — one from Pipedrive, one from Stripe, one from Notion — sat down
                with the same complaint: every CRM they&rsquo;d used was either too expensive or too
                complex for a team their size. nrtur started as a two-week prototype to fix that,
                and it never stopped being that opinionated.
              </p>
            </div>
            {/* Visual — first on mobile, second (right) on desktop */}
            <div className="reveal order-1 md:order-2">
              <ImageSlot
                src="/about/story.jpg"
                alt="nrtur’s early days in Austin"
                icon={Rocket}
                gradient="from-violet-600 to-blue-600"
                className="shadow-card"
              >
                <div className="absolute inset-0 grid-bg opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[120px] font-black text-white/10 leading-none select-none">2024</span>
                </div>
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 bg-black/25 backdrop-blur-sm rounded-full px-3 py-1">
                  <MapPin size={12} className="text-white/85" />
                  <span className="text-xs font-medium text-white/85">Austin, TX · 2024</span>
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
              From prototype to 2,400+ teams
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
              A small, senior team &mdash; remote-first across the US, and the same people who
              answer your emails.
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

        {/* By the Numbers — full-bleed stat band */}
        <section className="relative bg-white/[0.02] border-y border-white/[0.06] py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="reveal section-label mb-4">
              <span>By the numbers</span>
            </div>
            <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl font-black tracking-tight text-white mb-10">
              The track record behind nrtur
            </h2>
            <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-5">
              {numbers.map((n) => (
                <div key={n.label} className="glass-card p-6 text-left">
                  <p className="text-4xl sm:text-5xl font-black gradient-text-brand mb-2">{n.value}</p>
                  <p className="text-xs text-white/35 leading-tight">{n.label}</p>
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
                <CompanyLogo slug="devaxl" name="DevAXL" initials="DX" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2.5">
                    How DevAXL runs client systems on nrtur
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed mb-5 max-w-xl">
                    DevAXL, an IT systems and managed-services agency, juggles multiple client
                    environments at once. They joined nrtur&rsquo;s pre-access program to replace
                    scattered spreadsheets with one pipeline view their whole team can trust.
                  </p>
                  <figure className="border-l-2 border-emerald-500/40 pl-4 mb-6 max-w-xl">
                    <Quote size={16} className="text-emerald-400/60 mb-2" />
                    <blockquote className="text-[15px] text-white/70 italic leading-relaxed mb-3.5">
                      We run systems for a roomful of clients at once, and nrtur finally gave us
                      one pipeline view the whole team actually trusts. Getting in during
                      pre-access meant we could shape it around how a services shop really
                      works &mdash; instead of retrofitting our process to someone else&rsquo;s CRM.
                    </blockquote>
                    <figcaption className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-[10px] font-bold text-emerald-300">
                        DX
                      </span>
                      <span className="text-xs text-white/50">
                        <span className="text-white/75 font-semibold">Operations Lead</span> · DevAXL
                      </span>
                    </figcaption>
                  </figure>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full">
                    Pre-access partner
                  </span>
                </div>
              </div>
            </div>

            {/* Investor trust strip — paired under the spotlight */}
            <div className="reveal mt-8 glass-card p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <img src="/nrtur-logo.png" alt="nrtur" className="w-10 h-10 object-contain flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-white/70 mb-0.5">Backed by operators, not just VCs</p>
                <p className="text-sm text-white/35">
                  Our early investors include founders from Pipedrive, Close.com, and Apollo —
                  people who know CRM inside and out.
                </p>
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
                  We're onboarding early-access teams every week — and we read every piece of
                  feedback ourselves.
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
