import { pageMetadata } from '@/lib/metadata'
import { aboutJsonLd } from '@/lib/schema'
import AboutPage from '@/views/AboutPage'

export const metadata = pageMetadata({
  title: 'About — the team behind a simpler CRM',
  description:
    'Meet the small remote team building nrtur — an honest, simple CRM for teams of 1–5. Founded 2024, HQ in Wyoming.',
  path: '/about/',
})

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <AboutPage />
    </>
  )
}
