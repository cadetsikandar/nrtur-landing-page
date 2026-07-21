import Link from 'next/link'
import { Twitter, Linkedin, Github, Mail } from 'lucide-react'

const links = {
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Changelog', href: '#' },
    { label: 'Roadmap', href: '#' },
    { label: 'Status', href: '#' },
  ],
  Compare: [
    { label: 'vs HubSpot', href: '/compare/' },
    { label: 'vs Salesforce', href: '/compare/' },
    { label: 'vs Pipedrive', href: '/compare/' },
    { label: 'vs Zoho CRM', href: '/compare/' },
  ],
  Resources: [
    { label: 'Blog', href: '/blog/' },
    { label: 'Alternatives', href: '/alternatives/' },
    { label: 'Comparisons', href: '/comparisons/' },
    { label: 'Use Cases', href: '/use-cases/' },
    { label: 'Guides', href: '/guides/' },
  ],
  Company: [
    { label: 'About', href: '/about/' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Partners', href: '#' },
  ],
}

const social = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Mail, label: 'Email', href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative bg-surface-2 border-t border-line">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <img src="/nrtur-logo.png" alt="nrtur logo" className="w-8 h-8 object-contain" />
              <span className="text-ink font-bold text-lg tracking-tight">nrtur</span>
            </Link>
            <p className="text-sm text-ink-2 leading-relaxed mb-6 max-w-52">
              The CRM built for small teams who'd rather close deals than configure software.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="font-mono text-xs text-ink-3 font-semibold uppercase tracking-wider mb-3">Product updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 bg-surface border border-line rounded-lg px-3 py-2 text-xs text-ink placeholder-ink-4 focus:outline-none focus:border-accent transition-all"
                />
                <button className="bg-accent-soft border border-accent-line text-accent-ink text-xs px-3 py-2 rounded-lg hover:bg-accent-soft transition-all whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              {social.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-surface border border-line flex items-center justify-center text-ink-3 hover:text-ink hover:bg-surface-3 transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="font-mono text-xs font-semibold text-ink-3 uppercase tracking-wider mb-4">{category}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith('/') ? (
                      <Link
                        href={item.href}
                        className="text-sm text-ink-3 hover:text-ink transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="text-sm text-ink-3 hover:text-ink transition-colors"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-4">
            © 2025 nrtur, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map((item) => (
              <a key={item} href="#" className="text-xs text-ink-4 hover:text-ink-2 transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-pos" />
            <span className="text-xs text-ink-4">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
