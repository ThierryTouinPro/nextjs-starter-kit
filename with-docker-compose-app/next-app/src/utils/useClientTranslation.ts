import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function useClientTranslation(namespace: string = 'common') {
  const { t, i18n } = useTranslation(namespace);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    // Mettre à jour la langue en fonction de l'URL
    const language = router.locale || 'fr';
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [router.locale, i18n]);

  return { t, i18n, isClient };
}
