import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { processLogout } from "@/backend/services/auth/logoutService";
import logger from "@/config/winston";

export async function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    logger.warn(`Méthode ${req.method} non autorisée pour cette route`);
    return res.status(405).json({ error: "Method not allowed" });
  }

  logger.info("Requête reçue :", { method: req.method });

  // Récupérer le cookie de session
  const cookies = parse(req.headers.cookie || "");
  const sessionCookie = cookies.session;

  if (!sessionCookie) {
    logger.warn("Aucun cookie de session trouvé");
    return res.status(400).json({ error: "No session cookie found" });
  }

  try {
    const result = await processLogout(sessionCookie);

    if (!result.success) {
      logger.warn("Échec de la suppression de la session : " + result.error);
      return res.status(400).json({ error: result.error });
    }

    // Supprimer le cookie côté client
    res.setHeader("Set-Cookie", [
      "session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax;",
    ]);
    logger.info("Cookie de session supprimé côté client");

    return res.status(200).json({ message: "Successfully logged out" });
  } catch (error: any) {
    logger.error("Erreur lors du processus de déconnexion :", {
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
