"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
    onSearch: (imdbId: string) => void;
    loading: boolean;
}

const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
    const [input, setInput] = useState("");
    const [shake, setShake] = useState(false);

    const isValid = /^tt\d{7,8}$/.test(input.trim());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }
        onSearch(input.trim());
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xl mx-auto"
        >
            <div className="relative flex items-center">
                <div className="absolute left-4 text-amber-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter IMDb ID (e.g. tt0133093)"
                    disabled={loading}
                    className="w-full pl-12 pr-32 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 text-lg"
                />
                <motion.button
                    type="submit"
                    disabled={loading || !input.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                            Analyzing...
                        </div>
                    ) : (
                        "Analyze"
                    )}
                </motion.button>
            </div>
            {input.trim() && !isValid && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 ml-4"
                >
                    Format: tt followed by 7-8 digits (e.g. tt0133093)
                </motion.p>
            )}
        </motion.form>
    );
};

export default SearchBar;
