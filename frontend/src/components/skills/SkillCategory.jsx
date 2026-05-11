import { motion } from "framer-motion";

const SkillCategory = ({ category, categoryIndex }) => {
  return (
    <motion.div
      key={category.label}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
      className="mb-12"
    >
      {/* Terminal-style category header */}
      <motion.div
        className="flex items-center gap-3 mb-6 group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <motion.span
          className="text-cyan-400 font-mono text-sm"
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: categoryIndex * 0.5
          }}
        >
          $
        </motion.span>
        <span className="text-purple-400 font-mono text-sm">const</span>
        <span className="text-cyan-400 font-mono text-sm group-hover:text-cyan-300 transition-colors duration-300">
          {category.label.replace(/\s*&\s*/g, '_').replace(/\s+/g, '_').toLowerCase()}
        </span>
        <span className="text-gray-500 font-mono text-sm">=</span>
        <span className="text-green-400 font-mono text-sm">[</span>
      </motion.div>

      {/* Skills as code array elements */}
      <div className="ml-10 space-y-2">
        {category.items.map((item, itemIndex) => (
          <motion.div
            key={item}
            className="flex items-center gap-3 group cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: itemIndex * 0.08 + categoryIndex * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
          >
            <span className="text-gray-600 font-mono text-xs group-hover:text-cyan-400 transition-colors duration-300 w-8 text-right">
              {String(itemIndex).padStart(2, '0')}
            </span>
            <span className="text-gray-500 font-mono text-sm group-hover:text-purple-400 transition-colors duration-300">
              =&gt;
            </span>
            <span className="text-yellow-400 font-mono text-sm">"</span>
            <motion.span
              className="text-white font-mono text-sm group-hover:text-cyan-300 transition-colors duration-300 relative"
              whileHover={{ textShadow: "0 0 8px rgba(6, 182, 212, 0.5)" }}
            >
              {item}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.span>
            <span className="text-yellow-400 font-mono text-sm">"</span>
            <span className="text-gray-500 font-mono text-sm">
              {itemIndex < category.items.length - 1 ? ',' : ''}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Closing bracket with enhanced styling */}
      <motion.div
        className="ml-10 mt-4 flex items-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: category.items.length * 0.08 + categoryIndex * 0.2 }}
      >
        <span className="text-green-400 font-mono text-sm">]</span>
        <span className="text-gray-500 font-mono text-sm">;</span>
      </motion.div>
    </motion.div>
  );
};

export default SkillCategory;
