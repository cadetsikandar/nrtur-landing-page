import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { pageMetadata } from '@/lib/metadata'
import { fetchPostsByTag, TAG_LABELS, TAG_SLUGS, type TagSlug } from '@/lib/ghost'
import PostCard from '@/components/PostCard'

// Per-cluster meta descriptions (also used as the page intro + JSON-LD description).
const CLUSTER_DESCRIPTIONS: Record<TagSlug, string> = {
  alternatives:
    'Hands-on comparisons of the best CRM alternatives for small teams — what actually holds up, and what quietly triples in price at renewal.',
  comparisons:
    'Side-by-side CRM comparisons with real cost breakdowns, so you can see exactly where each platform pulls ahead for a lean team.',
  'use-cases':
    'How real agencies, consultants, and solo founders run their pipelines in nrtur — the exact setups that work.',
  guides:
    'Step-by-step guides for building pipelines, automating follow-ups, and migrating your CRM without losing a thing.',
}

// Per-cluster FAQ — unique content per hub page (avoids thin/duplicate pages)
// and renders visible Q&A that backs the FAQPage JSON-LD.
const CLUSTER_FAQS: Record<TagSlug, { q: string; a: string }[]> = {
  alternatives: [
    {
      q: 'What is the best CRM alternative for a small team?',
      a: "The one your team will actually keep using. For teams of 1–5 that usually means fast setup, flat pricing, and no features you pay for but never touch. nrtur starts at $29/user/mo with automations, email sync, and reporting included.",
    },
    {
      q: 'Why do "cheap" CRMs often cost more later?',
      a: 'Low sticker prices frequently leave out automations, email sync, or reporting — you add them back as paid tiers or extra apps. Compare the all-in price for the features you will actually use, not the entry price.',
    },
    {
      q: 'Can I switch CRMs without losing my data?',
      a: 'Yes. Exporting contacts, deals, and notes as CSV and importing them takes most small teams under an hour. Our migration guides walk through it source by source.',
    },
  ],
  comparisons: [
    {
      q: 'How should I compare CRMs fairly?',
      a: 'Line up the same features at the tier that actually includes them — not the headline price. A $20 plan that needs three add-ons to match a $29 all-in plan is not cheaper.',
    },
    {
      q: 'Is the cheapest CRM the best deal?',
      a: 'Rarely. The real cost is sticker price + add-ons + the hours lost to setup and admin. For a lean team, time-to-productive matters as much as the monthly fee.',
    },
    {
      q: 'Which CRM is best for a team of 1–5?',
      a: 'One built for that size — quick to set up, flat-priced, and focused on contacts, deals, and follow-ups rather than enterprise configuration.',
    },
  ],
  'use-cases': [
    {
      q: 'Is a CRM worth it for a solo founder or tiny team?',
      a: 'If you track deals in a spreadsheet and lose follow-ups, yes. A lightweight CRM pays for itself the first time it stops a deal slipping through the cracks.',
    },
    {
      q: 'How do agencies manage multiple client pipelines?',
      a: 'Separate pipelines per client or service, shared contacts, and automations that handle follow-ups — so nothing depends on someone remembering.',
    },
    {
      q: 'Do I need a CRM if I only close a few deals a month?',
      a: 'Even a handful of deals benefit from one place for context and reminders. The point is not volume — it is never dropping the ball on the deals you do have.',
    },
  ],
  guides: [
    {
      q: 'How long does it take to set up a CRM?',
      a: 'For a small team, minutes — not weeks. Import your contacts, add a pipeline, and you are tracking deals the same day. nrtur’s typical setup is about five minutes.',
    },
    {
      q: 'How do I migrate from my current CRM?',
      a: 'Export your data as CSV, map the fields, and import. Contacts, companies, deals, and notes all come across. Our migration guides cover each source CRM.',
    },
    {
      q: 'How do I automate follow-ups?',
      a: 'Set a trigger (new lead, stage change) and an action (send an email, create a task). Once it is built, follow-ups happen without anyone remembering to send them.',
    },
  ],
}

function isTagSlug(value: string): value is TagSlug {
  return (TAG_SLUGS as string[]).includes(value)
}

export function generateStaticParams() {
  return TAG_SLUGS.map((cluster) => ({ cluster }))
}

// Only the four known clusters are valid; any other path 404s.
export const dynamicParams = false
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: { cluster: string }
}): Promise<Metadata> {
  const { cluster } = params
  if (!isTagSlug(cluster)) notFound()
  return pageMetadata({
    title: `${TAG_LABELS[cluster]} · nrtur blog`,
    description: CLUSTER_DESCRIPTIONS[cluster],
    path: `/${cluster}/`,
  })
}

export default async function ClusterPage({ params }: { params: { cluster: string } }) {
  const { cluster } = params
  if (!isTagSlug(cluster)) notFound()

  const posts = await fetchPostsByTag(cluster)
  const label = TAG_LABELS[cluster]
  const description = CLUSTER_DESCRIPTIONS[cluster]
  const faqs = CLUSTER_FAQS[cluster]
  const otherClusters = TAG_SLUGS.filter((c) => c !== cluster)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `https://www.nrtur.io/${cluster}/#collection`,
        url: `https://www.nrtur.io/${cluster}/`,
        name: `${label} · nrtur blog`,
        description,
        isPartOf: { '@id': 'https://www.nrtur.io/blog/#blog' },
      },
      {
        '@type': 'FAQPage',
        '@id': `https://www.nrtur.io/${cluster}/#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.nrtur.io/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.nrtur.io/blog/' },
          { '@type': 'ListItem', position: 3, name: label, item: `https://www.nrtur.io/${cluster}/` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-brand-600/15 -top-52 left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <div className="section-label justify-center mb-4">
            <span>Blog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] mb-5">
            <span className="text-white">{label}</span>
          </h1>
          <p className="max-w-lg mx-auto text-lg text-white/45 leading-relaxed">{description}</p>
        </div>
      </section>

      {/* Posts */}
      <section className="relative pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-10 flex justify-center">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/45 hover:text-white/80 transition-colors duration-200"
            >
              <ArrowLeft size={15} />
              All posts
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-white/30 text-[15px]">
              No posts in this topic yet — check back soon.
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white text-center mb-8">
            Common questions
          </h2>
          <div className="glass-card px-7 divide-y divide-white/[0.06]">
            {faqs.map((f) => (
              <div key={f.q} className="py-5">
                <h3 className="text-base font-semibold text-white/85 mb-2">{f.q}</h3>
                <p className="text-[15px] text-white/45 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band → compare page + waitlist */}
      <section className="relative pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-brand-500/[0.06] border border-brand-500/[0.15] rounded-[20px] px-8 py-9 text-center">
            <div className="orb w-[300px] h-[300px] bg-brand-500/[0.12] blur-[80px] -top-[150px] left-1/2 -translate-x-1/2" />
            <div className="relative">
              <h2 className="text-2xl font-extrabold tracking-tight text-white mb-2">
                See exactly where nrtur wins — and where it doesn’t
              </h2>
              <p className="text-sm text-white/45 mb-6 max-w-md mx-auto">
                Honest, side-by-side breakdowns against HubSpot, Salesforce, Pipedrive and Zoho —
                including the rows where they come out ahead.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/compare/" className="btn-primary text-sm py-[11px] px-6">
                  Compare nrtur vs the big CRMs
                  <ArrowRight size={15} />
                </Link>
                <a
                  href="https://forms.gle/sb2mHm97oRNFRmUY9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-white/60 hover:text-white transition-colors px-4 py-[11px]"
                >
                  Join the waitlist
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related clusters — internal linking */}
      <section className="relative pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">
            More from the blog
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {otherClusters.map((c) => (
              <Link
                key={c}
                href={`/${c}/`}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white/80 hover:border-white/10 transition-all"
              >
                {TAG_LABELS[c]}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
