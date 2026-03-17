import React, { useRef, useEffect, useCallback } from "react";

/**
 * StaticMapCanvas — Dark street map of Uberlândia with pulsing MS Eletric pin
 */

const BG = "#1a1a2e";
const BLOCK_FILL = "rgba(30, 30, 50, 0.9)";
const STREET_MAIN = "rgba(60, 60, 80, 0.8)";
const STREET_SEC = "rgba(45, 45, 65, 0.6)";
const LABEL_MAIN = "rgba(100, 160, 255, 0.7)";
const LABEL_SEC = "rgba(100, 160, 255, 0.45)";
const ORANGE = "hsl(11, 81%, 57%)";
const ORANGE_GLOW = "hsla(11, 81%, 57%, 0.35)";

interface Street {
  name: string;
  points: [number, number, number, number]; // x1,y1,x2,y2 in grid units
  isMain: boolean;
  labelAngle?: number;
  labelOffset?: [number, number];
}

// Grid centered on MS Eletric location — based on real Google Maps layout
const STREETS: Street[] = [
  // Main avenues
  { name: "Av. João Pinheiro", points: [0, -10, 0, 10], isMain: true, labelAngle: -90, labelOffset: [0.4, -3] },
  { name: "Av. Brasil", points: [-10, -2.2, 10, -2.2], isMain: true, labelOffset: [-7, -2.6] },
  { name: "Av. Afonso Pena", points: [4.5, -10, 4.5, 10], isMain: true, labelAngle: -90, labelOffset: [4.9, -3] },
  // Secondary streets
  { name: "R. Claudemiro José de Souza", points: [-10, 1.8, 10, 1.8], isMain: false, labelOffset: [-8.5, 1.4] },
  { name: "R. Alagoas", points: [-10, -5, 10, -5], isMain: false, labelOffset: [-8.5, -5.4] },
  { name: "R. Bahia", points: [-10, 4.5, 10, 4.5], isMain: false, labelOffset: [-8.5, 4.1] },
  { name: "R. São Paulo", points: [-10, 7, 10, 7], isMain: false, labelOffset: [-8.5, 6.6] },
  { name: "Av. Mato Grosso", points: [-4.5, -10, -4.5, 10], isMain: false, labelAngle: -90, labelOffset: [-4.1, 5] },
  // Unnamed grid streets
  { name: "", points: [-7.5, -10, -7.5, 10], isMain: false },
  { name: "", points: [-2, -10, -2, 10], isMain: false },
  { name: "", points: [2, -10, 2, 10], isMain: false },
  { name: "", points: [7, -10, 7, 10], isMain: false },
  { name: "", points: [-10, -8, 10, -8], isMain: false },
  { name: "", points: [-10, 9.5, 10, 9.5], isMain: false },
];

interface Landmark {
  name: string;
  x: number;
  y: number;
}

const LANDMARKS: Landmark[] = [
  { name: "Shopping da\nUtilidade Uberlândia", x: 5.5, y: -4 },
  { name: "Osaka Av. João Pinheiro\n- Concessionária Toyota", x: 2.5, y: -3.2 },
  { name: "Milani Veículos", x: 4, y: -6.5 },
  { name: "Raga Motors", x: -7, y: 6.5 },
  { name: "Impacto Prime\nUberlândia - Pneus", x: 1, y: 9 },
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
    const scale = Math.min(w, h) / 22;

    // Background
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, w, h);

    // Draw blocks (filled rectangles between streets)
    const vLines = [-7.5, -4.5, -2, 0, 2, 4.5, 7];
    const hLines = [-8, -5, -2.2, 1.8, 4.5, 7, 9.5];
    ctx.fillStyle = BLOCK_FILL;
    for (let i = 0; i < vLines.length - 1; i++) {
      for (let j = 0; j < hLines.length - 1; j++) {
        const bx = cx + vLines[i] * scale + 1.5;
        const by = cy + hLines[j] * scale + 1.5;
        const bw = (vLines[i + 1] - vLines[i]) * scale - 3;
        const bh = (hLines[j + 1] - hLines[j]) * scale - 3;
        if (bw > 2 && bh > 2) {
          ctx.fillRect(bx, by, bw, bh);
        }
      }
    }

    // Some building shapes inside blocks
    ctx.fillStyle = "rgba(40, 40, 60, 0.7)";
    const buildings = [
      [-6, -4, 1.2, 0.8], [-5.5, -6.5, 0.8, 1], [1, -4, 0.6, 0.5],
      [5.5, -3, 1.5, 1.2], [-3, 2.5, 0.7, 0.6], [1.5, 5, 0.9, 0.7],
      [-6, 5, 1, 0.8], [3, 0.5, 0.5, 0.4], [-1, -6, 0.8, 0.6],
      [5.8, 5.5, 1.2, 0.9], [-3.5, -6.8, 0.6, 0.5], [6.2, 1, 0.5, 0.7],
    ];
    for (const [bx, by, bw, bh] of buildings) {
      ctx.fillRect(cx + bx * scale, cy + by * scale, bw * scale, bh * scale);
    }

    // Draw streets
    for (const street of STREETS) {
      const [x1, y1, x2, y2] = street.points;
      ctx.beginPath();
      ctx.moveTo(cx + x1 * scale, cy + y1 * scale);
      ctx.lineTo(cx + x2 * scale, cy + y2 * scale);
      ctx.strokeStyle = street.isMain ? STREET_MAIN : STREET_SEC;
      ctx.lineWidth = street.isMain ? 3 : 1.5;
      ctx.stroke();
    }

    // Street labels
    const fontSize = Math.max(7, Math.min(9, scale * 0.55));
    for (const street of STREETS) {
      if (!street.name || !street.labelOffset) continue;
      const [lx, ly] = street.labelOffset;
      ctx.save();
      ctx.translate(cx + lx * scale, cy + ly * scale);
      if (street.labelAngle) ctx.rotate((street.labelAngle * Math.PI) / 180);
      ctx.font = `bold ${fontSize}px -apple-system, sans-serif`;
      ctx.fillStyle = street.isMain ? LABEL_MAIN : LABEL_SEC;
      ctx.fillText(street.name, 0, 0);
      ctx.restore();
    }

    // Landmarks
    const lmFontSize = Math.max(6, Math.min(8, scale * 0.42));
    for (const lm of LANDMARKS) {
      const lx = cx + lm.x * scale;
      const ly = cy + lm.y * scale;

      // Icon circle
      ctx.beginPath();
      ctx.arc(lx, ly, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(80, 80, 120, 0.6)";
      ctx.fill();
      ctx.strokeStyle = "rgba(100, 160, 255, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Label (multiline)
      ctx.font = `bold ${lmFontSize}px -apple-system, sans-serif`;
      ctx.fillStyle = LABEL_MAIN;
      const lines = lm.name.split("\n");
      lines.forEach((line, i) => {
        ctx.fillText(line, lx + 9, ly + 3 + i * (lmFontSize + 1));
      });
    }

    // ─── MS Eletric Pin ───
    const pinX = cx + 0.3 * scale;
    const pinY = cy - 0.2 * scale;
    const pulse = (elapsed * 0.8) % 1;

    // Pulsing rings
    for (let i = 0; i < 2; i++) {
      const pt = (pulse + i * 0.5) % 1;
      const r = 8 + pt * 25;
      ctx.beginPath();
      ctx.arc(pinX, pinY, r, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(11, 81%, 57%, ${(1 - pt) * 0.4})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Glow
    const glow = ctx.createRadialGradient(pinX, pinY, 0, pinX, pinY, 20);
    glow.addColorStop(0, ORANGE_GLOW);
    glow.addColorStop(1, "hsla(11, 81%, 57%, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(pinX, pinY, 20, 0, Math.PI * 2);
    ctx.fill();

    // Pin drop shape
    ctx.save();
    ctx.translate(pinX, pinY);
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.bezierCurveTo(-5, -2, -8, -8, -8, -12);
    ctx.arc(0, -12, 8, Math.PI, 0, false);
    ctx.bezierCurveTo(8, -8, 5, -2, 0, 6);
    ctx.closePath();
    ctx.fillStyle = ORANGE;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // White dot inside pin
    ctx.beginPath();
    ctx.arc(0, -12, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.restore();

    // Label
    const labelX = pinX + 14;
    const labelY = pinY - 18;
    ctx.font = `bold ${Math.max(10, scale * 0.65)}px -apple-system, sans-serif`;
    ctx.fillStyle = "#fff";
    ctx.fillText("MS Eletric", labelX, labelY);

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
