"use client";

import { motion } from "framer-motion";
import type { Sentiment } from "@/types";

interface SentimentCardProps {
    sentiment: Sentiment;
    reviewCount: number;
}

const classificationConfig = {
    Positive: {
        color: "from-emerald-500/20 to-green-500/20",
        border: "border-emerald-500/30",
        text: "text-emerald-400",
        badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        icon: "🎉",
    },
    Mixed: {
        color: "from-amber-500/20 to-yellow-500/20",
        border: "border-amber-500/30",
        text: "text-amber-400",
        badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        icon: "🤔",
    },
    Negative: {
        color: "from-red-500/20 to-rose-500/20",
        border: "border-red-500/30",
        text: "text-red-400",
        badge: "bg-red-500/20 text-red-300 border-red-500/30",
        icon: "😞",
    },
};

const SentimentCard = ({ sentiment, reviewCount }: SentimentCardProps) => {
    const config = classificationConfig[sentiment.classification];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className={`bg-gradient-to-br ${config.color} backdrop-blur-xl border ${config.border} rounded-3xl p-8 shadow-2xl`}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-3"
                >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">
                            AI Sentiment Analysis
                        </h3>
                        <p className="text-sm text-gray-400">
                            Based on {reviewCount} audience reviews
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    className={`px-4 py-2 rounded-xl border font-semibold text-lg ${config.badge}`}
                >
                    {config.icon} {sentiment.classification}
                </motion.div>
            </div>

            {/* Summary */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-6"
            >
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Summary
                </h4>
                <p className="text-gray-200 leading-relaxed text-lg">
                    {sentiment.summary}
                </p>
            </motion.div>

            {/* Themes */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Key Themes
                </h4>
                <div className="flex flex-wrap gap-2">
                    {sentiment.themes.map((theme, i) => (
                        <motion.span
                            key={theme}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9 + i * 0.1, duration: 0.3 }}
                            className={`px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm ${config.text} font-medium`}
                        >
                            {theme}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SentimentCard;
