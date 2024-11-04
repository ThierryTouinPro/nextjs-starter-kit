"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';

export default function FeatureExtras(): JSX.Element {

    
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
      <div className="col-md-6">
        <div>
          <img
            src="/images/illustration-laptop-desktop.svg"
            alt="Descriptive Image"
            className="img-fluid illustration-laptop-desktop"
          />
        </div>
      </div>
      <div className="col-md-6">
        <h2>{t('technology-title')}</h2>
        {t('technology-next')}
        <br />
        {t('technology-docker')}
        <br />
        {t('technology-wsl')}
        <br />
        {t('technology-vscode')}
        <br />
      </div>
    </>
  );
}
