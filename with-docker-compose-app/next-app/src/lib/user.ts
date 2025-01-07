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

export function getUserProfile(userId: number): User | null {
  try {
    const stmt = db.prepare(`
      SELECT * FROM users WHERE id = ?
    `);
    const user = stmt.get(userId) as User | undefined;

    if (user) {
      console.log(`User trouvé : ${user}`);
      return user;
    } else {
      console.log(`User non trouvé`);
      return null;
    }
  } catch (error) {
    console.error("Error finding user profile: ", error);
    return null;
  }
}
