/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ["gateway.pinata.cloud","res.cloudinary.com"],
    unoptimized: true
  },
};

module.exports = nextConfig;
