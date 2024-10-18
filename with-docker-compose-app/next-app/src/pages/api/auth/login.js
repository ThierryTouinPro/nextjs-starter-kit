import db, { createSession } from '../../../lib/db';
import bcrypt from 'bcryptjs';
const logger = require('../../../logger'); // Import de Winston

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Vérification des champs
    if (!email?.trim() || !password?.trim()) {
      logger.warn('Tentative de connexion avec email ou mot de passe vide');
      return res.status(400).json({ error: 'L\'email et le mot de passe sont requis' });
    }

    try {
      // Recherche de l'utilisateur dans la base de données
      const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

      if (!user) {
        logger.warn(`Utilisateur non trouvé avec l'email : ${email}`);
        return res.status(401).json({ error: 'Identifiants invalides' });
      }

      // Vérification du mot de passe
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        logger.warn(`Mot de passe incorrect pour l'email : ${email}`);
        return res.status(401).json({ error: 'Identifiants invalides' });
      }

      // Crée une session pour cet utilisateur
      const { sessionId, expiresAt } = createSession(user.id);

      // Définit un cookie avec l'identifiant de la session
      res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`);

      logger.info(`Connexion réussie pour l'utilisateur : ${email}`);
      return res.status(200).json({ message: 'Login successful', expiresAt });
      
    } catch (error) {
      logger.error(`Erreur lors du traitement de la requête de connexion : ${error.message}`);
      return res.status(500).json({ error: 'Erreur serveur, veuillez réessayer plus tard.' });
    }
    
  } else {
    logger.warn(`Méthode ${req.method} non autorisée pour cette route`);
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
