"use client";

import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import SentimentCard from "@/components/SentimentCard";
import ReviewsCard from "@/components/ReviewsCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { useMovieAnalysis } from "@/hooks/useMovieAnalysis";

export default function Home() {
    const { movie, sentiment, reviews, reviewCount, loading, error, analyze, reset } =
        useMovieAnalysis();

    const handleSearch = (imdbId: string) => {
        reset();
        analyze(imdbId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Ambient background glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-6"
                    >
                        <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                        AI-Powered Movie Analysis
                    </motion.div>

                    <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                        Movie Insight
                        <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                            {" "}Builder
                        </span>
                    </h1>

                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Enter any IMDb movie ID to get detailed movie information and
                        AI-powered audience sentiment analysis
                    </p>
                </motion.div>

                {/* Search */}
                <div className="mb-12">
                    <SearchBar onSearch={handleSearch} loading={loading} />
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <LoadingSpinner />
                        </motion.div>
                    )}

                    {error && !loading && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <ErrorMessage message={error} onRetry={reset} />
                        </motion.div>
                    )}

                    {movie && sentiment && !loading && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            <MovieCard movie={movie} />
                            <SentimentCard
                                sentiment={sentiment}
                                reviewCount={reviewCount}
                            />
                            {reviews.length > 0 && (
                                <ReviewsCard reviews={reviews} />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer */}
                {!movie && !loading && !error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-center mt-16"
                    >
                        <div className="flex flex-col items-center gap-4 text-gray-500">
                            <svg
                                className="w-16 h-16 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                                />
                            </svg>
                            <p className="text-sm">
                                Try searching for{" "}
                                <code className="px-2 py-0.5 bg-white/5 rounded text-amber-400 font-mono text-xs">
                                    tt0133093
                                </code>{" "}
                                (The Matrix) or{" "}
                                <code className="px-2 py-0.5 bg-white/5 rounded text-amber-400 font-mono text-xs">
                                    tt1375666
                                </code>{" "}
                                (Inception)
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
