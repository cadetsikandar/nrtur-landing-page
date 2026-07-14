/** @type {import('next').NextConfig} */
const nextConfig = {
  // One canonical trailing-slash rule for every URL.
  trailingSlash: true,
  reactStrictMode: true,
  // Ghost feature images (when GHOST_URL is configured) can be added here, e.g.:
  // images: { remotePatterns: [{ protocol: 'https', hostname: 'your-ghost-host.com' }] },
}

export default nextConfig
