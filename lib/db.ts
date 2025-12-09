import { Pool, QueryResultRow, type QueryResult } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Please define it in your environment or .env.local file."
  );
}

type GlobalPool = typeof globalThis & {
  __tinylink_pool?: Pool;
};

const globalPool = globalThis as GlobalPool;

const pool =
  globalPool.__tinylink_pool ??
  new Pool({
    connectionString,
    max: 4,
    ssl: connectionString.includes("neon")
      ? { rejectUnauthorized: false }
      : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  globalPool.__tinylink_pool = pool;
}

let initialized = false;

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(8) UNIQUE NOT NULL,
  url TEXT NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  last_clicked TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`;

export async function ensureDatabase() {
  if (initialized) return;
  await pool.query(CREATE_TABLE_SQL);
  initialized = true;
}

export async function query<T extends QueryResultRow = Record<string, unknown>>(
  text: string,
  params: readonly (string | number | null)[] = []
): Promise<QueryResult<T>> {
  await ensureDatabase();
  return pool.query<T>(text, Array.from(params));
}

