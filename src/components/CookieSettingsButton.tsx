'use client'

import { useEffect, useState } from 'react'
import { hasOptOutSignal, resetConsent } from '@/lib/consent'

/**
 * Footer entry point for changing an analytics choice. Withdrawing consent has to be
 * as easy as giving it, so this clears the stored decision (which also deletes any
 * GA cookies) and re-opens the banner.
 *
 * Hidden when there's nothing to manage: no GA measurement ID configured, or the
 * browser is sending a Global Privacy Control signal we already treat as a refusal.
 */
export default function CookieSettingsButton({ className = '' }: { className?: string }) {
  const gaConfigured = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(gaConfigured && !hasOptOutSignal())
  }, [gaConfigured])

  if (!show) return null

  return (
    <button type="button" onClick={resetConsent} className={className}>
      Cookie settings
    </button>
  )
}
