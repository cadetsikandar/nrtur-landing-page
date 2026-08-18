import { CreditCard, Download, LogOut, ShieldCheck } from 'lucide-react'
import { LEGAL, type LegalDoc } from './legal'

export const termsDoc: LegalDoc = {
  eyebrow: 'Terms',
  title: 'Terms of Service',
  lede:
    'The agreement between you and nrtur. Written to be read — short sentences, no defined-term soup, and the parts that actually cost you money called out plainly.',
  summaryTitle: 'The short version',
  summaryNote:
    'A human-readable summary of the deal. It is not the contract — the numbered sections below are — but nothing down there should surprise you after reading this.',
  sibling: { label: 'Read the Privacy Policy', href: '/privacy/' },

  pledges: [
    {
      icon: CreditCard,
      title: 'No surprise charges',
      body:
        'One published price. We tell you before we raise it, trials never auto-upgrade without your say-so, and we do not lock you into multi-year contracts.',
    },
    {
      icon: LogOut,
      title: 'Cancel whenever',
      body:
        'Month-to-month means month-to-month. Cancel in the app, keep access until the end of the period you paid for, and nobody will call to talk you out of it.',
    },
    {
      icon: Download,
      title: 'Your data comes with you',
      body:
        'You own what you put in. Export it at any time in a standard format, including on your way out the door.',
    },
    {
      icon: ShieldCheck,
      title: 'Fair use, fairly enforced',
      body:
        'We only suspend accounts for real abuse — spam, fraud, attacks on the service. You get notice and a chance to fix it unless the harm is immediate.',
    },
  ],

  sections: [
    {
      id: 'agreement',
      title: 'The agreement',
      blocks: [
        {
          t: 'p',
          text: `These terms are a contract between you and ${LEGAL.company} ("${LEGAL.shortName}", "we", "us"). They apply when you use our website at ${LEGAL.site} or the nrtur application (together, the "Service").`,
        },
        {
          t: 'p',
          text: 'By creating an account, joining the waitlist, or using the Service, you accept these terms. If you are accepting on behalf of a company, you are confirming that you have the authority to bind it — and "you" then means that company.',
        },
        {
          t: 'p',
          text: 'Our [Privacy Policy](/privacy/) explains how we handle personal data and forms part of this agreement.',
        },
        {
          t: 'note',
          tone: 'accent',
          title: 'Early access',
          text: 'nrtur is in early access, and the application is live for early-access customers. If you have an account, all of these terms apply to you today. If you have only visited the website or joined the waitlist, the sections on acceptable use, your data, and liability apply to that use. Sections describing a commitment we have not made yet — such as a contractual uptime guarantee — say so explicitly where they appear.',
        },
      ],
    },

    {
      id: 'who-can-use',
      title: 'Who can use nrtur',
      blocks: [
        {
          t: 'ul',
          items: [
            'You must be at least **16 years old**.',
            'You must give us accurate signup information and keep it current.',
            'You must not be barred from using the Service under the laws of your country or ours, and you must not be on a sanctions list we are required to screen against.',
            'One human per login. Accounts are for people, not shared mailboxes — if two people need access, buy two seats.',
          ],
        },
      ],
    },

    {
      id: 'accounts',
      title: 'Your account and its security',
      blocks: [
        {
          t: 'p',
          text: 'You are responsible for what happens under your account, and for keeping your credentials secret. Use a strong, unique password and turn on multi-factor authentication when it is available.',
        },
        {
          t: 'p',
          text: `Tell us immediately at [${LEGAL.email}](mailto:${LEGAL.email}) if you think someone has got into your account. We are not liable for losses caused by someone else using your credentials before you tell us — but we will help you contain it the moment you do.`,
        },
        {
          t: 'p',
          text: 'If your workspace has multiple members, the account owner controls seats, permissions, and the workspace data — including the ability to remove members and their access.',
        },
      ],
    },

    {
      id: 'early-access',
      title: 'Early access and beta features',
      blocks: [
        {
          t: 'p',
          text: 'Parts of nrtur are labelled early access, beta, or preview. Those parts:',
        },
        {
          t: 'ul',
          items: [
            'May change substantially, or be withdrawn entirely, without notice.',
            'May contain bugs, and are provided **as is** with no availability commitment.',
            'Are not covered by any service level agreement or support commitment.',
          ],
        },
        {
          t: 'p',
          text: 'Use them because you want to shape the product, not because you need them to be dependable. Keep your own copy of anything you cannot afford to lose. If we retire a beta feature that you rely on, we will give you as much warning as we reasonably can and help you export what is in it.',
        },
      ],
    },

    {
      id: 'billing',
      title: 'Plans, trials, and billing',
      blocks: [
        { t: 'h3', text: 'Trials' },
        {
          t: 'p',
          text: 'Free trials last for the period we advertise when you start one. We will not convert a trial into a paid subscription without you actively choosing a plan. At the end of a trial, an account without a plan moves to read-only rather than being deleted, so you have time to export.',
        },
        { t: 'h3', text: 'Charges' },
        {
          t: 'ul',
          items: [
            'Prices are as published on our pricing page at the time you subscribe, exclusive of tax unless stated otherwise. You are responsible for any VAT, GST, or sales tax that applies.',
            'Subscriptions renew automatically — monthly or annually, whichever you chose — until you cancel.',
            'Per-seat plans are billed on the number of seats in your workspace. Add a seat mid-cycle and you are charged a prorated amount; remove one and the reduction applies at the next renewal.',
            'Usage-based extras such as SMS are billed in arrears for what you actually used.',
          ],
        },
        { t: 'h3', text: 'Failed payments' },
        {
          t: 'p',
          text: 'If a payment fails we will retry and email you. If it is still unpaid after **14 days** we may downgrade the workspace to read-only, and after **30 days** we may suspend it. We will not delete your data during this period.',
        },
        { t: 'h3', text: 'Price changes' },
        {
          t: 'p',
          text: 'We can change our prices, but not quietly. We will give current customers at least **30 days notice** by email before a change hits your renewal, and the new price never applies to a billing period you have already paid for. If you do not like the new price, cancel before it takes effect.',
        },
      ],
    },

    {
      id: 'cancellation',
      title: 'Cancellation and refunds',
      blocks: [
        {
          t: 'p',
          text: 'Cancel from your account settings at any time. Cancelling stops the next renewal — you keep full access until the end of the period you have already paid for, then the workspace drops to read-only.',
        },
        {
          t: 'p',
          text: 'We do not generally refund partial periods. Two exceptions, because they are the fair ones:',
        },
        {
          t: 'ol',
          items: [
            'If we charged you in error, or you were billed after cancelling, we refund it in full.',
            'If you paid annually and cancel because we materially broke something or changed these terms to your detriment, email us — we will refund the unused months.',
          ],
        },
        {
          t: 'p',
          text: 'Consumers in the UK and EU keep their statutory cancellation rights, which these terms do not limit.',
        },
      ],
    },

    {
      id: 'acceptable-use',
      title: 'Acceptable use',
      blocks: [
        {
          t: 'p',
          text: 'Do not use nrtur to:',
        },
        {
          t: 'ul',
          items: [
            'Break the law, or help anyone else break it.',
            'Send spam, or message people who have not agreed to hear from you — see [Email and SMS you send](#messaging).',
            'Store or distribute malware, or run phishing and fraud operations.',
            'Harass, threaten, defame, or impersonate anyone.',
            'Infringe someone else\'s intellectual property or privacy rights.',
            'Probe, scrape, overload, or reverse-engineer the Service, or get around rate limits, seat counts, and plan limits.',
            'Resell or white-label nrtur as your own product without a written agreement from us.',
            'Store data you have no lawful right to hold — including special-category data the product is not built for.',
          ],
        },
        {
          t: 'p',
          text: 'We do not monitor your CRM contents looking for violations. We act on reports, on abuse signals from our infrastructure, and on legal process.',
        },
      ],
    },

    {
      id: 'messaging',
      title: 'Email and SMS you send through nrtur',
      blocks: [
        {
          t: 'p',
          text: 'Sending features come with obligations that are yours, not ours. When you send email or SMS through nrtur, you confirm that:',
        },
        {
          t: 'ul',
          items: [
            'You have the consent or other lawful basis you need to contact each recipient — including **express written consent** for marketing SMS where the law requires it.',
            'Your messages identify who you are and include a working way to opt out.',
            'You honour unsubscribes and STOP replies promptly, and do not message anyone again after they opt out.',
            'You comply with the rules that apply to you — CAN-SPAM, the TCPA, GDPR and PECR, CASL, and your carrier\'s requirements.',
          ],
        },
        {
          t: 'p',
          text: 'Spam complaints hurt every customer on our infrastructure. If your sending generates complaint rates that put deliverability at risk, we may throttle or disable sending on your account while we sort it out with you.',
        },
      ],
    },

    {
      id: 'your-data',
      title: 'Your data stays yours',
      blocks: [
        {
          t: 'p',
          text: 'You keep all rights to the data you put into nrtur — contacts, deals, notes, files, everything. We claim no ownership of it.',
        },
        {
          t: 'p',
          text: 'You grant us only the licence we need to run the Service for you: to host, copy, back up, transmit, and display your data, and to process it through the features you turn on. That licence exists to operate the product and ends when you delete the data or close your account.',
        },
        {
          t: 'ul',
          items: [
            '**Export** — you can export your data at any time while your account is active, in a standard format.',
            '**Deletion** — closing your account removes your data from live systems within 30 days, and from backups within 90. Details in the [Privacy Policy](/privacy/#retention).',
            '**Aggregated statistics** — we may use anonymised, aggregated usage data (for example "the median workspace has 4 pipelines") to improve and describe the product. It never identifies you or your contacts, and never contains your CRM contents.',
          ],
        },
      ],
    },

    {
      id: 'our-ip',
      title: 'Our intellectual property',
      blocks: [
        {
          t: 'p',
          text: 'The Service itself — the software, design, brand, name, logo, and documentation — belongs to us. These terms give you a limited, non-exclusive, non-transferable right to use it while your account is in good standing, and nothing more.',
        },
        {
          t: 'p',
          text: 'If you send us feedback, ideas, or feature requests, we can use them freely without owing you anything. We appreciate them; we just cannot run a product where every suggestion creates a claim.',
        },
      ],
    },

    {
      id: 'integrations',
      title: 'Third-party integrations',
      blocks: [
        {
          t: 'p',
          text: 'nrtur connects to services we do not control — your mailbox, calendar, payment provider, and others. Connecting one is your choice, and your use of it is governed by that provider\'s terms, not ours.',
        },
        {
          t: 'p',
          text: 'If a provider changes or removes their API, we may have to change or drop the integration. We will tell you when we know, but we are not liable for a third party breaking their own service.',
        },
      ],
    },

    {
      id: 'availability',
      title: 'Availability and changes to the Service',
      blocks: [
        {
          t: 'p',
          text: 'We work hard to keep nrtur up, and we will give advance notice of planned maintenance where we reasonably can. We do not currently offer a contractual uptime guarantee; if we introduce one for a plan, it will be published and will say so.',
        },
        {
          t: 'p',
          text: 'We improve the product continuously, which means features change. If we remove or materially degrade a feature you depend on, we will give you at least **30 days notice** where we can, and help you export anything affected.',
        },
      ],
    },

    {
      id: 'suspension',
      title: 'Suspension and termination',
      blocks: [
        { t: 'h3', text: 'By you' },
        {
          t: 'p',
          text: 'Cancel or close your account at any time, for any reason, from your settings.',
        },
        { t: 'h3', text: 'By us' },
        {
          t: 'p',
          text: 'We may suspend or terminate an account if you materially breach these terms, if your payment is long overdue, or if we are legally required to. Except where the harm is immediate — active abuse, an attack on the Service, fraud, or a legal order — we will tell you what is wrong and give you a reasonable chance to fix it first.',
        },
        {
          t: 'p',
          text: 'If we terminate your account for reasons other than your breach, we will refund the unused portion of anything you have prepaid. After termination you have **30 days** to export your data before we delete it.',
        },
      ],
    },

    {
      id: 'warranty',
      title: 'Disclaimer of warranties',
      blocks: [
        {
          t: 'p',
          text: 'We build carefully and we stand behind the product, but we have to be clear about the limits. To the fullest extent the law allows, the Service is provided **"as is" and "as available"**, without warranties of any kind, express or implied — including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
        },
        {
          t: 'p',
          text: 'We do not warrant that the Service will be uninterrupted, error-free, or that it will meet your specific requirements.',
        },
        {
          t: 'p',
          text: 'Nothing here excludes liability that cannot lawfully be excluded, and if you are a consumer your statutory rights are unaffected.',
        },
      ],
    },

    {
      id: 'liability',
      title: 'Limitation of liability',
      blocks: [
        {
          t: 'p',
          text: 'To the fullest extent permitted by law, neither party is liable to the other for indirect, incidental, special, consequential, or punitive damages, or for lost profits, lost revenue, or lost data, even if warned that they were possible.',
        },
        {
          t: 'p',
          text: 'Our total liability arising out of or relating to the Service is capped at **the greater of (a) the amount you paid us in the twelve months before the event giving rise to the claim, or (b) US $100**.',
        },
        {
          t: 'p',
          text: 'These limits do not apply to death or personal injury caused by negligence, to fraud or fraudulent misrepresentation, or to anything else that cannot be limited under applicable law.',
        },
      ],
    },

    {
      id: 'indemnity',
      title: 'Indemnification',
      blocks: [
        {
          t: 'p',
          text: 'You agree to defend and indemnify us against third-party claims, damages, and reasonable legal costs arising from your use of the Service in breach of these terms, from the data you put into it, or from messages you send through it. We will tell you promptly about any such claim and let you control the defence, provided any settlement does not require us to admit fault or pay money.',
        },
      ],
    },

    {
      id: 'law',
      title: 'Governing law and disputes',
      blocks: [
        {
          t: 'p',
          text: `These terms are governed by the laws of ${LEGAL.governingLaw}, without regard to its conflict-of-laws rules. The courts located in that jurisdiction have exclusive jurisdiction over any dispute, and both parties consent to venue there.`,
        },
        {
          t: 'p',
          text: 'If you are a consumer resident in the UK, EU, or another jurisdiction whose law gives you the right to bring proceedings locally, that right is unaffected.',
        },
        {
          t: 'p',
          text: `Before filing anything, email us at [${LEGAL.email}](mailto:${LEGAL.email}). Most disputes are a misunderstanding and get resolved in a couple of messages, which is cheaper and faster for everyone.`,
        },
      ],
    },

    {
      id: 'general',
      title: 'The general clauses',
      blocks: [
        {
          t: 'ul',
          items: [
            '**Entire agreement** — these terms and the [Privacy Policy](/privacy/) are the whole agreement between us on this subject, and replace anything said earlier.',
            '**Severability** — if a court finds part of this unenforceable, the rest stays in force.',
            '**No waiver** — not enforcing something once does not mean we have given up the right to enforce it later.',
            '**Assignment** — you may not transfer this agreement without our written consent. We may assign it in connection with a merger, acquisition, or sale of assets, on notice to you.',
            '**Force majeure** — neither party is liable for delays caused by events genuinely outside its control.',
            '**Survival** — the sections on your data, our IP, warranties, liability, indemnification, and governing law survive termination.',
          ],
        },
      ],
    },

    {
      id: 'changes',
      title: 'Changes to these terms',
      blocks: [
        {
          t: 'p',
          text: 'We will update these terms from time to time. The "last updated" date at the top always reflects the current version.',
        },
        {
          t: 'p',
          text: 'For minor clarifications, updating this page is the notice. For material changes — anything affecting your rights, your money, or your data — we will email account holders at least **30 days** in advance. If you keep using nrtur after a change takes effect, you have accepted it; if you would rather not, cancel before then and we will refund any unused prepaid time.',
        },
      ],
    },

    {
      id: 'contact',
      title: 'Contact us',
      blocks: [
        {
          t: 'p',
          text: 'Questions about these terms go to a person on the team, not a queue.',
        },
        {
          t: 'ul',
          items: [
            `**Email** — [${LEGAL.email}](mailto:${LEGAL.email})`,
            `**Post** — ${LEGAL.company}, ${LEGAL.address}`,
          ],
        },
      ],
    },
  ],
}
