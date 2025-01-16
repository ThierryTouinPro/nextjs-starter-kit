import bcrypt from "bcrypt";

/**
 * Hache un mot de passe utilisateur en utilisant bcrypt.
 * @param password - Le mot de passe utilisateur en clair.
 * @returns Le mot de passe haché.
 */
export function hashUserPassword(password: string): string {
  const saltRounds = 10; // Le nombre de tours de salage
  return bcrypt.hashSync(password, saltRounds); // Retourne le mot de passe haché
}

/**
 * Vérifie si un mot de passe fourni correspond au mot de passe haché stocké.
 * @param suppliedPassword - Le mot de passe en clair fourni par l'utilisateur.
 * @param storedPassword - Le mot de passe haché stocké.
 * @returns `true` si le mot de passe correspond, sinon `false`.
 */
export function verifyPassword(
  suppliedPassword: string,
  storedPassword: string
): boolean {
  return bcrypt.compareSync(suppliedPassword, storedPassword); // Compare les deux mots de passe
}
