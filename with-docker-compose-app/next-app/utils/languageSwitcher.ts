"use client";

import { useRouter } from 'next/router';
import { useClientTranslation } from './useClientTranslation';

export function useLanguageSwitcher() {
  const router = useRouter();
  const { i18n } = useClientTranslation();

  // Détermine la langue actuelle
  const currentLocale = router.locale || 'fr';
  const nextLocale = currentLocale === 'en' ? 'fr' : 'en';

  // Détermine l'icône de drapeau
  const flagIcon = nextLocale === 'en' ? 'gb' : 'fr';

  // Fonction pour changer la langue
  const switchLanguage = () => {
    i18n.changeLanguage(nextLocale);
    router.push(router.asPath, undefined, { locale: nextLocale });
  };

  return { switchLanguage, flagIcon, currentLocale, nextLocale };
}
