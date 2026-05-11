import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
    {
        quote: "Synthesized core architectural requirements with precision. Dinesh demonstrates elite proficiency in deconstructing complex business logic into scalable system solutions.",
        author: "Sarah Jenkins",
        role: "CTO_SYSTEM_ARCH",
        modId: "LOG_01"
    },
    {
        quote: "Deployment integrity is exceptional. The attention to interactive latency and visual parity across digital modules is truly world-class development.",
        author: "Mike Chen",
        role: "FOUNDER_DEVSCALE",
        modId: "LOG_02"
    },
    {
        quote: "Optimized deployment pipeline for accelerated delivery. Zero build failures encountered during the integration phase. Highly efficient execution.",
        author: "Alex Rivera",
        role: "PM_TECH_CORP",
        modId: "LOG_03"
    },
    {
        quote: "Architected the cleanest structural logic encountered this cycle. Modular design enables elastic scalability across all production environments.",
        author: "David Kim",
        role: "SR_ENGINE_SPACEX",
        modId: "LOG_04"
    }
];

export default function TestimonialsSection() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="py-24 bg-black overflow-hidden relative">
            <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black z-10 pointer-events-none" />

            {/* Grid Decor - Matching site-wide pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-20 mb-20">
                {/* HUD Header Prompts */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <span className="w-12 h-px bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                        <h2 className="font-mono text-[0.6rem] tracking-widest lowercase flex items-center gap-2">
                            <span className="text-purple-400">await</span>
                            <span className="text-blue-400">sys</span>
                            <span className="text-white/40">.</span>
                            <span className="text-cyan-400">fetch_feedback</span>
                            <span className="text-white/40">(</span>
                            <span className="text-emerald-400">"EXT_LOGS"</span>
                            <span className="text-white/40">)</span>
                        </h2>
                    </div>

                    <h1 className="text-[2.75rem] md:text-8xl font-black mb-8 tracking-tighter uppercase italic text-white leading-none">
                        Validation <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/40 to-transparent">TRACES.</span>
                    </h1>
                </motion.div>
            </div>

            <div className={`relative flex ${isMobile ? 'overflow-x-auto snap-x snap-mandatory scrollbar-hide' : 'overflow-x-hidden group'}`}>
                <motion.div
                    className="flex gap-8"
                    animate={isMobile ? {} : { x: ["0%", "-50%"] }}
                    transition={isMobile ? {} : { repeat: Infinity, ease: "linear", duration: 40 }}
                    style={{ display: "flex", width: "max-content" }}
                >
                    {[...testimonials, ...testimonials].map((item, i) => (
                        <motion.div
                            key={i}
                            whileTap={isMobile ? {} : { scale: 0.98 }}
                            className="w-[300px] md:w-[450px] p-8 md:p-10 rounded-4xl md:rounded-[2.5rem] bg-white/3 border border-white/10 shrink-0 relative group/card transition-all duration-700 hover:border-cyan-500/30 hover:bg-white/5 gpu-layer snap-center"
                        >
                            {/* HUD Brackets */}
                            <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-white/10 rounded-tl-[2.5rem] group-hover/card:border-cyan-500/50 transition-colors" />
                            <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-white/10 rounded-br-[2.5rem] group-hover/card:border-purple-500/50 transition-colors" />

                            <div className="flex justify-between items-center mb-8">
                                <span className="text-[0.6rem] font-mono text-white/30 tracking-[0.2em] font-bold">:: SOURCE_LOG // {item.modId}</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[0.54rem] font-mono text-emerald-400/80 tracking-widest uppercase font-black">Verified: True</span>
                                </div>
                            </div>

                            <p className="text-gray-100 text-xl mb-12 leading-relaxed tracking-tight font-light italic">
                                <span className="text-cyan-500 font-bold not-italic mr-2">"</span>
                                {item.quote}
                                <span className="text-purple-500 font-bold not-italic ml-2">"</span>
                            </p>

                            <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                                <div className="w-12 h-12 bg-linear-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 rounded-2xl flex items-center justify-center text-xl font-black text-white italic">
                                    {item.author[0]}
                                </div>
                                <div>
                                    <h4 className="font-black text-white text-lg tracking-tighter uppercase italic leading-none mb-1">{item.author}</h4>
                                    <p className="text-[0.55rem] font-mono text-cyan-400 tracking-[0.2em] uppercase font-bold opacity-60 group-hover/card:opacity-100 transition-opacity">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
