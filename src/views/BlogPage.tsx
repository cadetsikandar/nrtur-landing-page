'use client'

import { useMemo, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { useRotatingPhrase } from '../hooks/useRotatingPhrase'
import { getPostUrl, TAG_LABELS, type Post, type TagSlug } from '../lib/ghost'
import PostCard, { ArtPanel, AuthorAvatar, TagPill } from '../components/PostCard'

// Short audience tags so the "The nrtur blog" line and the rotating line stay balanced.
const HEADLINE_PHRASES = ['for lean teams.', 'for closers.', 'for switchers.', 'for founders.']

type FilterTag = 'all' | TagSlug

const FILTER_CHIPS: { slug: FilterTag; label: string }[] = [
  { slug: 'all', label: 'All' },
  { slug: 'alternatives', label: TAG_LABELS.alternatives },
  { slug: 'comparisons', label: TAG_LABELS.comparisons },
  { slug: 'use-cases', label: TAG_LABELS['use-cases'] },
  { slug: 'guides', label: TAG_LABELS.guides },
]

const PAGE_SIZE = 6

export default function BlogPage({ initialPosts }: { initialPosts: Post[] }) {
  const { phrase } = useRotatingPhrase(HEADLINE_PHRASES)

  const [posts] = useState<Post[]>(initialPosts)
  const [tag, setTag] = useState<FilterTag>('all')
  const [page, setPage] = useState(1)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const featuredPost = useMemo(() => posts.find((p) => p.featured) ?? posts[0], [posts])
  const restPosts = useMemo(() => posts.filter((p) => p !== featuredPost), [posts, featuredPost])
  const filteredPosts = useMemo(
    () => (tag === 'all' ? restPosts : restPosts.filter((p) => p.tagSlug === tag)),
    [restPosts, tag]
  )
  const shownPosts = useMemo(() => filteredPosts.slice(0, page * PAGE_SIZE), [filteredPosts, page])

  const showLoadMore = shownPosts.length < filteredPosts.length

  function handleTagChange(next: FilterTag) {
    setTag(next)
    setPage(1)
  }

  function handleLoadMore() {
    setPage((p) => p + 1)
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
        <div className="orb w-[500px] h-[500px] bg-surface-2 -top-52 left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <div className="section-label justify-center mb-4">
            <span>Blog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-semibold tracking-tight leading-[1.05] mb-5">
            <span className="text-ink">The nrtur blog</span>
            <br />
            <span key={phrase} className="hero-emph italic inline-block animate-word-in">
              {phrase}
            </span>
          </h1>
          <p className="max-w-lg mx-auto text-lg text-ink-2 leading-relaxed">
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
                      ? 'px-4 py-2 rounded-full text-sm font-medium bg-accent-soft border border-accent-line text-accent-ink transition-all duration-200'
                      : 'px-4 py-2 rounded-full text-sm font-medium bg-surface border border-line-2 text-ink shadow-sm hover:bg-surface-2 hover:border-line-3 transition-all duration-200'
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
              href={getPostUrl(featuredPost)}
              className="animate-fade-up group grid grid-cols-1 md:grid-cols-[1.1fr_1fr] glass-card overflow-hidden mb-10 transition-all duration-300 hover:border-line hover:shadow-md"
            >
              <ArtPanel tagSlug={featuredPost.tagSlug} variant="featured" />
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2.5 mb-3.5">
                  <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-accent">
                    Featured
                  </span>
                  <TagPill tagSlug={featuredPost.tagSlug} tagName={featuredPost.tagName} />
                </div>
                <h2 className="text-[28px] font-serif font-semibold text-ink leading-tight tracking-tight mb-3">
                  {featuredPost.title}
                </h2>
                <p className="text-[15px] text-ink-2 leading-relaxed mb-5">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-2 text-[13px] text-ink-4">
                  <AuthorAvatar post={featuredPost} size={20} />
                  <span className="text-ink-3">{featuredPost.authorName}</span>
                  <span>·</span>
                  <span>{featuredPost.dateLabel}</span>
                  <span>·</span>
                  <span>{featuredPost.readingTime} min read</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all duration-200">
                  Read article
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shownPosts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>

          {shownPosts.length === 0 && (
            <div className="text-center py-16 text-ink-3 text-[15px]">
              No posts in this topic yet — check back soon.
            </div>
          )}

          {showLoadMore && (
            <div className="flex flex-col items-center gap-2.5 mt-10">
              <button
                type="button"
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-3 border border-line hover:border-line-3 text-ink-2 hover:text-ink font-medium text-sm px-6 py-3 rounded-xl transition-all duration-200"
              >
                Load more posts
              </button>
              <p className="text-xs text-ink-4">
                Showing {shownPosts.length} of {filteredPosts.length} posts
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe */}
      <section className="pb-24 pt-16">
        <div className="max-w-xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-surface border border-line shadow-md rounded-2xl px-8 py-9 text-center">
            <div className="orb w-[300px] h-[300px] bg-surface-2 -top-36 left-1/2 -translate-x-1/2" />
            <div className="relative">
              <h2 className="text-2xl font-serif font-semibold tracking-tight text-ink mb-2">
                Get new posts in your inbox
              </h2>
              <p className="text-sm text-ink-2 mb-5">
                One email when we publish. No spam, unsubscribe anytime.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 bg-surface border border-line rounded-[10px] px-3.5 py-2.5 text-[13px] text-ink outline-none focus:border-accent-line"
                />
                <button
                  type="submit"
                  className="bg-btn-bg hover:bg-btn-bg-hover text-btn-fg text-[13px] font-semibold px-[18px] py-2.5 rounded-[10px] transition-all duration-200 inline-flex items-center gap-1.5"
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
