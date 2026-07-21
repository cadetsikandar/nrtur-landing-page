// Server-only blog source. Local Markdown files in content/blog/<cluster>/<slug>.md
// are the primary source of truth; when there are none, this falls back to Ghost (if
// GHOST_URL is configured) and finally to the bundled seed posts.
//
// This module imports fs / gray-matter / marked, so it must NEVER be imported by a
// client component. Server pages and the sitemap get their data from here; client
// components import types + constants from ./ghost.
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'
import {
  authors,
  colorFor,
  fetchInitialPosts as fetchInitialFromGhost,
  fetchPostBySlug as fetchBySlugFromGhost,
  fetchPostsByTag as fetchByTagFromGhost,
  getAllPosts as getAllFromGhost,
  initialsFor,
  TAG_LABELS,
  TAG_SLUGS,
  type FetchPostsResult,
  type Post,
  type TagSlug,
} from './ghost'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

interface FrontMatter {
  title: string
  excerpt: string
  tag?: string
  author?: string
  date?: string
  readingTime?: number
  featured?: boolean
}

function isTagSlug(value: string): value is TagSlug {
  return (TAG_SLUGS as string[]).includes(value)
}

function buildPost(
  fileName: string,
  folder: string,
  raw: string,
): { post: Post; ts: number } | null {
  const { data, content } = matter(raw)
  const fm = data as FrontMatter
  if (!fm.title) return null

  const slug = fileName.replace(/\.mdx?$/, '')
  const tagSlug: TagSlug = fm.tag && isTagSlug(fm.tag) ? fm.tag : isTagSlug(folder) ? folder : 'guides'

  const known = (authors as Record<string, { name: string; initials: string; color: string }>)[
    fm.author ?? ''
  ]
  const authorName = known?.name ?? fm.author ?? 'nrtur team'
  const body = content.trim()

  const post: Post = {
    id: slug,
    slug,
    title: fm.title,
    excerpt: fm.excerpt,
    tagName: TAG_LABELS[tagSlug],
    tagSlug,
    authorName,
    authorInitials: known?.initials ?? initialsFor(authorName),
    authorColor: known?.color ?? colorFor(authorName),
    dateLabel: fm.date
      ? new Date(fm.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : '',
    readingTime: fm.readingTime ?? Math.max(1, Math.round(body.split(/\s+/).length / 200)),
    featured: fm.featured,
    bodyHtml: body ? (marked.parse(body) as string) : undefined,
  }
  return { post, ts: fm.date ? new Date(fm.date).getTime() : 0 }
}

let cache: Post[] | null = null

function readLocalPosts(): Post[] {
  if (cache) return cache
  if (!fs.existsSync(CONTENT_DIR)) {
    cache = []
    return cache
  }
  const collected: { post: Post; ts: number }[] = []
  for (const folder of fs.readdirSync(CONTENT_DIR)) {
    const dir = path.join(CONTENT_DIR, folder)
    if (!fs.statSync(dir).isDirectory()) continue
    for (const file of fs.readdirSync(dir)) {
      if (!/\.mdx?$/.test(file)) continue
      const built = buildPost(file, folder, fs.readFileSync(path.join(dir, file), 'utf8'))
      if (built) collected.push(built)
    }
  }
  collected.sort((a, b) => b.ts - a.ts) // newest first
  cache = collected.map((c) => c.post)
  return cache
}

/** Every post — powers generateStaticParams and the sitemap. */
export async function getAllPosts(): Promise<Post[]> {
  const local = readLocalPosts()
  return local.length ? local : getAllFromGhost()
}

/** All posts in one cluster (/alternatives, /comparisons, /use-cases, /guides). */
export async function fetchPostsByTag(tag: TagSlug): Promise<Post[]> {
  const local = readLocalPosts()
  return local.length ? local.filter((p) => p.tagSlug === tag) : fetchByTagFromGhost(tag)
}

/** A single post by slug, including its rendered HTML body. */
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const local = readLocalPosts()
  return local.length ? (local.find((p) => p.slug === slug) ?? null) : fetchBySlugFromGhost(slug)
}

/** First page of posts for the blog index. */
export async function fetchInitialPosts(): Promise<FetchPostsResult> {
  const local = readLocalPosts()
  return local.length
    ? { posts: local.slice(0, 9), nextPage: null, usedLiveApi: false }
    : fetchInitialFromGhost()
}
