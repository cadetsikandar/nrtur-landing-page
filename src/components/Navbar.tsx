import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Compare', href: '/comparisons/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false
    return pathname === href || pathname === href.replace(/\/$/, '')
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[rgba(7,7,15,0.82)] backdrop-blur-2xl border-b border-white/[0.06]">
      <nav className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/nrtur-logo.png"
            alt="nrtur logo"
            className="w-[34px] h-[34px] object-contain"
            style={{ filter: 'drop-shadow(0 2px 14px rgba(124,58,237,0.5))' }}
          />
          <span className="text-white font-bold text-lg tracking-tight">nrtur</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm px-4 py-2 rounded-lg transition-all duration-150 ${
                isActive(link.href)
                  ? 'text-white/90 bg-white/[0.06]'
                  : 'text-white/50 hover:text-white/90 hover:bg-white/[0.04]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="text-sm text-white/60 hover:text-white font-medium px-4 py-2 transition-colors duration-150"
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
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/[0.04] transition-all"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#07070f]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 pb-6 pt-2 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setOpen(false)}
              className={`text-sm py-3 px-3 rounded-lg transition-all ${
                isActive(link.href) ? 'text-white bg-white/[0.06]' : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-col gap-2">
            <a href="#" className="text-sm text-white/60 hover:text-white py-2 px-3 text-center transition-colors">
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
