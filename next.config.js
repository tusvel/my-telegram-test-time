/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://almond-satin-periodical.glitch.me/:path*'
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:5000/uploads/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
