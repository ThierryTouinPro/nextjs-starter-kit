import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import postgres from "postgres";

let db;
const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  // Configuration PostgreSQL via Neon
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL est manquant dans les variables d'environnement."
    );
  }

  db = postgres(connectionString, {
    ssl: { rejectUnauthorized: false }, // Nécessaire pour Neon
  });
} else {
  // Configuration SQLite pour le développement
  const dbPath = path.join(process.cwd(), "main.db");

  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, ""); // Crée le fichier s'il n'existe pas
  }

  db = new Database(dbPath);
}

// Fonction pour créer les tables nécessaires
const createTables = async () => {
  if (isProduction) {
    try {
      // Tables PostgreSQL
      await db`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          firstName TEXT,
          lastName TEXT,
          birthDate DATE,
          phone TEXT,
          gender TEXT
        );
      `;

      await db`
        CREATE TABLE IF NOT EXISTS sessions (
          id TEXT PRIMARY KEY,
          expires_at TIMESTAMP NOT NULL,
          user_id INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );
      `;
    } catch (error) {
      console.error(
        "Erreur lors de la création des tables PostgreSQL :",
        error
      );
    }
  } else {
    try {
      // Tables SQLite
      db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          firstName TEXT,
          lastName TEXT,
          birthDate DATE,
          phone TEXT,
          gender TEXT
        );
      `);

      db.exec(`
        CREATE TABLE IF NOT EXISTS sessions (
          id TEXT PRIMARY KEY,
          expires_at INTEGER NOT NULL,
          user_id INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );
      `);
    } catch (error) {
      console.error("Erreur lors de la création des tables SQLite :", error);
    }
  }
};

createTables();

export default db;
