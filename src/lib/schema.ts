// JSON-LD schema + shared FAQ data. This module has NO 'use client' directive so its
// values are real objects on the server (client-module exports become empty proxies in
// server components, which silently breaks JSON.stringify — see the Next.js RSC boundary).

export const faqs = [
  {
    q: 'How does the 21-day free trial work?',
    a: "Sign up and get 21 days on Pro features, for up to 3 users, with no card to start. A card is needed before you connect a mailbox or claim a phone line — both cost us money from the first day. Trials hold up to 2,500 records, and CSV export unlocks once a card is added. If nrtur isn't right for you, do nothing: the workspace goes read-only with an export link rather than disappearing, and you are never charged.",
    shortA:
      '21 days on Pro features for up to 3 users, with no card to start. A card is needed before connecting a mailbox or claiming a phone line, and trials hold up to 2,500 records.',
  },
  {
    q: 'Can I import my existing contacts from HubSpot or another CRM?',
    a: 'Yes. You can import your contacts, companies, and deals from a CSV export — which every major CRM (HubSpot, Salesforce, Pipedrive, and others) can produce. For most small teams, the import takes well under an hour, and we are happy to help you map your fields.',
    shortA:
      'Yes — import your contacts, companies, and deals from a CSV export, which every major CRM can produce. For most small teams, it takes under an hour.',
  },
  {
    q: 'What email providers does nrtur sync with?',
    a: 'Gmail and Google Workspace, Outlook and Microsoft 365, plus iCloud and any IMAP account. Email sync is two-way: threads you send or receive from contacts are automatically logged in their contact record and the associated deal. Every plan includes a mailbox — one per user above Solo — and additional mailboxes are $5/mo each.',
    shortA:
      'Gmail, Google Workspace, Outlook, Microsoft 365, iCloud and IMAP. Sync is two-way, every plan includes a mailbox, and extra mailboxes are $5/mo each.',
  },
  {
    q: 'Is nrtur secure? Where is my data stored?',
    a: "Your data is encrypted in transit and at rest, and hosted on established cloud infrastructure. We don't sell or share your data with third parties. nrtur is an early-stage product, so formal certifications like SOC 2 are on our roadmap rather than in place today; SSO/SAML and audit logs are part of the Business plan.",
    shortA:
      'Data is encrypted in transit and at rest and hosted on established cloud infrastructure, and we never sell your data. SOC 2 is on our roadmap; SSO/SAML and audit logs come with the Business plan.',
  },
  {
    q: 'Can I cancel at any time?',
    a: "Yes, always. nrtur is month-to-month with no annual contracts required (though paying yearly saves up to 22%). Cancel from your settings at any time and you'll keep access until the end of your current billing period.",
    shortA:
      'Yes. nrtur is month-to-month with no annual contracts required, though paying yearly saves up to 22%. Cancel anytime and keep access until the end of the billing period.',
  },
  {
    q: "What's the difference between Pro and Business?",
    a: "Pro is for a sales team running real outbound — sequences, lead scoring, 500,000 records, API access and webhooks, and no ceiling on seats. Business adds single sign-on (SAML), an audit log, custom objects, a sandbox, eight hours of data migration from one source, and phone support with a named contact. Business starts at five users, because that support is real people. If you're unsure, start with Pro — upgrading takes seconds.",
    shortA:
      'Pro covers sequences, lead scoring, 500,000 records and API access, with no seat ceiling. Business adds SAML single sign-on, an audit log, custom objects, a sandbox, eight hours of migration and phone support, and starts at five users.',
  },
  {
    q: 'Does nrtur have a mobile app?',
    a: 'nrtur runs in any modern browser and is built to work well on your phone, so you can check contacts, move deals, and review activity on the go. Dedicated native iOS and Android apps are on our roadmap for after launch.',
    shortA:
      'nrtur works in any modern browser, including on mobile. Dedicated native iOS and Android apps are on our roadmap for after launch.',
  },
  {
    q: 'How long does onboarding take?',
    a: 'For most small teams, you can import contacts, set up your first pipeline, and connect email in under 30 minutes. There is no onboarding fee on any plan. Business includes eight hours of hands-on data migration from one source; on every other plan you import by CSV, and we are happy to help you map your fields.',
    shortA:
      'Most small teams import contacts, set up a pipeline, and connect email in under 30 minutes. There is no onboarding fee on any plan, and Business includes eight hours of migration from one source.',
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

export const compareJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://nrtur.io/compare/#page',
      url: 'https://nrtur.io/compare/',
      name: 'Compare CRMs: HubSpot vs Salesforce vs Pipedrive vs Zoho',
      about: { '@id': 'https://nrtur.io/#organization' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nrtur.io/' },
        { '@type': 'ListItem', position: 2, name: 'Comparisons', item: 'https://nrtur.io/compare/' },
      ],
    },
  ],
}

export const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://nrtur.io/about/#aboutpage',
      url: 'https://nrtur.io/about/',
      name: 'About nrtur',
      about: { '@id': 'https://nrtur.io/#organization' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://nrtur.io/#organization',
      name: 'nrtur',
      legalName: 'nrtur LLC',
      slogan: 'The CRM small teams actually want to use.',
      url: 'https://nrtur.io/',
      logo: 'https://nrtur.io/nrtur-logo.png',
      description:
        'A CRM should get out of your team’s way, not become another piece of software to manage — nrtur gives small teams enterprise-grade CRM power without the enterprise price tag or complexity.',
      email: 'hello@nrtur.io',
      foundingDate: '2024',
      address: { '@type': 'PostalAddress', addressRegion: 'Wyoming', addressCountry: 'US' },
      sameAs: ['https://twitter.com/nrtur', 'https://www.linkedin.com/company/nrtur', 'https://github.com/nrtur'],
      founder: [{ '@id': 'https://nrtur.io/about#touqeer-hassan' }],
      employee: [
        { '@id': 'https://nrtur.io/about#shahbaz-khalid' },
        { '@id': 'https://nrtur.io/about#sikandar-ali' },
        { '@id': 'https://nrtur.io/about#mujahid-raja' },
        { '@id': 'https://nrtur.io/about#qamar-ul-islam' },
        { '@id': 'https://nrtur.io/about#saqib-hassan' },
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://nrtur.io/about#touqeer-hassan',
      name: 'Touqeer Hassan',
      jobTitle: 'Founder',
      worksFor: { '@id': 'https://nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Wyoming, USA' },
      image: 'https://nrtur.io/team/touqeer-hassan.jpeg',
      sameAs: ['https://www.linkedin.com/in/touqeerhassan/'],
    },
    {
      '@type': 'Person',
      '@id': 'https://nrtur.io/about#shahbaz-khalid',
      name: 'Shahbaz Khalid',
      jobTitle: 'Software Engineer',
      worksFor: { '@id': 'https://nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Rawalpindi, Pakistan' },
      image: 'https://nrtur.io/team/shahbaz-khalid.jpg',
      sameAs: ['https://www.linkedin.com/in/shahbazkhalidweb/'],
    },
    {
      '@type': 'Person',
      '@id': 'https://nrtur.io/about#sikandar-ali',
      name: 'Sikandar Ali',
      jobTitle: 'Software Engineer',
      worksFor: { '@id': 'https://nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Islamabad, Pakistan' },
      image: 'https://nrtur.io/team/Sikandar-Ali.png',
      sameAs: ['https://www.linkedin.com/in/sikandar-ali-nrtur'],
    },
    {
      '@type': 'Person',
      '@id': 'https://nrtur.io/about#mujahid-raja',
      name: 'Mujahid Raja',
      jobTitle: 'Software Engineer',
      worksFor: { '@id': 'https://nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Islamabad, Pakistan' },
      image: 'https://nrtur.io/team/Mujahid-raja.png',
      sameAs: ['https://www.linkedin.com/in/mujahid-raja-nrtur'],
    },
    {
      '@type': 'Person',
      '@id': 'https://nrtur.io/about#qamar-ul-islam',
      name: 'Qamar Ul Islam',
      jobTitle: 'Backend Engineer',
      worksFor: { '@id': 'https://nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Rawalpindi, Pakistan' },
      image: 'https://nrtur.io/team/Qamar.png',
      sameAs: ['https://www.linkedin.com/in/qamar-ul-islam-193378202/'],
    },
    {
      '@type': 'Person',
      '@id': 'https://nrtur.io/about#saqib-hassan',
      name: 'Saqib Hassan',
      jobTitle: 'Founding Engineer & Technical Lead',
      worksFor: { '@id': 'https://nrtur.io/#organization' },
      homeLocation: { '@type': 'Place', name: 'Islamabad, Pakistan' },
      image: 'https://nrtur.io/team/Saqib-hassan.png',
      sameAs: ['https://www.linkedin.com/in/saqib-hassan-2b79511b3/'],
    },
  ],
}
