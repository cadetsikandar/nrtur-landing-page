// The supplied client-logo PNGs are built for OPPOSITE backgrounds and have baked-in
// opaque backgrounds — Prowork (white/yellow on solid black) & Devaxl (white text,
// transparent) need a dark bg, while Nawaytech (navy on solid white) & MinsaBloom
// (maroon) need a light one. No single tile colour or CSS filter makes all four read
// uniformly, so instead of mismatched image tiles we render a clean, consistent
// wordmark bar that looks right in both themes. Swap back to <img> logos here once we
// have transparent, single-tone versions of all four.
const clients = ['DevAXL', 'Prowork', 'Nawaytech', 'MinsaBloom']

export default function TrustedBy() {
  return (
    <section className="py-14 bg-surface-2 border-y border-line">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-center font-mono text-xs font-medium text-ink-3 tracking-[0.22em] uppercase mb-8">
          Trusted by early-access teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-10 gap-y-4">
          {clients.map((name, i) => (
            <div key={name} className="flex items-center gap-x-8 sm:gap-x-10">
              <span className="text-base sm:text-lg font-semibold tracking-[0.12em] uppercase text-ink-3 hover:text-ink transition-colors duration-200">
                {name}
              </span>
              {i < clients.length - 1 && <span className="hidden sm:block h-4 w-px bg-line-3" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
