// JSON-LD schema + shared FAQ data. This module has NO 'use client' directive so its
// values are real objects on the server (client-module exports become empty proxies in
// server components, which silently breaks JSON.stringify — see the Next.js RSC boundary).

export const faqs = [
  {
    q: 'How does the 14-day free trial work?',
    a: "Sign up and get full access to your chosen plan for 14 days — no credit card required. You'll have access to all features without restrictions. If you decide nrtur isn't right for you, just cancel before the trial ends and you'll never be charged.",
    shortA:
      "Sign up and get full access to your chosen plan for 14 days — no credit card required. Cancel before the trial ends and you'll never be charged.",
  },
  {
    q: 'Can I import my existing contacts from HubSpot or another CRM?',
    a: 'Yes. You can import your contacts, companies, and deals from a CSV export — which every major CRM (HubSpot, Salesforce, Pipedrive, and others) can produce. For most small teams, the import takes well under an hour, and we are happy to help you map your fields.',
    shortA:
      'Yes — import your contacts, companies, and deals from a CSV export, which every major CRM can produce. For most small teams, it takes under an hour.',
  },
  {
    q: 'What email providers does nrtur sync with?',
    a: 'We currently support Gmail and Google Workspace, plus Outlook and Microsoft 365. Email sync is two-way: threads you send or receive from contacts are automatically logged in their contact record and the associated deal. Additional email accounts can be added as an add-on for $5/mo each.',
    shortA:
      'Gmail, Google Workspace, Outlook, and Microsoft 365. Email sync is two-way and threads are automatically logged to the right contact and deal.',
  },
  {
    q: 'Is nrtur secure? Where is my data stored?',
    a: "Your data is encrypted in transit and at rest, and hosted on established cloud infrastructure. We don't sell or share your data with third parties. nrtur is an early-stage product, so formal certifications like SOC 2 are on our roadmap rather than in place today; SSO/SAML and audit logs are part of the Business plan.",
    shortA:
      'Data is encrypted in transit and at rest and hosted on established cloud infrastructure, and we never sell your data. SOC 2 is on our roadmap; SSO/SAML and audit logs come with the Business plan.',
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
    a: 'nrtur runs in any modern browser and is built to work well on your phone, so you can check contacts, move deals, and review activity on the go. Dedicated native iOS and Android apps are on our roadmap for after launch.',
    shortA:
      'nrtur works in any modern browser, including on mobile. Dedicated native iOS and Android apps are on our roadmap for after launch.',
  },
  {
    q: 'How long does onboarding take?',
    a: "For most small teams, you can import contacts, set up your first pipeline, and connect email in under 30 minutes. We also offer free 1:1 onboarding sessions for Pro and Business customers to make sure you're set up for success from day one.",
    shortA:
      'Most small teams import contacts, set up a pipeline, and connect email in under 30 minutes. Free 1:1 onboarding is available for Pro and Business.',
  },
  {
    q: 'What integrations does nrtur support?',
    a: 'Today the core integrations are two-way email sync (Gmail and Outlook) and CSV import. More integrations — plus API and webhook access for custom workflows — are rolling out during early access. Tell us what you need and we will prioritize it.',
    shortA:
      'Core integrations today are email sync (Gmail/Outlook) and CSV import, with more — plus API and webhook access — rolling out during early access.',
  },
  {
    q: 'Is nrtur right for my industry?',
    a: 'nrtur works best for service businesses, agencies, consultants, SaaS companies, and B2B sales teams. If your team manages ongoing client relationships and a sales pipeline — regardless of industry — nrtur will feel right at home. We work with teams in marketing, design, tech, consulting, real estate, finance, and more.',
    shortA:
      'nrtur works best for service businesses, agencies, consultants, SaaS companies, and B2B sales teams managing ongoing client relationships and a pipeline.',
  },
]

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      '@id': 'https://www.nrtur.io/faq/#faqpage',
      url: 'https://www.nrtur.io/faq/',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.shortA },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.nrtur.io/' },
        { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://www.nrtur.io/faq/' },
      ],
    },
  ],
}

export const compareJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://www.nrtur.io/compare/#page',
      url: 'https://www.nrtur.io/compare/',
      name: 'Compare CRMs: HubSpot vs Salesforce vs Pipedrive vs Zoho',
      about: { '@id': 'https://www.nrtur.io/#organization' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.nrtur.io/' },
        { '@type': 'ListItem', position: 2, name: 'Comparisons', item: 'https://www.nrtur.io/compare/' },
      ],
    },
  ],
}

export const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://www.nrtur.io/about/#aboutpage',
      url: 'https://www.nrtur.io/about/',
      name: 'About nrtur',
      about: { '@id': 'https://www.nrtur.io/#organization' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.nrtur.io/#organization',
      name: 'nrtur',
      legalName: 'nrtur, Inc.',
      slogan: 'The CRM small teams actually want to use.',
      url: 'https://www.nrtur.io/',
      logo: 'https://www.nrtur.io/nrtur-logo.png',
      description:
        'A CRM should get out of your team’s way, not become another piece of software to manage — nrtur gives small teams enterprise-grade CRM power without the enterprise price tag or complexity.',
      email: 'hello@nrtur.io',
      foundingDate: '2024',
      address: { '@type': 'PostalAddress', addressRegion: 'Wyoming', addressCountry: 'US' },
      sameAs: ['https://twitter.com/nrtur', 'https://www.linkedin.com/company/nrtur', 'https://github.com/nrtur'],
      founder: [{ '@id': 'https://www.nrtur.io/about#touqeer-hassan' }],
      employee: [
        { '@id': 'https://www.nrtur.io/about#shahbaz-khalid' },
        { '@id': 'https://www.nrtur.io/about#sikandar-ali' },
        { '@id': 'https://www.nrtur.io/about#mujahid-raja' },
        { '@id': 'https://www.nrtur.io/about#qamar-ul-islam' },
        { '@id': 'https://www.nrtur.io/about#saqib-hassan' },
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://www.nrtur.io/about#touqeer-hassan',
      name: 'Touqeer Hassan',
      jobTitle: 'Founder',
      worksFor: { '@id': 'https://www.nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Wyoming, USA' },
      image: 'https://www.nrtur.io/team/touqeer-hassan.jpeg',
      sameAs: ['https://www.linkedin.com/in/touqeerhassan/'],
    },
    {
      '@type': 'Person',
      '@id': 'https://www.nrtur.io/about#shahbaz-khalid',
      name: 'Shahbaz Khalid',
      jobTitle: 'Software Engineer',
      worksFor: { '@id': 'https://www.nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Rawalpindi, Pakistan' },
      image: 'https://www.nrtur.io/team/shahbaz-khalid.jpg',
      sameAs: ['https://www.linkedin.com/in/shahbazkhalidweb/'],
    },
    {
      '@type': 'Person',
      '@id': 'https://www.nrtur.io/about#sikandar-ali',
      name: 'Sikandar Ali',
      jobTitle: 'Software Engineer',
      worksFor: { '@id': 'https://www.nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Islamabad, Pakistan' },
      image: 'https://www.nrtur.io/team/Sikandar-Ali.png',
      sameAs: ['https://www.linkedin.com/in/sikandar-ali-nrtur'],
    },
    {
      '@type': 'Person',
      '@id': 'https://www.nrtur.io/about#mujahid-raja',
      name: 'Mujahid Raja',
      jobTitle: 'Software Engineer',
      worksFor: { '@id': 'https://www.nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Islamabad, Pakistan' },
      image: 'https://www.nrtur.io/team/Mujahid-raja.png',
      sameAs: ['https://www.linkedin.com/in/mujahid-raja-nrtur'],
    },
    {
      '@type': 'Person',
      '@id': 'https://www.nrtur.io/about#qamar-ul-islam',
      name: 'Qamar Ul Islam',
      jobTitle: 'Backend Engineer',
      worksFor: { '@id': 'https://www.nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Rawalpindi, Pakistan' },
      image: 'https://www.nrtur.io/team/Qamar.png',
      sameAs: ['https://www.linkedin.com/in/qamar-ul-islam-193378202/'],
    },
    {
      '@type': 'Person',
      '@id': 'https://www.nrtur.io/about#saqib-hassan',
      name: 'Saqib Hassan',
      jobTitle: 'Founding Engineer & Technical Lead',
      worksFor: { '@id': 'https://www.nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Islamabad, Pakistan' },
      image: 'https://www.nrtur.io/team/Saqib-hassan.png',
      sameAs: ['https://www.linkedin.com/in/saqib-hassan-2b79511b3/'],
    },
  ],
}
