/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paper & Ink — role tokens (full-color; never apply an opacity modifier).
        paper: 'var(--paper)',
        surface: { DEFAULT: 'var(--surface)', 2: 'var(--surface-2)', 3: 'var(--surface-3)' },
        ink: { DEFAULT: 'var(--ink)', 2: 'var(--ink-2)', 3: 'var(--ink-3)', 4: 'var(--ink-4)' },
        line: { DEFAULT: 'var(--line)', 2: 'var(--line-2)', 3: 'var(--line-3)' },
        accent: { DEFAULT: 'var(--accent)', ink: 'var(--accent-ink)', soft: 'var(--accent-soft)', line: 'var(--accent-line)' },
        pos: { DEFAULT: 'var(--pos)', soft: 'var(--pos-soft)', ink: 'var(--pos-ink)' },
        warn: { DEFAULT: 'var(--warn)', soft: 'var(--warn-soft)', ink: 'var(--warn-ink)' },
        neg: { DEFAULT: 'var(--neg)', soft: 'var(--neg-soft)', ink: 'var(--neg-ink)' },
        info: { DEFAULT: 'var(--info)', soft: 'var(--info-soft)', ink: 'var(--info-ink)' },
        violet: { DEFAULT: 'var(--violet)', soft: 'var(--violet-soft)', ink: 'var(--violet-ink)' },
        'btn-bg': 'var(--btn-bg)', 'btn-fg': 'var(--btn-fg)', 'btn-bg-hover': 'var(--btn-bg-hover)',
        'mark-bg': 'var(--mark-bg)', 'mark-fg': 'var(--mark-fg)',
        hover: 'var(--hover)', scrim: 'var(--scrim)',
        'on-solid': 'var(--on-solid)', highlight: 'var(--highlight)',
        // Categorical identity hues (avatars / activity dots)
        'avatar-blue': 'var(--avatar-blue)', 'avatar-violet': 'var(--avatar-violet)',
        'avatar-amber': 'var(--avatar-amber)', 'avatar-pink': 'var(--avatar-pink)',
        'avatar-indigo': 'var(--avatar-indigo)', 'avatar-green': 'var(--avatar-green)',
        'avatar-gray': 'var(--avatar-gray)', 'avatar-teal': 'var(--avatar-teal)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'Newsreader', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        // Paper & Ink elevation (neutral ink shadows). Legacy aliases kept neutral.
        sm: 'var(--sh-sm)', md: 'var(--sh-md)', pop: 'var(--sh-pop)',
        brand: 'var(--sh-md)', 'brand-lg': 'var(--sh-pop)',
        card: 'var(--sh-sm)', 'card-hover': 'var(--sh-md)',
      },
      borderRadius: { card: 'var(--r-card)', ctl: 'var(--r-ctl)', pill: 'var(--r-pill)' },
    },
  },
  plugins: [],
}
