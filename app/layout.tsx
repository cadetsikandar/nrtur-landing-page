import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HashScroll from '@/components/HashScroll'
import Analytics from '@/components/Analytics'
import { SITE_URL } from '@/lib/metadata'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'nrtur — The CRM small teams actually want to use',
    template: '%s · nrtur',
  },
  description:
    "nrtur is an affordable CRM for small teams. Manage contacts, close deals, and automate follow-ups — without HubSpot's complexity or price tag. Start free for 14 days.",
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
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#07070f] text-white overflow-x-hidden">
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
