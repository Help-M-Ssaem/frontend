/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'mssaem-bucket.s3.ap-northeast-2.amazonaws.com',
      'mssaem-bucket-v2.s3.ap-northeast-2.amazonaws.com',
    ],
  },
}

export default nextConfig
