export interface Movie {
    title: string;
    poster: string;
    year: string;
    rating: string;
    cast: string[];
    plot: string;
}

export type SentimentClassification = "Positive" | "Mixed" | "Negative";

export interface Sentiment {
    summary: string;
    themes: string[];
    classification: SentimentClassification;
}

export interface AnalysisResponse {
    success: boolean;
    data: {
        movie: Movie;
        sentiment: Sentiment;
        reviewCount: number;
    };
    message?: string;
}
