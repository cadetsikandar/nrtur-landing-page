import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/app', '/design'] },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
    ],
    sitemap: 'https://www.nrtur.io/sitemap.xml',
    host: 'https://www.nrtur.io',
  }
}
