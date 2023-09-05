/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['database', 'utils', 'models'],
};

module.exports = nextConfig;
