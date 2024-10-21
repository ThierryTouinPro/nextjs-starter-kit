import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ReponseError } from "../../../lib/reponse";
import ButtonSubmit from "../../Interface/ButtonSubmit";
import RegisterInformation from "../../../components/Authentification/Register/Informations";
import RegisterPassword from "../../../components/Authentification/Register/Password";

export default function Registration() {
  const methods = useForm();
  const {
    handleSubmit,
    setError,
    clearErrors,
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
    <>
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
    </>
  );
}
