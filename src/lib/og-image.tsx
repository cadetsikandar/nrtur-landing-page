// Shared social-card (Open Graph / Twitter) renderer. Used by the file-based
// `opengraph-image.tsx` / `twitter-image.tsx` routes so every page unfurls with a
// 1200×630 card on LinkedIn, Slack, X, iMessage, etc. Without an og:image those
// platforms render no card at all — a bare URL — even though the HTML is fine.
//
// Rendered by Satori (via next/og), which only understands a flexbox subset of CSS
// and needs raw font bytes — hence the pinned TTFs in src/assets/fonts and the
// `display: 'flex'` on every element that has more than one child.
//
// The routes that call this MUST declare `export const runtime = 'edge'`. Next 14's
// Node build of @vercel/og resolves its fallback font with path.join(import.meta.url),
// which produces an invalid `.\file:\…` URL on Windows and breaks both `next dev` and
// `next build` there; the Edge build uses fetch(new URL()) and works on every OS.
import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

// Paper & Ink light-theme tokens (app/paper-ink.css). Hard-coded because the card is
// a raster: it has no theme to follow and must look the same in every feed.
const PAPER = '#F4F3EF'
const INK = '#1B1A17'
const INK_2 = '#57544C'
const INK_3 = '#8E8A80'
const ACCENT = '#1E7F55'
const ACCENT_INK = '#155F3E'
const ACCENT_BRIGHT = '#2FA877'
const LINE = 'rgba(27,26,23,0.12)'

// `new URL(…, import.meta.url)` is what makes Next bundle the TTFs into the edge
// function; a plain string path would not be traced. Keep these literal.
async function loadFonts() {
  const [inter500, inter700, newsreader500] = await Promise.all([
    fetch(new URL('../assets/fonts/inter-500.ttf', import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL('../assets/fonts/inter-700.ttf', import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL('../assets/fonts/newsreader-500.ttf', import.meta.url)).then((r) => r.arrayBuffer()),
  ])
  return [
    { name: 'Inter', data: inter500, weight: 500 as const, style: 'normal' as const },
    { name: 'Inter', data: inter700, weight: 700 as const, style: 'normal' as const },
    { name: 'Newsreader', data: newsreader500, weight: 500 as const, style: 'normal' as const },
  ]
}

// Long article titles step down so they never overflow the card. Thresholds are
// tuned for Newsreader at ~1050px of usable width.
function titleSize(title: string): number {
  if (title.length <= 40) return 80
  if (title.length <= 70) return 66
  if (title.length <= 100) return 54
  return 46
}

// Satori has no reliable line-clamp; keep titles to a length that fits three lines
// at the smallest size above.
function clampTitle(title: string, max = 120): string {
  if (title.length <= max) return title
  const cut = title.slice(0, max - 1)
  return cut.slice(0, cut.lastIndexOf(' ')) + '…'
}

export type OgCardProps = {
  /** Small uppercase label above the title, e.g. "CRM for small teams" or "Guides · nrtur blog". */
  eyebrow: string
  title: string
  /** Bottom-left line, e.g. a one-sentence description or the author byline. */
  footer: string
}

export async function renderOgCard({ eyebrow, title, footer }: OgCardProps) {
  const fonts = await loadFonts()
  const heading = clampTitle(title)

  return new ImageResponse(
    (
      <div
        style={{
          width: OG_SIZE.width,
          height: OG_SIZE.height,
          display: 'flex',
          flexDirection: 'column',
          background: PAPER,
          fontFamily: 'Inter',
          color: INK,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Soft accent glow, top-right — the same "green on paper" mood as the hero. */}
        <div
          style={{
            position: 'absolute',
            top: -260,
            right: -220,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: `radial-gradient(circle, rgba(30,127,85,0.16) 0%, rgba(30,127,85,0.06) 45%, rgba(30,127,85,0) 70%)`,
          }}
        />

        {/* Content column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            padding: '60px 72px 0',
          }}
        >
          {/* Brand row — mirrors the navbar: gradient "n" tile + wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 13,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${ACCENT_INK} 0%, ${ACCENT_BRIGHT} 100%)`,
                color: '#FFFFFF',
                fontSize: 30,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              n
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>nrtur</div>
          </div>

          {/* Eyebrow */}
          <div
            style={{
              marginTop: 64,
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: ACCENT_INK,
            }}
          >
            {eyebrow}
          </div>

          {/* Title */}
          <div
            style={{
              marginTop: 18,
              fontFamily: 'Newsreader',
              fontWeight: 500,
              fontSize: titleSize(heading),
              lineHeight: 1.08,
              letterSpacing: -1,
              maxWidth: 1040,
              color: INK,
            }}
          >
            {heading}
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 72px 44px',
            gap: 40,
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: INK_2,
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            {footer}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 24,
              fontWeight: 500,
              color: INK_3,
              flexShrink: 0,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 9999, background: ACCENT }} />
            nrtur.io
          </div>
        </div>

        {/* Hairline + accent bar along the bottom edge */}
        <div style={{ height: 1, background: LINE }} />
        <div
          style={{
            height: 10,
            background: `linear-gradient(90deg, ${ACCENT_INK} 0%, ${ACCENT_BRIGHT} 100%)`,
          }}
        />
      </div>
    ),
    { ...OG_SIZE, fonts },
  )
}
