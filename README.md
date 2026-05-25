# Mayweed Remedies — Google Review Helper

A single-page Next.js app for a homeopathic pharmacy in Vadodara, Gujarat. Customers scan a QR code at the shop, pick a pre-written review, tap "Copy & Leave Review" — the text copies to their clipboard and Google Maps opens so they can paste and submit.

---

## Tech stack

- **Next.js 16.3.0-canary.21** — App Router, Turbopack, ISR
- **React 19** — Server + Client Components
- **Tailwind CSS v4** — `@import "tailwindcss"` syntax
- **Gemini 2.5 Flash** — AI-generated reviews, baked in at build time via ISR
- **TypeScript**

---

## Getting started

```bash
npm install
npm run dev
```

Requires a `.env.local` file:

```
GEMINI_API_KEY=your_key_here
```

---

## How it works

1. On each ISR cycle (every 45 minutes), the server calls Gemini to generate 15 fresh AI reviews and bakes them into the cached HTML.
2. The client shuffles and shows 4 cards at a time — AI reviews first, then static fallbacks from `data/reviews.ts`.
3. Tapping "Copy & Leave Review" opens Google Maps and copies the text in one gesture (no `setTimeout` — required by mobile popup policy).

---

## Key files

| File | Purpose |
|---|---|
| `app/page.tsx` | Server component — calls Gemini, renders layout + ReviewGrid |
| `app/layout.tsx` | Root layout, sets page title |
| `components/ReviewGrid.tsx` | Client component — deck shuffle, shows 4 cards |
| `components/ReviewCard.tsx` | Client component — copy button, opens Google Maps |
| `data/reviews.ts` | 50 static reviews × 3 variants each + `GOOGLE_REVIEW_URL` |
| `lib/gemini.ts` | Gemini API call — returns 15 `ResolvedReview` objects |

---

## Updating the Google review URL

Once the client provides their Google Business Profile link (from business.google.com → "Get more reviews"), update `data/reviews.ts`:

```ts
export const GOOGLE_REVIEW_URL = "https://g.page/r/XXXXX/review";
```

The current URL uses a CID-based Maps link which works but doesn't open the review dialog directly on all devices.

---

## Deploying

```bash
npm run build
npm run start
```

Works on any Node.js host. Vercel is recommended for ISR support out of the box.
