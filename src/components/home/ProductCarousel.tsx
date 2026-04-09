import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Zap,
  Gauge,
  Weight,
} from "lucide-react";


import modelTour3k from "@/assets/models/model-tour-3k.webp";
import modelBliss from "@/assets/models/model-bliss-new.webp";
import modelNewHoliday from "@/assets/models/model-new-holiday.webp";
import modelRhino from "@/assets/models/model-rhino-new.webp";
import modelBike400 from "@/assets/models/model-bike-400.webp";
import modelSantaMonica from "@/assets/models/model-santa-monica-new.webp";
import modelTricycle from "@/assets/models/model-tricycle-new.webp";
import modelBigSur from "@/assets/models/model-big-sur-new.webp";
import modelLibertyUltra from "@/assets/models/model-liberty-ultra.webp";

interface Product {
  name: string;
  slug: string;
  category: string;
  image: string;
  autonomy: string;
  speed: string;
  load: string;
  price: string;
}

const PRODUCTS: Product[] = [
  
  { name: "Tour 3K", slug: "tour-3k", category: "Scooters Elétricas", image: modelTour3k, autonomy: "40km", speed: "75km/h", load: "120kg", price: "R$ 16.990" },
  { name: "New Holiday", slug: "new-holiday", category: "Scooters Elétricas", image: modelNewHoliday, autonomy: "50km", speed: "50km/h", load: "150kg", price: "R$ 15.990" },
  { name: "Bliss", slug: "bliss", category: "Autopropelidos", image: modelBliss, autonomy: "70km", speed: "32km/h", load: "150kg", price: "R$ 15.990" },
  { name: "Rhino Delivery", slug: "rhino-delivery", category: "Utilitários", image: modelRhino, autonomy: "75km", speed: "65km/h", load: "150kg", price: "R$ 18.990" },
  { name: "Liberty Ultra", slug: "liberty-ultra", category: "Autopropelidos", image: modelLibertyUltra, autonomy: "70km", speed: "32km/h", load: "150kg", price: "R$ 12.990" },
  { name: "Santa Monica", slug: "santa-monica", category: "Bicicletas Elétricas", image: modelSantaMonica, autonomy: "60km", speed: "32km/h", load: "150kg", price: "Consulte" },
  { name: "Bike 400+", slug: "bike-400", category: "Autopropelidos", image: modelBike400, autonomy: "50km", speed: "32km/h", load: "100kg", price: "R$ 10.990" },
  { name: "Big Sur", slug: "big-sur", category: "Bicicletas Elétricas", image: modelBigSur, autonomy: "60km", speed: "32km/h", load: "150kg", price: "Consulte" },
  { name: "Triciclo Elétrico", slug: "triciclo-eletrico", category: "Triciclos Elétricos", image: modelTricycle, autonomy: "60km", speed: "32km/h", load: "150kg", price: "R$ 15.990" },
];

const SPECS = [
  { icon: Zap, key: "autonomy" as const, label: "AUTONOMIA" },
  { icon: Gauge, key: "speed" as const, label: "VEL. MÁX." },
  { icon: Weight, key: "load" as const, label: "CARGA" },
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
    <section id="modelos" className="relative py-14 md:py-20 overflow-hidden">
      {/* ── Section-specific effect: speed lines / motion trails ── */}
      {[15, 35, 55, 75, 90].map((top, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none h-[1px]"
          style={{
            top: `${top}%`,
            left: 0,
            right: 0,
            background: `linear-gradient(90deg, transparent, hsl(var(--primary) / ${0.04 + i * 0.01}), transparent)`,
          }}
          initial={{ scaleX: 0, originX: i % 2 === 0 ? 0 : 1 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 1.2, ease: "easeOut" }}
        />
      ))}

      {/* Speedometer-like arc glow */}
      <div
        className="absolute -right-32 top-1/4 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "conic-gradient(from 180deg, transparent, hsl(var(--primary) / 0.04), transparent)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />

      <div className="container mx-auto px-4 relative">
        {/* ── Header ── */}
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

            <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
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
              Um portfólio pensado para diferentes rotinas, estilos de vida e objetivos. Da mobilidade urbana ao uso profissional, a MS Eletric reúne soluções elétricas que combinam praticidade, economia e tecnologia no dia a dia.
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
        <div className="relative overflow-x-clip">
          {/* Mobile arrows */}
          <button
            onClick={() => scroll(-1)}
            className={`absolute left-1 top-1/2 -translate-y-1/2 z-20 md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-opacity ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{ background: "hsl(var(--primary) / 0.15)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid hsl(var(--primary) / 0.25)", boxShadow: "0 4px 12px hsl(0 0% 0% / 0.3)" }}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4 text-primary" />
          </button>
          <button
            onClick={() => scroll(1)}
            className={`absolute right-1 top-1/2 -translate-y-1/2 z-20 md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-opacity ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{ background: "hsl(var(--primary) / 0.15)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid hsl(var(--primary) / 0.25)", boxShadow: "0 4px 12px hsl(0 0% 0% / 0.3)" }}
            aria-label="Próximo"
          >
            <ChevronRight className="w-4 h-4 text-primary" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide"
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
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ opacity: { delay: i * 0.06, duration: 0.5 } }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="group shrink-0 snap-start"
                  style={{ width: "clamp(260px, 38vw, 290px)" }}
                >
                  <div
                    className="h-full rounded-xl overflow-hidden transition-all duration-300 relative"
                    style={{
                      background: "hsl(0 0% 100% / 0.025)",
                      border: `1px solid ${isHovered ? "hsl(var(--primary) / 0.25)" : "hsl(0 0% 100% / 0.06)"}`,
                    }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-500 z-[1]"
                      style={{
                        background: "radial-gradient(ellipse at 30% 20%, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
                        opacity: isHovered ? 1 : 0,
                      }}
                    />

                    <div
                      className="absolute top-0 left-2 right-2 h-[2px] rounded-full transition-all duration-500 z-[2]"
                      style={{
                        background: `linear-gradient(90deg, transparent, hsl(var(--primary) / ${isHovered ? 0.7 : 0.05}), transparent)`,
                      }}
                    />

                    {/* Image area */}
                    <div className="relative h-44 bg-white flex items-center justify-center overflow-hidden rounded-t-xl p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span
                        className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider text-primary"
                        style={{
                          background: "hsl(var(--primary) / 0.12)",
                          border: "1px solid hsl(var(--primary) / 0.2)",
                        }}
                      >
                        {product.category}
                      </span>
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

                      <div
                        className="h-px mb-4 transition-all duration-500"
                        style={{
                          background: `linear-gradient(90deg, hsl(var(--primary) / ${isHovered ? 0.4 : 0.1}), transparent)`,
                          width: isHovered ? "80%" : "40%",
                        }}
                      />

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

                      <a
                        href={`/modelos/${product.slug}`}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-all duration-200"
                        style={{
                          background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                          boxShadow: "0 4px 14px hsl(var(--primary) / 0.25)",
                        }}
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
            className="relative rounded-2xl px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{
              background: "hsl(0 0% 100% / 0.025)",
              border: "1px solid hsl(0 0% 100% / 0.06)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 60% 50%, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)",
              }}
            />

            <div className="relative text-center md:text-left">
              <h3 className="font-display font-bold text-lg md:text-xl text-primary-foreground uppercase tracking-wide mb-1">
                Ainda em dúvida?{" "}
                <span className="text-primary">Compare modelos lado a lado</span>
              </h3>
              <p className="text-sm text-primary-foreground/40 max-w-md">
                Visualize especificações, diferenciais e aplicações de forma simples para entender qual modelo combina melhor com a sua necessidade.
              </p>
            </div>

            <a
              href="/modelos"
              className="relative shrink-0 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 rounded-xl text-primary-foreground cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                boxShadow: "0 4px 20px hsl(var(--primary) / 0.3)",
              }}
            >
              Comparar modelos
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCarousel;
