'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { readConsent, subscribeConsent, type Consent } from '@/lib/consent'

/**
 * Google Analytics 4 (gtag.js), gated on consent.
 *
 * Two conditions have to hold before a single request goes to Google: the host env
 * must set NEXT_PUBLIC_GA_MEASUREMENT_ID, and the visitor must have accepted
 * analytics in the cookie banner. Until both are true this renders nothing — no
 * script tag, no cookie, no network call — which is what makes the site lawful to
 * serve in the EU/UK without a pre-consent grace period.
 *
 * strategy="afterInteractive" keeps gtag off the critical path. GA4 enhanced
 * measurement records App Router route changes on its own, so no manual page_views.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const [consent, setConsent] = useState<Consent | null>(null)

  useEffect(() => {
    setConsent(readConsent())
    // Re-read rather than trusting the event payload — readConsent is the only place
    // that knows about opt-out signals, and it must be able to override a stale grant.
    return subscribeConsent(() => setConsent(readConsent()))
  }, [])

  if (!gaId || consent !== 'granted') return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied'});
gtag('consent','update',{'analytics_storage':'granted'});
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`}
      </Script>
    </>
  )
}
