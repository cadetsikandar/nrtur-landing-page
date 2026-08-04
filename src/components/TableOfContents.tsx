'use client'

import { useEffect, useState } from 'react'

type Item = { text: string; slug: string }

/** Sticky "On this page" rail with scroll-spy active-section highlighting. */
export default function TableOfContents({ headings }: { headings: Item[] }) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    if (!headings.length) return
    const els = headings
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => el !== null)
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-100px 0px -66% 0px', threshold: 0 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  if (!headings.length) return null

  return (
    <nav aria-label="Table of contents" className="text-[13px]">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-4 mb-3">
        On this page
      </p>
      <ul className="space-y-0.5 border-l border-line">
        {headings.map((h) => {
          const isActive = active === h.slug
          return (
            <li key={h.slug}>
              <a
                href={`#${h.slug}`}
                className={`block border-l -ml-px pl-3 py-1 leading-snug transition-colors duration-150 ${
                  isActive
                    ? 'border-accent text-accent font-medium'
                    : 'border-transparent text-ink-3 hover:text-ink hover:border-line-3'
                }`}
              >
                {h.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
