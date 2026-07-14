import type { Metadata } from 'next'

export const SITE_URL = 'https://nrtur.io'

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
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  }
}
