// Real early-access clients. Logos live in public/Clients (exact case — matters
// on Linux/Vercel). Cycled to fill the marquee, then duplicated so it loops
// seamlessly (second half mirrors the first).
// Per-logo sizing tuned to each aspect ratio so square marks and wide wordmarks
// read at the same visual weight (Nawaytech is square → sized up; the wordmarks
// are wide → capped by width).
const clients = [
  { name: 'DevAXL', logo: '/Clients/devaxl-logo.png', imgClass: 'max-h-8 max-w-[130px]' },
  { name: 'Prowork', logo: '/Clients/prowork-logo.png', imgClass: 'max-h-8 max-w-[124px]' },
  // New wide wordmark; it's dark navy, so render it white to read on the dark strip.
  { name: 'Nawaytech', logo: '/Clients/Nawaytech-logo.png', imgClass: 'max-h-9 max-w-[155px] brightness-0 invert' },
  { name: 'MinsaBloom', logo: '/Clients/MinsaBloom.png', imgClass: 'max-h-[50px] max-w-[78px]' },
]
const half = [...clients, ...clients, ...clients]
const companies = [...half, ...half]

export default function TrustedBy() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070f] via-[#0a0a14] to-[#07070f]" />

      <div className="relative z-10">
        <p className="text-center text-sm font-medium text-white/25 tracking-widest uppercase mb-10 px-6">
          Trusted by early-access teams at
        </p>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#07070f] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#07070f] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee whitespace-nowrap items-center">
            {companies.map((c, i) => (
              <div
                key={i}
                className="inline-flex items-center justify-center mx-8 h-[64px] w-[150px] flex-shrink-0 opacity-85 hover:opacity-100 transition-opacity duration-300"
              >
                <img
                  src={c.logo}
                  alt={`${c.name} logo`}
                  className={`${c.imgClass} w-auto object-contain`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
