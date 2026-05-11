import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Link } from "react-router-dom";

const ServiceCard = ({ title, description, icon, modId, tags, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative cursor-pointer"
        >
            {/* Data Point Marker - Matching Experience.jsx */}
            <div className="absolute -left-[4.85rem] top-10 hidden md:block">
                <div className="relative w-4 h-4">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full animate-pulse" />
                    <div className="relative w-full h-full border border-cyan-400/50 rounded-full bg-black flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    </div>
                </div>
            </div>

            {/* HUD Service Card */}
            <div className="relative bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-14 overflow-hidden transition-all duration-1000 hover:border-white/20">
                {/* Cyber Texture Layer */}
                <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] -z-10" />

                {/* Status Indicator */}
                <div className="absolute top-8 right-8 flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-[0.55rem] font-black tracking-widest text-cyan-500/50 uppercase">Capability</span>
                        <span className="text-[0.6rem] font-mono text-cyan-400/80 tracking-tighter uppercase whitespace-nowrap">V-ACTIVE-MODULE</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
                </div>

                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/10 rounded-tl-3xl group-hover:border-cyan-500/30 transition-colors duration-1000" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/10 rounded-br-3xl group-hover:border-purple-500/30 transition-colors duration-1000" />

                <div className="flex flex-col gap-8 md:gap-10">
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2.5 px-3 py-1.5 bg-cyan-500/5 border border-white/10 rounded-full backdrop-blur-sm group-hover:bg-cyan-500/10 group-hover:border-cyan-500/40 transition-all duration-700">
                                <span className="text-white text-[0.6rem] font-black tracking-[0.1em]">{modId}</span>
                            </div>
                            <div className="h-px w-8 bg-white/10" />
                            <div className="text-3xl text-cyan-400">{icon}</div>
                        </div>

                        <div>
                            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-none mb-6 group-hover:tracking-tight transition-all duration-1000">
                                {title}
                            </h3>
                            <div className="relative group/desc max-w-4xl">
                                <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/50 via-transparent to-transparent opacity-30 group-hover/desc:opacity-100 transition-opacity duration-1000" />
                                <p className="text-gray-200 text-lg md:text-xl leading-relaxed text-justify tracking-tight font-light">
                                    {description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6">
                        <div className="flex flex-wrap gap-2">
                            {tags && tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-[0.6rem] font-black px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-400 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all duration-500"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            <Link to={`/contact?service=${modId}`} className="group/trace flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 cursor-pointer">
                                <span className="text-[0.6rem] font-black text-white/40 group-hover/trace:text-cyan-400 tracking-widest font-mono uppercase">
                                    <span className="text-cyan-500 font-bold group-hover/trace:animate-pulse">{">"}</span> EXECUTE_EXPERTISE_TRACE
                                </span>
                            </Link>
                            <span className="text-[0.5rem] font-mono text-gray-600 space-y-1 text-right italic opacity-50">
                                // INTEGRITY_CHECK: PASSED <br />
                                // SOURCE_TRACE: ENABLED
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function ServicesSection() {
    const services = [
        {
            title: "Frontend",
            description: "I specialize in frontend development, building responsive, interactive, and visually engaging applications. I work extensively with React JS, React Router 7, Remix, and Motion to create dynamic user interfaces that perform seamlessly across devices. My expertise also includes HTML, CSS, Sass, Bootstrap, and jQuery, allowing me to design intuitive layouts and smooth animations. I focus on writing clean, maintainable code that enhances user experience, optimizes performance, and turns complex designs into elegant, functional interfaces.",
            modId: "01_ENGINE_FE",
            tags: ["React JS", "Remix", "Motion", "Tailwind CSS", "Sass"]
        },
        {
            title: "Backend",
            description: "I specialize in backend development, creating scalable, secure, and high-performance systems. I work with Node.js, Strapi, Python (Django/Flask), and Java (Spring Boot/Servlet) to build robust APIs and server-side logic. I manage databases including MySQL, PostgreSQL, and MongoDB, and integrate REST APIs and GraphQL to handle dynamic data efficiently. My focus is on writing clean, maintainable, and modular code, ensuring applications are reliable, performant, and ready to scale.",
            modId: "02_CORE_BE",
            tags: ["Node.js", "Strapi", "Python", "GraphQL", "Spring Boot"]
        },
        {
            title: "Database",
            description: "I have hands-on experience designing, managing, and optimizing databases for web applications. I work with MySQL, PostgreSQL, and MongoDB, ensuring efficient data storage, retrieval, and scalability. I design structured schemas, optimize queries, and manage relationships to support robust backend systems. My focus is on maintaining data integrity, performance, and security, enabling applications to handle large datasets and dynamic user interactions seamlessly.",
            modId: "04_DATA_MOD",
            tags: ["MySQL", "PostgreSQL", "MongoDB", "Schema Design", "Security"]
        },
        {
            title: "Performance Audits",
            description: "I conduct thorough performance audits to ensure web applications run efficiently and reliably. By analyzing frontend rendering, backend response times, database queries, and API integrations, I identify bottlenecks and optimize them for speed and scalability. Using tools and best practices, I enhance page load times, application responsiveness, and overall user experience, ensuring that every project performs at its peak under real-world conditions.",
            modId: "03_SYS_PERF",
            tags: ["Optimization", "Scalability", "Core Web Vitals", "Lighthouse"]
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-black text-white">
            {/* Cyber-Chrome Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-24"
                >
                    {/* HUD Header Prompts from Experience.jsx reference */}
                    <div className="flex items-center gap-4 mb-6">
                        <span className="w-12 h-px bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        <h2 className="font-mono text-[0.6rem] tracking-widest lowercase flex items-center gap-2">
                            <span className="text-purple-400">await</span>
                            <span className="text-blue-400">sys</span>
                            <span className="text-white/40">.</span>
                            <span className="text-cyan-400">fetch_expertise</span>
                            <span className="text-white/40">(</span>
                            <span className="text-emerald-400">"0xSERVICE"</span>
                            <span className="text-white/40">)</span>
                        </h2>
                    </div>

                    <h1 className="text-[2.75rem] md:text-8xl font-black mb-6 md:mb-8 tracking-tighter uppercase italic text-white leading-[1.1] md:leading-none">
                        Expertise <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/40 to-transparent">Engineering.</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
                        A technical blueprint of my <span className="text-white font-medium italic">engineering capabilities</span> and scalable solution architectures.
                    </p>
                </motion.div>

                {/* Spatial HUD Blueprint Container (Vertical Rail) */}
                <div className="relative">
                    {/* Technical Scanning Rail - Matching Experience.jsx */}
                    <div className="absolute left-0 md:left-6 top-0 bottom-0 w-px bg-white/5 hidden md:block">
                        <motion.div
                            animate={{ top: ['0%', '100%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 w-[3px] -translate-x-1/3 h-20 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                        />
                    </div>

                    <div className="space-y-12 md:space-y-20 md:pl-24">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
