import { NextResponse } from "next/server";
import { deleteLink, getLink } from "@/lib/links";

interface Params {
  params: { code: string };
}

export async function GET(_: Request, context: { params: Promise<Params["params"]> }) {
  const { code } = await context.params;

  try {
    const link = await getLink(code);
    if (!link) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ link });
  } catch (error) {
    console.error("Failed to fetch link", error);
    return NextResponse.json({ error: "Failed to fetch link" }, { status: 500 });
  }
}

export async function DELETE(_: Request, context: { params: Promise<Params["params"]> }) {
  const { code } = await context.params;

  try {
    const deleted = await deleteLink(code);
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete link", error);
    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500 }
    );
  }
}


