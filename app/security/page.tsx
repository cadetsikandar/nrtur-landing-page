import { pageMetadata } from '@/lib/metadata'
import { securityDoc } from '@/lib/legal-security'
import LegalPage from '@/views/LegalPage'

export const metadata = pageMetadata({
  title: 'Security',
  description:
    'How nrtur protects your data — encryption, access control, backups, and incident response — plus an honest status table of what we have built and what we have not, and how to report a vulnerability.',
  path: '/security/',
})

export default function Page() {
  return <LegalPage doc={securityDoc} />
}
