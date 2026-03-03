import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef } from "react";

const influencers = [
  { name: "Lucas Moreira", use: "Uso urbano diário", stars: 5, quote: "Economizo mais de R$ 300/mês com a scooter elétrica." },
  { name: "Ana Costa", use: "Entregas sustentáveis", stars: 5, quote: "Atendimento consultivo que realmente faz diferença." },
  { name: "Roberto Lima", use: "Lazer e trilhas", stars: 4, quote: "Motocross elétrico é uma experiência única." },
  { name: "Carla Santos", use: "Mobilidade no trabalho", stars: 5, quote: "Praticidade e economia no dia a dia." },
  { name: "Pedro Alves", use: "Uso familiar", stars: 5, quote: "Triciclo seguro e confortável para toda família." },
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
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4"
          >
            Depoimentos
          </motion.span>
          <h2 className="font-display font-black text-3xl md:text-4xl mb-3">
            Avaliações de quem <span className="text-primary">testou na prática.</span>
          </h2>
        </motion.div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm rounded-full p-2.5 border border-border shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm rounded-full p-2.5 border border-border shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
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
                whileHover={{ y: -4 }}
                className="min-w-[320px] snap-start bg-background rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Video placeholder */}
                <div className="relative aspect-video bg-gradient-to-br from-foreground/90 to-foreground/70 flex items-center justify-center group cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg glow-primary"
                  >
                    <Play className="w-7 h-7 text-primary-foreground ml-1" />
                  </motion.div>
                </div>
                <div className="p-6">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${s < inf.stars ? "text-primary fill-primary" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-foreground italic mb-4">"{inf.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-display font-bold text-primary text-sm">
                        {inf.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm">{inf.name}</p>
                      <p className="text-xs text-muted-foreground">{inf.use}</p>
                    </div>
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

export default InfluencersSection;
