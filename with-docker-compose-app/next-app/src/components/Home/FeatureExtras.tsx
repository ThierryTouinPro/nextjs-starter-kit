"use client";

import { useClientTranslation } from "../../../utils/useClientTranslation";

export default function FeatureExtras(): JSX.Element {
  const { t, isClient } = useClientTranslation("common"); // Utilisez le hook avec le namespace 'common'

  if (!isClient) {
    // Rendu d'un indicateur de chargement ou un élément temporaire pour éviter le rendu côté serveur
    return null;
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
        <h2>{t("technology-title")}</h2>
        {t("technology-next")}
        <br />
        {t("technology-docker")}
        <br />
        {t("technology-wsl")}
        <br />
        {t("technology-vscode")}
        <br />
      </div>
    </>
  );
}
