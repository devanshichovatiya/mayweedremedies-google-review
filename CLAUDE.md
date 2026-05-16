<!-- BEGIN:nextjs-agent-rules -->
 
# Next.js: ALWAYS read docs before coding
 
Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.
 
<!-- END:nextjs-agent-rules -->

---

# Project: Mayweed Remedies — Google Review Helper

## What this app does

A single-page Next.js app for a homeopathic pharmacy in Vadodara, Gujarat. Customers scan a QR code at the shop, land on this page, pick a pre-written review, tap "Copy & Leave Review", the text is copied to their clipboard, and they are redirected to the Google Maps listing to paste and submit.

The goal is to make leaving a Google review effortless for customers who wouldn't normally type one out.

---

## Tech stack

- **Next.js 16.3.0-canary.21** — App Router, Turbopack
- **React 19.2.6** — Server + Client Components
- **Tailwind CSS v4** — `@import "tailwindcss"` syntax (not v3 config)
- **TypeScript** — `moduleResolution: "bundler"`

---

## Key files

| File | Purpose |
|---|---|
| `app/page.tsx` | Main page — server component, 4-step instruction banner, renders ReviewGrid |
| `app/layout.tsx` | Root layout, sets title to "Mayweed Remedies" |
| `components/ReviewGrid.tsx` | Client component — deck-based shuffle, shows 4 cards at a time |
| `components/ReviewCard.tsx` | Client component — copy button, clipboard, opens Google Maps |
| `data/reviews.ts` | All review data — 50 reviews × 3 variants each = 150 unique texts |
| `next.config.ts` | Turbopack root fix, allowedDevOrigins for LAN testing |

---

## Review data design

Each review has 3 `variants` (alternate phrasings of the same sentiment). `resolveVariant()` picks one randomly at display time. This gives 150 unique texts across 50 review IDs.

Reviews are written in natural Indian English — short sentences, "Sir" used naturally, Gotri area mentions, no em dashes, no AI vocabulary patterns. Three categories:
- **Short casual** (IDs 1–20): 1–2 sentences, quick impressions
- **Medium** (IDs 21–40): 3–4 sentences, specific visit stories
- **Loyalty** (IDs 41–50): returning customers, family use, referrals

---

## ReviewGrid shuffle logic

- Initialises in `useEffect` (not `useState`) to avoid hydration mismatch from `Math.random()` running on both server and client
- Uses `useRef<Review[]>` as a deck — reviews cycle through all 50 before any repeat
- Deck is read/written inside the `setState` callback to avoid stale closures
- Shows skeleton loading cards while the initial state is empty (SSR → hydration gap)

---

## Google Review redirect

### Current URL
```
https://maps.google.com/?cid=3724387094041692977
```

The CID (`3724387094041692977`) is the decimal form of `0x33afae5452678b31` from the original Google Maps URL.

### Why this URL
- The original `#lrd=...,3,,,,` Google Search URL works on desktop but on mobile Chrome the review popup does not trigger — users just see search results
- The Maps CID URL opens the business listing directly; on Android it often opens the Google Maps app where "Write a review" is one tap away
- The ideal URL is `https://g.page/r/XXXXX/review` from the Google Business Profile dashboard — this opens the write-review dialog directly on both mobile and desktop. **The client needs to get this from business.google.com → "Get more reviews" and provide it.**

### How to update the URL
Once the client provides the GBP link, update `data/reviews.ts`:
```ts
export const GOOGLE_REVIEW_URL = "https://g.page/r/XXXXX/review";
```

---

## Known bugs fixed

| Bug | Cause | Fix |
|---|---|---|
| Hydration mismatch | `Math.random()` in `useState` initial value ran on server and client giving different results | Moved init to `useEffect`, added skeleton loading UI |
| TypeScript build error in `types/validator.ts` | Next.js canary detected wrong workspace root (found parent `package-lock.json`) | Fixed import paths from `../../app/` to `../app/`, added `turbopack.root: path.resolve(__dirname)` |
| Mobile popup blocked | `window.open()` called inside `setTimeout` (1s delay) breaks mobile browser popup policy | Moved `window.open()` to fire immediately on button click, before the async clipboard operation |
| Cross-origin dev warning | Testing on phone (192.168.0.110) over LAN | Added `allowedDevOrigins: ["192.168.0.110"]` to `next.config.ts` |
| Wrong Google review URL | Original URL had `,1,` action (view reviews) not `,3,` (write review), also had expired `sxsrf` token | Used browser automation to discover `,3,` triggers the write-review dialog |

---

## Pending

- [ ] Get the `g.page/r/.../review` link from client's Google Business Profile dashboard and update `GOOGLE_REVIEW_URL` in `data/reviews.ts`