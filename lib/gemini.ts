import { GoogleGenerativeAI } from "@google/generative-ai";

export type RawAiReview = {
  stars: 4 | 5;
  text: string;
};

const AI_COUNT = 15;

const PROMPT = `You are generating Google reviews for Mayweed Remedies, a homeopathic pharmacy in the Gotri area of Vadodara, Gujarat, India.

About the shop:
- Small, clean, well-stocked homeopathic medicine store near Gotri road, Vadodara
- Owner is very knowledgeable, listens carefully before suggesting medicines
- Fair prices, no upselling, honest service
- Many loyal customers who bring their whole families
- Fast service, medicines always in stock

Write exactly ${AI_COUNT} Google reviews in natural Indian English, as if real customers wrote them. Each review must be unique — different sentiment, different angle, different length. Return only a JSON array:
[
  { "stars": 5, "text": "..." },
  { "stars": 5, "text": "..." },
  { "stars": 4, "text": "..." },
  ...
]

Rules:
- Natural Indian English (how Indians actually type in English)
- "Sir" used naturally for the owner
- Short sentences, no flowery language
- Mention Gotri area, Vadodara, family, medicines, service — spread across reviews, not every one
- No em dashes, no AI vocabulary (seamless, pivotal, delve, heartwarming, etc.)
- Stars must be 4 or 5 only — roughly 12 fives and 3 fours
- Mix of lengths: some 1 sentence, some 2-3 sentences, some 3-4 sentences

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
