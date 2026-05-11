import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AboutPreview() {
    return (
        <section className="py-24 bg-black text-white relative overflow-hidden">
            {/* Grid Decor - Matching site-wide pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Cinematic Glows */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gray-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative">

                {/* HUD Header Prompts */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <span className="w-12 h-px bg-stone-500 shadow-[0_0_8px_rgba(168,162,158,0.8)]" />
                        <h2 className="font-mono text-[0.6rem] tracking-widest lowercase flex items-center gap-2">
                            <span className="text-gray-400">await</span>
                            <span className="text-stone-500">sys</span>
                            <span className="text-white/40">.</span>
                            <span className="text-gray-300">fetch_identity</span>
                            <span className="text-white/40">(</span>
                            <span className="text-stone-400">"0xABOUT"</span>
                            <span className="text-white/40">)</span>
                        </h2>
                    </div>

                    <h1 className="text-[2.75rem] md:text-9xl font-black mb-8 tracking-tighter uppercase italic text-white leading-none">
                        System <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/40 to-transparent">IDENTITY.</span>
                    </h1>
                </motion.div>

                {/* Mobile Layout - Coder Look */}
                <div className="md:hidden">
                    {/* Mobile Terminal Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <div className="bg-black border border-stone-500/30 rounded-lg p-4 font-mono text-xs">
                            {/* Terminal Header */}
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-stone-500/20">
                                <div className="w-2 h-2 bg-gray-500 rounded-full" />
                                <div className="w-2 h-2 bg-stone-400 rounded-full" />
                                <div className="w-2 h-2 bg-gray-600 rounded-full" />
                                <span className="text-stone-400 ml-2">terminal@identity:~$</span>
                            </div>
                            
                            {/* Terminal Content */}
                            <div className="space-y-2 text-stone-400">
                                <div>$ cat core_philosophy.txt</div>
                                <div className="text-white/80 pl-4">
                                    Beyond <span className="text-stone-300">Logics</span>.
                                </div>
                                <div>$ ./stats --integrity</div>
                                <div className="text-white/80 pl-4">99.9% build_success_rate</div>
                                <div>$ ./stats --latency</div>
                                <div className="text-white/80 pl-4">0.01ms execution_time</div>
                                <div className="flex items-center gap-2 mt-3">
                                    <span className="animate-pulse">_</span>
                                    <span className="text-white/60"># Ready for next command...</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    
                    {/* Mobile Code Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {/* Code Header */}
                        <div className="bg-black border border-stone-500/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-stone-500 text-xs">// system_architecture.js</span>
                            </div>
                            <div className="font-mono text-xs space-y-1">
                                <div className="text-gray-400">function</div>
                                <div className="text-white pl-4">architectEliteParity() {'{'}</div>
                                <div className="text-stone-500 pl-8">// Deconstruct complexity</div>
                                <div className="text-stone-500 pl-8">// Build modular systems</div>
                                <div className="text-white pl-8">return <span className="text-stone-300">"precision_scaled"</span>;</div>
                                <div className="text-white">{'}'}</div>
                            </div>
                        </div>
                        
                        {/* Mobile CTA */}
                        <Link to="/about" className="block">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-black border border-stone-500/50 rounded-lg p-4 font-mono text-xs text-stone-400 hover:bg-stone-500/10 transition-colors"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <span>$</span>
                                    <span>execute about_story()</span>
                                    <span className="animate-pulse">_</span>
                                </div>
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                {/* Desktop Layout - Unique Professional Design */}
                <div className="hidden md:block">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Glass Card Design */}
                        <div className="relative group">
                            {/* Background Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/20 via-stone-500/20 to-gray-400/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            
                            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 overflow-hidden">
                                {/* Floating Elements */}
                                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-gray-400 to-stone-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                                <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-stone-400 to-gray-500 rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-500" />
                                
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-gray-500/20 to-stone-500/20 rounded-full mb-4">
                                        <div className="w-2 h-2 bg-stone-400 rounded-full animate-pulse" />
                                        <span className="text-stone-400 text-xs font-bold tracking-wider">SYSTEM ACTIVE</span>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                        Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-stone-300 to-gray-500">Logics</span>
                                    </h3>
                                    <div className="w-16 h-1 bg-gradient-to-r from-gray-400 via-stone-400 to-gray-600 mx-auto rounded-full" />
                                </div>
                                
                                {/* Content */}
                                <div className="space-y-6">
                                    <p className="text-gray-200 text-lg leading-relaxed text-center">
                                        Engineering the art of <span className="text-white font-semibold">structuring chaos</span> into elegant, scalable digital experiences that push boundaries of what's possible.
                                    </p>
                                    
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-4 py-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-black text-gray-300">99.9%</div>
                                            <div className="text-xs text-gray-400 uppercase tracking-wider">Integrity</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-black text-stone-400">0.01ms</div>
                                            <div className="text-xs text-gray-400 uppercase tracking-wider">Latency</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-black text-gray-400">∞</div>
                                            <div className="text-xs text-gray-400 uppercase tracking-wider">Innovation</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Architecture Section */}
                        <div className="text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full mb-6">
                                <div className="w-2 h-2 bg-stone-400 rounded-full animate-pulse" />
                                <span className="text-stone-400 text-xs font-bold">ARCHITECTURE MODE</span>
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                                Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-200 to-transparent">Elite Systems</span>
                            </h2>
                            
                            <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
                                Specializing in deconstructing complex problems into modular, user-centric systems with precision scaling and high-vibrancy design philosophy.
                            </p>
                            
                            {/* CTA Button */}
                            <Link to="/about" className="inline-block">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative px-8 py-4 bg-gradient-to-r from-gray-600 via-stone-500 to-gray-700 text-white font-bold text-sm uppercase tracking-wider rounded-full overflow-hidden group border border-white/10"
                                >
                                    <span className="relative z-10 text-white/90">Explore Architecture</span>
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
        </div>
        </section>
    );
}
