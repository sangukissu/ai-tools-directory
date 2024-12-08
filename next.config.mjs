/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['new.codewp.in', 'localhost'],
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