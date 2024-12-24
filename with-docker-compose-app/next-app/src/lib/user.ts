import db from "@/lib/db";

interface User {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  phone?: string;
  gender?: string;
}

export function createUser(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
  birthDate?: string,
  phone?: string,
  gender?: string
): number {
  const result = db
    .prepare(
      "INSERT INTO users (email, password, firstName, lastName, birthDate, phone, gender) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(email, password, firstName, lastName, birthDate, phone, gender);

  return result.lastInsertRowid as number;
}

export function getUserByEmail(email: string): User | undefined {
  const result = db.prepare("SELECT * FROM users WHERE email = ?");
  return result.get(email) as User | undefined;
}
