import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ReponseError } from "../../lib/reponse";
import ButtonSubmit from "../Interface/ButtonSubmit";
import RegisterInformation from "./Register/Informations";
import RegisterPassword from "./Register/Password";
import styles from "../Authentification/Register/css/Register.module.css";

export default function AuthForm() {
  const methods = useForm();
  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const [step, setStep] = useState(1);
  const [recap, setRecap] = useState([]);

  const handleNextStep = (data) => {
    setRecap((prev) => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data) => {
    clearErrors();
    const finalData = { ...recap, ...data };
    console.log(finalData);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const isValidResponse = await ReponseError(response, setError);
      if (!isValidResponse) {
        return;
      }

      const responseData = await response.json();
      console.log("User registered successfully:", responseData);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during registration:", error);
      setError("global", { message: "Internal Server Error" });
    }
  };

  return (
    <div className="container">
       <h1 className="text-center text-dark pt-5">
            Inscription
        </h1> 
      <div className="text-center mb-4">
        <p>Cette page est sécurisée par un protocole SSL/TLS pour protéger vos informations.</p>
      </div>
      <div 
        id={styles.registernsk}
        className="row justify-content-center align-items-center mb-5 mt-4 rounded">
        {/* Section gauche (Titre et lien de connexion) */}
        <div className="col-12 col-md-3 mb-4 mt-4">
          <div className="container text-center">
            <h2>Créer un compte</h2>
            <p>
              Vous êtes déjà inscrit ? <a href="/login"><u>Connectez-vous</u></a>
            </p>
          </div>
        </div>
        
        {/* Section droite (Formulaire) */}
        <div className="col-12 col-md-8 d-flex justify-content-center">
          <div className="container">
            <FormProvider {...methods}>
              <form id="auth-form" onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && (
                  <>
                    <RegisterInformation onNext={handleNextStep} />
                    <div className="text-center">
                      <ButtonSubmit
                        type="button"
                        label="Suivant"
                        mode="secondary"
                        action={methods.handleSubmit(handleNextStep)}
                      />
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <RegisterPassword />
                    <div className="text-center d-flex justify-content-center gap-3">
                      <ButtonSubmit
                        type="button"
                        label="Précédent"
                        mode="primary"
                        action={handlePrevStep}
                      />
                      <ButtonSubmit
                        type="submit"
                        label="S'inscrire"
                        mode="secondary"
                      />
                    </div>
                  </>
                )}
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
