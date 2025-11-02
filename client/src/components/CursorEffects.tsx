import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
}

export function CursorEffects() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let particleId = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Create particle trail occasionally
      if (Math.random() > 0.9) {
        const newParticle: Particle = {
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
        };
        
        setParticles(prev => [...prev, newParticle].slice(-15));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  // Clean up old particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.slice(-10));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Crystal ball cursor glow */}
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-primary/20 blur-xl"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Ghostly particle trail */}
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-accent/40"
          initial={{
            x: particle.x,
            y: particle.y,
            scale: 1,
            opacity: 0.6,
          }}
          animate={{
            y: particle.y - 40,
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
          style={{
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      ))}
    </div>
  );
}
