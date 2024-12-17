import Link from "next/link";
import { useClientTranslation } from "../../utils/useClientTranslation";

function Page404(): JSX.Element {
  const { t, isClient } = useClientTranslation("common"); // Utilisez le hook avec le namespace 'common'

  if (!isClient) {
    // Rendu d'un indicateur de chargement ou un élément temporaire pour éviter le rendu côté serveur
    return <h1>Loading...</h1>;
  }

  return (
    <div className="text-center d-flex flex-column align-items-center justify-content-center vh-100 404Page">
      <h1 className="display-1">404</h1>
      <h2 className="mb-5">{t("not-found-page")}</h2>
      <p>{t("not-found-page-paragraph1")}</p>
      <p>
        {t("not-found-page-paragraph2")}{" "}
        <Link
          href="/"
          className="link-info link-offset-2 link-underline-opacity-10 link-underline-opacity-100-hover"
        >
          {t("not-found-page-link")}
        </Link>
      </p>
    </div>
  );
}

export default Page404;
