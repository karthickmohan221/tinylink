import { NextResponse } from "next/server";
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

    if (!payload?.url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const link = await createLink({ url: payload.url });

    return NextResponse.json({ link }, { status: 201 });

  } catch (error) {
    console.error("Failed to create link", error);
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    );
  }
}