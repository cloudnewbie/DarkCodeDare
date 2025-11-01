import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Scroll } from "lucide-react";

interface FortuneDisplayProps {
  fortuneText: string;
  isRevealing: boolean;
}

export function FortuneDisplay({ fortuneText, isRevealing }: FortuneDisplayProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isRevealing) {
      setDisplayedText("");
      setCurrentIndex(0);
      return;
    }

    if (currentIndex < fortuneText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fortuneText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);

      return () => clearTimeout(timeout);
    }
  }, [isRevealing, currentIndex, fortuneText]);

  if (!isRevealing && !displayedText) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-3xl mx-auto mt-16"
      data-testid="container-fortune-display"
    >
      <Card className="relative border-2 border-primary/30 bg-card/80 backdrop-blur-sm overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-accent opacity-30" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-accent opacity-30" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-accent opacity-30" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-accent opacity-30" />

        <CardContent className="p-8 md:p-12">
          <div className="flex items-center justify-center mb-6">
            <Scroll className="w-8 h-8 text-primary animate-pulse-glow" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-8 tracking-wide text-primary">
            Your Fortune
          </h2>

          <div 
            className="font-sans text-lg md:text-xl leading-relaxed text-foreground relative"
            style={{
              textShadow: "0 0 20px hsl(var(--background))"
            }}
            data-testid="text-fortune-content"
          >
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              {displayedText}
              {currentIndex < fortuneText.length && (
                <span className="inline-block w-1 h-6 bg-primary ml-1 animate-flicker" />
              )}
            </p>
          </div>

          {/* Mystical glow effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                background: "radial-gradient(circle at center, hsl(var(--primary)) 0%, transparent 70%)"
              }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
