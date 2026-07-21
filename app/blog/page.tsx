import { pageMetadata } from '@/lib/metadata'
import { fetchInitialPosts } from '@/lib/blog-content'
import BlogPage from '@/views/BlogPage'

export const metadata = pageMetadata({
  title: 'Blog — CRM tips, comparisons & guides',
  description:
    "Everything we've learned about running a lean sales team — HubSpot alternatives, CRM comparisons, use cases, and setup guides.",
  path: '/blog/',
})

export const revalidate = 3600

export default async function Page() {
  const { posts } = await fetchInitialPosts()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': 'https://www.nrtur.io/blog/#blog',
        url: 'https://www.nrtur.io/blog/',
        name: 'The nrtur blog',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.nrtur.io/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.nrtur.io/blog/' },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPage initialPosts={posts} />
    </>
  )
}
