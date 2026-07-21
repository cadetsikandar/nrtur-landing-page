import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/metadata'
import Home from '@/views/Home'

const title = 'nrtur — The CRM small teams actually want to use'
const description =
  "An affordable CRM for small teams — manage contacts, close deals, and automate follow-ups without HubSpot's price tag. Start free for 14 days."

export const metadata: Metadata = {
  // `absolute` prevents the root layout's `%s · nrtur` template from appending a suffix.
  title: { absolute: title },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'nrtur',
    title,
    description,
    url: `${SITE_URL}/`,
  },
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.nrtur.io/#organization',
      name: 'nrtur',
      legalName: 'nrtur, Inc.',
      url: 'https://www.nrtur.io/',
      logo: 'https://www.nrtur.io/nrtur-logo.png',
      slogan: 'The CRM small teams actually want to use.',
      description:
        "nrtur is an affordable CRM for small teams — manage contacts, close deals, and automate follow-ups without HubSpot's complexity or price tag.",
      sameAs: [
        'https://twitter.com/nrtur',
        'https://www.linkedin.com/company/nrtur',
        'https://github.com/nrtur',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.nrtur.io/#website',
      url: 'https://www.nrtur.io/',
      name: 'nrtur',
      publisher: { '@id': 'https://www.nrtur.io/#organization' },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Home />
    </>
  )
}
