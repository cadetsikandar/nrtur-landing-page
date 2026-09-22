// Renders the product social card for the marketing pages → public/og/home.png
// (referenced by ogImage() in src/lib/metadata.ts for /, /pricing/, /compare/ …).
//
// Why a static file, not the /og/ edge route: the card embeds a real screenshot of
// the hero's app frame (assets/og/hero-demo-*.png, ~350 KB), which would push the
// edge function past Vercel's 1 MB compressed cap. A file in public/ is also the
// fastest possible response for a social crawler — no render, no cold start.
//
// Regenerate whenever the hero demo or headline changes:
//   npm run og:home            → light app frame (default)
//   npm run og:home -- dark    → dark app frame
//
// To refresh the screenshot itself: capture http://localhost:3000/ with headless
// Chrome at --force-device-scale-factor=2 --window-size=1440,1900 within the first
// 4 s (the demo starts on the Pipeline view, then auto-rotates), crop the demo window
// + the "Deal won" toast (drop the right-hand one), paint out the tab-switcher strip,
// save to assets/og/ at 1790×1270.
import fs from 'node:fs'
import path from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const ROOT = process.cwd()
const variant = process.argv[2] === 'dark' ? 'dark' : 'light'
const OUT = path.join(ROOT, 'public', 'og', 'home.png')

const W = 1200
const H = 630

// Paper & Ink light tokens (app/paper-ink.css) — same palette as src/lib/og-image.tsx.
const PAPER = '#F4F3EF'
const INK = '#1B1A17'
const INK_2 = '#57544C'
const INK_3 = '#8E8A80'
const ACCENT = '#1E7F55'
const ACCENT_INK = '#155F3E'
const ACCENT_BRIGHT = '#2FA877'
const LINE = 'rgba(27,26,23,0.12)'

const font = (f) => fs.readFileSync(path.join(ROOT, 'src', 'assets', 'fonts', f))
const fonts = [
  { name: 'Inter', data: font('inter-500.ttf'), weight: 500, style: 'normal' },
  { name: 'Inter', data: font('inter-700.ttf'), weight: 700, style: 'normal' },
  { name: 'Newsreader', data: font('newsreader-500.ttf'), weight: 500, style: 'normal' },
]

const shotPath = path.join(ROOT, 'assets', 'og', `hero-demo-${variant}@2x.png`)
const shot = `data:image/png;base64,${fs.readFileSync(shotPath).toString('base64')}`
// Source is 1790×1270 (the frame cropped just inside its activity panel, so nothing
// gets sliced at the card edge). Placed 830px wide from x=560 it runs ~10px past the
// right edge — reads as "a real app", not a diagram, and keeps the left column clear.
const SHOT_W = 830
const SHOT_H = Math.round((SHOT_W * 1270) / 1790)

// Satori takes a React-like element tree; this tiny helper keeps it readable.
// (An empty children array counts as "multiple children" to Satori, so omit it.)
const h = (type, style, ...children) => ({
  type,
  props: { style, ...(children.length ? { children: children.length === 1 ? children[0] : children } : {}) },
})

const tree = h(
  'div',
  {
    width: W,
    height: H,
    display: 'flex',
    flexDirection: 'column',
    background: PAPER,
    fontFamily: 'Inter',
    color: INK,
    position: 'relative',
    overflow: 'hidden',
  },
  // Soft accent glow behind the screenshot.
  h('div', {
    position: 'absolute',
    top: -200,
    right: -160,
    width: 760,
    height: 760,
    borderRadius: 9999,
    background:
      'radial-gradient(circle, rgba(30,127,85,0.16) 0%, rgba(30,127,85,0.06) 45%, rgba(30,127,85,0) 70%)',
  }),
  // The app frame — rounded, shadowed, bleeding off the right edge.
  h(
    'div',
    {
      position: 'absolute',
      top: 100,
      left: 560,
      width: SHOT_W,
      height: SHOT_H,
      display: 'flex',
      borderRadius: 18,
      overflow: 'hidden',
      // No negative spread: resvg panics on the degenerate filter region it produces.
      boxShadow: '0 24px 60px rgba(27,26,23,0.22), 0 0 0 1px rgba(27,26,23,0.07)',
    },
    { type: 'img', props: { src: shot, width: SHOT_W, height: SHOT_H, style: { objectFit: 'cover' } } },
  ),
  // Left column
  h(
    'div',
    { display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '60px 0 0 64px', width: 540 },
    h(
      'div',
      { display: 'flex', alignItems: 'center', gap: 14 },
      h(
        'div',
        {
          width: 48,
          height: 48,
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${ACCENT_INK} 0%, ${ACCENT_BRIGHT} 100%)`,
          color: '#FFFFFF',
          fontSize: 28,
          fontWeight: 700,
          lineHeight: 1,
        },
        'n',
      ),
      h('div', { fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }, 'nrtur'),
    ),
    h(
      'div',
      { marginTop: 74, fontSize: 20, fontWeight: 500, letterSpacing: 3, textTransform: 'uppercase', color: ACCENT_INK },
      'CRM for small teams',
    ),
    h(
      'div',
      {
        marginTop: 16,
        fontFamily: 'Newsreader',
        fontWeight: 500,
        fontSize: 66,
        lineHeight: 1.06,
        letterSpacing: -1,
        color: INK,
        width: 470,
      },
      'The CRM small teams actually want to use',
    ),
    h(
      'div',
      { marginTop: 26, fontSize: 23, fontWeight: 500, lineHeight: 1.4, color: INK_2, width: 440 },
      'Contacts, deals, and follow-ups — without the enterprise price tag.',
    ),
  ),
  // Footer
  h(
    'div',
    { display: 'flex', alignItems: 'center', gap: 10, padding: '0 0 42px 64px', fontSize: 23, fontWeight: 500, color: INK_3 },
    h('div', { width: 10, height: 10, borderRadius: 9999, background: ACCENT }),
    'nrtur.io',
  ),
  h('div', { height: 1, background: LINE }),
  h('div', { height: 10, background: `linear-gradient(90deg, ${ACCENT_INK} 0%, ${ACCENT_BRIGHT} 100%)` }),
)

const svg = await satori(tree, { width: W, height: H, fonts })
const png = new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng()
fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, png)
console.log(`og:home (${variant}) → ${path.relative(ROOT, OUT)} (${(png.length / 1024).toFixed(0)} KB)`)
