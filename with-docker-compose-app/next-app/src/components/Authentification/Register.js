import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ReponseError } from "../../lib/reponse";
import ButtonSubmit from "../Interface/ButtonSubmit";
import PersonalInfoForm from "./SignupForms/PersonalInfoForm";
import ChoosePwdForm from "./SignupForms/ChoosePwdForm";
import { Sidebar } from "./Sidebar/Sidebar";

export default function Register() {
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
      <div className="row d-flex flex-row justify-content-center align-items-center">
        {/* Sidebar Section */}
        <div
          className={
            "col-md-4 col-offset-2 col-xs-12 d-flex justify-content-center"
          }
        >
          <Sidebar currentStep={step} />
        </div>
        {/* Form Section */}
        <div className="col-md-8 col-xs-12d-flex justify-content-center">
          <FormProvider {...methods}>
            <form id="auth-form" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <img src="/images/auth-icon.png" alt="A lock icon" />
              </div>
              {step === 1 && (
                <>
                  <PersonalInfoForm onNext={handleNextStep} />
                  <div className="text-center">
                    <ButtonSubmit
                      type="button"
                      label="Suivant"
                      mode="secondary"
                      onClick={methods.handleSubmit(handleNextStep)}
                    />
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <ChoosePwdForm />
                  <div className="text-center">
                    <ButtonSubmit
                      type="button"
                      label="Précédent"
                      mode="secondary"
                      onClick={handlePrevStep}
                    />
                    <ButtonSubmit
                      type="submit"
                      label="S'inscrire"
                      mode="primary"
                    />
                  </div>
                </>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
