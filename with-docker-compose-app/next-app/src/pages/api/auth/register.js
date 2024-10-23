import db, { createSession } from "../../../lib/db";
import bcrypt from "bcryptjs";
const logger = require("../../../config/winston"); // Assurez-vous que c'est le bon chemin

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, firstName, lastName, phone, birthDate, gender } =
      req.body; // Ajout des champs supplémentaires

    // Vérification des champs
    if (!email?.trim() || !password?.trim()) {
      logger.warn("Tentative d'enregistrement avec email ou mot de passe vide");
      return res.status(400).json({
        errors: {
          email: "L'email est requis",
          password: "Le mot de passe est requis",
        },
      });
    }

    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = db
        .prepare("SELECT * FROM users WHERE email = ?")
        .get(email);
      if (existingUser) {
        logger.warn(
          `Tentative d'enregistrement avec un email déjà utilisé : ${email}`
        );
        return res
          .status(400)
          .json({ errors: { email: "L'utilisateur existe déjà" } });
      }

      // Hachage du mot de passe
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Insérer l'utilisateur dans la base de données
      const insertUserStmt = db.prepare(`
        INSERT INTO users (email, password, firstname, lastname, phone, birthdate, gender) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      const result = insertUserStmt.run(
        email,
        hashedPassword,
        firstName,
        lastName,
        phone,
        birthDate,
        gender
      );

      // Créer automatiquement une session pour l'utilisateur
      const { sessionId, expiresAt } = createSession(result.lastInsertRowid);

      // Définir un cookie avec l'identifiant de la session
      res.setHeader(
        "Set-Cookie",
        `sessionId=${sessionId}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`
      );

      logger.info(`Nouvel utilisateur enregistré avec succès : ${email}`);
      return res
        .status(201)
        .json({ message: "User registered successfully", expiresAt });
    } catch (error) {
      logger.error(
        `Erreur lors de l'enregistrement de l'utilisateur : ${error.message}`
      );
      return res
        .status(500)
        .json({ errors: { global: "Erreur serveur interne" } });
    }
  } else {
    logger.warn(`Méthode ${req.method} non autorisée pour cette route`);
    return res.status(405).json({ message: "Method not allowed" });
  }
}
