"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import type { Review, ResolvedReview } from "@/data/reviews";
import { resolveVariant } from "@/data/reviews";

const SHOW_COUNT = 4;

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

type Props = {
  reviews: Review[];        // 50 static reviews for the shuffle fallback deck
  aiReviews: ResolvedReview[]; // 15 AI reviews baked in from the server (may be empty)
};

export default function ReviewGrid({ reviews, aiReviews }: Props) {
  const [shown, setShown] = useState<ResolvedReview[]>([]);
  const [animating, setAnimating] = useState(false);

  // Two decks: AI reviews first, then static reviews
  const aiDeckRef = useRef<ResolvedReview[]>([]);
  const staticDeckRef = useRef<Review[]>([]);

  useEffect(() => {
    const shuffledAi = shuffle(aiReviews);
    const shuffledStatic = shuffle(reviews);

    // Show first 4 AI reviews (or static if no AI available)
    if (shuffledAi.length >= SHOW_COUNT) {
      setShown(shuffledAi.slice(0, SHOW_COUNT));
      aiDeckRef.current = shuffledAi.slice(SHOW_COUNT);
    } else {
      setShown(shuffledStatic.slice(0, SHOW_COUNT).map(resolveVariant));
      aiDeckRef.current = [];
    }

    staticDeckRef.current = shuffledStatic;
  }, [aiReviews, reviews]);

  const handleShuffle = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setShown((prev) => {
        // Drain AI deck first
        if (aiDeckRef.current.length >= SHOW_COUNT) {
          const next = aiDeckRef.current.slice(0, SHOW_COUNT);
          aiDeckRef.current = aiDeckRef.current.slice(SHOW_COUNT);
          return next;
        }

        // Fall through to static reviews
        let deck = staticDeckRef.current;
        if (deck.length < SHOW_COUNT) {
          const visibleIds = new Set(prev.map((r) => r.id));
          const refill = shuffle(reviews.filter((r) => !visibleIds.has(r.id)));
          deck = [...deck, ...refill];
        }
        const next = deck.slice(0, SHOW_COUNT).map(resolveVariant);
        staticDeckRef.current = deck.slice(SHOW_COUNT);
        return next;
      });
      setAnimating(false);
    }, 300);
  }, [reviews]);

  const isLoading = shown.length === 0;

  return (
    <div>
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
