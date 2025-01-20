import { createSession } from "@/backend/dao/sessionDao";
import { getUserByEmail } from "@/backend/dao/userDao";
import { verifyPassword } from "@/backend/services/auth/passwordService";
import { User } from "@/backend/types/User";
import logger from "@/config/winston";

/**
 * Vérifie les identifiants utilisateur.
 */
export async function verifyUserCredentials(
  email: string,
  password: string,
  lang: string
): Promise<User | null> {
  // Recherche de l'utilisateur dans la base de données
  const user = await getUserByEmail(email);
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
export async function createUserSession(
  userId: number
): Promise<{ sessionId: string; expiresAt: number }> {
  const { sessionId, expiresAt } = await createSession(userId);
  return { sessionId, expiresAt };
}
