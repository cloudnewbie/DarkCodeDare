import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Create an AudioContext for generating ambient drone sounds
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create oscillators for a haunting ambient sound
      const createAmbientSound = () => {
        if (!audioContextRef.current) return;

        const context = audioContextRef.current;
        
        // Create oscillator for deep drone
        const oscillator = context.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(55, context.currentTime); // Low A note
        
        // Create gain node for volume control
        const gainNode = context.createGain();
        gainNode.gain.setValueAtTime(0.15, context.currentTime);
        
        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillatorRef.current = oscillator;
        gainNodeRef.current = gainNode;
      };

      createAmbientSound();
    } catch (error) {
      console.error("Audio context creation failed:", error);
      setAudioError(true);
    }

    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch (e) {
          // Oscillator might not be started
        }
        oscillatorRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  const toggleSound = async () => {
    if (audioError || !audioContextRef.current || !oscillatorRef.current || !gainNodeRef.current) {
      console.error("Audio not available");
      return;
    }

    try {
      if (isPlaying) {
        // Stop the sound by ramping down volume
        gainNodeRef.current.gain.exponentialRampToValueAtTime(
          0.001,
          audioContextRef.current.currentTime + 0.5
        );
        setTimeout(() => {
          if (oscillatorRef.current) {
            try {
              oscillatorRef.current.stop();
            } catch (e) {
              // Already stopped
            }
          }
          setIsPlaying(false);
        }, 500);
      } else {
        // Resume audio context if suspended
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        // Recreate oscillator if needed
        if (oscillatorRef.current && audioContextRef.current) {
          const context = audioContextRef.current;
          const oscillator = context.createOscillator();
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(55, context.currentTime);
          
          oscillator.connect(gainNodeRef.current);
          oscillator.start();
          oscillatorRef.current = oscillator;

          // Ramp up volume
          gainNodeRef.current.gain.setValueAtTime(0.001, context.currentTime);
          gainNodeRef.current.gain.exponentialRampToValueAtTime(0.15, context.currentTime + 0.5);
        }

        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Audio playback error:", error);
      setAudioError(true);
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
