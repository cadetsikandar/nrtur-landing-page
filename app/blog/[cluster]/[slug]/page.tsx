import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import {
  fetchPostBySlug,
  getAllPosts,
  getPostUrl,
  TAG_LABELS,
  type Post,
} from '@/lib/ghost'
import { SITE_URL } from '@/lib/metadata'
import { TagPill, AuthorAvatar } from '@/components/PostCard'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ cluster: p.tagSlug, slug: p.slug }))
}

// Allow new Ghost posts to be rendered on-demand via ISR.
export const dynamicParams = true
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: { cluster: string; slug: string }
}): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug)
  if (!post) return {}
  const url = `${SITE_URL}${getPostUrl(post)}`
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: getPostUrl(post) },
    openGraph: {
      type: 'article',
      siteName: 'nrtur',
      title: post.title,
      description: post.excerpt,
      url,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { cluster: string; slug: string }
}) {
  const post: Post | null = await fetchPostBySlug(params.slug)
  if (!post) notFound()

  const canonical = `${SITE_URL}${getPostUrl(post)}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        author: { '@type': 'Person', name: post.authorName },
        datePublished: post.dateLabel,
        publisher: {
          '@type': 'Organization',
          name: 'nrtur',
          logo: { '@type': 'ImageObject', url: 'https://www.nrtur.io/nrtur-logo.png' },
        },
        mainEntityOfPage: canonical,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.nrtur.io/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.nrtur.io/blog/' },
          {
            '@type': 'ListItem',
            position: 3,
            name: TAG_LABELS[post.tagSlug],
            item: `https://www.nrtur.io/${post.tagSlug}/`,
          },
          { '@type': 'ListItem', position: 4, name: post.title, item: canonical },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="relative pt-32 pb-24 overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-surface-2 -top-52 left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8">
          {/* Back link */}
          <Link
            href={`/${post.tagSlug}/`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-3 hover:text-ink-2 transition-colors duration-200 mb-8"
          >
            <ArrowLeft size={15} />
            {TAG_LABELS[post.tagSlug]}
          </Link>

          {/* Header */}
          <header className="mb-10">
            <TagPill tagSlug={post.tagSlug} tagName={post.tagName} />
            <h1 className="mt-4 text-3xl sm:text-[40px] font-serif font-semibold tracking-tight text-ink leading-[1.1]">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-ink-4">
              <AuthorAvatar post={post} size={28} />
              <span className="text-ink-3">{post.authorName}</span>
              <span>·</span>
              <span>{post.dateLabel}</span>
              <span>·</span>
              <span>{post.readingTime} min read</span>
            </div>
          </header>

          {/* Body */}
          {post.bodyHtml ? (
            <div
              className="max-w-none text-[15px] text-ink-2 leading-relaxed [&>p]:mb-5 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-ink [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-ink [&>h3]:mt-8 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-5 [&_li]:mb-2 [&_a]:text-accent [&_a]:underline [&_strong]:text-ink [&_blockquote]:border-l-2 [&_blockquote]:border-line-3 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-ink-2 [&_img]:rounded-xl [&_img]:my-6"
              dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
            />
          ) : (
            <>
              <p className="text-lg text-ink-3 leading-relaxed">{post.excerpt}</p>
              <p className="mt-8 border-l-2 border-line pl-4 text-sm text-ink-4">
                Full article coming soon — connect your Ghost blog to publish the complete post.
              </p>
            </>
          )}
        </div>
      </article>
    </>
  )
}
