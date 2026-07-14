import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightLeft, ArrowRight, ArrowUpRight, GitBranch, Building2, BookOpen, Check, type LucideIcon } from 'lucide-react'
import { useRotatingPhrase } from '../hooks/useRotatingPhrase'
import {
  fetchInitialPosts,
  fetchMorePosts,
  getPostUrl,
  SEED_POSTS,
  TAG_ACCENTS,
  TAG_LABELS,
  type Post,
  type TagSlug,
} from '../lib/ghost'

const HEADLINE_PHRASES = ['for closing more deals.', 'for staying lean.', 'for switching CRMs.']

const TAG_ICONS: Record<TagSlug, LucideIcon> = {
  alternatives: ArrowRightLeft,
  comparisons: GitBranch,
  'use-cases': Building2,
  guides: BookOpen,
}

type FilterTag = 'all' | TagSlug

const FILTER_CHIPS: { slug: FilterTag; label: string }[] = [
  { slug: 'all', label: 'All' },
  { slug: 'alternatives', label: TAG_LABELS.alternatives },
  { slug: 'comparisons', label: TAG_LABELS.comparisons },
  { slug: 'use-cases', label: TAG_LABELS['use-cases'] },
  { slug: 'guides', label: TAG_LABELS.guides },
]

const PAGE_SIZE = 6

function TagPill({ tagSlug, tagName }: { tagSlug: TagSlug; tagName: string }) {
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

function AuthorAvatar({ post, size }: { post: Post; size: number }) {
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
function ArtPanel({ tagSlug, variant }: { tagSlug: TagSlug; variant: 'featured' | 'card' }) {
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

export default function BlogPage() {
  const { phrase } = useRotatingPhrase(HEADLINE_PHRASES)

  const [posts, setPosts] = useState<Post[]>(SEED_POSTS)
  const [usedLiveApi, setUsedLiveApi] = useState(false)
  const [nextGhostPage, setNextGhostPage] = useState<number | null>(null)
  const [tag, setTag] = useState<FilterTag>('all')
  const [page, setPage] = useState(1)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchInitialPosts().then((result) => {
      if (cancelled) return
      setPosts(result.posts)
      setUsedLiveApi(result.usedLiveApi)
      setNextGhostPage(result.nextPage)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const featuredPost = useMemo(() => posts.find((p) => p.featured) ?? posts[0], [posts])
  const restPosts = useMemo(() => posts.filter((p) => p !== featuredPost), [posts, featuredPost])
  const filteredPosts = useMemo(
    () => (tag === 'all' ? restPosts : restPosts.filter((p) => p.tagSlug === tag)),
    [restPosts, tag]
  )
  const shownPosts = useMemo(() => filteredPosts.slice(0, page * PAGE_SIZE), [filteredPosts, page])

  const hasMoreLocally = shownPosts.length < filteredPosts.length
  const canFetchMoreFromGhost = usedLiveApi && nextGhostPage !== null
  const showLoadMore = hasMoreLocally || canFetchMoreFromGhost

  function handleTagChange(next: FilterTag) {
    setTag(next)
    setPage(1)
  }

  async function handleLoadMore() {
    if (hasMoreLocally) {
      setPage((p) => p + 1)
      return
    }
    if (canFetchMoreFromGhost && nextGhostPage !== null) {
      const result = await fetchMorePosts(nextGhostPage)
      setPosts((prev) => [...prev, ...result.posts])
      setNextGhostPage(result.nextPage)
      setPage((p) => p + 1)
    }
  }

  function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
  }

  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-brand-600/15 -top-52 left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <div className="section-label justify-center mb-4">
            <span>Blog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] mb-5">
            <span className="text-white">The nrtur blog</span>
            <br />
            <span key={phrase} className="text-brand-400 inline-block animate-word-in">
              {phrase}
            </span>
          </h1>
          <p className="max-w-lg mx-auto text-lg text-white/45 leading-relaxed">
            Everything we've learned about running a lean sales team — never more than two clicks
            from the answer you need.
          </p>
        </div>
      </section>

      {/* Filter + posts */}
      <section className="relative pb-4">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Tag filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {FILTER_CHIPS.map((chip) => {
              const active = tag === chip.slug
              return (
                <button
                  key={chip.slug}
                  type="button"
                  onClick={() => handleTagChange(chip.slug)}
                  className={
                    active
                      ? 'px-4 py-2 rounded-full text-sm font-medium bg-brand-500/15 border border-brand-500/30 text-brand-300 transition-all duration-200'
                      : 'px-4 py-2 rounded-full text-sm font-medium bg-white/[0.03] border border-white/[0.06] text-white/45 hover:text-white/70 hover:border-white/10 transition-all duration-200'
                  }
                >
                  {chip.label}
                </button>
              )
            })}
          </div>

          {/* Featured */}
          {featuredPost && (
            <Link
              to={getPostUrl(featuredPost)}
              className="animate-fade-up group grid grid-cols-1 md:grid-cols-[1.1fr_1fr] glass-card overflow-hidden mb-10 transition-all duration-300 hover:border-white/10 hover:shadow-card-hover"
            >
              <ArtPanel tagSlug={featuredPost.tagSlug} variant="featured" />
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2.5 mb-3.5">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-brand-400">
                    Featured
                  </span>
                  <TagPill tagSlug={featuredPost.tagSlug} tagName={featuredPost.tagName} />
                </div>
                <h2 className="text-[28px] font-extrabold text-white leading-tight tracking-tight mb-3">
                  {featuredPost.title}
                </h2>
                <p className="text-[15px] text-white/45 leading-relaxed mb-5">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-2 text-[13px] text-white/30">
                  <AuthorAvatar post={featuredPost} size={20} />
                  <span className="text-white/50">{featuredPost.authorName}</span>
                  <span>·</span>
                  <span>{featuredPost.dateLabel}</span>
                  <span>·</span>
                  <span>{featuredPost.readingTime} min read</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 group-hover:gap-2.5 transition-all duration-200">
                  Read article
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shownPosts.map((post, i) => {
              return (
                <Link
                  key={post.id}
                  to={getPostUrl(post)}
                  className="animate-fade-up group flex flex-col glass-card overflow-hidden transition-all duration-300 hover:border-white/10 hover:-translate-y-1 hover:shadow-card-hover"
                  style={{ animationDelay: `${(i % 3) * 0.06}s`, animationFillMode: 'both' }}
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
            })}
          </div>

          {shownPosts.length === 0 && (
            <div className="text-center py-16 text-white/30 text-[15px]">
              No posts in this topic yet — check back soon.
            </div>
          )}

          {showLoadMore && (
            <div className="flex flex-col items-center gap-2.5 mt-10">
              <button
                type="button"
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-medium text-sm px-6 py-3 rounded-xl transition-all duration-200"
              >
                Load more posts
              </button>
              <p className="text-xs text-white/25">
                Showing {shownPosts.length} of {filteredPosts.length} posts
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe */}
      <section className="pb-24 pt-16">
        <div className="max-w-xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-brand-500/[0.06] border border-brand-500/[0.15] rounded-2xl px-8 py-9 text-center">
            <div className="orb w-[300px] h-[300px] bg-brand-500/10 -top-36 left-1/2 -translate-x-1/2" />
            <div className="relative">
              <h2 className="text-2xl font-extrabold tracking-tight text-white mb-2">
                Get new posts in your inbox
              </h2>
              <p className="text-sm text-white/40 mb-5">
                One email when we publish. No spam, unsubscribe anytime.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 bg-white/[0.04] border border-white/10 rounded-[10px] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-brand-500/40"
                />
                <button
                  type="submit"
                  className="bg-brand-500 hover:bg-brand-400 text-white text-[13px] font-semibold px-[18px] py-2.5 rounded-[10px] transition-all duration-200 inline-flex items-center gap-1.5"
                >
                  {subscribed ? (
                    <>
                      <Check size={14} /> Subscribed
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
