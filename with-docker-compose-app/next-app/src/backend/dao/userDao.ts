import db from "@/lib/kysely";
import { hashUserPassword } from "@/backend/services/auth/passwordService";
import { User } from "@/backend/types/User";
import logger from "@/config/winston";

export async function createUser(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
  birthDate?: string,
  phone?: string,
  gender?: string
): Promise<number> {
  const hashedPassword = hashUserPassword(password);

  logger.info("Creating new user ...");

  const result = await db
    .insertInto("users")
    .values({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      phone,
      gender,
    })
    .returning("id")
    .executeTakeFirst();

  return result.id;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  logger.info("Fetching user having this email:", email);

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();

  return user || undefined;
}

export async function getUserProfile(userId: number): Promise<User | null> {
  logger.info("Fetching user profile with ID:", userId);

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", userId)
    .executeTakeFirst();

  return user || null;
}
