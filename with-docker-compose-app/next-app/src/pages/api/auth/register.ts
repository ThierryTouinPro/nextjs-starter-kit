import db, { createSession } from "../../../lib/db";
import bcrypt from "bcryptjs";
import logger from "../../../config/winston";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password, firstName, lastName, phone, birthDate, gender } =
      req.body;

    logger.info("Requête reçue :", { method: req.method, body: req.body });
    console.log("Requête reçue :", { method: req.method, body: req.body });

    // Vérification des champs
    if (
      !email?.trim() ||
      !password?.trim() ||
      !firstName?.trim() ||
      !lastName?.trim() ||
      !phone?.trim() ||
      !birthDate?.trim() ||
      !gender?.trim()
    ) {
      logger.warn("Tentative d'enregistrement avec un champ vide");
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = db
        .prepare("SELECT * FROM users WHERE email = ?")
        .get(email);
      logger.info(
        "Vérification de l'utilisateur existant dans la base de données pour l'email :",
        email
      );
      console.log("Vérification de l'utilisateur existant :", email);
      console.log("Utilisateur trouvé :", existingUser);

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

      // Vérifier et formater la date de naissance
      const birthDateObj = new Date(birthDate);
      if (isNaN(birthDateObj.getTime())) {
        return res.status(400).json({ error: "Date de naissance invalide" });
      }
      const formattedBirthDate = `${birthDateObj.getFullYear()}-${String(
        birthDateObj.getMonth() + 1
      ).padStart(2, "0")}-${String(birthDateObj.getDate()).padStart(2, "0")}`;

      // Insérer l'utilisateur dans la base de données
      logger.info(
        "Insertion de l'utilisateur dans la base de données avec les données :",
        { email, firstName, lastName, phone, birthDate, gender }
      );
      console.log("Insertion de l'utilisateur :", {
        email,
        firstName,
        lastName,
        phone,
        birthDate,
        gender,
      });

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
        formattedBirthDate,
        gender
      );

      logger.info(
        "Utilisateur inséré avec succès, création de la session pour l'utilisateur :",
        result.lastInsertRowid
      );
      console.log(
        "Utilisateur inséré, session créée :",
        result.lastInsertRowid
      );

      // Créer automatiquement une session pour l'utilisateur
      const { sessionId, expiresAt } = createSession(result.lastInsertRowid);

      // Définir un cookie avec l'identifiant de la session
      res.setHeader(
        "Set-Cookie",
        `sessionId=${sessionId}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`
      );

      const responsePayload = {
        message: "User registered successfully",
        expiresAt,
      };
      logger.info("Données envoyées au client :", responsePayload);
      console.log("Données envoyées au client :", responsePayload);
      return res.status(201).json(responsePayload);

      /*logger.info(`Nouvel utilisateur enregistré avec succès : ${email}`);
      return res
        .status(201)
        .json({ message: "User registered successfully", expiresAt });*/
    } catch (error) {
      logger.error("Erreur lors de l'enregistrement de l'utilisateur :", {
        message: error.message,
        stack: error.stack,
      });
      console.log(
        "Erreur lors de l'enregistrement :",
        error.message,
        error.stack
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
