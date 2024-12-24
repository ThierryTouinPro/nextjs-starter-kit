"use client";

import { useClientTranslation } from "@/utils/useClientTranslation";

export default function FeatureInfrastructure(): JSX.Element {
  const { t, isClient } = useClientTranslation("common"); // Utilisez le hook avec le namespace 'common'

  if (!isClient) {
    // Rendu d'un indicateur de chargement ou un élément temporaire pour éviter le rendu côté serveur
    return null;
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
          <h2 className="text-white">{t("register-title")}</h2>
          <p>{t("register-text")}</p>
        </div>
      </div>
    </>
  );
}
