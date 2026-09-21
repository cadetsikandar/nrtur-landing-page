// GET /og/ — the site-wide social card (og:image for every page that isn't a blog
// article). A route handler at a trailing-slash path answers 200 directly; Next's
// file-based `opengraph-image` convention emits a slash-less URL that the site's
// `trailingSlash: true` turns into a 308, and LinkedIn's image fetcher does not
// follow redirects on og:image. See src/lib/metadata.ts → ogImage().
import { renderOgCard } from '@/lib/og-image'

// Must be 'edge' — see the note in src/lib/og-image.tsx.
export const runtime = 'edge'

export function GET() {
  return renderOgCard({
    eyebrow: 'CRM for small teams',
    title: 'The CRM small teams actually want to use',
    footer: 'Contacts, deals, and follow-ups — without the enterprise price tag.',
  })
}
