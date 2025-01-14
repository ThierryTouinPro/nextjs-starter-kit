import { getUserByEmail } from "@/dao/userDao";

export interface EmailCheckResult {
  available: boolean;
  message: string;
}

/**
 * Vérifie la disponibilité d'un email.
 * @param email L'email à vérifier.
 * @param t Fonction de traduction.
 * @returns Un objet contenant le statut et un message.
 */
export async function checkEmailAvailability(
  email: string,
  t: (key: string) => string
): Promise<EmailCheckResult> {
  if (!email || typeof email !== "string") {
    throw new Error(t("emailRequired"));
  }

  const user = getUserByEmail(email);

  console.log("User found with this email: ", user);

  if (user) {
    return {
      available: false,
      message: t("existUserError"),
    };
  }

  return {
    available: true,
    message: t("emailAvailable"),
  };
}
