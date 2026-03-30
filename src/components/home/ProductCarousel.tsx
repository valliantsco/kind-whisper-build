import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Gauge, Weight } from "lucide-react";

// Real MS Eletric catalog
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

const PRODUCTS = [
  { name: "S3K", category: "Scooter", image: modelS3k, autonomy: "85km", speed: "80km/h", load: "120kg", price: "R$ 19.990" },
  { name: "Tour 3K", category: "Scooter", image: modelTour3k, autonomy: "40km", speed: "75km/h", load: "120kg", price: "R$ 16.990" },
  { name: "New Holiday", category: "Scooter", image: modelNewHoliday, autonomy: "50km", speed: "50km/h", load: "150kg", price: "R$ 15.990" },
  { name: "Bliss", category: "Autopropelido", image: modelBliss, autonomy: "70km", speed: "32km/h", load: "150kg", price: "R$ 15.990" },
  { name: "Rhino Delivery", category: "Utilitário", image: modelRhino, autonomy: "75km", speed: "65km/h", load: "150kg", price: "R$ 18.990" },
  { name: "Liberty Ultra", category: "Autopropelido", image: modelLibertyUltra, autonomy: "70km", speed: "32km/h", load: "150kg", price: "R$ 12.990" },
  { name: "Santa Monica", category: "Bike Elétrica", image: modelSantaMonica, autonomy: "60km", speed: "32km/h", load: "150kg", price: "Consulte" },
  { name: "Bike 400+", category: "Autopropelido", image: modelBike400, autonomy: "50km", speed: "32km/h", load: "100kg", price: "R$ 10.990" },
  { name: "Big Sur", category: "Bike Elétrica", image: modelBigSur, autonomy: "60km", speed: "32km/h", load: "150kg", price: "Consulte" },
  { name: "Triciclo Elétrico", category: "Triciclo", image: modelTricycle, autonomy: "60km", speed: "32km/h", load: "150kg", price: "R$ 15.990" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
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
    <section id="modelos" className="relative bg-foreground py-28 overflow-hidden">
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
                Catálogo Completo
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-primary-foreground uppercase tracking-tight leading-[1]">
                Nossos <span className="gradient-text">Modelos</span>
              </h2>
              <p className="text-primary-foreground/40 text-base mt-3 max-w-md">
                Mais de 19 modelos de veículos 100% elétricos para cada necessidade.
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
                {/* Product image */}
                <div className="relative h-48 bg-white flex items-center justify-center overflow-hidden p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
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
                  <h3 className="font-display font-bold text-lg text-primary-foreground mb-1 uppercase tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-xs font-semibold mb-3" style={{ color: "hsl(11 81% 57%)" }}>
                    {product.price}
                  </p>

                  {/* Specs */}
                  <div className="flex items-center gap-3 mb-4">
                    {[
                      { icon: Zap, value: product.autonomy, label: "Autonomia" },
                      { icon: Gauge, value: product.speed, label: "Vel. máx." },
                      { icon: Weight, value: product.load, label: "Carga" },
                    ].map((spec, j) => (
                      <div key={j} className="flex-1 text-center">
                        <spec.icon className="w-3.5 h-3.5 mx-auto mb-1" style={{ color: "hsl(11 81% 57%)" }} />
                        <p className="text-xs font-bold text-primary-foreground/80">{spec.value}</p>
                        <p className="text-[9px] text-primary-foreground/30 uppercase tracking-wider">{spec.label}</p>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contato"
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
