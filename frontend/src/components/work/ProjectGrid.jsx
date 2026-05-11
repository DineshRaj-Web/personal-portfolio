import { motion } from "framer-motion";
import { projects } from "../../data/projects";
import ProjectCard from "./ProjectCard";

const ProjectGrid = () => {
    return (
        <div className="relative">
            {/* Ambient Cyber Lighting */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, 100, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        scale: [1.3, 1, 1.3],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, -100, 0]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="mb-14 md:mb-20"
            >
                {/* HUD Header */}
                <div className="flex items-center gap-4 mb-6">
                    <span className="w-12 h-px bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    <h2 className="font-mono text-[0.6rem] tracking-widest lowercase flex items-center gap-2">
                        <span className="text-purple-400">export</span>
                        <span className="text-white/40">const</span>
                        <span className="text-blue-400">projects</span>
                        <span className="text-white/40">=</span>
                        <span className="text-white/40">[</span>
                        <span className="w-2 h-2 rounded-sm bg-cyan-500/20 border border-cyan-500/50 animate-pulse" />
                        <span className="text-white/40">]</span>
                    </h2>
                </div>
                <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic text-white leading-none">
                    Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/40 to-transparent">Registry</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
                    A collection of <span className="text-white font-medium italic">deployed modules</span> and architectural implementations.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 pb-20 md:pb-32 items-start">
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </div>
    );
};

export default ProjectGrid;
