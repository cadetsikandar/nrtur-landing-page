'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { hasOptOutSignal } from '@/lib/privacy-signals'

/**
 * Google Analytics 4 (gtag.js), running cookieless.
 *
 * There is no consent banner on this site, so the tag is configured never to store
 * anything on the visitor's device:
 *
 *  - Consent Mode ships with `analytics_storage` denied and every advertising signal
 *    denied, and nothing ever updates them to granted. GA4 then sends cookieless
 *    pings — enough for page counts and traffic sources, and no device identifier.
 *  - `client_storage: 'none'` is the belt to that braces: no _ga cookie, no
 *    localStorage fallback, no client id persisted between visits.
 *
 * That combination is what removes the need to ask. ePrivacy consent attaches to
 * storing or reading information on the device; with no storage there is nothing to
 * consent to. The trade is real and deliberate: no returning-visitor or cross-session
 * stitching, so treat the numbers as page counts, not people.
 *
 * A Global Privacy Control or Do Not Track signal still suppresses the tag entirely —
 * that is a refusal of the measurement, not just of the storage.
 *
 * If analytics ever need cookies again, the consent banner has to come back with them.
 * `git show bb94596` has the original gated implementation.
 *
 * strategy="afterInteractive" keeps gtag off the critical path. GA4 enhanced
 * measurement records App Router route changes on its own, so no manual page_views.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  // Assume opted out until the client has actually been able to check. This also
  // keeps the server render tag-free, so there is no hydration mismatch.
  const [optedOut, setOptedOut] = useState(true)

  useEffect(() => {
    setOptedOut(hasOptOutSignal())
  }, [])

  if (!gaId || optedOut) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied'});
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true, client_storage: 'none' });`}
      </Script>
    </>
  )
}
