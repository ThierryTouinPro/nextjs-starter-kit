import logger from "@/config/winston";
import db, { createSession } from "@/lib/db";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Simuler un système de traduction
  const translations = {
    common: {
      invalidCredentials: {
        en: "Invalid credentials",
        fr: "Identifiants invalides",
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
      // Recherche de l'utilisateur dans la base de données
      const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

      if (!user) {
        logger.warn(`Utilisateur non trouvé avec l'email : ${email}`);
        console.log(`Utilisateur non trouvé avec l'email : ${email}`);
        return res.status(401).json({ error: t("invalidCredentials", lang) });
      }

      logger.warn(`Utilisateur trouvé avec l'email : ${email}`);
      console.log(`Utilisateur trouvé avec l'email : ${email}`);

      // Vérification du mot de passe
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        logger.warn(`Mot de passe incorrect pour l'email : ${email}`);
        console.log(`Mot de passe incorrect pour l'email : ${email}`);
        return res.status(401).json({ error: t("invalidCredentials", lang) });
      }

      // Crée une session pour cet utilisateur
      const { sessionId, expiresAt } = createSession(user.id);

      // Définit un cookie avec l'identifiant de la session
      /*res.setHeader(
        "Set-Cookie",
        `sessionId=${sessionId}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`
      );*/

      const userId = user.id;

      const sessionCookie = serialize(
        "session",
        JSON.stringify({ sessionId, userId, expiresAt }),
        {
          httpOnly: true,
          maxAge: 24 * 60 * 60, // 24 heures
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
    } catch (error) {
      logger.error(
        `Erreur lors du traitement de la requête de connexion : ${error.message}`
      );
      return res
        .status(500)
        .json({ error: "Erreur serveur, veuillez réessayer plus tard." });
    }
  } else {
    logger.warn(`Méthode ${req.method} non autorisée pour cette route`);
    console.log(`Méthode ${req.method} non autorisée pour cette route`);
    return res.status(405).json({ message: "Method not allowed" });
  }
}
