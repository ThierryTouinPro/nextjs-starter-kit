import db, { createSession } from '../../../lib/db';
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Recherche de l'utilisateur dans la base de données
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

     // Vérification des champs
     if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: 'L\'email et le mot de passe sont requis' });
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    // Crée une session pour cet utilisateur
    const { sessionId, expiresAt } = createSession(user.id);

    // Définit un cookie avec l'identifiant de la session
    res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`);

    return res.status(200).json({ message: 'Login successful', expiresAt });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
