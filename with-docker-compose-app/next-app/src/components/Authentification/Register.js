import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import ButtonSubmit from "../Interface/ButtonSubmit";
import Input from "../Interface/Input";
import RadioGroup from "../Interface/RadioGroup";
import BirthDate from "../Interface/BirthDate";

export default function Register() {
  const methods = useForm();
  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = methods;
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const options = [
    { value: "Mr", label: "Monsieur" },
    { value: "Mme", label: "Madame" },
  ];

  const onSubmit = async (data) => {
    clearErrors();
    // Log des données du formulaire
    console.log(data);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const isValidResponse = await ReponseError(response, setErrors);
      if (!isValidResponse) {
        return; // Arrêter l'exécution si une erreur s'est produite
      }

      const data = await response.json();
      console.log('User registered successfully:', data);
      // Rediriger l'utilisateur après l'inscription
      window.location.href = '/login';
    } catch (error) {
      console.error("Error during registration:", error);
      setError("global", { message: "Internal Server Error" });
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <FormProvider {...methods}>
          <form id="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <img src="/images/auth-icon.png" alt="A lock icon" />
            </div>
            <RadioGroup name="gender" options={options} />
            <Input
              name="firstName"
              label="Prénom"
              type="text"
              placeholder="Prénom"
            />
            <Input name="lastName" label="Nom" type="text" placeholder="Nom" />
            <BirthDate name="dateDeNaissance" placeholder="31/12/1990" />
            <Input
              name="phone"
              label="Numéro Téléphone"
              type="tel"
              placeholder="+33 7 22 33 44 55"
            />
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              validations={{
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email invalide",
                },
              }}
            />
            <Input
              name="password"
              label="Mot de passe"
              type="password"
              placeholder="Mot de passe"
              validations={{
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
                },
              }}
            />
            <Input
              name="confirmPassword"
              label="Confirmation du mot de passe"
              type="password"
              placeholder="Confirmer le mot de passe"
              validations={{
                validate: (value) =>
                  value === password ||
                  "Les mots de passe ne correspondent pas",
              }}
            />
            <div className="text-center">
              <p className="my-4">
                {errors.global && (
                  <span className="error-message">{errors.global.message}</span>
                )}
              </p>
              <ButtonSubmit type="submit" label="S'inscrire" mode="secondary" />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
