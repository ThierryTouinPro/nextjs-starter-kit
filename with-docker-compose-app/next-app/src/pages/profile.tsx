import { useEffect, useState } from "react";
import { useClientTranslation } from "../../utils/useClientTranslation";
import i18next from "i18next";
import styles from "../components/Authentification/Profile/css/Profile.module.css";

interface FormData {
  email: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  phone?: string;
  gender?: string;
}

export default function ProfilePage(): JSX.Element {
  const { t, isClient } = useClientTranslation("common"); // Utilisez le hook avec le namespace 'common'
  const [userData, setUserData] = useState<FormData | null>(null);

  useEffect(() => {
    // Récupérer la langue actuelle depuis localStorage
    const currentLanguage =
      localStorage.getItem("currentLanguage") || i18next.language;
    i18next.changeLanguage(currentLanguage);

    // Récupérer les données utilisateur depuis localStorage
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setUserData(JSON.parse(storedData)); // Stocker les données dans l'état
      localStorage.removeItem("formData"); // Supprimer après récupération
    }
  }, []);

  // Rendu d'un indicateur de chargement ou un élément temporaire pour éviter le rendu côté serveur
  if (!isClient) {
    return null;
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">
          {t("title-profile-part1")}
          <span className={styles.userFirstName}>{userData?.firstName}</span>
          {t("title-profile-part2")}
        </h1>
      </div>

      {userData ? (
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
                    <strong>{t("email")}</strong>: {userData.email}
                  </li>
                  {userData.firstName && userData.lastName && (
                    <li className="list-group-item">
                      <strong>{t("name")}</strong>: {userData.firstName}{" "}
                      {userData.lastName}
                    </li>
                  )}
                  {userData.birthDate && (
                    <li className="list-group-item">
                      <strong>{t("birthDate")}</strong>: {userData.birthDate}
                    </li>
                  )}
                  {userData.phone && (
                    <li className="list-group-item">
                      <strong>{t("phone")}</strong>: {userData.phone}
                    </li>
                  )}
                  {userData.gender && (
                    <li className="list-group-item">
                      <strong>{t("gender")}</strong>: {userData.gender}
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
