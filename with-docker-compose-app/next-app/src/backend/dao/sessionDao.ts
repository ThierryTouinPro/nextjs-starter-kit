import { Session } from "@/backend/types/Session";
import logger from "@/config/winston";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function createSession(
  userId: number
): Promise<{ sessionId: string; expiresAt: number } | null> {
  const sessionId = uuidv4();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

  logger.info("Creating session ...");
  const session = await prisma.session.create({
    data: {
      id: sessionId,
      expiresAt,
      userId,
    },
  });

  return { sessionId: session.id, expiresAt: session.expiresAt.getTime() };
}

export async function verifySession(
  sessionId: string
): Promise<Session | null> {
  logger.info("Fetching session having id: ", sessionId);
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt.getTime() <= Date.now()) {
    logger.info("Session does not exist ");
    await deleteSession(sessionId);
    return null;
  }

  return session;
}

export async function deleteSession(sessionId: string): Promise<void> {
  logger.info("Deleting session having id: ", sessionId);
  await prisma.session.delete({
    where: { id: sessionId },
  });
}

export async function cleanupExpiredSessions(): Promise<void> {
  await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
    },
  });
}
