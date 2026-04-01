import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import InfluencerVideoModal, { type VideoSource } from "./InfluencerVideoModal";
import InfluencerPreviewMedia from "./InfluencerPreviewMedia";
import rafaKalimannAvatar from "@/assets/influencers/rafa-kalimann.webp";
import tataEstanieckiAvatar from "@/assets/influencers/tata-estaniecki.webp";
import enzoRabeloAvatar from "@/assets/influencers/enzo-rabelo.webp";
import jhonathanCoelhoAvatar from "@/assets/influencers/jhonathan-coelho.webp";
import jacquesVanierAvatar from "@/assets/influencers/jacques-vanier.webp";
import brunoDoBemAvatar from "@/assets/influencers/bruno-do-bem.webp";
import cocieloAvatar from "@/assets/influencers/cocielo.webp";
import gustavoMeloAvatar from "@/assets/influencers/gustavo-melo.webp";

interface Influencer {
  name: string;
  handle: string;
  views: string;
  description: string;
  avatarImg: string;
  videos: VideoSource[];
  previewScale?: number;
}

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

const STATS = [
  { value: "31M+", label: "Alcance acumulado" },
  { value: "4+", label: "Colaborações e parcerias" },
  { value: "56M+", label: "Visualizações geradas" },
];

/* ── Animated counter ── */
const AnimatedStat = ({ value, label }: { value: string; label: string }) => {
  const numericPart = value.replace(/[^0-9]/g, "");
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const target = parseInt(numericPart);
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [numericPart]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 px-4 md:px-8">
      <span className="text-2xl md:text-3xl font-black text-primary tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-[11px] md:text-xs uppercase tracking-[0.15em] text-primary-foreground/35 font-medium">
        {label}
      </span>
    </div>
  );
};

/* ── Lazy-loaded influencer card ── */
const InfluencerCard = ({ inf, index }: { inf: Influencer; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="relative flex-shrink-0 snap-center rounded-2xl overflow-hidden group cursor-default transition-transform duration-300 ease-out hover:scale-105"
      style={{ width: "clamp(180px, 42vw, 220px)", aspectRatio: "9/16" }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl bg-foreground" style={{ zIndex: 1 }}>
        {isVisible && inf.videos.length > 0 ? (
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

      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ zIndex: 2, boxShadow: "inset 0 0 40px 15px hsl(0 0% 6% / 0.9), inset 0 0 80px 30px hsl(0 0% 6% / 0.5)" }}
      />

      <div className="absolute bottom-3.5 left-3.5 flex items-center gap-2.5" style={{ zIndex: 20 }}>
        <div className="w-11 h-11 rounded-full p-[2px] shrink-0" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
          <div className="w-full h-full rounded-full overflow-hidden">
            <img src={inf.avatarImg} alt={inf.name} className="w-full h-full object-cover rounded-full" />
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-primary-foreground truncate leading-tight" style={{ textShadow: "0 1px 6px hsl(0 0% 0% / 0.9)" }}>
            {inf.name}
          </p>
          <p className="text-xs text-primary-foreground/50 truncate" style={{ textShadow: "0 1px 4px hsl(0 0% 0% / 0.7)" }}>
            {inf.views}
          </p>
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
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    const maxScroll = el.scrollWidth - el.clientWidth;
    setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
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

  return (
    <section className="relative py-14 md:py-16 overflow-hidden">
      {/* ── Section-specific effect: floating stars / social proof ── */}
      {[
        { top: "8%", left: "5%", size: 18, delay: 0, opacity: 0.2 },
        { top: "18%", right: "8%", size: 14, delay: 1.2, opacity: 0.15 },
        { top: "65%", left: "3%", size: 16, delay: 0.6, opacity: 0.18 },
        { top: "75%", right: "12%", size: 20, delay: 1.8, opacity: 0.12 },
        { top: "40%", right: "4%", size: 12, delay: 2.4, opacity: 0.16 },
      ].map((s, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute pointer-events-none text-primary"
          style={{ top: s.top, left: (s as any).left, right: (s as any).right }}
          animate={{
            opacity: [s.opacity * 0.2, s.opacity, s.opacity * 0.2],
            scale: [0.6, 1.2, 0.6],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          <Star style={{ width: s.size, height: s.size }} fill="currentColor" />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative">
        {/* ── HEADER — Editorial asymmetric layout ── */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className=""
          >
            {/* Accent line + label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary" />
              <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
                Credibilidade de Marca
              </span>
            </div>

            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
              Credibilidade que se torna{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
              >
                referência
              </span>
            </h2>

            <p className="text-sm md:text-base text-primary-foreground/55 leading-relaxed mt-5 max-w-lg">
              A presença da MS Electric ao lado de nomes de grande alcance fortalece algo que a marca já constrói na prática: visibilidade, confiança e relevância em um mercado que não para de crescer.
            </p>
          </motion.div>

          {/* ── Stat bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex items-center justify-center md:justify-start"
          >
            <div
              className="inline-flex items-center rounded-xl py-4 px-2 md:px-4"
              style={{
                background: "hsl(0 0% 100% / 0.03)",
                border: "1px solid hsl(0 0% 100% / 0.06)",
              }}
            >
              {STATS.map((s, i) => (
                <div key={s.label} className="flex items-center">
                  {i > 0 && (
                    <div className="w-px h-8 mx-1 md:mx-2" style={{ background: "hsl(0 0% 100% / 0.08)" }} />
                  )}
                  <AnimatedStat value={s.value} label={s.label} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── CAROUSEL ── */}
        <div className="relative">
          {/* Navigation arrows — always visible on desktop, opacity change */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full cursor-pointer active:scale-90 transition-all duration-200"
            style={{
              background: canScrollLeft
                ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))"
                : "hsl(0 0% 100% / 0.06)",
              boxShadow: canScrollLeft ? "0 4px 14px hsl(var(--primary) / 0.4)" : "none",
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
              background: canScrollRight
                ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))"
                : "hsl(0 0% 100% / 0.06)",
              boxShadow: canScrollRight ? "0 4px 14px hsl(var(--primary) / 0.4)" : "none",
              opacity: canScrollRight ? 1 : 0.3,
            }}
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 text-primary-foreground" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:px-10"
            role="region"
            aria-label="Parcerias de marca"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              maskImage: `linear-gradient(to right, ${canScrollLeft ? "transparent" : "black"} 0%, black ${canScrollLeft ? "8%" : "0%"}, black ${canScrollRight ? "88%" : "100%"}, ${canScrollRight ? "transparent" : "black"} 100%)`,
              WebkitMaskImage: `linear-gradient(to right, ${canScrollLeft ? "transparent" : "black"} 0%, black ${canScrollLeft ? "8%" : "0%"}, black ${canScrollRight ? "88%" : "100%"}, ${canScrollRight ? "transparent" : "black"} 100%)`,
            }}
          >
            {INFLUENCERS.map((inf, i) => (
              <InfluencerCard key={inf.name} inf={inf} index={i} />
            ))}

          </div>

          {/* Progress bar */}
          <div className="mt-6 md:mx-10 h-[3px] rounded-full overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.06)" }}>
            <div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                width: "40%",
                transform: `translateX(${scrollProgress * (100 / 0.4 - 100)}%)`,
                transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                boxShadow: "0 0 8px hsl(var(--primary) / 0.4)",
              }}
            />
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
  );
};

export default Testimonials;
