import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Gauge, Weight } from "lucide-react";

const PRODUCTS = Array.from({ length: 8 }, (_, i) => ({
  name: `Modelo ${String.fromCharCode(65 + i)}`,
  category: ["Scooter", "Bike Elétrica", "Autopropelido", "Triciclo", "Utilitário"][i % 5],
  autonomy: `${30 + i * 10}km`,
  speed: `${25 + i * 5}km/h`,
  weight: `${80 + i * 10}kg`,
}));

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ProductCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scroll = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  return (
    <section className="relative bg-foreground py-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          {/* Header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-4"
                style={{
                  background: "hsl(11 81% 57% / 0.12)",
                  color: "hsl(11 81% 57%)",
                  border: "1px solid hsl(11 81% 57% / 0.25)",
                }}
              >
                Catálogo
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-primary-foreground uppercase tracking-tight leading-[1]">
                Nossos <span className="gradient-text">Modelos</span>
              </h2>
              <p className="text-primary-foreground/40 text-base mt-3 max-w-md">
                Explore a linha completa de veículos elétricos para cada estilo de vida.
              </p>
            </div>

            {/* Nav arrows */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll(-1)}
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-primary-foreground/40 hover:text-primary-foreground transition-colors"
                style={{ background: "hsl(0 0% 100% / 0.05)", border: "1px solid hsl(0 0% 100% / 0.08)" }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll(1)}
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-primary-foreground/40 hover:text-primary-foreground transition-colors"
                style={{ background: "hsl(0 0% 100% / 0.05)", border: "1px solid hsl(0 0% 100% / 0.08)" }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          >
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={i}
                className="shrink-0 w-[300px] rounded-2xl overflow-hidden group snap-start"
                style={{
                  background: "hsl(0 0% 11% / 0.8)",
                  border: "1px solid hsl(0 0% 100% / 0.08)",
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image placeholder */}
                <div className="relative h-48 bg-foreground/50 flex items-center justify-center overflow-hidden">
                  <span className="text-primary-foreground/20 text-xs uppercase tracking-widest">Imagem do produto</span>
                  {/* Category badge */}
                  <span
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em]"
                    style={{
                      background: "hsl(11 81% 57% / 0.15)",
                      color: "hsl(11 81% 57%)",
                      border: "1px solid hsl(11 81% 57% / 0.25)",
                    }}
                  >
                    {product.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-primary-foreground mb-3 uppercase tracking-wide">
                    {product.name}
                  </h3>

                  {/* Specs */}
                  <div className="flex items-center gap-3 mb-4">
                    {[
                      { icon: Zap, value: product.autonomy, label: "Autonomia" },
                      { icon: Gauge, value: product.speed, label: "Vel. máx." },
                      { icon: Weight, value: product.weight, label: "Carga" },
                    ].map((spec, j) => (
                      <div key={j} className="flex-1 text-center">
                        <spec.icon className="w-3.5 h-3.5 mx-auto mb-1" style={{ color: "hsl(11 81% 57%)" }} />
                        <p className="text-xs font-bold text-primary-foreground/80">{spec.value}</p>
                        <p className="text-[9px] text-primary-foreground/30 uppercase tracking-wider">{spec.label}</p>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground/70 hover:text-primary transition-colors"
                    style={{ border: "1px solid hsl(0 0% 100% / 0.1)" }}
                  >
                    Saiba mais
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-6 mx-auto max-w-xs h-[2px] rounded-full overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.08)" }}>
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${Math.max(10, scrollProgress * 100)}%`,
                background: "linear-gradient(90deg, hsl(11 81% 57%), hsl(11 90% 65%))",
              }}
            />
          </div>

          {/* Secondary CTA */}
          <div className="mt-10 text-center">
            <a
              href="#modelos"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground/50 hover:text-primary transition-colors"
            >
              Ver todos os modelos e comparar
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCarousel;
