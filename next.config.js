/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "platform-lookaside.fbsbx.com",
      "storage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
