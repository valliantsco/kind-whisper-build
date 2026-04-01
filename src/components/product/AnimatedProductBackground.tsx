import { useRef, useEffect, useMemo, useCallback } from "react";
import { getProductBgTheme, type ProductBgTheme, type FloatingElement } from "@/data/product-bg-themes";

interface Props {
  slug: string;
}

// ── Seeded RNG for deterministic layouts per slug ──
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

// ── Individual element state for animation ──
interface AnimElement {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  opacityBase: number;
  rotation: number;
  rotationSpeed: number;
  blur: number;
  def: FloatingElement;
  pathD?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function AnimatedProductBackground({ slug }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const theme = useMemo(() => getProductBgTheme(slug), [slug]);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const initElements = useCallback(
    (w: number, h: number, theme: ProductBgTheme): AnimElement[] => {
      const rng = seededRandom(hashString(slug));
      const els: AnimElement[] = [];
      const mobile = w < 768;

      for (const def of theme.elements) {
        const count = mobile ? Math.ceil(def.count * 0.5) : def.count;
        for (let i = 0; i < count; i++) {
          const size = def.size[0] + rng() * (def.size[1] - def.size[0]);
          const opacityBase = def.opacity[0] + rng() * (def.opacity[1] - def.opacity[0]);
          els.push({
            x: rng() * w,
            y: rng() * h,
            vx: (rng() - 0.5) * def.speed * 0.3 * theme.animationSpeed,
            vy: (rng() - 0.5) * def.speed * 0.3 * theme.animationSpeed,
            size,
            opacity: opacityBase,
            opacityBase,
            rotation: rng() * Math.PI * 2,
            rotationSpeed: (rng() - 0.5) * 0.002 * theme.animationSpeed,
            blur: def.blur ?? 0,
            def,
            pathD: def.d,
          });
        }
      }
      return els;
    },
    [slug]
  );

  const initParticles = useCallback(
    (w: number, h: number, theme: ProductBgTheme): Particle[] => {
      const rng = seededRandom(hashString(slug + "_p"));
      const mobile = w < 768;
      const count = mobile ? Math.ceil(theme.particles.count * 0.4) : theme.particles.count;
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const maxLife = 300 + rng() * 600;
        particles.push({
          x: rng() * w,
          y: rng() * h,
          vx: (rng() - 0.5) * theme.particles.speed * theme.animationSpeed,
          vy: -rng() * theme.particles.speed * theme.animationSpeed * 0.5,
          size: theme.particles.sizeRange[0] + rng() * (theme.particles.sizeRange[1] - theme.particles.sizeRange[0]),
          opacity: theme.particles.opacity * (0.3 + rng() * 0.7),
          life: rng() * maxLife,
          maxLife,
        });
      }
      return particles;
    },
    [slug]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let elements: AnimElement[] = [];
    let particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      elements = initElements(w, h, theme);
      particles = initParticles(w, h, theme);
    };

    resize();
    window.addEventListener("resize", resize);

    // Grid drawing
    const drawGrid = (time: number) => {
      if (!theme.grid.enabled) return;
      const g = theme.grid;
      const offset = (time * (g.drift ?? 0)) % g.spacing;

      ctx.strokeStyle = `rgba(255,255,255,${g.opacity})`;
      ctx.lineWidth = 0.5;

      if (g.type === "dots") {
        ctx.fillStyle = `rgba(255,255,255,${g.opacity})`;
        for (let x = offset; x < w; x += g.spacing) {
          for (let y = offset; y < h; y += g.spacing) {
            ctx.beginPath();
            ctx.arc(x, y, 0.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (g.type === "orthogonal") {
        ctx.beginPath();
        for (let x = offset; x < w; x += g.spacing) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
        }
        for (let y = offset; y < h; y += g.spacing) {
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
        }
        ctx.stroke();
      } else if (g.type === "diagonal") {
        ctx.beginPath();
        const diag = Math.sqrt(w * w + h * h);
        for (let i = -diag; i < diag; i += g.spacing) {
          ctx.moveTo(i + offset, 0);
          ctx.lineTo(i + offset + h, h);
        }
        for (let i = -diag; i < diag; i += g.spacing) {
          ctx.moveTo(i + offset, 0);
          ctx.lineTo(i + offset - h, h);
        }
        ctx.stroke();
      } else if (g.type === "hexagonal") {
        ctx.fillStyle = `rgba(255,255,255,${g.opacity})`;
        const s = g.spacing;
        for (let row = 0; row < h / s + 1; row++) {
          for (let col = 0; col < w / s + 1; col++) {
            const x = col * s + (row % 2 ? s / 2 : 0) + offset;
            const y = row * s * 0.866 + offset;
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    // Element drawing
    const drawElement = (el: AnimElement, time: number) => {
      ctx.save();
      ctx.translate(el.x, el.y);
      ctx.rotate(el.rotation);
      ctx.globalAlpha = el.opacity * (0.7 + 0.3 * Math.sin(time * 0.001 + el.x));

      if (el.blur > 0) {
        ctx.filter = `blur(${el.blur}px)`;
      }

      const primaryColor = `hsla(11, 81%, 57%,`;
      const accentColor = `hsla(${theme.accentHsl},`;

      // Alternate between primary and accent
      const useAccent = (el.x + el.y) % 2 > 1;
      const color = useAccent ? accentColor : primaryColor;

      switch (el.def.type) {
        case "circle": {
          ctx.beginPath();
          ctx.arc(0, 0, el.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = `${color}${ctx.globalAlpha})`;
          ctx.fill();
          break;
        }
        case "rect": {
          ctx.strokeStyle = `${color}${ctx.globalAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.strokeRect(-el.size / 2, -el.size * 0.35, el.size, el.size * 0.7);
          break;
        }
        case "line": {
          ctx.beginPath();
          ctx.moveTo(-el.size / 2, 0);
          ctx.lineTo(el.size / 2, 0);
          ctx.strokeStyle = `${color}${ctx.globalAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
          break;
        }
        case "path": {
          if (el.pathD) {
            const p = new Path2D(el.pathD);
            ctx.scale(el.size / 30, el.size / 30);
            ctx.strokeStyle = `${color}${ctx.globalAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke(p);
          }
          break;
        }
        case "grid-node": {
          ctx.beginPath();
          ctx.arc(0, 0, 2, 0, Math.PI * 2);
          ctx.fillStyle = `${color}${ctx.globalAlpha})`;
          ctx.fill();
          break;
        }
      }

      ctx.restore();
    };

    // Animation loop
    let prevTime = 0;
    const animate = (time: number) => {
      const dt = Math.min(time - prevTime, 50); // cap at 50ms
      prevTime = time;

      ctx.clearRect(0, 0, w, h);

      // Layer 2: Grid
      drawGrid(time * 0.001);

      // Layer 4: Floating elements
      for (const el of elements) {
        el.x += el.vx * (dt * 0.06);
        el.y += el.vy * (dt * 0.06);
        el.rotation += el.rotationSpeed * dt;

        // Wrap around
        if (el.x < -el.size) el.x = w + el.size;
        if (el.x > w + el.size) el.x = -el.size;
        if (el.y < -el.size) el.y = h + el.size;
        if (el.y > h + el.size) el.y = -el.size;

        drawElement(el, time);
      }

      // Layer 5: Particles
      ctx.globalAlpha = 1;
      for (const p of particles) {
        p.life += dt * 0.01;
        if (p.life > p.maxLife) {
          p.life = 0;
          p.x = Math.random() * w;
          p.y = h + 10;
        }

        p.x += p.vx * (dt * 0.06);
        p.y += p.vy * (dt * 0.06);

        // Fade in/out
        const lifeRatio = p.life / p.maxLife;
        const fade = lifeRatio < 0.1 ? lifeRatio / 0.1 : lifeRatio > 0.9 ? (1 - lifeRatio) / 0.1 : 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity * fade})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [theme, initElements, initParticles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Layer 1: Ambient glows (CSS) */}
      {theme.glows.map((glow, i) => (
        <div
          key={i}
          className={
            glow.animation === "breathe"
              ? "animate-[breatheGlow_8s_ease-in-out_infinite]"
              : glow.animation === "drift"
              ? "animate-[driftGlow_20s_ease-in-out_infinite]"
              : glow.animation === "pulse"
              ? "animate-[pulseGlow_6s_ease-in-out_infinite]"
              : ""
          }
          style={{
            position: "absolute",
            left: glow.x,
            top: glow.y,
            width: isMobile ? `calc(${glow.size} * 0.7)` : glow.size,
            height: isMobile ? `calc(${glow.size} * 0.7)` : glow.size,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(ellipse at center, hsl(${glow.color} / ${glow.opacity * 6}) 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />
      ))}

      {/* Layer 2-5: Canvas (grid, elements, particles) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isMobile ? 0.7 : 1 }}
      />

      {/* Layer 6: Content contrast protection — vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, transparent 40%, hsl(0 0% 4% / 0.4) 100%),
            linear-gradient(to bottom, transparent 0%, hsl(0 0% 4% / 0.15) 30%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}
