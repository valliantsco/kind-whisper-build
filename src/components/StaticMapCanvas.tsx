import React, { useRef, useEffect, useCallback } from "react";

/**
 * StaticMapCanvas — 3D perspective dark map, zoomed in, detailed streets
 * Brand: #000 bg, #FF4D22 orange, Verdana
 */

const BG = "#0c0e14";
const BLOCK = "#151820";
const BLOCK_ALT = "#181c24";
const BUILDING = "#1e2230";
const BUILDING_TOP = "#242838";
const STREET_MAIN_COLOR = "rgba(50, 55, 68, 0.95)";
const STREET_SEC_COLOR = "rgba(35, 38, 50, 0.8)";
const ORANGE = "#FF4D22";

interface Street {
  points: [number, number, number, number];
  isMain: boolean;
  width?: number;
}

// Dense grid — zoomed in tight around MS Eletric
const STREETS: Street[] = [
  // Verticals (Av. João Pinheiro direction)
  { points: [-8, -16, -8, 16], isMain: false },
  { points: [-5, -16, -5, 16], isMain: false },
  { points: [-2, -16, -2, 16], isMain: false },
  { points: [0, -16, 0, 16], isMain: true, width: 3.5 },   // Av. João Pinheiro
  { points: [3, -16, 3, 16], isMain: false },
  { points: [6, -16, 6, 16], isMain: true, width: 3 },     // Av. Afonso Pena
  { points: [9, -16, 9, 16], isMain: false },
  { points: [12, -16, 12, 16], isMain: false },
  // Horizontals (Av. Brasil direction)
  { points: [-16, -6, 16, -6], isMain: true, width: 3.5 },  // Av. Brasil
  { points: [-16, -3, 16, -3], isMain: false },
  { points: [-16, 0, 16, 0], isMain: false },
  { points: [-16, 3, 16, 3], isMain: false },               // R. Bahia
  { points: [-16, 6, 16, 6], isMain: false },
  { points: [-16, -9, 16, -9], isMain: false },
  { points: [-16, -12, 16, -12], isMain: false },
  { points: [-16, 9, 16, 9], isMain: false },
  { points: [-16, 12, 16, 12], isMain: false },
];

// Dense building footprints
const BUILDINGS: [number, number, number, number, number][] = [
  // [x, y, w, h, height3d]
  [-7, -8.5, 1.8, 1.4, 3], [-4.5, -8.5, 1.6, 1.2, 2], [-1.5, -8.5, 1, 0.8, 4],
  [1, -8.5, 1.4, 1, 3], [3.5, -8.5, 1.8, 1.3, 2], [7, -8.5, 1.6, 1.1, 5],
  [10, -8.5, 1.4, 1, 3],
  [-7, -5, 2, 1.5, 4], [-4, -5, 1.4, 1, 2], [-1.5, -5, 1, 0.7, 3],
  [1, -5, 1.6, 1.2, 5], [3.5, -5, 2, 1.4, 3], [7, -5, 1.8, 1.3, 4],
  [10, -5, 1.2, 0.9, 2],
  [-7, -2.5, 1.6, 1.2, 3], [-4.5, -2, 1.2, 0.8, 2], [-1.5, -2.5, 0.9, 0.7, 4],
  [1, -2, 1.4, 1, 3], [3.5, -2.5, 1.8, 1.3, 2], [7, -2, 1.5, 1.1, 5],
  [-7, 0.5, 1.8, 1.4, 2], [-4, 0.5, 1.4, 1, 3], [-1.5, 1, 1, 0.7, 4],
  [1, 0.5, 1.6, 1.2, 2], [3.5, 0.5, 2, 1.5, 5], [7, 1, 1.3, 1, 3],
  [10, 0.5, 1.5, 1.1, 2],
  [-7, 3.5, 2, 1.4, 3], [-4.5, 4, 1.4, 1, 4], [-1.5, 3.5, 1.2, 0.9, 2],
  [1, 4, 1.8, 1.3, 5], [3.5, 3.5, 1.6, 1.2, 3], [7, 4, 1.4, 1, 2],
  [-7, 6.5, 1.6, 1.2, 4], [-4, 7, 1.2, 0.9, 2], [-1.5, 6.5, 1, 0.8, 3],
  [1, 7, 1.4, 1, 2], [3.5, 6.5, 1.8, 1.3, 5], [7, 7, 1.6, 1.1, 3],
  [10, 6.5, 1.2, 0.9, 4],
  [-7, 9.5, 1.8, 1.3, 2], [-4.5, 10, 1.4, 1, 3], [1, 9.5, 1.6, 1.2, 4],
  [3.5, 10, 2, 1.4, 2], [7, 9.5, 1.4, 1, 5],
  [-7, -11.5, 1.6, 1.1, 3], [-4, -11, 1.2, 0.9, 2], [1, -11.5, 1.4, 1, 4],
  [7, -11, 1.8, 1.3, 3], [10, -11.5, 1, 0.8, 2],
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
    const scale = Math.min(w, h) / 14; // zoomed in tight
    const rotRad = (ROTATION_DEG * Math.PI) / 180;

    // Background
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, w, h);

    // 3D perspective transform via skew
    ctx.save();
    ctx.translate(cx, cy);
    // Apply pseudo-3D: slight vertical compression + perspective skew
    ctx.transform(1, 0.08, -0.15, 0.85, 0, 0);
    ctx.rotate(rotRad);

    // Block fills
    const vLines = [-8, -5, -2, 0, 3, 6, 9, 12];
    const hLines = [-12, -9, -6, -3, 0, 3, 6, 9, 12];
    for (let i = 0; i < vLines.length - 1; i++) {
      for (let j = 0; j < hLines.length - 1; j++) {
        const bx = vLines[i] * scale + 0.5;
        const by = hLines[j] * scale + 0.5;
        const bw = (vLines[i + 1] - vLines[i]) * scale - 1;
        const bh = (hLines[j + 1] - hLines[j]) * scale - 1;
        ctx.fillStyle = (i + j) % 2 === 0 ? BLOCK : BLOCK_ALT;
        if (bw > 0 && bh > 0) ctx.fillRect(bx, by, bw, bh);
      }
    }

    // 3D buildings with extrusion
    for (const [bx, by, bw, bh, h3d] of BUILDINGS) {
      const x = bx * scale;
      const y = by * scale;
      const width = bw * scale;
      const height = bh * scale;
      const ext = h3d * 0.6; // extrusion amount

      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(x + ext + 1, y + ext + 1, width, height);

      // Side face (right)
      ctx.fillStyle = BUILDING;
      ctx.beginPath();
      ctx.moveTo(x + width, y);
      ctx.lineTo(x + width + ext, y - ext);
      ctx.lineTo(x + width + ext, y - ext + height);
      ctx.lineTo(x + width, y + height);
      ctx.closePath();
      ctx.fill();

      // Side face (top)
      ctx.fillStyle = "rgba(25, 30, 42, 0.9)";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + ext, y - ext);
      ctx.lineTo(x + width + ext, y - ext);
      ctx.lineTo(x + width, y);
      ctx.closePath();
      ctx.fill();

      // Top face
      ctx.fillStyle = BUILDING_TOP;
      ctx.fillRect(x, y, width, height);

      // Edge highlight
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x, y, width, height);
    }

    // Streets
    for (const street of STREETS) {
      const [x1, y1, x2, y2] = street.points;
      ctx.beginPath();
      ctx.moveTo(x1 * scale, y1 * scale);
      ctx.lineTo(x2 * scale, y2 * scale);
      ctx.strokeStyle = street.isMain ? STREET_MAIN_COLOR : STREET_SEC_COLOR;
      ctx.lineWidth = street.width || (street.isMain ? 3 : 1.2);
      ctx.stroke();

      // Center line for main streets
      if (street.isMain) {
        ctx.beginPath();
        ctx.moveTo(x1 * scale, y1 * scale);
        ctx.lineTo(x2 * scale, y2 * scale);
        ctx.strokeStyle = "rgba(70, 75, 90, 0.4)";
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // ─── MS Eletric Pin ───
    const pinX = 0.3 * scale;
    const pinY = -3 * scale;
    const pulse = (elapsed * 0.7) % 1;

    // Pulsing rings
    for (let i = 0; i < 3; i++) {
      const pt = (pulse + i * 0.33) % 1;
      const r = 4 + pt * 22;
      ctx.beginPath();
      ctx.arc(pinX, pinY, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 77, 34, ${(1 - pt) * 0.25})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    // Glow
    const glow = ctx.createRadialGradient(pinX, pinY, 0, pinX, pinY, 18);
    glow.addColorStop(0, "rgba(255, 77, 34, 0.25)");
    glow.addColorStop(1, "rgba(255, 77, 34, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(pinX, pinY, 18, 0, Math.PI * 2);
    ctx.fill();

    // Pin (counter-rotate for upright display, also undo perspective)
    ctx.save();
    ctx.translate(pinX, pinY);
    // Undo map rotation for pin
    ctx.rotate(-rotRad);
    // Rough undo of perspective skew for pin readability
    ctx.transform(1, 0, 0, 1.18, 0, 0);

    // Pin body
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.bezierCurveTo(-7, 0, -10, -8, -10, -14);
    ctx.arc(0, -14, 10, Math.PI, 0, false);
    ctx.bezierCurveTo(10, -8, 7, 0, 0, 8);
    ctx.closePath();
    ctx.shadowColor = "rgba(255, 77, 34, 0.5)";
    ctx.shadowBlur = 16;
    ctx.fillStyle = ORANGE;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Inner white dot
    ctx.beginPath();
    ctx.arc(0, -14, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();

    // Label
    ctx.font = "bold 10px Verdana, sans-serif";
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 4;
    ctx.fillText("MS ELETRIC", 16, -16);
    ctx.shadowBlur = 0;
    ctx.font = "7px Verdana, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillText("Av. João Pinheiro, 3747", 16, -5);

    ctx.restore(); // pin
    ctx.restore(); // map

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
