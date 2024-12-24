import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import db from "@/lib/db";

const adapter = new BetterSqlite3Adapter(db);

export const lucia = new Lucia({
  adapter,
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  },
});
