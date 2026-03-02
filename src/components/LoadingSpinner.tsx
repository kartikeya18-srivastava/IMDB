"use client";

import { motion } from "framer-motion";

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-6">
            {/* Animated film reel */}
            <div className="relative">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-amber-400/30 border-t-amber-400 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-amber-400 rounded-full" />
                </div>
            </div>

            {/* Animated text */}
            <div className="text-center">
                <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xl font-semibold text-white"
                >
                    Analyzing movie...
                </motion.p>
                <p className="text-gray-400 mt-2 text-sm">
                    Fetching details, scraping reviews &amp; running AI analysis
                </p>
            </div>

            {/* Progress steps */}
            <div className="flex flex-col gap-3 mt-4">
                {[
                    "Fetching movie details",
                    "Scraping audience reviews",
                    "Running AI sentiment analysis",
                ].map((step, i) => (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 1.5, duration: 0.5 }}
                        className="flex items-center gap-3"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                                delay: i * 1.5,
                                duration: 1,
                                repeat: Infinity,
                                repeatDelay: 3,
                            }}
                            className="w-2 h-2 bg-amber-400 rounded-full"
                        />
                        <span className="text-gray-300 text-sm">{step}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LoadingSpinner;
