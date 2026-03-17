import React, { useRef, useEffect, useCallback } from "react";

/**
 * GlobeZoomCanvas
 * ───────────────
 * Pure Canvas 2D animation that:
 *   Phase 0  → Dark globe with orange lat/lng grid, slowly rotating
 *   Phase 1  → Zoom into South America / Brazil
 *   Phase 2  → Zoom into Uberlândia region, showing street grid
 *   Phase 3  → Pin drops at MS Eletric, pulse ring loops
 * Then it loops back.
 */

// Uberlândia coords
const UBR_LAT = -18.9186;
const UBR_LNG = -48.2772;

// Colors
const BG = "#080808";
const ORANGE = "hsl(11, 81%, 57%)";
const ORANGE_DIM = "hsla(11, 81%, 57%, 0.12)";
const ORANGE_MED = "hsla(11, 81%, 57%, 0.3)";
const ORANGE_BRIGHT = "hsla(11, 90%, 65%, 0.9)";
const WHITE_DIM = "rgba(255,255,255,0.04)";
const WHITE_FAINT = "rgba(255,255,255,0.08)";
const WHITE_TEXT = "rgba(255,255,255,0.5)";

// Easing
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Simplified continent outlines (lat, lng) — enough to be recognizable
const SOUTH_AMERICA: [number, number][] = [
  [12,-70],[10,-75],[7,-77],[4,-77],[2,-80],[0,-80],[-2,-80],[-5,-79],
  [-5,-76],[-4,-73],[-2,-70],[0,-65],[2,-60],[5,-55],[7,-52],[5,-45],
  [2,-42],[0,-40],[-2,-38],[-5,-35],[-8,-35],[-10,-37],[-13,-39],
  [-15,-40],[-18,-40],[-20,-41],[-23,-43],[-25,-48],[-28,-49],
  [-30,-50],[-33,-52],[-35,-55],[-38,-57],[-40,-62],[-42,-63],
  [-45,-65],[-48,-66],[-50,-68],[-52,-70],[-55,-68],[-54,-65],
  [-52,-62],[-50,-60],[-47,-58],[-44,-56],[-40,-55],[-37,-53],
  [-33,-50],[-30,-48],[-25,-46],[-20,-42],[-15,-40],[-12,-38],
  [-8,-34],[-5,-34],[-3,-35],[-1,-37],[0,-40],[2,-50],[5,-52],
  [8,-60],[10,-62],[11,-65],[12,-70]
];

const BRAZIL_FILL: [number, number][] = [
  [5,-52],[2,-42],[0,-40],[-2,-38],[-5,-35],[-8,-35],[-10,-37],
  [-13,-39],[-15,-40],[-18,-40],[-20,-41],[-23,-43],[-25,-48],
  [-28,-49],[-30,-50],[-33,-52],[-30,-48],[-25,-46],[-20,-42],
  [-18,-42],[-15,-47],[-12,-50],[-10,-55],[-8,-58],[-5,-60],
  [-2,-65],[0,-65],[-2,-70],[-5,-76],[-5,-79],[-2,-80],[0,-80],
  [2,-80],[4,-77],[5,-72],[4,-65],[3,-60],[5,-55],[5,-52]
];

const NORTH_AMERICA: [number, number][] = [
  [15,-88],[20,-90],[25,-95],[30,-100],[32,-105],[35,-110],[38,-115],
  [40,-120],[45,-124],[48,-123],[50,-120],[53,-115],[55,-110],[58,-100],
  [60,-95],[58,-85],[55,-78],[50,-72],[45,-68],[42,-70],[40,-74],
  [38,-76],[35,-80],[30,-82],[28,-82],[25,-80],[20,-87],[15,-88]
];

const AFRICA: [number, number][] = [
  [37,-5],[35,0],[33,5],[30,10],[25,15],[20,17],[15,17],[10,10],
  [5,5],[0,10],[-5,12],[-8,15],[-12,20],[-15,25],[-20,28],[-25,30],
  [-30,32],[-34,27],[-34,20],[-30,18],[-25,15],[-20,12],[-15,10],
  [-10,8],[-5,3],[0,0],[5,-5],[10,-10],[15,-15],[20,-17],[25,-15],
  [30,-10],[35,-5],[37,-5]
];

// Street grid around Uberlândia (simplified block layout)
function drawStreetGrid(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  scale: number, alpha: number
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = ORANGE_DIM;
  ctx.lineWidth = 1;

  // Main avenues (thicker)
  ctx.strokeStyle = ORANGE_MED;
  ctx.lineWidth = 1.5;

  // Av. João Pinheiro (vertical, main)
  const jpX = cx + 2 * scale;
  ctx.beginPath();
  ctx.moveTo(jpX, cy - 30 * scale);
  ctx.lineTo(jpX, cy + 30 * scale);
  ctx.stroke();

  // Av. Brasil (horizontal)
  const brY = cy - 5 * scale;
  ctx.beginPath();
  ctx.moveTo(cx - 30 * scale, brY);
  ctx.lineTo(cx + 30 * scale, brY);
  ctx.stroke();

  // Av. Afonso Pena (vertical, right)
  const apX = cx + 15 * scale;
  ctx.beginPath();
  ctx.moveTo(apX, cy - 30 * scale);
  ctx.lineTo(apX, cy + 30 * scale);
  ctx.stroke();

  // Secondary streets (grid pattern)
  ctx.strokeStyle = ORANGE_DIM;
  ctx.lineWidth = 0.8;

  // Horizontal streets
  for (let i = -4; i <= 4; i++) {
    if (i === 0) continue;
    const y = cy + i * 7 * scale;
    ctx.beginPath();
    ctx.moveTo(cx - 30 * scale, y);
    ctx.lineTo(cx + 30 * scale, y);
    ctx.stroke();
  }

  // Vertical streets
  for (let i = -4; i <= 4; i++) {
    const x = cx + i * 7 * scale;
    if (Math.abs(x - jpX) < 2 || Math.abs(x - apX) < 2) continue;
    ctx.beginPath();
    ctx.moveTo(x, cy - 30 * scale);
    ctx.lineTo(x, cy + 30 * scale);
    ctx.stroke();
  }

  // Blocks (filled rectangles)
  ctx.fillStyle = "rgba(255,255,255,0.015)";
  for (let row = -3; row < 4; row++) {
    for (let col = -3; col < 4; col++) {
      const bx = cx + col * 7 * scale + 1 * scale;
      const by = cy + row * 7 * scale + 1 * scale;
      const bw = 5 * scale;
      const bh = 5 * scale;
      ctx.fillRect(bx, by, bw, bh);
    }
  }

  // Street labels
  if (alpha > 0.5 && scale > 2) {
    ctx.fillStyle = WHITE_TEXT;
    ctx.font = `${Math.max(6, 7 * Math.min(scale / 4, 1))}px sans-serif`;
    ctx.save();
    ctx.translate(jpX + 2, cy - 20 * scale);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Av. João Pinheiro", 0, 0);
    ctx.restore();

    ctx.save();
    ctx.translate(cx - 25 * scale, brY - 3);
    ctx.fillText("Av. Brasil", 0, 0);
    ctx.restore();

    ctx.save();
    ctx.translate(apX + 2, cy - 15 * scale);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Av. Afonso Pena", 0, 0);
    ctx.restore();
  }

  ctx.restore();
}

// Draw a pin with pulse
function drawPin(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  pulseT: number, alpha: number
) {
  ctx.save();
  ctx.globalAlpha = alpha;

  // Pulse ring
  const pulseR = 6 + pulseT * 14;
  const pulseAlpha = (1 - pulseT) * 0.6;
  ctx.beginPath();
  ctx.arc(x, y, pulseR, 0, Math.PI * 2);
  ctx.strokeStyle = `hsla(11, 81%, 57%, ${pulseAlpha})`;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Second ring
  const pulse2 = ((pulseT + 0.5) % 1);
  const pulse2R = 6 + pulse2 * 14;
  ctx.beginPath();
  ctx.arc(x, y, pulse2R, 0, Math.PI * 2);
  ctx.strokeStyle = `hsla(11, 81%, 57%, ${(1 - pulse2) * 0.3})`;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Glow
  const glow = ctx.createRadialGradient(x, y, 0, x, y, 12);
  glow.addColorStop(0, "hsla(11, 81%, 57%, 0.4)");
  glow.addColorStop(1, "hsla(11, 81%, 57%, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, 12, 0, Math.PI * 2);
  ctx.fill();

  // Pin dot
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fillStyle = ORANGE_BRIGHT;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();

  // Label
  ctx.fillStyle = "#fff";
  ctx.font = "bold 8px sans-serif";
  ctx.fillText("MS Eletric", x + 10, y - 2);
  ctx.fillStyle = WHITE_TEXT;
  ctx.font = "6px sans-serif";
  ctx.fillText("Uberlândia, MG", x + 10, y + 8);

  ctx.restore();
}

// Project lat/lng to globe surface (orthographic)
function project(
  lat: number, lng: number,
  cx: number, cy: number,
  radius: number, rotation: number
): { x: number; y: number; visible: boolean } {
  const phi = (lat * Math.PI) / 180;
  const lambda = ((lng + rotation) * Math.PI) / 180;
  const x = cx + radius * Math.cos(phi) * Math.sin(lambda);
  const y = cy - radius * Math.sin(phi);
  const z = Math.cos(phi) * Math.cos(lambda);
  return { x, y, visible: z > -0.1 };
}

function drawGlobe(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  cx: number, cy: number,
  radius: number, rotation: number,
  alpha: number
) {
  ctx.save();
  ctx.globalAlpha = alpha;

  // Globe circle
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = BG;
  ctx.fill();
  ctx.strokeStyle = ORANGE_DIM;
  ctx.lineWidth = 1;
  ctx.stroke();

  // Atmosphere glow
  const atmo = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.2);
  atmo.addColorStop(0, "hsla(11, 81%, 57%, 0)");
  atmo.addColorStop(0.7, "hsla(11, 81%, 57%, 0.03)");
  atmo.addColorStop(1, "hsla(11, 81%, 57%, 0)");
  ctx.fillStyle = atmo;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.2, 0, Math.PI * 2);
  ctx.fill();

  // Grid lines
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();

  // Latitude lines
  ctx.strokeStyle = ORANGE_DIM;
  ctx.lineWidth = 0.5;
  for (let lat = -60; lat <= 60; lat += 30) {
    ctx.beginPath();
    let first = true;
    for (let lng = -180; lng <= 180; lng += 3) {
      const p = project(lat, lng, cx, cy, radius, rotation);
      if (p.visible) {
        if (first) { ctx.moveTo(p.x, p.y); first = false; }
        else ctx.lineTo(p.x, p.y);
      } else first = true;
    }
    ctx.stroke();
  }

  // Longitude lines
  for (let lng = -180; lng < 180; lng += 30) {
    ctx.beginPath();
    let first = true;
    for (let lat = -90; lat <= 90; lat += 3) {
      const p = project(lat, lng, cx, cy, radius, rotation);
      if (p.visible) {
        if (first) { ctx.moveTo(p.x, p.y); first = false; }
        else ctx.lineTo(p.x, p.y);
      } else first = true;
    }
    ctx.stroke();
  }

  // Draw continents
  const drawContinent = (coords: [number, number][], fill: boolean, highlight: boolean) => {
    ctx.beginPath();
    let first = true;
    let anyVisible = false;
    for (const [lat, lng] of coords) {
      const p = project(lat, lng, cx, cy, radius, rotation);
      if (p.visible) {
        anyVisible = true;
        if (first) { ctx.moveTo(p.x, p.y); first = false; }
        else ctx.lineTo(p.x, p.y);
      } else first = true;
    }
    if (anyVisible) {
      if (fill) {
        ctx.fillStyle = highlight ? "hsla(11, 81%, 57%, 0.12)" : "hsla(11, 81%, 57%, 0.05)";
        ctx.fill();
      }
      ctx.strokeStyle = highlight ? ORANGE_MED : ORANGE_DIM;
      ctx.lineWidth = highlight ? 1.2 : 0.8;
      ctx.stroke();
    }
  };

  drawContinent(NORTH_AMERICA, true, false);
  drawContinent(AFRICA, true, false);
  drawContinent(SOUTH_AMERICA, false, false);
  drawContinent(BRAZIL_FILL, true, true);

  // Uberlândia dot on globe
  const ubr = project(UBR_LAT, UBR_LNG, cx, cy, radius, rotation);
  if (ubr.visible) {
    ctx.beginPath();
    ctx.arc(ubr.x, ubr.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = ORANGE_BRIGHT;
    ctx.fill();
    // Small glow
    const g = ctx.createRadialGradient(ubr.x, ubr.y, 0, ubr.x, ubr.y, 8);
    g.addColorStop(0, "hsla(11, 81%, 57%, 0.4)");
    g.addColorStop(1, "hsla(11, 81%, 57%, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(ubr.x, ubr.y, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
  ctx.restore();
}

interface GlobeZoomCanvasProps {
  width?: number;
  height?: number;
  className?: string;
}

const GlobeZoomCanvas: React.FC<GlobeZoomCanvasProps> = ({
  width = 400,
  height = 280,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startTime = useRef<number>(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const now = performance.now();
    if (!startTime.current) startTime.current = now;
    const elapsed = (now - startTime.current) / 1000;

    // Total cycle: 10s
    const cycle = 10;
    const t = (elapsed % cycle) / cycle;

    // Clear
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, w, h);

    // Background particles
    ctx.fillStyle = "hsla(11, 81%, 57%, 0.08)";
    for (let i = 0; i < 30; i++) {
      const seed = i * 137.508;
      const px = ((seed * 1.1 + elapsed * 3) % w);
      const py = ((seed * 0.7 + elapsed * 1.5) % h);
      ctx.beginPath();
      ctx.arc(px, py, 0.5 + (i % 3) * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    /*
     * Phases:
     *   0.00–0.35  Globe rotating (focus Brazil)
     *   0.35–0.55  Zoom transition (globe fades, streets appear)
     *   0.55–0.85  Street view with pin
     *   0.85–1.00  Fade back to globe
     */

    const cx = w / 2;
    const cy = h / 2;
    const baseRadius = Math.min(w, h) * 0.35;

    if (t < 0.35) {
      // Phase 0: Globe
      const pt = t / 0.35;
      // Slow rotation centering on Brazil (~lng -50)
      const rotation = 50 + Math.sin(pt * Math.PI) * 15;
      drawGlobe(ctx, w, h, cx, cy, baseRadius, rotation, 1);
    } else if (t < 0.55) {
      // Phase 1: Zoom transition
      const pt = easeInOutCubic((t - 0.35) / 0.2);
      const globeAlpha = 1 - pt;
      const streetAlpha = pt;
      const zoomScale = lerp(1, 3, pt);
      const radius = baseRadius * zoomScale;

      if (globeAlpha > 0.01) {
        drawGlobe(ctx, w, h, cx, cy, radius, 50, globeAlpha);
      }
      if (streetAlpha > 0.01) {
        drawStreetGrid(ctx, cx, cy, lerp(1, 4, pt), streetAlpha);
      }
    } else if (t < 0.85) {
      // Phase 2: Street view with pin
      const pt = (t - 0.55) / 0.3;
      const scale = lerp(4, 5, easeInOutCubic(Math.min(pt * 2, 1)));
      drawStreetGrid(ctx, cx, cy, scale, 1);

      // Pin appears
      const pinAlpha = easeInOutCubic(Math.min(pt * 3, 1));
      const pinX = cx + 2 * scale; // On Av. João Pinheiro
      const pinY = cy;
      const pulseT = (elapsed * 0.8) % 1;
      drawPin(ctx, pinX, pinY, pulseT, pinAlpha);
    } else {
      // Phase 3: Fade back
      const pt = easeInOutCubic((t - 0.85) / 0.15);
      const streetAlpha = 1 - pt;
      const globeAlpha = pt;

      if (streetAlpha > 0.01) {
        drawStreetGrid(ctx, cx, cy, lerp(5, 2, pt), streetAlpha);
        const pinX = cx + 2 * 5;
        const pinY = cy;
        drawPin(ctx, pinX, pinY, (elapsed * 0.8) % 1, streetAlpha);
      }
      if (globeAlpha > 0.01) {
        const radius = baseRadius * lerp(3, 1, pt);
        drawGlobe(ctx, w, h, cx, cy, radius, 50, globeAlpha);
      }
    }

    // Corner markers (always visible)
    ctx.strokeStyle = "hsla(11, 81%, 57%, 0.15)";
    ctx.lineWidth = 1;
    const m = 8;
    const cl = 20;
    // Top-left
    ctx.beginPath(); ctx.moveTo(m, m + cl); ctx.lineTo(m, m); ctx.lineTo(m + cl, m); ctx.stroke();
    // Top-right
    ctx.beginPath(); ctx.moveTo(w - m - cl, m); ctx.lineTo(w - m, m); ctx.lineTo(w - m, m + cl); ctx.stroke();
    // Bottom-left
    ctx.beginPath(); ctx.moveTo(m, h - m - cl); ctx.lineTo(m, h - m); ctx.lineTo(m + cl, h - m); ctx.stroke();
    // Bottom-right
    ctx.beginPath(); ctx.moveTo(w - m - cl, h - m); ctx.lineTo(w - m, h - m); ctx.lineTo(w - m, h - m - cl); ctx.stroke();

    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
};

export default GlobeZoomCanvas;
