import db from "@/lib/kysely";
import { Session } from "@/backend/types/Session";
import logger from "@/config/winston";
import { v4 as uuidv4 } from "uuid";

export async function createSession(
  userId: number
): Promise<{ sessionId: string; expiresAt: number } | null> {
  const sessionId = uuidv4();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

  logger.info("Creating session ...");
  await db
    .insertInto("sessions")
    .values({
      id: sessionId,
      expiresAt,
      userId,
    })
    .execute();

  return { sessionId, expiresAt: expiresAt.getTime() };
}

export async function verifySession(
  sessionId: string
): Promise<Session | null> {
  logger.info("Fetching session having id:", sessionId);
  const session = await db
    .selectFrom("sessions")
    .selectAll()
    .where("id", "=", sessionId)
    .executeTakeFirst();

  if (!session || session.expiresAt.getTime() <= Date.now()) {
    logger.info("Session does not exist or has expired");
    await deleteSession(sessionId);
    return null;
  }

  return session;
}

export async function deleteSession(sessionId: string): Promise<void> {
  logger.info("Deleting session having id:", sessionId);
  await db.deleteFrom("sessions").where("id", "=", sessionId).execute();
}

export async function cleanupExpiredSessions(): Promise<void> {
  await db
    .deleteFrom("sessions")
    .where("expiresAt", "<=", new Date())
    .execute();
}
