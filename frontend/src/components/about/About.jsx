import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import AboutHeader from "./AboutHeader";
import PhilosophyGrid from "./PhilosophyGrid";
import JourneyTimeline from "./JourneyTimeline";
import BackgroundElements from "./BackgroundElements";

export default function About() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll-linked parallax (disabled on mobile)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden bg-black text-white"
    >
      {/* Background Elements - No parallax on mobile */}
      <BackgroundElements y={isMobile ? 0 : y} />

      <div className="relative w-full px-6 md:px-16">
        {/* Narrative Intro */}
        <AboutHeader isInView={isInView} />

        {/* Philosophy Grid */}
        <PhilosophyGrid isInView={isInView} />

        {/* Journey Timeline */}
        <JourneyTimeline isInView={isInView} />
      </div>
    </section>
  );
}
