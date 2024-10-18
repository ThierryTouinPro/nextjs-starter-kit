import db, { createSession } from '../../../lib/db';
import bcrypt from 'bcryptjs';
const logger = require('../../../config/winston'); // Assurez-vous que c'est le bon chemin


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Vérification des champs
    if (!email?.trim() || !password?.trim()) {
      logger.warn('Tentative d\'enregistrement avec email ou mot de passe vide');
      return res.status(400).json({ error: 'L\'email et le mot de passe sont requis' });
    }

    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      if (existingUser) {
        logger.warn(`Tentative d'enregistrement avec un email déjà utilisé : ${email}`);
        return res.status(400).json({ error: 'L\'utilisateur existe déjà' });
      }

      // Hachage du mot de passe
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Insérer l'utilisateur dans la base de données
      const insertUserStmt = db.prepare(`
        INSERT INTO users (email, password) 
        VALUES (?, ?)
      `);
      const result = insertUserStmt.run(email, hashedPassword);

      // Créer automatiquement une session pour l'utilisateur
      const { sessionId, expiresAt } = createSession(result.lastInsertRowid);

      // Définir un cookie avec l'identifiant de la session
      res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`);

      logger.info(`Nouvel utilisateur enregistré avec succès : ${email}`);
      return res.status(201).json({ message: 'User registered successfully', expiresAt });
      
    } catch (error) {
      logger.error(`Erreur lors de l'enregistrement de l'utilisateur : ${error.message}`);
      return res.status(500).json({ error: 'Erreur serveur interne' });
    }
  } else {
    logger.warn(`Méthode ${req.method} non autorisée pour cette route`);
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
