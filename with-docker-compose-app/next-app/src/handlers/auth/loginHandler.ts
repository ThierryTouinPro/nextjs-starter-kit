import { NextApiRequest, NextApiResponse } from "next";
import {
  verifyUserCredentials,
  createUserSession,
} from "@/services/auth/loginService";
import logger from "@/config/winston";
import { serialize } from "cookie";

// Simuler un système de traduction
const translations = {
  common: {
    invalidCredentials: {
      en: "Invalid credentials",
      fr: "Identifiants invalides",
    },
  },
};

/**
 * Fonction de traduction.
 */
const t = (key: string, lang: string): string =>
  translations.common[key]?.[lang] || key;

/**
 * Handler pour la connexion utilisateur.
 */
export async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  const lang =
    req.headers["accept-language"]?.split(",")[0].split("-")[0] ||
    req.body.lang ||
    "fr"; // Langue par défaut : français

  console.log("Langue détectée :", lang);

  if (req.method !== "POST") {
    logger.warn(`Méthode ${req.method} non autorisée`);
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  logger.info("Requête reçue :", { method: req.method, body: req.body });
  console.log("Requête reçue :", { method: req.method, body: req.body });

  // Vérification des champs
  if (!email?.trim() || !password?.trim()) {
    logger.warn("Tentative de connexion avec email ou mot de passe vide");
    return res
      .status(400)
      .json({ error: "L'email et le mot de passe sont requis" });
  }

  try {
    const user = verifyUserCredentials(email, password, lang);
    if (!user) {
      logger.warn(`Identifiants invalides pour l'email : ${email}`);
      return res.status(401).json({ error: t("invalidCredentials", lang) });
    }

    // Crée une session pour cet utilisateur
    const { sessionId, expiresAt } = createUserSession(user.id);

    const sessionCookie = serialize(
      "session",
      JSON.stringify({ sessionId, userId: user.id, expiresAt }),
      {
        httpOnly: true,
        maxAge: 24 * 60 * 60, //24 heures
        path: "/",
        sameSite: "lax",
      }
    );

    res.setHeader("Set-Cookie", sessionCookie);

    logger.info(`Connexion réussie pour l'utilisateur : ${email}`);
    console.log(`Connexion réussie pour l'utilisateur : ${email}`);
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
        phone: user.phone,
        gender: user.gender,
      },
      expiresAt,
    });
  } catch (error: any) {
    logger.error(
      `Erreur lors du traitement de la connexion : ${error.message}`
    );
    return res
      .status(500)
      .json({ error: "Erreur serveur, veuillez réessayer plus tard." });
  }
}
