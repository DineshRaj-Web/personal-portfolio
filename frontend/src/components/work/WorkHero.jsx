import { motion } from "framer-motion";

const WorkHero = () => {
    return (
        <div className="relative mb-32">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 -z-10">
                <motion.div
                    animate={{
                        background: [
                            "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
                        ],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 blur-3xl"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Terminal Subtitle */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: -10 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-3 mb-8 font-mono text-xs md:text-sm"
                >
                    <div className="flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-sm">
                        <span className="text-cyan-400">~</span>
                        <span className="text-white/40">/</span>
                        <span className="text-cyan-400">work</span>
                    </div>
                    <div className="flex items-center gap-1 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-sm">
                        <span className="text-purple-400/60">git:(</span>
                        <span className="text-purple-400 font-bold">main</span>
                        <span className="text-purple-400/60">)</span>
                    </div>
                    <span className="text-cyan-500/50 animate-pulse font-black leading-none">{">>"}</span>
                </motion.div>

                {/* Main Syntactic Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-mono font-black mb-10 leading-[1.2] tracking-tighter text-white"
                >
                    <div className="flex flex-col">
                        <div className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">Operational.trace</div>
                        <div className="text-cyan-500/40 py-1">(</div>
                        <div className="py-2">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 animate-gradient drop-shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                                Proven_Results
                            </span>
                        </div>
                        <div className="text-cyan-500/40 py-1">)</div>
                        <div className="flex items-center">
                            <span className="text-emerald-400/70">;</span>
                        </div>
                    </div>
                </motion.h1>

                {/* Technical Status Log Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="relative max-w-3xl"
                >
                    <div className="flex flex-col gap-4 font-mono">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-[0.65rem] text-emerald-400 font-bold tracking-widest uppercase">STATUS: EXECUTING_PORTFOLIO_QUERY</span>
                        </div>

                        <div className="relative pl-6">
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10" />
                            <div className="absolute left-0 top-0 h-4 w-[2px] bg-cyan-500" />

                            <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                                I don't just write code; I <span className="text-white font-bold">architect technical solutions</span> that drive performance.
                                <br />
                                Below is a curated trace of projects where I <span className="text-cyan-400">optimized complexity</span> and <span className="text-purple-400">shipped measurable value</span> across the stack.
                            </p>
                        </div>
                    </div>
                </motion.div>


            </motion.div>
        </div>
    );
};

export default WorkHero;
