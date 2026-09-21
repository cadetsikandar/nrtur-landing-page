// Site-wide default social card. Next injects og:image for every route that
// doesn't provide its own (blog articles do — see app/blog/[cluster]/[slug]).
// X/Twitter fall back to og:image, so no separate twitter-image is needed.
import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image'

// Must be 'edge' — see the note in src/lib/og-image.tsx.
export const runtime = 'edge'

export const alt = 'nrtur — The CRM small teams actually want to use'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderOgCard({
    eyebrow: 'CRM for small teams',
    title: 'The CRM small teams actually want to use',
    footer: 'Contacts, deals, and follow-ups — without the enterprise price tag.',
  })
}
