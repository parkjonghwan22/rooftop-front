/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['127.0.0.1', 'localhost', 'roof-top.shop', 'nest-deploy-c764d61cc1b8.herokuapp.com', 'i.seadn.io', 'ipfs.io', 'dummyimage.com', 'nftin-wallet-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
