// Server-safe, presentational blog card + its sub-pieces (no hooks, no 'use client').
// Reused by both the client BlogPage grid and the server-rendered cluster pages.
import Link from 'next/link'
import {
  ArrowRightLeft,
  ArrowUpRight,
  GitBranch,
  Building2,
  BookOpen,
  type LucideIcon,
} from 'lucide-react'
import { getPostUrl, TAG_ACCENTS, type Post, type TagSlug } from '@/lib/ghost'

const TAG_ICONS: Record<TagSlug, LucideIcon> = {
  alternatives: ArrowRightLeft,
  comparisons: GitBranch,
  'use-cases': Building2,
  guides: BookOpen,
}

type ThumbAccent = { text: string; bg: string; border: string }

// Per-post thumbnail art, keyed by frontmatter `thumbnail`. Falls back to the tag icon.
// Theme-aware (design tokens) and tag-tinted (uses the card's accent for the focal element).
const THUMB_ART: Record<string, (featured: boolean, a: ThumbAccent) => JSX.Element> = {
  'four-object': (featured, a) => (
    <svg
      viewBox="0 0 280 72"
      style={{ width: featured ? '78%' : '88%', maxWidth: 320, height: 'auto' }}
      role="img"
      aria-label="Lead, Contact, Company, Deal"
    >
      <defs>
        <marker id="tmb-arw" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" fill="var(--ink-4)" />
        </marker>
      </defs>
      <rect x="1" y="14" width="56" height="44" rx="9" fill="var(--surface)" stroke="var(--line-3)" strokeWidth="1.4" strokeDasharray="4 3" />
      <text x="29" y="40" textAnchor="middle" fill="var(--ink-2)" fontSize="9" fontWeight="600" fontFamily="system-ui">Lead</text>
      <line x1="59" y1="36" x2="72" y2="36" stroke="var(--ink-4)" strokeWidth="1.4" markerEnd="url(#tmb-arw)" />
      <rect x="75" y="14" width="56" height="44" rx="9" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="1.4" />
      <text x="103" y="40" textAnchor="middle" fill="var(--ink-2)" fontSize="9" fontWeight="600" fontFamily="system-ui">Contact</text>
      <line x1="133" y1="36" x2="146" y2="36" stroke="var(--ink-4)" strokeWidth="1.4" markerEnd="url(#tmb-arw)" />
      <rect x="149" y="14" width="56" height="44" rx="9" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="1.4" />
      <text x="177" y="40" textAnchor="middle" fill="var(--ink-2)" fontSize="8" fontWeight="600" fontFamily="system-ui">Company</text>
      <line x1="207" y1="36" x2="220" y2="36" stroke="var(--ink-4)" strokeWidth="1.4" markerEnd="url(#tmb-arw)" />
      <rect x="223" y="14" width="56" height="44" rx="9" fill={a.bg} stroke={a.border} strokeWidth="1.4" />
      <text x="251" y="40" textAnchor="middle" fill={a.text} fontSize="9" fontWeight="700" fontFamily="system-ui">Deal</text>
    </svg>
  ),
  speed: (featured, a) => (
    <svg
      viewBox="0 0 170 118"
      style={{ width: featured ? '46%' : '54%', maxWidth: 188, height: 'auto' }}
      role="img"
      aria-label="Fast response gauge"
    >
      <path d="M20 92 A65 65 0 0 1 150 92" fill="none" stroke="var(--line-2)" strokeWidth="7" strokeLinecap="round" />
      <path d="M122 39 A65 65 0 0 1 150 92" fill="none" stroke={a.text} strokeWidth="7" strokeLinecap="round" />
      <line x1="85" y1="92" x2="126" y2="54" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="85" cy="92" r="6" fill="var(--ink)" />
      <text x="85" y="113" textAnchor="middle" fill={a.text} fontSize="13" fontWeight="700" fontFamily="system-ui">{'< 5 min'}</text>
    </svg>
  ),
  'crm-fit': (featured, a) => (
    <svg
      viewBox="0 0 240 84"
      style={{ width: featured ? '72%' : '86%', maxWidth: 280, height: 'auto' }}
      role="img"
      aria-label="Small-team CRM fit, between too much and too little"
    >
      <rect x="6" y="18" width="68" height="34" rx="8" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="1.4" />
      <rect x="86" y="14" width="68" height="42" rx="8" fill={a.bg} stroke={a.border} strokeWidth="1.6" />
      <rect x="166" y="18" width="68" height="34" rx="8" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="1.4" />
      <text x="120" y="40" textAnchor="middle" fill={a.text} fontSize="11" fontWeight="700" fontFamily="system-ui">fit</text>
      <text x="40" y="74" textAnchor="middle" fill="var(--ink-4)" fontSize="9" fontFamily="system-ui">too much</text>
      <text x="200" y="74" textAnchor="middle" fill="var(--ink-4)" fontSize="9" fontFamily="system-ui">too little</text>
    </svg>
  ),
  versus: (featured, a) => (
    <svg
      viewBox="0 0 220 70"
      style={{ width: featured ? '70%' : '82%', maxWidth: 260, height: 'auto' }}
      role="img"
      aria-label="Head-to-head comparison"
    >
      <rect x="6" y="11" width="84" height="48" rx="9" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="1.4" />
      <rect x="130" y="11" width="84" height="48" rx="9" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="1.4" />
      <circle cx="110" cy="35" r="17" fill={a.bg} stroke={a.border} strokeWidth="1.5" />
      <text x="110" y="40" textAnchor="middle" fill={a.text} fontSize="12" fontWeight="700" fontStyle="italic" fontFamily="system-ui">vs</text>
    </svg>
  ),
  swap: (featured, a) => (
    <svg
      viewBox="0 0 200 72"
      style={{ width: featured ? '70%' : '84%', maxWidth: 250, height: 'auto' }}
      role="img"
      aria-label="Comparing alternatives"
    >
      <rect x="6" y="15" width="64" height="42" rx="9" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="1.4" />
      <rect x="130" y="15" width="64" height="42" rx="9" fill={a.bg} stroke={a.border} strokeWidth="1.4" />
      <line x1="76" y1="30" x2="120" y2="30" stroke="var(--ink-3)" strokeWidth="2" />
      <path d="M120 30 l-7 -3.5 v7 z" fill="var(--ink-3)" />
      <line x1="124" y1="43" x2="80" y2="43" stroke="var(--ink-3)" strokeWidth="2" />
      <path d="M80 43 l7 -3.5 v7 z" fill="var(--ink-3)" />
    </svg>
  ),
  growth: (featured, a) => (
    <svg viewBox="0 0 200 92" style={{ width: featured ? '68%' : '82%', maxWidth: 240, height: 'auto' }} role="img" aria-label="Early-stage growth">
      <rect x="26" y="50" width="38" height="32" rx="6" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="1.4" />
      <rect x="80" y="34" width="38" height="48" rx="6" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="1.4" />
      <rect x="134" y="16" width="38" height="66" rx="6" fill={a.bg} stroke={a.border} strokeWidth="1.6" />
      <path d="M40 44 L99 26 L150 11" stroke={a.text} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  clients: (featured, a) => (
    <svg viewBox="0 0 200 100" style={{ width: featured ? '58%' : '72%', maxWidth: 210, height: 'auto' }} role="img" aria-label="Agency and its clients">
      <line x1="100" y1="50" x2="42" y2="24" stroke="var(--line-3)" strokeWidth="1.5" />
      <line x1="100" y1="50" x2="158" y2="24" stroke="var(--line-3)" strokeWidth="1.5" />
      <line x1="100" y1="50" x2="42" y2="76" stroke="var(--line-3)" strokeWidth="1.5" />
      <line x1="100" y1="50" x2="158" y2="76" stroke="var(--line-3)" strokeWidth="1.5" />
      <circle cx="42" cy="24" r="11" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="1.4" />
      <circle cx="158" cy="24" r="11" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="1.4" />
      <circle cx="42" cy="76" r="11" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="1.4" />
      <circle cx="158" cy="76" r="11" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="1.4" />
      <circle cx="100" cy="50" r="19" fill={a.bg} stroke={a.border} strokeWidth="1.6" />
    </svg>
  ),
}

export function TagPill({ tagSlug, tagName }: { tagSlug: TagSlug; tagName: string }) {
  const accent = TAG_ACCENTS[tagSlug]
  return (
    <span
      className="self-start text-[11px] font-semibold px-2 py-0.5 rounded-full"
      style={{ color: accent.text, background: accent.bg, border: `1px solid ${accent.border}` }}
    >
      {tagName}
    </span>
  )
}

export function AuthorAvatar({ post, size }: { post: Post; size: number }) {
  return (
    <span
      className="relative rounded-full inline-flex items-center justify-center font-bold text-on-solid shrink-0 overflow-hidden"
      style={{ width: size, height: size, background: post.authorColor, fontSize: size * 0.4 }}
    >
      {post.authorInitials}
      {post.authorPhoto && (
        // Real headshot layered over the initials fallback (shows through if the image is missing).
        <img src={post.authorPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}
    </span>
  )
}

/** Richer gradient art header for post cards — tag-tinted mesh + glow + texture + a glass icon tile. */
export function ArtPanel({ tagSlug, variant, thumb }: { tagSlug: TagSlug; variant: 'featured' | 'card'; thumb?: string }) {
  const a = TAG_ACCENTS[tagSlug]
  const Icon = TAG_ICONS[tagSlug]
  const featured = variant === 'featured'
  const art = thumb ? THUMB_ART[thumb] : undefined
  return (
    <div
      className={`relative overflow-hidden border-line ${
        featured ? 'min-h-[220px] border-b md:border-b-0 md:border-r' : 'h-[140px] border-b'
      }`}
      style={{ background: 'var(--surface-2)' }}
    >
      {/* tag-tinted gradient wash */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(140deg, ${a.gradientFrom}, ${a.gradientTo})` }} />
      {/* colored corner glow */}
      <div
        className={`absolute -top-8 -left-6 rounded-full blur-3xl ${featured ? 'w-52 h-52' : 'w-36 h-36'}`}
        style={{ background: a.text, opacity: 0.22 }}
      />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-noise opacity-[0.1] mix-blend-overlay" />
      {/* oversized faded watermark icon (featured only) */}
      {featured && !art && (
        <Icon size={190} strokeWidth={1} className="absolute -bottom-10 -right-8" style={{ color: a.text, opacity: 0.07 }} />
      )}
      {/* focal: per-post art when available, else a crisp icon in a glass tile */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {art ? (
          art(featured, a)
        ) : (
          <div
            className={`${
              featured ? 'w-[72px] h-[72px] rounded-2xl' : 'w-14 h-14 rounded-xl'
            } bg-surface-2 border border-line-3 backdrop-blur-sm flex items-center justify-center shadow-md`}
          >
            <Icon size={featured ? 34 : 24} strokeWidth={1.75} style={{ color: a.text }} />
          </div>
        )}
      </div>
    </div>
  )
}

/** Standard blog post card (grid variant). `index` staggers the fade-up animation. */
export default function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <Link
      href={getPostUrl(post)}
      className="animate-fade-up group flex flex-col glass-card overflow-hidden transition-all duration-300 hover:border-line hover:-translate-y-1 hover:shadow-md"
      style={{ animationDelay: `${(index % 3) * 0.06}s`, animationFillMode: 'both' }}
    >
      <ArtPanel tagSlug={post.tagSlug} variant="card" thumb={post.thumbnail} />
      <div className="p-5 flex flex-col flex-1">
        <TagPill tagSlug={post.tagSlug} tagName={post.tagName} />
        <h3 className="mt-3 mb-2 text-base font-bold text-ink leading-snug">{post.title}</h3>
        <p className="mb-4 text-[13px] text-ink-2 leading-relaxed flex-1">{post.excerpt}</p>
        <div className="flex items-center gap-1.5 text-xs text-ink-4">
          <AuthorAvatar post={post} size={18} />
          <span className="text-ink-3">{post.authorName}</span>
          <span>·</span>
          <span>{post.dateLabel}</span>
          <span>·</span>
          <span>{post.readingTime} min</span>
          <ArrowUpRight
            size={15}
            className="ml-auto flex-shrink-0 text-ink-4 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
          />
        </div>
      </div>
    </Link>
  )
}
