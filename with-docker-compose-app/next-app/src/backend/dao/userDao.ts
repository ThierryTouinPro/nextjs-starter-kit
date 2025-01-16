import db from "@/lib/db";
import { hashUserPassword } from "@/backend/services/auth/passwordService";
import { User } from "@/backend/types/User";

export function createUser(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
  birthDate?: string,
  phone?: string,
  gender?: string
): number {
  // Hachage du mot de passe
  const hashedPassword = hashUserPassword(password);
  const result = db
    .prepare(
      "INSERT INTO users (email, password, firstName, lastName, birthDate, phone, gender) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(email, hashedPassword, firstName, lastName, birthDate, phone, gender);

  return result.lastInsertRowid as number;
}

export function getUserByEmail(email: string): User | undefined {
  const result = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  return result as User | undefined;
}

export function getUserProfile(userId: number): User | null {
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId) as
    | User
    | undefined;
  return user || null;
}
