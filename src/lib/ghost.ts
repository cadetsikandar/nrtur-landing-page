/// <reference types="vite/client" />
// Ghost Content API client + typed seed-data fallback for the Blog page.
// Set VITE_GHOST_URL and VITE_GHOST_CONTENT_API_KEY in a .env file to fetch live posts instead of seed data.

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
}

export const TAG_LABELS: Record<TagSlug, string> = {
  alternatives: 'Alternatives',
  comparisons: 'Comparisons',
  'use-cases': 'Use Cases',
  guides: 'Guides',
}

export const TAG_ACCENTS: Record<TagSlug, { text: string; bg: string; border: string; gradientFrom: string; gradientTo: string }> = {
  alternatives: { text: '#60a5fa', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)', gradientFrom: 'rgba(59,130,246,0.25)', gradientTo: 'rgba(99,102,241,0.15)' },
  comparisons: { text: '#818cf8', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)', gradientFrom: 'rgba(99,102,241,0.25)', gradientTo: 'rgba(139,92,246,0.15)' },
  'use-cases': { text: '#34d399', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', gradientFrom: 'rgba(16,185,129,0.25)', gradientTo: 'rgba(20,184,166,0.15)' },
  guides: { text: '#fbbf24', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', gradientFrom: 'rgba(245,158,11,0.25)', gradientTo: 'rgba(249,115,22,0.15)' },
}

const authors = {
  touqeer: { name: 'Touqeer Hassan', initials: 'TH', color: '#6366f1' },
  sikandar: { name: 'Sikandar Ali', initials: 'SA', color: '#10b981' },
  saqib: { name: 'Saqib Hassan', initials: 'SH', color: '#8b5cf6' },
}

// Seed content (10 posts), ported from the design handoff's Blog.dc.html Component script —
// used whenever there's no configured Ghost instance, or the live fetch fails.
export const SEED_POSTS: Post[] = [
  { id: 'best-hubspot-alternatives-small-teams', slug: 'best-hubspot-alternatives-small-teams', title: 'The 7 best HubSpot alternatives for teams under 10', excerpt: "We tested every major CRM at a 5-person budget. Here's what actually holds up — and what quietly triples in price at renewal.", tagName: TAG_LABELS.alternatives, tagSlug: 'alternatives', dateLabel: 'Jun 2025', readingTime: 9, authorName: authors.touqeer.name, authorInitials: authors.touqeer.initials, authorColor: authors.touqeer.color, featured: true },
  { id: 'nrtur-vs-hubspot', slug: 'nrtur-vs-hubspot', title: 'nrtur vs HubSpot: a real cost breakdown', excerpt: "What a 5-seat team actually pays over 12 months on each platform — including the add-ons HubSpot doesn't put on the pricing page.", tagName: TAG_LABELS.comparisons, tagSlug: 'comparisons', dateLabel: 'May 2025', readingTime: 7, authorName: authors.touqeer.name, authorInitials: authors.touqeer.initials, authorColor: authors.touqeer.color },
  { id: 'migrate-from-hubspot-to-nrtur', slug: 'migrate-from-hubspot-to-nrtur', title: 'How to migrate from HubSpot in under 30 minutes', excerpt: 'A field-tested checklist for exporting contacts, deals and email history — and importing them cleanly without losing a thing.', tagName: TAG_LABELS.guides, tagSlug: 'guides', dateLabel: 'Apr 2025', readingTime: 6, authorName: authors.sikandar.name, authorInitials: authors.sikandar.initials, authorColor: authors.sikandar.color },
  { id: 'lean-sales-stack-agency', slug: 'lean-sales-stack-agency', title: 'The lean sales stack for a 3-person agency', excerpt: "The exact tools (and the ones we dropped) that let a tiny agency run a full pipeline without a dedicated ops hire.", tagName: TAG_LABELS['use-cases'], tagSlug: 'use-cases', dateLabel: 'Apr 2025', readingTime: 8, authorName: authors.saqib.name, authorInitials: authors.saqib.initials, authorColor: authors.saqib.color },
  { id: 'pipedrive-vs-nrtur-solo-founder', slug: 'pipedrive-vs-nrtur-solo-founder', title: 'Pipedrive vs nrtur: which fits a solo founder?', excerpt: "Both are built for speed. We break down where each one pulls ahead when it's just you running every deal.", tagName: TAG_LABELS.comparisons, tagSlug: 'comparisons', dateLabel: 'Mar 2025', readingTime: 6, authorName: authors.saqib.name, authorInitials: authors.saqib.initials, authorColor: authors.saqib.color },
  { id: 'crm-automations-consultants', slug: 'crm-automations-consultants', title: '6 CRM automations every consultant should steal', excerpt: 'Follow-ups, renewals, and check-ins that run themselves — copy these workflows straight into your account.', tagName: TAG_LABELS.guides, tagSlug: 'guides', dateLabel: 'Mar 2025', readingTime: 5, authorName: authors.sikandar.name, authorInitials: authors.sikandar.initials, authorColor: authors.sikandar.color },
  { id: 'agencies-client-pipelines', slug: 'agencies-client-pipelines', title: 'How agencies run client pipelines in nrtur', excerpt: 'Separate boards per client, shared visibility for the team, and a clean handoff from sales to delivery.', tagName: TAG_LABELS['use-cases'], tagSlug: 'use-cases', dateLabel: 'Feb 2025', readingTime: 7, authorName: authors.saqib.name, authorInitials: authors.saqib.initials, authorColor: authors.saqib.color },
  { id: 'do-you-need-salesforce', slug: 'do-you-need-salesforce', title: 'Do you actually need Salesforce? A right-sizing checklist', excerpt: 'Ten questions that tell you whether enterprise CRM is solving your problems or creating them.', tagName: TAG_LABELS.alternatives, tagSlug: 'alternatives', dateLabel: 'Feb 2025', readingTime: 6, authorName: authors.touqeer.name, authorInitials: authors.touqeer.initials, authorColor: authors.touqeer.color },
  { id: 'zoho-vs-nrtur-tiny-teams', slug: 'zoho-vs-nrtur-tiny-teams', title: 'Zoho CRM vs nrtur for tiny teams', excerpt: "Zoho wins on breadth, nrtur on focus. Here's how to decide which trade-off fits your team.", tagName: TAG_LABELS.comparisons, tagSlug: 'comparisons', dateLabel: 'Jan 2025', readingTime: 5, authorName: authors.sikandar.name, authorInitials: authors.sikandar.initials, authorColor: authors.sikandar.color },
  { id: 'first-pipeline-10-minutes', slug: 'first-pipeline-10-minutes', title: 'Set up your first pipeline in 10 minutes', excerpt: 'Stages, deal values, and the two automations worth turning on from day one — a complete walkthrough.', tagName: TAG_LABELS.guides, tagSlug: 'guides', dateLabel: 'Jan 2025', readingTime: 4, authorName: authors.saqib.name, authorInitials: authors.saqib.initials, authorColor: authors.saqib.color },
]

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

const AVATAR_PALETTE = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#14b8a6']

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/)
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('')
}

function colorFor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length]
}

function normalizeTagSlug(rawSlug: string | undefined): TagSlug {
  const known: TagSlug[] = ['alternatives', 'comparisons', 'use-cases', 'guides']
  return (known.find((s) => s === rawSlug) ?? 'guides') as TagSlug
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
  }
}

function getGhostConfig(): { url: string; key: string } | null {
  const url = import.meta.env.VITE_GHOST_URL
  const key = import.meta.env.VITE_GHOST_CONTENT_API_KEY
  if (!url || !key) return null
  return { url, key }
}

async function fetchGhostPage(page: number): Promise<{ posts: Post[]; nextPage: number | null }> {
  const config = getGhostConfig()
  if (!config) throw new Error('Ghost not configured')

  const params = new URLSearchParams({
    key: config.key,
    include: 'tags,authors',
    limit: '9',
    page: String(page),
  })
  const response = await fetch(`${config.url.replace(/\/$/, '')}/ghost/api/content/posts/?${params.toString()}`)
  if (!response.ok) throw new Error(`Ghost Content API request failed: ${response.status}`)

  const data = (await response.json()) as GhostPostsResponse
  return {
    posts: data.posts.map(mapGhostPost),
    nextPage: data.meta?.pagination?.next ?? null,
  }
}

export interface FetchPostsResult {
  posts: Post[]
  nextPage: number | null
  usedLiveApi: boolean
}

// Loads the first page of posts. Tries the live Ghost Content API when configured;
// silently falls back to local seed content when unconfigured or the request fails
// (the expected/normal state for local development without a live Ghost instance).
export async function fetchInitialPosts(): Promise<FetchPostsResult> {
  if (getGhostConfig()) {
    try {
      const { posts, nextPage } = await fetchGhostPage(1)
      return { posts, nextPage, usedLiveApi: true }
    } catch {
      // fall through to seed content below
    }
  }
  return { posts: SEED_POSTS, nextPage: null, usedLiveApi: false }
}

// Fetches the next page from Ghost for "Load more" when running against a live instance.
export async function fetchMorePosts(page: number): Promise<FetchPostsResult> {
  const { posts, nextPage } = await fetchGhostPage(page)
  return { posts, nextPage, usedLiveApi: true }
}
