import { Kysely } from "kysely";
import { Adapter } from "lucia-auth";
import {
  AdapterUser,
  AdapterSession,
  AdapterKey,
} from "@/backend/types/LuciaAdapter";

export const KyselyAdapter = (db: Kysely<any>): Adapter => {
  return {
    getUser: async (userId: string): Promise<AdapterUser | null> => {
      const user = await db
        .selectFrom("users")
        .selectAll()
        .where("id", "=", parseInt(userId))
        .executeTakeFirst();
      if (!user) return null;
      return {
        id: user.id.toString(),
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
        phone: user.phone,
        gender: user.gender,
      };
    },
    setUser: async (
      userId: string,
      userAttributes: Record<any, any>,
      key: AdapterKey
    ): Promise<void> => {
      await db
        .insertInto("users")
        .values({
          id: parseInt(userId),
          email: userAttributes.email,
          password: key.hashed_password,
          firstName: userAttributes.firstName,
          lastName: userAttributes.lastName,
          birthDate: userAttributes.birthDate,
          phone: userAttributes.phone,
          gender: userAttributes.gender,
        })
        .execute();
    },
    updateUserAttributes: async (
      userId: string,
      attributes: Record<any, any>
    ): Promise<void> => {
      await db
        .updateTable("users")
        .set(attributes)
        .where("id", "=", parseInt(userId))
        .execute();
    },
    setKey: async (key: AdapterKey): Promise<void> => {
      await db
        .insertInto("keys")
        .values({
          id: key.id,
          hashed_password: key.hashed_password,
          primary_key: key.primary_key,
          user_id: parseInt(key.user_id),
          expires: key.expires,
        })
        .execute();
    },
    deleteNonPrimaryKey: async (keyId: string): Promise<void> => {
      await db
        .deleteFrom("keys")
        .where("id", "=", keyId)
        .where("primary_key", "=", false)
        .execute();
    },
    getKey: async (keyId: string): Promise<AdapterKey | null> => {
      const key = await db
        .selectFrom("keys")
        .selectAll()
        .where("id", "=", keyId)
        .executeTakeFirst();
      if (!key) return null;
      return {
        id: key.id,
        hashed_password: key.hashed_password,
        primary_key: key.primary_key,
        user_id: key.user_id.toString(),
        expires: key.expires,
      };
    },
    getKeysByUserId: async (userId: string): Promise<AdapterKey[]> => {
      const keys = await db
        .selectFrom("keys")
        .selectAll()
        .where("user_id", "=", parseInt(userId))
        .execute();
      return keys.map((key) => ({
        id: key.id,
        hashed_password: key.hashed_password,
        primary_key: key.primary_key,
        user_id: key.user_id.toString(),
        expires: key.expires,
      }));
    },
    deleteUser: async (userId: string): Promise<void> => {
      await db.deleteFrom("users").where("id", "=", parseInt(userId)).execute();
    },
    deleteKeysByUserId: async (userId: string): Promise<void> => {
      await db
        .deleteFrom("keys")
        .where("user_id", "=", parseInt(userId))
        .execute();
    },
    updateKeyPassword: async (
      keyId: string,
      hashedPassword: string
    ): Promise<void> => {
      await db
        .updateTable("keys")
        .set({ hashed_password: hashedPassword })
        .where("id", "=", keyId)
        .execute();
    },
    getSession: async (
      sessionId: string
    ): Promise<Readonly<{
      id: string;
      active_expires: number | bigint;
      idle_expires: number | bigint;
      user_id: string;
    }> | null> => {
      const session = await db
        .selectFrom("sessions")
        .selectAll()
        .where("id", "=", sessionId)
        .executeTakeFirst();
      if (!session) return null;
      return {
        id: session.id,
        user_id: session.userId.toString(),
        active_expires: session.expiresAt.getTime(),
        idle_expires: session.expiresAt.getTime(),
      };
    },
    setSession: async (
      session: Readonly<{
        id: string;
        active_expires: number | bigint;
        idle_expires: number | bigint;
        user_id: string;
      }>
    ): Promise<void> => {
      await db
        .insertInto("sessions")
        .values({
          id: session.id,
          userId: parseInt(session.user_id),
          expiresAt: new Date(Number(session.active_expires)),
        })
        .execute();
    },
    deleteSession: async (sessionId: string): Promise<void> => {
      await db.deleteFrom("sessions").where("id", "=", sessionId).execute();
    },
    deleteSessionsByUserId: async (userId: string): Promise<void> => {
      await db
        .deleteFrom("sessions")
        .where("userId", "=", parseInt(userId))
        .execute();
    },
    getSessionsByUserId: async (
      userId: string
    ): Promise<
      | Readonly<{
          id: string;
          active_expires: number | bigint;
          idle_expires: number | bigint;
          user_id: string;
        }>[]
      | null
    > => {
      const sessions = await db
        .selectFrom("sessions")
        .selectAll()
        .where("userId", "=", parseInt(userId))
        .execute();
      if (!sessions) return null;
      return sessions.map((session) => ({
        id: session.id,
        user_id: session.userId.toString(),
        active_expires: session.expiresAt.getTime(),
        idle_expires: session.expiresAt.getTime(),
      }));
    },
    getSessionAndUserBySessionId: async (
      sessionId: string
    ): Promise<{
      user: AdapterUser;
      session: Readonly<{
        id: string;
        active_expires: number | bigint;
        idle_expires: number | bigint;
        user_id: string;
      }>;
    } | null> => {
      const session = await db
        .selectFrom("sessions")
        .selectAll()
        .where("id", "=", sessionId)
        .executeTakeFirst();
      if (!session) return null;
      const user = await db
        .selectFrom("users")
        .selectAll()
        .where("id", "=", session.userId)
        .executeTakeFirst();
      if (!user) return null;
      return {
        user: {
          id: user.id.toString(),
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          birthDate: user.birthDate,
          phone: user.phone,
          gender: user.gender,
        },
        session: {
          id: session.id,
          user_id: session.userId.toString(),
          active_expires: session.expiresAt.getTime(),
          idle_expires: session.expiresAt.getTime(),
        },
      };
    },
  };
};
