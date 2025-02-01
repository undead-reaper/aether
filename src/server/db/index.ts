import { drizzle } from "drizzle-orm/singlestore";

import { env } from "~/env";
import * as schema from "./schema";
import { createPool } from "mysql2/promise";
import type { Pool } from "mysql2/promise";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

export const conn =
  globalForDb.conn ??
  createPool({
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    user: env.SINGLESTORE_USERNAME,
    password: env.SINGLESTORE_PASSWORD,
    database: env.SINGLESTORE_DB_NAME,
    ssl: {},
    maxIdle: 0,
  });
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
