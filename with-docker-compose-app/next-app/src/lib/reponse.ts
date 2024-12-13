import { Path, UseFormSetError } from "react-hook-form";

interface ErrorData {
  error?: string;
  errors?: { [key: string]: string }; // Pour gérer des erreurs spécifiques aux champs
}

interface ErrorState {
  global: string;
}

export async function ReponseError<FormData>(
  response: Response,
  setGlobalError: (errorMessage: string | null) => void,
  setFieldError?: UseFormSetError<FormData>
): Promise<boolean> {
  if (!response.ok) {
    let errorMessage = "An error occurred";

    try {
      const errorData: ErrorData = await response.json();

      if (errorData.errors && setFieldError) {
        // Gestion des erreurs spécifiques aux champs
        Object.keys(errorData.errors).forEach((field) => {
          setFieldError(field as Path<FormData>, {
            type: "manual",
            message: errorData.errors[field],
          });
        });
      }

      if (response.status === 400) {
        errorMessage =
          errorData.error ||
          "Données invalides ou manquantes, veuillez vérifier vos informations.";
      } else if (response.status === 401) {
        errorMessage = errorData.error || "Accès non autorisé.";
      } else if (response.status === 500) {
        errorMessage = "Erreur serveur, veuillez réessayer plus tard.";
      } else {
        errorMessage = errorData.error || "Une erreur est survenue.";
      }
    } catch (e) {
      console.error("Error parsing JSON response:", e);
      errorMessage = "Une erreur inattendue est survenue. Veuillez réessayer.";
    }

    setGlobalError(errorMessage); // Gestion des erreurs globales
    return false; // Indique qu'une erreur s'est produite
  }

  return true; // Indique que la réponse est correcte
}
