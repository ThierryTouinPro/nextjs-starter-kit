import { Session } from "@/backend/types/Session";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

const isProduction = process.env.NODE_ENV === "production";

export async function createSession(
  userId: number
): Promise<{ sessionId: string; expiresAt: number } | null> {
  const sessionId = uuidv4();
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24; // 24h

  if (isProduction) {
    // PostgreSQL
    const result = await db`
      INSERT INTO sessions (id, expires_at, user_id)
      VALUES (${sessionId}, ${expiresAt}, ${userId})
      RETURNING id
    `;
    if (result.length === 0) {
      throw new Error("No session was created. Check the userId.");
    }
  } else {
    // SQLite
    const result = db
      .prepare(
        "INSERT INTO sessions (id, expires_at, user_id) VALUES (?, ?, ?)"
      )
      .run(sessionId, expiresAt, userId);
    if (result.changes === 0) {
      throw new Error("No session was created. Check the userId.");
    }
  }

  return { sessionId, expiresAt };
}

export async function verifySession(
  sessionId: string
): Promise<Session | null> {
  if (isProduction) {
    // PostgreSQL
    const result = await db`
      SELECT * FROM sessions WHERE id = ${sessionId} AND expires_at > ${Date.now()}
    `;
    if (result.length === 0) {
      await deleteSession(sessionId);
      return null;
    }
    return result[0] as Session;
  } else {
    // SQLite
    const session = db
      .prepare("SELECT * FROM sessions WHERE id = ? AND expires_at > ?")
      .get(sessionId, Date.now()) as Session | undefined;
    if (!session) {
      deleteSession(sessionId);
      return null;
    }
    return session;
  }
}

export async function deleteSession(sessionId: string): Promise<void> {
  if (isProduction) {
    // PostgreSQL
    await db`
      DELETE FROM sessions WHERE id = ${sessionId}
    `;
  } else {
    // SQLite
    db.prepare("DELETE FROM sessions WHERE id = ?").run(sessionId);
  }
}

export async function cleanupExpiredSessions(): Promise<void> {
  if (isProduction) {
    // PostgreSQL
    await db`
      DELETE FROM sessions WHERE expires_at <= ${Date.now()}
    `;
  } else {
    // SQLite
    db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(Date.now());
  }
}
