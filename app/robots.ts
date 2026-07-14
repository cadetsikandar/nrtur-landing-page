import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/app', '/design'] },
      // Named groups replace the '*' group for that bot, so the /app + /design
      // blocks must be repeated here — otherwise these AI crawlers would be
      // allowed into paths every other bot is kept out of.
      { userAgent: 'GPTBot', allow: '/', disallow: ['/app', '/design'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/app', '/design'] },
    ],
    sitemap: 'https://www.nrtur.io/sitemap.xml',
    host: 'https://www.nrtur.io',
  }
}
