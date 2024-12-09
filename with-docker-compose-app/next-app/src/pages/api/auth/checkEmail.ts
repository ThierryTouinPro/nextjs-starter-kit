import db from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Simuler un système de traduction
  const translations = {
    common: {
      existUserError: {
        en: "This email is already in use.",
        fr: "Cet email est déjà utilisé.",
      },
      methodNotAllowed: {
        en: "Method not allowed.",
        fr: "Méthode non autorisée.",
      },
      emailRequired: {
        en: "Email is required and must be a string.",
        fr: "L'email est requis et doit être une chaîne de caractères.",
      },
      internalServerError: {
        en: "Internal Server Error.",
        fr: "Erreur interne du serveur.",
      },
      emailAvailable: {
        en: "Email is available.",
        fr: "Email disponible.",
      },
    },
  };

  // Fonction pour gérer la traduction
  const t = (key: string, lang: string) =>
    translations.common[key]?.[lang] || key;

  // Récupérer la langue à partir des headers (par défaut : français)
  const lang =
    req.headers["accept-language"]?.split(",")[0].split("-")[0] ||
    req.body.lang ||
    "fr"; // Langue par défaut : français

  console.log("Langue détectée :", lang);

  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: t("emailRequired", lang) });
    }

    try {
      // Vérifier l'existence de l'utilisateur dans la base de données
      const existingUser = db
        .prepare("SELECT * FROM users WHERE email = ?")
        .get(email);

      if (existingUser) {
        return res.status(400).json({ error: t("existUserError", lang) });
      }

      return res.status(200).json({ message: t("emailAvailable", lang) });
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: t("internalServerError", lang) });
    }
  } else {
    return res.status(405).json({ message: t("methodNotAllowed", lang) });
  }
}
