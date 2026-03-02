"use client";

import { motion } from "framer-motion";

interface ErrorMessageProps {
    message: string;
    onRetry: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xl mx-auto bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6"
        >
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                    <svg
                        className="w-5 h-5 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <div className="flex-1">
                    <h4 className="text-red-300 font-semibold mb-1">
                        Something went wrong
                    </h4>
                    <p className="text-red-200/70 text-sm">{message}</p>
                </div>
                <motion.button
                    onClick={onRetry}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 rounded-xl text-sm font-medium transition-colors"
                >
                    Retry
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ErrorMessage;
