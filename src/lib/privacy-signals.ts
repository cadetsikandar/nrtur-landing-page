/**
 * Browser-level privacy signals.
 *
 * This replaces the old consent module. There is no consent banner any more because
 * there is nothing to consent to: Google Analytics runs in cookieless mode and stores
 * nothing on the visitor's device (see src/components/Analytics.tsx). ePrivacy consent
 * attaches to storing or reading information on the device — with no storage, the
 * banner had no job to do.
 *
 * What we still honour is an explicit browser opt-out, because that is a refusal of
 * the measurement itself rather than of the storage.
 *
 * If analytics ever go back to cookies, the banner has to come back with them —
 * `git show bb94596` has the original consent implementation.
 */

/**
 * Global Privacy Control — a browser-level "do not sell or share" signal that
 * California, Colorado and Connecticut all treat as a legally binding opt-out.
 * We treat it, and legacy Do Not Track, as a standing refusal: gtag is never loaded.
 */
export function hasOptOutSignal(): boolean {
  if (typeof navigator === 'undefined') return false
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean }
  return nav.globalPrivacyControl === true || nav.doNotTrack === '1'
}
