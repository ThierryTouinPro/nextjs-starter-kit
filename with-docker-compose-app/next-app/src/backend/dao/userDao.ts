import { hashUserPassword } from "@/backend/services/auth/passwordService";
import { User } from "@/backend/types/User";
import logger from "@/config/winston";
import db from "@/lib/db";

const isProduction = process.env.NODE_ENV === "production";

export async function createUser(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
  birthDate?: string,
  phone?: string,
  gender?: string
): Promise<number> {
  // Hachage du mot de passe
  const hashedPassword = hashUserPassword(password);

  logger.info("Creating new user ...");
  if (isProduction) {
    // PostgreSQL
    const result = await db`
      INSERT INTO users (email, password, firstName, lastName, birthDate, phone, gender)
      VALUES (${email}, ${hashedPassword}, ${firstName}, ${lastName}, ${birthDate}, ${phone}, ${gender})
      RETURNING id
    `;
    return result[0].id;
  } else {
    // SQLite
    const result = db
      .prepare(
        "INSERT INTO users (email, password, firstName, lastName, birthDate, phone, gender) VALUES (?, ?, ?, ?, ?, ?, ?)"
      )
      .run(
        email,
        hashedPassword,
        firstName,
        lastName,
        birthDate,
        phone,
        gender
      );
    logger.info("User created with ID :", result.lastInsertRowid);
    return result.lastInsertRowid as number;
  }
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  logger.info("Fetching user having this email :", email);
  if (isProduction) {
    // PostgreSQL
    const result = await db`
      SELECT * FROM users WHERE email = ${email}
    `;
    logger.info("Database result for user: ", result[0]);
    return result[0] as User | undefined;
  } else {
    // SQLite
    const result = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    logger.info("Database result for user: ", result);
    return result as User | undefined;
  }
}

export async function getUserProfile(userId: number): Promise<User | null> {
  logger.info("Fetching user profile with ID: ", userId);
  if (isProduction) {
    // PostgreSQL
    const result = await db`
      SELECT * FROM users WHERE id = ${userId}
    `;
    logger.info("Database result for user profile: ", result[0]);
    return result[0] || null;
  } else {
    // SQLite
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId) as
      | User
      | undefined;
    logger.info("Database result for user profile: ", user);
    return user || null;
  }
}
