import { NextApiRequest, NextApiResponse } from "next";
import { deleteSession } from "lib/db";
import logger from "config/winston";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    logger.warn(`Méthode ${req.method} non autorisée pour cette route`);
    return res.status(405).json({ error: "Method not allowed" });
  }

  logger.info("Requête reçue :", { method: req.method, body: req.body });
  console.log("Requête reçue :", { method: req.method, body: req.body });

  // Récupérer l'ID de session à partir des cookies
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    logger.info("No session ID found in cookies");
    console.log("No session ID found in cookies");
    return res.status(400).json({ error: "No session ID found in cookies" });
  }

  try {
    // Supprimer la session
    deleteSession(sessionId);
    logger.info("Supprimer la session");
    console.log("Supprimer la session");

    // Supprimer le cookie côté client
    res.setHeader("Set-Cookie", "sessionId=; Path=/; Max-Age=0; HttpOnly;");
    logger.info("Supprimer le cookie côté client");
    console.log("Supprimer le cookie côté client");

    return res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
