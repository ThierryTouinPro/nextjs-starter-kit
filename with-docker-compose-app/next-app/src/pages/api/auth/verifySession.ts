import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const sessionId = req.cookies.sessionId;
    console.log("SessionId : ", sessionId);

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
      if (!session) {
        console.log("Session ID missing.");
        return res.status(400).json({ error: "Session ID missing" });
      }
      const { sessionId, userId, expiresAt } = session;

      console.log("Session ID from session:", sessionId);

      if (Date.now() > expiresAt) {
        return res.status(401).json({ error: "Session invalide ou expirée." });
      }

      console.log("User ID from session:", userId);

      if (sessionId) {
        console.log("Session valide: ", session);
        return res.status(200).json({ isLoggedIn: true });
      } else {
        console.log("Session expirée.");
        return res.status(401).json({ isLoggedIn: false });
      }
    } catch (error) {
      console.error("Error parsing session cookie:", error);
      res
        .status(500)
        .json({ error: "Erreur serveur, veuillez réessayer plus tard." });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
