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
        source: '/api/:path*',
        destination: 'https://635fbc9d3e8f65f283ba109f.mockapi.io/api/:path*'
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:5000/uploads/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
