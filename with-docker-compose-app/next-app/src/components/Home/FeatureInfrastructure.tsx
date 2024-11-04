"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';

export default function FeatureInfrastructure(): JSX.Element {

  const { t, i18n } = useTranslation('common');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Marquer le composant comme monté côté client
  }, []);

  if (!isClient) {
    // Rendu d'un indicateur de chargement ou un élément temporaire pour éviter le rendu côté serveur
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="phones">
            <img
              src="/images/illustration-phones.svg"
              alt="NSK Site Phone"
              className="img-fluid phone-img"
            />
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="text-white">{t('register-title')}</h2>
          <p>
            {t('register-text')}
          </p>
        </div>
      </div>
    </>
  );
}
