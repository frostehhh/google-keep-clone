/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { webpack, isServer, nextRuntime }) => {
    // Avoid AWS SDK Node.js require issue
    if (isServer && nextRuntime === 'nodejs')
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ })
      );
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gstatic.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
