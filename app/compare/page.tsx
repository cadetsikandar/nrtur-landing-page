import { pageMetadata } from '@/lib/metadata'
import { compareJsonLd } from '@/lib/schema'
import ComparePage from '@/views/ComparePage'

export const metadata = pageMetadata({
  title: 'Compare CRMs: HubSpot, Salesforce, Pipedrive & Zoho',
  description:
    'Honest, side-by-side breakdowns of HubSpot, Salesforce, Pipedrive, and Zoho — plus where nrtur fits for a team of 1–5.',
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
