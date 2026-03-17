import React, { useRef, useEffect, useCallback } from "react";

/**
 * StaticMapCanvas — Google Maps dark-mode style map of Uberlândia
 * Rotated ~35° grid matching real street layout around MS Eletric
 */

const BG = "#0f1118";
const BLOCK = "#181c26";
const BLOCK_ALT = "#1b2029";
const BUILDING = "#222836";
const STREET_MAIN = "rgba(60, 65, 78, 0.9)";
const STREET_SEC = "rgba(40, 44, 55, 0.7)";
const ORANGE = "#FF4D22";

interface Street {
  points: [number, number, number, number];
  isMain: boolean;
  name?: string;
  labelPos?: [number, number];
  labelAngle?: number;
}

// Grid matching the reference image — rotated ~35°
// Vertical streets (NW-SE direction in real map)
// Horizontal streets (NE-SW direction)
const STREETS: Street[] = [
  // "Vertical" streets (like Av. João Pinheiro direction)
  { points: [-3, -14, -3, 14], isMain: false },
  { points: [0, -14, 0, 14], isMain: true, name: "Av. João Pinheiro", labelPos: [0.5, 2], labelAngle: 0 },
  { points: [3.2, -14, 3.2, 14], isMain: false },
  { points: [6, -14, 6, 14], isMain: false },
  { points: [-6, -14, -6, 14], isMain: false, name: "Av. Mato Grosso", labelPos: [-5.5, 4], labelAngle: 0 },
  { points: [-9, -14, -9, 14], isMain: false },
  { points: [9, -14, 9, 14], isMain: false },
  // "Horizontal" streets (like Av. Brasil direction)
  { points: [-14, -4.5, 14, -4.5], isMain: true, name: "Av. Brasil", labelPos: [-5, -5], labelAngle: 0 },
  { points: [-14, -1.5, 14, -1.5], isMain: false, name: "R. Claudemiro José de Souza" },
  { points: [-14, 1.5, 14, 1.5], isMain: false, name: "R. Bahia", labelPos: [-8, 1], labelAngle: 0 },
  { points: [-14, 4.5, 14, 4.5], isMain: false },
  { points: [-14, -7.5, 14, -7.5], isMain: false, name: "R. Alagoas", labelPos: [-8, -8], labelAngle: 0 },
  { points: [-14, 7.5, 14, 7.5], isMain: false },
  { points: [-14, -10.5, 14, -10.5], isMain: false },
  { points: [-14, 10.5, 14, 10.5], isMain: false },
];

// Building footprints scattered in blocks
const BUILDINGS: [number, number, number, number][] = [
  [-5, -7, 1.8, 1.2], [-8, -4, 1.2, 1], [-2, -7, 1.4, 0.9],
  [1, -7, 1, 0.8], [4, -7, 1.6, 1.1], [7, -7, 1.2, 0.8],
  [-5, -3.5, 1, 0.7], [-2, -3.5, 0.8, 0.6], [1, -3.5, 1.2, 0.8],
  [4, -3.5, 1.4, 0.9], [7, -3.5, 0.9, 0.7],
  [-8, -1, 1.3, 0.8], [-5, -0.5, 0.9, 0.6], [-2, 0, 1, 0.7],
  [1, -0.5, 0.7, 0.5], [4, 0, 1.1, 0.8], [7, -0.5, 1.3, 0.9],
  [-8, 2, 1.1, 0.8], [-5, 2.5, 0.8, 0.6], [-2, 2, 1.2, 0.9],
  [1, 2.5, 0.9, 0.7], [4, 2, 1.5, 1], [7, 2.5, 1, 0.8],
  [-5, 5.5, 1.3, 0.9], [-2, 5, 1, 0.7], [1, 5.5, 1.1, 0.8],
  [4, 5, 1.4, 1], [7, 5.5, 0.8, 0.6],
  [-8, 8, 1, 0.7], [-5, 8.5, 1.2, 0.9], [1, 8, 0.9, 0.6],
  [4, 8.5, 1.3, 1], [7, 8, 1.1, 0.8],
  [-8, -10, 1.2, 0.8], [-2, -10, 0.9, 0.7], [4, -10, 1.4, 0.9],
];

const ROTATION_DEG = 35;

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
    const scale = Math.min(w, h) / 24;
    const rotRad = (ROTATION_DEG * Math.PI) / 180;

    // Background
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, w, h);

    // Rotated map group
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotRad);

    // Block fills
    const vLines = [-9, -6, -3, 0, 3.2, 6, 9];
    const hLines = [-10.5, -7.5, -4.5, -1.5, 1.5, 4.5, 7.5, 10.5];
    for (let i = 0; i < vLines.length - 1; i++) {
      for (let j = 0; j < hLines.length - 1; j++) {
        const bx = vLines[i] * scale + 0.8;
        const by = hLines[j] * scale + 0.8;
        const bw = (vLines[i + 1] - vLines[i]) * scale - 1.6;
        const bh = (hLines[j + 1] - hLines[j]) * scale - 1.6;
        ctx.fillStyle = (i + j) % 2 === 0 ? BLOCK : BLOCK_ALT;
        if (bw > 1 && bh > 1) ctx.fillRect(bx, by, bw, bh);
      }
    }

    // Building footprints
    ctx.fillStyle = BUILDING;
    for (const [bx, by, bw, bh] of BUILDINGS) {
      ctx.fillRect(bx * scale, by * scale, bw * scale, bh * scale);
    }

    // Streets
    for (const street of STREETS) {
      const [x1, y1, x2, y2] = street.points;
      ctx.beginPath();
      ctx.moveTo(x1 * scale, y1 * scale);
      ctx.lineTo(x2 * scale, y2 * scale);
      ctx.strokeStyle = street.isMain ? STREET_MAIN : STREET_SEC;
      ctx.lineWidth = street.isMain ? 2.5 : 1;
      ctx.stroke();
    }

    // Street labels (counter-rotated so they're readable on the diagonal)
    const fs = Math.max(6, Math.min(8, scale * 0.5));
    ctx.font = `${fs}px Verdana, sans-serif`;
    for (const street of STREETS) {
      if (!street.name || !street.labelPos) continue;
      const [lx, ly] = street.labelPos;
      ctx.save();
      ctx.translate(lx * scale, ly * scale);
      ctx.fillStyle = "rgba(100, 140, 220, 0.4)";
      ctx.fillText(street.name, 0, 0);
      ctx.restore();
    }

    // ─── MS Eletric Pin ───
    const pinX = 0.3 * scale;
    const pinY = -3 * scale;
    const pulse = (elapsed * 0.7) % 1;

    // Pulsing rings
    for (let i = 0; i < 3; i++) {
      const pt = (pulse + i * 0.33) % 1;
      const r = 5 + pt * 28;
      ctx.beginPath();
      ctx.arc(pinX, pinY, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 77, 34, ${(1 - pt) * 0.2})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Glow
    const glow = ctx.createRadialGradient(pinX, pinY, 0, pinX, pinY, 22);
    glow.addColorStop(0, "rgba(255, 77, 34, 0.2)");
    glow.addColorStop(1, "rgba(255, 77, 34, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(pinX, pinY, 22, 0, Math.PI * 2);
    ctx.fill();

    // Pin (counter-rotated to stay upright)
    ctx.save();
    ctx.translate(pinX, pinY);
    ctx.rotate(-rotRad);

    ctx.beginPath();
    ctx.moveTo(0, 7);
    ctx.bezierCurveTo(-6, -1, -9, -9, -9, -13);
    ctx.arc(0, -13, 9, Math.PI, 0, false);
    ctx.bezierCurveTo(9, -9, 6, -1, 0, 7);
    ctx.closePath();
    ctx.shadowColor = "rgba(255, 77, 34, 0.4)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = ORANGE;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Inner dot
    ctx.beginPath();
    ctx.arc(0, -13, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();

    // Label
    ctx.font = "bold 9px Verdana, sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText("MS ELETRIC", 15, -14);
    ctx.font = "6.5px Verdana, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillText("Av. João Pinheiro, 3747", 15, -4);

    ctx.restore(); // pin
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
