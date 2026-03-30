import { motion } from "framer-motion";
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const TESTIMONIALS = [
  { name: "João P.", city: "Uberlândia, MG", text: "Comprei a S3K e estou impressionado com a autonomia. Faço 40km por dia e ainda sobra bateria. O atendimento da MS Eletric foi impecável.", stars: 5 },
  { name: "Maria S.", city: "Uberlândia, MG", text: "Minha Bike 400+ é perfeita para ir ao trabalho. Economizo muito com combustível e estacionamento. Super prática!", stars: 5 },
  { name: "Carlos M.", city: "Uberlândia, MG", text: "Uso o Rhino Delivery no trabalho e a economia é absurda. Bateria removível facilita muito. Recomendo demais.", stars: 5 },
  { name: "Ana L.", city: "Uberlândia, MG", text: "Comprei o triciclo para minha mãe e ela ama. Super estável e seguro. A assistência técnica é muito atenciosa.", stars: 5 },
  { name: "Roberto F.", city: "Uberlândia, MG", text: "A Tour 3K sobe ladeira como se fosse plano. Motor de 3000W faz toda diferença. Melhor investimento que fiz.", stars: 5 },
  { name: "Fernanda R.", city: "Uberlândia, MG", text: "Atendimento consultivo de verdade. Me ajudaram a escolher o modelo ideal com o quiz. Saí da loja com a Bliss e estou apaixonada!", stars: 5 },
];

const INFLUENCERS = [
  { name: "Lucas Moreira", use: "Uso urbano diário", stars: 5, quote: "Economizo mais de R$ 300/mês com a scooter elétrica." },
  { name: "Ana Costa", use: "Entregas sustentáveis", stars: 5, quote: "Atendimento consultivo que realmente faz diferença." },
  { name: "Roberto Lima", use: "Lazer e trilhas", stars: 4, quote: "Motocross elétrico é uma experiência única." },
  { name: "Carla Santos", use: "Mobilidade no trabalho", stars: 5, quote: "Praticidade e economia no dia a dia." },
  { name: "Pedro Alves", use: "Uso familiar", stars: 5, quote: "Triciclo seguro e confortável para toda família." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <>
      {/* ── SEÇÃO CLIENTES ── */}
      <section className="relative bg-foreground py-28 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.06), transparent)" }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.04) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-4 bg-primary/10 text-primary border border-primary/25">
              Depoimentos de Clientes
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-primary-foreground uppercase tracking-tight leading-[1]">
              Quem compra, <span className="gradient-text">recomenda</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl p-6 relative bg-card/80 border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-muted/20">
                    <span className="text-primary-foreground/30 text-xs font-bold">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary-foreground/90">{t.name}</p>
                    <p className="text-[11px] text-primary-foreground/30">{t.city}</p>
                  </div>
                </div>

                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }, (_, j) => (
                    <Star
                      key={j}
                      className={`w-3.5 h-3.5 ${j < t.stars ? "text-primary fill-primary" : "text-muted"}`}
                    />
                  ))}
                </div>

                <p className="text-sm text-primary-foreground/50 leading-relaxed">"{t.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEÇÃO INFLUENCERS ── */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-4 bg-primary/10 text-primary border border-primary/25">
              Influenciadores
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-3 uppercase tracking-tight leading-[1]">
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
              {INFLUENCERS.map((inf, i) => (
                <motion.div
                  key={inf.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="min-w-[320px] snap-start bg-background rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-video bg-gradient-to-br from-foreground/90 to-foreground/70 flex items-center justify-center group cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground">
                        Influencer
                      </span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Play className="w-7 h-7 text-primary-foreground ml-1" />
                    </motion.div>
                  </div>
                  <div className="p-6">
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
    </>
  );
};

export default Testimonials;
