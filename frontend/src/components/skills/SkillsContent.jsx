import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SkillCategory from './SkillCategory';

const SkillsContent = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const skillCategories = [
    {
        label: "Interface & Foundations",
        items: ["HTML", "CSS", "Sass", "JavaScript", "Bootstrap", "jQuery", "Vite", "Motion (animations)"]
    },
    {
        label: "Frameworks & Commerce",
        items: ["React JS", "React Router 7", "Remix", "Shopify Polaris"]
    },
    {
        label: "Server Architecture",
        items: ["Node.js", "Python", "Django", "Flask", "Java", "Spring Boot", "Servlet", "Strapi"]
    },
    {
        label: "Data & Integration",
        items: ["REST API Development", "Shopify Admin API", "GraphQL", "MySQL", "PostgreSQL", "MongoDB", "Prisma"]
    },
    {
        label: "Ecosystem & Deployment",
        items: ["Git", "GitHub", "Vercel", "Netlify"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Technical HUD Background */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none will-change-transform"
      >
        {/* Digital Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[30px_30px] mask-[radial-gradient(ellipse_80%_60%_at_50%_20%,#000_60%,transparent_100%)]" />

        {/* Scanning Line - Hidden on mobile */}
        {!isMobile && (
          <motion.div
            animate={{
              y: ["-100%", "200%"],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent shadow-[0_0_8px_rgba(6,182,212,0.2)]"
          />
        )}

        {/* Ambient Glows - Simplified on mobile */}
        <div className={`absolute top-10 left-1/3 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-cyan-500/5 rounded-full ${isMobile ? 'blur-[60px]' : 'blur-[100px] animate-pulse'}`} />
        <div className={`absolute bottom-20 right-1/3 w-[150px] md:w-[250px] h-[150px] md:h-[250px] bg-purple-500/5 rounded-full ${isMobile ? 'blur-[60px]' : 'blur-[100px] animate-pulse'}`} />

        {/* Technical Indicators */}
        <div className="absolute top-8 left-8 md:left-16 hidden md:block">
          <div className="font-mono text-[0.45rem] tracking-[0.4em] text-cyan-500/30 uppercase">
            SKILLS_MATRIX::ACTIVE
          </div>
        </div>
        <div className="absolute top-16 left-8 md:left-16 hidden md:block">
          <div className="font-mono text-[0.45rem] tracking-[0.4em] text-purple-500/30 uppercase">
            STACK_VERSION::v2.4.1
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="mb-20">
          {/* Coder-style Header */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            {/* Terminal-style command header */}
            <motion.div
              className="font-mono text-sm mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-cyan-300/80 mb-2">
                <span className={isMobile ? '' : 'animate-pulse'}>❯</span>
                <span>portfolio</span>
                <span className="text-purple-300/80">--skills</span>
                <span className="text-gray-400">--show</span>
              </div>
              <div className="text-green-300/60 text-xs">
                Loading technical skills matrix... ✓
              </div>
            </motion.div>

            {/* Main Title with Code Structure */}
            <motion.div
              className="font-mono text-lg mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="text-purple-300/80">const</div>
              <div className="text-cyan-300/80 ml-4">developer</div>
              <div className="text-gray-400 ml-8">=</div>
              <div className="text-yellow-300/80 ml-4">{"{"}</div>
            </motion.div>

            <motion.h1
              className="text-[2.5rem] md:text-6xl lg:text-7xl font-mono font-black leading-[1.1] md:leading-[1.2] tracking-tighter text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.span
                className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-purple-400 to-cyan-300 bg-300% animate-gradient"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Skills
              </motion.span>
              <br />
              <span className="text-gray-200">&</span> Expertise
            </motion.h1>

            {/* Code-style descriptions */}
            <motion.div
              className="font-mono text-sm space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="text-gray-400">
                <span className="text-green-300/80">{"//"}</span>
                <span className="ml-2">I don't just know tools; I know how to use them to build better products.</span>
              </div>
              <div className="text-gray-400">
                <span className="text-green-300/80">{"//"}</span>
                <span className="ml-2">My stack is chosen for performance, scalability, and developer experience.</span>
              </div>
            </motion.div>

            {/* Closing bracket */}
            <motion.div
              className="font-mono text-lg text-yellow-300/80 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              {"}"};
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-cyan-300 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
            Technical Arsenal
          </h2>
        </motion.div>

        {/* Skills Timeline */}
        <div className="relative max-w-6xl mx-auto px-6 md:px-8 mt-12">
          {/* Central Timeline Line - Mobile: simplified vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:w-px bg-linear-to-b from-cyan-500/30 md:from-cyan-500/50 via-purple-500/30 md:via-purple-500/50 to-transparent hidden md:block transform md:-translate-x-1/2" />

          {/* Mobile Timeline Line - Visible on mobile */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-linear-to-b from-cyan-500/20 via-transparent to-purple-500/20 md:hidden" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16 relative">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.label}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.8, ease: "easeOut" }}
                className={`relative flex gap-6 md:gap-8 items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Node - Mobile: left-aligned dots */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.2, duration: 0.4, type: "spring" }}
                  className="absolute left-0 md:left-1/2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-linear-to-br from-cyan-400 to-purple-500 border-2 md:border-4 border-black shadow-[0_0_8px_rgba(6,182,212,0.5)] md:shadow-[0_0_12px_rgba(6,182,212,0.6)] z-20 transform md:-translate-x-1/2 mt-8 md:mt-0 flex items-center justify-center shrink-0 gpu-layer"
                >
                  <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-white" />
                </motion.div>

                {/* Mobile: Spacer for timeline node */}
                <div className="w-8 shrink-0 md:hidden" />

                {/* Connecting Line - Mobile: hidden, Desktop: visible */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                  className={`hidden md:block absolute top-8 left-1/2 w-8 h-px bg-linear-to-r ${
                    index % 2 === 0 ? "from-cyan-400/50" : "from-purple-400/50"
                  } transform -translate-x-1/2 -translate-y-1/2 origin-center`}
                />

                {/* Content Card */}
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className={`flex-1 w-full group`}
                >
                  <div className="relative p-6 md:p-8 bg-linear-to-br from-white/12 via-white/6 to-transparent border border-white/15 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-cyan-300/40 group-hover:bg-linear-to-br group-hover:from-cyan-500/8 group-hover:via-blue-500/4 group-hover:to-purple-500/6 gpu-layer">

                    {/* Card Border Corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-2xl transition-all duration-300 group-hover:border-cyan-400/80" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-2xl transition-all duration-300 group-hover:border-cyan-400/80" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400/40 rounded-bl-2xl transition-all duration-300 group-hover:border-cyan-400/80" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/40 rounded-br-2xl transition-all duration-300 group-hover:border-cyan-400/80" />

                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-300" />

                    {/* Content */}
                    <div className="relative z-10">
                      <motion.div
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                      >
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300">
                          {category.label}
                        </h3>
                        <span className="text-sm text-cyan-300 font-mono bg-linear-to-r from-cyan-900/30 to-purple-900/30 px-3 py-1 rounded-full border border-cyan-300/30 group-hover:border-cyan-300/50 transition-all duration-300">
                          {category.items.length} items
                        </span>
                      </motion.div>

                      {/* Skills in Code Format */}
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.2, duration: 0.5 }}
                      >
                        {/* Terminal-style category header */}
                        <motion.div className="flex items-center gap-3 mb-4">
                          <span className="text-cyan-300 font-mono text-sm">$</span>
                          <span className="text-purple-300 font-mono text-sm">const</span>
                          <span className="text-cyan-300 font-mono text-sm group-hover:text-cyan-200 transition-colors duration-300">
                            {category.label.replace(/\s*&\s*/g, '_').replace(/\s+/g, '_').toLowerCase()}
                          </span>
                          <span className="text-gray-400 font-mono text-sm">=</span>
                          <span className="text-green-300 font-mono text-sm">[</span>
                        </motion.div>

                        {/* Skills as code array elements */}
                        <div className="ml-10 space-y-1">
                          {category.items.map((item, itemIndex) => (
                            <div
                              key={item}
                              className="flex items-center gap-3 group/item transition-transform duration-200 hover:translate-x-1"
                            >
                              <span className="text-gray-500 font-mono text-xs group-hover/item:text-cyan-300 transition-colors duration-300 w-8 text-right">
                                {String(itemIndex).padStart(2, '0')}
                              </span>
                              <span className="text-gray-400 font-mono text-sm group-hover/item:text-purple-300 transition-colors duration-300">
                                =&gt;
                              </span>
                              <span className="text-yellow-300 font-mono text-sm">"</span>
                              <span
                                className="text-gray-200 font-mono text-sm group-hover/item:text-cyan-200 transition-colors duration-300 relative"
                              >
                                {item}
                                <div
                                  className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/15 to-cyan-500/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                                />
                              </span>
                              <span className="text-yellow-300 font-mono text-sm">"</span>
                              <span className="text-gray-400 font-mono text-sm">
                                {itemIndex < category.items.length - 1 ? ',' : ''}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Closing bracket */}
                        <motion.div className="ml-10 mt-4 flex items-center gap-2">
                          <span className="text-green-300 font-mono text-sm">]</span>
                          <span className="text-gray-400 font-mono text-sm">;</span>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Inner Glow */}
                    <div className="absolute inset-2 rounded-xl bg-linear-to-br from-transparent via-cyan-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>

                {/* Spacer for desktop */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsContent;
