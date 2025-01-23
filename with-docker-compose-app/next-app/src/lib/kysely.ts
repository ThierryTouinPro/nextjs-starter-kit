import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

interface Database {
  users: {
    id: number;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    birthDate?: Date;
    phone?: string;
    gender?: string;
  };
  sessions: {
    id: string;
    expiresAt: Date;
    userId: number;
  };
  keys: {
    id: string;
    hashed_password: string;
    primary_key: boolean;
    user_id: number;
    expires: number;
  };
}

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
});

export default db;
