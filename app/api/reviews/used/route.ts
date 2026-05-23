import { NextRequest, NextResponse } from "next/server";
import { markUsed } from "@/lib/reviews-cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { id?: unknown; text?: unknown };
    if (typeof body.id !== "number" || typeof body.text !== "string") {
      return NextResponse.json({ error: "id (number) and text (string) required" }, { status: 400 });
    }
    await markUsed(body.id, body.text);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
