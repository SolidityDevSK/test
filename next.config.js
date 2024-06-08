/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["gateway.pinata.cloud","res.cloudinary.com"],
  },
};

module.exports = nextConfig;
