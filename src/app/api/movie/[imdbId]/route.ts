import { NextResponse } from "next/server";
import { z } from "zod";
import { fetchMovieDetails } from "@/lib/omdb";
import { fetchReviews } from "@/lib/reviews";
import { analyzeSentiment } from "@/lib/ai";

const paramsSchema = z.object({
    imdbId: z
        .string()
        .regex(/^tt\d{7,8}$/, "Invalid IMDb ID format (e.g. tt0133093)"),
});

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ imdbId: string }> }
) {
    try {
        const resolved = await params;
        const parsed = paramsSchema.safeParse(resolved);

        if (!parsed.success) {
            return NextResponse.json(
                { success: false, message: parsed.error.issues[0].message },
                { status: 400 }
            );
        }

        const { imdbId } = parsed.data;

        // Fetch movie details and reviews in parallel
        const [movie, reviews] = await Promise.all([
            fetchMovieDetails(imdbId),
            fetchReviews(imdbId),
        ]);

        // Analyze sentiment from reviews
        const sentiment = await analyzeSentiment(reviews);

        return NextResponse.json({
            success: true,
            data: {
                movie,
                sentiment,
                reviews,
                reviewCount: reviews.length,
            },
        });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Internal Server Error";
        const status = message.includes("not found") ? 404 : 500;

        return NextResponse.json(
            { success: false, message },
            { status }
        );
    }
}
