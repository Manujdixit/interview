/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // Enable strict mode for additional checks
  reactStrictMode: true,
  // Optionally, if you're using app directory
};

export default nextConfig;
