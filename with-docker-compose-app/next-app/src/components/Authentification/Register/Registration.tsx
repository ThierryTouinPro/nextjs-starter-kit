import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { ReponseError } from "../../../lib/reponse";
import ButtonSubmit from "../../Interface/ButtonSubmit";
import RegisterInformation from "./Informations";
import RegisterPassword from "./Password";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  phone?: string;
  gender?: string;
}

export default function Registration(): JSX.Element {
  const methods = useForm<FormData>({ mode: "onChange" });
  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const { t } = useTranslation(); // Initialiser le hook de traduction

  const [step, setStep] = useState(1);
  const [recap, setRecap] = useState<Partial<FormData>>({});
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);

  const [globalError, setGlobalError] = useState<string | null>(null);

  const handleNextStep = (data: Partial<FormData>) => {
    if (!isEmailAvailable) {
      setError("email", {
        type: "manual",
        message: t("existUserError"),
      });
      return; // Empêche de passer à l'étape suivante
    }

    setRecap((prev) => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const checkEmailExists = async (email) => {
    if (!email) return;

    try {
      const response = await fetch(`/api/auth/checkEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": i18next.language || "fr",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError("email", {
          type: "manual",
          message:
            errorData.error || "Erreur lors de la vérification de l'email",
        });
        setIsEmailAvailable(false); // L'email existe déjà
      } else {
        clearErrors("email");
        setIsEmailAvailable(true); // L'email est disponible
      }
    } catch (error) {
      setError("email", {
        type: "manual",
        message: "Erreur lors de la vérification de l'email",
      });
      setIsEmailAvailable(false);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    clearErrors();
    setGlobalError(null);
    const today = new Date();

    let formattedBirthDate: string;
    try {
      const birthDate = new Date(data.birthDate!);

      if (birthDate > today) {
        throw new Error("La date de naissance ne peut pas être dans le futur");
      }

      if (isNaN(birthDate.getTime())) {
        throw new Error("Invalid date");
      }
      formattedBirthDate = `${birthDate.getFullYear()}-${String(
        birthDate.getMonth() + 1
      ).padStart(2, "0")}-${String(birthDate.getDate()).padStart(2, "0")}`;
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

      const isValidResponse = await ReponseError(
        response,
        setGlobalError,
        setError
      );
      if (!isValidResponse) {
        return;
      }

      const responseData = await response.json();
      console.log("User registered successfully:", responseData);

      localStorage.setItem("currentLanguage", i18next.language);

      // Rediriger avec le paramètre de langue
      window.location.href = "/profile";
    } catch (error) {
      console.error("Error during registration:", error);
      setGlobalError("Internal Server Error");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form id="auth-form" onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <RegisterInformation onCheckEmail={checkEmailExists} />
              <div className="text-center">
                <ButtonSubmit
                  type="button"
                  label={t("button-next")}
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
                {globalError && (
                  <p className="error-message text-danger">{globalError}</p>
                )}
              </div>
              <div className="text-center d-flex justify-content-center gap-3">
                <ButtonSubmit
                  type="button"
                  label={t("button-previous")}
                  mode="primary"
                  action={handlePrevStep}
                />
                <ButtonSubmit
                  type="submit"
                  label={t("button-signup")}
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
