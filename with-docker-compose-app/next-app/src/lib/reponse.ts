interface ErrorData {
  error?: string;
}

interface ErrorState {
  global: string;
}

export async function ReponseError(
  response: Response,
  setErrors: (errors: ErrorState) => void
): Promise<boolean> {
  if (!response.ok) {
    let errorMessage = 'An error occurred';

    try {
      const errorData: ErrorData = await response.json();

      if (response.status === 400) {
        errorMessage =
          errorData.error ||
          'Données invalides ou manquantes, veuillez vérifier vos informations.';
      } else if (response.status === 401) {
        errorMessage = errorData.error || 'Accès non autorisé.';
      } else if (response.status === 500) {
        errorMessage = 'Erreur serveur, veuillez réessayer plus tard.';
      } else {
        errorMessage = errorData.error || 'Une erreur est survenue.';
      }
    } catch (e) {
      console.error('Error parsing JSON response:', e);
      errorMessage = 'Une erreur inattendue est survenue. Veuillez réessayer.';
    }

    setErrors({ global: errorMessage });
    return false; // Indique qu'une erreur s'est produite
  }

  return true; // Indique que la réponse est correcte
}
