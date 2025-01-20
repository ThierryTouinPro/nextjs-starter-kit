import { validateSession } from "@/backend/services/auth/verifySessionService";
import logger from "@/config/winston";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export async function verifySessionHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    logger.warn(`Méthode ${req.method} non autorisée pour cette route`);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    // Extraction des cookies
    const cookies = parse(req.headers.cookie || "");
    const sessionCookie = cookies.session;

    if (!sessionCookie) {
      logger.info("Session cookie absent ou invalide");
      return res.status(401).json({
        error: "Session invalide ou expirée. Veuillez vous reconnecter.",
      });
    }

    // Validation de la session via le service
    const sessionValidationResult = validateSession(sessionCookie);

    if (!sessionValidationResult.isValid) {
      logger.info("Session invalide ou expirée.");
      return res.status(401).json({ error: sessionValidationResult.error });
    }

    logger.info("Session valide:", sessionValidationResult.session);
    return res.status(200).json({ isLoggedIn: true });
  } catch (error: any) {
    logger.error("Erreur lors de la validation de la session:", {
      message: error.message,
      stack: error.stack,
    });
    return res
      .status(500)
      .json({ error: "Erreur serveur, veuillez réessayer plus tard." });
  }
}
