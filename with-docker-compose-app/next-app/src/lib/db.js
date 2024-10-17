import sql from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid'; 

const db = sql('main.db');

try {
  // Création des tables si elles n'existent pas déjà
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
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
  console.error('Error setting up the database:', error);
}

// Fonction pour créer une nouvelle session
export const createSession = (userId) => {
  if (!userId) {
    throw new Error('userId is required to create a session.');
  }

  const sessionId = uuidv4(); // Génère un identifiant unique pour la session
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24; // Session valide pendant 24h

  try {
    const stmt = db.prepare(`
      INSERT INTO sessions (id, expires_at, user_id) 
      VALUES (?, ?, ?)
    `);  // Éxécute la requête SQL avec les paramètres passés

    console.log('sessionId:', sessionId, 'expiresAt:', expiresAt, 'userId:', userId);

    const result = stmt.run(sessionId, expiresAt, userId);
    
    if (result.changes === 0) {
      throw new Error('No session was created. Check the userId.');
    }

    return { sessionId, expiresAt };
  } catch (error) {
    console.error('Error creating session:', error);
    return null;
  }
};


// Fonction pour vérifier une session
export const verifySession = (sessionId) => {
  try {
    const stmt = db.prepare(`
      SELECT * FROM sessions WHERE id = ? AND expires_at > ?
    `);
    const session = stmt.get(sessionId, Date.now());

    if (session) {
      return session;
    } else {
      // Supprime la session expirée si trouvée
      deleteSession(sessionId);
      return null;
    }
  } catch (error) {
    console.error('Error verifying session:', error);
    return null;
  }
};

// Fonction pour supprimer une session (déconnexion)
export const deleteSession = (sessionId) => {
  try {
    const stmt = db.prepare(`
      DELETE FROM sessions WHERE id = ?
    `);
    stmt.run(sessionId);
  } catch (error) {
    console.error('Error deleting session:', error);
  }
};

// Fonction pour supprimer les sessions expirées
export const cleanupExpiredSessions = () => {
  try {
    const stmt = db.prepare(`
      DELETE FROM sessions WHERE expires_at <= ?
    `);
    stmt.run(Date.now());
  } catch (error) {
    console.error('Error cleaning up expired sessions:', error);
  }
};

export default db;
