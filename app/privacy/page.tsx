import { pageMetadata } from '@/lib/metadata'
import { privacyDoc } from '@/lib/legal-privacy'
import LegalPage from '@/views/LegalPage'

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    "How nrtur collects, uses, and protects your data — in plain English. We never sell your data, your CRM records stay yours, and you can export or delete them at any time.",
  path: '/privacy/',
})

export default function Page() {
  return <LegalPage doc={privacyDoc} />
}
