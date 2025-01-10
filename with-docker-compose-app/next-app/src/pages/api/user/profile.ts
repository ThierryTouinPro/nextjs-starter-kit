import { getUserProfile } from "@/dao/userDao";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionId = req.cookies.sessionId;

  console.log("Cookies:", req.cookies); // Affiche les cookies reçus
  console.log("Session ID from cookies:", sessionId); // Vérifie la présence du sessionId

  //const session = verifySession(sessionId);

  const cookies = parse(req.headers.cookie || "");
  const sessionCookie = cookies.session;

  if (!sessionCookie) {
    console.log("Session invalide ou expirée.", sessionId);
    return res.status(401).json({
      error: "Session invalide ou expirée. Veuillez vous reconnecter.",
    });
  }

  try {
    const session = JSON.parse(sessionCookie);
    const { sessionId, userId, expiresAt } = session;

    console.log("Session ID from session:", sessionId);

    if (Date.now() > expiresAt) {
      return res.status(401).json({ error: "Session invalide ou expirée." });
    }

    console.log("User ID from session:", userId);

    const user = getUserProfile(userId);

    console.log("Utilisateur trouvé :", user);

    if (!user) {
      console.error("User not found for session:", session.user_id);
      console.log("Utilisateur non trouvé.");
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    console.log("Utilisateur connecté :", user);

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error parsing session cookie:", error);
    res
      .status(500)
      .json({ error: "Erreur serveur, veuillez réessayer plus tard." });
  }
}
