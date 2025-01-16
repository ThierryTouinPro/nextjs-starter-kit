import { checkEmailAvailability } from "@/backend/services/auth/checkEmailService";
import { NextApiRequest, NextApiResponse } from "next";

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

export async function emailHandler(req: NextApiRequest, res: NextApiResponse) {
  const lang =
    req.headers["accept-language"]?.split(",")[0].split("-")[0] ||
    req.body.lang ||
    "fr"; // Langue par défaut : français

  console.log("Langue détectée :", lang);

  if (req.method !== "POST") {
    return res.status(405).json({ message: t("methodNotAllowed", lang) });
  }

  try {
    const { email } = req.body;
    console.log(email);
    const result = await checkEmailAvailability(email, (key) => t(key, lang));

    console.log("Résultat de la vérification :", result);

    if (!result.available) {
      return res.status(400).json({ error: t("existUserError", lang) });
    }
    return res.status(200).json({ message: t("emailAvailable", lang) });
  } catch (error: any) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: t("internalServerError", lang) });
  }
}
