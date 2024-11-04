import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Pour charger les fichiers de traduction via HTTP
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'fr'], // Liste des langues prises en charge
    fallbackLng: 'fr',           // Langue par défaut en cas d'absence de traduction
    lng: 'fr',                   // Langue actuelle (ou définissez-la dynamiquement)
    ns: ['common'],              // Namespace par défaut
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,        // Désactiver l'échappement pour React
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Chemin vers les fichiers de traduction
    },
  });

export default i18n;
