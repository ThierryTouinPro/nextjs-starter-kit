import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export function useClientTranslation(namespace: string = 'common') {
  const { t, i18n } = useTranslation(namespace);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Marque que le composant est monté côté client
  }, []);

  return { t, i18n, isClient };
}
