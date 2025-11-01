import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { HeroSection } from "@/components/HeroSection";
import { ReadingSection } from "@/components/ReadingSection";
import { SoundToggle } from "@/components/SoundToggle";
import { useToast } from "@/hooks/use-toast";
import type { FortuneResponse } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import hauntedBg from "@assets/generated_images/Haunted_mansion_interior_background_d5a5c029.png";
import moonCard from "@assets/generated_images/Moon_tarot_card_illustration_2fb9b74f.png";
import starCard from "@assets/generated_images/Star_tarot_card_illustration_cb906cfa.png";
import deathCard from "@assets/generated_images/Death_tarot_card_illustration_857ead1a.png";

export default function Home() {
  const [showReading, setShowReading] = useState(false);
  const [fortune, setFortune] = useState<FortuneResponse | null>(null);
  const { toast } = useToast();

  const fortuneMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest<{cardName: string; fortuneText: string; cardImage: string}>("POST", "/api/fortune");
      
      // Map card image identifier to actual imported image
      const imageMap: Record<string, string> = {
        "moon": moonCard,
        "star": starCard,
        "death": deathCard,
      };

      return {
        cardName: response.cardName,
        fortuneText: response.fortuneText,
        cardImage: imageMap[response.cardImage] || moonCard
      };
    },
    onSuccess: (data) => {
      setFortune(data);
    },
    onError: (error) => {
      toast({
        title: "The spirits are restless",
        description: "Unable to connect with the ethereal realm. Please try again.",
        variant: "destructive",
      });
      console.error("Fortune generation error:", error);
    },
  });

  const handleBeginReading = () => {
    setShowReading(true);
    setTimeout(() => {
      const readingSection = document.getElementById("reading-section");
      readingSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleRequestFortune = () => {
    fortuneMutation.mutate();
  };

  const handleNewReading = () => {
    setFortune(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${hauntedBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80" />
      </div>

      {/* Floating fog effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, hsl(var(--accent) / 0.15) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <HeroSection onBeginReading={handleBeginReading} />
        
        {showReading && (
          <div id="reading-section">
            <ReadingSection
              fortune={fortune}
              isLoading={fortuneMutation.isPending}
              onRequestFortune={handleRequestFortune}
              onNewReading={handleNewReading}
            />
          </div>
        )}
      </div>

      {/* Sound Toggle */}
      <SoundToggle />

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-border/50 mt-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-serif text-lg text-muted-foreground mb-2">
            Created for <span className="text-primary font-bold">Kiroween 2025</span>
          </p>
          <p className="font-sans text-sm text-muted-foreground uppercase tracking-widest">
            May the spirits guide your path
          </p>
        </div>
      </footer>
    </div>
  );
}
