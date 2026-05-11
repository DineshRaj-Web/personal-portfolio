import { motion } from "framer-motion";

const BackgroundElements = ({ y }) => {
  return (
    <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-50" />
    </motion.div>
  );
};

export default BackgroundElements;
