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
  highlight?: boolean;
}

const PRODUCTS: Product[] = [
  { name: "S3K", category: "Scooter", image: modelS3k, autonomy: "85km", speed: "80km/h", load: "120kg", price: "R$ 19.990", highlight: true },
  { name: "Tour 3K", category: "Scooter", image: modelTour3k, autonomy: "40km", speed: "75km/h", load: "120kg", price: "R$ 16.990" },
  { name: "New Holiday", category: "Scooter", image: modelNewHoliday, autonomy: "50km", speed: "50km/h", load: "150kg", price: "R$ 15.990" },
  { name: "Bliss", category: "Autopropelido", image: modelBliss, autonomy: "70km", speed: "32km/h", load: "150kg", price: "R$ 15.990" },
  { name: "Rhino Delivery", category: "Utilitário", image: modelRhino, autonomy: "75km", speed: "65km/h", load: "150kg", price: "R$ 18.990", highlight: true },
  { name: "Liberty Ultra", category: "Autopropelido", image: modelLibertyUltra, autonomy: "70km", speed: "32km/h", load: "150kg", price: "R$ 12.990" },
  { name: "Santa Monica", category: "Bike Elétrica", image: modelSantaMonica, autonomy: "60km", speed: "32km/h", load: "150kg", price: "Consulte" },
  { name: "Bike 400+", category: "Autopropelido", image: modelBike400, autonomy: "50km", speed: "32km/h", load: "100kg", price: "R$ 10.990" },
  { name: "Big Sur", category: "Bike Elétrica", image: modelBigSur, autonomy: "60km", speed: "32km/h", load: "150kg", price: "Consulte" },
  { name: "Triciclo Elétrico", category: "Triciclo", image: modelTricycle, autonomy: "60km", speed: "32km/h", load: "150kg", price: "R$ 15.990" },
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
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: "hsl(0 0% 3%)" }}
    >
      {/* ── Background layers ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute -top-32 left-[20%] w-[800px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 65%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute bottom-0 right-[10%] w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.04) 0%, transparent 60%)",
          filter: "blur(90px)",
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3) 30%, hsl(var(--primary) / 0.3) 70%, transparent)" }}
      />

      <div className="container mx-auto px-4 relative">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
                Catálogo completo
              </span>
            </div>

            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-[3.5rem] uppercase tracking-tight leading-[0.92]"
              style={{ color: "hsl(0 0% 95%)" }}
            >
              Nossos{" "}
              <span className="text-primary">Modelos</span>
            </h2>

            <p className="text-sm md:text-[15px] leading-relaxed mt-4 max-w-lg"
              style={{ color: "hsl(0 0% 95% / 0.4)" }}
            >
              Mais de 19 veículos 100% elétricos projetados para cada perfil de uso. Encontre o seu.
            </p>
          </motion.div>

          {/* Nav arrows */}
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
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
                style={{
                  background: can ? "hsl(var(--primary))" : "hsl(0 0% 100% / 0.04)",
                  border: `1px solid ${can ? "hsl(var(--primary) / 0.5)" : "hsl(0 0% 100% / 0.06)"}`,
                  opacity: can ? 1 : 0.35,
                }}
                aria-label={label}
              >
                <Icon className="w-5 h-5" style={{ color: can ? "hsl(0 0% 100%)" : "hsl(0 0% 100% / 0.5)" }} />
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Carousel ── */}
        <div className="relative">
          {/* Fade edges */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, hsl(0 0% 3%), transparent)" }}
            />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, hsl(0 0% 3%), transparent)" }}
            />
          )}

          {/* Mobile arrows */}
          <button
            onClick={() => scroll(-1)}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-opacity ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{ background: "hsl(0 0% 8% / 0.9)", border: "1px solid hsl(0 0% 100% / 0.1)" }}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" style={{ color: "hsl(0 0% 90%)" }} />
          </button>
          <button
            onClick={() => scroll(1)}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-opacity ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{ background: "hsl(0 0% 8% / 0.9)", border: "1px solid hsl(0 0% 100% / 0.1)" }}
            aria-label="Próximo"
          >
            <ChevronRight className="w-4 h-4" style={{ color: "hsl(0 0% 90%)" }} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {PRODUCTS.map((product, i) => (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className="group shrink-0 snap-start flex flex-col"
                style={{ width: "clamp(260px, 36vw, 280px)" }}
              >
                <div
                  className="flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.15)]"
                  style={{
                    background: "hsl(0 0% 6%)",
                    border: "1px solid hsl(0 0% 100% / 0.06)",
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden"
                    style={{ background: "hsl(0 0% 96%)" }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-[85%] max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Category pill */}
                    <span
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest"
                      style={{
                        background: "hsl(var(--primary) / 0.15)",
                        color: "hsl(var(--primary))",
                        border: "1px solid hsl(var(--primary) / 0.25)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {product.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* Name + price */}
                    <div className="flex items-baseline justify-between mb-4">
                      <h3 className="font-display font-bold text-[15px] uppercase tracking-wide"
                        style={{ color: "hsl(0 0% 92%)" }}
                      >
                        {product.name}
                      </h3>
                      <span className="text-xs font-bold text-primary tabular-nums">
                        {product.price}
                      </span>
                    </div>

                    {/* Specs */}
                    <div
                      className="flex items-stretch rounded-xl py-3 mb-5"
                      style={{
                        background: "hsl(0 0% 100% / 0.03)",
                        border: "1px solid hsl(0 0% 100% / 0.05)",
                      }}
                    >
                      {SPECS.map((spec, j) => (
                        <div key={spec.key} className="flex-1 text-center relative">
                          {j > 0 && (
                            <div
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-6"
                              style={{ background: "hsl(0 0% 100% / 0.07)" }}
                            />
                          )}
                          <spec.icon className="w-3.5 h-3.5 mx-auto mb-1 text-primary opacity-70" />
                          <p className="text-[12px] font-bold tabular-nums"
                            style={{ color: "hsl(0 0% 85%)" }}
                          >
                            {product[spec.key]}
                          </p>
                          <p className="text-[8px] uppercase tracking-[0.1em] mt-0.5"
                            style={{ color: "hsl(0 0% 100% / 0.25)" }}
                          >
                            {spec.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <a
                      href="#contato"
                      className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground"
                      style={{
                        color: "hsl(0 0% 100% / 0.45)",
                        border: "1px solid hsl(0 0% 100% / 0.08)",
                      }}
                    >
                      Saiba mais
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className="mt-10 flex flex-col items-center gap-5">
          <div
            className="w-40 h-[2px] rounded-full overflow-hidden"
            style={{ background: "hsl(0 0% 100% / 0.06)" }}
          >
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>

          <a
            href="#modelos"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/50 hover:text-primary transition-colors duration-200"
          >
            Ver todos os modelos e comparar
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
