// Pricing-page FAQ. Same shape as `faqs` in src/lib/schema.ts: `a` is rendered on the page,
// `shortA` is what goes into FAQPage JSON-LD. No 'use client' — see the note in src/lib/pricing.ts.

export const pricingFaqs = [
  {
    q: 'Why do I pay for calls and texts up front?',
    a: "Because it means you can never get a bill you didn't expect. Calling and texting come out of a prepaid balance you top up when you like, from $20. The balance is the spend cap: a runaway automation stops when the balance does, nobody can spend money they haven't loaded, and there is no usage invoice at the end of the month because there is nothing left to collect. Auto top-up exists, but it is off by default and carries its own monthly ceiling that you set.",
    shortA:
      'Calling and texting come out of a prepaid balance you top up from $20. The balance is the spend cap — a runaway automation stops when the balance does, and there is never a usage bill at month end.',
  },
  {
    q: 'What happens when my balance reaches zero?',
    a: 'Sending stops. Receiving does not — incoming calls and messages still reach you, free, with an empty balance. Your CRM is untouched either way: records, pipelines, email sync and automations all keep working. Top up and sending resumes immediately.',
    shortA:
      'Sending stops; receiving does not — incoming calls and messages still reach you free of charge. Your CRM keeps working, and topping up resumes sending immediately.',
  },
  {
    q: 'Is the wallet balance refundable?',
    a: "No. The balance is non-refundable, and so are carrier registration fees — we have already paid those out to the carriers. It does not expire while your account is open, and if you cancel it stays usable for 12 months. Plan fees are separate: annual plans are refunded pro rata within 30 days, monthly plans for the current month.",
    shortA:
      'No — the wallet balance and carrier registration fees are non-refundable. The balance never expires while your account is open, and stays usable for 12 months after cancelling.',
  },
  {
    q: 'What happens if I go over a record limit?',
    a: "Nothing breaks. Growing past a limit never blocks a save — we warn you at 80% and again at 100% and keep accepting records. The one thing that changes is bulk import: an import that would cross the line partly succeeds and tells you so, in as many words — \"2,500 of 5,000 imported.\" We are not going to stop your CRM saving a customer in order to sell you an upgrade.",
    shortA:
      'Nothing breaks. Growing past a limit never blocks a save — you get a warning at 80% and 100% and records keep saving. A bulk import that would cross the line partly succeeds and says so.',
  },
  {
    q: 'What happens if I downgrade?',
    a: 'Nothing is deleted and nothing is disconnected. You keep every record, mailbox, phone line and automation you already had. The only restriction is that you cannot add new ones until you are back under the limit — that is the single case where we refuse to create something.',
    shortA:
      'Nothing is deleted or disconnected — you keep every record, mailbox, line and automation. You just cannot add new ones until you are back under the limit.',
  },
  {
    q: 'Can Solo send email and texts from an automation?',
    a: 'No. Solo has one active automation and it cannot send. You can still send email and texts by hand from Solo — add a phone line and the Texting add-on and it works like any other plan — but automated sending starts on Team. If you build a flow containing a send step on Solo, we refuse it when you save it, not silently weeks later when it fails to run.',
    shortA:
      'No. Solo has one automation and it cannot send; automated sending starts on Team. You can still send email and texts by hand on Solo with a phone line and the Texting add-on.',
  },
  {
    q: 'Do you cap how much email I can send?',
    a: "We do not cap manual sending and we do not charge for it. Email goes out through your own mailbox, so the real ceiling is your provider's — roughly 2,000 a day on Google Workspace, 10,000 recipients on Microsoft 365. We pace below it and show you what is left. What each plan does cap is automated sends: 1,000 a month on Team, 25,000 on Pro, 100,000 on Business.",
    shortA:
      "Manual sending is uncapped and free — it goes through your own mailbox, so your provider's limit applies. Automated sends are capped per plan: 1,000 a month on Team, 25,000 on Pro, 100,000 on Business.",
  },
  {
    q: 'Why does Business start at five users?',
    a: 'Business includes phone support, a named contact and eight hours of data migration. Those are real people, and the plan is priced to fund them from five seats up. At five users billed yearly, Business is $499 a month. If you want SSO or an audit log below that size, tell us — we would rather hear it than have you guess.',
    shortA:
      'Business includes phone support, a named contact and eight hours of migration, which the plan funds from five seats up. At five users billed yearly it is $499 a month.',
  },
  {
    q: 'How soon can I start texting?',
    a: 'Calling works on day one. Texting does not — the carriers require every business that sends text messages to register, and their approval takes several days. That wait is outside our control. We include the registration and the monthly carrier fees in the $9 Texting add-on rather than billing them separately, so there is one price to understand instead of five, but we cannot make the carriers go faster.',
    shortA:
      'Calling works on day one; texting needs carrier registration, which takes several days and is outside our control. Registration and carrier fees are included in the $9 Texting add-on.',
  },
  {
    q: 'Can you raise my price?',
    a: 'Not without warning, and not straight away. If we raise a price you keep the price you signed up at for 12 months, and we tell you 60 days before the change applies. Every price on this page excludes tax.',
    shortA:
      'If we raise a price, you keep your existing price for 12 months and we tell you 60 days before it applies. All prices exclude tax.',
  },
]
