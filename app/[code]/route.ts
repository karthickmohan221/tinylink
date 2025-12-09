import { NextResponse } from "next/server";
import { incrementClick } from "@/lib/links";
import { CODE_REGEX } from "@/lib/validation";

interface Params {
  params: Promise<{ code: string }>;
}

export async function GET(_: Request, { params }: Params) {
  const { code } = await params;

  if (!CODE_REGEX.test(code)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const link = await incrementClick(code);
  if (!link) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.redirect(link.url, 302);
}



