import { pageMetadata } from '@/lib/metadata'
import { faqJsonLd } from '@/lib/schema'
import FAQPage from '@/views/FAQPage'

export const metadata = pageMetadata({
  title: 'FAQ',
  description:
    'Answers to common questions about nrtur — pricing, trials, migration, security, integrations, and more.',
  path: '/faq/',
})

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQPage />
    </>
  )
}
