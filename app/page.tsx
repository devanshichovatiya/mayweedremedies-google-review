import ReviewGrid from "@/components/ReviewGrid";
import { reviews } from "@/data/reviews";
import { generateAiReviews } from "@/lib/gemini";
import type { ResolvedReview } from "@/data/reviews";

// ISR: regenerate this page in the background every 45 minutes.
// Vercel/serverless serves the cached version instantly to every visitor;
// no cold-start or in-memory cache problem.
export const revalidate = 2700;

export default async function Page() {
  // Generate 15 AI reviews server-side; all 15 are baked into the cached HTML.
  // Client-side picks 4 randomly, so each visitor sees a different set.
  // On failure, aiReviews is empty and ReviewGrid falls back to static reviews.
  let aiReviews: ResolvedReview[] = [];
  try {
    aiReviews = await generateAiReviews();
  } catch {
    // fallback handled in ReviewGrid
  }

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

          {/* 3 steps in a single row */}
          <div className="grid grid-cols-3 gap-3">
            {/* Step 1 */}
            <div className="bg-white/15 rounded-xl p-3 flex flex-col items-center gap-2 text-center">
              <span className="text-4xl leading-none">👇</span>
              <div className="bg-white text-emerald-700 font-black text-xs rounded-full w-5 h-5 flex items-center justify-center">1</div>
              <p className="text-white text-xs font-semibold leading-tight">Pick any review</p>
            </div>

            {/* Step 2 (merged) */}
            <div className="bg-white/15 rounded-xl p-3 flex flex-col items-center gap-2 text-center">
              <span className="text-4xl leading-none">📋</span>
              <div className="bg-white text-emerald-700 font-black text-xs rounded-full w-5 h-5 flex items-center justify-center">2</div>
              <p className="text-white text-xs font-semibold leading-tight">Tap Copy — Google opens</p>
            </div>

            {/* Step 3 */}
            <div className="bg-yellow-400/90 rounded-xl p-3 flex flex-col items-center gap-2 text-center">
              <span className="text-4xl leading-none">📝</span>
              <div className="bg-emerald-700 text-white font-black text-xs rounded-full w-5 h-5 flex items-center justify-center">3</div>
              <p className="text-emerald-900 text-xs font-bold leading-tight">Paste &amp; Post ⭐</p>
            </div>
          </div>
        </div>

        {/* Review grid */}
        <ReviewGrid reviews={reviews} aiReviews={aiReviews} />

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-10 pb-8">
          Thank you for your support. Your review means a lot to us. 💚
        </p>
      </div>
    </main>
  );
}
