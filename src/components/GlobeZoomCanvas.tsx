import React, { useRef, useEffect, useCallback } from "react";

/**
 * GlobeZoomCanvas — Pure Canvas 2D
 * Globe with accurate continents → zoom into Uberlândia streets → MS Eletric pin
 */

const BG = "#080808";
const ORANGE = "hsl(11, 81%, 57%)";
const ORANGE_DIM = "hsla(11, 81%, 57%, 0.10)";
const ORANGE_MED = "hsla(11, 81%, 57%, 0.28)";
const ORANGE_HI = "hsla(11, 81%, 57%, 0.50)";
const ORANGE_BRIGHT = "hsla(11, 90%, 65%, 0.95)";
const WHITE_DIM = "rgba(255,255,255,0.035)";
const WHITE_FAINT = "rgba(255,255,255,0.06)";
const WHITE_TEXT = "rgba(255,255,255,0.45)";
const WHITE_LABEL = "rgba(255,255,255,0.55)";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

// ─── Accurate Continent Outlines ───
// More detailed coordinate arrays for recognizable shapes

const SOUTH_AMERICA: [number, number][] = [
  [12.5,-72],[11,-74],[10,-76],[8,-77],[6,-77.5],[4,-77],[2,-80],[1,-79.5],
  [0,-80],[-1,-80],[-3,-80],[-5,-79.5],[-5,-77],[-4,-75],[-3,-73],
  [-2,-70],[-1,-67],[0,-65],[1,-62],[2,-60],[3,-57],[5,-55],[6,-52],
  [5,-48],[4,-44],[3,-42],[2,-41],[0,-40],[-1,-39],[-2,-38],
  [-4,-37],[-6,-35],[-8,-35],[-10,-36.5],[-12,-38],[-14,-39],
  [-16,-39.5],[-18,-40],[-20,-41],[-22,-41.5],[-23,-43],[-24,-46],
  [-25,-48],[-26,-48.5],[-28,-49],[-29,-49.5],[-30,-50],[-31,-51],
  [-33,-52],[-34,-53.5],[-35,-55],[-37,-56],[-38,-57],[-39,-58],
  [-40,-60],[-41,-62],[-42,-63],[-44,-65],[-46,-66],[-48,-67],
  [-50,-68],[-51,-69],[-52,-70],[-53,-71],[-54,-70],[-55,-68],
  [-54,-66],[-53,-64],[-52,-62],[-50,-60],[-48,-58],[-46,-56],
  [-44,-55],[-42,-54],[-40,-53],[-38,-52],[-36,-51],[-34,-50],
  [-32,-49],[-30,-48],[-28,-47],[-26,-46],[-24,-45],[-22,-43],
  [-20,-42],[-18,-41],[-16,-40],[-14,-39],[-12,-38],[-10,-37],
  [-8,-35],[-6,-35],[-4,-36],[-2,-38],[0,-40],[1,-44],[2,-48],
  [3,-52],[4,-56],[5,-60],[4,-63],[3,-66],[2,-68],[1,-70],
  [0,-72],[-1,-74],[-2,-76],[-3,-78],[-4,-79],[-5,-79.5],
  [-3,-80],[-1,-80],[0,-80],[2,-80],[4,-77],[6,-77.5],[8,-77],
  [10,-76],[11,-74],[12.5,-72]
];

const BRAZIL_OUTLINE: [number, number][] = [
  [5,-52],[4,-44],[3,-42],[2,-41],[0,-40],[-1,-39],[-2,-38],
  [-4,-37],[-6,-35],[-8,-35],[-10,-36.5],[-12,-38],[-14,-39],
  [-16,-39.5],[-18,-40],[-20,-41],[-22,-41.5],[-23,-43],[-24,-46],
  [-25,-48],[-28,-49],[-30,-50],[-33,-52],[-34,-53.5],
  [-33,-55],[-30,-54],[-28,-52],[-25,-50],[-22,-48],
  [-20,-46],[-18,-48],[-16,-50],[-14,-52],[-12,-54],
  [-10,-56],[-8,-58],[-6,-60],[-4,-62],[-2,-64],
  [-1,-67],[0,-70],[-2,-72],[-4,-75],[-5,-77],[-5,-79.5],
  [-3,-80],[-1,-80],[0,-80],[2,-80],[4,-77],[5,-72],
  [4,-68],[3,-64],[4,-60],[5,-55],[5,-52]
];

const NORTH_AMERICA: [number, number][] = [
  [15,-85],[17,-88],[19,-90],[21,-92],[23,-95],[25,-97],[27,-100],
  [29,-103],[31,-106],[33,-108],[35,-110],[37,-112],[39,-115],
  [41,-118],[43,-120],[45,-122],[47,-124],[49,-123],[50,-120],
  [52,-118],[54,-115],[56,-112],[58,-108],[60,-105],[62,-100],
  [64,-95],[65,-90],[64,-85],[62,-82],[60,-78],[58,-75],
  [56,-72],[54,-70],[52,-68],[50,-66],[48,-65],[46,-64],
  [44,-66],[42,-68],[40,-70],[38,-72],[36,-75],[34,-77],
  [32,-79],[30,-81],[28,-82],[26,-81],[24,-80],[22,-82],
  [20,-84],[18,-86],[16,-86],[15,-85]
];

const CENTRAL_AMERICA: [number, number][] = [
  [15,-85],[14,-84],[13,-83],[12,-82],[11,-82],[10,-81],[9,-80],
  [8,-79],[9,-78],[10,-77],[11,-76],[12,-76],[13,-77],[14,-78],
  [15,-80],[16,-82],[17,-84],[18,-86],[17,-88],[15,-85]
];

const EUROPE: [number, number][] = [
  [36,-6],[37,-2],[38,0],[39,3],[41,2],[43,3],[44,5],[46,7],
  [48,8],[49,10],[50,12],[52,10],[53,12],[55,13],[56,15],
  [58,16],[59,18],[60,20],[62,22],[64,24],[65,26],[67,28],
  [69,30],[70,32],[68,35],[66,34],[64,32],[62,30],[60,28],
  [58,25],[56,22],[54,20],[52,18],[50,16],[48,14],[46,12],
  [44,10],[42,8],[40,5],[38,2],[36,-6]
];

const AFRICA: [number, number][] = [
  [37,-5],[36,0],[35,5],[33,10],[31,12],[29,10],[27,8],[25,5],
  [23,3],[21,0],[19,-3],[17,-5],[15,-7],[13,-10],[11,-12],
  [9,-14],[7,-15],[5,-16],[3,-15],[1,-12],[0,-8],[-2,-5],
  [-4,0],[-5,5],[-7,10],[-9,14],[-11,18],[-13,22],
  [-15,25],[-18,28],[-20,30],[-23,32],[-26,33],[-28,32],
  [-30,31],[-32,30],[-34,28],[-35,24],[-34,20],[-33,18],
  [-31,16],[-28,14],[-25,12],[-22,10],[-19,8],[-16,6],
  [-13,5],[-10,3],[-7,0],[-4,-3],[-1,-8],[2,-12],
  [5,-16],[8,-16],[11,-14],[14,-12],[17,-8],[20,-5],
  [23,-2],[26,0],[29,2],[32,5],[35,8],[37,5],[37,-5]
];

const ASIA: [number, number][] = [
  [70,32],[68,40],[66,45],[64,50],[62,55],[60,60],[58,65],
  [56,70],[54,75],[52,80],[50,85],[48,90],[46,95],[44,100],
  [42,105],[40,110],[38,115],[36,120],[34,122],[32,121],
  [30,120],[28,118],[26,115],[24,112],[22,110],[20,108],
  [18,105],[16,102],[14,100],[12,98],[10,100],[8,102],
  [6,104],[4,105],[2,103],[0,100],[-2,98],[-4,100],
  [-6,102],[-8,105],[-8,110],[-6,112],[-4,114],[-2,115],
  [0,118],[2,120],[4,122],[6,124],[8,125],[10,124],
  [12,122],[14,120],[16,118],[18,116],[20,114],
  [22,112],[24,110],[26,108],[28,106],[30,105],
  [32,102],[34,100],[36,95],[38,90],[40,85],[42,80],
  [44,75],[46,70],[48,65],[50,60],[52,55],[55,50],
  [58,45],[60,40],[62,38],[64,35],[66,34],[68,35],[70,32]
];

const AUSTRALIA: [number, number][] = [
  [-12,130],[-14,128],[-16,126],[-18,124],[-20,122],
  [-22,120],[-24,118],[-26,116],[-28,114],[-30,115],
  [-32,116],[-34,118],[-35,120],[-36,122],[-37,125],
  [-38,128],[-38,132],[-37,136],[-36,140],[-35,143],
  [-34,146],[-32,148],[-30,150],[-28,152],[-26,153],
  [-24,152],[-22,150],[-20,148],[-18,146],[-16,144],
  [-14,142],[-12,140],[-11,138],[-12,136],[-13,134],
  [-12,132],[-12,130]
];

const ALL_CONTINENTS = [
  { coords: SOUTH_AMERICA, fill: false, highlight: false },
  { coords: BRAZIL_OUTLINE, fill: true, highlight: true },
  { coords: NORTH_AMERICA, fill: true, highlight: false },
  { coords: CENTRAL_AMERICA, fill: true, highlight: false },
  { coords: EUROPE, fill: true, highlight: false },
  { coords: AFRICA, fill: true, highlight: false },
  { coords: ASIA, fill: true, highlight: false },
  { coords: AUSTRALIA, fill: true, highlight: false },
];

// ─── Street map data (based on real Google Maps around MS Eletric) ───

interface Street {
  name: string;
  points: [number, number][];
  isMain: boolean;
}

interface Landmark {
  name: string;
  icon: string;
  x: number;
  y: number;
}

// Grid based on real Uberlândia layout around Av. João Pinheiro 3747
// Origin (0,0) = MS Eletric position
// Scale: 1 unit ≈ 50m
const STREETS: Street[] = [
  // Main avenues (vertical = N-S, horizontal = E-W)
  { name: "Av. João Pinheiro", points: [[0,-8],[0,8]], isMain: true },
  { name: "Av. Brasil", points: [[-8,-1.5],[8,-1.5]], isMain: true },
  { name: "Av. Afonso Pena", points: [[3.5,-8],[3.5,8]], isMain: true },

  // Secondary streets (horizontal)
  { name: "R. Claudemiro José de Souza", points: [[-8,1.5],[8,1.5]], isMain: false },
  { name: "R. Alagoas", points: [[-8,-3.5],[8,-3.5]], isMain: false },
  { name: "R. Bahia", points: [[-8,3.5],[8,3.5]], isMain: false },
  { name: "R. São Paulo", points: [[-8,5.5],[8,5.5]], isMain: false },
  { name: "R. Espírito Santo", points: [[-8,-5.5],[8,-5.5]], isMain: false },

  // Secondary streets (vertical)
  { name: "Av. Mato Grosso", points: [[-3.5,-8],[-3.5,8]], isMain: false },
  { name: "R. José Alves", points: [[6,-8],[6,8]], isMain: false },
  { name: "", points: [[-6.5,-8],[-6.5,8]], isMain: false },
  { name: "", points: [[-1.5,-8],[-1.5,8]], isMain: false },
  { name: "", points: [[1.5,-8],[1.5,8]], isMain: false },
];

// Landmarks based on actual Google Maps data
const LANDMARKS: Landmark[] = [
  { name: "Shopping Utilidade", icon: "🏬", x: 4.5, y: -4 },
  { name: "Escola Oficial do Flamengo", icon: "⚽", x: -5, y: -3 },
  { name: "Toyota Osaka", icon: "🚗", x: 2.5, y: -3.5 },
  { name: "CEMEPE", icon: "🏫", x: 2, y: -6 },
  { name: "Chevrolet Autos", icon: "🚗", x: 5, y: 0 },
  { name: "Drogasil", icon: "💊", x: 2, y: 4 },
  { name: "Casa de Carnes Brasil", icon: "🥩", x: -2, y: -0.5 },
];

// ─── Globe projection ───
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

  // Atmosphere
  const atmo = ctx.createRadialGradient(cx, cy, radius * 0.9, cx, cy, radius * 1.15);
  atmo.addColorStop(0, "hsla(11,81%,57%,0)");
  atmo.addColorStop(0.8, "hsla(11,81%,57%,0.04)");
  atmo.addColorStop(1, "hsla(11,81%,57%,0)");
  ctx.fillStyle = atmo;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
  ctx.fill();

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

  // Grid
  ctx.strokeStyle = ORANGE_DIM;
  ctx.lineWidth = 0.4;
  for (let lat = -60; lat <= 60; lat += 20) {
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
  for (let lng = -180; lng < 180; lng += 20) {
    ctx.beginPath();
    let first = true;
    for (let lat = -85; lat <= 85; lat += 3) {
      const p = project(lat, lng, cx, cy, radius, rotation);
      if (p.visible) {
        if (first) { ctx.moveTo(p.x, p.y); first = false; }
        else ctx.lineTo(p.x, p.y);
      } else first = true;
    }
    ctx.stroke();
  }

  // Continents
  for (const cont of ALL_CONTINENTS) {
    ctx.beginPath();
    let first = true;
    let anyVis = false;
    for (const [lat, lng] of cont.coords) {
      const p = project(lat, lng, cx, cy, radius, rotation);
      if (p.visible) {
        anyVis = true;
        if (first) { ctx.moveTo(p.x, p.y); first = false; }
        else ctx.lineTo(p.x, p.y);
      } else first = true;
    }
    if (anyVis) {
      ctx.closePath();
      if (cont.fill) {
        ctx.fillStyle = cont.highlight ? "hsla(11,81%,57%,0.15)" : "hsla(11,81%,57%,0.06)";
        ctx.fill();
      }
      ctx.strokeStyle = cont.highlight ? ORANGE_HI : ORANGE_MED;
      ctx.lineWidth = cont.highlight ? 1.4 : 0.8;
      ctx.stroke();
    }
  }

  // Uberlândia dot
  const ubr = project(-18.9186, -48.2772, cx, cy, radius, rotation);
  if (ubr.visible) {
    const g = ctx.createRadialGradient(ubr.x, ubr.y, 0, ubr.x, ubr.y, 10);
    g.addColorStop(0, "hsla(11,81%,57%,0.5)");
    g.addColorStop(1, "hsla(11,81%,57%,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(ubr.x, ubr.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(ubr.x, ubr.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = ORANGE_BRIGHT;
    ctx.fill();
  }

  ctx.restore(); // unclip
  ctx.restore();
}

// ─── Street map drawing ───

function drawStreetMap(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  scale: number, alpha: number,
  elapsed: number
) {
  ctx.save();
  ctx.globalAlpha = alpha;

  const s = scale * 12; // pixels per grid unit

  // Draw blocks (filled)
  ctx.fillStyle = WHITE_DIM;
  for (const street of STREETS) {
    if (!street.isMain) continue;
    // Skip, we draw blocks between streets
  }

  // Draw all street lines
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

  // Block fills between streets
  ctx.fillStyle = "rgba(255,255,255,0.012)";
  const vLines = [-6.5, -3.5, -1.5, 0, 1.5, 3.5, 6];
  const hLines = [-5.5, -3.5, -1.5, 1.5, 3.5, 5.5];
  for (let i = 0; i < vLines.length - 1; i++) {
    for (let j = 0; j < hLines.length - 1; j++) {
      const bx = cx + vLines[i] * s + 2;
      const by = cy + hLines[j] * s + 2;
      const bw = (vLines[i + 1] - vLines[i]) * s - 4;
      const bh = (hLines[j + 1] - hLines[j]) * s - 4;
      if (bw > 4 && bh > 4) {
        ctx.fillRect(bx, by, bw, bh);
      }
    }
  }

  // Street labels (only when zoomed enough)
  if (scale > 1.5) {
    const labelAlpha = Math.min((scale - 1.5) / 1, 1);
    ctx.globalAlpha = alpha * labelAlpha;
    
    // Main avenue labels
    ctx.fillStyle = WHITE_LABEL;
    ctx.font = `bold ${Math.max(7, Math.min(9, s * 0.6))}px sans-serif`;

    // Av. João Pinheiro (vertical)
    ctx.save();
    ctx.translate(cx + 0.3 * s, cy - 5 * s);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("AV. JOÃO PINHEIRO", 0, 0);
    ctx.restore();

    // Av. Brasil (horizontal)
    ctx.save();
    ctx.translate(cx - 6 * s, cy - 1.8 * s);
    ctx.fillText("AV. BRASIL", 0, 0);
    ctx.restore();

    // Av. Afonso Pena (vertical)
    ctx.save();
    ctx.translate(cx + 3.8 * s, cy - 5 * s);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("AV. AFONSO PENA", 0, 0);
    ctx.restore();

    // Secondary labels
    ctx.font = `${Math.max(5, Math.min(7, s * 0.4))}px sans-serif`;
    ctx.fillStyle = WHITE_TEXT;

    // R. Alagoas
    ctx.save();
    ctx.translate(cx - 6 * s, cy - 3.8 * s);
    ctx.fillText("R. Alagoas", 0, 0);
    ctx.restore();

    // R. Bahia
    ctx.save();
    ctx.translate(cx - 6 * s, cy + 3.2 * s);
    ctx.fillText("R. Bahia", 0, 0);
    ctx.restore();

    // R. São Paulo
    ctx.save();
    ctx.translate(cx - 6 * s, cy + 5.2 * s);
    ctx.fillText("R. São Paulo", 0, 0);
    ctx.restore();

    // Av. Mato Grosso
    ctx.save();
    ctx.translate(cx - 3.2 * s, cy + 6 * s);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Av. Mato Grosso", 0, 0);
    ctx.restore();

    ctx.globalAlpha = alpha;
  }

  // Landmarks
  if (scale > 2) {
    const lmAlpha = Math.min((scale - 2) / 1, 1);
    ctx.globalAlpha = alpha * lmAlpha;
    
    for (const lm of LANDMARKS) {
      const lx = cx + lm.x * s;
      const ly = cy + lm.y * s;

      // Small dot
      ctx.beginPath();
      ctx.arc(lx, ly, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.2)";
      ctx.fill();

      // Label
      ctx.font = `${Math.max(5, Math.min(6.5, s * 0.35))}px sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillText(`${lm.icon} ${lm.name}`, lx + 4, ly + 2);
    }
    ctx.globalAlpha = alpha;
  }

  ctx.restore();
}

// ─── Pin drawing ───

function drawPin(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  pulseT: number, alpha: number
) {
  ctx.save();
  ctx.globalAlpha = alpha;

  // Pulse rings
  for (let i = 0; i < 2; i++) {
    const pt = (pulseT + i * 0.5) % 1;
    const r = 5 + pt * 18;
    const a = (1 - pt) * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(11,81%,57%,${a})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Glow
  const g = ctx.createRadialGradient(x, y, 0, x, y, 16);
  g.addColorStop(0, "hsla(11,81%,57%,0.5)");
  g.addColorStop(1, "hsla(11,81%,57%,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, 16, 0, Math.PI * 2);
  ctx.fill();

  // Outer ring
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fillStyle = ORANGE_BRIGHT;
  ctx.fill();

  // Inner dot
  ctx.beginPath();
  ctx.arc(x, y, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();

  // Label box
  const labelX = x + 12;
  const labelY = y - 8;
  ctx.fillStyle = "hsla(0,0%,5%,0.85)";
  ctx.strokeStyle = "hsla(11,81%,57%,0.3)";
  ctx.lineWidth = 0.8;
  const boxW = 72;
  const boxH = 28;
  ctx.beginPath();
  ctx.roundRect(labelX, labelY, boxW, boxH, 4);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#fff";
  ctx.font = "bold 7px sans-serif";
  ctx.fillText("MS Eletric", labelX + 5, labelY + 10);
  ctx.fillStyle = WHITE_TEXT;
  ctx.font = "5.5px sans-serif";
  ctx.fillText("Av. João Pinheiro, 3747", labelX + 5, labelY + 20);

  ctx.restore();
}

// ─── Main component ───

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
    if (w === 0 || h === 0) {
      animRef.current = requestAnimationFrame(animate);
      return;
    }
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const now = performance.now();
    if (!startTime.current) startTime.current = now;
    const elapsed = (now - startTime.current) / 1000;

    const cycle = 12;
    const t = (elapsed % cycle) / cycle;

    // Clear
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

    /*
     * Phase 0 (0.00–0.35): Globe rotating, centered on Brazil
     * Phase 1 (0.35–0.55): Zoom transition
     * Phase 2 (0.55–0.88): Street map with pin + landmarks
     * Phase 3 (0.88–1.00): Fade back
     */

    if (t < 0.35) {
      const pt = t / 0.35;
      const rotation = 48 + Math.sin(pt * Math.PI * 0.8) * 12;
      drawGlobe(ctx, w, h, cx, cy, baseRadius, rotation, 1);
    } else if (t < 0.55) {
      const pt = easeInOutCubic((t - 0.35) / 0.2);
      const globeAlpha = 1 - pt;
      const streetAlpha = pt;
      const zoomRadius = baseRadius * lerp(1, 4, pt);

      if (globeAlpha > 0.01) {
        drawGlobe(ctx, w, h, cx, cy, zoomRadius, 48, globeAlpha);
      }
      if (streetAlpha > 0.01) {
        drawStreetMap(ctx, cx, cy, lerp(0.5, 3, pt), streetAlpha, elapsed);
      }
    } else if (t < 0.88) {
      const pt = (t - 0.55) / 0.33;
      const scale = lerp(3, 4, easeInOutCubic(Math.min(pt * 1.5, 1)));
      drawStreetMap(ctx, cx, cy, scale, 1, elapsed);

      // Pin
      const pinAlpha = easeInOutCubic(Math.min(pt * 2.5, 1));
      const s = scale * 12;
      const pinX = cx; // MS Eletric at origin (Av. João Pinheiro)
      const pinY = cy;
      drawPin(ctx, pinX, pinY, (elapsed * 0.7) % 1, pinAlpha);
    } else {
      const pt = easeInOutCubic((t - 0.88) / 0.12);
      const streetAlpha = 1 - pt;
      const globeAlpha = pt;

      if (streetAlpha > 0.01) {
        const scale = lerp(4, 1.5, pt);
        drawStreetMap(ctx, cx, cy, scale, streetAlpha, elapsed);
        const s = scale * 12;
        drawPin(ctx, cx, cy, (elapsed * 0.7) % 1, streetAlpha);
      }
      if (globeAlpha > 0.01) {
        const radius = baseRadius * lerp(4, 1, pt);
        drawGlobe(ctx, w, h, cx, cy, radius, 48, globeAlpha);
      }
    }

    // Corner brackets
    ctx.strokeStyle = "hsla(11,81%,57%,0.12)";
    ctx.lineWidth = 0.8;
    const m = 6;
    const cl = 16;
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
