import { motion } from "framer-motion";

const PhilosophyCard = ({ title, desc, index, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="relative group h-full"
    >
      {/* Card Background with Enhanced Styling */}
      <div className="relative h-full p-8 rounded-2xl bg-linear-to-br from-white/5 via-white/3 to-transparent border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:border-cyan-400/30 group-hover:bg-linear-to-br group-hover:from-cyan-500/5 group-hover:via-blue-500/3 group-hover:to-purple-500/5">
        
        {/* Animated Border Corners */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-2xl transition-all duration-300 group-hover:border-cyan-400/80" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-2xl transition-all duration-300 group-hover:border-cyan-400/80" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400/40 rounded-bl-2xl transition-all duration-300 group-hover:border-cyan-400/80" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400/40 rounded-br-2xl transition-all duration-300 group-hover:border-cyan-400/80" />

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-300" />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon/Number Indicator */}
          <div className="flex items-center justify-between mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.4, type: "spring" }}
              className="w-12 h-12 rounded-full bg-linear-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center"
            >
              <span className="text-cyan-400 font-mono font-bold text-lg">{index + 1}</span>
            </motion.div>
            
            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className="flex-1 h-px bg-linear-to-r from-cyan-400/50 to-transparent ml-4"
            />
          </div>

          {/* Title */}
          <motion.h3 
            className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p 
            className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
          >
            {desc}
          </motion.p>
        </div>

        {/* Subtle Inner Glow */}
        <div className="absolute inset-4 rounded-xl bg-linear-to-br from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

export default PhilosophyCard;
