import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative bg-white/3 border border-white/10 rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.08)] cursor-pointer gpu-layer"
        >
            {/* Corner HUD Accents */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-white/5 rounded-tl-[2.5rem] group-hover:border-cyan-500/20 transition-colors" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-white/5 rounded-br-[2.5rem] group-hover:border-purple-500/20 transition-colors" />

            <div className="p-8 md:p-12 flex flex-col h-full relative">
                {/* Technical Header Metadata */}
                <div className="flex justify-between items-start mb-8">
                    <div className="flex flex-col">
                        <span className="text-[0.6rem] font-mono text-cyan-500/50 tracking-[0.2em] font-bold uppercase mb-1">
                            :: PROJECT_PHASE_0{index + 1}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className={`h-1.5 w-1.5 rounded-full bg-linear-to-r ${project.color} animate-pulse`} />
                            <span className="text-[0.6rem] font-mono text-white/40 tracking-widest uppercase">
                                {project.category}
                            </span>
                        </div>
                    </div>
                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                        <span className="text-[0.5rem] font-mono text-white/30 uppercase tracking-tighter italic">V-SYNC: OK</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <h4 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none group-hover:text-cyan-400 transition-colors duration-500">
                        {project.title}
                    </h4>

                    <div className="relative">
                        <div className="absolute -left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-cyan-500/40 via-transparent to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-700" />
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed line-clamp-3 font-light">
                            {project.problem}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4">
                        {project.tech.map((t, i) => (
                            <span
                                key={i}
                                className="text-[0.55rem] font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400 group-hover:border-cyan-500/30 group-hover:text-cyan-400/80 transition-all duration-500 whitespace-nowrap"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <Link to="/work" className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center group/btn cursor-pointer">
                    <div className="flex items-center gap-3">
                        <span className="text-[0.5rem] font-mono text-white/20 uppercase tracking-widest">TRACED_BY: SYS</span>
                        <div className="h-px w-8 bg-white/5" />
                    </div>
                    <span className="text-sm font-bold text-white group-hover/btn:text-cyan-400 transition-colors flex items-center gap-2 tracking-tight">
                        READ CASE STUDY
                        <span className="group-hover/btn:translate-x-1 transition-transform duration-300 italic text-cyan-500">→</span>
                    </span>
                </Link>
            </div>
        </motion.div>
    );
};

export default function WorkPreview() {
    const featuredProjects = projects.slice(0, 2);

    return (
        <section className="py-32 px-6 bg-black text-white relative overflow-hidden border-t border-white/5">
            {/* Background Grid - Parity with Hero/Services */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="max-w-7xl mx-auto relative">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 md:mb-28 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-center md:text-left"
                    >
                        {/* HUD Header Prompt */}
                        <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
                            <span className="w-12 h-px bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                            <h2 className="font-mono text-[0.6rem] tracking-widest lowercase flex items-center gap-2 text-white/80">
                                <span className="text-purple-400">await</span>
                                <span className="text-blue-400">sys</span>
                                <span className="text-white/40">.</span>
                                <span className="text-cyan-400">fetch_projects</span>
                                <span className="text-white/40">(</span>
                                <span className="text-emerald-400">"PREVIEW"</span>
                                <span className="text-white/40">)</span>
                            </h2>
                        </div>

                        <h1 className="text-[2.75rem] md:text-8xl font-black tracking-tighter uppercase italic text-white leading-[1.1] md:leading-none">
                            Selected <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/40 to-transparent">CASE STUDIES.</span>
                        </h1>
                    </motion.div>

                    <Link to="/work">
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 py-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative flex items-center gap-3 text-[0.7rem] font-black tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">
                                <span className="text-cyan-500 font-mono tracking-normal">{">"}</span>
                                EXECUTE.VIEW_ALL_PROJECTS
                            </span>
                        </motion.button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
