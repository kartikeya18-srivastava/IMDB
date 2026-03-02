import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchReviews(imdbId: string): Promise<string[]> {
    const { data: html } = await axios.get(
        `https://www.imdb.com/title/${imdbId}/reviews`,
        {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
            },
        }
    );

    const $ = cheerio.load(html);
    const reviews: string[] = [];

    $("div.text.show-more__control").each((_i, el) => {
        const text = $(el).text().trim();
        if (text.length > 20) {
            reviews.push(text);
        }
    });

    if (reviews.length === 0) {
        // Fallback: try alternative selectors
        $("[class*='ipc-html-content-inner-div']").each((_i, el) => {
            const text = $(el).text().trim();
            if (text.length > 20) {
                reviews.push(text);
            }
        });
    }

    if (reviews.length === 0) {
        throw new Error("No reviews found for this movie");
    }

    // Return up to 20 reviews to keep the AI prompt manageable
    return reviews.slice(0, 20);
}
