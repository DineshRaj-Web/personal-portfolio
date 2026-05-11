import { motion } from "framer-motion";

const SkillCard = ({ skill, index }) => {
  return (
    <motion.div
      key={skill.name}
      className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors group"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl pt-1">{skill.icon}</span>
          <div>
            <span className="text-white font-bold block">{skill.name}</span>
            <span className="text-xs text-gray-500">{skill.desc}</span>
          </div>
        </div>
        <span className="text-cyan-500/50 font-bold text-sm">{skill.level}%</span>
      </div>

      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default SkillCard;
