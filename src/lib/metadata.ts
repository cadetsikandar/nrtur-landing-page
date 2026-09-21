import type { Metadata } from 'next'

export const SITE_URL = 'https://nrtur.io'

/** Social-card (og:image) descriptor for a page.
 *
 *  Cards are served by route handlers under /og/ (app/og/…/route.tsx) rather than
 *  Next's file-based `opengraph-image` convention. The convention always emits a
 *  slash-less URL (`/opengraph-image?hash`), which `trailingSlash: true` turns into a
 *  308 — and LinkedIn's image fetcher does not follow redirects on og:image, so the
 *  card showed a blank placeholder. A trailing-slash route handler answers 200
 *  directly. `path` must therefore start and end with "/". */
export function ogImage(path = '/og/', alt = 'nrtur — The CRM small teams actually want to use') {
  return { url: path, width: 1200, height: 630, type: 'image/png', alt }
}

/** Build per-route metadata with a canonical URL (trailing-slash consistent) + OpenGraph.
 *  `path` should include a leading and trailing slash, e.g. "/about/". */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string
  description: string
  path: string
  noindex?: boolean
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'nrtur',
      title,
      description,
      url: `${SITE_URL}${path}`,
      images: [ogImage()],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  }
}
