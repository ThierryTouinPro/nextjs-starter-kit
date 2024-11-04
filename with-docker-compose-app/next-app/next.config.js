/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  output: "standalone",
  i18n,  // Intègre la configuration i18n pour le multilingue
};

module.exports = nextConfig;
