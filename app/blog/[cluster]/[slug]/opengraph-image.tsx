// Per-article social card: the post's own title on the shared template, so a shared
// blog link unfurls with its headline rather than the generic site card.
//
// Runs on the Edge runtime (see src/lib/og-image.tsx), so it can't read content/blog
// with fs like the page does. It reads the frontmatter manifest that
// scripts/build-post-manifest.mjs generates before every dev/build instead.
import { authors, TAG_LABELS, type TagSlug } from '@/lib/ghost'
import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image'
import manifest from '@/generated/post-manifest.json'

export const runtime = 'edge'

export const alt = 'nrtur blog'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

type ManifestEntry = { title: string; tag: string; author?: string; date?: string }
const posts = manifest as Record<string, ManifestEntry>

export default function Image({ params }: { params: { cluster: string; slug: string } }) {
  const post = posts[params.slug]
  if (!post) {
    // Unknown slug (e.g. a Ghost-only post): generic blog card rather than a 404 image.
    return renderOgCard({
      eyebrow: 'nrtur blog',
      title: 'CRM guides and comparisons for small teams',
      footer: 'Hands-on, honest, and written for teams of 1–10.',
    })
  }

  const tagLabel = TAG_LABELS[post.tag as TagSlug] ?? TAG_LABELS.guides
  const authorName = (authors as Record<string, { name: string }>)[post.author ?? '']?.name ?? post.author ?? 'nrtur team'
  const dateLabel = post.date
    ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : ''

  return renderOgCard({
    eyebrow: `${tagLabel} · nrtur blog`,
    title: post.title,
    footer: `By ${authorName}${dateLabel ? ` · ${dateLabel}` : ''}`,
  })
}
