import db from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Email is required and must be a string." });
    }

    try {
      const existingUser = db
        .prepare("SELECT * FROM users WHERE email = ?")
        .get(email);

      if (existingUser) {
        return res.status(400).json({ error: "L'utilisateur existe déjà" });
      }

      return res.status(200).json({ message: "Email disponible" });
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
