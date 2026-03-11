import { NextResponse } from "next/server";
import { createLink, listLinks } from "@/lib/links";
import { getTokenFromHeader, verifyToken } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const token = getTokenFromHeader(request.headers.get("Authorization"));
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const links = await listLinks(payload.userId);
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
    const token = getTokenFromHeader(request.headers.get("Authorization"));
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const auth = await verifyToken(token);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await request.json();

    if (!payload?.url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const result = await createLink(
      { url: payload.url, code: payload.code },
      auth.userId
    );

    if (result.conflict) {
      return NextResponse.json(
        { error: "This short code is already in use" },
        { status: 409 }
      );
    }

    return NextResponse.json({ link: result.link }, { status: 201 });

  } catch (error) {
    console.error("Failed to create link", error);
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    );
  }
}
