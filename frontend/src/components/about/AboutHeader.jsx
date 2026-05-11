import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export default function AboutHeader({ isInView }) {
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();

  // Parallax effect for background elements
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <section className="relative min-h-screen px-6 md:px-16 pt-32 pb-16 flex flex-col items-start justify-start overflow-hidden bg-black text-white">
      {/* Technical HUD Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Digital Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Scanning Line Pulse */}
        <motion.div
          animate={{
            y: ["-100%", "200%"],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent shadow-[0_0_20px_rgba(6,182,212,0.5)]"
        />

        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />

        {/* Peripheral HUD Metadata */}
        <div className="absolute top-32 left-8 md:left-16 hidden md:block group/meta">
          <div className="font-mono text-[0.5rem] tracking-[0.5em] text-cyan-500/40 uppercase vertical-text transform -rotate-180">
            MODULE: ABOUT_DEV
          </div>
        </div>
        <div className="absolute bottom-16 right-8 md:right-16 hidden md:block">
          <div className="font-mono text-[0.5rem] tracking-[0.5em] text-purple-500/40 uppercase text-right">
            STATUS: [PROFILE_ACTIVE]<br />
            DATA_PACKET: 041_ABOUT
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 text-left flex flex-col items-start w-full pl-6 md:pl-16">
        {/* Interactive Heading with Magnetic Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 w-full"
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-mono text-cyan-500/80 text-[0.5rem] md:text-xs mb-6 tracking-[0.4em] uppercase flex items-start gap-3 text-left"
          >
            <div className="flex items-start gap-1 font-mono text-[0.65rem] select-none text-left">
              <span className="px-2 py-0.5 bg-blue-600/20 text-blue-400 rounded-sm">~/about</span>
              <span className="px-2 py-0.5 bg-emerald-600/20 text-emerald-400 rounded-sm flex items-center gap-1">
                <span className="text-[0.5rem"></span> profile
              </span>
              <span className="text-white/40 ml-1">$</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                className="ml-1 md:ml-2 text-white font-bold tracking-widest whitespace-nowrap"
              >
                ABOUT_DEVELOPER
              </motion.span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-1.5 h-3.5 md:w-2 md:h-4 bg-cyan-500/60 ml-1"
              />
            </div>
          </motion.h2>

          <motion.h1
            className="text-[1.5rem] md:text-4xl lg:text-5xl font-mono font-black leading-[1.1] md:leading-[1.2] tracking-tighter text-white mb-6 md:mb-8 text-left"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              textShadow: isHovered ? "0 0 40px rgba(34, 211, 238, 0.4)" : "none"
            }}
          >
            <div className="flex items-start gap-2 md:gap-3">
              <span className="text-purple-500/40 text-lg md:text-4xl">const</span>
              <span>developer</span>
              <span className="text-cyan-500/30">=</span>
            </div>
            <div className="py-2 md:pl-24">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 block leading-tight">
                {"{ Full_Stack_Architect }"}
              </span>
            </div>
            <div className="flex items-start gap-2 md:gap-3">
              <span className="text-cyan-500/30">;</span>
              <span className="text-emerald-400/40">/*</span>
              <span className="text-gray-400">bridges creativity & engineering</span>
              <span className="text-emerald-400/40">*/</span>
            </div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-400 text-sm md:text-base leading-relaxed font-mono text-left"
          >
            <div className="flex items-center gap-2 mb-2">
              <motion.span 
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-cyan-400 text-xs md:text-sm tracking-widest uppercase"
              >
                // profile: loaded
              </motion.span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="w-2 h-0.5 border-l-2 border-cyan-400/60"
                style={{ borderStyle: 'solid' }}
              />
            </div>
            <div className="flex items-start gap-3">
              <span className="text-cyan-400/60">▶</span>
              <span>I build <span className="text-white font-medium text-cyan-300">elegant, scalable code</span> that solves real-world problems.</span>
            </div>
            <div className="flex items-start gap-3 hidden md:block">
              <span className="text-cyan-400/60">▶</span>
              <span>Transforming <span className="text-white font-medium text-cyan-300">complex challenges</span> into beautiful, functional software.</span>
            </div>
            <div className="flex items-start gap-2 md:hidden mt-2">
              <span className="text-cyan-400/60">▶</span>
              <span>Creating <span className="text-white font-medium text-cyan-300">beautiful software</span>.</span>
            </div>
          </motion.p>
        </motion.div>

        {/* Technical Stats Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 mb-14 w-full md:w-auto"
        >
          <div className="relative px-6 py-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg overflow-hidden transition-all duration-300 hover:bg-cyan-500/10 hover:border-cyan-500/60">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/40" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/40" />
            
            <div className="font-mono text-xs md:text-sm">
              <div className="text-cyan-400 opacity-60 mb-1">EXPERIENCE</div>
              <div className="text-white font-black text-lg md:text-xl">FRESHER</div>
            </div>
          </div>

          <div className="relative px-6 py-4 bg-purple-500/5 border border-purple-500/20 rounded-lg overflow-hidden transition-all duration-300 hover:bg-purple-500/10 hover:border-purple-500/60">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-purple-500/40" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-purple-500/40" />
            
            <div className="font-mono text-xs md:text-sm">
              <div className="text-purple-400 opacity-60 mb-1">SPECIALIZATION</div>
              <div className="text-white font-black text-lg md:text-xl">FULL-STACK</div>
            </div>
          </div>
        </motion.div>

        {/* Developer Registry */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-2 font-mono text-[0.6rem] md:text-xs">
            <span className="text-cyan-400">::</span>
            <span className="text-white/70">DEV_STATUS</span>
            <span className="text-cyan-400">=</span>
            <div className="relative px-3 py-1 bg-emerald-600/5 border border-emerald-500/20 rounded-sm overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-emerald-500/40" />
              <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-emerald-500/40" />
              <span className="text-emerald-400 font-black tracking-[0.1em]">ACTIVE_DEVELOPER</span>
            </div>
          </div>
          <div className="h-px w-12 bg-white/5" />
          <span className="text-[0.5rem] font-mono text-white/10 tracking-widest hidden md:block uppercase">[0xDEV_READY]</span>
        </motion.div>
      </div>
    </section>
  );
}
