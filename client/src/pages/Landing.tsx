import { Button } from "@/components/ui/button";
import { AtmosphericEffects } from "@/components/AtmosphericEffects";
import { CursorEffects } from "@/components/CursorEffects";
import hauntedBg from "@assets/generated_images/Haunted_mansion_interior_background_d5a5c029.png";
import { motion } from "framer-motion";

export default function Landing() {

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <AtmosphericEffects />
      <CursorEffects />

      <div className="relative h-screen overflow-hidden">
        <img
          src={hauntedBg}
          alt="Haunted mansion interior"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-primary text-glow-primary animate-drip"
                data-testid="text-title">
              The Haunted<br />Fortune Teller
            </h1>

            <p className="font-serif text-2xl md:text-3xl text-foreground/90 italic max-w-2xl mx-auto"
               data-testid="text-subtitle">
              The spirits await beyond the veil...<br />
              Enter the séance chamber and unveil your destiny
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="pt-8"
            >
              <Button
                size="lg"
                className="text-xl px-12 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => window.location.href = '/api/login'}
                data-testid="button-login"
              >
                Enter the Séance
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-muted-foreground text-sm pt-4"
              data-testid="text-info"
            >
              Sign in to save your fortunes and track your supernatural journey
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
