import { hashUserPassword } from "@/backend/services/auth/passwordService";
import { User } from "@/backend/types/User";
import logger from "@/config/winston";
import prisma from "@/lib/prisma";

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

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      phone,
      gender,
    },
  });

  return user.id;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  logger.info("Fetching user having this email :", email);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user || undefined;
}

export async function getUserProfile(userId: number): Promise<User | null> {
  logger.info("Fetching user profile with ID: ", userId);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user || null;
}

import { Session } from "@/backend/types/Session";
import { v4 as uuidv4 } from "uuid";

export async function createSession(
  userId: number
): Promise<{ sessionId: string; expiresAt: number } | null> {
  const sessionId = uuidv4();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

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
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt.getTime() <= Date.now()) {
    await deleteSession(sessionId);
    return null;
  }

  return session;
}

export async function deleteSession(sessionId: string): Promise<void> {
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
