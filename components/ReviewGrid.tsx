"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import type { ResolvedReview } from "@/data/reviews";

const SHOW_COUNT = 4;

type Props = {
  reviews: ResolvedReview[];
  fetchError?: boolean;
};

export default function ReviewGrid({ reviews, fetchError }: Props) {
  const [shown, setShown] = useState<ResolvedReview[]>([]);
  const [animating, setAnimating] = useState(false);

  const deckRef = useRef<ResolvedReview[]>([]);

  useEffect(() => {
    // AI reviews (id >= 151): largest ID first (newest generated shown first).
    // Static reviews (id < 151): smallest ID first (already interleaved by star rating).
    const aiPool = reviews
      .filter((r) => r.id >= 151)
      .sort((a, b) => a.id - b.id);
    const staticPool = reviews.filter((r) => r.id < 151);

    const staticNeeded = Math.max(0, SHOW_COUNT - aiPool.length);
    const initial = [...aiPool.slice(0, SHOW_COUNT), ...staticPool.slice(0, staticNeeded)];

    const seen = new Set<number>();
    setShown(initial.filter((r) => {
      if (seen.has(r.id)) return false;
      seen.add(r.id);
      return true;
    }));

    deckRef.current = [...aiPool.slice(SHOW_COUNT), ...staticPool.slice(staticNeeded)];
  }, [reviews]);

  const handleShuffle = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setShown((prev) => {
        let deck = deckRef.current;

        // When deck runs out, cycle back through static reviews (AI exhausted by then).
        if (deck.length < SHOW_COUNT) {
          const shownIds = new Set(prev.map((r) => r.id));
          const remaining = reviews.filter((r) => r.id < 151 && !shownIds.has(r.id));
          deck = [...deck, ...remaining];
        }

        const next = deck.slice(0, SHOW_COUNT);
        deckRef.current = deck.slice(SHOW_COUNT);
        return next;
      });
      setAnimating(false);
    }, 300);
  }, [reviews]);

  const isLoading = shown.length === 0;

  return (
    <div>
      {fetchError && (
        <p className="text-xs text-amber-600 text-center mb-3">
          Could not load AI reviews — showing static reviews only.
        </p>
      )}

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity duration-300 ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      >
        {isLoading
          ? Array.from({ length: SHOW_COUNT }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 h-52 animate-pulse">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="w-5 h-5 rounded bg-gray-200" />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="h-3 bg-gray-200 rounded w-4/6" />
                </div>
                <div className="mt-6 h-10 bg-gray-200 rounded-xl w-full" />
              </div>
            ))
          : shown.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleShuffle}
          disabled={animating || isLoading}
          className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-emerald-600 text-emerald-700 font-semibold text-sm hover:bg-emerald-50 transition-colors cursor-pointer disabled:opacity-40"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Show different reviews
        </button>
      </div>
    </div>
  );
}
