/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['127.0.0.1', 'localhost', 'roof-top.shop', 'nest-deploy-c764d61cc1b8.herokuapp.com', 'i.seadn.io', 'ipfs.io', 'dummyimage.com'],
  },
};

module.exports = nextConfig;
