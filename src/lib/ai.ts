import OpenAI from "openai";
import type { Sentiment } from "@/types";

function getClient(): OpenAI {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        throw new Error("OPENAI_API_KEY is not configured");
    }

    return new OpenAI({
        apiKey,
        baseURL: "https://openrouter.ai/api/v1",
    });
}

export async function analyzeSentiment(
    reviews: string[]
): Promise<Sentiment> {
    const client = getClient();

    const reviewBlock = reviews
        .map((r, i) => `Review ${i + 1}: ${r}`)
        .join("\n\n");

    const completion = await client.chat.completions.create({
        model: "openai/gpt-4o-mini",
        temperature: 0.3,
        response_format: { type: "json_object" },
        messages: [
            {
                role: "system",
                content: `You are a film critic AI. Analyze audience reviews and return a JSON object with exactly these fields:
- "summary": A concise 2-3 sentence summary of the overall audience sentiment.
- "themes": An array of 3-5 recurring themes or topics mentioned across reviews (e.g. "strong performances", "slow pacing").
- "classification": Exactly one of "Positive", "Mixed", or "Negative" based on the overall tone.

Return ONLY valid JSON, no markdown or extra text.`,
            },
            {
                role: "user",
                content: `Analyze the following ${reviews.length} audience reviews:\n\n${reviewBlock}`,
            },
        ],
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
        throw new Error("AI returned an empty response");
    }

    const parsed = JSON.parse(content) as Sentiment;

    if (!parsed.summary || !parsed.themes || !parsed.classification) {
        throw new Error("Incomplete AI response");
    }

    return {
        summary: parsed.summary,
        themes: parsed.themes,
        classification: parsed.classification,
    };
}
