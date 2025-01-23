import { Lucia } from "lucia-auth";
import { KyselyAdapter } from "@/lib/kyselyAdapter";
import db from "@/lib/kysely";

const adapter = KyselyAdapter(db);

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
