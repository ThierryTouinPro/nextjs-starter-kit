import db, { createSession } from '../../../lib/db';
import { createUser } from '../../../lib/user';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Vérification des champs
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: 'L\'email et le mot de passe sont requis' });
    }
    

    // Vérifier si l'utilisateur existe déjà
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).json({ error: 'L\'utilisateur existe déjà' });
    }

    // Hachage du mot de passe
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
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

      return res.status(201).json({ message: 'User registered successfully', expiresAt });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Erreur serveur interne' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
