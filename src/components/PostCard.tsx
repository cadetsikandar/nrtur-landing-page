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
      className="rounded-full inline-flex items-center justify-center font-bold text-white shrink-0"
      style={{ width: size, height: size, background: post.authorColor, fontSize: size * 0.4 }}
    >
      {post.authorInitials}
    </span>
  )
}

/** Richer gradient art header for post cards — tag-tinted mesh + glow + texture + a glass icon tile. */
export function ArtPanel({ tagSlug, variant }: { tagSlug: TagSlug; variant: 'featured' | 'card' }) {
  const a = TAG_ACCENTS[tagSlug]
  const Icon = TAG_ICONS[tagSlug]
  const featured = variant === 'featured'
  return (
    <div
      className={`relative overflow-hidden border-white/5 ${
        featured ? 'min-h-[220px] border-b md:border-b-0 md:border-r' : 'h-[140px] border-b'
      }`}
      style={{ background: '#0c0c1a' }}
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
      {featured && (
        <Icon size={190} strokeWidth={1} className="absolute -bottom-10 -right-8" style={{ color: a.text, opacity: 0.07 }} />
      )}
      {/* crisp icon in a glass tile */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`${
            featured ? 'w-[72px] h-[72px] rounded-2xl' : 'w-14 h-14 rounded-xl'
          } bg-white/10 border border-white/15 backdrop-blur-sm flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.35)]`}
        >
          <Icon size={featured ? 34 : 24} strokeWidth={1.75} style={{ color: a.text }} />
        </div>
      </div>
    </div>
  )
}

/** Standard blog post card (grid variant). `index` staggers the fade-up animation. */
export default function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <Link
      href={getPostUrl(post)}
      className="animate-fade-up group flex flex-col glass-card overflow-hidden transition-all duration-300 hover:border-white/10 hover:-translate-y-1 hover:shadow-card-hover"
      style={{ animationDelay: `${(index % 3) * 0.06}s`, animationFillMode: 'both' }}
    >
      <ArtPanel tagSlug={post.tagSlug} variant="card" />
      <div className="p-5 flex flex-col flex-1">
        <TagPill tagSlug={post.tagSlug} tagName={post.tagName} />
        <h3 className="mt-3 mb-2 text-base font-bold text-white leading-snug">{post.title}</h3>
        <p className="mb-4 text-[13px] text-white/40 leading-relaxed flex-1">{post.excerpt}</p>
        <div className="flex items-center gap-1.5 text-xs text-white/30">
          <AuthorAvatar post={post} size={18} />
          <span className="text-white/45">{post.authorName}</span>
          <span>·</span>
          <span>{post.dateLabel}</span>
          <span>·</span>
          <span>{post.readingTime} min</span>
          <ArrowUpRight
            size={15}
            className="ml-auto flex-shrink-0 text-white/25 group-hover:text-brand-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
          />
        </div>
      </div>
    </Link>
  )
}
