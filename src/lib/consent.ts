/**
 * Analytics consent, kept deliberately small.
 *
 * The rule this enforces: no analytics cookie is set and no gtag request is made
 * until someone actively says yes. That's what ePrivacy/GDPR require for
 * non-essential cookies, and it's what /privacy promises — so the gate lives here
 * rather than inside the banner component, where it could be bypassed.
 */

export type Consent = 'granted' | 'denied'

const KEY = 'nrtur-consent'
/** Fired on the window whenever the stored choice changes, so <Analytics> and the
 *  banner stay in sync without a shared provider. */
export const CONSENT_EVENT = 'nrtur-consent-change'

/**
 * Global Privacy Control — a browser-level "do not sell or share" signal that
 * California, Colorado and Connecticut all treat as a legally binding opt-out.
 * We honour it as a standing refusal: analytics stay off and we don't nag with a
 * banner. Legacy Do Not Track is treated the same way.
 */
export function hasOptOutSignal(): boolean {
  if (typeof navigator === 'undefined') return false
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean }
  return nav.globalPrivacyControl === true || nav.doNotTrack === '1'
}

export function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null
  if (hasOptOutSignal()) return 'denied'
  try {
    const v = localStorage.getItem(KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    // Private mode / storage blocked. No stored yes means no analytics.
    return null
  }
}

export function writeConsent(value: Consent): void {
  try {
    localStorage.setItem(KEY, value)
  } catch {
    /* choice still applies for this page view */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }))
  if (value === 'denied') revokeAnalytics()
}

/** Reopens the banner — wired to "Cookie settings" in the footer. */
export function resetConsent(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }))
  revokeAnalytics()
}

/**
 * Undo an earlier grant. Unmounting <Analytics> stops React rendering the tag, but
 * next/script does not pull an already-injected gtag.js back out of the page — and a
 * loaded gtag keeps sending cookieless pings even with Consent Mode denied. So when
 * analytics were actually running we clear the cookies, tell Consent Mode to stand
 * down, and reload to get a genuinely tag-free page. Withdrawing consent should leave
 * the visitor exactly where declining would have.
 */
function revokeAnalytics(): void {
  dropAnalyticsCookies()
  if (typeof document === 'undefined') return
  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    location.reload()
  }
}

/**
 * Withdrawing consent has to actually remove what was set, not just stop future
 * collection. gtag can't delete its own cookies, so we clear them by hand and tell
 * Consent Mode to stand down.
 */
function dropAnalyticsCookies(): void {
  if (typeof document === 'undefined') return

  const w = window as Window & { gtag?: (...args: unknown[]) => void }
  w.gtag?.('consent', 'update', { analytics_storage: 'denied' })

  const host = location.hostname
  // Cookies may be scoped to the exact host or to the registrable domain, so expire both.
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]

  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]?.trim()
    if (!name || !/^(_ga|_gid|_gat)/.test(name)) continue
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${
        domain ? `; domain=${domain}` : ''
      }`
    }
  }
}

export function subscribeConsent(fn: (value: Consent | null) => void): () => void {
  const onChange = (e: Event) => fn((e as CustomEvent<Consent | null>).detail ?? null)
  // Also react to a choice made in another tab.
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) fn(readConsent())
  }
  window.addEventListener(CONSENT_EVENT, onChange)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange)
    window.removeEventListener('storage', onStorage)
  }
}
