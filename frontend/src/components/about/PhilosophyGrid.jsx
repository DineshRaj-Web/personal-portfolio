import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PhilosophyCard from "./PhilosophyCard";

const PhilosophyGrid = ({ isInView }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const philosophies = [
    { 
      title: "Clean Code", 
      desc: "I write code that is readable, maintainable, and scalable. Future-proof development is my standard." 
    },
    { 
      title: "User Centric", 
      desc: "Performance and accessibility aren't afterthoughts. They are the foundation of every user experience I build." 
    },
    { 
      title: "Rapid Iteration", 
      desc: "I ship fast without breaking things. CI/CD pipelines and automated testing ensure stability at speed." 
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mb-32"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[20px_20px]" />
        
        {/* Ambient Glows - Simplified on mobile */}
        {!isMobile && (
          <>
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.05, 0.08, 0.05]
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.03, 0.06, 0.03]
              }}
              transition={{ duration: 8, repeat: Infinity, delay: 2 }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl"
            />
          </>
        )}
      </div>

      {/* Enhanced Grid Layout */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto px-6 md:px-8">
        {philosophies.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.6, 
              delay: i * 0.2,
              ease: "easeOut"
            }}
            className="group"
          >
            <PhilosophyCard
              title={item.title}
              desc={item.desc}
              index={i}
              isInView={isInView}
            />
          </motion.div>
        ))}
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-linear-to-r from-transparent via-cyan-400/50 to-transparent"
      />
    </motion.section>
  );
};

export default PhilosophyGrid;
