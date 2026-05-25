import { GoogleGenerativeAI } from "@google/generative-ai";

export type RawAiReview = {
  stars: 4 | 5;
  text: string;
};

const AI_COUNT = 15;

const PROMPT = `You are generating Google reviews for Mayweed Remedies, an online wellness and remedy products store.

About the store:
- Sells wellness, health, and remedy products online
- Easy-to-use website with clear product descriptions and smooth checkout
- Reliable packaging — products arrive properly sealed and undamaged
- Timely delivery with status updates throughout the process
- Responsive customer support that handles queries politely and clearly

Write exactly ${AI_COUNT} Google reviews as if real customers wrote them after shopping online. Each review must be unique — different angle, different focus, different length. Return only a JSON array:
[
  { "stars": 5, "text": "..." },
  { "stars": 5, "text": "..." },
  { "stars": 4, "text": "..." },
  ...
]

Rules:
- Standard clear English — complete sentences, no casual slang
- Focus on: website experience, ordering process, packaging quality, delivery, product descriptions, customer support — spread across reviews, not every review covers all topics
- No em dashes, no AI vocabulary (seamless, pivotal, delve, heartwarming, transformative, etc.)
- Stars must be 4 or 5 only — roughly 12 fives and 3 fours
- Each review is 1-2 sentences; occasionally 3 sentences for variety
- Do not repeat the same phrases or sentence structures across reviews

Return only the JSON array, no explanation, no markdown code block.`;

export async function generateAiReviews(): Promise<RawAiReview[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 1.2,
    },
  });

  const result = await model.generateContent(PROMPT);
  const parsed = JSON.parse(result.response.text().trim()) as RawAiReview[];

  if (!Array.isArray(parsed) || parsed.length !== AI_COUNT) {
    throw new Error(`Expected ${AI_COUNT} reviews, got ${parsed.length}`);
  }

  const valid = parsed.every(
    (r) =>
      (r.stars === 4 || r.stars === 5) &&
      typeof r.text === "string" &&
      r.text.length > 0
  );
  if (!valid) throw new Error("Invalid review data from Gemini");

  return parsed;
}
