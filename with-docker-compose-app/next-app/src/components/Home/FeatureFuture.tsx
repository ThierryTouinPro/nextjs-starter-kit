"use client";

import { useClientTranslation } from '../../../utils/useClientTranslation';

export default function FeatureFuture(): JSX.Element {
  const { t, isClient } = useClientTranslation('common'); // Utilisez le hook avec le namespace 'common'

  if (!isClient) {
    // Rendu d'un indicateur de chargement ou un élément temporaire pour éviter le rendu côté serveur
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1 className="text-center my-4">{t('goals')}</h1>
      <div className="col-md-5">
        <h2>{t('goals-title-1')}</h2>
        <p>
          {t('goals-texte-1')}
        </p>
        <h2>{t('goals-title-2')}</h2>
        <p>
          {t('goals-texte-2')}
        </p>
        <h2>{t('goals-title-3')}</h2>
        <p>
          {t('goals-texte-3')}
        </p>
      </div>
      <div className="col-md-7">
        <div>
          <img
            src="/images/illustration-editor-desktop.svg"
            alt="Editor Interface"
            className="img-fluid illustration-editor-desktop"
          />
        </div>
      </div>
    </>
  );
}
