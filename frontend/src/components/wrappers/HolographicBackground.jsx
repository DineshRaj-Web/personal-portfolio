import { useEffect, useRef } from 'react';

const HolographicBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create floating particles
        const particles = [];
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'holographic-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 4}s`;
            particle.style.animationDuration = `${4 + Math.random() * 3}s`;
            container.appendChild(particle);
            particles.push(particle);
        }

        return () => {
            particles.forEach(particle => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            });
        };
    }, []);

    return (
        <div ref={containerRef} className="holographic-particles" />
    );
};

export default HolographicBackground;
