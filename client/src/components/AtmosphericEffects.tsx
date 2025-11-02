import { motion } from "framer-motion";

export function AtmosphericEffects() {
  return (
    <>
      {/* Animated fog layers */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(ellipse 800px 600px at 20% 40%, hsl(var(--primary) / 0.3) 0%, transparent 50%)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-15"
          style={{
            background: "radial-gradient(ellipse 600px 800px at 80% 60%, hsl(var(--accent) / 0.25) 0%, transparent 50%)",
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating candles */}
      <div className="fixed inset-0 pointer-events-none z-[2]">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`candle-${i}`}
            className="absolute w-1 bg-gradient-to-t from-orange-500/60 via-yellow-400/40 to-transparent"
            style={{
              left: `${15 + i * 25}%`,
              bottom: `${10 + i * 5}%`,
              height: "120px",
            }}
            animate={{
              opacity: [0.4, 0.8, 0.5, 0.7, 0.4],
              scaleY: [1, 1.1, 0.9, 1.05, 1],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-yellow-300/80 blur-sm"
              animate={{
                scale: [1, 1.3, 1, 1.2, 1],
                opacity: [0.6, 1, 0.7, 0.9, 0.6],
              }}
              transition={{
                duration: 1.5 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Cobwebs */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <svg className="absolute top-0 right-0 w-64 h-64 opacity-10" viewBox="0 0 200 200">
          <path
            d="M 10 10 Q 50 50 100 10 T 190 10 M 10 10 Q 50 50 10 100 T 10 190 M 10 10 L 190 190 M 190 10 L 10 190 M 100 10 L 100 190 M 10 100 L 190 100"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-foreground"
          />
          <circle cx="100" cy="100" r="2" fill="currentColor" className="text-foreground" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-48 h-48 opacity-8 rotate-180" viewBox="0 0 200 200">
          <path
            d="M 10 10 Q 50 50 100 10 T 190 10 M 10 10 Q 50 50 10 100 T 10 190 M 10 10 L 190 190 M 190 10 L 10 190"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-foreground"
          />
        </svg>
      </div>

      {/* Floating spirits */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`spirit-${i}`}
            className="absolute w-16 h-24 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-xl"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 15}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Vignette shadow */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div
          className="absolute inset-0"
          style={{
            boxShadow: "inset 0 0 120px 40px hsl(var(--background))",
          }}
        />
      </div>
    </>
  );
}
