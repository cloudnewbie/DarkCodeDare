import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const toggleSound = async () => {
    try {
      if (isPlaying) {
        // Stop all oscillators
        oscillatorsRef.current.forEach(osc => {
          try {
            osc.stop();
          } catch (e) {
            // Already stopped
          }
        });
        oscillatorsRef.current = [];
        
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        gainNodeRef.current = null;
        setIsPlaying(false);
      } else {
        // Create new audio context
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        const context = audioContextRef.current;

        // Resume if suspended (browser autoplay policy)
        if (context.state === 'suspended') {
          await context.resume();
        }

        // Create gain node for volume control
        const gainNode = context.createGain();
        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.connect(context.destination);
        gainNodeRef.current = gainNode;

        // Create multiple oscillators for a rich, haunting ambient sound
        const frequencies = [110, 220, 165]; // A2, A3, E3 - creates an eerie chord
        const types: OscillatorType[] = ['sine', 'sine', 'triangle'];
        const volumes = [0.08, 0.05, 0.03];

        frequencies.forEach((freq, i) => {
          const osc = context.createOscillator();
          osc.type = types[i];
          osc.frequency.setValueAtTime(freq, context.currentTime);
          
          // Individual gain for this oscillator
          const oscGain = context.createGain();
          oscGain.gain.setValueAtTime(volumes[i], context.currentTime);
          
          osc.connect(oscGain);
          oscGain.connect(gainNode);
          osc.start();
          
          oscillatorsRef.current.push(osc);
        });

        // Fade in
        gainNode.gain.linearRampToValueAtTime(1, context.currentTime + 1);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Audio error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Button
        size="icon"
        variant="outline"
        onClick={toggleSound}
        className="w-14 h-14 rounded-full border-2 border-primary/50 bg-background/80 backdrop-blur-sm hover:border-primary hover:bg-primary/10 group"
        data-testid="button-sound-toggle"
        aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
        )}
      </Button>

      {isPlaying && (
        <motion.div
          className="absolute -inset-2 rounded-full border-2 border-primary/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
}
