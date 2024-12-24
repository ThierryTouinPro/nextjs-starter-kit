import { verifySession } from "@/lib/db";
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
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
