"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewsCardProps {
    reviews: string[];
}

const ReviewsCard = ({ reviews }: ReviewsCardProps) => {
    const [expanded, setExpanded] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);

    const displayedReviews = showAll ? reviews : reviews.slice(0, 5);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-3"
                >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <svg
                            className="w-5 h-5 text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">
                            Audience Reviews
                        </h3>
                        <p className="text-sm text-gray-400">
                            {reviews.length} reviews scraped from IMDb
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Reviews List */}
            <div className="space-y-3">
                <AnimatePresence mode="sync">
                    {displayedReviews.map((review, i) => {
                        const isExpanded = expanded === i;
                        const isLong = review.length > 300;
                        const displayText =
                            isLong && !isExpanded ? review.slice(0, 300) + "..." : review;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + i * 0.05, duration: 0.3 }}
                                className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/[0.07] transition-colors"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-blue-300">
                                            {i + 1}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {displayText}
                                        </p>
                                        {isLong && (
                                            <button
                                                onClick={() =>
                                                    setExpanded(isExpanded ? null : i)
                                                }
                                                className="text-blue-400 hover:text-blue-300 text-xs font-medium mt-2 transition-colors"
                                            >
                                                {isExpanded ? "Show less" : "Read more"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Show More / Less */}
            {reviews.length > 5 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-4 text-center"
                >
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white rounded-xl text-sm font-medium transition-all"
                    >
                        {showAll
                            ? "Show fewer reviews"
                            : `Show all ${reviews.length} reviews`}
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ReviewsCard;
