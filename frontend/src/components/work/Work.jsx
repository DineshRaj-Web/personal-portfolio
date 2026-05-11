import { motion } from "framer-motion";
import WorkHero from "./WorkHero";
import ProjectGrid from "./ProjectGrid";
import Experience from "./Experience";

const Work = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 py-16 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto space-y-16 md:space-y-32"
      >
        <WorkHero />
        <Experience />
        <ProjectGrid />
      </motion.div>
    </div>
  );
};

export default Work;

