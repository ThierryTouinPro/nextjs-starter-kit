import ButtonSubmit from "../../../components/Interface/ButtonSubmit";
import Input from "../../Interface/Input";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useClientTranslation } from "../../../../utils/useClientTranslation";
import { useState } from "react";
import { ReponseError } from "lib/reponse";
import i18next from "i18next";
import { useRouter } from "next/router";

interface FormData {
  email: string;
  password: string;
}

export default function Connexion(): JSX.Element {
  const { t, isClient } = useClientTranslation("common"); // Utilisez le hook avec le namespace 'common'

  const [globalError, setGlobalError] = useState<string | null>(null);

  const methods = useForm<FormData>();
  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const router = useRouter();

  // Détermine le préfixe en fonction de la langue
  const getLanguagePrefix = () => {
    if (router.pathname.startsWith("/en")) {
      return "/en";
    }
    // Retourne "/" pour toutes les autres langues (par défaut, Français)
    return "";
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    clearErrors(); // Efface les erreurs précédentes
    setGlobalError(null);
    console.log(data);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": i18next.language || "fr",
        },
        body: JSON.stringify(data),
      });

      const isValidResponse = await ReponseError(
        response,
        setGlobalError,
        setError
      );
      if (!isValidResponse) {
        return;
      }

      // Si la réponse est correcte (statut 200)
      const responseData = await response.json();
      console.log("User logged in successfully:", responseData);

      localStorage.setItem("currentLanguage", i18next.language);

      router.push(getLanguagePrefix() + "/profile");
    } catch (error) {
      console.error("Error during login:", error);
      setGlobalError(error || "Erreur serveur, veuillez réessayer plus tard.");
    }
  };

  if (!isClient) {
    // Rendu d'un indicateur de chargement ou un élément temporaire pour éviter le rendu côté serveur
    return null;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <FormProvider {...methods}>
          <form id="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="email"
              label={t("register-email")}
              type="email"
              placeholder="Email"
              validations={{
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: t("pattern-email"),
                },
              }}
              icon={<EmailIcon />}
            />
            <Input
              name="password"
              label={t("register-mdp")}
              type="password"
              placeholder="Mot de passe"
              validations={{
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: t("min-password"),
                },
              }}
              icon={<LockIcon />}
            />
            <div className="text-center">
              {globalError && (
                <p className="error-message text-danger">{globalError}</p>
              )}
              <ButtonSubmit
                type="submit"
                label={t("button-login")}
                mode="secondary"
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
