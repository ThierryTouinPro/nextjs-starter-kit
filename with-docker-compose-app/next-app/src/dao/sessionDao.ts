import db from "@/lib/db";
import { Session } from "@/types/Session";
import { v4 as uuidv4 } from "uuid";

export function createSession(
  userId: number
): { sessionId: string; expiresAt: number } | null {
  const sessionId = uuidv4();
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24; // 24h

  const result = db
    .prepare("INSERT INTO sessions (id, expires_at, user_id) VALUES (?, ?, ?)")
    .run(sessionId, expiresAt, userId);

  if (result.changes === 0) {
    throw new Error("No session was created. Check the userId.");
  }

  return { sessionId, expiresAt };
}

export function verifySession(sessionId: string): Session | null {
  const session = db
    .prepare("SELECT * FROM sessions WHERE id = ? AND expires_at > ?")
    .get(sessionId, Date.now()) as Session | undefined;

  if (!session) {
    deleteSession(sessionId);
    return null;
  }
  return session;
}

export function deleteSession(sessionId: string): void {
  db.prepare("DELETE FROM sessions WHERE id = ?").run(sessionId);
}

export function cleanupExpiredSessions(): void {
  db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(Date.now());
}
