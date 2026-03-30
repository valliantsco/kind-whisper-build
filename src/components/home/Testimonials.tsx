import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
import InfluencerVideoModal, { type VideoSource } from "./InfluencerVideoModal";
import InfluencerPreviewMedia from "./InfluencerPreviewMedia";
import rafaKalimannAvatar from "@/assets/influencers/rafa-kalimann.png";
import tataEstanieckiAvatar from "@/assets/influencers/tata-estaniecki.jpg";
import enzoRabeloAvatar from "@/assets/influencers/enzo-rabelo.jpg";
import jhonathanCoelhoAvatar from "@/assets/influencers/jhonathan-coelho.jpg";
import jacquesVanierAvatar from "@/assets/influencers/jacques-vanier.jpg";
import brunoDoBemAvatar from "@/assets/influencers/bruno-do-bem.jpg";
import cocieloAvatar from "@/assets/influencers/cocielo.jpg";
import gustavoMeloAvatar from "@/assets/influencers/gustavo-melo.png";

const TESTIMONIALS = [
  { name: "João P.", city: "Uberlândia, MG", text: "Comprei a S3K e estou impressionado com a autonomia. Faço 40km por dia e ainda sobra bateria. O atendimento da MS Eletric foi impecável.", stars: 5 },
  { name: "Maria S.", city: "Uberlândia, MG", text: "Minha Bike 400+ é perfeita para ir ao trabalho. Economizo muito com combustível e estacionamento. Super prática!", stars: 5 },
  { name: "Carlos M.", city: "Uberlândia, MG", text: "Uso o Rhino Delivery no trabalho e a economia é absurda. Bateria removível facilita muito. Recomendo demais.", stars: 5 },
  { name: "Ana L.", city: "Uberlândia, MG", text: "Comprei o triciclo para minha mãe e ela ama. Super estável e seguro. A assistência técnica é muito atenciosa.", stars: 5 },
  { name: "Roberto F.", city: "Uberlândia, MG", text: "A Tour 3K sobe ladeira como se fosse plano. Motor de 3000W faz toda diferença. Melhor investimento que fiz.", stars: 5 },
  { name: "Fernanda R.", city: "Uberlândia, MG", text: "Atendimento consultivo de verdade. Me ajudaram a escolher o modelo ideal com o quiz. Saí da loja com a Bliss e estou apaixonada!", stars: 5 },
];

interface Influencer {
  name: string;
  handle: string;
  views: string;
  description: string;
  avatarImg: string;
  badge?: string;
  videos: VideoSource[];
  previewScale?: number;
}

const INFLUENCERS: Influencer[] = [
  { name: "Rafa Kalimann", handle: "@rafakalimann", views: "22M seguidores", description: "Apresentadora e influenciadora digital", avatarImg: rafaKalimannAvatar, badge: "Destaque", videos: [{ type: "vimeo", id: "1178576288" }] },
  { name: "Júlio Cocielo", handle: "@cocielo", views: "14M seguidores", description: "Criador de conteúdo e youtuber", avatarImg: cocieloAvatar, videos: [{ type: "vimeo", id: "1178577473" }], previewScale: 1.35 },
  { name: "Jacques Vanier", handle: "@jacquesvanier", views: "6.4M seguidores", description: "Comediante e criador de conteúdo", avatarImg: jacquesVanierAvatar, videos: [{ type: "vimeo", id: "1178580987" }], previewScale: 1.35 },
  { name: "Tata Estaniecki", handle: "@tata", views: "5.7M seguidores", description: "Influenciadora e empresária", avatarImg: tataEstanieckiAvatar, videos: [{ type: "vimeo", id: "1178580537" }], previewScale: 1.35 },
  { name: "Bruno Felix", handle: "@brunodobem", views: "3.3M seguidores", description: "Criador de conteúdo digital", avatarImg: brunoDoBemAvatar, videos: [{ type: "vimeo", id: "1178599104" }], previewScale: 1.35 },
  { name: "Jhonathan Coelho", handle: "@jhonathancoelho", views: "2.5M seguidores", description: "Influenciador e entusiasta de mobilidade", avatarImg: jhonathanCoelhoAvatar, videos: [{ type: "vimeo", id: "1178598176" }], previewScale: 1.35 },
  { name: "Enzo Rabelo", handle: "@enzorabelooficial", views: "1.5M seguidores", description: "Cantor sertanejo", avatarImg: enzoRabeloAvatar, videos: [{ type: "vimeo", id: "1178580276" }], previewScale: 1.35 },
  { name: "Gustavo Melo", handle: "@gustavomeloof", views: "1M seguidores", description: "Criador de conteúdo e motociclista", avatarImg: gustavoMeloAvatar, videos: [{ type: "vimeo", id: "1178602105" }], previewScale: 1.35 },
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
  const [activeInfluencer, setActiveInfluencer] = useState<number | null>(null);

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

      {/* ── INFLUENCERS — CATEGORY CARD STYLE ── */}
      <section className="relative py-20 md:py-28 bg-foreground overflow-hidden">
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
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:px-10"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {INFLUENCERS.map((inf, i) => (
                <motion.div
                  key={inf.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="relative flex-shrink-0 snap-center rounded-2xl overflow-hidden group cursor-default"
                  style={{
                    width: "clamp(180px, 42vw, 220px)",
                    aspectRatio: "9/16",
                  }}
                >
                  {/* Video or avatar background — fills card */}
                  <div className="absolute inset-0 overflow-hidden bg-black" style={{ zIndex: 1 }}>
                    {inf.videos.length > 0 ? (
                      <InfluencerPreviewMedia videos={inf.videos} name={inf.name} scale={inf.previewScale} />
                    ) : (
                      <img
                        src={inf.avatarImg}
                        alt={inf.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>

                  {/* Subtle bottom gradient for text readability */}
                  {/* Vignette — dark gray border glow inward */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{
                      zIndex: 2,
                      boxShadow: "inset 0 0 40px 15px hsl(0 0% 10% / 0.9), inset 0 0 80px 30px hsl(0 0% 10% / 0.5)",
                    }}
                  />

                  {/* Avatar bubble — bottom left */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2" style={{ zIndex: 20 }}>
                    <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-primary to-orange-400 shrink-0">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img src={inf.avatarImg} alt={inf.name} className="w-full h-full object-cover rounded-full" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-white truncate leading-tight" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                        {inf.name}
                      </p>
                      <p className="text-[9px] text-white/60 truncate" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>
                        {inf.views}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* CTA scroll arrow card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: INFLUENCERS.length * 0.06, duration: 0.35 }}
                className="flex-shrink-0 snap-center rounded-2xl overflow-hidden flex items-center justify-center"
                style={{
                  width: "80px",
                  height: "320px",
                  border: "1px solid hsl(0 0% 100% / 0.08)",
                  background: "hsl(0 0% 8%)",
                }}
              >
                <button
                  onClick={() => scroll("right")}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)), hsl(11 90% 65%))",
                    boxShadow: "0 4px 16px hsl(var(--primary) / 0.4)",
                  }}
                  aria-label="Ver mais"
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {activeInfluencer !== null && (
          <InfluencerVideoModal
            open
            onOpenChange={(open) => { if (!open) setActiveInfluencer(null); }}
            videos={INFLUENCERS[activeInfluencer].videos}
            name={INFLUENCERS[activeInfluencer].name}
          />
        )}
      </section>
    </>
  );
};

export default Testimonials;
