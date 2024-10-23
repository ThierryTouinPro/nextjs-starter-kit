import { ReponseError } from "../../../lib/reponse";
import ButtonSubmit from "../../../components/Interface/ButtonSubmit";
import Input from "../../Interface/Input";
import { FormProvider, useForm } from "react-hook-form";

// Import Material-UI icons
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

export default function Connexion() {

  const methods = useForm();
  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    clearErrors();
    console.log(data);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const isValidResponse = await ReponseError(response, setError);
      if (!isValidResponse) {
        const errorData = await response.json();
        Object.keys(errorData.errors).forEach((key) => {
          setError(key, { type: "manual", message: errorData.errors[key] });
        });
        setError("global", { message: errorData.error || "An error occurred" });
        return; // Arrêter l'exécution si une erreur s'est produite
      }
      const responseData = await response.json();
      console.log("User logged in successfully:", responseData);
      window.location.href = "/connected";
    } catch (error) {
      console.error("Error during login:", error);
      setError("global", { message: "Internal Server Error" });
    }
  };
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
      <FormProvider {...methods}>
        <form id="auth-form" onSubmit={handleSubmit(onSubmit)}>
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
            icon={<EmailIcon />}
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
            icon={<LockIcon />}
          />
          <div className="text-center">
            {errors.global && (
              <p className="error-message text-danger">
                {errors.global.message}
              </p>
            )}
            <ButtonSubmit type="submit" label="Se connecter" mode="secondary" />
          </div>
        </form>
      </FormProvider>
      </div>
    </div>
  );
}