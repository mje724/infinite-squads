/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NATIVE_BUILD === '1' ? 'export' : undefined,
  trailingSlash: process.env.NATIVE_BUILD === '1',
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
