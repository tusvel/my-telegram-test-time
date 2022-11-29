/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL
  },
  images: {
    domains: ['localhost', 'swiftpark.ddns.net']
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://swiftpark.ddns.net/api/v1/:path*'
      },
      {
        source: '/api/v1/media/uploads/:path*',
        destination: 'https://swiftpark.ddns.net/api/v1/media/uploads/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
