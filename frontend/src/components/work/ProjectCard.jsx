import React, { useMemo, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion";

const SectionItem = React.memo(({ title, content, color, iconColor }) => (
    <div className="group/item relative">
        <div className="absolute -left-4 top-0 bottom-0 w-px bg-white/5 group-hover/item:bg-cyan-500/30 transition-colors duration-500" />
        <h4 className={`${color}/80 text-[0.6rem] uppercase font-black tracking-[0.3em] mb-3 md:mb-4 flex items-center gap-2 group-hover/item:tracking-[0.4em] transition-all duration-500`}>
            <span className={`w-1.5 h-px ${iconColor} shadow-[0_0_8px_rgba(6,182,212,0.5)]`} />
            {title}
        </h4>
        <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light group-hover:text-gray-200 transition-colors duration-500 pl-6 text-justify">
            {content}
        </p>
    </div>
));

const ProjectCard = ({ project, index }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [showOverlay, setShowOverlay] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        if (isMobile) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const projectData = useMemo(() => {
        const [mainTitle, subTitle] = project.title.split('–').map(s => s.trim());
        const outcomePoints = project.outcome.split(',').map(p => p.trim());
        return { mainTitle, subTitle: subTitle || '', outcomePoints };
    }, [project.title, project.outcome]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: isMobile ? 0.98 : 1 }}
            onMouseMove={handleMouseMove}
            className="group relative bg-white/3 border border-white/10 rounded-4xl md:rounded-[3rem] overflow-hidden transition-all duration-1000 flex flex-col hover:border-white/20 min-h-[450px] md:min-h-[500px] gpu-layer"
        >
            {/* Cyber-Chrome Metallic Base */}
            <div className="absolute inset-0 -z-20">
                <div className="absolute inset-0 bg-linear-to-br from-white/4 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>

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

            {/* Neon Accent Corner */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 blur-[80px] group-hover:bg-cyan-500/20 transition-all duration-1000" />

            {/* Floating Institutional Overlay */}
            <AnimatePresence>
                {showOverlay && project.institutions && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, scale: 1, backdropFilter: "blur(24px)" }}
                        exit={{ opacity: 0, scale: 1.05, backdropFilter: "blur(0px)" }}
                        className="absolute inset-0 z-50 bg-black/80 flex flex-col p-8 md:p-14"
                    >
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h4 className="text-cyan-400 text-[0.65rem] font-black uppercase tracking-[0.5em] mb-2">Institutional Network</h4>
                                <p className="text-white text-xl md:text-2xl font-black tracking-tighter italic">Select an Institution</p>
                            </div>
                            <motion.button
                                onClick={() => setShowOverlay(false)}
                                whileHover={{ rotate: 90, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white text-xl font-light hover:bg-white/10 hover:border-white/40 transition-all"
                            >
                                ✕
                            </motion.button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-4 custom-scrollbar px-1">
                            {project.institutions.map((inst, i) => (
                                <motion.a
                                    key={i}
                                    href={inst.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group/inst-link relative h-14 bg-white/3 border border-white/5 rounded-2xl flex items-center justify-between px-6 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all duration-500"
                                >
                                    <span className="text-[0.7rem] font-bold text-gray-400 group-hover/inst-link:text-white transition-colors truncate pr-4">
                                        {inst.name}
                                    </span>
                                    <span className="text-cyan-500 opacity-0 group-hover/inst-link:opacity-100 group-hover/inst-link:translate-x-1 transition-all">↗</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative p-7 md:p-14 h-full flex flex-col">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-8 md:mb-14">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4 md:mb-6">
                            <motion.div
                                className={`h-1.5 w-1.5 rounded-full bg-linear-to-r ${project.color} shadow-[0_0_15px_rgba(6,182,212,0.5)]`}
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-gray-500 group-hover:text-cyan-400 transition-colors duration-700">
                                {project.category}
                            </span>
                        </div>
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-white/40 transition-all duration-1000">
                            {projectData.mainTitle}
                        </h3>
                        {projectData.subTitle && (
                            <p className="text-lg md:text-xl font-light text-gray-500 group-hover:text-gray-300 transition-colors duration-700">
                                {projectData.subTitle}
                            </p>
                        )}
                    </div>

                    {/* Industrial Link/Trigger Button */}
                    <motion.button
                        onClick={() => {
                            if (project.institutions) {
                                setShowOverlay(true);
                            } else {
                                window.open(project.link, "_blank", "noopener,noreferrer");
                            }
                        }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/5 flex items-center justify-center bg-white/2 hover:bg-white/8 hover:border-cyan-500/30 transition-all duration-700 shrink-0 ml-2 md:ml-8 group/btn"
                    >
                        <div className="absolute inset-0 bg-cyan-500/5 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        <span className="relative text-white text-2xl md:text-4xl font-light tracking-tighter transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                            {project.institutions ? '↓' : '↗'}
                        </span>
                    </motion.button>
                </div>

                {/* Content Section - No Scroll, Full View */}
                <div className="flex flex-col gap-8 md:gap-12 mb-8 md:mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                        <div className="space-y-12">
                            <SectionItem
                                title="The Core Mission"
                                content={project.problem}
                                color="text-cyan-400"
                                iconColor="bg-cyan-500"
                            />
                            <SectionItem
                                title="The Architectural Shift"
                                content={project.solution}
                                color="text-purple-400"
                                iconColor="bg-purple-500"
                            />
                        </div>

                        <div className="relative h-full">
                            <div className="h-full glass-panel rounded-[2.5rem] p-8 lg:p-10 group/impact hover:border-emerald-500/30 transition-all duration-1000 relative bg-white/2 border border-white/10">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[80px]" />
                                <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                                    <h4 className="text-emerald-400 text-[0.65rem] uppercase font-black tracking-[0.4em] flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-pulse" />
                                        Protocol Results
                                    </h4>
                                </div>
                                <div className="space-y-6">
                                    {projectData.outcomePoints.map((point, i) => (
                                        <div key={i} className="flex items-start gap-4 group/point transition-all duration-300 hover:translate-x-1">
                                            <div className="mt-1 shrink-0 w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[0.8rem] text-emerald-500/70 group-hover/point:text-emerald-400 transition-all font-black">
                                                »
                                            </div>
                                            <p className="text-gray-400 text-sm font-light leading-relaxed group-hover:text-white transition-colors text-justify">
                                                {point}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cyber Tech Tags - Always visible at bottom */}
                <div className="flex flex-wrap gap-3 pt-8 border-t border-white/5 mt-auto">
                    {project.tech.map((tech) => (
                        <motion.span
                            key={tech}
                            whileHover={{ y: -5, borderColor: "rgba(6,182,212,0.5)", color: "#fff" }}
                            className="px-4 py-2 bg-black text-gray-500 text-[0.65rem] font-bold tracking-widest uppercase rounded-xl border border-white/5 transition-all duration-500 cursor-default hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] translate-z-0"
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
