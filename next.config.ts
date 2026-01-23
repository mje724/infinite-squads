import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
