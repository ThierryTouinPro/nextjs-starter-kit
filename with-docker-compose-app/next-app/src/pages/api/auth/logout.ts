import logger from "@/config/winston";
import { deleteSession } from "@/lib/db";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    logger.warn(`Méthode ${req.method} non autorisée pour cette route`);
    return res.status(405).json({ error: "Method not allowed" });
  }

  logger.info("Requête reçue :", { method: req.method, body: req.body });

  // Récupérer les cookies de la requête
  const cookies = parse(req.headers.cookie || "");
  const sessionCookie = cookies.session;

  if (!sessionCookie) {
    logger.warn("Aucun cookie de session trouvé");
    return res.status(400).json({ error: "No session cookie found" });
  }

  let session;
  try {
    // Parser le contenu du cookie
    session = JSON.parse(sessionCookie);
  } catch (error) {
    logger.error("Erreur lors du parsing du cookie de session :", error);
    return res.status(400).json({ error: "Invalid session cookie format" });
  }

  const { sessionId } = session;

  if (!sessionId) {
    logger.warn("Aucun ID de session trouvé dans le cookie");
    return res.status(400).json({ error: "No session ID found in cookie" });
  }

  try {
    // Supprimer la session côté backend
    deleteSession(sessionId);
    logger.info(`Session ${sessionId} supprimée avec succès`);

    // Supprimer les cookies côté client
    res.setHeader("Set-Cookie", [
      "session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax;",
    ]);
    logger.info("Supprimer les cookies côté client");
    console.log("Supprimer les cookies côté client");

    return res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    logger.error("Erreur lors de la suppression de la session :", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
