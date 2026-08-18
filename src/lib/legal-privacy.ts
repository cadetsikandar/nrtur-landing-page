import { Ban, Database, KeyRound, Sparkles } from 'lucide-react'
import { LEGAL, type LegalDoc } from './legal'

export const privacyDoc: LegalDoc = {
  eyebrow: 'Privacy',
  title: 'Privacy Policy',
  lede:
    "The plain-English version of what we collect, why we collect it, and what we'll never do with it. No 40-page maze, no buried opt-outs.",
  summaryTitle: 'The short version',
  summaryNote:
    'This box is a summary for humans, not the legal text. The numbered sections below are the ones that actually govern — but if you only read four things, read these.',
  sibling: { label: 'Read the Terms of Service', href: '/terms/' },

  pledges: [
    {
      icon: Ban,
      title: 'We never sell your data',
      body:
        'Not to advertisers, not to data brokers, not to "partners". We have never sold personal information and we do not share it for cross-context behavioural advertising.',
    },
    {
      icon: Database,
      title: 'Your CRM data is yours',
      body:
        'The contacts, deals, and notes you put into nrtur belong to you. We hold them to run the service for you — we do not mine them or sell them.',
    },
    {
      icon: KeyRound,
      title: 'You can leave with it',
      body:
        'Export your data at any time, and ask us to delete your account and everything in it. We act on deletion requests within 30 days.',
    },
    {
      icon: Sparkles,
      title: 'We collect the minimum',
      body:
        'We ask for what the product actually needs to work, plus analytics you can decline in one click — and which never load until you accept. That is it.',
    },
  ],

  sections: [
    {
      id: 'who-we-are',
      title: 'Who we are and what this covers',
      blocks: [
        {
          t: 'p',
          text: `${LEGAL.company} ("${LEGAL.shortName}", "we", "us") builds a CRM for small teams. We are based in ${LEGAL.address}.`,
        },
        {
          t: 'p',
          text: 'This policy covers:',
        },
        {
          t: 'ul',
          items: [
            `**Our website** — ${LEGAL.site}, including the blog, comparison pages, and the waitlist and product-update signup forms.`,
            '**The nrtur application** — the CRM itself, once you have an account and are signed in.',
          ],
        },
        {
          t: 'p',
          text: 'It does not cover third-party websites we link to, or the separate privacy practices of services you choose to connect to nrtur (your email provider, for example). Those have their own policies.',
        },
        {
          t: 'note',
          tone: 'accent',
          title: 'Early access',
          text: `nrtur is still in early access, but the application is live for early-access customers — including mailbox sync, messaging, and billing. If you have an account, every section below applies to you today, and the vendors handling that data are named in the [sub-processor table](#sharing). If you have only visited the website or joined the waitlist, the sections on website data, cookies, and your rights are the ones that concern you.`,
        },
      ],
    },

    {
      id: 'two-roles',
      title: 'Two kinds of data — and two different roles',
      blocks: [
        {
          t: 'p',
          text: 'This distinction matters more in a CRM than almost anywhere else, so we put it first. There are two very different piles of data involved, and we have a different legal role for each.',
        },
        {
          t: 'h3',
          text: 'Data about you (we are the controller)',
        },
        {
          t: 'p',
          text: 'Your name, your work email, your billing details, how you use the product. We decide why and how this is processed, which makes us the **data controller**. Most of what follows is about this data.',
        },
        {
          t: 'h3',
          text: 'Data you put into nrtur (we are the processor)',
        },
        {
          t: 'p',
          text: 'Your contacts, leads, deals, notes, call logs, and synced email. This is normally personal data about *other* people — your customers and prospects. For this data **you are the controller and we are the processor**: we only handle it on your instructions, to provide the service to you.',
        },
        {
          t: 'p',
          text: 'That has a practical consequence. If one of your contacts asks us to delete their data, we cannot act on that request unilaterally — we will point them to you, and help you action it. See [Data you put into nrtur](#crm-data).',
        },
      ],
    },

    {
      id: 'what-we-collect',
      title: 'What we collect about you, and why',
      blocks: [
        {
          t: 'p',
          text: 'Everything below is either something you typed in yourself, or something a browser sends automatically. We do not buy personal data about you from anyone, and we do not build advertising profiles.',
        },
        {
          t: 'table',
          head: ['What', 'Examples', 'Why we need it', 'Legal basis (UK/EU)'],
          rows: [
            [
              'Waitlist & signup',
              'Name, work email, company name, team size, and anything you write in the form',
              'To contact you about early access and to size the rollout',
              'Consent, and our legitimate interest in running a waitlist',
            ],
            [
              'Account',
              'Name, email, password (stored hashed, never in plain text), workspace and team settings',
              'To create your account, sign you in, and keep it secure',
              'Performance of our contract with you',
            ],
            [
              'Billing',
              'Plan, billing cycle, billing contact and address, invoice history, last four digits and expiry of the card',
              'To charge the correct amount and issue invoices',
              'Contract, and legal obligation for tax records',
            ],
            [
              'Support',
              'The emails you send us and our replies, plus anything you attach',
              'To answer you and to track recurring problems',
              'Contract, and our legitimate interest in supporting customers',
            ],
            [
              'Product usage',
              'Which features you open, error and crash reports, approximate performance timings',
              'To find bugs and decide what to build next',
              'Legitimate interest in improving the product',
            ],
            [
              'Technical logs',
              'IP address, browser and device type, referring page, timestamps',
              'Security, abuse prevention, and diagnosing outages',
              'Legitimate interest in keeping the service secure and available',
            ],
            [
              'Website analytics',
              'Pages viewed, session length, coarse country-level location, traffic source',
              'To see which pages and articles are actually useful',
              'Consent — collected only if you accept the cookie banner',
            ],
          ],
        },
        {
          t: 'p',
          text: 'We do not ask for special-category data (health, race, religion, biometrics, political views) and the product is not designed to hold it. Please do not put it in nrtur.',
        },
      ],
    },

    {
      id: 'crm-data',
      title: 'Data you put into nrtur',
      blocks: [
        {
          t: 'p',
          text: 'When you use the CRM you will upload or create records about other people — the contacts, companies, deals, notes, tasks, and messages that make up your pipeline. Depending on the features you turn on, that can also include email threads synced from Gmail or Outlook, and the SMS and email you send through nrtur.',
        },
        { t: 'h3', text: 'What we do with it' },
        {
          t: 'ul',
          items: [
            '**Store it and show it back to you** — that is the product.',
            '**Run the features you switch on** — automations, sequences, reminders, reports.',
            '**Keep backups**, so a mistake or an outage does not cost you your pipeline.',
            '**Investigate problems you report to us**, when we need to look at a specific record to fix a bug.',
          ],
        },
        { t: 'h3', text: 'What we do not do with it' },
        {
          t: 'ul',
          items: [
            'We do not sell it, rent it, or share it with advertisers.',
            'We do not use your CRM data to market to your contacts.',
            'We do not use your CRM data to train AI models. nrtur does not currently include any AI features — if we add one, we will name the provider in the table below and update this policy before it processes anything.',
            'We do not browse it. Staff access is limited to the small number of people who need it, is logged, and happens only to run the service, fix a fault, or when the law requires it.',
          ],
        },
        {
          t: 'note',
          tone: 'pos',
          title: 'Your responsibility',
          text: 'Because you are the controller of this data, you are responsible for having a lawful basis to hold it, for telling your contacts how you use it, and for honouring their requests. If you need a Data Processing Agreement to satisfy your own GDPR obligations, email us and we will put one in place.',
        },
      ],
    },

    {
      id: 'cookies',
      title: 'Cookies and analytics',
      blocks: [
        {
          t: 'p',
          text: 'A cookie is a small piece of text a website asks your browser to store. We use a deliberately short list — and the only optional item on it is off until you say otherwise.',
        },
        {
          t: 'note',
          tone: 'pos',
          title: 'Nothing loads before you choose',
          text: 'Analytics are blocked by default. Google Analytics is not requested, not loaded, and sets no cookie unless you press Accept on the banner. Declining is one click, in the same place, at the same size — and the site behaves identically either way.',
        },
        {
          t: 'table',
          head: ['What', 'What it does', 'Needs consent?'],
          rows: [
            [
              'Your theme choice',
              'Remembers whether you prefer light or dark, so the page does not flash on load.',
              'No — it is stored in your browser only and never sent to us. Technically not a cookie at all.',
            ],
            [
              'Your cookie choice',
              'Records that you accepted or declined analytics, so we stop asking.',
              'No — remembering a refusal is what makes the refusal work.',
            ],
            [
              'Session and security',
              'Keeps you signed in to the app and protects forms against cross-site request forgery.',
              'No — strictly necessary to provide a service you asked for.',
            ],
            [
              'Google Analytics 4',
              'Tells us which pages get read, roughly where visitors come from, and which articles are worth writing more of. IP addresses are not logged by GA4.',
              '**Yes** — only runs if you accept, and only ever for analytics.',
            ],
          ],
        },
        {
          t: 'p',
          text: 'We do **not** run advertising or retargeting pixels, we do not use third-party marketing cookies, and Google Consent Mode is configured to keep every advertising signal denied even when you have accepted analytics.',
        },
        { t: 'h3', text: 'Changing your mind' },
        {
          t: 'ul',
          items: [
            'Click **Cookie settings** in the footer of any page. That clears your stored choice, deletes any Google Analytics cookies already on your device, and brings the banner back.',
            'Send a **Global Privacy Control** signal from your browser or extension. We treat GPC — and legacy Do Not Track — as a standing refusal: analytics never load and we do not show you the banner at all.',
            'Block cookies in your browser settings or use a content blocker. Nothing here breaks if you do.',
            `Or just email us at [${LEGAL.email}](mailto:${LEGAL.email}) and we will handle it.`,
          ],
        },
        {
          t: 'p',
          text: 'Withdrawing is as easy as consenting, and we do not treat a declined banner as a reason to ask again on the next page.',
        },
      ],
    },

    {
      id: 'sharing',
      title: 'Who else touches your data',
      blocks: [
        {
          t: 'p',
          text: 'We use a small number of vendors to actually run the service. Each one only gets what it needs, is bound by a contract that limits what it can do with it, and is listed here so you can check for yourself.',
        },
        { t: 'h3', text: 'The nrtur application' },
        {
          t: 'table',
          head: ['Provider', 'What it does for us', 'What it can see', 'Where'],
          rows: [
            [
              '[Aurinko](https://www.aurinko.io/privacy-policy)',
              'Connects and syncs your Gmail or Outlook mailbox and calendar',
              'The mail and calendar data you authorise, including message content, participants, and timestamps',
              'United States',
            ],
            [
              '[Twilio](https://www.twilio.com/en-us/legal/privacy)',
              'Delivers SMS and voice calls',
              'Sender and recipient phone numbers, message content, call metadata',
              'United States / global carriers',
            ],
            [
              '[Resend](https://resend.com/legal/privacy-policy)',
              'Delivers email sent from nrtur',
              'Recipient addresses, subject lines, and message content',
              'United States',
            ],
            [
              '[Stripe](https://stripe.com/privacy)',
              'Processes payments and stores card details',
              'Billing contact, address, and card data — card numbers never reach our servers',
              'United States / global',
            ],
          ],
        },
        { t: 'h3', text: 'This website' },
        {
          t: 'table',
          head: ['Provider', 'What it does for us', 'What it can see', 'Where'],
          rows: [
            [
              '[Vercel](https://vercel.com/legal/privacy-policy)',
              'Hosts and serves this website',
              'Request logs, including IP address and user agent',
              'United States / global CDN',
            ],
            [
              '[Google Analytics](https://policies.google.com/privacy)',
              'Website analytics — only if you accept the cookie banner',
              'Pages viewed, coarse location, traffic source',
              'United States / EU',
            ],
            [
              '[Google Forms](https://policies.google.com/privacy)',
              'Hosts our waitlist and early-access forms',
              'Whatever you type into those forms',
              'United States',
            ],
          ],
        },
        {
          t: 'note',
          tone: 'accent',
          title: 'Kept current',
          text: 'We update this table **before** a new sub-processor starts handling your data, and note the change under [Changes to this policy](#changes). Want advance notice by email whenever it changes? Ask us and we will add you to the list.',
        },
        { t: 'h3', text: 'The other three situations' },
        {
          t: 'p',
          text: 'Beyond those vendors, we will only disclose personal data when:',
        },
        {
          t: 'ol',
          items: [
            '**You ask us to** — for example when you connect an integration, or tell us to share something with someone.',
            '**The law requires it** — a valid court order, subpoena, or equivalent legal process. Where we are legally allowed to tell you first, we will, so you have a chance to challenge it. We will push back on requests that look overbroad.',
            '**The business changes hands** — if nrtur is acquired or merged, your data may transfer to the new owner, who stays bound by this policy. We will tell you before that happens and before your data becomes subject to a different policy.',
          ],
        },
      ],
    },

    {
      id: 'no-sale',
      title: 'We do not sell or share your personal information',
      blocks: [
        {
          t: 'p',
          text: 'Stated plainly, because US state privacy laws require it and because a lot of CRM companies are vague about it: we have not sold personal information in the past twelve months, we do not sell it now, and we do not share it for cross-context behavioural advertising. We have no plans to start.',
        },
        {
          t: 'p',
          text: 'We also do not sell the data of anyone under 16 — we do not knowingly collect it at all.',
        },
      ],
    },

    {
      id: 'transfers',
      title: 'Where your data lives',
      blocks: [
        {
          t: 'p',
          text: 'nrtur is a US company and our infrastructure is primarily in the United States. If you use nrtur from the UK, the EEA, or Switzerland, your personal data is transferred to and processed in the US.',
        },
        {
          t: 'p',
          text: 'For those transfers we rely on the **Standard Contractual Clauses** approved by the European Commission (and the UK Addendum for UK transfers), together with additional technical measures such as encryption in transit and at rest. We are not currently certified under the EU–US Data Privacy Framework; if that changes we will say so here.',
        },
        {
          t: 'p',
          text: `Want a copy of the transfer safeguards we rely on? Email [${LEGAL.email}](mailto:${LEGAL.email}) and we will send them.`,
        },
      ],
    },

    {
      id: 'retention',
      title: 'How long we keep things',
      blocks: [
        {
          t: 'p',
          text: 'We keep data for as long as it is doing a job, and no longer.',
        },
        {
          t: 'table',
          head: ['Data', 'How long'],
          rows: [
            [
              'Waitlist entries',
              'Until you ask us to remove you, or 24 months after your last interaction with us — whichever comes first',
            ],
            [
              'Account and CRM data',
              'For as long as your account is open. After you close it or ask us to delete it, we remove it from live systems within 30 days',
            ],
            [
              'Backups',
              'Encrypted backups roll off on their own schedule, so deleted data can persist in backups for up to 90 days before it is gone for good',
            ],
            [
              'Billing and tax records',
              'Up to 7 years, because tax law requires it. This is invoice-level information, not your CRM contents',
            ],
            [
              'Support emails',
              'Up to 3 years, so we have context if a problem comes back',
            ],
            [
              'Website analytics',
              'Up to 14 months, then Google Analytics deletes user-level records automatically. Aggregate reports may be kept longer',
            ],
            [
              'Security logs',
              'Up to 12 months, for incident investigation',
            ],
          ],
        },
      ],
    },

    {
      id: 'security',
      title: 'How we protect it',
      blocks: [
        {
          t: 'ul',
          items: [
            '**Encryption in transit** — everything travels over HTTPS/TLS. We do not serve the site over plain HTTP.',
            '**Encryption at rest** — stored data and backups are encrypted on disk.',
            '**Passwords are hashed**, using a slow, salted algorithm. Nobody at nrtur can read your password, and we will never ask you for it.',
            '**Least-privilege access** — production access is limited to the engineers who need it, protected by multi-factor authentication, and logged.',
            '**Backups** are taken regularly and periodically test-restored, because a backup nobody has restored is not a backup.',
          ],
        },
        {
          t: 'p',
          text: 'No system is perfectly secure, and we will not pretend otherwise. If we suffer a breach that affects your personal data, we will notify you and the relevant regulator without undue delay — and within 72 hours of becoming aware of it where GDPR applies.',
        },
        {
          t: 'p',
          text: 'Our [security overview](/security/) goes into more detail, including an honest status table of what we have built and what we have not, and our vulnerability disclosure policy.',
        },
        {
          t: 'note',
          tone: 'warn',
          title: 'Found a vulnerability?',
          text: `Please tell us before you tell anyone else — email [${LEGAL.email}](mailto:${LEGAL.email}) with the details. We will not pursue legal action against researchers who report issues in good faith, give us reasonable time to fix them, and do not access or destroy other people's data.`,
        },
      ],
    },

    {
      id: 'your-rights',
      title: 'Your rights, and how to use them',
      blocks: [
        {
          t: 'p',
          text: 'Depending on where you live, some or all of the following apply. We extend them to everyone regardless of location, because maintaining two standards of decency is more work than maintaining one.',
        },
        {
          t: 'ul',
          items: [
            '**Access** — get a copy of the personal data we hold about you.',
            '**Correction** — fix anything inaccurate or incomplete.',
            '**Deletion** — ask us to erase your data.',
            '**Portability** — get your data in a structured, machine-readable format, or exported to another provider.',
            '**Restriction and objection** — tell us to stop or limit a particular use, including anything we do on the basis of legitimate interests.',
            '**Withdraw consent** — at any time, where we relied on consent. This does not undo processing that already happened.',
            '**Opt out of sale or sharing** — there is nothing to opt out of, because we do not do it, but the right stands.',
            '**No retaliation** — we will not degrade your service or charge you more for exercising any of this.',
          ],
        },
        { t: 'h3', text: 'How to make a request' },
        {
          t: 'p',
          text: `Email [${LEGAL.email}](mailto:${LEGAL.email}) from the address on your account and tell us what you want. We will confirm receipt and respond within **30 days** — and if a request is genuinely complex we will tell you why we need longer, up to a further 60 days. It is free, unless a request is repetitive or excessive.`,
        },
        {
          t: 'p',
          text: 'We may need to verify who you are before acting, particularly for access and deletion. An authorised agent can make a request for you where the law allows it; we will ask for proof of authorisation.',
        },
        { t: 'h3', text: 'If we get it wrong' },
        {
          t: 'p',
          text: 'Come back to us first — we would rather fix it. You also have the right to complain to your data protection authority: the [ICO](https://ico.org.uk/make-a-complaint/) in the UK, your national supervisory authority in the EEA, or your state Attorney General in the US.',
        },
      ],
    },

    {
      id: 'children',
      title: 'Children',
      blocks: [
        {
          t: 'p',
          text: 'nrtur is a business tool. It is not directed at children, and you must be at least 16 to have an account. We do not knowingly collect personal data from anyone under 16. If you believe a child has given us personal data, email us and we will delete it.',
        },
      ],
    },

    {
      id: 'third-parties',
      title: 'Integrations and third-party sites',
      blocks: [
        {
          t: 'p',
          text: 'nrtur connects to other tools when you tell it to — your mailbox, your calendar, and others over time. Connecting one means granting nrtur permission to read or write data in that account.',
        },
        { t: 'h3', text: 'Google and Microsoft mailbox sync' },
        {
          t: 'note',
          tone: 'accent',
          title: 'Google API Services Limited Use',
          text: "nrtur's use and transfer of information received from Google APIs to any other app will adhere to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.",
        },
        {
          t: 'p',
          text: 'In practice that means the mail and calendar data we receive is used only to display and organise your messages against the right contact inside nrtur, and to run features you explicitly turn on. We do not use it for advertising, we do not sell it, we do not use it to train AI models, and no human reads it except with your explicit permission, to resolve a fault you reported to us, for security purposes, or where the law requires it.',
        },
        {
          t: 'p',
          text: 'We connect to Gmail and Outlook through **[Aurinko](https://www.aurinko.io/privacy-policy)**, a mail and calendar API provider that processes this data on our behalf as a sub-processor under contract. It is listed in the [sub-processor table](#sharing) above.',
        },
        {
          t: 'p',
          text: 'You can revoke access at any time from your [Google account permissions](https://myaccount.google.com/permissions) or your Microsoft account settings — that immediately stops any further sync.',
        },
        {
          t: 'p',
          text: 'Our website also links out to other sites — documentation, comparison sources, our vendors. Once you follow a link you are on their turf and under their privacy policy, not ours.',
        },
      ],
    },

    {
      id: 'changes',
      title: 'Changes to this policy',
      blocks: [
        {
          t: 'p',
          text: 'We will update this page when our practices change. The "last updated" date at the top always reflects the current version.',
        },
        {
          t: 'p',
          text: 'For minor edits — clarifying wording, adding a vendor to the table — updating this page is the notice. For material changes that affect your rights or meaningfully expand how we use your data, we will email account holders and give at least **30 days notice** before they take effect, so you have time to object or close your account.',
        },
      ],
    },

    {
      id: 'contact',
      title: 'Contact us',
      blocks: [
        {
          t: 'p',
          text: 'Questions, requests, complaints, or a Data Processing Agreement to sign — all go to the same place, and a person on the team answers.',
        },
        {
          t: 'ul',
          items: [
            `**Email** — [${LEGAL.email}](mailto:${LEGAL.email})`,
            `**Post** — ${LEGAL.company}, ${LEGAL.address}`,
          ],
        },
        {
          t: 'p',
          text: 'If you are in the UK or EEA and would like to raise something with our data protection contact specifically, use the same address and put "GDPR" in the subject line so it gets routed correctly.',
        },
        { t: 'h3', text: 'EU and UK representative' },
        {
          t: 'note',
          tone: 'warn',
          title: 'A gap we are not going to hide',
          text: `Article 27 of the GDPR requires controllers outside the EU and UK who offer services to people there to appoint a local representative. **${LEGAL.company} has not yet appointed one.** We are a US company at an early stage and our EU/UK processing is currently limited, but we are not going to dress that up as an exemption we have not formally assessed. We will appoint representatives as EU and UK usage grows, and name them here when we do. In the meantime every request reaches us directly at [${LEGAL.email}](mailto:${LEGAL.email}), and your right to complain to your own supervisory authority is unaffected.`,
        },
      ],
    },
  ],
}
