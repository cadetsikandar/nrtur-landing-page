// Real early-access clients. Logos live in public/Clients (exact case — matters
// on Linux/Vercel). Cycled to fill the marquee, then duplicated so it loops
// seamlessly (second half mirrors the first).
const clients = [
  { name: 'DevAXL', logo: '/Clients/devaxl-logo.png' },
  { name: 'Prowork', logo: '/Clients/prowork-logo.png' },
  { name: 'Nawaytech', logo: '/Clients/Nawaytech-logo.png' },
  { name: 'MinsaBloom', logo: '/Clients/MinsaBloom.jpg' },
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

          <div className="flex animate-marquee whitespace-nowrap">
            {companies.map((c, i) => (
              <div
                key={i}
                className="inline-flex items-center justify-center mx-3 h-16 w-[168px] flex-shrink-0 rounded-xl bg-white/[0.92] border border-white/10 opacity-80 hover:opacity-100 transition-opacity duration-300"
              >
                <img
                  src={c.logo}
                  alt={`${c.name} logo`}
                  className="h-8 max-w-[128px] w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
