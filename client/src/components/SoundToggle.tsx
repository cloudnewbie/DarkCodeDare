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

        // Create main gain node for volume control
        const mainGain = context.createGain();
        mainGain.gain.setValueAtTime(0, context.currentTime);
        mainGain.connect(context.destination);
        gainNodeRef.current = mainGain;

        // Layer 1: Deep drone (base ambient)
        const droneLow = context.createOscillator();
        droneLow.type = 'sine';
        droneLow.frequency.setValueAtTime(55, context.currentTime); // Low A
        const droneGain = context.createGain();
        droneGain.gain.setValueAtTime(0.12, context.currentTime);
        droneLow.connect(droneGain).connect(mainGain);
        droneLow.start();
        oscillatorsRef.current.push(droneLow);

        // Layer 2: Harmonic overtones
        const harmonics = [110, 165, 220]; // A2, E3, A3
        harmonics.forEach((freq, i) => {
          const osc = context.createOscillator();
          osc.type = i === 1 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(freq, context.currentTime);
          
          const oscGain = context.createGain();
          oscGain.gain.setValueAtTime([0.06, 0.04, 0.03][i], context.currentTime);
          
          osc.connect(oscGain).connect(mainGain);
          osc.start();
          oscillatorsRef.current.push(osc);
        });

        // Layer 3: Wind-like texture (low-frequency noise modulation)
        const windOsc = context.createOscillator();
        windOsc.type = 'sine';
        windOsc.frequency.setValueAtTime(0.3, context.currentTime); // Very slow LFO
        const windGain = context.createGain();
        windGain.gain.setValueAtTime(0.02, context.currentTime);
        windOsc.connect(windGain).connect(mainGain);
        windOsc.start();
        oscillatorsRef.current.push(windOsc);

        // Layer 4: Whisper-like texture (filtered noise)
        const bufferSize = context.sampleRate * 4; // 4 seconds of noise
        const noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        
        const noiseSource = context.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;
        
        // Filter for whisper effect
        const whisperFilter = context.createBiquadFilter();
        whisperFilter.type = 'bandpass';
        whisperFilter.frequency.setValueAtTime(2000, context.currentTime);
        whisperFilter.Q.setValueAtTime(0.5, context.currentTime);
        
        const whisperGain = context.createGain();
        whisperGain.gain.setValueAtTime(0.015, context.currentTime);
        
        noiseSource.connect(whisperFilter).connect(whisperGain).connect(mainGain);
        noiseSource.start();
        oscillatorsRef.current.push(noiseSource as any);

        // Layer 5: Distant chains/metallic texture (amplitude modulation)
        const chainOsc = context.createOscillator();
        chainOsc.type = 'square';
        chainOsc.frequency.setValueAtTime(800, context.currentTime);
        
        const chainLFO = context.createOscillator();
        chainLFO.type = 'sine';
        chainLFO.frequency.setValueAtTime(0.2, context.currentTime); // Slow pulsing
        
        const chainLFOGain = context.createGain();
        chainLFOGain.gain.setValueAtTime(0.5, context.currentTime);
        
        const chainGain = context.createGain();
        chainGain.gain.setValueAtTime(0.008, context.currentTime);
        
        chainLFO.connect(chainLFOGain).connect(chainGain.gain);
        chainOsc.connect(chainGain).connect(mainGain);
        chainOsc.start();
        chainLFO.start();
        oscillatorsRef.current.push(chainOsc, chainLFO);

        // Fade in the entire soundscape
        mainGain.gain.linearRampToValueAtTime(1, context.currentTime + 2);
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
