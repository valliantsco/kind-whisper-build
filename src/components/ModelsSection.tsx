import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bike, Zap, Shield, Package, Mountain, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const categories = [
  {
    icon: Zap,
    title: "Motos & Scooters",
    subtitle: "Cidade / Rotina",
    ideal: "Rotina urbana e deslocamentos diários",
    benefit: "Praticidade + economia",
    cta: "Ver modelos urbanos",
    color: "bg-primary/10",
  },
  {
    icon: Bike,
    title: "Bike Elétrica",
    subtitle: "Mobilidade leve",
    ideal: "Trajetos curtos e lazer",
    benefit: "Leveza e flexibilidade",
    cta: "Ver bikes elétricas",
    color: "bg-blue-500/10",
  },
  {
    icon: Shield,
    title: "Triciclos",
    subtitle: "Conforto / Estabilidade",
    ideal: "Mais estabilidade e conforto",
    benefit: "Segurança e condução firme",
    cta: "Ver triciclos",
    color: "bg-emerald-500/10",
  },
  {
    icon: Package,
    title: "Autopropelidos",
    subtitle: "Praticidade",
    ideal: "Deslocamentos pontuais",
    benefit: "Simples e funcional",
    cta: "Ver autopropelidos",
    color: "bg-amber-500/10",
  },
  {
    icon: Mountain,
    title: "Motocross",
    subtitle: "Lazer / Off-road",
    ideal: "Diversão e trilha",
    benefit: "Experiência recreativa elétrica",
    cta: "Ver motocross",
    color: "bg-violet-500/10",
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
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-4">
            Escolha pelo seu uso.{" "}
            <span className="text-primary">A gente te mostra o caminho.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Selecione uma categoria e veja opções ideais para cidade, trabalho, lazer e necessidades específicas.
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll | Desktop: grid */}
        <div className="relative">
          {/* Scroll buttons (mobile) */}
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="min-w-[280px] md:min-w-0 snap-start bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all p-6 flex flex-col group cursor-pointer"
              >
                {/* Image placeholder */}
                <div className={`w-full aspect-[4/3] ${cat.color} rounded-xl mb-5 flex items-center justify-center`}>
                  <cat.icon className="w-12 h-12 text-foreground/30" />
                </div>
                <h3 className="font-display font-bold text-lg mb-1">{cat.title}</h3>
                <p className="text-sm text-primary font-semibold mb-3">{cat.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-1">
                  <span className="font-medium text-foreground">Ideal para:</span> {cat.ideal}
                </p>
                <p className="text-sm text-muted-foreground mb-5">
                  <span className="font-medium text-foreground">Benefício:</span> {cat.benefit}
                </p>
                <div className="mt-auto">
                  <Button variant="outline" size="sm" className="w-full rounded-xl group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                    {cat.cta}
                  </Button>
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
