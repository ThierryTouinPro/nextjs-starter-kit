import db from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    const existingUser = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email);
    if (existingUser) {
      return res.status(400).json({ error: "L'utilisateur existe déjà" });
    }
    return res.status(200).json({ message: "Email disponible" });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}