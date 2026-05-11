import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  // Detect mobile for performance optimizations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax effect for background elements (desktop only)
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <section className="relative min-h-screen px-6 md:px-16 pt-32 pb-16 flex flex-col md:flex-row items-center justify-center overflow-hidden bg-(--bg) text-(--text)">

      {/* Technical HUD Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Digital Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Scanning Line Pulse - Hidden on mobile for performance */}
        {!isMobile && (
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
            className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-500/20 to-transparent shadow-[0_0_20px_rgba(6,182,212,0.5)]"
          />
        )}

        {/* Ambient Glows - Simplified on mobile */}
        <div className={`absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/10 rounded-full ${isMobile ? 'blur-[60px]' : 'blur-[120px] animate-pulse'}`} />
        <div className={`absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-500/10 rounded-full ${isMobile ? 'blur-[60px]' : 'blur-[120px] animate-pulse'}`} />

        {/* Peripheral HUD Metadata */}
        <div className="absolute top-32 left-8 md:left-16 hidden md:block group/meta">
          <div className="font-mono text-[0.5rem] tracking-[0.5em] text-cyan-500/40 uppercase vertical-text transform -rotate-180">
            LOC_LAT: 11.0168° N // LOC_LONG: 76.9558° E
          </div>
        </div>
        <div className="absolute bottom-16 right-8 md:right-16 hidden md:block">
          <div className="font-mono text-[0.5rem] tracking-[0.5em] text-purple-500/40 uppercase text-right">
            STATUS: [ENCRYPTION_ACTIVE]<br />
            RECV_PACKET: 040_DINESH
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex-1 text-center md:text-left flex flex-col items-center md:items-start w-full">

        {/* Interactive Heading with Magnetic Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 w-full px-2"
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-mono text-cyan-500/80 text-[0.6rem] md:text-sm mb-6 tracking-[0.4em] uppercase flex items-center gap-3 justify-center md:justify-start"
          >
            <div className="flex items-center gap-1 font-mono text-[0.65rem] select-none scale-75 md:scale-100 origin-center md:origin-left">
              <span className="px-2 py-0.5 bg-blue-600/20 text-blue-400 rounded-sm">~/portfolio</span>
              <span className="px-2 py-0.5 bg-emerald-600/20 text-emerald-400 rounded-sm flex items-center gap-1">
                <span className="text-[0.5rem]"></span> main
              </span>
              <span className="text-white/40 ml-1">$</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-1 md:ml-2 text-white font-bold tracking-widest whitespace-nowrap"
              >
                DINESH RAJ A
              </motion.span>
              <motion.span
                animate={isMobile ? { opacity: 1 } : { opacity: [1, 0, 1] }}
                transition={isMobile ? {} : { duration: 0.8, repeat: Infinity }}
                className="w-1.5 h-3.5 md:w-2 md:h-4 bg-cyan-500/60 ml-1"
              />
            </div>
          </motion.h2>

          <motion.h1
            className="text-[2.2rem] md:text-6xl lg:text-7xl font-mono font-black leading-[1.1] md:leading-[1.2] tracking-tighter text-white mb-6 md:mb-8 text-center md:text-left"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              textShadow: isHovered ? "0 0 40px rgba(34, 211, 238, 0.4)" : "none"
            }}
          >
            <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3">
              <span className="text-purple-500/40 text-lg md:text-4xl">fn</span>
              <span>I.build</span>
              <span className="text-cyan-500/30">(</span>
            </div>
            <div className="py-2 md:pl-24">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 block leading-tight">
                Digital_Experiences
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3">
              <span className="text-cyan-500/30">)</span>
              <span>.matter</span>
              <span className="text-emerald-400/40">;</span>
            </div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto md:mx-0 leading-relaxed px-2 md:px-0 font-mono"
          >
            <span className="text-cyan-400 opacity-60 text-xs md:text-sm tracking-widest uppercase">// status: active</span><br className="md:hidden" />
            Architecting <span className="text-white font-medium">Scalable Systems</span> & High-Performance Logic.
            <div className="hidden md:block">Processing complex problems into <span className="text-white font-medium">User-Centric Execution</span>.</div>
            <div className="md:hidden mt-2 text-sm">Processing <span className="text-white font-medium">User-Centric Execution</span>.</div>
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center md:justify-start mb-14 w-full md:w-auto px-6 md:px-0"
        >
          <Link to="/work" className="cursor-pointer w-full md:w-auto">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full md:w-auto px-10 py-5 md:py-4 bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 font-black text-[0.65rem] md:text-xs uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-cyan-500/10 hover:border-cyan-500/60 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
            >
              {/* Scanline Sweep */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/10 to-transparent -translate-y-full group-hover:animate-[scan_2s_infinite] pointer-events-none" />

              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500" />

              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-cyan-500 group-hover:translate-x-1 transition-transform">{">"}</span>
                EXECUTE_WORK_LOG
              </span>
            </motion.button>
          </Link>

          <Link to="/contact" className="cursor-pointer w-full md:w-auto">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full md:w-auto px-10 py-5 md:py-4 bg-white/3 border border-white/10 text-white font-black text-[0.65rem] md:text-xs uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/30 cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/20" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/20" />

              <span className="relative z-10 flex items-center justify-center gap-3 text-white/60 group-hover:text-white transition-colors">
                <span className="group-hover:translate-x-1 transition-transform">{">"}</span>
                INIT_CONNECTION
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Shopify Expert Registry */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-2 font-mono text-[0.6rem] md:text-xs">
            <span className="text-cyan-400">::</span>
            <span className="text-white/70">ENV_EXPERT</span>
            <span className="text-cyan-400">=</span>
            <div className="relative px-3 py-1 bg-cyan-600/5 border border-cyan-500/20 rounded-sm overflow-hidden group/shopify">
              <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-cyan-500/40" />
              <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-cyan-500/40" />
              <span className="text-cyan-400 font-black tracking-widest">SHOPIFY_APP_SYSTEMS</span>
            </div>
          </div>
          <div className="h-px w-12 bg-white/5" />
          <span className="text-[0.5rem] font-mono text-white/10 tracking-widest hidden md:block uppercase">[0xFC_EXPERT]</span>
        </motion.div>
      </div>

      {/* Visual Element (Desktop) */}
      <motion.div
        className="hidden md:block w-1/2 relative h-[600px]"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 to-purple-600/20 rounded-full blur-3xl opacity-20 animate-pulse" />

        {/* Technical HUD Frame for Code */}
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="relative w-80 h-96 bg-gray-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform rotate-6 transition-all duration-700 group/code"
          >
            {/* HUD Corner Brackets */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-2xl transition-colors group-hover/code:border-cyan-500/60" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-purple-500/30 rounded-br-2xl transition-colors group-hover/code:border-purple-500/60" />

            <div className="flex gap-2 mb-8">
              <div className="w-3 h-3 rounded-full bg-red-400/40" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/40" />
              <div className="w-3 h-3 rounded-full bg-green-400/40" />
            </div>

            <div className="space-y-4 font-mono text-[0.7rem] md:text-sm leading-relaxed">
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/20 text-[0.5rem] tracking-[0.3em] mb-4 uppercase"
              >
                // DATA_STREAM: ACTIVE
              </motion.div>
              <div className="text-purple-400">const <span className="text-yellow-400">developer</span> = <span className="text-cyan-400">{"{"}</span></div>
              <div className="pl-6 text-gray-300">name: <span className="text-green-400">'Dinesh'</span>,</div>
              <div className="pl-6 text-gray-300">role: <span className="text-green-400">'Web Development'</span>,</div>
              <div className="pl-6 text-gray-300 flex items-center gap-2">
                skills: <span className="text-cyan-400">['React', 'Node']</span>,
              </div>
              <div className="pl-6 text-gray-300">hardWorker: <span className="text-blue-400">true</span></div>
              <div className="text-cyan-400">{"}"}</div>
            </div>

          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
