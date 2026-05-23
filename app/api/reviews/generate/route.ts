import { NextResponse } from "next/server";
import { generateAiReviews } from "@/lib/gemini";
import { addToCache, getCachedCount, getUsedTexts } from "@/lib/reviews-cache";

export async function POST() {
  try {
    const [rawReviews, usedTexts] = await Promise.all([
      generateAiReviews(),
      getUsedTexts(),
    ]);

    // Filter out any review whose text was already used by a customer.
    const fresh = rawReviews.filter((r) => !usedTexts.has(r.text));

    const added = await addToCache(fresh);
    const cachedCount = await getCachedCount();

    return NextResponse.json({ reviews: added, cachedCount, skipped: rawReviews.length - fresh.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  const cachedCount = await getCachedCount();
  return NextResponse.json({ cachedCount });
}
