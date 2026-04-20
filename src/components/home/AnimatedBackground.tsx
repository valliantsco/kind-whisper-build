import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Animated background elements themed around electric mobility:
 * - Electric circuit traces that pulse with energy
 * - Floating battery charge particles
 * - Lightning bolt SVG paths
 * - Rotating wheel/gear silhouettes
 * - Energy wave pulses
 */

/* ── Helpers ── */
const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

/* ── Circuit Trace. animated SVG paths that look like PCB traces ── */
const CircuitTraces = () => {
  const traces = useMemo(
    () => [
      // Left side vertical circuit
      {
        d: "M80,200 L80,340 L160,340 L160,420 L80,420 L80,520",
        top: "8%",
        left: "4%",
        delay: 0,
      },
      // Right side L-shaped trace
      {
        d: "M0,0 L120,0 L120,80 L200,80 L200,180 L280,180",
        top: "30%",
        right: "3%",
        delay: 2,
      },
      // Bottom left T-junction
      {
        d: "M40,0 L40,100 L0,100 M40,100 L80,100 M40,100 L40,200",
        top: "60%",
        left: "8%",
        delay: 4,
      },
      // Top right zigzag
      {
        d: "M0,60 L60,60 L60,0 L120,0 L120,60 L180,60",
        top: "15%",
        right: "12%",
        delay: 1.5,
      },
      // Mid-left branch
      {
        d: "M0,0 L0,120 L60,120 L60,200 M0,120 L-60,120",
        top: "45%",
        left: "15%",
        delay: 3,
      },
    ],
    [],
  );

  return (
    <>
      {traces.map((trace, i) => (
        <svg
          key={`circuit-${i}`}
          className="absolute pointer-events-none"
          style={{
            top: trace.top,
            left: (trace as any).left,
            right: (trace as any).right,
            width: 300,
            height: 250,
            overflow: "visible",
          }}
        >
          {/* Base trace. dim */}
          <path
            d={trace.d}
            fill="none"
            stroke="hsl(var(--primary) / 0.04)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Animated energy pulse along the trace */}
          <motion.path
            d={trace.d}
            fill="none"
            stroke="hsl(var(--primary) / 0.25)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{
              pathLength: [0, 0.3, 0],
              pathOffset: [0, 0.7, 1],
            }}
            transition={{
              duration: 5,
              delay: trace.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.4))",
            }}
          />
          {/* Node dots at junctions */}
          {[
            { x: trace.d.match(/^M([\d.]+),([\d.]+)/)?.[1], y: trace.d.match(/^M([\d.]+),([\d.]+)/)?.[2] },
          ]
            .filter((n) => n.x && n.y)
            .map((node, j) => (
              <motion.circle
                key={j}
                cx={Number(node.x)}
                cy={Number(node.y)}
                r="3"
                fill="hsl(var(--primary) / 0.15)"
                animate={{
                  r: [3, 5, 3],
                  opacity: [0.15, 0.4, 0.15],
                }}
                transition={{
                  duration: 3,
                  delay: trace.delay + 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
        </svg>
      ))}
    </>
  );
};

/* ── Lightning Bolts. small stylized bolts that flash periodically ── */
const LightningBolts = () => {
  const bolts = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        top: `${15 + i * 14}%`,
        left: `${10 + ((i * 17 + 7) % 80)}%`,
        scale: 0.5 + Math.random() * 0.6,
        delay: i * 1.8,
        rotation: -15 + Math.random() * 30,
      })),
    [],
  );

  return (
    <>
      {bolts.map((bolt, i) => (
        <motion.svg
          key={`bolt-${i}`}
          className="absolute pointer-events-none"
          width="24"
          height="32"
          viewBox="0 0 24 32"
          style={{
            top: bolt.top,
            left: bolt.left,
            transform: `scale(${bolt.scale}) rotate(${bolt.rotation}deg)`,
          }}
          animate={{
            opacity: [0, 0, 0.35, 0.5, 0, 0],
            scale: [bolt.scale * 0.8, bolt.scale, bolt.scale * 1.2, bolt.scale, bolt.scale * 0.8],
          }}
          transition={{
            duration: 4,
            delay: bolt.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d="M14 0L6 14H12L10 32L18 16H12L14 0Z"
            fill="hsl(var(--primary) / 0.2)"
            style={{
              filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.3))",
            }}
          />
        </motion.svg>
      ))}
    </>
  );
};

/* ── Energy Particles. floating dots that drift upward like charging sparks ── */
const EnergyParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        x: `${5 + ((i * 5.5 + 3) % 90)}%`,
        size: 2 + Math.random() * 3,
        duration: 8 + Math.random() * 12,
        delay: i * 0.7,
        drift: randomBetween(-30, 30),
      })),
    [],
  );

  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x,
            bottom: "-2%",
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, hsl(var(--primary) / 0.1) 70%)`,
            boxShadow: `0 0 ${p.size * 2}px hsl(var(--primary) / 0.3)`,
          }}
          animate={{
            y: [0, -800 - Math.random() * 600],
            x: [0, p.drift, -p.drift * 0.5, p.drift * 0.3],
            opacity: [0, 0.6, 0.8, 0.4, 0],
            scale: [0.5, 1, 1.2, 0.8, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
};

/* ── Rotating Gear/Wheel. stylized cog silhouettes that rotate slowly ── */
const RotatingGears = () => {
  const gears = useMemo(
    () => [
      { top: "20%", right: "6%", size: 80, duration: 40, opacity: 0.03, direction: 1 },
      { top: "55%", left: "5%", size: 60, duration: 35, opacity: 0.025, direction: -1 },
      { top: "75%", right: "15%", size: 100, duration: 50, opacity: 0.02, direction: 1 },
    ],
    [],
  );

  const gearPath = (size: number) => {
    const r = size / 2;
    const teeth = 12;
    const innerR = r * 0.7;
    const outerR = r * 0.95;
    const toothWidth = (Math.PI * 2) / teeth / 2;
    let d = "";
    for (let i = 0; i < teeth; i++) {
      const angle = (i / teeth) * Math.PI * 2;
      const x1 = r + Math.cos(angle - toothWidth / 2) * innerR;
      const y1 = r + Math.sin(angle - toothWidth / 2) * innerR;
      const x2 = r + Math.cos(angle - toothWidth / 3) * outerR;
      const y2 = r + Math.sin(angle - toothWidth / 3) * outerR;
      const x3 = r + Math.cos(angle + toothWidth / 3) * outerR;
      const y3 = r + Math.sin(angle + toothWidth / 3) * outerR;
      const x4 = r + Math.cos(angle + toothWidth / 2) * innerR;
      const y4 = r + Math.sin(angle + toothWidth / 2) * innerR;
      d += `${i === 0 ? "M" : "L"}${x1},${y1} L${x2},${y2} L${x3},${y3} L${x4},${y4} `;
    }
    d += "Z";
    return d;
  };

  return (
    <>
      {gears.map((gear, i) => (
        <motion.svg
          key={`gear-${i}`}
          className="absolute pointer-events-none"
          width={gear.size}
          height={gear.size}
          viewBox={`0 0 ${gear.size} ${gear.size}`}
          style={{
            top: gear.top,
            left: (gear as any).left,
            right: (gear as any).right,
            opacity: gear.opacity,
          }}
          animate={{ rotate: gear.direction * 360 }}
          transition={{
            duration: gear.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <path
            d={gearPath(gear.size)}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
          />
          <circle
            cx={gear.size / 2}
            cy={gear.size / 2}
            r={gear.size * 0.2}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
          />
        </motion.svg>
      ))}
    </>
  );
};

/* ── Electric Pulse Waves. concentric rings that expand outward ── */
const PulseWaves = () => {
  const sources = useMemo(
    () => [
      { top: "35%", left: "50%", delay: 0 },
      { top: "70%", left: "20%", delay: 3 },
      { top: "25%", left: "80%", delay: 6 },
    ],
    [],
  );

  return (
    <>
      {sources.map((src, i) =>
        [0, 1, 2].map((ring) => (
          <motion.div
            key={`pulse-${i}-${ring}`}
            className="absolute pointer-events-none rounded-full"
            style={{
              top: src.top,
              left: src.left,
              width: 4,
              height: 4,
              border: "1px solid hsl(var(--primary) / 0.15)",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              width: [4, 200, 400],
              height: [4, 200, 400],
              opacity: [0.3, 0.15, 0],
              borderWidth: [1.5, 1, 0.5],
            }}
            transition={{
              duration: 6,
              delay: src.delay + ring * 1.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )),
      )}
    </>
  );
};

/* ── Battery Charge Icon. fills up periodically ── */
const ChargingBatteries = () => {
  const batteries = useMemo(
    () => [
      { top: "42%", right: "8%", scale: 0.8, delay: 0 },
      { top: "68%", left: "6%", scale: 0.7, delay: 3 },
    ],
    [],
  );

  return (
    <>
      {batteries.map((bat, i) => (
        <svg
          key={`battery-${i}`}
          className="absolute pointer-events-none"
          width="36"
          height="20"
          viewBox="0 0 36 20"
          style={{
            top: bat.top,
            left: (bat as any).left,
            right: (bat as any).right,
            transform: `scale(${bat.scale})`,
            opacity: 0.06,
          }}
        >
          {/* Battery outline */}
          <rect
            x="1"
            y="2"
            width="30"
            height="16"
            rx="3"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
          />
          <rect
            x="32"
            y="6"
            width="3"
            height="8"
            rx="1"
            fill="hsl(var(--primary) / 0.5)"
          />
          {/* Animated fill */}
          <motion.rect
            x="4"
            y="5"
            width="24"
            height="10"
            rx="1.5"
            fill="hsl(var(--primary) / 0.4)"
            initial={{ width: 0 }}
            animate={{ width: [0, 24, 24, 0] }}
            transition={{
              duration: 6,
              delay: bat.delay,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.4, 0.7, 1],
            }}
          />
        </svg>
      ))}
    </>
  );
};

/* ── Main Export ── */
const AnimatedBackground = () => {
  // Reduce animated elements on mobile for performance
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <CircuitTraces />
      {!isMobile && <LightningBolts />}
      <EnergyParticles />
      {!isMobile && <RotatingGears />}
      {!isMobile && <PulseWaves />}
      <ChargingBatteries />
    </div>
  );
};

export default AnimatedBackground;
