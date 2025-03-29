/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', 
  basePath: '/spa-test.github.io', 
  assetPrefix: '/spa-test.github.io/', 
  webpack: (config) => {
    config.optimization.minimizer = config.optimization.minimizer.filter(
      (plugin) => plugin.constructor.name !== 'CssMinimizerPlugin'
    );
    return config;
  },
};

module.exports = nextConfig;
