import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

// Définir le chemin pour la base de données
const logDirectory =
  process.env.NODE_ENV === "production"
    ? "/tmp"
    : path.join(process.cwd(), "");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const dbPath = path.join(logDirectory, "main.db");

if (process.env.NODE_ENV === "production" && !fs.existsSync(dbPath)) {
  const templateDbPath = path.join(process.cwd(), "main.db");
  if (fs.existsSync(templateDbPath)) {
    fs.copyFileSync(templateDbPath, dbPath);
  }
}

const db = new Database(dbPath);

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
    id TEXT PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

export default db;
