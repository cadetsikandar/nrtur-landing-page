import { pageMetadata } from '@/lib/metadata'
import { compareJsonLd } from '@/lib/schema'
import ComparePage from '@/views/ComparePage'

export const metadata = pageMetadata({
  title: 'nrtur vs HubSpot, Salesforce, Pipedrive & Zoho',
  description:
    'Honest side-by-side comparisons of nrtur against the big CRMs — including the rows where the other tool wins.',
  path: '/compare/',
})

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(compareJsonLd) }}
      />
      <ComparePage />
    </>
  )
}
