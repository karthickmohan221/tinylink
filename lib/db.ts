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

const CREATE_TABLES_SQL = `
CREATE TABLE IF NOT EXISTS users (
  _id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT,
  role TEXT,
  usetype_id TEXT,
  "user" TEXT,
  stats BOOLEAN NOT NULL DEFAULT TRUE,
  "super" BOOLEAN NOT NULL DEFAULT FALSE,
  "resetPasswordToken" TEXT,
  temporary BOOLEAN NOT NULL DEFAULT FALSE,
  "resetPasswordTokenExpire" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(8) UNIQUE NOT NULL,
  url TEXT NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  last_clicked TIMESTAMPTZ,
  user_id TEXT REFERENCES users(_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_links_user_id ON links(user_id);
CREATE INDEX IF NOT EXISTS idx_links_code ON links(code);
`;

// Migration to add user_id column if it doesn't exist
const MIGRATION_SQL = `
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'links' AND column_name = 'user_id') THEN
    ALTER TABLE links ADD COLUMN user_id TEXT;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'links'
      AND column_name = 'user_id'
      AND data_type <> 'text'
  ) THEN
    ALTER TABLE links ALTER COLUMN user_id TYPE TEXT USING user_id::text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE table_name = 'links'
      AND constraint_type = 'FOREIGN KEY'
      AND constraint_name = 'links_user_id_fkey'
  ) THEN
    ALTER TABLE links
      ADD CONSTRAINT links_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES users(_id) ON DELETE CASCADE;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
`;

export async function ensureDatabase() {
  if (initialized) return;
  
  try {
    // Create tables (will not recreate if already exists)
    await pool.query(CREATE_TABLES_SQL);
  } catch (e) {
    console.error("Error creating tables:", e);
  }
  
  // Run migrations - add user_id column if missing
  try {
    await pool.query(MIGRATION_SQL);
  } catch (e) {
    // Log but don't fail - column might already exist
    console.log("Migration attempted, continuing...");
  }
  
  initialized = true;
}

export async function query<T extends QueryResultRow = Record<string, unknown>>(
  text: string,
  params: readonly (string | number | null)[] = []
): Promise<QueryResult<T>> {
  await ensureDatabase();
  return pool.query<T>(text, Array.from(params));
}

