import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ message, isVisible, onClose, type = "info" }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed top-24 left-1/2 transform -translate-x-1/2 z-100"
                >
                    <div className="flex items-center gap-3 px-6 py-3 bg-black/90 backdrop-blur-sm border border-white/10 rounded-full shadow-lg group">
                        <span className="text-xl">
                            {type === "success" ? "🚀" : type === "error" ? "❌" : "✨"}
                        </span>
                        <span className="text-white font-medium text-sm whitespace-nowrap">
                            {message}
                        </span>
                        <button
                            onClick={onClose}
                            className="ml-2 text-gray-400 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
