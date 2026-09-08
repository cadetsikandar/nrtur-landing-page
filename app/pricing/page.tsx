import { pageMetadata, SITE_URL } from '@/lib/metadata'
import { plans } from '@/lib/pricing'
import { pricingFaqs } from '@/lib/pricing-faq'
import FinalCTA from '@/components/FinalCTA'
import ScrollReveal from '@/components/ScrollReveal'
import PricingPage from '@/views/PricingPage'

const PRICING_URL = `${SITE_URL}/pricing/`

export const metadata = pageMetadata({
  title: 'Pricing — four plans, one rate card',
  description:
    'nrtur CRM pricing: Solo $12, Team $35, Pro $69 and Business $119 a month billed yearly, each with a mailbox and phone line per user. Calls and texts come from a prepaid balance, so nothing bills after the money runs out.',
  path: '/pricing/',
})

// The site's first Offer markup — this is what lets search and AI assistants quote a price
// instead of guessing one. Generated from src/lib/pricing.ts so it cannot drift from the page.
const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['SoftwareApplication', 'Product'],
      '@id': `${SITE_URL}/#software`,
      name: 'nrtur',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'CRM',
      operatingSystem: 'Web',
      url: SITE_URL + '/',
      description:
        'A CRM for small teams with a synced mailbox and a phone line for every user, and prepaid calling and texting.',
      brand: { '@id': `${SITE_URL}/#organization` },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: Math.min(...plans.map((p) => p.yearly)),
        highPrice: Math.max(...plans.map((p) => p.monthly)),
        offerCount: plans.length,
        url: PRICING_URL,
        offers: plans.map((plan) => ({
          '@type': 'Offer',
          name: plan.name,
          description: plan.tagline,
          url: PRICING_URL,
          priceCurrency: 'USD',
          price: plan.yearly,
          availability: 'https://schema.org/PreOrder',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: plan.yearly,
            priceCurrency: 'USD',
            unitText: 'user per month, billed yearly',
            billingDuration: 1,
            billingIncrement: 1,
            referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
            valueAddedTaxIncluded: false,
          },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${PRICING_URL}#faqpage`,
      url: PRICING_URL,
      mainEntity: pricingFaqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.shortA },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Pricing', item: PRICING_URL },
      ],
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <ScrollReveal />
      <PricingPage />
      <FinalCTA />
    </>
  )
}
