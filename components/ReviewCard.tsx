"use client";

import { useState } from "react";
import type { ResolvedReview } from "@/data/reviews";
import { GOOGLE_REVIEW_URL } from "@/data/reviews";

export default function ReviewCard({ review }: { review: ResolvedReview }) {
  const [status, setStatus] = useState<"idle" | "copied">("idle");

  function handleCopy() {
    // 1. Copy synchronously via execCommand — no await, no focus loss, works before window.open.
    const el = document.createElement("textarea");
    el.value = review.text;
    el.style.cssText = "position:fixed;opacity:0;pointer-events:none;";
    document.body.appendChild(el);
    el.focus();
    el.select();
    try { document.execCommand("copy"); } catch { /* ignore */ }
    document.body.removeChild(el);

    // 2. Modern clipboard API as a silent async upgrade (best-effort, no await).
    navigator.clipboard?.writeText(review.text).catch(() => {});

    // 3. Open Google Maps — still within the click gesture since no await happened above.
    window.open(GOOGLE_REVIEW_URL, "_blank");

    setStatus("copied");
    setTimeout(() => setStatus("idle"), 1500);

    // 4. Record as used — fire-and-forget.
    fetch("/api/reviews/used", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: review.id, text: review.text }),
    }).catch(() => {});
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-1">
        {Array.from({ length: review.stars }).map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {Array.from({ length: 5 - review.stars }).map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-gray-200"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <p className="text-gray-700 text-sm leading-relaxed flex-1">{review.text}</p>

      <button
        onClick={handleCopy}
        disabled={status === "copied"}
        className={`mt-1 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer
          ${
            status === "copied"
              ? "bg-green-500 text-white"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
      >
        {status === "copied" ? "✓ Copied! Opening Google…" : "Copy & Leave Review"}
      </button>
    </div>
  );
}
