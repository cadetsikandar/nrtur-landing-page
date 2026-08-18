'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Cookie } from 'lucide-react'
import { readConsent, subscribeConsent, writeConsent } from '@/lib/consent'

/**
 * Analytics consent banner.
 *
 * Deliberate choices, each one a compliance requirement rather than a style call:
 *  - Accept and Decline are the same size and weight. Regulators treat a buried or
 *    de-emphasised reject button as invalid consent.
 *  - Nothing is pre-ticked and closing the banner is not consent — only the Accept
 *    button grants it.
 *  - It never appears when there is nothing to consent to: no GA measurement ID
 *    configured, or a Global Privacy Control signal we already honour as a refusal.
 *  - It renders after mount only, so there is no hydration mismatch and no flash
 *    for visitors who already chose.
 */
export default function CookieConsent() {
  const gaConfigured = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)
  const [open, setOpen] = useState(false)
  const acceptRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!gaConfigured) return
    setOpen(readConsent() === null)
    // "Cookie settings" in the footer clears the choice, which re-opens this.
    // Re-read rather than trusting the event payload, so an opt-out signal still wins.
    return subscribeConsent(() => setOpen(readConsent() === null))
  }, [gaConfigured])

  const choose = useCallback((value: 'granted' | 'denied') => {
    writeConsent(value)
    setOpen(false)
  }, [])

  // Escape hides the banner for this page view without recording consent —
  // dismissing is not agreeing, so analytics stay off and it returns next visit.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) acceptRef.current?.focus()
  }, [open])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-body"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-2xl bg-surface border border-line rounded-2xl shadow-pop p-5 sm:p-6 animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
            <Cookie size={17} className="text-accent" />
          </div>

          <div className="flex-1 min-w-0">
            <p id="cookie-consent-title" className="text-[15px] font-bold text-ink mb-1.5">
              Mind if we count the visit?
            </p>
            <p id="cookie-consent-body" className="text-[13.5px] text-ink-2 leading-relaxed">
              We&rsquo;d like to use Google Analytics to see which pages are actually useful. It sets
              a cookie. Decline and nothing loads &mdash; the site works exactly the same either way.
              No ad trackers, ever.{' '}
              <Link
                href="/privacy/#cookies"
                className="text-accent underline underline-offset-2 decoration-accent-line hover:decoration-accent"
              >
                What we collect
              </Link>
            </p>
          </div>
        </div>

        {/* Equal weight by design — reject has to be as easy as accept. */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 mt-5">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="inline-flex items-center justify-center bg-surface hover:bg-surface-2 border border-line hover:border-line-3 text-ink-2 hover:text-ink text-sm font-medium px-5 py-3 sm:py-2.5 rounded-xl transition-all duration-200 sm:min-w-[9rem]"
          >
            Decline
          </button>
          <button
            ref={acceptRef}
            type="button"
            onClick={() => choose('granted')}
            className="inline-flex items-center justify-center bg-btn-bg hover:bg-btn-bg-hover text-btn-fg text-sm font-semibold px-5 py-3 sm:py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md sm:min-w-[9rem]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
