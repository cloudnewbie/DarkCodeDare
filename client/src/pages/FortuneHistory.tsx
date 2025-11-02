import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Scroll } from "lucide-react";
import { format } from "date-fns";
import type { Fortune } from "@shared/schema";
import moonCard from "@assets/generated_images/Moon_tarot_card_illustration_2fb9b74f.png";
import starCard from "@assets/generated_images/Star_tarot_card_illustration_cb906cfa.png";
import deathCard from "@assets/generated_images/Death_tarot_card_illustration_857ead1a.png";

// Map card image identifiers to actual imported assets
const imageMap: Record<string, string> = {
  "moon": moonCard,
  "star": starCard,
  "death": deathCard,
};

export default function FortuneHistory() {
  const { data: fortunes, isLoading } = useQuery<Fortune[]>({
    queryKey: ['/api/fortunes'],
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 text-glow-primary" data-testid="text-page-title">
              Fortune Archive
            </h1>
            <p className="font-sans text-xl text-muted-foreground italic" data-testid="text-page-subtitle">
              The spirits have left their mark upon these sacred records
            </p>
          </div>
          <Button variant="outline" size="lg" className="gap-2" data-testid="button-back-home" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Return to Séance
            </Link>
          </Button>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
              data-testid="loader-fortunes"
            />
          </div>
        )}

        {/* Fortune grid */}
        {!isLoading && fortunes && fortunes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <Scroll className="w-24 h-24 mx-auto mb-6 text-muted-foreground opacity-50" />
            <p className="font-serif text-2xl text-muted-foreground" data-testid="text-no-fortunes">
              No fortunes have been revealed yet.
              <br />
              <span className="text-lg">Begin your journey to inscribe the first prophecy.</span>
            </p>
            <Button size="lg" className="mt-8" data-testid="button-start-reading" asChild>
              <Link href="/">
                Seek Your Fortune
              </Link>
            </Button>
          </motion.div>
        )}

        {!isLoading && fortunes && fortunes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fortunes.map((fortune, index) => (
              <motion.div
                key={fortune.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`card-fortune-${fortune.id}`}
              >
                <Card className="relative border-2 border-primary/20 bg-card/90 backdrop-blur-sm overflow-hidden hover-elevate group">
                  {/* Tombstone top decoration */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  
                  {/* Card image */}
                  {fortune.cardImage && (
                    <div className="relative h-48 overflow-hidden border-b border-primary/20">
                      <img
                        src={imageMap[fortune.cardImage] || moonCard}
                        alt={fortune.cardName}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        data-testid={`img-card-${fortune.id}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                    </div>
                  )}

                  <CardContent className="p-6">
                    {/* Card name */}
                    <h3 className="font-serif text-2xl font-bold mb-3 text-primary text-glow-primary" data-testid={`text-card-name-${fortune.id}`}>
                      {fortune.cardName}
                    </h3>

                    {/* Fortune text */}
                    <p className="font-sans text-sm leading-relaxed text-foreground/90 mb-4 line-clamp-4" data-testid={`text-fortune-${fortune.id}`}>
                      {fortune.fortuneText}
                    </p>

                    {/* Timestamp */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider" data-testid={`text-timestamp-${fortune.id}`}>
                      <Scroll className="w-3 h-3" />
                      {format(new Date(fortune.timestamp), 'MMM dd, yyyy • HH:mm')}
                    </div>
                  </CardContent>

                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-accent/20 opacity-30" />
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-accent/20 opacity-30" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-accent/20 opacity-30" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-accent/20 opacity-30" />
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
