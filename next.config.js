/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL
  },
  images: {
    domains: ['localhost']
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://109.68.213.40/api/v1/:path*'
      },
      {
        source: '/api/v1/media/uploads/:path*',
        destination: 'http://109.68.213.40/api/v1/media/uploads/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
