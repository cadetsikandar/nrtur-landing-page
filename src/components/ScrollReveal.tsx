'use client'

import { useEffect } from 'react'

// One page-wide IntersectionObserver for every `.reveal` element, so section
// components can stay server-rendered instead of each pulling in the client-only
// useScrollReveal hook (which forced them to hydrate). Elements already in view
// reveal immediately; a timeout fallback guarantees content can never get stuck
// hidden if the observer ever misfires.
export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (els.length === 0) return

    const revealAll = () => els.forEach((el) => el.classList.add('visible'))

    if (!('IntersectionObserver' in window)) {
      revealAll()
      return
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))

    // Safety net — never leave content hidden.
    const fallback = window.setTimeout(revealAll, 2000)

    return () => {
      io.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  return null
}
