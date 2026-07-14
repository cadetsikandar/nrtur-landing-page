import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { pageMetadata } from '@/lib/metadata'
import { fetchPostsByTag, TAG_LABELS, TAG_SLUGS, type TagSlug } from '@/lib/ghost'
import PostCard from '@/components/PostCard'

// Per-cluster meta descriptions (also used as the page intro + JSON-LD description).
const CLUSTER_DESCRIPTIONS: Record<TagSlug, string> = {
  alternatives:
    'Hands-on comparisons of the best CRM alternatives for small teams — what actually holds up, and what quietly triples in price at renewal.',
  comparisons:
    'Side-by-side CRM comparisons with real cost breakdowns, so you can see exactly where each platform pulls ahead for a lean team.',
  'use-cases':
    'How real agencies, consultants, and solo founders run their pipelines in nrtur — the exact setups that work.',
  guides:
    'Step-by-step guides for building pipelines, automating follow-ups, and migrating your CRM without losing a thing.',
}

function isTagSlug(value: string): value is TagSlug {
  return (TAG_SLUGS as string[]).includes(value)
}

export function generateStaticParams() {
  return TAG_SLUGS.map((cluster) => ({ cluster }))
}

// Only the four known clusters are valid; any other path 404s.
export const dynamicParams = false
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: { cluster: string }
}): Promise<Metadata> {
  const { cluster } = params
  if (!isTagSlug(cluster)) notFound()
  return pageMetadata({
    title: `${TAG_LABELS[cluster]} · nrtur blog`,
    description: CLUSTER_DESCRIPTIONS[cluster],
    path: `/${cluster}/`,
  })
}

export default async function ClusterPage({ params }: { params: { cluster: string } }) {
  const { cluster } = params
  if (!isTagSlug(cluster)) notFound()

  const posts = await fetchPostsByTag(cluster)
  const label = TAG_LABELS[cluster]
  const description = CLUSTER_DESCRIPTIONS[cluster]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `https://nrtur.io/${cluster}/#collection`,
        url: `https://nrtur.io/${cluster}/`,
        name: `${label} · nrtur blog`,
        description,
        isPartOf: { '@id': 'https://nrtur.io/blog/#blog' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nrtur.io/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://nrtur.io/blog/' },
          { '@type': 'ListItem', position: 3, name: label, item: `https://nrtur.io/${cluster}/` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-brand-600/15 -top-52 left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <div className="section-label justify-center mb-4">
            <span>Blog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] mb-5">
            <span className="text-white">{label}</span>
          </h1>
          <p className="max-w-lg mx-auto text-lg text-white/45 leading-relaxed">{description}</p>
        </div>
      </section>

      {/* Posts */}
      <section className="relative pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-10 flex justify-center">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/45 hover:text-white/80 transition-colors duration-200"
            >
              <ArrowLeft size={15} />
              All posts
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-white/30 text-[15px]">
              No posts in this topic yet — check back soon.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
