import Script from 'next/script'

/**
 * Google Analytics 4 (gtag.js), wired via next/script rather than the raw
 * <script> snippet. Renders only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set
 * (a Measurement ID like "G-XXXXXXXXXX"), so the site ships analytics-free
 * until it's configured in the host env.
 *
 * strategy="afterInteractive" loads gtag after hydration so it never blocks
 * first paint/LCP. GA4 enhanced measurement records client-side (App Router)
 * route changes automatically, so no manual page_view calls are needed.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  if (!gaId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  )
}
