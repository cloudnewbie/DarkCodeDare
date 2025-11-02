import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { HeroSection } from "@/components/HeroSection";
import { ReadingSection } from "@/components/ReadingSection";
import { SoundToggle } from "@/components/SoundToggle";
import { AtmosphericEffects } from "@/components/AtmosphericEffects";
import { CursorEffects } from "@/components/CursorEffects";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Scroll, LogOut } from "lucide-react";
import type { FortuneResponse, User } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import hauntedBg from "@assets/generated_images/Haunted_mansion_interior_background_d5a5c029.png";
import moonCard from "@assets/generated_images/Moon_tarot_card_illustration_2fb9b74f.png";
import starCard from "@assets/generated_images/Star_tarot_card_illustration_cb906cfa.png";
import deathCard from "@assets/generated_images/Death_tarot_card_illustration_857ead1a.png";

export default function Home() {
  const [showReading, setShowReading] = useState(false);
  const [fortune, setFortune] = useState<FortuneResponse | null>(null);
  const { toast } = useToast();
  const { user } = useAuth() as { user: User | null };

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
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-foreground text-glow-primary">
            The Haunted Fortune Teller
          </h2>
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-3 text-sm text-foreground/90">
                <Avatar className="w-8 h-8" data-testid="avatar-user">
                  <AvatarImage src={user.profileImageUrl || undefined} alt={user.email || "User"} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.firstName?.[0] || user.email?.[0]?.toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline" data-testid="text-user-name">
                  {user.firstName || user.email}
                </span>
              </div>
            )}
            <Button variant="outline" size="default" className="gap-2" data-testid="button-view-history" asChild>
              <Link href="/history">
                <Scroll className="w-4 h-4" />
                Fortune Archive
              </Link>
            </Button>
            <Button
              variant="outline"
              size="default"
              className="gap-2"
              onClick={() => window.location.href = '/api/logout'}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Leave Séance</span>
            </Button>
          </div>
        </div>
      </header>

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

      {/* Atmospheric effects */}
      <AtmosphericEffects />
      
      {/* Cursor effects */}
      <CursorEffects />

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
