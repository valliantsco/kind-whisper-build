import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
import InfluencerVideoModal, { type VideoSource } from "./InfluencerVideoModal";
import InfluencerPreviewMedia from "./InfluencerPreviewMedia";
import AnimatedCounter from "@/components/AnimatedCounter";
import rafaKalimannAvatar from "@/assets/influencers/rafa-kalimann.png";
import tataEstanieckiAvatar from "@/assets/influencers/tata-estaniecki.jpg";
import enzoRabeloAvatar from "@/assets/influencers/enzo-rabelo.jpg";
import jhonathanCoelhoAvatar from "@/assets/influencers/jhonathan-coelho.jpg";
import jacquesVanierAvatar from "@/assets/influencers/jacques-vanier.jpg";
import brunoDoBemAvatar from "@/assets/influencers/bruno-do-bem.jpg";
import cocieloAvatar from "@/assets/influencers/cocielo.jpg";
import gustavoMeloAvatar from "@/assets/influencers/gustavo-melo.png";

/* ── 15. Diversified testimonials ── */
const TESTIMONIALS = [
  { name: "João P.", city: "Goiânia, GO", text: "Comprei a S3K e estou impressionado com a autonomia. Faço 40km por dia e ainda sobra bateria. O atendimento da MS Eletric foi impecável.", stars: 5 },
  { name: "Maria S.", city: "Belo Horizonte, MG", text: "Minha Bike 400+ é perfeita para ir ao trabalho. Economizo muito com combustível e estacionamento. Super prática!", stars: 5 },
  { name: "Carlos M.", city: "São Paulo, SP", text: "Uso o Rhino Delivery no trabalho e a economia é absurda. Bateria removível facilita muito. Recomendo demais.", stars: 4 },
  { name: "Ana L.", city: "Uberlândia, MG", text: "Comprei o triciclo para minha mãe e ela ama. Super estável e seguro. A assistência técnica é muito atenciosa.", stars: 5 },
  { name: "Roberto F.", city: "Brasília, DF", text: "A Tour 3K sobe ladeira como se fosse plano. Motor de 3000W faz toda diferença. Melhor investimento que fiz.", stars: 5 },
  { name: "Fernanda R.", city: "Ribeirão Preto, SP", text: "Atendimento consultivo de verdade. Me ajudaram a escolher o modelo ideal com o quiz. Saí da loja com a Bliss e estou apaixonada!", stars: 5 },
];

/* ── 12. Avatar gradient colors ── */
const AVATAR_GRADIENTS: Record<string, string> = {
  J: "from-primary to-orange-400",
  M: "from-purple-500 to-purple-400",
  C: "from-emerald-500 to-emerald-400",
  A: "from-blue-500 to-blue-400",
  R: "from-rose-500 to-rose-400",
  F: "from-pink-500 to-pink-400",
};

/* ── 4. Removed badge field from interface ── */
interface Influencer {
  name: string;
  handle: string;
  views: string;
  description: string;
  avatarImg: string;
  videos: VideoSource[];
  previewScale?: number;
}

/* ── 4. Removed badge from Rafa ── */
const INFLUENCERS: Influencer[] = [
  { name: "Rafa Kalimann", handle: "@rafakalimann", views: "22M seguidores", description: "Apresentadora e influenciadora digital", avatarImg: rafaKalimannAvatar, videos: [{ type: "vimeo", id: "1178576288" }] },
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

/* ── 8. Tilt 3D helper ── */
const useTilt = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "rotateX(0deg) rotateY(0deg) scale(1)",
    transition: "transform 0.15s ease-out",
  });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.04)`,
      transition: "transform 0.15s ease-out",
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: "rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.3s ease-out",
    });
  }, []);

  return { ref, style, onMouseMove, onMouseLeave };
};

/* ── Influencer Card with tilt ── */
const InfluencerCard = ({
  inf,
  index,
  onOpen,
}: {
  inf: Influencer;
  index: number;
  onOpen: () => void;
}) => {
  const tilt = useTilt();
  const [videoReady, setVideoReady] = useState(false);

  return (
    <motion.div
      key={inf.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      style={{ perspective: "600px" }}
      className="flex-shrink-0 snap-center"
    >
      <div
        ref={tilt.ref}
        onClick={onOpen}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        tabIndex={0}
        role="button"
        aria-label={`Assistir vídeo de ${inf.name}`}
        onKeyDown={(e) => e.key === "Enter" && onOpen()}
        className="relative rounded-2xl overflow-hidden group cursor-pointer"
        style={{
          width: "clamp(180px, 42vw, 220px)",
          aspectRatio: "9/16",
          ...tilt.style,
        }}
      >
        {/* Video / fallback */}
        <div className="absolute inset-0 overflow-hidden bg-black" style={{ zIndex: 1 }}>
          {/* 7. Avatar fallback while video loads */}
          {!videoReady && (
            <img
              src={inf.avatarImg}
              alt={inf.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {inf.videos.length > 0 ? (
            <div className={videoReady ? "opacity-100" : "opacity-0"} style={{ transition: "opacity 0.3s" }}>
              <InfluencerPreviewMedia
                videos={inf.videos}
                name={inf.name}
                scale={inf.previewScale}
                onReady={() => setVideoReady(true)}
              />
            </div>
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

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            zIndex: 2,
            boxShadow: "inset 0 0 40px 15px hsl(0 0% 10% / 0.9), inset 0 0 80px 30px hsl(0 0% 10% / 0.5)",
          }}
        />

        {/* 3. Play overlay on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-colors duration-200 pointer-events-none"
          style={{ zIndex: 10, background: "rgba(0,0,0,0)" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center opacity-0 scale-[0.8] group-hover:opacity-100 group-hover:scale-100 transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.9)" }}
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
              <path d="M2 1.5L16 10L2 18.5V1.5Z" fill="hsl(0 0% 15%)" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-200 pointer-events-none" style={{ zIndex: 9 }} />

        {/* Info overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2" style={{ zIndex: 20 }}>
          <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-primary to-orange-400 shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img src={inf.avatarImg} alt={inf.name} className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
          <div className="min-w-0">
            {/* 6. Bigger text */}
            <p className="text-xs font-bold text-white truncate leading-tight" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
              {inf.name}
            </p>
            <p className="text-[11px] text-white/60 truncate" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>
              {inf.views}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeInfluencer, setActiveInfluencer] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    // Calculate active dot index
    const cardWidth = el.scrollWidth / INFLUENCERS.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(idx, INFLUENCERS.length - 1));
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

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / INFLUENCERS.length;
    el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
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
            {TESTIMONIALS.map((t, i) => {
              const initial = t.name[0];
              const gradient = AVATAR_GRADIENTS[initial] || "from-primary to-primary";
              return (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  /* 10. Hover lift */
                  className="rounded-2xl p-6 relative bg-card/80 border border-border transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/[0.04]"
                >
                  {/* 11. Quote mark */}
                  <span
                    className="absolute top-2.5 right-3.5 text-primary/15 pointer-events-none select-none"
                    style={{ fontSize: "48px", lineHeight: 0.8, fontFamily: "Georgia, serif" }}
                    aria-hidden="true"
                  >
                    "
                  </span>

                  <div className="flex items-center gap-3 mb-4">
                    {/* 12. Colored gradient avatar */}
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br ${gradient}`}>
                      <span className="text-white text-sm font-bold">{initial}</span>
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
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 13. Separator ── */}
      <div
        className="h-[1px] w-full"
        style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.06), transparent)" }}
      />

      {/* ── INFLUENCERS ── */}
      <section className="relative py-20 md:py-28 bg-foreground overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-4 bg-primary/10 text-primary border border-primary/25">
              Parcerias de marca
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-primary-foreground uppercase tracking-tight leading-[1]">
              Credibilidade que se torna <span className="gradient-text">referência</span>
            </h2>
            <p className="text-primary-foreground/40 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              A MS Electric vem construindo uma marca em que as pessoas confiam. A presença ao lado de nomes de grande alcance reforça essa percepção e mostra que a marca desperta interesse real, conexão e desejo.
            </p>
            <p className="text-primary-foreground/40 mt-2 max-w-xl mx-auto text-sm leading-relaxed">
              Mais do que ampliar visibilidade, essas associações ajudam a consolidar a MS Electric como uma marca atual, confiável e cada vez mais relevante no universo da mobilidade elétrica.
            </p>
          </motion.div>

          {/* ── 9. Stat bar with 14. animated counters ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-12 px-6 py-5 rounded-2xl mx-auto max-w-2xl"
            style={{
              background: "hsl(0 0% 100% / 0.04)",
              border: "1px solid hsl(0 0% 100% / 0.08)",
            }}
          >
            <div className="text-center">
              <p className="text-xl md:text-2xl font-black text-primary leading-none">
                <AnimatedCounter end={56} duration={1.2} suffix="M+" />
              </p>
              <p className="text-[11px] text-primary-foreground/40 mt-1">seguidores</p>
            </div>
            <div className="w-[1px] h-8 bg-primary-foreground/10 hidden md:block" />
            <div className="text-center">
              <p className="text-xl md:text-2xl font-black text-primary leading-none">
                <AnimatedCounter end={8} duration={1.2} />
              </p>
              <p className="text-[11px] text-primary-foreground/40 mt-1">influenciadores parceiros</p>
            </div>
            <div className="w-[1px] h-8 bg-primary-foreground/10 hidden md:block" />
            <div className="text-center">
              <p className="text-xl md:text-2xl font-black text-primary leading-none">
                <AnimatedCounter end={100} duration={1.2} suffix="M+" />
              </p>
              <p className="text-[11px] text-primary-foreground/40 mt-1">visualizações estimadas</p>
            </div>
          </motion.div>

          <div className="relative">
            {/* 5. Desktop arrows — always visible, opacity when can't scroll */}
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full cursor-pointer active:scale-90 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                boxShadow: "0 4px 14px hsl(var(--primary) / 0.4)",
                opacity: canScrollLeft ? 1 : 0.3,
              }}
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-primary-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full cursor-pointer active:scale-90 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                boxShadow: "0 4px 14px hsl(var(--primary) / 0.4)",
                opacity: canScrollRight ? 1 : 0.3,
              }}
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5 text-primary-foreground" />
            </button>

            {/* 17. ARIA attributes on carousel */}
            <div
              ref={scrollRef}
              role="region"
              aria-label="Parcerias de marca"
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:px-10"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                maskImage: `linear-gradient(to right, ${canScrollLeft ? "transparent" : "black"} 0%, black ${canScrollLeft ? "8%" : "0%"}, black ${canScrollRight ? "88%" : "100%"}, ${canScrollRight ? "transparent" : "black"} 100%)`,
                WebkitMaskImage: `linear-gradient(to right, ${canScrollLeft ? "transparent" : "black"} 0%, black ${canScrollLeft ? "8%" : "0%"}, black ${canScrollRight ? "88%" : "100%"}, ${canScrollRight ? "transparent" : "black"} 100%)`,
              }}
            >
              {INFLUENCERS.map((inf, i) => (
                <InfluencerCard
                  key={inf.name}
                  inf={inf}
                  index={i}
                  onOpen={() => setActiveInfluencer(i)}
                />
              ))}
            </div>

            {/* 5. Dot indicators (replaces progress bar) */}
            <div className="flex items-center justify-center gap-1.5 mt-6">
              {INFLUENCERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-5 bg-primary"
                      : "w-2 bg-primary-foreground/20"
                  }`}
                  aria-label={`Ir para ${INFLUENCERS[i].name}`}
                />
              ))}
            </div>
          </div>

          {/* 16. CTA Instagram */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-10"
          >
            <a
              href="https://www.instagram.com/mseletricbr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-primary border border-primary/40 hover:bg-primary/10 transition-colors duration-200"
            >
              Ver nossas parcerias no Instagram
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
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
