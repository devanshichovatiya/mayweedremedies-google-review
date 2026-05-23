import redis from "./redis";
import type { ResolvedReview } from "@/data/reviews";

const CACHED_KEY = "reviews:cached";
const USED_TEXTS_KEY = "reviews:used_texts";
const NEXT_ID_KEY = "reviews:next_id";

// IDs 1–150 are reserved for static variants. AI reviews start at 151.
const AI_ID_START = 150;

export type CachedReview = ResolvedReview & { generatedAt: string };

/** Get all available (non-removed) cached AI reviews. */
export async function getCachedReviews(): Promise<CachedReview[]> {
  const raw = await redis.hgetall<Record<string, CachedReview | string>>(CACHED_KEY);
  if (!raw) return [];
  return Object.values(raw).map((v) =>
    typeof v === "string" ? (JSON.parse(v) as CachedReview) : v
  );
}

/** How many AI reviews are currently in the cache. */
export async function getCachedCount(): Promise<number> {
  return redis.hlen(CACHED_KEY);
}

/** How many reviews (static + AI) have been copied by customers. */
export async function getUsedCount(): Promise<number> {
  return redis.scard(USED_TEXTS_KEY);
}

/** Add a batch of new AI reviews to the cache. IDs are auto-assigned starting at 151. */
export async function addToCache(
  reviews: Array<{ text: string; stars: 4 | 5 }>
): Promise<CachedReview[]> {
  if (reviews.length === 0) return [];

  // Ensure the counter starts above the static ID ceiling (150) on first use.
  // SETNX only sets if the key doesn't exist — race-safe initialisation.
  await redis.setnx(NEXT_ID_KEY, AI_ID_START);

  const added: CachedReview[] = [];
  const generatedAt = new Date().toISOString();

  for (const r of reviews) {
    const id = await redis.incr(NEXT_ID_KEY);
    const review: CachedReview = { id, stars: r.stars, text: r.text, generatedAt };
    await redis.hset(CACHED_KEY, { [String(id)]: review });
    added.push(review);
  }
  return added;
}

/** Mark a review as used: remove from cache hash, record text for generation dedup. */
export async function markUsed(id: number, text: string): Promise<void> {
  await Promise.all([
    redis.hdel(CACHED_KEY, String(id)),
    redis.sadd(USED_TEXTS_KEY, text),
  ]);
}

/** Return the set of all texts that have been used — for generation-time dedup. */
export async function getUsedTexts(): Promise<Set<string>> {
  const members = await redis.smembers<string[]>(USED_TEXTS_KEY);
  return new Set(members);
}

/** Check if a specific text was already used. */
export async function isTextUsed(text: string): Promise<boolean> {
  return (await redis.sismember(USED_TEXTS_KEY, text)) === 1;
}
