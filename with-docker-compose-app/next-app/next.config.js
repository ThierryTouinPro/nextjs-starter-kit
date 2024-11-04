/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  output: "standalone",
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
  },
};

module.exports = nextConfig;
