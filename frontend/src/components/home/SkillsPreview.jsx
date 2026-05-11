import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

export default function SkillsPreview() {
    const skills = [
        "HTML", "CSS", "Sass", "JavaScript", "Bootstrap", "jQuery",
        "React JS", "React Router 7", "Remix", "Vite", "Motion (animations)", "Shopify Polaris",
        "Node.js", "Python", "Django", "Flask", "Java", "Spring Boot", "Servlet", "Strapi",
        "REST API Development", "Shopify Admin API", "GraphQL", "MySQL", "PostgreSQL", "MongoDB", "Prisma",
        "Git", "GitHub", "Vercel", "Netlify"
    ];

    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.2;
        const y = (clientY - (top + height / 2)) * 0.2;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <section className="py-16 bg-black overflow-hidden border-y border-white/10 relative flex flex-col md:flex-row items-center">

            {/* Left Side: CTA */}
            <div className="relative z-20 px-6 md:px-12 mb-8 md:mb-0 w-full md:w-auto text-center md:text-left shrink-0">
                <Link to="/skills">
                    <motion.button
                        ref={ref}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        animate={{ x: position.x, y: position.y }}
                        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative px-8 py-3 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm overflow-hidden group transition-all duration-300 hover:border-white hover:bg-white"
                    >
                        <span className="relative z-10 flex items-center gap-2 font-bold text-white group-hover:text-black transition-colors duration-300 uppercase tracking-widest text-sm font-mono">
                            <span className="opacity-40">{">"}</span> EXECUTE_EXPERTISE_TRACE
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </span>
                    </motion.button>
                </Link>
            </div>

            {/* Right Side: Ticker */}
            <div className="relative flex-1 overflow-hidden mask-linear-gradient w-full">
                {/* Gradient Masks for edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <motion.div
                    animate={{ x: "-90%" }}
                    transition={{
                        duration: 800,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex gap-16 items-center hover:[animation-play-state:paused]"
                    style={{ width: "max-content" }}
                >
                    {/* Tripling the list to ensure smooth infinite scroll without gaps */}
                    {[...skills, ...skills, ...skills].map((skill, index) => (
                        <div key={index} className="flex items-center gap-4 font-mono select-none group/skill">
                            <span className="text-cyan-400/40 text-2xl md:text-3xl font-black">0x{(index % 100).toString(16).padStart(2, '0')}</span>
                            <span className="text-4xl md:text-6xl font-black text-white/70 whitespace-nowrap uppercase group-hover/skill:text-cyan-400 transition-colors duration-500">
                                <span className="text-white/20">[</span> <span className="text-purple-400/40">"</span>{skill}<span className="text-purple-400/40">"</span> <span className="text-white/20">]</span>
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
