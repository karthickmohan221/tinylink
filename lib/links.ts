import { randomBytes } from "crypto";
import { query } from "@/lib/db";
import type { LinkInput, LinkRecord } from "@/lib/types";
import { CODE_REGEX } from "@/lib/validation";

type LinkRow = {
  id: number;
  code: string;
  url: string;
  clicks: number;
  last_clicked: Date | null;
  created_at: Date;
  user_id: string | null;
};

function mapRow(row: LinkRow): LinkRecord {
  return {
    id: row.id,
    code: row.code,
    url: row.url,
    clicks: Number(row.clicks),
    lastClicked: row.last_clicked ? row.last_clicked.toISOString() : null,
    createdAt: row.created_at.toISOString(),
    userId: row.user_id,
  };
}

async function generateUniqueCode(attempts = 5): Promise<string> {
  for (let i = 0; i < attempts; i++) {
    const candidate = randomBytes(4).toString("base64url").slice(0, 6);
    const code = candidate.replace(/[^A-Za-z0-9]/g, "A").slice(0, 6);
    const existing = await getLink(code);
    if (!existing) {
      return code;
    }
  }
  throw new Error("Unable to generate a unique short code");
}

export async function listLinks(userId?: string): Promise<LinkRecord[]> {
  if (userId) {
    const { rows } = await query<LinkRow>(
      "SELECT * FROM links WHERE user_id = $1 ORDER BY created_at DESC, code ASC",
      [userId]
    );
    return rows.map(mapRow);
  }
  // No userId = return all links (for public/anon users)
  const { rows } = await query<LinkRow>(
    "SELECT * FROM links ORDER BY created_at DESC, code ASC",
  );
  return rows.map(mapRow);
}

export async function getLink(code: string): Promise<LinkRecord | null> {
  if (!CODE_REGEX.test(code)) {
    return null;
  }
  const { rows } = await query<LinkRow>(
    "SELECT * FROM links WHERE code = $1 LIMIT 1",
    [code],
  );
  return rows.length ? mapRow(rows[0]) : null;
}

export async function createLink(
  input: LinkInput,
  userId?: string,
): Promise<{ link?: LinkRecord; conflict?: boolean }> {
  let code = input.code?.trim();

  // If no custom code, generate one
  if (!code) {
    code = await generateUniqueCode();
  }

  for (let i = 0; i < 5; i++) {
    try {
      const { rows } = await query<LinkRow>(
        "INSERT INTO links (code, url, user_id) VALUES ($1, $2, $3) RETURNING *",
        [code, input.url, userId ?? null],
      );

      return { link: mapRow(rows[0]) };
    } catch (error) {
      // Unique constraint violation
      if ((error as { code?: string })?.code === "23505") {
        // If user gave custom code → return conflict
        if (input.code) {
          return { conflict: true };
        }

        // Otherwise generate a new one and retry
        code = await generateUniqueCode();
        continue;
      }

      throw error;
    }
  }

  throw new Error("Failed to generate unique code");
}

export async function deleteLink(code: string, userId?: string): Promise<boolean> {
  let queryText = "DELETE FROM links WHERE code = $1";
  const params: (string | number | null)[] = [code];
  
  if (userId) {
    queryText += " AND user_id = $2";
    params.push(userId);
  }
  
  const { rowCount } = await query<LinkRow>(queryText, params);
  return rowCount ? rowCount > 0 : false;
}

export async function incrementClick(code: string): Promise<LinkRecord | null> {
  const { rows } = await query<LinkRow>(
    `UPDATE links
     SET clicks = clicks + 1,
         last_clicked = NOW()
     WHERE code = $1
     RETURNING *`,
    [code],
  );
  return rows.length ? mapRow(rows[0]) : null;
}
