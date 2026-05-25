"use client";

import { useState } from "react";
import type { CachedReview } from "@/lib/reviews-cache";

type GenerateResult = {
  reviews: CachedReview[];
  cachedCount: number;
  skipped: number;
};

export default function AdminPanel({ initialCount, initialUsedCount }: { initialCount: number; initialUsedCount: number }) {
  const [loading, setLoading] = useState(false);
  const [cachedCount, setCachedCount] = useState(initialCount);
  const [usedCount] = useState(initialUsedCount);
  const [lastBatch, setLastBatch] = useState<CachedReview[]>([]);
  const [skipped, setSkipped] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/reviews/generate", { method: "POST" });
      const data = (await res.json()) as GenerateResult & { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Unknown error");
      setLastBatch(data.reviews);
      setCachedCount(data.cachedCount);
      setSkipped(data.skipped);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Cache stats + generate button */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex flex-1 gap-6">
          <div>
            <p className="text-sm text-gray-500">In cache</p>
            <p className="text-4xl font-bold text-emerald-600">{cachedCount}</p>
            <p className="text-xs text-gray-400 mt-0.5">available for customers</p>
          </div>
          <div className="w-px bg-gray-100" />
          <div>
            <p className="text-sm text-gray-500">Used by customers</p>
            <p className="text-4xl font-bold text-gray-700">{usedCount}</p>
            <p className="text-xs text-gray-400 mt-0.5">reviews copied so far</p>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px]"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Generate 15 More
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {lastBatch.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-700">
              Last batch — {lastBatch.length} added
              {skipped > 0 && (
                <span className="ml-2 text-xs text-gray-400 font-normal">
                  ({skipped} skipped — already used)
                </span>
              )}
            </h2>
          </div>
          <div className="space-y-3">
            {lastBatch.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl border border-gray-200 p-4 text-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-gray-400">ID {review.id}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
