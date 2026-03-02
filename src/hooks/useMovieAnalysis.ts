"use client";

import { useState } from "react";
import type { Movie, Sentiment, AnalysisResponse } from "@/types";

interface UseMovieAnalysisReturn {
    movie: Movie | null;
    sentiment: Sentiment | null;
    reviewCount: number;
    loading: boolean;
    error: string | null;
    analyze: (imdbId: string) => Promise<void>;
    reset: () => void;
}

export const useMovieAnalysis = (): UseMovieAnalysisReturn => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [sentiment, setSentiment] = useState<Sentiment | null>(null);
    const [reviewCount, setReviewCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyze = async (imdbId: string) => {
        setLoading(true);
        setError(null);
        setMovie(null);
        setSentiment(null);

        try {
            const res = await fetch(`/api/movie/${imdbId}`);
            const data: AnalysisResponse = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Something went wrong");
            }

            setMovie(data.data.movie);
            setSentiment(data.data.sentiment);
            setReviewCount(data.data.reviewCount);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setMovie(null);
        setSentiment(null);
        setReviewCount(0);
        setError(null);
    };

    return { movie, sentiment, reviewCount, loading, error, analyze, reset };
};
