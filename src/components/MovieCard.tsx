"use client";

import { motion } from "framer-motion";
import type { Movie } from "@/types";

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
            <div className="flex flex-col md:flex-row">
                {/* Poster */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="md:w-80 shrink-0"
                >
                    <img
                        src={movie.poster !== "N/A" ? movie.poster : "/placeholder.png"}
                        alt={movie.title}
                        className="w-full h-full object-cover min-h-[400px]"
                    />
                </motion.div>

                {/* Details */}
                <div className="p-8 flex flex-col justify-center gap-5 flex-1">
                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-white leading-tight"
                    >
                        {movie.title}
                    </motion.h2>

                    {/* Year & Rating */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex items-center gap-4"
                    >
                        <span className="px-3 py-1 bg-white/10 rounded-lg text-gray-300 text-sm font-medium">
                            {movie.year}
                        </span>
                        <div className="flex items-center gap-1.5">
                            <svg
                                className="w-5 h-5 text-amber-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-amber-400 font-bold text-lg">
                                {movie.rating}
                            </span>
                            <span className="text-gray-400 text-sm">/10</span>
                        </div>
                    </motion.div>

                    {/* Cast */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            Cast
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {movie.cast.map((actor, i) => (
                                <motion.span
                                    key={actor}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                                    className="px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/20 rounded-full text-sm text-purple-200"
                                >
                                    {actor}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Plot */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            Plot
                        </h3>
                        <p className="text-gray-300 leading-relaxed">{movie.plot}</p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default MovieCard;
