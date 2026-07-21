import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter, Newsreader, JetBrains_Mono } from 'next/font/google'
import './paper-ink.css'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HashScroll from '@/components/HashScroll'
import Analytics from '@/components/Analytics'
import { SITE_URL } from '@/lib/metadata'

// UI / body
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

// Headings / editorial
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-newsreader',
})

// Numbers, code, labels, eyebrows
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono',
})

// Sets data-theme before first paint so there's no light/dark flash on load.
const THEME_INIT = `(function(){try{var t=localStorage.getItem('nrtur-theme');if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'nrtur — The CRM small teams actually want to use',
    template: '%s · nrtur',
  },
  description:
    "An affordable CRM for small teams — manage contacts, close deals, and automate follow-ups without HubSpot's price tag. Start free for 14 days.",
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'nrtur',
    title: 'nrtur — The CRM small teams actually want to use',
    description: 'Affordable CRM for small teams. $29/user/mo. 14-day free trial, no credit card required.',
    url: SITE_URL,
  },
  icons: { icon: '/favicon.svg' },
  // Search-engine ownership verification. Each meta tag renders only when its
  // env var is set — Google Search Console (URL-prefix property) and Bing
  // Webmaster Tools. Tokens are public by design, so they're plain env vars.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="min-h-screen bg-paper text-ink overflow-x-hidden">
        <div className="noise-overlay" />
        <HashScroll />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
