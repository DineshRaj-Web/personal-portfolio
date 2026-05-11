import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

export default function CallToActionSection() {
    const [isHovered, setIsHovered] = useState(false);
    const [activeCard, setActiveCard] = useState(null);
    const ref = useRef(null);

    const handleMouseEnter = (cardIndex) => setActiveCard(cardIndex);
    const handleMouseLeave = () => setActiveCard(null);

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
                {/* Hacker Terminal Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mb-12"
                >
                    <div className="font-mono text-green-400 text-sm mb-4">
                        <span className="animate-pulse">◆</span> FULL_STACK_ENGINE.READY
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <h1 className="text-2xl md:text-4xl font-black text-green-400 tracking-wider">
                            &gt; ./deploy --env=PRODUCTION
                        </h1>
                    </div>
                </motion.div>

                {/* Glitch Text */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-8"
                    style={{
                        textShadow: '0 0 10px rgba(0, 255, 0, 0.8)',
                        fontFamily: 'Courier New, monospace'
                    }}
                >
                    {'BUILD_COMPLETE'.split('').map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1][Math.random() > 0.5] }}
                            transition={{ duration: 0.1 }}
                            className="inline-block"
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Interactive Terminal */}
                <div className="bg-black border border-green-500/30 rounded-lg p-6 font-mono text-green-400 text-sm overflow-hidden">
                    <div className="mb-4 text-green-400">
                        <span className="animate-pulse">$</span> dev@portfolio:~# 
                        <span className="text-white">npm run deploy --prod</span>
                    </div>
                    <div className="space-y-2 text-green-400">
                        <div>$ <span className="text-white">Optimizing assets & SSR...</span></div>
                        <div>$ <span className="text-white">[■■■■■■■■■■■■■■■■] 100%</span></div>
                        <div>$ <span className="text-white">Syncing database & API...</span></div>
                        <div>$ <span className="text-green-400 animate-pulse">✓</span> <span className="text-white"> SUCCESS: Production build live</span></div>
                    </div>
                </div>

                {/* Terminal CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mt-12"
                >
                    <Link to="/contact" className="inline-block">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative px-8 py-4 bg-black border border-green-500/50 text-green-400 font-mono text-sm uppercase tracking-wider rounded overflow-hidden"
                            style={{
                                boxShadow: '0 0 20px rgba(0, 255, 0, 0.5), inset 0 0 10px rgba(0, 255, 0, 0.8)',
                                fontFamily: 'Courier New, monospace'
                            }}
                        >
                            <span className="relative z-10">
                                <span className="text-white">$</span>
                                <span className="text-green-400"> npm run contact --init</span>
                            </span>
                            <div className="absolute inset-0 bg-green-500/20 rounded animate-pulse"></div>
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Status Bar */}
                <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-green-500/50 p-2 font-mono text-xs text-green-400">
                    <span className="animate-pulse">◆</span> 
                    <span className="text-gray-400">CONNECTION: SECURE</span>
                    <span className="text-green-400"> | </span>
                    <span className="text-white">ENCRYPTION: AES-256</span>
                    <span className="text-green-400"> | </span>
                    <span className="text-white">STATUS: RUNNING</span>
                </div>
            </div>
        </section>
    );
}
