import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const NAVBAR_OFFSET = 72

export function useHashScroll() {
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash
    if (!hash) return

    const id = hash.slice(1)
    let attempts = 0
    let raf = 0

    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET
        window.scrollTo({ top, behavior: 'smooth' })
        // Content above may still be expanding (images, fonts) — re-correct a few times.
        attempts += 1
        if (attempts < 6) {
          raf = window.setTimeout(tryScroll, 150)
        }
        return
      }
      attempts += 1
      if (attempts < 20) {
        raf = window.setTimeout(tryScroll, 100)
      }
    }

    raf = window.setTimeout(tryScroll, 0)
    return () => window.clearTimeout(raf)
  }, [location.pathname, location.hash])
}
