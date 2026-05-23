import ReviewGrid from "@/components/ReviewGrid";
import { getAllStaticReviews } from "@/data/reviews";
import { getCachedReviews } from "@/lib/reviews-cache";
import type { ResolvedReview } from "@/data/reviews";

// Always fetch fresh — Redis reads are fast and data changes as reviews get marked used.
export const dynamic = "force-dynamic";

export default async function Page() {
  // Fetch AI reviews from Redis cache; filter any that Redis already removed (marked used).
  let cachedAi: ResolvedReview[] = [];
  let fetchError = false;
  const redisConfigured =
    !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;
  if (redisConfigured) {
    try {
      cachedAi = await getCachedReviews();
    } catch {
      fetchError = true;
    }
  }

  const staticReviews = getAllStaticReviews();

  // Always merge both pools — ReviewGrid shows AI first (id ≥ 151), then static (id 1–150).
  const merged = [...cachedAi, ...staticReviews];
  // Deduplicate by ID — guards against Redis returning the same entry twice.
    const seenIds = new Set<number>();
  const pool = merged.filter((r) => {
    if (seenIds.has(r.id)) return false;
    seenIds.add(r.id);
    return true;
  });
  const isEmpty = pool.length === 0;

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-3xl">🌿</span>
            <h1 className="text-2xl font-bold text-gray-800">Mayweed Remedies</h1>
          </div>
          <p className="text-gray-500 text-sm">Homeopathic &amp; Natural Remedies · Vadodara</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">

        {/* Visual step-by-step banner */}
        <div className="bg-emerald-600 rounded-2xl p-5 mb-7 shadow-lg">
          <p className="text-white text-center font-bold text-base mb-4">
            🙏 Please leave us a Google review — takes 30 seconds!
          </p>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/15 rounded-xl p-3 flex flex-col items-center gap-2 text-center">
              <span className="text-4xl leading-none">👇</span>
              <div className="bg-white text-emerald-700 font-black text-xs rounded-full w-5 h-5 flex items-center justify-center">1</div>
              <p className="text-white text-xs font-semibold leading-tight">Pick any review</p>
            </div>

            <div className="bg-white/15 rounded-xl p-3 flex flex-col items-center gap-2 text-center">
              <span className="text-4xl leading-none">📋</span>
              <div className="bg-white text-emerald-700 font-black text-xs rounded-full w-5 h-5 flex items-center justify-center">2</div>
              <p className="text-white text-xs font-semibold leading-tight">Tap Copy — Google opens</p>
            </div>

            <div className="bg-yellow-400/90 rounded-xl p-3 flex flex-col items-center gap-2 text-center">
              <span className="text-4xl leading-none">📝</span>
              <div className="bg-emerald-700 text-white font-black text-xs rounded-full w-5 h-5 flex items-center justify-center">3</div>
              <p className="text-emerald-900 text-xs font-bold leading-tight">Paste &amp; Post ⭐</p>
            </div>
          </div>
        </div>

        {/* DEV DEBUG — remove before going live */}
        <div className="mb-4 p-3 bg-gray-100 rounded-xl text-xs font-mono text-gray-600 space-y-1">
          <p>redis configured: <strong>{String(redisConfigured)}</strong></p>
          <p>fetch error: <strong>{String(fetchError)}</strong></p>
          <p>ai reviews loaded: <strong>{cachedAi.length}</strong></p>
          <p>static reviews: <strong>{staticReviews.length}</strong></p>
          <p>total pool: <strong>{pool.length}</strong></p>
        </div>

        {isEmpty ? (
          <div className="text-center py-16 px-4">
            <p className="text-gray-500 text-base">All reviews have been used up.</p>
            <p className="text-gray-400 text-sm mt-2">Please ask the admin to generate more reviews.</p>
          </div>
        ) : (
          <ReviewGrid reviews={pool} fetchError={fetchError} />
        )}

        <p className="text-center text-gray-400 text-xs mt-10 pb-8">
          Thank you for your support. Your review means a lot to us. 💚
        </p>
      </div>
    </main>
  );
}
