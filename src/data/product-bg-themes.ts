/**
 * Per-product background theme configuration.
 * Each theme controls the visual atmosphere of a product page.
 */

export interface FloatingElement {
  /** SVG path or shape type */
  type: "path" | "circle" | "rect" | "line" | "grid-node";
  /** SVG path data (for type "path") */
  d?: string;
  /** Size range [min, max] in px */
  size: [number, number];
  /** Opacity range [min, max] */
  opacity: [number, number];
  /** Count of this element */
  count: number;
  /** Animation speed multiplier (1 = normal) */
  speed: number;
  /** Blur amount in px */
  blur?: number;
}

export interface ProductBgTheme {
  /** Ambient glow positions and intensities */
  glows: Array<{
    x: string; // CSS position
    y: string;
    size: string;
    color: string; // HSL
    opacity: number;
    animation?: "breathe" | "drift" | "pulse";
  }>;
  /** Grid/line overlay */
  grid: {
    enabled: boolean;
    type: "orthogonal" | "diagonal" | "hexagonal" | "dots";
    opacity: number;
    spacing: number;
    drift?: number; // px per second
  };
  /** Floating contextual elements */
  elements: FloatingElement[];
  /** Particle field */
  particles: {
    count: number;
    speed: number;
    sizeRange: [number, number];
    opacity: number;
    /** Dominant drift direction */
    direction?: "up" | "right" | "random" | "radial";
  };
  /** Overall animation speed multiplier */
  animationSpeed: number;
  /** Category accent tint (subtle secondary glow color) */
  accentHsl: string;
}

// ── Helper to create common base ──
const base = (overrides: Partial<ProductBgTheme>): ProductBgTheme => ({
  glows: [
    { x: "20%", y: "15%", size: "600px", color: "11 81% 57%", opacity: 0.035, animation: "breathe" },
    { x: "80%", y: "60%", size: "500px", color: "11 81% 57%", opacity: 0.02, animation: "drift" },
  ],
  grid: { enabled: true, type: "orthogonal", opacity: 0.03, spacing: 80, drift: 0.1 },
  elements: [],
  particles: { count: 25, speed: 0.3, sizeRange: [1, 2.5], opacity: 0.15, direction: "up" },
  animationSpeed: 1,
  accentHsl: "11 81% 57%",
  ...overrides,
});

// ── Urban/City line path fragments ──
const cityLine1 = "M0,20 L10,20 L10,5 L20,5 L20,15 L30,15 L30,0";
const cityLine2 = "M0,0 L5,0 L5,12 L15,12 L15,3 L25,3";
const routeDots = "M0,0 L8,0 M12,0 L20,0 M24,0 L32,0"; // dashed route
const curvePath = "M0,20 Q15,0 30,20 Q45,40 60,20";
const diagonalFlow = "M0,30 L30,0";
const boxShape = "M0,0 L20,0 L20,15 L0,15 Z";
const energyWave = "M0,10 Q5,0 10,10 Q15,20 20,10 Q25,0 30,10";
const trailCurve = "M0,15 C10,0 20,30 30,15";

export const PRODUCT_BG_THEMES: Record<string, ProductBgTheme> = {
  // ─── 1. BIKE 350 ───
  "bike-350": base({
    accentHsl: "200 30% 50%",
    glows: [
      { x: "25%", y: "20%", size: "500px", color: "11 81% 57%", opacity: 0.03, animation: "breathe" },
      { x: "75%", y: "70%", size: "400px", color: "200 30% 50%", opacity: 0.02, animation: "drift" },
    ],
    grid: { enabled: true, type: "dots", opacity: 0.025, spacing: 60, drift: 0.05 },
    elements: [
      { type: "path", d: cityLine1, size: [30, 50], opacity: [0.04, 0.08], count: 6, speed: 0.4, blur: 1 },
      { type: "circle", size: [3, 6], opacity: [0.06, 0.12], count: 10, speed: 0.3 },
      { type: "path", d: routeDots, size: [20, 35], opacity: [0.03, 0.06], count: 4, speed: 0.2, blur: 2 },
    ],
    particles: { count: 20, speed: 0.2, sizeRange: [1, 2], opacity: 0.12, direction: "up" },
    animationSpeed: 0.8,
  }),

  // ─── 2. BIKE 400+ ───
  "bike-400": base({
    accentHsl: "210 35% 55%",
    glows: [
      { x: "30%", y: "15%", size: "550px", color: "11 81% 57%", opacity: 0.03, animation: "breathe" },
      { x: "70%", y: "55%", size: "480px", color: "210 35% 55%", opacity: 0.025, animation: "drift" },
    ],
    grid: { enabled: true, type: "orthogonal", opacity: 0.03, spacing: 70, drift: 0.08 },
    elements: [
      { type: "path", d: curvePath, size: [40, 60], opacity: [0.04, 0.09], count: 5, speed: 0.5, blur: 1 },
      { type: "circle", size: [2, 5], opacity: [0.05, 0.1], count: 12, speed: 0.4 },
      { type: "line", size: [30, 60], opacity: [0.03, 0.07], count: 6, speed: 0.3, blur: 1 },
    ],
    particles: { count: 25, speed: 0.25, sizeRange: [1, 2.5], opacity: 0.14, direction: "up" },
    animationSpeed: 0.9,
  }),

  // ─── 3. BIKE 500 ───
  "bike-500": base({
    accentHsl: "220 30% 48%",
    glows: [
      { x: "20%", y: "25%", size: "600px", color: "11 81% 57%", opacity: 0.035, animation: "breathe" },
      { x: "80%", y: "50%", size: "500px", color: "220 30% 48%", opacity: 0.025, animation: "pulse" },
    ],
    grid: { enabled: true, type: "orthogonal", opacity: 0.035, spacing: 65, drift: 0.06 },
    elements: [
      { type: "rect", size: [15, 30], opacity: [0.04, 0.08], count: 8, speed: 0.3, blur: 1 },
      { type: "path", d: cityLine2, size: [35, 55], opacity: [0.04, 0.09], count: 5, speed: 0.35 },
      { type: "line", size: [40, 80], opacity: [0.03, 0.06], count: 4, speed: 0.2, blur: 2 },
    ],
    particles: { count: 22, speed: 0.2, sizeRange: [1.5, 3], opacity: 0.13, direction: "up" },
    animationSpeed: 0.85,
  }),

  // ─── 4. BIKE MS 600 ───
  "bike-ms-600": base({
    accentHsl: "195 40% 50%",
    glows: [
      { x: "15%", y: "10%", size: "650px", color: "11 81% 57%", opacity: 0.03, animation: "breathe" },
      { x: "85%", y: "65%", size: "550px", color: "195 40% 50%", opacity: 0.03, animation: "drift" },
    ],
    grid: { enabled: true, type: "orthogonal", opacity: 0.025, spacing: 90, drift: 0.12 },
    elements: [
      { type: "path", d: curvePath, size: [50, 80], opacity: [0.03, 0.07], count: 4, speed: 0.6, blur: 1 },
      { type: "line", size: [60, 120], opacity: [0.02, 0.05], count: 5, speed: 0.4, blur: 2 },
      { type: "circle", size: [2, 4], opacity: [0.06, 0.12], count: 15, speed: 0.35 },
    ],
    particles: { count: 30, speed: 0.3, sizeRange: [1, 2.5], opacity: 0.15, direction: "up" },
    animationSpeed: 1,
  }),

  // ─── 5. BLISS ───
  "bliss": base({
    accentHsl: "30 50% 55%",
    glows: [
      { x: "50%", y: "20%", size: "700px", color: "30 50% 55%", opacity: 0.03, animation: "breathe" },
      { x: "20%", y: "70%", size: "500px", color: "11 81% 57%", opacity: 0.025, animation: "drift" },
      { x: "80%", y: "40%", size: "400px", color: "40 40% 50%", opacity: 0.015, animation: "pulse" },
    ],
    grid: { enabled: true, type: "diagonal", opacity: 0.02, spacing: 100, drift: 0.05 },
    elements: [
      { type: "circle", size: [4, 8], opacity: [0.03, 0.06], count: 8, speed: 0.3, blur: 3 },
      { type: "path", d: trailCurve, size: [40, 70], opacity: [0.02, 0.05], count: 4, speed: 0.25, blur: 2 },
      { type: "line", size: [20, 50], opacity: [0.03, 0.06], count: 6, speed: 0.2, blur: 1 },
    ],
    particles: { count: 20, speed: 0.15, sizeRange: [1, 2], opacity: 0.1, direction: "radial" },
    animationSpeed: 0.7,
  }),

  // ─── 6. LIBERTY ULTRA ───
  "liberty-ultra": base({
    accentHsl: "25 40% 52%",
    glows: [
      { x: "30%", y: "20%", size: "600px", color: "11 81% 57%", opacity: 0.03, animation: "breathe" },
      { x: "70%", y: "60%", size: "550px", color: "25 40% 52%", opacity: 0.025, animation: "drift" },
    ],
    grid: { enabled: true, type: "dots", opacity: 0.025, spacing: 80, drift: 0.06 },
    elements: [
      { type: "path", d: curvePath, size: [35, 60], opacity: [0.03, 0.07], count: 5, speed: 0.35, blur: 2 },
      { type: "circle", size: [3, 7], opacity: [0.04, 0.08], count: 8, speed: 0.25 },
      { type: "line", size: [30, 55], opacity: [0.03, 0.06], count: 4, speed: 0.3, blur: 1 },
    ],
    particles: { count: 22, speed: 0.2, sizeRange: [1, 2.5], opacity: 0.12, direction: "up" },
    animationSpeed: 0.85,
  }),

  // ─── 7. SANTA MONICA ───
  "santa-monica": base({
    accentHsl: "170 35% 50%",
    glows: [
      { x: "40%", y: "15%", size: "600px", color: "170 35% 50%", opacity: 0.025, animation: "breathe" },
      { x: "60%", y: "70%", size: "500px", color: "11 81% 57%", opacity: 0.02, animation: "drift" },
    ],
    grid: { enabled: true, type: "dots", opacity: 0.02, spacing: 90, drift: 0.04 },
    elements: [
      { type: "path", d: trailCurve, size: [30, 55], opacity: [0.03, 0.06], count: 6, speed: 0.4, blur: 2 },
      { type: "line", size: [40, 80], opacity: [0.02, 0.04], count: 5, speed: 0.3, blur: 3 },
      { type: "circle", size: [2, 4], opacity: [0.04, 0.08], count: 10, speed: 0.35 },
    ],
    particles: { count: 18, speed: 0.25, sizeRange: [1, 2], opacity: 0.1, direction: "up" },
    animationSpeed: 0.9,
  }),

  // ─── 8. BIG SUR ───
  "big-sur": base({
    accentHsl: "150 30% 45%",
    glows: [
      { x: "25%", y: "25%", size: "650px", color: "150 30% 45%", opacity: 0.025, animation: "breathe" },
      { x: "75%", y: "55%", size: "550px", color: "11 81% 57%", opacity: 0.025, animation: "drift" },
    ],
    grid: { enabled: true, type: "diagonal", opacity: 0.025, spacing: 85, drift: 0.07 },
    elements: [
      { type: "path", d: diagonalFlow, size: [40, 70], opacity: [0.03, 0.06], count: 5, speed: 0.35, blur: 2 },
      { type: "rect", size: [12, 25], opacity: [0.03, 0.06], count: 6, speed: 0.25, blur: 1 },
      { type: "circle", size: [3, 6], opacity: [0.04, 0.08], count: 8, speed: 0.3 },
    ],
    particles: { count: 25, speed: 0.2, sizeRange: [1.5, 3], opacity: 0.12, direction: "random" },
    animationSpeed: 0.9,
  }),

  // ─── 9. MS 2500 ───
  "ms-2500": base({
    accentHsl: "15 70% 55%",
    glows: [
      { x: "20%", y: "20%", size: "600px", color: "11 81% 57%", opacity: 0.04, animation: "breathe" },
      { x: "80%", y: "50%", size: "500px", color: "15 70% 55%", opacity: 0.03, animation: "pulse" },
    ],
    grid: { enabled: true, type: "orthogonal", opacity: 0.035, spacing: 60, drift: 0.1 },
    elements: [
      { type: "path", d: energyWave, size: [35, 60], opacity: [0.04, 0.09], count: 6, speed: 0.5 },
      { type: "line", size: [50, 100], opacity: [0.03, 0.07], count: 5, speed: 0.4, blur: 1 },
      { type: "rect", size: [8, 18], opacity: [0.04, 0.08], count: 8, speed: 0.35 },
    ],
    particles: { count: 30, speed: 0.35, sizeRange: [1, 3], opacity: 0.16, direction: "up" },
    animationSpeed: 1.1,
  }),

  // ─── 10. NEW HOLIDAY ───
  "new-holiday": base({
    accentHsl: "200 25% 50%",
    glows: [
      { x: "30%", y: "20%", size: "500px", color: "11 81% 57%", opacity: 0.03, animation: "breathe" },
      { x: "70%", y: "65%", size: "450px", color: "200 25% 50%", opacity: 0.02, animation: "drift" },
    ],
    grid: { enabled: true, type: "dots", opacity: 0.025, spacing: 70, drift: 0.05 },
    elements: [
      { type: "path", d: routeDots, size: [20, 40], opacity: [0.03, 0.06], count: 6, speed: 0.3, blur: 1 },
      { type: "line", size: [25, 50], opacity: [0.03, 0.06], count: 5, speed: 0.25 },
      { type: "circle", size: [2, 4], opacity: [0.05, 0.1], count: 8, speed: 0.3 },
    ],
    particles: { count: 20, speed: 0.2, sizeRange: [1, 2], opacity: 0.12, direction: "up" },
    animationSpeed: 0.85,
  }),

  // ─── 11. HOLIDAY 1000 ───
  "holiday-1000": base({
    accentHsl: "190 30% 48%",
    glows: [
      { x: "35%", y: "20%", size: "480px", color: "11 81% 57%", opacity: 0.025, animation: "breathe" },
      { x: "65%", y: "60%", size: "420px", color: "190 30% 48%", opacity: 0.02, animation: "drift" },
    ],
    grid: { enabled: true, type: "dots", opacity: 0.02, spacing: 55, drift: 0.04 },
    elements: [
      { type: "path", d: routeDots, size: [15, 30], opacity: [0.03, 0.06], count: 5, speed: 0.25, blur: 1 },
      { type: "circle", size: [2, 4], opacity: [0.04, 0.08], count: 8, speed: 0.3 },
      { type: "line", size: [20, 40], opacity: [0.03, 0.05], count: 4, speed: 0.2 },
    ],
    particles: { count: 18, speed: 0.2, sizeRange: [1, 2], opacity: 0.1, direction: "up" },
    animationSpeed: 0.8,
  }),

  // ─── 12. TOUR 3K ───
  "tour-3k": base({
    accentHsl: "5 65% 55%",
    glows: [
      { x: "20%", y: "15%", size: "650px", color: "11 81% 57%", opacity: 0.04, animation: "breathe" },
      { x: "80%", y: "45%", size: "550px", color: "5 65% 55%", opacity: 0.03, animation: "pulse" },
    ],
    grid: { enabled: true, type: "diagonal", opacity: 0.03, spacing: 75, drift: 0.1 },
    elements: [
      { type: "path", d: energyWave, size: [40, 70], opacity: [0.04, 0.09], count: 5, speed: 0.55 },
      { type: "line", size: [50, 100], opacity: [0.03, 0.07], count: 6, speed: 0.45, blur: 1 },
      { type: "path", d: diagonalFlow, size: [30, 55], opacity: [0.03, 0.06], count: 4, speed: 0.4, blur: 2 },
    ],
    particles: { count: 28, speed: 0.35, sizeRange: [1, 3], opacity: 0.16, direction: "up" },
    animationSpeed: 1.1,
  }),

  // ─── 13. S3K ───
  "s3k": base({
    accentHsl: "0 60% 52%",
    glows: [
      { x: "15%", y: "10%", size: "700px", color: "11 81% 57%", opacity: 0.045, animation: "breathe" },
      { x: "85%", y: "40%", size: "600px", color: "0 60% 52%", opacity: 0.035, animation: "pulse" },
      { x: "50%", y: "80%", size: "400px", color: "11 81% 57%", opacity: 0.02, animation: "drift" },
    ],
    grid: { enabled: true, type: "diagonal", opacity: 0.03, spacing: 80, drift: 0.12 },
    elements: [
      { type: "path", d: energyWave, size: [45, 80], opacity: [0.04, 0.1], count: 6, speed: 0.6 },
      { type: "line", size: [60, 130], opacity: [0.03, 0.07], count: 5, speed: 0.5, blur: 1 },
      { type: "circle", size: [3, 6], opacity: [0.05, 0.1], count: 10, speed: 0.4 },
    ],
    particles: { count: 35, speed: 0.35, sizeRange: [1, 3], opacity: 0.18, direction: "radial" },
    animationSpeed: 1.15,
  }),

  // ─── 14. TRICICLO ELÉTRICO ───
  "triciclo-eletrico": base({
    accentHsl: "35 35% 50%",
    glows: [
      { x: "50%", y: "25%", size: "600px", color: "11 81% 57%", opacity: 0.03, animation: "breathe" },
      { x: "30%", y: "65%", size: "500px", color: "35 35% 50%", opacity: 0.02, animation: "drift" },
    ],
    grid: { enabled: true, type: "orthogonal", opacity: 0.025, spacing: 80, drift: 0.03 },
    elements: [
      { type: "line", size: [50, 90], opacity: [0.03, 0.06], count: 4, speed: 0.2, blur: 1 },
      { type: "rect", size: [12, 22], opacity: [0.03, 0.06], count: 6, speed: 0.2 },
      { type: "circle", size: [4, 8], opacity: [0.03, 0.06], count: 6, speed: 0.15, blur: 2 },
    ],
    particles: { count: 18, speed: 0.15, sizeRange: [1, 2.5], opacity: 0.1, direction: "up" },
    animationSpeed: 0.7,
  }),

  // ─── 15. RHINO DELIVERY ───
  "rhino-delivery": base({
    accentHsl: "45 50% 52%",
    glows: [
      { x: "25%", y: "20%", size: "600px", color: "11 81% 57%", opacity: 0.035, animation: "breathe" },
      { x: "75%", y: "55%", size: "500px", color: "45 50% 52%", opacity: 0.025, animation: "drift" },
    ],
    grid: { enabled: true, type: "orthogonal", opacity: 0.03, spacing: 65, drift: 0.08 },
    elements: [
      { type: "path", d: boxShape, size: [18, 30], opacity: [0.04, 0.08], count: 8, speed: 0.35, blur: 1 },
      { type: "path", d: routeDots, size: [25, 45], opacity: [0.03, 0.07], count: 5, speed: 0.4 },
      { type: "circle", size: [3, 5], opacity: [0.05, 0.1], count: 10, speed: 0.3 },
    ],
    particles: { count: 25, speed: 0.3, sizeRange: [1, 2.5], opacity: 0.14, direction: "up" },
    animationSpeed: 1,
  }),

  // ─── 16. CARGO ───
  "cargo": base({
    accentHsl: "40 40% 48%",
    glows: [
      { x: "30%", y: "20%", size: "650px", color: "11 81% 57%", opacity: 0.035, animation: "breathe" },
      { x: "70%", y: "60%", size: "550px", color: "40 40% 48%", opacity: 0.025, animation: "drift" },
    ],
    grid: { enabled: true, type: "orthogonal", opacity: 0.035, spacing: 55, drift: 0.06 },
    elements: [
      { type: "rect", size: [15, 35], opacity: [0.04, 0.08], count: 10, speed: 0.25, blur: 1 },
      { type: "path", d: boxShape, size: [20, 40], opacity: [0.03, 0.07], count: 6, speed: 0.3 },
      { type: "line", size: [40, 80], opacity: [0.03, 0.06], count: 4, speed: 0.2, blur: 2 },
    ],
    particles: { count: 22, speed: 0.2, sizeRange: [1.5, 3], opacity: 0.12, direction: "up" },
    animationSpeed: 0.85,
  }),

  // ─── 17. MOTO CROSS INFANTIL ───
  "motocross-infantil": base({
    accentHsl: "140 45% 50%",
    glows: [
      { x: "30%", y: "15%", size: "550px", color: "11 81% 57%", opacity: 0.035, animation: "breathe" },
      { x: "70%", y: "55%", size: "500px", color: "140 45% 50%", opacity: 0.025, animation: "pulse" },
    ],
    grid: { enabled: true, type: "dots", opacity: 0.025, spacing: 70, drift: 0.08 },
    elements: [
      { type: "path", d: energyWave, size: [25, 45], opacity: [0.04, 0.08], count: 6, speed: 0.5 },
      { type: "path", d: trailCurve, size: [30, 50], opacity: [0.03, 0.07], count: 5, speed: 0.45, blur: 1 },
      { type: "circle", size: [3, 6], opacity: [0.05, 0.1], count: 10, speed: 0.4 },
    ],
    particles: { count: 25, speed: 0.3, sizeRange: [1, 2.5], opacity: 0.14, direction: "random" },
    animationSpeed: 1.1,
  }),

  // ─── 18. DRIFT ELÉTRICO 350 ───
  "drift-eletrico-350": base({
    accentHsl: "280 40% 55%",
    glows: [
      { x: "35%", y: "20%", size: "550px", color: "11 81% 57%", opacity: 0.035, animation: "breathe" },
      { x: "65%", y: "60%", size: "480px", color: "280 40% 55%", opacity: 0.025, animation: "pulse" },
    ],
    grid: { enabled: true, type: "dots", opacity: 0.025, spacing: 65, drift: 0.08 },
    elements: [
      { type: "path", d: curvePath, size: [25, 45], opacity: [0.04, 0.08], count: 6, speed: 0.5 },
      { type: "circle", size: [3, 7], opacity: [0.04, 0.09], count: 10, speed: 0.45 },
      { type: "path", d: trailCurve, size: [20, 40], opacity: [0.03, 0.06], count: 4, speed: 0.4, blur: 2 },
    ],
    particles: { count: 25, speed: 0.3, sizeRange: [1, 2.5], opacity: 0.14, direction: "random" },
    animationSpeed: 1.05,
  }),

  // ─── 19. PATINETE 350 ───
  "patinete-350": base({
    accentHsl: "180 35% 50%",
    glows: [
      { x: "40%", y: "20%", size: "450px", color: "11 81% 57%", opacity: 0.025, animation: "breathe" },
      { x: "60%", y: "65%", size: "400px", color: "180 35% 50%", opacity: 0.02, animation: "drift" },
    ],
    grid: { enabled: true, type: "dots", opacity: 0.02, spacing: 50, drift: 0.04 },
    elements: [
      { type: "line", size: [15, 35], opacity: [0.03, 0.06], count: 8, speed: 0.35 },
      { type: "circle", size: [2, 4], opacity: [0.04, 0.08], count: 10, speed: 0.35 },
      { type: "path", d: routeDots, size: [15, 28], opacity: [0.03, 0.06], count: 5, speed: 0.3, blur: 1 },
    ],
    particles: { count: 18, speed: 0.25, sizeRange: [1, 2], opacity: 0.1, direction: "up" },
    animationSpeed: 0.9,
  }),
};

/** Get theme for a product slug with fallback */
export function getProductBgTheme(slug: string): ProductBgTheme {
  return PRODUCT_BG_THEMES[slug] ?? base({});
}
