/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['127.0.0.1', 'localhost', 'roof-top.shop', 'i.seadn.io', 'ipfs.io', 'dummyimage.com'],
  },
};

module.exports = nextConfig;
