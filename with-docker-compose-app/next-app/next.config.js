// ce commentairepermet de bénéficier de l'autocomplétion et du typage TypeScript tout en conservant un fichier JavaScript.
/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "fr",
  },
};

module.exports = nextConfig;
