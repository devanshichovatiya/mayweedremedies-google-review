# Deployment Guide — Mayweed Remedies Google Review Helper

## Prerequisites

- Node.js 18+
- An **Upstash Redis** account (for AI review caching)
- A **Google Gemini API key** (for AI review generation)

---

## 1. Environment Variables

Create a `.env.local` file in the project root (never commit this file):

```env
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
GEMINI_API_KEY=your-gemini-api-key
```

### Getting these values

**Upstash Redis**
1. Go to [console.upstash.com](https://console.upstash.com) → Create Database → choose a region close to your deployment
2. Open the database → REST API tab → copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
3. The free tier is sufficient for this app's traffic

**Gemini API Key**
1. Go to [aistudio.google.com](https://aistudio.google.com) → Get API key
2. The app uses `gemini-2.5-flash` — the free quota is more than enough for occasional admin-triggered generation

---

## 2. Set the Google Review URL

Before going live, update `data/reviews.ts` with the client's Google Business Profile short link:

```ts
export const GOOGLE_REVIEW_URL = "https://g.page/r/XXXXXXXXXX/review";
```

The client can get this link from:
**business.google.com → Home → Get more reviews → copy the short URL**

---

## 3. Deploy to Vercel (Recommended)

This is a Next.js App Router project — Vercel is the zero-config option.

**Option A — CLI:**
```bash
npm i -g vercel
vercel
```

**Option B — Dashboard:**
Connect the GitHub repo at [vercel.com/new](https://vercel.com/new), import the repo, and deploy.

**Set environment variables in Vercel:**
Dashboard → Project → Settings → Environment Variables → add all three from step 1.

---

## 4. Build & Run Manually (Self-hosted / VPS)

```bash
npm ci
npm run build
npm start
```

The app listens on port 3000 by default. Put Nginx or Caddy in front for HTTPS.

**Minimal Nginx config:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;
    # ssl_certificate / ssl_certificate_key ...

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 5. Before Going Live

Remove the `allowedDevOrigins` line from `next.config.ts` — it was only needed for LAN testing:

```diff
-  allowedDevOrigins: ["192.168.0.110"],
```

---

## 6. Post-Deploy Checklist

- [ ] Visit the live URL — cards load, shuffle works, "Copy & Leave Review" opens Google Maps
- [ ] Test on a real Android phone — the Google Maps app should open (not just the browser)
- [ ] Visit `/admin-create` — generate a batch of AI reviews to pre-populate the cache
- [ ] Confirm the Google review URL is correctly set in `data/reviews.ts`

---

## 7. API Routes Reference

| Route | Method | Purpose |
|---|---|---|
| `/api/reviews/generate` | `GET` | Check how many AI reviews are currently cached |
| `/api/reviews/generate` | `POST` | Generate 15 new AI reviews via Gemini and store in Redis |
| `/api/reviews/used` | `POST` | Mark a review as used (called automatically on copy) |
| `/admin-create` | page | Admin UI for triggering generation and viewing cache status |

---

## 8. QR Code

Generate a QR code pointing to your live domain (e.g. `https://yourdomain.com`).

A free option: [qr-code-generator.com](https://www.qr-code-generator.com)

Print it at A5 or A6 size and place it at the counter or billing desk.
