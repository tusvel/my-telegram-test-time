/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL
  },
  images: {
    domains: ['localhost', 'picsum.photos', 'images.unsplash.com']
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://swiftpark.ddns.net/docs/:path*'
      },
      {
        source: '/uploads/:path*',
        destination: 'http://swiftpark.ddns.net/docs/uploads/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
