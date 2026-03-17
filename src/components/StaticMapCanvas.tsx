import React, { useRef, useEffect, useCallback } from "react";

/**
 * StaticMapCanvas — Diagonal dark map with pulsing MS Eletric pin
 * Brand: #000 bg, #FF4D22 orange, glassmorphism dark aesthetic
 */

const BG = "#0a0a0a";
const BLOCK = "#151515";
const STREET_MAIN = "rgba(255, 77, 34, 0.12)";
const STREET_SEC = "rgba(255, 255, 255, 0.04)";
const ORANGE = "#FF4D22";

interface Street {
  points: [number, number, number, number];
  isMain: boolean;
}

// Simple grid — rotated 30° for diagonal aesthetic
const STREETS: Street[] = [
  // Verticals
  { points: [-6, -12, -6, 12], isMain: false },
  { points: [-3, -12, -3, 12], isMain: false },
  { points: [0, -12, 0, 12], isMain: true },   // Av. João Pinheiro
  { points: [3, -12, 3, 12], isMain: false },
  { points: [6, -12, 6, 12], isMain: true },    // Av. Afonso Pena
  { points: [9, -12, 9, 12], isMain: false },
  // Horizontals
  { points: [-12, -6, 12, -6], isMain: false },
  { points: [-12, -3, 12, -3], isMain: true },  // Av. Brasil
  { points: [-12, 0, 12, 0], isMain: false },
  { points: [-12, 3, 12, 3], isMain: false },
  { points: [-12, 6, 12, 6], isMain: false },
  { points: [-12, 9, 12, 9], isMain: false },
  { points: [-12, -9, 12, -9], isMain: false },
];

const StaticMapCanvas: React.FC<{ className?: string }> = ({ className = "" }) => {
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

    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h) / 16; // ~30% zoomed out vs previous

    // Background
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, w, h);

    // Rotate 30° for diagonal layout
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((30 * Math.PI) / 180);

    // Draw blocks between streets
    const vLines = [-6, -3, 0, 3, 6, 9];
    const hLines = [-9, -6, -3, 0, 3, 6, 9];
    for (let i = 0; i < vLines.length - 1; i++) {
      for (let j = 0; j < hLines.length - 1; j++) {
        const bx = vLines[i] * scale + 1;
        const by = hLines[j] * scale + 1;
        const bw = (vLines[i + 1] - vLines[i]) * scale - 2;
        const bh = (hLines[j + 1] - hLines[j]) * scale - 2;
        ctx.fillStyle = BLOCK;
        ctx.fillRect(bx, by, bw, bh);
      }
    }

    // Building footprints
    ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
    const buildings = [
      [-5, -5, 1.5, 1], [-4, -2, 1, 0.8], [1, -5, 1.2, 0.9],
      [4, -2, 1.4, 1], [-2, 1, 0.8, 0.6], [1, 4, 1, 0.7],
      [4, 4, 1.3, 0.9], [7, -5, 1, 0.8], [7, 1, 0.9, 0.7],
      [-5, 4, 1.1, 0.8], [-2, -8, 0.9, 0.7], [4, 7, 1, 0.6],
      [1, -1.5, 0.7, 0.5], [7, 7, 1.2, 0.8], [-5, -8, 0.8, 0.6],
    ];
    for (const [bx, by, bw, bh] of buildings) {
      ctx.fillRect(bx * scale, by * scale, bw * scale, bh * scale);
    }

    // Draw streets
    for (const street of STREETS) {
      const [x1, y1, x2, y2] = street.points;
      ctx.beginPath();
      ctx.moveTo(x1 * scale, y1 * scale);
      ctx.lineTo(x2 * scale, y2 * scale);
      ctx.strokeStyle = street.isMain ? STREET_MAIN : STREET_SEC;
      ctx.lineWidth = street.isMain ? 2 : 0.8;
      ctx.stroke();
    }

    // ─── MS Eletric Pin (at center) ───
    const pinX = 0.5 * scale;
    const pinY = -1 * scale;
    const pulse = (elapsed * 0.7) % 1;

    // Pulsing rings
    for (let i = 0; i < 3; i++) {
      const pt = (pulse + i * 0.33) % 1;
      const r = 6 + pt * 30;
      ctx.beginPath();
      ctx.arc(pinX, pinY, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 77, 34, ${(1 - pt) * 0.25})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Glow
    const glow = ctx.createRadialGradient(pinX, pinY, 0, pinX, pinY, 24);
    glow.addColorStop(0, "rgba(255, 77, 34, 0.25)");
    glow.addColorStop(1, "rgba(255, 77, 34, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(pinX, pinY, 24, 0, Math.PI * 2);
    ctx.fill();

    // Pin shape
    ctx.save();
    ctx.translate(pinX, pinY);
    // Counter-rotate so pin is always upright
    ctx.rotate((-30 * Math.PI) / 180);

    ctx.beginPath();
    ctx.moveTo(0, 7);
    ctx.bezierCurveTo(-6, -1, -9, -9, -9, -13);
    ctx.arc(0, -13, 9, Math.PI, 0, false);
    ctx.bezierCurveTo(9, -9, 6, -1, 0, 7);
    ctx.closePath();
    ctx.fillStyle = ORANGE;
    ctx.shadowColor = "rgba(255, 77, 34, 0.5)";
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Inner white dot
    ctx.beginPath();
    ctx.arc(0, -13, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();

    // Label
    ctx.font = "bold 9px Verdana, sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText("MS ELETRIC", 15, -15);
    ctx.font = "7px Verdana, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.fillText("Av. João Pinheiro, 3747", 15, -5);

    ctx.restore(); // pin rotation
    ctx.restore(); // map rotation

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

export default StaticMapCanvas;
