import { deleteSession, verifySession } from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const sessionId = req.cookies.sessionId;
    console.log("SessionId : ", sessionId);
    if (sessionId) {
      const session = verifySession(sessionId);
      if (session) {
        console.log("Session valide.");
        return res.status(200).json({ isLoggedIn: true });
      } else {
        console.log("Session expirée.");
        return res.status(401).json({ isLoggedIn: false });
      }
    }
    console.log("Session ID missing.");
    return res.status(400).json({ error: "Session ID missing" });
  } else if (req.method === "POST") {
    // Déconnexion : supprimer la session
    /*const sessionId = req.cookies.sessionId;
    if (sessionId) {
      deleteSession(sessionId);
      // Supprimer le cookie en le définissant avec une date d'expiration passée
      res.setHeader(
        "Set-Cookie",
        "sessionId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict"
      );
      return res.status(200).json({ message: "Déconnexion réussie" });
    }
    return res.status(400).json({ error: "Session ID missing" });*/
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
