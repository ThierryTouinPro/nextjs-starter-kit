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
    const today = new Date();

    let formattedBirthDate;
    try {
      const birthDate = new Date(data.birthDate);

      if (birthDate > today) {
        throw new Error("La date de naissance ne peut pas être dans le futur");
      }

      if (isNaN(birthDate.getTime())) {
        throw new Error("Invalid date");
      }
      formattedBirthDate = birthDate.toISOString().split("T")[0]; // Formate la date en YYYY-MM-DD
    } catch (error) {
      setError("birthDate", { type: "manual", message: "Invalid birth date" });
      return;
    }

    const finalData = {
      ...recap,
      ...data,
      birthDate: formattedBirthDate,
    };
    console.log(finalData);
    console.log("Formatted Birth Date: ", formattedBirthDate);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      const isValidResponse = await ReponseError(response, setError);
      if (!isValidResponse) {
        const errorData = await response.json();
        // Utilisation correcte de Object.keys pour itérer sur les erreurs
        Object.keys(errorData.errors).forEach((key) => {
          setError(key, { type: "manual", message: errorData.errors[key] });
        });
        // Cette ligne affiche l'erreur globale, si elle existe
        setError("global", {
          message: errorData.error || "Une erreur s'est produite",
        });
        return;
      }

      const responseData = await response.json();
      console.log("User registered successfully:", responseData);
      window.location.href = "/auth/connexion";
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
              <div className="text-center d-flex justify-content-center">
                {errors.email && (
                  <p className="error-message text-danger">
                    {errors.email.message}
                  </p>
                )}
                {errors.global && (
                  <p className="error-message text-danger">
                    {console.log(errors.global.message)}
                    {errors.global.message}
                  </p>
                )}
              </div>
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
