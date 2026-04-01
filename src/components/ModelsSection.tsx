import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bike, Zap, Shield, Package, Mountain, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import categoryScooter from "@/assets/category-scooter.webp";
import categoryBike from "@/assets/category-bike.webp";
import categoryTricycle from "@/assets/category-tricycle.webp";
import categoryAutopropelido from "@/assets/category-autopropelido.webp";
import categoryMotocross from "@/assets/category-motocross.webp";

const categories = [
  {
    icon: Zap,
    title: "Motos & Scooters",
    subtitle: "Cidade / Rotina",
    ideal: "Rotina urbana e deslocamentos diários",
    benefit: "Praticidade + economia",
    cta: "Ver modelos urbanos",
    image: categoryScooter,
  },
  {
    icon: Bike,
    title: "Bike Elétrica",
    subtitle: "Mobilidade leve",
    ideal: "Trajetos curtos e lazer",
    benefit: "Leveza e flexibilidade",
    cta: "Ver bikes elétricas",
    image: categoryBike,
  },
  {
    icon: Shield,
    title: "Triciclos",
    subtitle: "Conforto / Estabilidade",
    ideal: "Mais estabilidade e conforto",
    benefit: "Segurança e condução firme",
    cta: "Ver triciclos",
    image: categoryTricycle,
  },
  {
    icon: Package,
    title: "Autopropelidos",
    subtitle: "Praticidade",
    ideal: "Deslocamentos pontuais",
    benefit: "Simples e funcional",
    cta: "Ver autopropelidos",
    image: categoryAutopropelido,
  },
  {
    icon: Mountain,
    title: "Motocross",
    subtitle: "Lazer / Off-road",
    ideal: "Diversão e trilha",
    benefit: "Experiência recreativa elétrica",
    cta: "Ver motocross",
    image: categoryMotocross,
  },
];

const ModelsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  };

  return (
    <section id="modelos" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4"
          >
            Catálogo
          </motion.span>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-4">
            Escolha pelo seu uso.{" "}
            <span className="text-primary">A gente te mostra o caminho.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Selecione uma categoria e veja opções ideais para cidade, trabalho, lazer e necessidades específicas.
          </p>
        </motion.div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden bg-card/90 backdrop-blur-sm rounded-full p-2 border border-border shadow-md transition-opacity ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 md:hidden bg-card/90 backdrop-blur-sm rounded-full p-2 border border-border shadow-md transition-opacity ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="min-w-[280px] md:min-w-0 snap-start bg-card rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
              >
                {/* Real image */}
                <div className="w-full aspect-[4/3] overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3">
                    <div className="w-9 h-9 bg-card/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <cat.icon className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-lg mb-1">{cat.title}</h3>
                  <p className="text-sm text-primary font-semibold mb-3">{cat.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-1">
                    <span className="font-medium text-foreground">Ideal para:</span> {cat.ideal}
                  </p>
                  <p className="text-sm text-muted-foreground mb-5">
                    <span className="font-medium text-foreground">Benefício:</span> {cat.benefit}
                  </p>
                  <div className="mt-auto">
                    <Button variant="outline" size="sm" className="w-full rounded-xl group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors gap-2">
                      {cat.cta}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelsSection;
