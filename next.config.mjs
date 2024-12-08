/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['new.codewp.in', 'localhost', 'ai-tools-chi.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'new.codewp.in',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;