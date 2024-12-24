import { useEffect, useState } from "react";
import { useClientTranslation } from "@/utils/useClientTranslation";
import styles from "@/components/Authentification/Profile/css/Profile.module.css";
import { useRouter } from "next/router";

export default function ProfilePage(): JSX.Element {
  const { t, isClient } = useClientTranslation("common"); // Utilisez le hook avec le namespace 'common'
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user/profile");

        if (!response.ok) {
          console.error("Erreur:", response.status, response.statusText);
          if (response.status === 401) {
            router.push("/auth/connexion"); // Redirige vers la page de connexion
          }
          return; // Stoppe l'exécution si la réponse n'est pas valide
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur:",
          error
        );
      }
    };
    fetchUser();
  }, []);

  /*useEffect(() => {
    // Récupérer la langue actuelle depuis localStorage
    const currentLanguage =
      localStorage.getItem("currentLanguage") || i18next.language;
    i18next.changeLanguage(currentLanguage);
  }, []);*/

  if (!user && isClient) {
    return <p>Chargement des données...</p>;
  }

  // Rendu d'un indicateur de chargement ou un élément temporaire pour éviter le rendu côté serveur
  if (!isClient) {
    return null;
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">
          {t("title-profile-part1")}
          <span className={styles.userFirstName}>{user?.firstName}</span>
          {t("title-profile-part2")}
        </h1>
      </div>

      {user ? (
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div
              id={styles.profileContainer}
              className={`shadow-sm border-0 ${styles.detailsProfileContainer}`}
            >
              <div className="card-body">
                <h4 className={`mb-4 ${styles.userDetails}`}>
                  {t("user-details")}
                </h4>
                <ul className="list-group-flush">
                  <li className="list-group-item">
                    <strong>{t("email")}</strong>: {user.email}
                  </li>
                  {user.firstName && user.lastName && (
                    <li className="list-group-item">
                      <strong>{t("name")}</strong>: {user.firstName}{" "}
                      {user.lastName}
                    </li>
                  )}
                  {user.birthDate && (
                    <li className="list-group-item">
                      <strong>{t("birthDate")}</strong>: {user.birthDate}
                    </li>
                  )}
                  {user.phone && (
                    <li className="list-group-item">
                      <strong>{t("phone")}</strong>: {user.phone}
                    </li>
                  )}
                  {user.gender && (
                    <li className="list-group-item">
                      <strong>{t("gender")}</strong>: {user.gender}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-dark fs-5">{t("no-data")}</p>
        </div>
      )}
    </div>
  );
}
