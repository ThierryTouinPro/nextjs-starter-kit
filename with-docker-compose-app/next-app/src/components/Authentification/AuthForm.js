import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ReponseError } from "../../lib/reponse";
import ButtonSubmit from "../Interface/ButtonSubmit";
import RegisterInformation from "./Register/Informations";
import RegisterPassword from "./Register/Password";
import styles from "../Authentification/Register/css/Register.module.css";
import { Sidebar } from "./Register/Sidebar";

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
    // Log des données du formulaire
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
        return; // Arrêter l'exécution si une erreur s'est produite
      }

      const responseData = await response.json();
      console.log("User registered successfully:", responseData);
      // Rediriger l'utilisateur après l'inscription
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during registration:", error);
      setError("global", { message: "Internal Server Error" });
    }
  };

  return (
    <div className="container">
      <div 
        id={styles.registernsk}
        className="row d-flex flex-row justify-content-center align-items-center mb-5 mt-4 rounded"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        {/* Form Section */}
        <div className="col-12 d-flex justify-content-center">
          {/* Sidebar Section */}
          <div className="container">
            <div className="col-12">
              <Sidebar currentStep={step} />
            </div>
            <div className="col-12">
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
    </div>
  );
}
