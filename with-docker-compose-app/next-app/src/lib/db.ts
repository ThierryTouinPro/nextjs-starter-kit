import path from "path";
import fs from "fs";
import Database from "better-sqlite3";
import { v4 as uuidv4 } from "uuid";
import { User } from "lucia";

// Définir le chemin pour les fichiers de log
const logDirectory =
  process.env.NODE_ENV === "production"
    ? "/tmp" // Utilisation de /tmp en production
    : path.join(process.cwd(), ""); // Chemin local en développement

// Vérifier si le répertoire existe, sinon le créer
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
  console.log(`Répertoire créé : ${logDirectory}`);
}

// Définir le chemin pour la base de données
const dbPath = path.join(logDirectory, "main.db");

// Vérifier si le fichier existe en production et copier un modèle si nécessaire
if (process.env.NODE_ENV === "production" && !fs.existsSync(dbPath)) {
  const templateDbPath = path.join(process.cwd(), "main.db"); // Chemin du modèle de base
  if (fs.existsSync(templateDbPath)) {
    fs.copyFileSync(templateDbPath, dbPath);
    console.log("Base de données copiée dans le répertoire de production.");
  } else {
    console.error("Modèle de base de données introuvable.");
  }
}

// Créer une instance de la base de données
const db = new Database(dbPath);

try {
  // Création des tables si elles n'existent pas déjà
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      firstName TEXT,
      lastName TEXT,
      birthDate DATE,
      phone TEXT,
      gender TEXT
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT NOT NULL PRIMARY KEY,
      expires_at INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);
} catch (error) {
  console.error("Error setting up the database:", error);
}

// Types
interface Session {
  id: string;
  expires_at: number;
  user_id: number;
}

// Fonction pour créer une nouvelle session
export const createSession = (
  userId: number
): { sessionId: string; expiresAt: number } | null => {
  if (!userId) {
    throw new Error("userId is required to create a session.");
  }

  const sessionId = uuidv4(); // Génère un identifiant unique pour la session
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24; // Session valide pendant 24h

  try {
    const stmt = db.prepare(`
      INSERT INTO sessions (id, expires_at, user_id) 
      VALUES (?, ?, ?)
    `); // Éxécute la requête SQL avec les paramètres passés

    const result = stmt.run(sessionId, expiresAt, userId);

    if (result.changes === 0) {
      throw new Error("No session was created. Check the userId.");
    }

    return { sessionId, expiresAt };
  } catch (error) {
    console.error("Error creating session:", error);
    return null;
  }
};

// Fonction pour vérifier une session
export const verifySession = (sessionId: string): Session | null => {
  try {
    const stmt = db.prepare(`
      SELECT * FROM sessions WHERE id = ? AND expires_at > ?
    `);
    const session = stmt.get(sessionId, Date.now()) as Session | undefined;

    if (session) {
      return session;
    } else {
      // Supprime la session expirée si trouvée
      deleteSession(sessionId);
      return null;
    }
  } catch (error) {
    console.error("Error verifying session:", error);
    return null;
  }
};

// Fonction pour supprimer une session (déconnexion)
export const deleteSession = (sessionId: string): void => {
  try {
    const stmt = db.prepare(`
      DELETE FROM sessions WHERE id = ?
    `);
    stmt.run(sessionId);
  } catch (error) {
    console.error("Error deleting session:", error);
  }
};

// Fonction pour supprimer les sessions expirées
export const cleanupExpiredSessions = (): void => {
  try {
    const stmt = db.prepare(`
      DELETE FROM sessions WHERE expires_at <= ?
    `);
    stmt.run(Date.now());
  } catch (error) {
    console.error("Error cleaning up expired sessions:", error);
  }
};

export function getUserProfile(userId: number): User | null {
  try {
    const stmt = db.prepare(`
      SELECT * FROM users WHERE id = ?
    `);
    const user = stmt.get(userId) as User | undefined;

    if (user) {
      console.log(`User trouvé : ${user}`);
      return user;
    } else {
      console.log(`User non trouvé`);
      return null;
    }
  } catch (error) {
    console.error("Error finding user profile: ", error);
    return null;
  }
}

export default db;
