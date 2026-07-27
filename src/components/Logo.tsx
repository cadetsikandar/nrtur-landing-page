// nrtur butterfly mark in the brand accent (evergreen), theme-aware.
// STOPGAP: the source logo is still a transparent *violet* PNG, so we recolor it by
// using its alpha as a CSS mask filled with --accent (exact color, and auto light/dark).
// When we have a real green SVG, swap the mask url in `.logo-mark` (app/globals.css) — or
// change this component to render it — and every usage updates from one place.
export default function Logo({ className = '' }: { className?: string }) {
  return <span role="img" aria-label="nrtur logo" className={`logo-mark inline-block shrink-0 ${className}`} />
}
