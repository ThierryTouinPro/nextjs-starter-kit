import { useEffect } from "react";
import { useClientTranslation } from "../../utils/useClientTranslation";
import i18next from "i18next";

export default function Home(): JSX.Element {
  const { t, isClient } = useClientTranslation("common"); // Utilisez le hook avec le namespace 'common'

  useEffect(() => {
    // Récupérer la langue actuelle depuis localStorage
    const currentLanguage =
      localStorage.getItem("currentLanguage") || i18next.language;
    i18next.changeLanguage(currentLanguage);
  }, []);

  // Rendu d'un indicateur de chargement ou un élément temporaire pour éviter le rendu côté serveur
  if (!isClient) {
    return <h1> Loading...</h1>;
  }

  return (
    <div className="container">
      <div className="text-center text-dark pt-5">
        <h1 className="mb-5">{t("title-profile")}</h1>
      </div>
    </div>
  );
}
