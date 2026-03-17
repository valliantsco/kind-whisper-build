import React, { useRef, useEffect, useCallback } from "react";

/**
 * StaticMapCanvas — Rendered dark map matching real Google Maps layout
 * around MS Eletric, Uberlândia. Brand: #0a0a0a bg, #FF4D22 orange.
 *
 * Reference: The real streets run diagonally (~30-35°). Av. João Pinheiro
 * runs NW→SE, Av. Brasil runs NE→SW. MS Eletric sits at intersection.
 */

const BG = "#0e1017";
const BLOCK_A = "#161a22";
const BLOCK_B = "#191d26";
const BUILDING_A = "#1f2430";
const BUILDING_B = "#232836";
const STREET_MAIN = "#2a2f3a";
const STREET_SEC = "#1e222c";
const ORANGE = "#FF4D22";

const ROT = (32 * Math.PI) / 180; // real street angle

// All coordinates in grid units, will be rotated 32°
// "vertical" = Av. João Pinheiro direction, "horizontal" = Av. Brasil direction
// MS Eletric is at roughly (0, 0)

interface Line { x1: number; y1: number; x2: number; y2: number; main: boolean }

const lines: Line[] = [
  // Verticals (João Pinheiro family)
  { x1: 0, y1: -18, x2: 0, y2: 18, main: true },    // Av. João Pinheiro
  { x1: 4, y1: -18, x2: 4, y2: 18, main: true },     // Av. Afonso Pena
  { x1: -3.5, y1: -18, x2: -3.5, y2: 18, main: false }, // Av. Mato Grosso
  { x1: -7, y1: -18, x2: -7, y2: 18, main: false },
  { x1: -10, y1: -18, x2: -10, y2: 18, main: false },
  { x1: 2, y1: -18, x2: 2, y2: 18, main: false },
  { x1: 7, y1: -18, x2: 7, y2: 18, main: false },
  { x1: 10, y1: -18, x2: 10, y2: 18, main: false },
  { x1: -1.5, y1: -18, x2: -1.5, y2: 18, main: false },
  { x1: -5.5, y1: -18, x2: -5.5, y2: 18, main: false },
  // Horizontals (Brasil family)
  { x1: -18, y1: -2, x2: 18, y2: -2, main: true },   // Av. Brasil
  { x1: -18, y1: 1.5, x2: 18, y2: 1.5, main: false }, // R. Claudemiro
  { x1: -18, y1: 4, x2: 18, y2: 4, main: false },     // R. Bahia
  { x1: -18, y1: -5, x2: 18, y2: -5, main: false },   // R. Alagoas
  { x1: -18, y1: 7, x2: 18, y2: 7, main: false },
  { x1: -18, y1: -8, x2: 18, y2: -8, main: false },
  { x1: -18, y1: 10, x2: 18, y2: 10, main: false },
  { x1: -18, y1: -11, x2: 18, y2: -11, main: false },
  { x1: -18, y1: 13, x2: 18, y2: 13, main: false },
  { x1: -18, y1: -14, x2: 18, y2: -14, main: false },
];

// Building footprints per block [x, y, w, h]
const bldgs: [number, number, number, number][] = [];
// Generate buildings in each block
const vEdges = [-10, -7, -5.5, -3.5, -1.5, 0, 2, 4, 7, 10];
const hEdges = [-14, -11, -8, -5, -2, 1.5, 4, 7, 10, 13];
for (let i = 0; i < vEdges.length - 1; i++) {
  for (let j = 0; j < hEdges.length - 1; j++) {
    const bx = vEdges[i] + 0.3;
    const by = hEdges[j] + 0.3;
    const maxW = (vEdges[i + 1] - vEdges[i]) - 0.6;
    const maxH = (hEdges[j + 1] - hEdges[j]) - 0.6;
    if (maxW < 0.5 || maxH < 0.5) continue;
    // 1-3 buildings per block
    const seed = (i * 7 + j * 13) % 17;
    const n = 1 + (seed % 3);
    for (let k = 0; k < n; k++) {
      const ox = ((seed + k * 5) % 7) / 7 * maxW * 0.4;
      const oy = ((seed + k * 3) % 5) / 5 * maxH * 0.4;
      const w = maxW * (0.3 + ((seed + k) % 4) / 10);
      const h = maxH * (0.25 + ((seed + k * 2) % 5) / 12);
      bldgs.push([bx + ox, by + oy, Math.min(w, maxW - ox), Math.min(h, maxH - oy)]);
    }
  }
}

function rot(x: number, y: number, s: number): [number, number] {
  const rx = x * Math.cos(ROT) - y * Math.sin(ROT);
  const ry = x * Math.sin(ROT) + y * Math.cos(ROT);
  return [rx * s, ry * s];
}

const StaticMapCanvas: React.FC<{ className?: string }> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const t0 = useRef(0);

  const draw = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = devicePixelRatio || 1;
    const w = c.clientWidth, h = c.clientHeight;
    if (!w || !h) { animRef.current = requestAnimationFrame(draw); return; }
    c.width = w * dpr; c.height = h * dpr;
    ctx.scale(dpr, dpr);

    const now = performance.now();
    if (!t0.current) t0.current = now;
    const elapsed = (now - t0.current) / 1000;

    const cx = w / 2, cy = h / 2;
    const s = Math.min(w, h) / 18;

    // BG
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, w, h);

    // Blocks
    for (let i = 0; i < vEdges.length - 1; i++) {
      for (let j = 0; j < hEdges.length - 1; j++) {
        const x0 = vEdges[i], y0 = hEdges[j];
        const x1 = vEdges[i + 1], y1 = hEdges[j + 1];
        const corners = [
          rot(x0 + 0.15, y0 + 0.15, s),
          rot(x1 - 0.15, y0 + 0.15, s),
          rot(x1 - 0.15, y1 - 0.15, s),
          rot(x0 + 0.15, y1 - 0.15, s),
        ];
        ctx.beginPath();
        ctx.moveTo(cx + corners[0][0], cy + corners[0][1]);
        for (let k = 1; k < 4; k++) ctx.lineTo(cx + corners[k][0], cy + corners[k][1]);
        ctx.closePath();
        ctx.fillStyle = (i + j) % 2 === 0 ? BLOCK_A : BLOCK_B;
        ctx.fill();
      }
    }

    // Buildings
    for (const [bx, by, bw, bh] of bldgs) {
      const corners = [
        rot(bx, by, s), rot(bx + bw, by, s),
        rot(bx + bw, by + bh, s), rot(bx, by + bh, s),
      ];
      ctx.beginPath();
      ctx.moveTo(cx + corners[0][0], cy + corners[0][1]);
      for (let k = 1; k < 4; k++) ctx.lineTo(cx + corners[k][0], cy + corners[k][1]);
      ctx.closePath();
      ctx.fillStyle = ((bx + by) * 100 | 0) % 2 === 0 ? BUILDING_A : BUILDING_B;
      ctx.fill();
    }

    // Streets
    for (const l of lines) {
      const [ax, ay] = rot(l.x1, l.y1, s);
      const [bx2, by2] = rot(l.x2, l.y2, s);
      ctx.beginPath();
      ctx.moveTo(cx + ax, cy + ay);
      ctx.lineTo(cx + bx2, cy + by2);
      ctx.strokeStyle = l.main ? STREET_MAIN : STREET_SEC;
      ctx.lineWidth = l.main ? 2 : 0.8;
      ctx.stroke();
    }

    // ─── Pin at MS Eletric (grid 0.2, -0.3) ───
    const [px, py] = rot(0.2, -0.3, s);
    const pinX = cx + px, pinY = cy + py;

    // Pulse rings
    const pulse = (elapsed * 0.6) % 1;
    for (let i = 0; i < 3; i++) {
      const pt = (pulse + i * 0.33) % 1;
      const r = 4 + pt * 30;
      ctx.beginPath();
      ctx.arc(pinX, pinY, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,77,34,${(1 - pt) * 0.22})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Glow
    const g = ctx.createRadialGradient(pinX, pinY, 0, pinX, pinY, 20);
    g.addColorStop(0, "rgba(255,77,34,0.22)");
    g.addColorStop(1, "rgba(255,77,34,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(pinX, pinY, 20, 0, Math.PI * 2);
    ctx.fill();

    // Pin shape (always upright)
    ctx.save();
    ctx.translate(pinX, pinY);
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.bezierCurveTo(-7, 0, -10, -9, -10, -14);
    ctx.arc(0, -14, 10, Math.PI, 0, false);
    ctx.bezierCurveTo(10, -9, 7, 0, 0, 8);
    ctx.closePath();
    ctx.shadowColor = "rgba(255,77,34,0.45)";
    ctx.shadowBlur = 14;
    ctx.fillStyle = ORANGE;
    ctx.fill();
    ctx.shadowBlur = 0;

    // White center
    ctx.beginPath();
    ctx.arc(0, -14, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();

    // Label
    ctx.shadowColor = "rgba(0,0,0,0.7)";
    ctx.shadowBlur = 6;
    ctx.font = "bold 10px Verdana, sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText("MS ELETRIC", 16, -16);
    ctx.shadowBlur = 0;

    ctx.restore();

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
};

export default StaticMapCanvas;
