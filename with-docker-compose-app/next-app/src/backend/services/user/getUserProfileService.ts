import { getUserProfile } from "@/backend/dao/userDao";
import logger from "@/config/winston";
import { parse } from "cookie";

function formatDate(date) {
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export async function getUserProfileService(cookieHeader: string) {
  logger.info("Validation des cookies pour la session utilisateur");

  const cookies = parse(cookieHeader || "");
  const sessionCookie = cookies.session;

  if (!sessionCookie) {
    logger.warn("Session invalide ou expirée");
    throw {
      status: 401,
      message: "Session invalide ou expirée. Veuillez vous reconnecter.",
    };
  }

  try {
    const session = JSON.parse(sessionCookie);
    const { userId, expiresAt } = session;

    logger.info("Session déchiffrée :", { session });

    if (Date.now() > expiresAt) {
      logger.warn("Session expirée pour l'utilisateur :", { userId });
      throw { status: 401, message: "Session invalide ou expirée." };
    }

    logger.info("Récupération du profil utilisateur pour l'ID :", { userId });

    const user = await getUserProfile(userId);

    if (!user) {
      logger.warn("Utilisateur non trouvé :", { userId });
      throw { status: 404, message: "Utilisateur non trouvé." };
    }

    logger.info("birthDate :", user.birthDate);

    // Formater la date de naissance
    if (user.birthDate) {
      user.birthDate = formatDate(new Date(user.birthDate));
    }

    return user;
  } catch (error) {
    logger.error(
      "Erreur lors de la validation de la session ou récupération du profil :",
      error
    );
    throw {
      status: 500,
      message: "Erreur serveur, veuillez réessayer plus tard.",
    };
  }
}
