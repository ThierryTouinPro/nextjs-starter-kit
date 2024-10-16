// pages/api/register.js
import { auth } from '../../../lib/lucia';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Méthode non autorisée
  }

  const { email, password } = req.body;

  let errors = {};

  if (!email.includes('@')) {
    errors.email = 'Please enter a valid email address';
  }

  if (password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const user = await auth.createUser({
      primaryKey: {
        providerId: 'email',
        providerUserId: email,
        password
      },
      attributes: {
        email
      }
    });

    // Créer une session d'authentification pour l'utilisateur
    const session = await auth.createSession(user.userId);

    // Définir le cookie de session
    res.setHeader('Set-Cookie', session.cookies);

    // Rediriger l'utilisateur après l'inscription réussie
    res.status(201).json({ success: true });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(400).json({
        errors: { email: 'Email already exists' }
      });
    }
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
