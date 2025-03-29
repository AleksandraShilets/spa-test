/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', 
  basePath: '/spa-test', 
  assetPrefix: '/spa-test/', 
  webpack: (config) => {
    config.optimization.minimizer = config.optimization.minimizer.filter(
      (plugin) => plugin.constructor.name !== 'CssMinimizerPlugin'
    );
    return config;
  },
};

module.exports = nextConfig;
