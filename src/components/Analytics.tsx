import { GoogleAnalytics } from '@next/third-parties/google'

/**
 * GA4 tag. Renders only when NEXT_PUBLIC_GA_ID is set (a Measurement ID like
 * "G-XXXXXXXXXX"), so the site ships analytics-free until you configure it in
 * the host env. @next/third-parties loads gtag.js efficiently (protecting CWV)
 * and reports App Router client-side navigations as page_views automatically.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  if (!gaId) return null
  return <GoogleAnalytics gaId={gaId} />
}
