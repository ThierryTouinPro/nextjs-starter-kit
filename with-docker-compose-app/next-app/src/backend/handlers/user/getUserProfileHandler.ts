import { getUserProfileService } from "@/backend/services/user/getUserProfileService";
import logger from "@/config/winston";
import { NextApiRequest, NextApiResponse } from "next";

export async function getUserProfileHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    logger.warn(`Méthode ${req.method} non autorisée pour cette route`);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  logger.info("Requête reçue pour le profil utilisateur", {
    method: req.method,
  });

  try {
    const sessionCookie = req.headers.cookie || "";
    logger.info("Cookies reçus :", { cookie: sessionCookie });

    const userProfile = await getUserProfileService(sessionCookie);

    if (
      !userProfile.firstName ||
      !userProfile.lastName ||
      !userProfile.birthDate
    ) {
      logger.warn("Incomplete user data returned:", { userProfile });
    }

    logger.info("Utilisateur connecté :", { user: userProfile });
    return res.status(200).json(userProfile);
  } catch (error: any) {
    logger.error("Erreur lors de la récupération du profil utilisateur :", {
      message: error.message,
      stack: error.stack,
    });
    return res.status(error.status || 500).json({ error: error.message });
  }
}
