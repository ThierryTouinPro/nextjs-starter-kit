import { NextApiRequest, NextApiResponse } from "next";
import { verifySession } from "@/lib/db";
import { getUserProfile } from "@/lib/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionId = req.cookies.sessionId;

  console.log("Cookies:", req.cookies); // Affiche les cookies reçus
  console.log("Session ID from cookies:", sessionId); // Vérifie la présence du sessionId

  const session = verifySession(sessionId);

  if (!session) {
    console.log("Session invalide ou expirée.", sessionId);
    return res.status(401).json({
      error: "Session invalide ou expirée. Veuillez vous reconnecter.",
    });
  }

  const userId = session.user_id;
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
}
