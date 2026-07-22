// Ghost Content API client + typed seed-data fallback for the Blog (server-side, ISR).
// Set GHOST_URL and GHOST_CONTENT_API_KEY in the environment to fetch live posts + bodies
// instead of seed data. Fetches use Next.js ISR (revalidate) so pages rebuild in the background.

export type TagSlug = 'alternatives' | 'comparisons' | 'use-cases' | 'guides'

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  tagName: string
  tagSlug: TagSlug
  authorName: string
  authorInitials: string
  authorColor: string
  dateLabel: string
  readingTime: number
  featured?: boolean
  /** Full HTML body — only present when fetched live from Ghost (seed posts have none). */
  bodyHtml?: string
}

export const TAG_LABELS: Record<TagSlug, string> = {
  alternatives: 'Alternatives',
  comparisons: 'Comparisons',
  'use-cases': 'Use Cases',
  guides: 'Guides',
}

export const TAG_SLUGS: TagSlug[] = ['alternatives', 'comparisons', 'use-cases', 'guides']

// `text` is the on-soft ink tone (used both as tint-pill text — must clear contrast —
// and as the ArtPanel icon/glow color, where the darker ink reads fine on the light tile).
export const TAG_ACCENTS: Record<TagSlug, { text: string; bg: string; border: string; gradientFrom: string; gradientTo: string }> = {
  alternatives: { text: 'var(--info-ink)', bg: 'var(--info-soft)', border: 'var(--line)', gradientFrom: 'var(--info-soft)', gradientTo: 'var(--info-soft)' },
  comparisons: { text: 'var(--accent-ink)', bg: 'var(--accent-soft)', border: 'var(--accent-line)', gradientFrom: 'var(--accent-soft)', gradientTo: 'var(--accent-soft)' },
  'use-cases': { text: 'var(--pos-ink)', bg: 'var(--pos-soft)', border: 'var(--line)', gradientFrom: 'var(--pos-soft)', gradientTo: 'var(--pos-soft)' },
  guides: { text: 'var(--warn-ink)', bg: 'var(--warn-soft)', border: 'var(--line)', gradientFrom: 'var(--warn-soft)', gradientTo: 'var(--warn-soft)' },
}

export const authors = {
  touqeer: { name: 'Touqeer Hassan', initials: 'TH', color: 'var(--avatar-indigo)' },
  sikandar: { name: 'Sikandar Ali', initials: 'SA', color: 'var(--avatar-green)' },
  saqib: { name: 'Saqib Hassan', initials: 'SH', color: 'var(--avatar-violet)' },
}

// Seed content (10 posts), ported from the design handoff's Blog.dc.html Component script —
// used whenever there's no configured Ghost instance, or the live fetch fails.
export const SEED_POSTS: Post[] = []

export function getPostUrl(post: Pick<Post, 'tagSlug' | 'slug'>): string {
  return `/blog/${post.tagSlug}/${post.slug}/`
}

// --- Ghost Content API -------------------------------------------------------

interface GhostTag {
  name: string
  slug: string
}

interface GhostAuthor {
  name: string
  profile_image?: string | null
}

interface GhostRawPost {
  id: string
  slug: string
  title: string
  excerpt: string
  html?: string | null
  feature_image?: string | null
  published_at: string
  reading_time: number
  primary_tag?: GhostTag | null
  primary_author?: GhostAuthor | null
}

interface GhostPostsResponse {
  posts: GhostRawPost[]
  meta: { pagination: { next: number | null } }
}

const AVATAR_PALETTE = ['var(--avatar-blue)', 'var(--avatar-violet)', 'var(--avatar-green)', 'var(--avatar-amber)', 'var(--avatar-pink)', 'var(--avatar-teal)']

export function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/)
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('')
}

export function colorFor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length]
}

function normalizeTagSlug(rawSlug: string | undefined): TagSlug {
  return (TAG_SLUGS.find((s) => s === rawSlug) ?? 'guides') as TagSlug
}

function mapGhostPost(raw: GhostRawPost): Post {
  const tagSlug = normalizeTagSlug(raw.primary_tag?.slug)
  const authorName = raw.primary_author?.name ?? 'nrtur team'
  const dateLabel = new Date(raw.published_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    tagName: raw.primary_tag?.name ?? TAG_LABELS[tagSlug],
    tagSlug,
    authorName,
    authorInitials: initialsFor(authorName),
    authorColor: colorFor(authorName),
    dateLabel,
    readingTime: raw.reading_time,
    bodyHtml: raw.html ?? undefined,
  }
}

function getGhostConfig(): { url: string; key: string } | null {
  const url = process.env.GHOST_URL
  const key = process.env.GHOST_CONTENT_API_KEY
  if (!url || !key) return null
  return { url, key }
}

const REVALIDATE_SECONDS = 3600 // ISR: rebuild affected pages at most once an hour

async function ghostGet(pathAndQuery: string): Promise<GhostPostsResponse> {
  const config = getGhostConfig()
  if (!config) throw new Error('Ghost not configured')
  const sep = pathAndQuery.includes('?') ? '&' : '?'
  const url = `${config.url.replace(/\/$/, '')}/ghost/api/content/${pathAndQuery}${sep}key=${config.key}`
  const response = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } })
  if (!response.ok) throw new Error(`Ghost Content API request failed: ${response.status}`)
  return (await response.json()) as GhostPostsResponse
}

export interface FetchPostsResult {
  posts: Post[]
  nextPage: number | null
  usedLiveApi: boolean
}

/** First page of posts for the blog index. Live Ghost when configured, else seed content. */
export async function fetchInitialPosts(): Promise<FetchPostsResult> {
  if (getGhostConfig()) {
    try {
      const data = await ghostGet('posts/?include=tags,authors&limit=9&page=1')
      return { posts: data.posts.map(mapGhostPost), nextPage: data.meta?.pagination?.next ?? null, usedLiveApi: true }
    } catch {
      // fall through to seed content
    }
  }
  return { posts: SEED_POSTS, nextPage: null, usedLiveApi: false }
}

/** All posts for one tag cluster (/alternatives, /comparisons, /use-cases, /guides). */
export async function fetchPostsByTag(tag: TagSlug): Promise<Post[]> {
  if (getGhostConfig()) {
    try {
      const data = await ghostGet(`posts/?include=tags,authors&limit=all&filter=tag:${tag}`)
      return data.posts.map(mapGhostPost)
    } catch {
      // fall through to seed content
    }
  }
  return SEED_POSTS.filter((p) => p.tagSlug === tag)
}

/** A single post by slug, including its full HTML body (live Ghost only). */
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  if (getGhostConfig()) {
    try {
      const data = await ghostGet(`posts/slug/${slug}/?include=tags,authors`)
      const raw = data.posts?.[0]
      if (raw) return mapGhostPost(raw)
    } catch {
      // fall through to seed content
    }
  }
  return SEED_POSTS.find((p) => p.slug === slug) ?? null
}

/** Every post's routing params — powers generateStaticParams for article + cluster pages. */
export async function getAllPosts(): Promise<Post[]> {
  if (getGhostConfig()) {
    try {
      const data = await ghostGet('posts/?include=tags,authors&limit=all')
      return data.posts.map(mapGhostPost)
    } catch {
      // fall through to seed content
    }
  }
  return SEED_POSTS
}
