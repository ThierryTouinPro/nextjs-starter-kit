import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../components/Authentification/Register/css/Register.module.css";
import Connexion from "../../components/Authentification/Login/Connexion";
import Registration from "../../components/Authentification/Register/Registration";
import { useTranslation } from "react-i18next";
import { useClientTranslation } from "../../../utils/useClientTranslation";

export default function AuthForm(): JSX.Element {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const router = useRouter();
  const { formType } = router.query;

  const { t, isClient } = useClientTranslation('common'); // Utilisez le hook avec le namespace 'common'

  

  // Synchroniser isLogin avec l'URL
  useEffect(() => {
    if (formType === "registration") {
      setIsLogin(false);
    } else if (formType === "connexion") {
      setIsLogin(true);
    }
  }, [formType]);

  function switchAuthModeHandler() {
    if (isLogin) {
      router.push("/auth/registration");
    } else {
      router.push("");
    }
  }

  if (!isClient) {
    // Rendu d'un indicateur de chargement ou un élément temporaire pour éviter le rendu côté serveur
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">
      <div className="text-center text-dark pt-5">
        <h1>{isLogin ? t("title-connection") : t("title-register")}</h1>
      </div>
      <div className="text-center mb-4">
        <p>{t("text-securitisation")}</p>
      </div>
      <div
        id={styles.registernsk}
        className={`row justify-content-center align-items-center mb-5 mt-4 ${styles.detailsFormRegister}`}
      >
        <div className="row">
          <div className="col-md-4 col-sm-4 col-xs-12 mb-4 mt-4 d-flex flex-column justify-content-center">
            {!isLogin ? (
              <div className="container text-center">
                <h3>{t("title-register-connection")}</h3>
                <p>
                  {t("title-register-connection-text")}{" "}
                  <button
                    type="button"
                    onClick={switchAuthModeHandler}
                    style={{
                      border: "none",
                      background: "none",
                      padding: "0",
                      textDecoration: "underline",
                    }}
                  >
                    {t("title-connection")}
                  </button>
                </p>
              </div>
            ) : (
              <div className="container text-center">
                <h3>{t("texte-create-connection")}</h3>
                <p>
                  {t("connection-text")}{" "}
                  <button
                    type="button"
                    onClick={switchAuthModeHandler}
                    style={{
                      border: "none",
                      background: "none",
                      padding: "0",
                      textDecoration: "underline",
                    }}
                  >
                    {t("title-register")}
                  </button>
                </p>
              </div>
            )}
          </div>

          <div className="col-md-1 d-none d-md-flex justify-content-center align-items-center">
            <div
              style={{ width: "1px", height: "50%", backgroundColor: "#ccc" }}
            ></div>
          </div>

          <div className="col-md-7 col-sm-8 col-xs-12 d-flex justify-content-center p-0">
            <div className="container">
              {formType === "registration" || !isLogin ? (
                <Registration />
              ) : (
                <Connexion />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
