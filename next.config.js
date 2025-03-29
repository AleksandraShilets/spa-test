/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', 
  basePath: '', 
  assetPrefix: '', 
  webpack: (config) => {
    config.optimization.minimizer = config.optimization.minimizer.filter(
      (plugin) => plugin.constructor.name !== 'CssMinimizerPlugin'
    );
    return config;
  },
};

module.exports = nextConfig;
