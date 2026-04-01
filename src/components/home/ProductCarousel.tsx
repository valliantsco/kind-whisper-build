import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Zap,
  Gauge,
  Weight,
  Sparkles,
} from "lucide-react";

import modelS3k from "@/assets/models/model-s3k.png";
import modelTour3k from "@/assets/models/model-tour-3k.png";
import modelBliss from "@/assets/models/model-bliss-new.png";
import modelNewHoliday from "@/assets/models/model-new-holiday.png";
import modelRhino from "@/assets/models/model-rhino-new.png";
import modelBike400 from "@/assets/models/model-bike-400.png";
import modelSantaMonica from "@/assets/models/model-santa-monica-new.png";
import modelTricycle from "@/assets/models/model-tricycle-new.png";
import modelBigSur from "@/assets/models/model-big-sur-new.png";
import modelLibertyUltra from "@/assets/models/model-liberty-ultra.png";

interface Product {
  name: string;
  category: string;
  image: string;
  autonomy: string;
  speed: string;
  load: string;
  price: string;
}

const PRODUCTS: Product[] = [
  { name: "S3K", category: "Scooters Elétricas", image: modelS3k, autonomy: "85km", speed: "80km/h", load: "120kg", price: "R$ 19.990" },
  { name: "Tour 3K", category: "Scooters Elétricas", image: modelTour3k, autonomy: "40km", speed: "75km/h", load: "120kg", price: "R$ 16.990" },
  { name: "New Holiday", category: "Scooters Elétricas", image: modelNewHoliday, autonomy: "50km", speed: "50km/h", load: "150kg", price: "R$ 15.990" },
  { name: "Bliss", category: "Autopropelidos", image: modelBliss, autonomy: "70km", speed: "32km/h", load: "150kg", price: "R$ 15.990" },
  { name: "Rhino Delivery", category: "Utilitários", image: modelRhino, autonomy: "75km", speed: "65km/h", load: "150kg", price: "R$ 18.990" },
  { name: "Liberty Ultra", category: "Autopropelidos", image: modelLibertyUltra, autonomy: "70km", speed: "32km/h", load: "150kg", price: "R$ 12.990" },
  { name: "Santa Monica", category: "Bicicletas Elétricas", image: modelSantaMonica, autonomy: "60km", speed: "32km/h", load: "150kg", price: "Consulte" },
  { name: "Bike 400+", category: "Autopropelidos", image: modelBike400, autonomy: "50km", speed: "32km/h", load: "100kg", price: "R$ 10.990" },
  { name: "Big Sur", category: "Bicicletas Elétricas", image: modelBigSur, autonomy: "60km", speed: "32km/h", load: "150kg", price: "Consulte" },
  { name: "Triciclo Elétrico", category: "Triciclos Elétricos", image: modelTricycle, autonomy: "60km", speed: "32km/h", load: "150kg", price: "R$ 15.990" },
];

const SPECS = [
  { icon: Zap, key: "autonomy" as const, label: "AUTONOMIA" },
  { icon: Gauge, key: "speed" as const, label: "VEL. MÁX." },
  { icon: Weight, key: "load" as const, label: "CARGA" },
];

const FLOATING_ELEMENTS = [
  { top: "6%", right: "8%", size: 14, delay: 0.3, opacity: 0.2 },
  { top: "50%", left: "3%", size: 16, delay: 1.8, opacity: 0.18 },
  { top: "85%", right: "5%", size: 12, delay: 2.5, opacity: 0.22 },
];

const ProductCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const updateScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < max - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScroll();
    el.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      el.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [updateScroll]);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section
      id="modelos"
      className="relative py-14 md:py-20 overflow-hidden"
      style={{ background: "hsl(0 0% 4%)" }}
    >
      {/* ── Layered background (matching WhyChoose) ── */}
      <div
        className="absolute -top-20 right-[10%] w-[1000px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.05) 0%, transparent 55%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.03) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Diagonal gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(160deg, hsl(0 0% 100% / 0.015) 0%, transparent 35%, hsl(var(--primary) / 0.025) 100%)",
        }}
      />
      {/* Top-left accent line */}
      <div
        className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[3px]"
        style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.6), transparent)" }}
      />
      {/* Bottom-right accent line */}
      <div
        className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[3px]"
        style={{ background: "linear-gradient(270deg, hsl(var(--primary) / 0.6), transparent)" }}
      />

      {/* ── Floating animated elements (matching WhyChoose) ── */}
      {FLOATING_ELEMENTS.map((el, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: el.top,
            left: (el as any).left,
            right: (el as any).right,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [el.opacity, el.opacity * 1.6, el.opacity],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        >
          {i % 2 === 0 ? (
            <Sparkles className="text-primary" style={{ width: el.size, height: el.size }} />
          ) : (
            <Zap className="text-primary" style={{ width: el.size, height: el.size }} />
          )}
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative">
        {/* ── Header (matching WhyChoose) ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
                Catálogo completo
              </span>
            </div>

            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
              Nossos{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                }}
              >
                Modelos
              </span>
            </h2>

            <p className="text-sm md:text-base text-primary-foreground/45 leading-relaxed mt-4 max-w-lg">
              Mais de 19 veículos 100% elétricos projetados para cada perfil de uso. Encontre o seu.
            </p>
          </motion.div>

          {/* Navigation arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex items-center gap-2"
          >
            {[
              { dir: -1, can: canScrollLeft, label: "Anterior", Icon: ChevronLeft },
              { dir: 1, can: canScrollRight, label: "Próximo", Icon: ChevronRight },
            ].map(({ dir, can, label, Icon }) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
                style={{
                  background: can
                    ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))"
                    : "hsl(0 0% 100% / 0.05)",
                  border: `1px solid ${can ? "hsl(var(--primary) / 0.4)" : "hsl(0 0% 100% / 0.08)"}`,
                  boxShadow: can ? "0 4px 14px hsl(var(--primary) / 0.3)" : "none",
                  opacity: can ? 1 : 0.4,
                }}
                aria-label={label}
              >
                <Icon className="w-5 h-5 text-primary-foreground" />
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Carousel ── */}
        <div className="relative">
          {/* Mobile arrows */}
          <button
            onClick={() => scroll(-1)}
            className={`absolute left-1 top-1/2 -translate-y-1/2 z-20 md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-opacity ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{ background: "hsl(0 0% 100% / 0.08)", border: "1px solid hsl(0 0% 100% / 0.1)" }}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4 text-primary-foreground" />
          </button>
          <button
            onClick={() => scroll(1)}
            className={`absolute right-1 top-1/2 -translate-y-1/2 z-20 md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-opacity ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{ background: "hsl(0 0% 100% / 0.08)", border: "1px solid hsl(0 0% 100% / 0.1)" }}
            aria-label="Próximo"
          >
            <ChevronRight className="w-4 h-4 text-primary-foreground" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              maskImage: `linear-gradient(to right, ${canScrollLeft ? "transparent" : "black"} 0%, black ${canScrollLeft ? "6%" : "0%"}, black ${canScrollRight ? "90%" : "100%"}, ${canScrollRight ? "transparent" : "black"} 100%)`,
              WebkitMaskImage: `linear-gradient(to right, ${canScrollLeft ? "transparent" : "black"} 0%, black ${canScrollLeft ? "6%" : "0%"}, black ${canScrollRight ? "90%" : "100%"}, ${canScrollRight ? "transparent" : "black"} 100%)`,
            }}
          >
            {PRODUCTS.map((product, i) => {
              const isHovered = hoveredIdx === i;
              return (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="group shrink-0 snap-start"
                  style={{ width: "clamp(260px, 38vw, 290px)" }}
                >
                  <div
                    className="h-full rounded-xl transition-all duration-300 relative"
                    style={{
                      background: "hsl(0 0% 100% / 0.025)",
                      border: `1px solid ${isHovered ? "hsl(var(--primary) / 0.25)" : "hsl(0 0% 100% / 0.06)"}`,
                      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                      boxShadow: isHovered
                        ? "0 20px 50px -15px hsl(var(--primary) / 0.15), inset 0 -1px 0 hsl(var(--primary) / 0.15)"
                        : "none",
                    }}
                  >
                    {/* Hover glow overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-500 z-[1]"
                      style={{
                        background: "radial-gradient(ellipse at 30% 20%, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
                        opacity: isHovered ? 1 : 0,
                      }}
                    />

                    {/* Top accent line — outside overflow-hidden area */}
                    <div
                      className="absolute top-0 left-2 right-2 h-[2px] rounded-full transition-all duration-500 z-[2]"
                      style={{
                        background: `linear-gradient(90deg, transparent, hsl(var(--primary) / ${isHovered ? 0.7 : 0.05}), transparent)`,
                      }}
                    />

                    {/* Image area */}
                    <div className="relative h-44 bg-white flex items-center justify-center overflow-hidden rounded-t-[11px] p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Category badge */}
                      <span
                        className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider text-primary"
                        style={{
                          background: "hsl(var(--primary) / 0.12)",
                          border: "1px solid hsl(var(--primary) / 0.2)",
                        }}
                      >
                        {product.category}
                      </span>
                      {/* Bottom gradient fade — matches card dark bg */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                        style={{ background: "linear-gradient(to top, hsl(0 0% 5% / 0.95), transparent)" }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 pt-4 relative">
                      <div className="flex items-baseline justify-between mb-3">
                        <h3 className="font-display font-bold text-[13px] text-primary-foreground/85 uppercase tracking-[0.12em]">
                          {product.name}
                        </h3>
                        <span
                          className="font-display font-black text-sm bg-clip-text text-transparent"
                          style={{
                            backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                          }}
                        >
                          {product.price}
                        </span>
                      </div>

                      {/* Divider (matching WhyChoose) */}
                      <div
                        className="h-px mb-4 transition-all duration-500"
                        style={{
                          background: `linear-gradient(90deg, hsl(var(--primary) / ${isHovered ? 0.4 : 0.1}), transparent)`,
                          width: isHovered ? "80%" : "40%",
                        }}
                      />

                      {/* Specs row */}
                      <div
                        className="flex items-center gap-0 mb-4 py-3 rounded-lg"
                        style={{
                          background: "hsl(0 0% 100% / 0.03)",
                          border: "1px solid hsl(0 0% 100% / 0.04)",
                        }}
                      >
                        {SPECS.map((spec, j) => (
                          <div key={spec.key} className="flex-1 text-center relative">
                            {j > 0 && (
                              <div
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-5"
                                style={{ background: "hsl(0 0% 100% / 0.08)" }}
                              />
                            )}
                            <spec.icon className="w-3 h-3 mx-auto mb-1 text-primary" />
                            <p className="text-[11px] font-bold text-primary-foreground/80 tabular-nums">
                              {product[spec.key]}
                            </p>
                            <p className="text-[8px] text-primary-foreground/30 uppercase tracking-wider mt-0.5">
                              {spec.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* CTA (matching WhyChoose hover reveal) */}
                      <a
                        href="#contato"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground/50 hover:text-primary hover:border-primary/30 transition-all duration-200"
                        style={{ border: "1px solid hsl(0 0% 100% / 0.08)" }}
                      >
                        Saiba mais
                        <motion.span
                          initial={{ opacity: 0, x: -8 }}
                          animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </motion.span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── CTA Block ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-14 md:mt-16"
        >
          <div
            className="relative rounded-2xl overflow-hidden px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{
              background: "hsl(0 0% 100% / 0.025)",
              border: "1px solid hsl(0 0% 100% / 0.06)",
            }}
          >
            {/* Glow behind CTA */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 60% 50%, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
              }}
            />
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)",
              }}
            />

            <div className="relative text-center md:text-left">
              <h3 className="font-display font-bold text-lg md:text-xl text-primary-foreground uppercase tracking-wide mb-1">
                Ainda em dúvida?{" "}
                <span className="text-primary">Compare modelos lado a lado.</span>
              </h3>
              <p className="text-sm text-primary-foreground/40 max-w-md">
                Explore todos os veículos, filtre por categoria e compare especificações para escolher o ideal.
              </p>
            </div>

            <a
              href="#modelos"
              className="relative shrink-0 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 rounded-xl text-primary-foreground cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                boxShadow: "0 4px 20px hsl(var(--primary) / 0.3)",
              }}
            >
              Ver catálogo completo
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCarousel;
