import { useState } from "react";
import { motion } from "framer-motion";
import { TarotCard } from "./TarotCard";
import { FortuneDisplay } from "./FortuneDisplay";
import { Button } from "@/components/ui/button";
import { RotateCcw, Loader2 } from "lucide-react";
import type { FortuneResponse } from "@shared/schema";
import moonCard from "@assets/generated_images/Moon_tarot_card_illustration_2fb9b74f.png";
import starCard from "@assets/generated_images/Star_tarot_card_illustration_cb906cfa.png";
import deathCard from "@assets/generated_images/Death_tarot_card_illustration_857ead1a.png";

interface ReadingSectionProps {
  fortune: FortuneResponse | null;
  isLoading: boolean;
  onRequestFortune: () => void;
  onNewReading: () => void;
}

const CARD_IMAGES = [moonCard, starCard, deathCard];

export function ReadingSection({ fortune, isLoading, onRequestFortune, onNewReading }: ReadingSectionProps) {
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const [showFortune, setShowFortune] = useState(false);

  const handleCardFlip = () => {
    setIsCardRevealed(true);
    setTimeout(() => {
      setShowFortune(true);
    }, 1000);
  };

  const handleNewReading = () => {
    setIsCardRevealed(false);
    setShowFortune(false);
    onNewReading();
  };

  // Get the actual card image if fortune is available
  const cardImage = fortune?.cardImage || CARD_IMAGES[0];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4 tracking-wider text-glow">
            The Reading Begins
          </h2>
          <p className="font-sans text-lg md:text-xl text-muted-foreground italic">
            Focus your mind and draw a card from the ethereal deck...
          </p>
        </motion.div>

        {/* Crystal Ball / Card Display */}
        <div className="flex flex-col items-center justify-center mb-16">
          {!fortune && !isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative group cursor-pointer"
              onClick={onRequestFortune}
              data-testid="button-request-fortune"
            >
              <div className="relative w-64 h-64 md:w-96 md:h-96">
                {/* Pulsing glow rings */}
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-glow" 
                     style={{ boxShadow: "0 0 60px hsl(var(--primary) / 0.4)" }} 
                />
                <div className="absolute inset-8 rounded-full bg-primary/10 animate-pulse-glow" 
                     style={{ animationDelay: "0.3s" }} 
                />
                
                {/* Crystal ball center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-primary/40 via-accent/30 to-primary/40 backdrop-blur-xl border-2 border-primary/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <div className="text-center p-8">
                      <p className="font-serif text-2xl md:text-3xl font-bold text-primary mb-3 tracking-wide">
                        Touch the Sphere
                      </p>
                      <p className="font-sans text-sm text-muted-foreground">
                        and receive your fortune
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-6"
              data-testid="container-loading"
            >
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
              <p className="font-serif text-2xl text-primary animate-pulse-glow">
                Consulting the spirits...
              </p>
            </motion.div>
          )}

          {fortune && !isLoading && (
            <div className="flex flex-col items-center">
              <TarotCard
                isRevealed={isCardRevealed}
                cardImage={cardImage}
                cardName={fortune.cardName}
                onFlip={handleCardFlip}
                delay={0.2}
              />
            </div>
          )}
        </div>

        {/* Fortune Display */}
        {fortune && showFortune && (
          <FortuneDisplay
            fortuneText={fortune.fortuneText}
            isRevealing={showFortune}
          />
        )}

        {/* New Reading Button */}
        {fortune && showFortune && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex justify-center mt-12"
          >
            <Button
              size="lg"
              variant="outline"
              onClick={handleNewReading}
              className="px-8 py-6 text-lg font-serif tracking-wider uppercase border-2 border-primary/50 hover:border-primary"
              data-testid="button-new-reading"
            >
              <RotateCcw className="w-5 h-5 mr-3" />
              Seek Another Vision
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
