import { getUserByEmail } from "@/dao/userDao";
import { verifyPassword } from "@/services/auth/passwordService";
import { createSession } from "@/dao/sessionDao";
import logger from "@/config/winston";

/**
 * Vérifie les identifiants utilisateur.
 */
export function verifyUserCredentials(
  email: string,
  password: string,
  lang: string
) {
  // Recherche de l'utilisateur dans la base de données
  const user = getUserByEmail(email);
  if (!user) {
    logger.warn(`Utilisateur non trouvé avec l'email : ${email}`);
    console.log(`Utilisateur non trouvé avec l'email : ${email}`);
    return null;
  }

  logger.warn(`Utilisateur trouvé avec l'email : ${email}`);
  console.log(`Utilisateur trouvé avec l'email : ${email}`);

  const passwordMatch = verifyPassword(password, user.password);
  if (!passwordMatch) {
    logger.warn(`Mot de passe incorrect pour l'email : ${email}`);
    console.log(`Mot de passe incorrect pour l'email : ${email}`);
    return null;
  }

  return user;
}

/**
 * Crée une session utilisateur.
 */
export function createUserSession(userId: number) {
  const { sessionId, expiresAt } = createSession(userId);
  return { sessionId, expiresAt };
}
