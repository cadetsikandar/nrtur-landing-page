import { BugPlay, KeySquare, Lock, UserCheck } from 'lucide-react'
import { LEGAL, type LegalDoc } from './legal'

/**
 * Security overview.
 *
 * Written to match the answer already published in the FAQ ("encrypted in transit and
 * at rest… SOC 2 is on our roadmap rather than in place today"). Overclaiming here is
 * not a marketing risk, it's a legal one — a security page is a representation to
 * customers, so anything not yet true is labelled "planned" rather than described in
 * the present tense.
 */
export const securityDoc: LegalDoc = {
  eyebrow: 'Security',
  title: 'Security at nrtur',
  lede:
    "What we do to protect your pipeline, what we haven't built yet, and how to tell us if you find a hole. Including the parts most vendors leave off this page.",
  summaryTitle: 'The short version',
  summaryNote:
    'nrtur is an early-stage product and we would rather you judge us on an accurate picture than a polished one. Everything below is either in place today or clearly marked as planned.',
  sibling: { label: 'Read the Privacy Policy', href: '/privacy/' },
  showEffective: false,
  cta: {
    title: 'Found something?',
    body:
      'Report a vulnerability, ask for our security posture in writing, or request a DPA. An engineer reads this inbox, not a bot.',
  },

  pledges: [
    {
      icon: Lock,
      title: 'Encrypted in transit and at rest',
      body:
        'Everything travels over TLS and is encrypted at rest on disk, including backups. We do not serve any part of the site or app over plain HTTP.',
    },
    {
      icon: UserCheck,
      title: 'We do not browse your data',
      body:
        'Staff access to production is limited to the people who need it, protected by MFA, logged, and used only to run the service or fix a fault you reported.',
    },
    {
      icon: KeySquare,
      title: 'Your data, exportable and erasable',
      body:
        'Export everything at any time. Ask us to delete it and it leaves live systems within 30 days and backups within 90.',
    },
    {
      icon: BugPlay,
      title: 'Safe harbour for researchers',
      body:
        'Report a flaw in good faith and we will not pursue legal action. We will confirm within two business days and credit you if you want it.',
    },
  ],

  sections: [
    {
      id: 'where-we-are',
      title: 'Where we actually are',
      blocks: [
        {
          t: 'p',
          text: 'nrtur is a small team building an early-access product. That shapes what we can honestly claim. Rather than describe an aspirational security programme in the present tense, here is the real status of each control.',
        },
        {
          t: 'table',
          head: ['Control', 'Status', 'Detail'],
          rows: [
            ['TLS everywhere', '**In place**', 'HTTPS enforced; no plaintext fallback'],
            ['Encryption at rest', '**In place**', 'Application data and backups encrypted on disk'],
            ['Hashed passwords', '**In place**', 'Slow, salted hashing — nobody here can read yours'],
            ['Least-privilege production access', '**In place**', 'Named individuals, MFA required, access logged'],
            ['Automated backups', '**In place**', 'Encrypted, taken regularly, periodically test-restored'],
            ['Dependency and vulnerability updates', '**In place**', 'Automated alerts on our dependencies, patched on a risk basis'],
            ['Breach notification process', '**In place**', 'Regulator and customer notification within 72 hours — see below'],
            ['Multi-factor authentication for your account', '**Planned**', 'Ships with general availability'],
            ['SSO / SAML and audit logs', '**Planned**', 'Part of the Business plan at launch'],
            ['Third-party penetration test', '**Planned**', 'Before general availability'],
            ['SOC 2 Type II', '**Not yet**', 'On the roadmap, not in place. We will not imply otherwise'],
            ['ISO 27001', '**Not yet**', 'No current plan'],
          ],
        },
        {
          t: 'note',
          tone: 'accent',
          title: 'Judging us fairly',
          text: 'If your procurement process requires SOC 2 or ISO 27001 today, we are not the right fit yet — and we would rather tell you that now than waste a month of your time. Email us and we will tell you where the certification work actually stands.',
        },
      ],
    },

    {
      id: 'infrastructure',
      title: 'Infrastructure',
      blocks: [
        {
          t: 'p',
          text: 'This website runs on Vercel. The nrtur application runs on established cloud infrastructure in the United States, and we do not operate our own hardware — meaning physical security, network isolation, and hypervisor patching are handled by providers who do that at a scale we never could.',
        },
        {
          t: 'p',
          text: `The full list of vendors that can touch your data, what each one does, and where it sits, is published in the [sub-processor table](/privacy/#sharing) in our privacy policy. We update it before a new vendor starts processing anything.`,
        },
      ],
    },

    {
      id: 'encryption',
      title: 'Encryption',
      blocks: [
        {
          t: 'ul',
          items: [
            '**In transit** — TLS on every connection, to the website and the application alike. HTTP requests are redirected, not served.',
            '**At rest** — application data and backups are encrypted on disk by the storage layer.',
            '**Passwords** — stored as slow, salted hashes, never as reversible ciphertext and never in plain text. We cannot recover your password, only help you reset it, and we will never ask you for it.',
            '**Secrets** — API keys and credentials live in managed environment configuration, not in the codebase or in version control.',
          ],
        },
      ],
    },

    {
      id: 'access',
      title: 'Who can see your data',
      blocks: [
        { t: 'h3', text: 'Our staff' },
        {
          t: 'p',
          text: 'Production access is limited to the engineers who need it to run the service. It requires multi-factor authentication, it is logged, and it is used for exactly three things: keeping the service running, fixing a fault, and complying with a valid legal order.',
        },
        {
          t: 'p',
          text: 'We do not read your CRM records out of curiosity, and we do not use them to market to your contacts. When we need to look at a specific record to debug something you reported, we look at that record.',
        },
        { t: 'h3', text: 'Your team' },
        {
          t: 'p',
          text: 'Inside your workspace, the account owner controls who has a seat and what they can reach. Removing someone removes their access immediately. Role-based permissions, SSO/SAML, and audit logs are part of the Business plan at launch.',
        },
        { t: 'h3', text: 'Isolation between customers' },
        {
          t: 'p',
          text: 'nrtur is a multi-tenant service. Every record is bound to a workspace, and queries are scoped to the authenticated workspace so one customer cannot read another\'s data. This is enforced in the data layer rather than left to individual screens to remember.',
        },
      ],
    },

    {
      id: 'backups',
      title: 'Backups and recovery',
      blocks: [
        {
          t: 'ul',
          items: [
            'Backups run automatically, are encrypted, and are stored separately from the primary database.',
            'We periodically restore from backup and check the result, because a backup nobody has restored is not a backup.',
            'Deleted data rolls out of backups within 90 days — the same window described under [retention](/privacy/#retention).',
          ],
        },
        {
          t: 'p',
          text: 'We do not currently publish a contractual RTO or RPO. When we commit to one, it will appear in the [Terms of Service](/terms/#availability) rather than as a number on a marketing page.',
        },
      ],
    },

    {
      id: 'building',
      title: 'How we build',
      blocks: [
        {
          t: 'ul',
          items: [
            '**Code review** — changes are reviewed before they reach production.',
            '**Dependencies** — we get automated alerts for known vulnerabilities in the packages we use, and patch on a risk basis, fastest for anything reachable from the internet.',
            '**Least privilege by default** — new services get the narrowest access that works, not the broadest that is convenient.',
            '**No production data in development** — we do not copy customer records into test environments.',
          ],
        },
      ],
    },

    {
      id: 'incidents',
      title: 'If something goes wrong',
      blocks: [
        {
          t: 'p',
          text: 'No system is perfectly secure and we will not pretend otherwise. What we can commit to is how we behave when it matters.',
        },
        {
          t: 'ol',
          items: [
            '**Contain** — cut off the access path and stop the bleeding first.',
            '**Assess** — establish what was reached, by whom, and for how long.',
            '**Notify** — where a breach affects personal data we notify the relevant regulator and affected customers without undue delay, and within **72 hours** of becoming aware where GDPR applies.',
            '**Explain** — you get the facts we have, including the uncomfortable ones, not a statement engineered to sound reassuring.',
            '**Fix** — we close the hole and tell you what changed so it does not recur.',
          ],
        },
      ],
    },

    {
      id: 'compliance',
      title: 'Compliance and legal posture',
      blocks: [
        {
          t: 'table',
          head: ['Framework', 'Where we stand'],
          rows: [
            [
              'GDPR / UK GDPR',
              'We act as processor for your CRM data and controller for your account data. A Data Processing Agreement is available on request, and international transfers rely on Standard Contractual Clauses',
            ],
            [
              'CCPA / CPRA and US state laws',
              'Rights honoured for everyone regardless of location. We do not sell or share personal information, and we respect Global Privacy Control',
            ],
            [
              'SOC 2 Type II',
              '**Not certified.** On the roadmap. We will publish the report when there is one',
            ],
            [
              'ISO 27001',
              '**Not certified**, and not currently planned',
            ],
            [
              'HIPAA',
              '**Not supported.** nrtur is not built for protected health information and we will not sign a BAA. Please do not put PHI in it',
            ],
            [
              'PCI DSS',
              'Card details are handled by our payment processor and never touch our servers. We store only the last four digits and expiry for your invoices',
            ],
          ],
        },
      ],
    },

    {
      id: 'disclosure',
      title: 'Reporting a vulnerability',
      blocks: [
        {
          t: 'p',
          text: `Please tell us before you tell anyone else. Email [${LEGAL.email}](mailto:${LEGAL.email}) with the subject line "Security" and include enough detail to reproduce it — a proof of concept, the affected URL or endpoint, and what an attacker could achieve.`,
        },
        {
          t: 'note',
          tone: 'pos',
          title: 'Safe harbour',
          text: 'We will not pursue or support legal action against anyone who reports a vulnerability in good faith, gives us reasonable time to fix it before going public, and does not access, modify, or destroy data belonging to anyone else. If a third party brings action against you for research that followed this policy, we will make it known that you were acting within it.',
        },
        { t: 'h3', text: 'What we commit to' },
        {
          t: 'ul',
          items: [
            'We acknowledge reports within **two business days**.',
            'We tell you our assessment and an expected fix window within **ten business days**.',
            'We credit you publicly when the fix ships, if you would like to be credited.',
          ],
        },
        { t: 'h3', text: 'Please do not' },
        {
          t: 'ul',
          items: [
            'Run automated scanners that degrade the service for other customers, or attempt denial of service.',
            'Access, download, or modify data belonging to another customer. If you can prove the flaw with your own test account, use your own test account.',
            'Use social engineering, phishing, or physical attacks against our team or our vendors.',
            'Publish details before we have had a reasonable chance to fix them.',
          ],
        },
        {
          t: 'p',
          text: 'We do not currently run a paid bug bounty. We will say so plainly rather than imply a reward that does not exist.',
        },
      ],
    },

    {
      id: 'your-part',
      title: 'Your side of the bargain',
      blocks: [
        {
          t: 'p',
          text: 'Most real-world breaches of SaaS accounts are credential problems, not platform problems. The things that actually protect you:',
        },
        {
          t: 'ul',
          items: [
            'Use a **strong, unique password** and a password manager. Reused passwords are the single most common way accounts fall.',
            'Turn on **multi-factor authentication** the moment it is available.',
            'Remove people from the workspace **the day they leave**, not at the end of the quarter.',
            'Give teammates the **narrowest role** that lets them do their job.',
            'Only put data in nrtur that you have a lawful basis to hold — and keep special-category data out entirely.',
            `Tell us fast at [${LEGAL.email}](mailto:${LEGAL.email}) if you suspect an account has been compromised. Speed matters more than certainty.`,
          ],
        },
      ],
    },

    {
      id: 'contact',
      title: 'Contact',
      blocks: [
        {
          t: 'ul',
          items: [
            `**Vulnerability reports and security questions** — [${LEGAL.email}](mailto:${LEGAL.email}), subject line "Security"`,
            `**Data Processing Agreements and privacy requests** — [${LEGAL.email}](mailto:${LEGAL.email}), subject line "GDPR"`,
            `**Post** — ${LEGAL.company}, ${LEGAL.address}`,
          ],
        },
        {
          t: 'p',
          text: 'If you are evaluating nrtur and need our security posture in writing for a procurement review, ask — we will answer honestly, including the parts where the answer is "not yet".',
        },
      ],
    },
  ],
}
