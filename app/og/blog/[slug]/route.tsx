// GET /og/blog/<slug>/ — per-article social card: the post's own title on the shared
// template, so a shared blog link unfurls with its headline rather than the generic
// site card. Referenced from app/blog/[cluster]/[slug]/page.tsx via ogImage().
//
// Runs on the Edge runtime (see src/lib/og-image.tsx), so it can't read content/blog
// with fs like the page does. It reads the frontmatter manifest that
// scripts/build-post-manifest.mjs generates before every dev/build instead.
import { authors, TAG_LABELS, type TagSlug } from '@/lib/ghost'
import { renderOgCard } from '@/lib/og-image'
import manifest from '@/generated/post-manifest.json'

export const runtime = 'edge'

type ManifestEntry = { title: string; tag: string; author?: string; date?: string }
const posts = manifest as Record<string, ManifestEntry>

export function GET(_req: Request, { params }: { params: { slug: string } }) {
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
