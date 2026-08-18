import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Mail, RefreshCw } from 'lucide-react'
import TableOfContents from '@/components/TableOfContents'
import { LEGAL, type Block, type LegalDoc } from '@/lib/legal'

/** Minimal inline renderer for legal copy: `**bold**` and `[label](href)`.
 *  Deliberately tiny — legal text needs emphasis and citations, nothing else. */
function inline(text: string): ReactNode[] {
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g
  const out: ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null

  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))

    if (m[1]) {
      out.push(
        <strong key={m.index} className="font-semibold text-ink">
          {m[1]}
        </strong>
      )
    } else {
      const href = m[3]
      const external = /^(https?:|mailto:)/.test(href)
      const cls = 'text-accent underline underline-offset-2 decoration-accent-line hover:decoration-accent'
      out.push(
        external ? (
          <a
            key={m.index}
            href={href}
            className={cls}
            {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {m[2]}
          </a>
        ) : (
          <Link key={m.index} href={href} className={cls}>
            {m[2]}
          </Link>
        )
      )
    }
    last = m.index + m[0].length
  }

  if (last < text.length) out.push(text.slice(last))
  return out
}

const noteTone = {
  accent: { wrap: 'bg-accent-soft border-accent-line', title: 'text-accent-ink' },
  pos: { wrap: 'bg-pos-soft border-accent-line', title: 'text-pos-ink' },
  warn: { wrap: 'bg-warn-soft border-warn', title: 'text-warn-ink' },
} as const

function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case 'p':
      return <p className="text-[15px] text-ink-2 leading-relaxed mb-4">{inline(block.text)}</p>

    case 'h3':
      return <h3 className="text-lg font-semibold text-ink mt-8 mb-3">{block.text}</h3>

    case 'ul':
      return (
        <ul className="mb-5 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="relative pl-5 text-[15px] text-ink-2 leading-relaxed">
              <span className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full bg-accent" />
              {inline(item)}
            </li>
          ))}
        </ul>
      )

    case 'ol':
      return (
        <ol className="mb-5 space-y-2 list-decimal pl-5 marker:text-ink-4 marker:font-mono marker:text-[13px]">
          {block.items.map((item, i) => (
            <li key={i} className="text-[15px] text-ink-2 leading-relaxed pl-1">
              {inline(item)}
            </li>
          ))}
        </ol>
      )

    case 'table':
      return (
        <div className="mb-6 -mx-6 px-6 sm:mx-0 sm:px-0 overflow-x-auto">
          <table className="w-full min-w-[34rem] text-[13.5px] border-collapse">
            <thead>
              <tr className="border-b border-line">
                {block.head.map((h) => (
                  <th key={h} className="text-left font-semibold text-ink p-2.5 align-bottom whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`p-2.5 align-top border-t border-line-2 leading-relaxed ${
                        j === 0 ? 'text-ink font-medium' : 'text-ink-2'
                      }`}
                    >
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'note': {
      const tone = noteTone[block.tone ?? 'accent']
      return (
        <div className={`mb-5 rounded-xl border p-4 ${tone.wrap}`}>
          {block.title && (
            <p className={`font-mono text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${tone.title}`}>
              {block.title}
            </p>
          )}
          <p className="text-[14px] text-ink-2 leading-relaxed">{inline(block.text)}</p>
        </div>
      )
    }
  }
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const headings = doc.sections.map((s) => ({ text: s.title, slug: s.id }))

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="orb w-[560px] h-[560px] bg-surface-2 -top-56 -left-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_28%_-10%,var(--surface-2),transparent)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-[46rem]">
            <div className="inline-flex items-center gap-2 bg-accent-soft border border-accent-line rounded-full px-4 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-accent-ink text-sm font-medium">{doc.eyebrow}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-semibold font-serif tracking-tight leading-[1.08] text-ink mb-5">
              {doc.title}
            </h1>

            <p className="text-lg text-ink-2 leading-relaxed mb-7">{doc.lede}</p>

            <div className="flex flex-wrap items-center gap-2.5">
              {doc.showEffective !== false && (
                <span className="inline-flex items-center gap-1.5 bg-surface border border-line rounded-full px-3 py-1.5 text-[13px] text-ink-3">
                  <CalendarDays size={13} className="text-ink-4" />
                  Effective {LEGAL.effective}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 bg-surface border border-line rounded-full px-3 py-1.5 text-[13px] text-ink-3">
                <RefreshCw size={13} className="text-ink-4" />
                Last updated {LEGAL.updated}
              </span>
              <Link
                href={doc.sibling.href}
                className="inline-flex items-center gap-1.5 bg-surface border border-line hover:border-line-3 rounded-full px-3 py-1.5 text-[13px] text-ink-2 hover:text-ink transition-colors"
              >
                {doc.sibling.label}
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Plain-English summary */}
      <section className="relative border-y border-line bg-surface-2 py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="section-label mb-3">
            <span>{doc.summaryTitle}</span>
          </div>
          <p className="max-w-[44rem] text-[15px] text-ink-2 leading-relaxed mb-8">{doc.summaryNote}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {doc.pledges.map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass-card p-5">
                <div className="w-9 h-9 rounded-xl bg-accent-soft flex items-center justify-center mb-3.5">
                  <Icon size={17} className="text-accent" />
                </div>
                <p className="text-[15px] font-bold text-ink mb-1.5">{title}</p>
                <p className="text-[13.5px] text-ink-2 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="relative py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents headings={headings} />
              </div>
            </aside>

            <div className="max-w-[46rem]">
              {doc.sections.map((section, i) => (
                <section key={section.id} id={section.id} className="scroll-mt-28 mb-12 last:mb-0">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-mono text-[13px] font-semibold text-ink-4 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-2xl font-semibold font-serif tracking-tight text-ink">
                      {section.title}
                    </h2>
                  </div>
                  {section.blocks.map((block, j) => (
                    <BlockView key={j} block={block} />
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="pb-24">
        <div className="max-w-[840px] mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-surface border border-line shadow-md rounded-3xl px-8 py-12 sm:px-10 text-center">
            <div className="orb w-[400px] h-[400px] bg-surface-2 -top-52 left-1/2 -translate-x-1/2" />
            <div className="relative">
              <h2 className="text-3xl sm:text-[34px] font-semibold font-serif tracking-tight text-ink mb-3">
                {doc.cta?.title ?? 'Still have a question?'}
              </h2>
              <p className="max-w-md mx-auto text-[15px] text-ink-2 leading-relaxed mb-7">
                {doc.cta?.body ??
                  'A real person on the team answers these — not a ticket queue. Ask us anything about how we handle your data.'}
              </p>
              <a href={`mailto:${LEGAL.email}`} className="btn-primary text-[15px] px-7 py-3.5">
                <Mail size={15} />
                {LEGAL.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
