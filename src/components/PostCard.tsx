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
// One cohesive system: surface "cards" with 2px --line-2 borders, ink-4 connectors, and a single
// accent "hero" element (a.bg fill + a.border + a.text) lifted by a soft accent glow. Theme-aware
// via design tokens; the glow is an accent-tinted shape blurred with a CSS filter (no SVG-filter ids
// to collide across the many cards that reuse the same art).
const THUMB_ART: Record<string, (featured: boolean, a: ThumbAccent) => JSX.Element> = {
  'four-object': (featured, a) => (
    <svg viewBox="0 0 300 80" style={{ width: featured ? '84%' : '92%', maxWidth: 330, height: 'auto' }} role="img" aria-label="A lead becomes a contact, then a company, then a deal">
      {[68, 146, 224].map((x) => (
        <g key={x}>
          <line x1={x} y1="40" x2={x + 10} y2="40" stroke="var(--ink-4)" strokeWidth="2" strokeLinecap="round" />
          <path d={`M${x + 12} 40 l-5 -3.2 v6.4 z`} fill="var(--ink-4)" />
        </g>
      ))}
      <rect x="2" y="16" width="64" height="48" rx="10" fill="var(--surface)" stroke="var(--line-3)" strokeWidth="2" strokeDasharray="5 4" />
      <text x="34" y="44" textAnchor="middle" fill="var(--ink-2)" fontSize="10" fontWeight="600" fontFamily="system-ui">Lead</text>
      <rect x="80" y="16" width="64" height="48" rx="10" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="2" />
      <text x="112" y="44" textAnchor="middle" fill="var(--ink-2)" fontSize="10" fontWeight="600" fontFamily="system-ui">Contact</text>
      <rect x="158" y="16" width="64" height="48" rx="10" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="2" />
      <text x="190" y="44" textAnchor="middle" fill="var(--ink-2)" fontSize="9" fontWeight="600" fontFamily="system-ui">Company</text>
      <rect x="237" y="11" width="61" height="58" rx="12" fill={a.text} opacity="0.26" style={{ filter: 'blur(7px)' }} />
      <rect x="237" y="14" width="61" height="52" rx="11" fill={a.bg} stroke={a.border} strokeWidth="2" />
      <text x="267" y="44" textAnchor="middle" fill={a.text} fontSize="10" fontWeight="700" fontFamily="system-ui">Deal</text>
    </svg>
  ),
  speed: (featured, a) => (
    <svg viewBox="0 0 180 122" style={{ width: featured ? '48%' : '56%', maxWidth: 196, height: 'auto' }} role="img" aria-label="A speed gauge pinned to under five minutes">
      <path d="M22 96 A68 68 0 0 1 158 96" fill="none" stroke="var(--line-2)" strokeWidth="9" strokeLinecap="round" />
      <path d="M126 40 A68 68 0 0 1 158 96" fill="none" stroke={a.text} strokeWidth="9" strokeLinecap="round" />
      <circle cx="150" cy="58" r="9" fill={a.text} opacity="0.5" style={{ filter: 'blur(5px)' }} />
      <line x1="90" y1="96" x2="132" y2="56" stroke="var(--ink)" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="90" cy="96" r="7" fill="var(--ink)" />
      <circle cx="90" cy="96" r="2.5" fill="var(--surface)" />
      <text x="90" y="118" textAnchor="middle" fill={a.text} fontSize="15" fontWeight="800" fontFamily="system-ui">{'< 5 min'}</text>
    </svg>
  ),
  'crm-fit': (featured, a) => (
    <svg viewBox="0 0 250 96" style={{ width: featured ? '78%' : '90%', maxWidth: 290, height: 'auto' }} role="img" aria-label="The right-size CRM — not too much, not too little">
      <rect x="6" y="14" width="72" height="58" rx="10" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="2" opacity="0.7" />
      <text x="42" y="88" textAnchor="middle" fill="var(--ink-4)" fontSize="9" fontFamily="system-ui">too much</text>
      <rect x="176" y="34" width="46" height="38" rx="9" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="2" opacity="0.7" />
      <text x="199" y="88" textAnchor="middle" fill="var(--ink-4)" fontSize="9" fontFamily="system-ui">too little</text>
      <rect x="92" y="19" width="66" height="53" rx="12" fill={a.text} opacity="0.24" style={{ filter: 'blur(8px)' }} />
      <rect x="93" y="22" width="64" height="48" rx="11" fill={a.bg} stroke={a.border} strokeWidth="2.2" />
      <path d="M112 46 l6 6 l12 -13" fill="none" stroke={a.text} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="125" y="88" textAnchor="middle" fill={a.text} fontSize="9" fontWeight="700" fontFamily="system-ui">just right</text>
    </svg>
  ),
  versus: (featured, a) => (
    <svg viewBox="0 0 220 78" style={{ width: featured ? '72%' : '84%', maxWidth: 264, height: 'auto' }} role="img" aria-label="Two products head to head">
      <rect x="4" y="10" width="86" height="58" rx="11" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="2" />
      <rect x="16" y="22" width="30" height="5" rx="2.5" fill="var(--line-3)" />
      <rect x="16" y="34" width="50" height="4" rx="2" fill="var(--line-2)" />
      <rect x="16" y="44" width="40" height="4" rx="2" fill="var(--line-2)" />
      <rect x="130" y="10" width="86" height="58" rx="11" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="2" />
      <rect x="142" y="22" width="30" height="5" rx="2.5" fill="var(--line-3)" />
      <rect x="142" y="34" width="50" height="4" rx="2" fill="var(--line-2)" />
      <rect x="142" y="44" width="40" height="4" rx="2" fill="var(--line-2)" />
      <circle cx="110" cy="39" r="21" fill={a.text} opacity="0.3" style={{ filter: 'blur(7px)' }} />
      <circle cx="110" cy="39" r="20" fill={a.bg} stroke={a.border} strokeWidth="2" />
      <text x="110" y="44" textAnchor="middle" fill={a.text} fontSize="13" fontWeight="800" fontStyle="italic" fontFamily="system-ui">vs</text>
    </svg>
  ),
  swap: (featured, a) => (
    <svg viewBox="0 0 210 84" style={{ width: featured ? '72%' : '86%', maxWidth: 258, height: 'auto' }} role="img" aria-label="Switching from one tool to a better-fit alternative">
      <rect x="6" y="18" width="66" height="48" rx="11" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="2" />
      <rect x="138" y="14" width="66" height="56" rx="12" fill={a.text} opacity="0.24" style={{ filter: 'blur(7px)' }} />
      <rect x="138" y="18" width="66" height="48" rx="11" fill={a.bg} stroke={a.border} strokeWidth="2.2" />
      <path d="M80 33 q25 -12 50 0" fill="none" stroke="var(--ink-4)" strokeWidth="2" strokeLinecap="round" />
      <path d="M130 33 l-6 -1.5 l1.5 6.5 z" fill="var(--ink-4)" />
      <path d="M130 51 q-25 12 -50 0" fill="none" stroke="var(--ink-4)" strokeWidth="2" strokeLinecap="round" />
      <path d="M80 51 l6 1.5 l-1.5 -6.5 z" fill="var(--ink-4)" />
    </svg>
  ),
  growth: (featured, a) => (
    <svg viewBox="0 0 210 98" style={{ width: featured ? '70%' : '84%', maxWidth: 248, height: 'auto' }} role="img" aria-label="Early-stage growth trending up">
      <rect x="16" y="60" width="34" height="26" rx="6" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="2" />
      <rect x="62" y="46" width="34" height="40" rx="6" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="2" />
      <rect x="108" y="30" width="34" height="56" rx="6" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="2" />
      <rect x="154" y="12" width="36" height="76" rx="7" fill={a.text} opacity="0.22" style={{ filter: 'blur(7px)' }} />
      <rect x="154" y="14" width="34" height="72" rx="7" fill={a.bg} stroke={a.border} strokeWidth="2.2" />
      <path d="M33 54 L79 40 L125 24 L171 8" fill="none" stroke={a.text} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M171 8 l-8 0.5 l4 6 z" fill={a.text} />
      <circle cx="33" cy="54" r="3.2" fill={a.text} />
    </svg>
  ),
  clients: (featured, a) => (
    <svg viewBox="0 0 210 108" style={{ width: featured ? '60%' : '74%', maxWidth: 224, height: 'auto' }} role="img" aria-label="An agency at the center of its client accounts">
      {([[44, 24], [166, 24], [30, 74], [105, 92], [180, 74]] as const).map(([cx, cy]) => (
        <line key={`l-${cx}-${cy}`} x1="105" y1="54" x2={cx} y2={cy} stroke="var(--line-3)" strokeWidth="2" />
      ))}
      {([[44, 24], [166, 24], [30, 74], [105, 92], [180, 74]] as const).map(([cx, cy]) => (
        <circle key={`n-${cx}-${cy}`} cx={cx} cy={cy} r="12" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="2" />
      ))}
      <circle cx="105" cy="54" r="25" fill={a.text} opacity="0.28" style={{ filter: 'blur(8px)' }} />
      <circle cx="105" cy="54" r="22" fill={a.bg} stroke={a.border} strokeWidth="2.4" />
      <path d="M97 62 v-13 l8 -5 l8 5 v13 z" fill="none" stroke={a.text} strokeWidth="2" strokeLinejoin="round" />
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
