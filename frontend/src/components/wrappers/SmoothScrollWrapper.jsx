import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function SmoothScrollWrapper({ children }) {
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile for native scroll fallback
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // On mobile: use native scroll (no smooth scroll hijack)
    if (isMobile) {
        return <>{children}</>;
    }

    // Desktop: Smooth scroll implementation
    return <DesktopSmoothScroll contentRef={contentRef}>{children}</DesktopSmoothScroll>;
}

// Desktop-only smooth scroll component
function DesktopSmoothScroll({ children, contentRef }) {
    const [contentHeight, setContentHeight] = useState(0);

    // 1. Get native scroll position
    const { scrollY } = useScroll();

    // 2. Smooth it out with spring physics
    const smoothY = useSpring(scrollY, {
        mass: 0.1,
        stiffness: 75,
        damping: 15
    });

    // 3. Transform the spring value to a negative Y translation
    const y = useTransform(smoothY, (value) => -value);

    // 4. Measure content height to "fake" the body height
    useEffect(() => {
        if (!contentRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setContentHeight(entry.contentRect.height);
            }
        });

        resizeObserver.observe(contentRef.current);
        return () => resizeObserver.disconnect();
    }, [children, contentRef]);

    return (
        <>
            <motion.div
                ref={contentRef}
                style={{ y }}
                className="fixed top-0 left-0 w-full will-change-transform z-10"
            >
                {children}
            </motion.div>
            <div style={{ height: contentHeight }} />
        </>
    );
}
