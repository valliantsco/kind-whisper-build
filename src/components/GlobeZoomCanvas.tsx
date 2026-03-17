import React, { useRef, useEffect, useCallback } from "react";
import { ALL_CONTINENTS, type CoastlinePolygon } from "@/data/continent-coastlines";

/**
 * GlobeZoomCanvas — Pure Canvas 2D
 * Accurate globe with real coastlines → zoom into Uberlândia streets → MS Eletric pin
 */

const BG = "#080808";
const ORANGE_DIM = "hsla(11, 81%, 57%, 0.10)";
const ORANGE_MED = "hsla(11, 81%, 57%, 0.28)";
const ORANGE_HI = "hsla(11, 81%, 57%, 0.50)";
const ORANGE_BRIGHT = "hsla(11, 90%, 65%, 0.95)";
const WHITE_TEXT = "rgba(255,255,255,0.45)";
const WHITE_LABEL = "rgba(255,255,255,0.55)";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

// ─── Street map data (real layout around MS Eletric) ───
interface Street { name: string; points: [number, number][]; isMain: boolean; }
interface Landmark { name: string; icon: string; x: number; y: number; }

const STREETS: Street[] = [
  { name: "Av. João Pinheiro", points: [[0,-8],[0,8]], isMain: true },
  { name: "Av. Brasil", points: [[-8,-1.5],[8,-1.5]], isMain: true },
  { name: "Av. Afonso Pena", points: [[3.5,-8],[3.5,8]], isMain: true },
  { name: "R. Claudemiro José de Souza", points: [[-8,1.5],[8,1.5]], isMain: false },
  { name: "R. Alagoas", points: [[-8,-3.5],[8,-3.5]], isMain: false },
  { name: "R. Bahia", points: [[-8,3.5],[8,3.5]], isMain: false },
  { name: "R. São Paulo", points: [[-8,5.5],[8,5.5]], isMain: false },
  { name: "R. Espírito Santo", points: [[-8,-5.5],[8,-5.5]], isMain: false },
  { name: "Av. Mato Grosso", points: [[-3.5,-8],[-3.5,8]], isMain: false },
  { name: "R. José Alves", points: [[6,-8],[6,8]], isMain: false },
  { name: "", points: [[-6.5,-8],[-6.5,8]], isMain: false },
  { name: "", points: [[-1.5,-8],[-1.5,8]], isMain: false },
  { name: "", points: [[1.5,-8],[1.5,8]], isMain: false },
];

const LANDMARKS: Landmark[] = [
  { name: "Shopping Utilidade", icon: "🏬", x: 4.5, y: -4 },
  { name: "Escola Of. Flamengo", icon: "⚽", x: -5, y: -3 },
  { name: "Toyota Osaka", icon: "🚗", x: 2.5, y: -3.5 },
  { name: "CEMEPE", icon: "🏫", x: 2, y: -6 },
  { name: "Chevrolet Autos", icon: "🚗", x: 5, y: 0 },
  { name: "Drogasil", icon: "💊", x: 2, y: 4 },
  { name: "Casa de Carnes", icon: "🥩", x: -2, y: -0.5 },
];

// ─── Globe projection (orthographic) ───
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
  return { x, y, visible: z > -0.05 };
}

// ─── Draw continent polygon on globe ───
function drawContinentOnGlobe(
  ctx: CanvasRenderingContext2D,
  coords: CoastlinePolygon,
  cx: number, cy: number,
  radius: number, rotation: number,
  fill: boolean, highlight: boolean
) {
  // Collect visible segments
  const segments: { x: number; y: number }[][] = [];
  let current: { x: number; y: number }[] = [];

  for (const [lat, lng] of coords) {
    const p = project(lat, lng, cx, cy, radius, rotation);
    if (p.visible) {
      current.push({ x: p.x, y: p.y });
    } else {
      if (current.length > 1) segments.push(current);
      current = [];
    }
  }
  if (current.length > 1) segments.push(current);

  for (const seg of segments) {
    ctx.beginPath();
    ctx.moveTo(seg[0].x, seg[0].y);
    for (let i = 1; i < seg.length; i++) {
      ctx.lineTo(seg[i].x, seg[i].y);
    }

    if (fill) {
      ctx.closePath();
      ctx.fillStyle = highlight ? "hsla(11,81%,57%,0.14)" : "hsla(11,81%,57%,0.05)";
      ctx.fill();
    }

    ctx.strokeStyle = highlight ? ORANGE_HI : ORANGE_MED;
    ctx.lineWidth = highlight ? 1.3 : 0.7;
    ctx.stroke();
  }
}

// ─── Draw full globe ───
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

  // Atmosphere glow
  const atmo = ctx.createRadialGradient(cx, cy, radius * 0.9, cx, cy, radius * 1.15);
  atmo.addColorStop(0, "hsla(11,81%,57%,0)");
  atmo.addColorStop(0.8, "hsla(11,81%,57%,0.04)");
  atmo.addColorStop(1, "hsla(11,81%,57%,0)");
  ctx.fillStyle = atmo;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
  ctx.fill();

  // Globe outline
  ctx.strokeStyle = "hsla(11,81%,57%,0.15)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Clip to globe
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();

  // Latitude grid
  ctx.strokeStyle = ORANGE_DIM;
  ctx.lineWidth = 0.35;
  for (let lat = -80; lat <= 80; lat += 20) {
    ctx.beginPath();
    let first = true;
    for (let lng = -180; lng <= 180; lng += 2) {
      const p = project(lat, lng, cx, cy, radius, rotation);
      if (p.visible) {
        if (first) { ctx.moveTo(p.x, p.y); first = false; }
        else ctx.lineTo(p.x, p.y);
      } else first = true;
    }
    ctx.stroke();
  }
  // Equator (slightly brighter)
  ctx.strokeStyle = "hsla(11,81%,57%,0.15)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  let first = true;
  for (let lng = -180; lng <= 180; lng += 2) {
    const p = project(0, lng, cx, cy, radius, rotation);
    if (p.visible) {
      if (first) { ctx.moveTo(p.x, p.y); first = false; }
      else ctx.lineTo(p.x, p.y);
    } else first = true;
  }
  ctx.stroke();

  // Longitude grid
  ctx.strokeStyle = ORANGE_DIM;
  ctx.lineWidth = 0.35;
  for (let lng = -180; lng < 180; lng += 20) {
    ctx.beginPath();
    first = true;
    for (let lat = -85; lat <= 85; lat += 2) {
      const p = project(lat, lng, cx, cy, radius, rotation);
      if (p.visible) {
        if (first) { ctx.moveTo(p.x, p.y); first = false; }
        else ctx.lineTo(p.x, p.y);
      } else first = true;
    }
    ctx.stroke();
  }

  // Draw all continents
  for (const cont of ALL_CONTINENTS) {
    drawContinentOnGlobe(ctx, cont.coords, cx, cy, radius, rotation, cont.fill, cont.highlight);
  }

  // Uberlândia marker
  const ubr = project(-18.9186, -48.2772, cx, cy, radius, rotation);
  if (ubr.visible) {
    // Glow
    const g = ctx.createRadialGradient(ubr.x, ubr.y, 0, ubr.x, ubr.y, 10);
    g.addColorStop(0, "hsla(11,81%,57%,0.6)");
    g.addColorStop(1, "hsla(11,81%,57%,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(ubr.x, ubr.y, 10, 0, Math.PI * 2);
    ctx.fill();
    // Dot
    ctx.beginPath();
    ctx.arc(ubr.x, ubr.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = ORANGE_BRIGHT;
    ctx.fill();
  }

  ctx.restore(); // unclip
  ctx.restore();
}

// ─── Draw street map ───
function drawStreetMap(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  scale: number, alpha: number,
  elapsed: number
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  const s = scale * 12;

  // Streets
  for (const street of STREETS) {
    ctx.beginPath();
    const [x1, y1] = street.points[0];
    const [x2, y2] = street.points[1];
    ctx.moveTo(cx + x1 * s, cy + y1 * s);
    ctx.lineTo(cx + x2 * s, cy + y2 * s);
    if (street.isMain) {
      ctx.strokeStyle = ORANGE_MED;
      ctx.lineWidth = 2.5;
    } else {
      ctx.strokeStyle = ORANGE_DIM;
      ctx.lineWidth = 1;
    }
    ctx.stroke();
  }

  // Block fills
  ctx.fillStyle = "rgba(255,255,255,0.012)";
  const vLines = [-6.5, -3.5, -1.5, 0, 1.5, 3.5, 6];
  const hLines = [-5.5, -3.5, -1.5, 1.5, 3.5, 5.5];
  for (let i = 0; i < vLines.length - 1; i++) {
    for (let j = 0; j < hLines.length - 1; j++) {
      const bx = cx + vLines[i] * s + 2;
      const by = cy + hLines[j] * s + 2;
      const bw = (vLines[i + 1] - vLines[i]) * s - 4;
      const bh = (hLines[j + 1] - hLines[j]) * s - 4;
      if (bw > 4 && bh > 4) ctx.fillRect(bx, by, bw, bh);
    }
  }

  // Labels
  if (scale > 1.5) {
    const la = Math.min((scale - 1.5) / 1, 1);
    ctx.globalAlpha = alpha * la;
    ctx.fillStyle = WHITE_LABEL;
    const fs = Math.max(7, Math.min(9, s * 0.6));
    ctx.font = `bold ${fs}px sans-serif`;

    // Av. João Pinheiro
    ctx.save();
    ctx.translate(cx + 0.3 * s, cy - 5 * s);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("AV. JOÃO PINHEIRO", 0, 0);
    ctx.restore();

    // Av. Brasil
    ctx.save();
    ctx.translate(cx - 6 * s, cy - 1.8 * s);
    ctx.fillText("AV. BRASIL", 0, 0);
    ctx.restore();

    // Av. Afonso Pena
    ctx.save();
    ctx.translate(cx + 3.8 * s, cy - 5 * s);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("AV. AFONSO PENA", 0, 0);
    ctx.restore();

    // Secondary
    const fs2 = Math.max(5, Math.min(7, s * 0.4));
    ctx.font = `${fs2}px sans-serif`;
    ctx.fillStyle = WHITE_TEXT;

    ctx.save(); ctx.translate(cx - 6 * s, cy - 3.8 * s); ctx.fillText("R. Alagoas", 0, 0); ctx.restore();
    ctx.save(); ctx.translate(cx - 6 * s, cy + 3.2 * s); ctx.fillText("R. Bahia", 0, 0); ctx.restore();
    ctx.save(); ctx.translate(cx - 6 * s, cy + 5.2 * s); ctx.fillText("R. São Paulo", 0, 0); ctx.restore();
    ctx.save(); ctx.translate(cx - 3.2 * s, cy + 6 * s); ctx.rotate(-Math.PI / 2); ctx.fillText("Av. Mato Grosso", 0, 0); ctx.restore();
    ctx.save(); ctx.translate(cx - 6 * s, cy + 1.2 * s); ctx.fillText("R. Claudemiro J. de Souza", 0, 0); ctx.restore();
    ctx.save(); ctx.translate(cx - 6 * s, cy - 5.8 * s); ctx.fillText("R. Espírito Santo", 0, 0); ctx.restore();

    ctx.globalAlpha = alpha;
  }

  // Landmarks
  if (scale > 2) {
    const la = Math.min((scale - 2) / 1, 1);
    ctx.globalAlpha = alpha * la;
    const fs3 = Math.max(5, Math.min(6.5, s * 0.35));
    for (const lm of LANDMARKS) {
      const lx = cx + lm.x * s;
      const ly = cy + lm.y * s;
      ctx.beginPath();
      ctx.arc(lx, ly, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.2)";
      ctx.fill();
      ctx.font = `${fs3}px sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillText(`${lm.icon} ${lm.name}`, lx + 4, ly + 2);
    }
    ctx.globalAlpha = alpha;
  }

  ctx.restore();
}

// ─── Pin ───
function drawPin(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  pulseT: number, alpha: number
) {
  ctx.save();
  ctx.globalAlpha = alpha;

  for (let i = 0; i < 2; i++) {
    const pt = (pulseT + i * 0.5) % 1;
    const r = 5 + pt * 18;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(11,81%,57%,${(1 - pt) * 0.5})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  const g = ctx.createRadialGradient(x, y, 0, x, y, 16);
  g.addColorStop(0, "hsla(11,81%,57%,0.5)");
  g.addColorStop(1, "hsla(11,81%,57%,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, 16, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fillStyle = ORANGE_BRIGHT;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();

  // Label box
  const lx = x + 12, ly = y - 8;
  ctx.fillStyle = "hsla(0,0%,5%,0.85)";
  ctx.strokeStyle = "hsla(11,81%,57%,0.3)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.roundRect(lx, ly, 76, 28, 4);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.font = "bold 7px sans-serif";
  ctx.fillText("MS Eletric", lx + 5, ly + 10);
  ctx.fillStyle = WHITE_TEXT;
  ctx.font = "5.5px sans-serif";
  ctx.fillText("Av. João Pinheiro, 3747", lx + 5, ly + 20);

  ctx.restore();
}

// ─── Main ───
const GlobeZoomCanvas: React.FC<{ className?: string }> = ({ className = "" }) => {
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
    if (w === 0 || h === 0) { animRef.current = requestAnimationFrame(animate); return; }
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const now = performance.now();
    if (!startTime.current) startTime.current = now;
    const elapsed = (now - startTime.current) / 1000;

    const cycle = 12;
    const t = (elapsed % cycle) / cycle;

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, w, h);

    // Background particles
    ctx.fillStyle = "hsla(11,81%,57%,0.06)";
    for (let i = 0; i < 25; i++) {
      const seed = i * 137.508;
      const px = ((seed * 1.1 + elapsed * 2) % (w + 20)) - 10;
      const py = ((seed * 0.7 + elapsed * 1) % (h + 20)) - 10;
      ctx.beginPath();
      ctx.arc(px, py, 0.5 + (i % 3) * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    const cx = w / 2;
    const cy = h / 2;
    const baseRadius = Math.min(w, h) * 0.36;

    if (t < 0.35) {
      // Globe rotating
      const pt = t / 0.35;
      const rotation = 48 + Math.sin(pt * Math.PI * 0.8) * 12;
      drawGlobe(ctx, w, h, cx, cy, baseRadius, rotation, 1);
    } else if (t < 0.55) {
      // Zoom transition
      const pt = easeInOutCubic((t - 0.35) / 0.2);
      const globeAlpha = 1 - pt;
      const streetAlpha = pt;
      const zoomRadius = baseRadius * lerp(1, 4, pt);
      if (globeAlpha > 0.01) drawGlobe(ctx, w, h, cx, cy, zoomRadius, 48, globeAlpha);
      if (streetAlpha > 0.01) drawStreetMap(ctx, cx, cy, lerp(0.5, 3, pt), streetAlpha, elapsed);
    } else if (t < 0.88) {
      // Street view + pin
      const pt = (t - 0.55) / 0.33;
      const scale = lerp(3, 4, easeInOutCubic(Math.min(pt * 1.5, 1)));
      drawStreetMap(ctx, cx, cy, scale, 1, elapsed);
      const pinAlpha = easeInOutCubic(Math.min(pt * 2.5, 1));
      drawPin(ctx, cx, cy, (elapsed * 0.7) % 1, pinAlpha);
    } else {
      // Fade back
      const pt = easeInOutCubic((t - 0.88) / 0.12);
      const streetAlpha = 1 - pt;
      const globeAlpha = pt;
      if (streetAlpha > 0.01) {
        drawStreetMap(ctx, cx, cy, lerp(4, 1.5, pt), streetAlpha, elapsed);
        drawPin(ctx, cx, cy, (elapsed * 0.7) % 1, streetAlpha);
      }
      if (globeAlpha > 0.01) {
        drawGlobe(ctx, w, h, cx, cy, baseRadius * lerp(4, 1, pt), 48, globeAlpha);
      }
    }

    // Corner brackets
    ctx.strokeStyle = "hsla(11,81%,57%,0.12)";
    ctx.lineWidth = 0.8;
    const m = 6, cl = 16;
    ctx.beginPath(); ctx.moveTo(m, m + cl); ctx.lineTo(m, m); ctx.lineTo(m + cl, m); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w - m - cl, m); ctx.lineTo(w - m, m); ctx.lineTo(w - m, m + cl); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(m, h - m - cl); ctx.lineTo(m, h - m); ctx.lineTo(m + cl, h - m); ctx.stroke();
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
