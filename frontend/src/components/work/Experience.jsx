import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

// Extracted card component to fix React Hooks rule violation
const ExperienceCard = ({ exp, index, isMobile }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        if (isMobile) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            className="group relative"
        >
            {/* Data Point Marker */}
            <div className="absolute -left-[3.35rem] md:-left-[4.85rem] top-10 block">
                <div className="relative w-3 h-3 md:w-4 md:h-4">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full animate-pulse" />
                    <div className="relative w-full h-full border border-cyan-400/50 rounded-full bg-black flex items-center justify-center">
                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-cyan-400 rounded-full" />
                    </div>
                </div>
            </div>

            {/* HUD Experience Card */}
            <motion.div
                whileTap={{ scale: 0.98 }}
                className="relative bg-white/3 border border-white/10 rounded-4xl md:rounded-[2.5rem] p-6 md:p-14 overflow-hidden transition-all duration-1000 hover:border-white/20 gpu-layer"
            >
                {/* Liquid Reflective Spotlight */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-4xl md:rounded-[3rem] opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                ${isMobile ? '600px' : '1200px'} circle at ${isMobile ? '50%' : mouseX}px ${isMobile ? '50%' : mouseY}px,
                                rgba(255, 255, 255, 0.08),
                                rgba(6, 182, 212, 0.03) 25%,
                                transparent 60%
                            )
                        `,
                    }}
                />

                {/* Cyber Texture Layer */}
                <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] -z-10" />

                {/* Status Indicator */}
                <div className="absolute top-8 right-8 flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-[0.55rem] font-black tracking-widest text-cyan-500/50 uppercase">Connection</span>
                        <span className="text-[0.6rem] font-mono text-cyan-400/80 tracking-tighter uppercase whitespace-nowrap">V-STABLE-LINK</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
                </div>

                {/* Corner Brackets (HUD style) */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/10 rounded-tl-3xl group-hover:border-cyan-500/30 transition-colors duration-1000" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/10 rounded-br-3xl group-hover:border-purple-500/30 transition-colors duration-1000" />

                <div className="flex flex-col gap-8 md:gap-10">
                    {/* Card Header */}
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-4 text-[0.6rem] font-black tracking-[0.4em] uppercase text-gray-500">
                            <div className="flex items-center gap-2.5 px-3 py-1.5 bg-cyan-500/5 border border-white/10 rounded-full group-hover:bg-cyan-500/10 group-hover:border-cyan-500/40 transition-all duration-700">
                                <div className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                                </div>
                                <span className="text-white text-[0.6rem] font-black tracking-widest">{exp.period}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                <span className="text-gray-500 text-[0.55rem] font-black uppercase tracking-[0.4em]">SOURCE_ID: 0x{(exp.id * 16).toString(16).toUpperCase().padStart(3, '0')}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-none mb-4 group-hover:tracking-tight transition-all duration-1000">
                                {exp.role}
                            </h3>
                            <p className="text-2xl md:text-3xl font-light text-gray-400 tracking-tight flex items-center gap-4">
                                <span className="w-8 h-px bg-white/10" />
                                {exp.company}
                            </p>
                        </div>
                    </div>

                    {/* Technical Description */}
                    <div className="relative group/desc max-w-3xl">
                        <div className="absolute -left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-cyan-500/50 via-transparent to-transparent opacity-30 group-hover/desc:opacity-100 transition-opacity duration-1000" />
                        <p className="text-gray-400 text-lg leading-extra-relaxed text-justify tracking-tight font-normal">
                            {exp.description}
                        </p>
                    </div>

                    {/* Mission Results // Achievements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 pt-6 border-t border-white/5">
                        <div className="space-y-6">
                            <h4 className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-cyan-400/70 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full border-2 border-cyan-500/30 flex items-center justify-center">
                                    <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                                </span>
                                Operational Results
                            </h4>
                            <div className="space-y-3 md:space-y-4">
                                {exp.achievements.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 group/item">
                                        <span className="text-cyan-500 text-sm font-black mt-1 group-hover/item:translate-x-1 transition-transform">»</span>
                                        <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed group-hover:text-white transition-colors text-justify">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* HUD Technical Widget */}
                        <div className="hidden md:flex flex-col justify-end items-end gap-3 opacity-30 group-hover:opacity-100 transition-opacity duration-1000 text-right">
                            <div className="text-[0.5rem] font-mono text-gray-600 space-y-1">
                                <p>// DATA_LINK_ENCRYPTED</p>
                                <p>// LATENCY: 0.003ms</p>
                                <p>// SOURCE_TRACE: ENABLED</p>
                            </div>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className={`w-1 h-3 rounded-full ${i <= 3 ? 'bg-cyan-500' : 'bg-white/10'}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const experiences = [
    {
        id: 1,
        role: "Software Development",
        company: (
            <span className="flex items-center flex-wrap gap-x-3 gap-y-1">
                <a href="https://www.quartrdesign.com/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 hover:tracking-tight transition-all duration-300">Quartrdesign</a>
                <span className="text-gray-600 font-thin">&</span>
                <a href="https://zoketoapps.com/en" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 hover:tracking-tight transition-all duration-300">Zoketo (UAE)</a>
            </span>
        ),
        period: "2026 – Present",
        description: (
            <>
                Working as a <span className="text-cyan-400 font-bold tracking-tight">Software Developer</span> on web and app projects, focusing on building responsive frontend interfaces and scalable backend solutions. Responsible for API integrations, database management, and deploying applications while maintaining high-quality, efficient, and maintainable code.
            </>
        ),
        achievements: [
            "Developed responsive web applications using React JS and modern frontend tools",
            "Built and integrated REST and GraphQL APIs for dynamic data handling",
            "Managed databases including MySQL, PostgreSQL, and MongoDB to ensure efficient data storage and retrieval",
            "Optimized application performance and enhanced overall user experience",
            "Streamlined deployment workflows using GoDaddy and AWS for reliable production releases"
        ],
        color: "from-cyan-500 to-blue-500"
    }
];

const Experience = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="py-24 relative">
            {/* Cyber-Chrome Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/10 to-transparent" />
                <motion.div
                    animate={{
                        opacity: [0.02, 0.05, 0.02],
                        x: ['-20%', '20%']
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 -left-20 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="mb-24"
            >
                {/* HUD Header */}
                <div className="flex items-center gap-4 mb-6">
                    <span className="w-12 h-px bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    <h2 className="font-mono text-[0.6rem] tracking-widest lowercase flex items-center gap-2">
                        <span className="text-purple-400">await</span>
                        <span className="text-blue-400">sys</span>
                        <span className="text-white/40">.</span>
                        <span className="text-cyan-400">fetch_experience</span>
                        <span className="text-white/40">(</span>
                        <span className="text-emerald-400">"0xEXP"</span>
                        <span className="text-white/40">)</span>
                    </h2>
                </div>
                <h1 className="text-[2.75rem] md:text-8xl font-black mb-6 md:mb-8 tracking-tighter uppercase italic text-white leading-[1.1] md:leading-none">
                    Operational <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/40 to-transparent">Trace</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
                    A technical traceback of my <span className="text-white font-medium italic">operational impact</span> and core development milestones.
                </p>
            </motion.div>

            {/* Spatial HUD Timeline Container */}
            <div className="relative">
                {/* Technical Scanning Rail */}
                <div className="absolute left-6 md:left-6 top-0 bottom-0 w-px md:w-px bg-white/5 block">
                    <motion.div
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 w-0.5 md:w-[3px] -translate-x-1/2 h-20 bg-linear-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                    />
                </div>

                <div className="space-y-12 md:space-y-20 pl-12 md:pl-24">
                    {experiences.map((exp, index) => (
                        <ExperienceCard key={exp.id} exp={exp} index={index} isMobile={isMobile} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;
