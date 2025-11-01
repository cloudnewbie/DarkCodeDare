import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import crystalBall from "@assets/generated_images/Mystical_glowing_crystal_ball_9c893816.png";

interface HeroSectionProps {
  onBeginReading: () => void;
}

export function HeroSection({ onBeginReading }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fog overlay layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_100%)]" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              opacity: 0
            }}
            animate={{
              y: -50,
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            style={{
              filter: "blur(1px)",
              boxShadow: "0 0 10px hsl(var(--primary))"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <img 
            src={crystalBall} 
            alt="Mystical Crystal Ball" 
            className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-12 animate-float drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0 0 40px hsl(var(--primary) / 0.6))"
            }}
            data-testid="img-crystal-ball"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-6xl md:text-8xl font-bold mb-6 tracking-wider text-glow"
          data-testid="text-hero-title"
        >
          THE HAUNTED
          <br />
          <span className="text-primary animate-pulse-glow">FORTUNE TELLER</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-sans text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed italic"
          data-testid="text-hero-subtitle"
        >
          Step beyond the veil and unveil the mysteries that await you.
          <br />
          Let the spirits guide your destiny through the ancient art of tarot.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            size="lg"
            onClick={onBeginReading}
            className="px-12 py-6 text-lg font-serif tracking-widest uppercase relative group overflow-hidden"
            data-testid="button-begin-reading"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Sparkles className="w-5 h-5" />
              Unveil Your Fate
              <Sparkles className="w-5 h-5" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 text-sm text-muted-foreground font-sans uppercase tracking-widest"
          data-testid="text-hero-warning"
        >
          ⚠ The cards never lie ⚠
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
