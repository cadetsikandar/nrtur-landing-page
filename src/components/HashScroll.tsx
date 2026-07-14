'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const NAVBAR_OFFSET = 72

/** Cross-page anchor scrolling (e.g. /#features from another route) with a fixed-navbar
 *  offset. Retries until the target exists and until layout settles. Replaces the old
 *  react-router useHashScroll hook. */
export default function HashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    let attempts = 0
    let timer: ReturnType<typeof setTimeout>

    const tryScroll = () => {
      const hash = window.location.hash
      if (!hash) return
      const el = document.getElementById(hash.slice(1))
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET
        window.scrollTo({ top, behavior: 'smooth' })
        attempts += 1
        if (attempts < 6) timer = setTimeout(tryScroll, 150)
        return
      }
      attempts += 1
      if (attempts < 20) timer = setTimeout(tryScroll, 100)
    }

    const onHashChange = () => {
      attempts = 0
      tryScroll()
    }

    timer = setTimeout(tryScroll, 0)
    window.addEventListener('hashchange', onHashChange)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [pathname])

  return null
}
