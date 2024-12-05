import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'fr'],
    fallbackLng: 'fr',           // Langue par défaut en cas d'absence de traduction
    ns: ['common'],              // Namespace par défaut
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,        // Empêche l'échappement des valeurs, nécessaire pour React
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
