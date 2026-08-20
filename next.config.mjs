/** @type {import('next').NextConfig} */
const nextConfig = {
  // One canonical trailing-slash rule for every URL.
  trailingSlash: true,
  reactStrictMode: true,
  // Ghost feature images (when GHOST_URL is configured) can be added here, e.g.:
  // images: { remotePatterns: [{ protocol: 'https', hostname: 'your-ghost-host.com' }] },

  // 301/308 redirects from retired placeholder-post slugs to their real replacements,
  // so old indexed URLs don't 404 and any link equity carries over.
  async redirects() {
    return [
      { source: '/blog/alternatives/do-you-need-salesforce', destination: '/blog/alternatives/best-salesforce-alternatives/', permanent: true },
      { source: '/blog/alternatives/best-hubspot-alternatives-small-teams', destination: '/blog/alternatives/best-hubspot-alternatives/', permanent: true },
      { source: '/blog/use-cases/agencies-client-pipelines', destination: '/blog/use-cases/crm-for-agencies/', permanent: true },
      { source: '/blog/guides/migrate-from-hubspot-to-nrtur', destination: '/blog/alternatives/best-hubspot-alternatives/', permanent: true },
    ]
  },
}

export default nextConfig
