import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
    {
        id: "01",
        title: "discovery_&_strategy()",
        desc: "Synthesizing core requirements through technical discovery. Deconstructing business logic into actionable engineering constraints and target system architectures.",
        color: "from-cyan-400 to-blue-500",
        modId: "DP_INIT"
    },
    {
        id: "02",
        title: "architecture_&_logic()",
        desc: "Defining robust system schematics and design systems. Mapping out modular data flows and component relationships to ensure elastic scalability and design parity.",
        color: "from-purple-400 to-pink-500",
        modId: "SYS_ARCH"
    },
    {
        id: "03",
        title: "execution_&_sprints()",
        desc: "High-velocity development through iterative logic cycles. Utilizing automated CI/CD pipelines and rigorous unit-testing to maintain 99.9% build integrity.",
        color: "from-pink-400 to-rose-600",
        modId: "DEV_CYCLE"
    },
    {
        id: "04",
        title: "launch_&_optimize()",
        desc: "Deployment to production environments followed by real-time performance audits. Monitoring core web vitals and latency to achieve peak operational efficiency.",
        color: "from-emerald-400 to-cyan-500",
        modId: "PROD_DEPLOY"
    },
];

function ProcessCard({ step, index }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            whileTap={{ scale: 0.98 }}
            className={`relative mb-16 sm:mb-24 md:mb-32 last:mb-0 group cursor-default`}
        >
            {/* Mobile Timeline Connector */}
            <div className="md:hidden absolute left-6 top-8 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/20 via-purple-500/20 to-pink-500/20" />
            
            {/* Mobile Layout */}
            <div className="md:hidden flex gap-4">
                {/* Mobile Step Number */}
                <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl flex items-center justify-center"
                >
                    <span className="text-white font-mono text-sm font-bold">{step.id}</span>
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-20 animate-pulse`} />
                </motion.div>
                
                {/* Mobile Content */}
                <div className="flex-1 space-y-4">
                    {/* Mobile Header */}
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-[0.5rem] tracking-[0.2em] text-white/40 uppercase">
                            :: STEP_0{step.id}
                        </span>
                        <div className={`h-px flex-1 bg-gradient-to-r ${step.color} opacity-30`} />
                        <span className="font-mono text-[0.45rem] text-cyan-400/60 uppercase">
                            {step.modId}
                        </span>
                    </div>
                    
                    {/* Mobile Title */}
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase italic">
                        {step.title}
                    </h3>
                    
                    {/* Mobile Description */}
                    <p className="text-gray-200 text-sm leading-relaxed font-light">
                        {step.desc}
                    </p>
                    
                    {/* Mobile Status Bar */}
                    <div className="flex items-center gap-2 pt-2">
                        <span className="text-[0.45rem] font-mono text-cyan-400/40 uppercase tracking-widest">Integrity:</span>
                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className={`h-full bg-gradient-to-r ${step.color}`}
                            />
                        </div>
                        <span className="text-[0.45rem] font-mono text-cyan-400 font-bold">100%</span>
                    </div>
                </div>
            </div>
            
            {/* Desktop Layout */}
            <div className={`hidden md:grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 group`}>
                {/* HUD Content Side */}
                <div className={`space-y-6 ${isEven ? 'md:order-1 md:text-right' : 'md:order-2 text-left'}`}>
                    {/* Technical Index Header */}
                    <div className={`flex items-center gap-4 ${isEven ? 'justify-end' : 'justify-start'}`}>
                        {!isEven && <div className={`w-8 h-[1px] bg-gradient-to-r ${step.color} opacity-40`} />}
                        <span className="font-mono text-[0.6rem] tracking-[0.3em] text-white/30 uppercase">
                            :: STEP_0{step.id} // {step.modId}
                        </span>
                        {isEven && <div className={`w-8 h-[1px] bg-gradient-to-r ${step.color} opacity-40`} />}
                    </div>

                    <h3 className={`text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic group-hover:tracking-tight transition-all duration-700`}>
                        {step.title}
                    </h3>

                    <div className={`relative ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                        <div className={`absolute top-0 bottom-0 w-[2px] bg-gradient-to-b ${step.color} opacity-20 group-hover:opacity-100 transition-opacity duration-700 ${isEven ? '-right-1' : '-left-1'}`} />
                        <p className="text-gray-100 text-lg md:text-xl leading-relaxed tracking-tight font-light max-w-2xl">
                            {step.desc}
                        </p>
                    </div>

                    {/* Status Bar */}
                    <div className={`flex items-center gap-2 pt-4 ${isEven ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-[0.5rem] font-mono text-cyan-400/40 uppercase tracking-widest">Integrity:</span>
                        <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className={`h-full bg-gradient-to-r ${step.color}`}
                            />
                        </div>
                        <span className="text-[0.5rem] font-mono text-cyan-400 font-bold">100%</span>
                    </div>
                </div>

                {/* Visual Node Side */}
                <div className={`flex items-center justify-center relative ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="relative">
                        {/* Glowing Aura */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} blur-[50px] opacity-10 group-hover:opacity-30 transition-opacity duration-700`} />

                        {/* Core Terminal Node */}
                        <div className={`relative w-32 h-32 md:w-48 md:h-48 rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-2xl flex items-center justify-center overflow-hidden group-hover:border-white/20 transition-all duration-700`}>
                            <div className={`absolute top-0 left-0 w-8 h-8 border-t border-l border-white/10 rounded-tl-2xl`} />
                            <div className={`absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/10 rounded-br-2xl`} />

                            <span className={`text-6xl md:text-8xl font-black opacity-10 font-mono tracking-tighter text-white group-hover:opacity-40 transition-opacity duration-700`}>
                                {step.id}
                            </span>

                            <motion.div
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className={`absolute w-12 h-12 bg-gradient-to-br ${step.color} blur-xl opacity-20`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function ProcessSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

    return (
        <section ref={ref} className="py-16 sm:py-20 md:py-24 bg-black relative overflow-hidden text-white">
            {/* Grid Decor - Matching site-wide pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

                {/* HUD Header Prompts */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 sm:mb-20 md:mb-32"
                >
                    <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                        <span className="w-8 sm:w-12 h-px bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                        <h2 className="font-mono text-[0.5rem] sm:text-[0.6rem] tracking-widest lowercase flex items-center gap-1 sm:gap-2 flex-wrap">
                            <span className="text-purple-400">await</span>
                            <span className="text-blue-400">sys</span>
                            <span className="text-white/40">.</span>
                            <span className="text-cyan-400">execute_process</span>
                            <span className="text-white/40">(</span>
                            <span className="text-emerald-400">"OPTIMIZE"</span>
                            <span className="text-white/40">)</span>
                        </h2>
                    </div>

                    <h1 className="text-[2rem] sm:text-[2.75rem] md:text-6xl lg:text-9xl font-black mb-6 sm:mb-8 tracking-tighter uppercase italic text-white leading-none">
                        Deployment <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/40 to-transparent">LIFECYCLE.</span>
                    </h1>
                    <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed font-light">
                        <span className="text-cyan-400 font-bold">&gt;</span> Systematic approach to engineering excellence. Each phase optimized for maximum efficiency and minimal technical debt.
                    </p>
                </motion.div>

                {/* Mobile Progress Indicator */}
                <div className="md:hidden mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-cyan-400/60">PROCESS PROGRESS</span>
                        <span className="text-xs font-mono text-cyan-400">{Math.round(pathLength.get() * 100)}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            style={{ width: pathLength.get() * 100 + '%' }}
                            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                        />
                    </div>
                </div>

                <div className="relative z-10 flex flex-col gap-24">
                    {steps.map((step, index) => (
                        <ProcessCard key={step.id} step={step} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}
