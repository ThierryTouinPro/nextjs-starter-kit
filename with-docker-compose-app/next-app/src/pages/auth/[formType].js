import React, { useState } from "react";
import { useRouter } from 'next/router';
import styles from "../../components/Authentification/Register/css/Register.module.css";
import Connexion from "../../components/Authentification/Login/Connexion";
import Registration from "../../components/Authentification/Register/Registration";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  
  const router = useRouter();
  const { formType } = router.query;

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    if (isLogin) {
      router.push('/auth/connexion');
    } else {
      router.push('/auth/inscription');
    }
  }

  return (
    <div className="container">
      <h1 className="text-center text-dark pt-5">
        <h1>{formType === 'connexion' || !isLogin ? 'Connexion' : 'Inscription'}</h1>
      </h1>
      <div className="text-center mb-4">
        <p>Cette page est sécurisée par un protocole SSL/TLS pour protéger vos informations.</p>
      </div>
      <div id={styles.registernsk} className={`row justify-content-center align-items-center mb-5 mt-4 ${styles.detailsFormRegister}`} >
        
        <div className="row">
          {/* Bloc de texte centré verticalement */}
          <div className="col-md-4 col-sm-4 col-xs-12 mb-4 mt-4 d-flex flex-column justify-content-center">
            {formType === 'registration' || !isLogin ? (
              <div className="container text-center">
                <h3>Connectez-vous</h3>
                <p>
                  Vous êtes déjà inscrit ?{" "}
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
                    Connectez-vous
                  </button>
                </p>
              </div>
            ) : (
              <div className="container text-center">
                <h3>Créer un compte</h3>
                <p>
                  Vous n'avez pas de compte ?{" "}
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
                    Inscrivez-vous
                  </button>
                </p>
              </div>
            )}
          </div>

          {/* Séparateur vertical */}
          <div className="col-md-1 d-none d-md-flex justify-content-center align-items-center">
            <div style={{ width: "1px", height: "50%", backgroundColor: "#ccc" }}></div>
          </div>

          {/* Bloc de formulaire */}
          <div className="col-md-7 col-sm-8 col-xs-12 d-flex justify-content-center">
            <div className="container">
              {formType === 'registration' || !isLogin ? <Registration /> : <Connexion />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
