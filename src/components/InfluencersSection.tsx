import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const influencers = [
  { name: "Lucas Moreira", use: "Uso urbano diário", placeholder: true },
  { name: "Ana Costa", use: "Entregas sustentáveis", placeholder: true },
  { name: "Roberto Lima", use: "Lazer e trilhas", placeholder: true },
  { name: "Carla Santos", use: "Mobilidade no trabalho", placeholder: true },
  { name: "Pedro Alves", use: "Uso familiar", placeholder: true },
];

const InfluencersSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-black text-3xl md:text-4xl mb-3">
            Avaliações de quem <span className="text-primary">testou na prática.</span>
          </h2>
        </motion.div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm rounded-full p-2 border border-border shadow-md"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm rounded-full p-2 border border-border shadow-md"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 px-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {influencers.map((inf, i) => (
              <motion.div
                key={inf.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="min-w-[300px] snap-start bg-background rounded-2xl border border-border overflow-hidden shadow-sm"
              >
                {/* Video placeholder */}
                <div className="relative aspect-video bg-muted flex items-center justify-center">
                  <div className="w-14 h-14 bg-foreground/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-foreground transition-colors">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-display font-bold text-base">{inf.name}</p>
                  <p className="text-sm text-muted-foreground mb-3">{inf.use}</p>
                  <Button variant="outline" size="sm" className="rounded-xl text-xs">
                    Ver modelos citados
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

export default InfluencersSection;
