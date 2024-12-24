import setLogLevel from "@/config/logLevelController"; // Importer la fonction externe
import { NextApiRequest, NextApiResponse } from "next"; // Pour les API Next.js

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === "POST") {
    const { level } = req.body;

    // Vérifier que 'level' est une chaîne de caractères
    if (typeof level !== "string") {
      res
        .status(400)
        .json({
          message: "Le niveau de log doit être une chaîne de caractères.",
        });
      return;
    }

    // Modifier dynamiquement le niveau de log
    setLogLevel(level);

    res.status(200).json({ message: `Niveau de log modifié à : ${level}` });
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
