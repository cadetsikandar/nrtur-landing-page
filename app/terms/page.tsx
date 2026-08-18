import { pageMetadata } from '@/lib/metadata'
import { termsDoc } from '@/lib/legal-terms'
import LegalPage from '@/views/LegalPage'

export const metadata = pageMetadata({
  title: 'Terms of Service',
  description:
    'The agreement between you and nrtur — plans and billing, acceptable use, who owns your data, and how to cancel. Written to be read, not skimmed past.',
  path: '/terms/',
})

export default function Page() {
  return <LegalPage doc={termsDoc} />
}
