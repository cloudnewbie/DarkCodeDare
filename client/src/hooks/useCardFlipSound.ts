import { useRef } from "react";

export function useCardFlipSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playCreak = () => {
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = context;

      // Create creaking sound using frequency modulation
      const duration = 0.4;
      const now = context.currentTime;

      // Main creak oscillator
      const osc1 = context.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(180, now);
      osc1.frequency.exponentialRampToValueAtTime(120, now + duration);

      // Secondary creak for richness
      const osc2 = context.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(240, now);
      osc2.frequency.exponentialRampToValueAtTime(160, now + duration);

      // Noise for wood texture
      const bufferSize = context.sampleRate * duration;
      const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.3;
      }
      const noise = context.createBufferSource();
      noise.buffer = buffer;

      // Gain nodes
      const gain1 = context.createGain();
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + duration);

      const gain2 = context.createGain();
      gain2.gain.setValueAtTime(0.08, now);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + duration);

      const noiseGain = context.createGain();
      noiseGain.gain.setValueAtTime(0.05, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Connect everything
      osc1.connect(gain1).connect(context.destination);
      osc2.connect(gain2).connect(context.destination);
      noise.connect(noiseGain).connect(context.destination);

      // Start and stop
      osc1.start(now);
      osc2.start(now);
      noise.start(now);
      
      osc1.stop(now + duration);
      osc2.stop(now + duration);
      noise.stop(now + duration);

      // Cleanup
      setTimeout(() => {
        context.close();
      }, duration * 1000 + 100);
    } catch (error) {
      console.error("Card flip sound error:", error);
    }
  };

  return { playCreak };
}
