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
};

function mapRow(row: LinkRow): LinkRecord {
  return {
    id: row.id,
    code: row.code,
    url: row.url,
    clicks: Number(row.clicks),
    lastClicked: row.last_clicked ? row.last_clicked.toISOString() : null,
    createdAt: row.created_at.toISOString(),
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

export async function listLinks(): Promise<LinkRecord[]> {
  const { rows } = await query<LinkRow>(
    "SELECT * FROM links ORDER BY created_at DESC, code ASC"
  );
  return rows.map(mapRow);
}

export async function getLink(code: string): Promise<LinkRecord | null> {
  if (!CODE_REGEX.test(code)) {
    return null;
  }
  const { rows } = await query<LinkRow>(
    "SELECT * FROM links WHERE code = $1 LIMIT 1",
    [code]
  );
  return rows.length ? mapRow(rows[0]) : null;
}

export async function createLink(
  input: LinkInput
): Promise<{ link?: LinkRecord; conflict?: boolean }> {
  const code = input.code?.trim() || (await generateUniqueCode());

  try {
    const { rows } = await query<LinkRow>(
      "INSERT INTO links (code, url) VALUES ($1, $2) RETURNING *",
      [code, input.url]
    );
    return { link: mapRow(rows[0]) };
  } catch (error) {
    if ((error as { code?: string })?.code === "23505") {
      return { conflict: true };
    }
    throw error;
  }
}

export async function deleteLink(code: string): Promise<boolean> {
  const { rowCount } = await query<LinkRow>("DELETE FROM links WHERE code = $1", [code]);
  return rowCount ? rowCount > 0 : false;
}

export async function incrementClick(
  code: string
): Promise<LinkRecord | null> {
  const { rows } = await query<LinkRow>(
    `UPDATE links
     SET clicks = clicks + 1,
         last_clicked = NOW()
     WHERE code = $1
     RETURNING *`,
    [code]
  );
  return rows.length ? mapRow(rows[0]) : null;
}

