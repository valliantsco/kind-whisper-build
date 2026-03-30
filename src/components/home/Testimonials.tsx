import { motion } from "framer-motion";
import { Star, Play, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useRef } from "react";
import rafaKalimannAvatar from "@/assets/influencers/rafa-kalimann.png";
import tataEstanieckiAvatar from "@/assets/influencers/tata-estaniecki.jpg";

const TESTIMONIALS = [
  { name: "João P.", city: "Uberlândia, MG", text: "Comprei a S3K e estou impressionado com a autonomia. Faço 40km por dia e ainda sobra bateria. O atendimento da MS Eletric foi impecável.", stars: 5 },
  { name: "Maria S.", city: "Uberlândia, MG", text: "Minha Bike 400+ é perfeita para ir ao trabalho. Economizo muito com combustível e estacionamento. Super prática!", stars: 5 },
  { name: "Carlos M.", city: "Uberlândia, MG", text: "Uso o Rhino Delivery no trabalho e a economia é absurda. Bateria removível facilita muito. Recomendo demais.", stars: 5 },
  { name: "Ana L.", city: "Uberlândia, MG", text: "Comprei o triciclo para minha mãe e ela ama. Super estável e seguro. A assistência técnica é muito atenciosa.", stars: 5 },
  { name: "Roberto F.", city: "Uberlândia, MG", text: "A Tour 3K sobe ladeira como se fosse plano. Motor de 3000W faz toda diferença. Melhor investimento que fiz.", stars: 5 },
  { name: "Fernanda R.", city: "Uberlândia, MG", text: "Atendimento consultivo de verdade. Me ajudaram a escolher o modelo ideal com o quiz. Saí da loja com a Bliss e estou apaixonada!", stars: 5 },
];

const INFLUENCERS = [
  { name: "Rafa Kalimann", handle: "@rafakalimann", views: "22M seguidores", gradient: "from-primary/40 to-primary/10", avatarImg: rafaKalimannAvatar },
  { name: "Tata Estaniecki", handle: "@tata", views: "5.7M seguidores", gradient: "from-orange-600/40 to-amber-500/10", avatarImg: tataEstanieckiAvatar },
  { name: "Roberto Lima", handle: "@robertolima", views: "15.2k", gradient: "from-primary/30 to-red-600/10" },
  { name: "Carla Santos", handle: "@carlasantos", views: "22.1k", gradient: "from-amber-500/30 to-primary/10" },
  { name: "Pedro Alves", handle: "@pedroalves", views: "9.8k", gradient: "from-red-500/30 to-orange-600/10" },
  { name: "Mariana Duarte", handle: "@mariduarte", views: "31.5k", gradient: "from-primary/50 to-orange-400/10" },
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
    scrollRef.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  return (
    <>
      {/* ── CLIENTES ── */}
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

      {/* ── INFLUENCERS — INSTAGRAM STORIES STYLE ── */}
      <section className="py-20 md:py-28 bg-foreground overflow-hidden">
        <div
          className="absolute left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.04), transparent)" }}
        />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-4 bg-primary/10 text-primary border border-primary/25">
              Influenciadores
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-primary-foreground uppercase tracking-tight leading-[1]">
              Testado e aprovado <span className="gradient-text">na prática</span>
            </h2>
            <p className="text-primary-foreground/40 mt-4 max-w-lg mx-auto text-sm">
              Veja o que influenciadores e especialistas estão falando sobre nossos veículos elétricos.
            </p>
          </motion.div>

          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 bg-foreground/90 backdrop-blur-sm rounded-full p-2.5 border border-border shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 bg-foreground/90 backdrop-blur-sm rounded-full p-2.5 border border-border shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-10"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {INFLUENCERS.map((inf, i) => (
                <motion.div
                  key={inf.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  whileHover={{ scale: 1.03, y: -6 }}
                  className="relative min-w-[220px] w-[220px] aspect-[9/16] snap-start rounded-2xl overflow-hidden cursor-pointer group shrink-0"
                >
                  {/* Background gradient placeholder (replace with real thumbnails later) */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${inf.gradient} bg-foreground`} />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

                  {/* Views count — top left */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    <Eye className="w-3.5 h-3.5 text-white/80" />
                    <span className="text-[11px] font-bold text-white/90">{inf.views}</span>
                  </div>


                  {/* Play button — center */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity"
                    >
                      <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                    </motion.div>
                  </div>

                  {/* Influencer info — bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      {/* Avatar ring */}
                      <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-primary to-orange-400 shrink-0">
                        <div className="w-full h-full rounded-full bg-foreground flex items-center justify-center overflow-hidden">
                          {"avatarImg" in inf && inf.avatarImg ? (
                            <img src={inf.avatarImg} alt={inf.name} className="w-full h-full object-cover rounded-full" />
                          ) : (
                            <span className="text-[10px] font-bold text-primary-foreground/70">
                              {inf.name.split(" ").map(n => n[0]).join("")}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{inf.name}</p>
                        <p className="text-[10px] text-white/50">{inf.handle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Story progress bar — very top */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] z-20 flex gap-0.5 px-2 pt-1">
                    <div className="flex-1 rounded-full bg-white/30 overflow-hidden">
                      <div className="h-full w-full bg-white rounded-full" />
                    </div>
                    <div className="flex-1 rounded-full bg-white/30 overflow-hidden">
                      <div className="h-full w-1/2 bg-white/60 rounded-full" />
                    </div>
                    <div className="flex-1 rounded-full bg-white/20" />
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
