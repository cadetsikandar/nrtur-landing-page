'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Compare', href: '/compare/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false
    return pathname === href || pathname === href.replace(/\/$/, '')
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface backdrop-blur-2xl border-b border-line">
      <nav className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/nrtur-logo.png"
            alt="nrtur logo"
            className="w-[34px] h-[34px] object-contain"
          />
          <span className="text-ink font-bold text-lg tracking-tight">nrtur</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm px-4 py-2 rounded-lg transition-all duration-150 ${
                isActive(link.href)
                  ? 'text-ink bg-hover'
                  : 'text-ink-2 hover:text-ink hover:bg-hover'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle className="w-9 h-9" />
          <a
            href="#"
            className="text-sm text-ink-2 hover:text-ink font-medium px-4 py-2 transition-colors duration-150"
          >
            Sign in
          </a>
          <a
            href="https://forms.gle/sb2mHm97oRNFRmUY9"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-2 px-5"
          >
            Join waitlist
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle className="w-9 h-9" />
          <button
            onClick={() => setOpen(!open)}
            className="text-ink-2 hover:text-ink p-2 rounded-lg hover:bg-hover transition-all"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-surface border-b border-line px-6 pb-6 pt-2 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-sm py-3 px-3 rounded-lg transition-all ${
                isActive(link.href) ? 'text-ink bg-hover' : 'text-ink-2 hover:text-ink hover:bg-hover'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-line flex flex-col gap-2">
            <a href="#" className="text-sm text-ink-2 hover:text-ink py-2 px-3 text-center transition-colors">
              Sign in
            </a>
            <a
              href="https://forms.gle/sb2mHm97oRNFRmUY9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm justify-center"
            >
              Join waitlist
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
