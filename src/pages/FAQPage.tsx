import { useState } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useRotatingPhrase } from '../hooks/useRotatingPhrase'

const phrases = ['need to know.', 'wanted to ask.', 'before switching.']

const faqs = [
  {
    q: 'How does the 14-day free trial work?',
    a: "Sign up and get full access to your chosen plan for 14 days — no credit card required. You'll have access to all features without restrictions. If you decide nrtur isn't right for you, just cancel before the trial ends and you'll never be charged.",
    shortA:
      "Sign up and get full access to your chosen plan for 14 days — no credit card required. Cancel before the trial ends and you'll never be charged.",
  },
  {
    q: 'Can I import my existing contacts from HubSpot or another CRM?',
    a: 'Yes. We support CSV imports and direct integrations with HubSpot, Salesforce, Pipedrive, and most major CRMs. Our onboarding team will help you migrate cleanly — it typically takes less than 30 minutes for most team sizes.',
    shortA:
      'Yes. We support CSV imports and direct integrations with HubSpot, Salesforce, Pipedrive, and most major CRMs. Migration typically takes less than 30 minutes.',
  },
  {
    q: 'What email providers does nrtur sync with?',
    a: 'We currently support Gmail and Google Workspace, plus Outlook and Microsoft 365. Email sync is two-way: threads you send or receive from contacts are automatically logged in their contact record and the associated deal. Additional email accounts can be added as an add-on for $5/mo each.',
    shortA:
      'Gmail, Google Workspace, Outlook, and Microsoft 365. Email sync is two-way and threads are automatically logged to the right contact and deal.',
  },
  {
    q: 'Is nrtur secure? Where is my data stored?',
    a: "nrtur uses AES-256 encryption at rest and TLS 1.3 in transit. We're SOC 2 Type II certified, and all data is stored in AWS us-east-1 and eu-west-1 (you choose at signup). We do not sell or share your data with third parties. Business plan customers also get SAML/SSO and audit logs.",
    shortA:
      'nrtur uses AES-256 encryption at rest and TLS 1.3 in transit, is SOC 2 Type II certified, and stores data in AWS us-east-1 or eu-west-1 (your choice).',
  },
  {
    q: 'Can I cancel at any time?',
    a: "Yes, always. nrtur is month-to-month with no annual contracts required (though we offer 20% off for yearly billing). Cancel from your settings at any time and you'll keep access until the end of your current billing period.",
    shortA:
      'Yes. nrtur is month-to-month with no annual contracts required. Cancel from your settings anytime and keep access until the end of the billing period.',
  },
  {
    q: "What's the difference between Pro and Business?",
    a: "Pro is designed for teams of up to 5 who need full pipeline + automation power. Business adds unlimited users, SSO/SAML, audit logs, custom webhook integrations, a dedicated onboarding specialist, and SLA-backed support. If you're unsure, start with Pro — upgrading takes seconds.",
    shortA:
      'Pro fits teams of up to 5 with full pipeline and automation power. Business adds unlimited users, SSO/SAML, audit logs, custom webhooks, and SLA support.',
  },
  {
    q: 'Does nrtur have a mobile app?',
    a: 'Yes. iOS and Android apps are included with all plans. You can view and update contacts, move deals through your pipeline, and see activity — all from your phone. Real-time push notifications keep your team in sync on the go.',
    shortA:
      'Yes. iOS and Android apps are included with all plans, with real-time push notifications to keep your team in sync on the go.',
  },
  {
    q: 'How long does onboarding take?',
    a: "For most small teams, you can import contacts, set up your first pipeline, and connect email in under 30 minutes. We also offer free 1:1 onboarding sessions for Pro and Business customers to make sure you're set up for success from day one.",
    shortA:
      'Most small teams import contacts, set up a pipeline, and connect email in under 30 minutes. Free 1:1 onboarding is available for Pro and Business.',
  },
  {
    q: 'What integrations does nrtur support?',
    a: 'We integrate with 100+ tools including Slack, Zapier, Make (Integromat), Calendly, Typeform, Stripe, QuickBooks, Google Calendar, Zoom, and more. Business plan customers get access to full API + webhook support for custom integrations.',
    shortA:
      '100+ tools including Slack, Zapier, Make, Calendly, Typeform, Stripe, QuickBooks, Google Calendar, and Zoom. Business plans get full API and webhook access.',
  },
  {
    q: 'Is nrtur right for my industry?',
    a: 'nrtur works best for service businesses, agencies, consultants, SaaS companies, and B2B sales teams. If your team manages ongoing client relationships and a sales pipeline — regardless of industry — nrtur will feel right at home. We work with teams in marketing, design, tech, consulting, real estate, finance, and more.',
    shortA:
      'nrtur works best for service businesses, agencies, consultants, SaaS companies, and B2B sales teams managing ongoing client relationships and a pipeline.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      '@id': 'https://nrtur.io/faq/#faqpage',
      url: 'https://nrtur.io/faq/',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.shortA },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nrtur.io/' },
        { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://nrtur.io/faq/' },
      ],
    },
  ],
}

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <p className="text-base font-semibold text-white/80 group-hover:text-white transition-colors">{q}</p>
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            isOpen
              ? 'bg-brand-500/15 border border-brand-500/25 rotate-180'
              : 'bg-white/[0.04] border border-white/[0.06]'
          }`}
        >
          <ChevronDown size={14} className={`transition-colors ${isOpen ? 'text-brand-400' : 'text-white/30'}`} />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-base text-white/45 leading-relaxed pr-12">{a}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const ref = useScrollReveal()
  const { phrase } = useRotatingPhrase(phrases)
  const [openFaq, setOpenFaq] = useState(-1)

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      {/* Header */}
      <section className="relative pt-36 pb-10 overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-brand-600/15 -top-[200px] left-1/2 -translate-x-1/2" />

        <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="reveal section-label mb-4">
            <span>FAQ</span>
          </div>
          <h1 className="reveal reveal-delay-1 text-5xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-5">
            <span className="text-white">Everything you</span>
            <br />
            <span key={phrase} className="text-brand-400 animate-word-in">
              {phrase}
            </span>
          </h1>
          <p className="reveal reveal-delay-2 max-w-[520px] mx-auto text-lg text-white/45 leading-relaxed">
            Can't find what you're looking for?{' '}
            <a href="#" className="text-brand-400 hover:text-brand-300 transition-colors">
              Chat with us
            </a>{' '}
            — we reply within minutes.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="relative pt-4 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="glass-card px-7">
            {faqs.map((item, i) => (
              <FAQItem
                key={item.q}
                q={item.q}
                a={item.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq((current) => (current === i ? -1 : i))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Still stuck CTA */}
      <section className="pb-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-brand-500/[0.06] border border-brand-500/[0.15] rounded-[20px] px-8 py-9 text-center">
            <div className="orb w-[300px] h-[300px] bg-brand-500/[0.12] blur-[80px] -top-[150px] left-1/2 -translate-x-1/2" />
            <div className="relative">
              <h2 className="text-2xl font-extrabold tracking-tight text-white mb-2">Still have a question?</h2>
              <p className="text-sm text-white/40 mb-5">Ask us anything — a founder reads every message.</p>
              <a
                href="https://forms.gle/sb2mHm97oRNFRmUY9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm py-[11px] px-6"
              >
                Join waitlist
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
