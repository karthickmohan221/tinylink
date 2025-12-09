import { NextResponse } from "next/server";
import { createLinkSchema } from "@/lib/validation";
import { createLink, listLinks } from "@/lib/links";

export async function GET() {
  try {
    const links = await listLinks();
    return NextResponse.json({ links });
  } catch (error) {
    console.error("Failed to list links", error);
    return NextResponse.json(
      { error: "Failed to list links" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed  = createLinkSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { link, conflict } = await createLink(parsed.data);

    if (conflict) {
      return NextResponse.json(
        { error: "Code already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json({ link }, { status: 201 });
  } catch (error) {
    console.error("Failed to create link", error);
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    );
  }
}

