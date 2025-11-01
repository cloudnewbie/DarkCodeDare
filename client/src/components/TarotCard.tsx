import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cardBack from "@assets/generated_images/Ornate_tarot_card_back_bbc6b077.png";

interface TarotCardProps {
  isRevealed: boolean;
  cardImage: string;
  cardName: string;
  onFlip?: () => void;
  delay?: number;
}

export function TarotCard({ isRevealed, cardImage, cardName, onFlip, delay = 0 }: TarotCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (!isRevealed && onFlip) {
      setIsFlipped(true);
      setTimeout(() => {
        onFlip();
      }, 400);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="perspective-1000"
      data-testid={`card-tarot-${cardName.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <motion.div
        className="relative w-48 md:w-64 aspect-[2/3] cursor-pointer group"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isRevealed || isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        onClick={handleClick}
        whileHover={{ scale: 1.05, y: -10 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Card Back */}
        <div
          className="absolute inset-0 backface-hidden rounded-lg overflow-hidden border-2 border-primary/30"
          style={{ 
            backfaceVisibility: "hidden",
            boxShadow: "0 0 30px hsl(var(--primary) / 0.3)"
          }}
        >
          <img 
            src={cardBack} 
            alt="Tarot Card Back" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          {!isRevealed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-primary font-serif text-sm uppercase tracking-widest opacity-70 animate-pulse-glow">
                Tap to Reveal
              </div>
            </div>
          )}
        </div>

        {/* Card Front */}
        <div
          className="absolute inset-0 backface-hidden rounded-lg overflow-hidden border-2 border-accent/50"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: "0 0 40px hsl(var(--accent) / 0.4)"
          }}
        >
          <img 
            src={cardImage} 
            alt={cardName} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/90 to-transparent p-4">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-center text-accent tracking-wider">
              {cardName}
            </h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
