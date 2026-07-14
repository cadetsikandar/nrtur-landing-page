import type { MetadataRoute } from 'next'
import { getAllPosts, getPostUrl, TAG_SLUGS } from '@/lib/ghost'

const BASE_URL = 'https://www.nrtur.io'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const posts = await getAllPosts()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/faq/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/compare/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog/`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
  ]

  const clusterPages: MetadataRoute.Sitemap = TAG_SLUGS.map((slug) => ({
    url: `${BASE_URL}/${slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const articlePages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}${getPostUrl(post)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticPages, ...clusterPages, ...articlePages]
}
