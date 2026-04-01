import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Battery, Gauge } from "lucide-react";

const SLIDE_DURATION = 20000;

interface Slide {
  badge: string;
  headline: string[];
  highlightLine: number;
  subheadline: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  stats?: { icon: typeof Zap; value: string; label: string }[];
  youtubeId: string;
  youtubeStart?: number;
}

const SLIDES: Slide[] = [
  {
    badge: "LANÇAMENTO",
    headline: ["S3K", "PERFORMANCE", "E AUTONOMIA", "MÁXIMA"],
    highlightLine: 1,
    subheadline:
      "Motor de 3.500W, até 80km/h e 85km de autonomia. A scooter elétrica mais completa da linha AIMA.",
    primaryCta: { text: "Conhecer a S3K", href: "/modelos/s3k" },
    secondaryCta: { text: "Ver todos os modelos", href: "/modelos" },
    youtubeId: "-_5J43amfHs",
    youtubeStart: 4,
    stats: [
      { icon: Zap, value: "3.500W", label: "Motor" },
      { icon: Gauge, value: "80km/h", label: "Velocidade" },
      { icon: Battery, value: "85km", label: "Autonomia" },
    ],
  },
  {
    badge: "MAIS VENDIDO",
    headline: ["MOBILIDADE", "100%", "ELÉTRICA"],
    highlightLine: 1,
    subheadline:
      "Autopropelidos, scooters, bicicletas e triciclos elétricos. Mais de 19 modelos para cada estilo de vida.",
    primaryCta: { text: "Explorar catálogo", href: "/modelos" },
    secondaryCta: { text: "Fazer o quiz", href: "#quiz" },
    youtubeId: "aogNFr_-56w",
    youtubeStart: 3,
  },
  {
    badge: "NOVIDADE",
    headline: ["TOUR 3K", "POTÊNCIA", "PARA SUBIDAS"],
    highlightLine: 1,
    subheadline:
      "Motor de 3.000W e velocidade de até 75km/h. Bateria de lítio removível e design esportivo.",
    primaryCta: { text: "Conhecer a Tour 3K", href: "/modelos/tour-3k" },
    secondaryCta: { text: "Ver todos os modelos", href: "/modelos" },
    youtubeId: "j9UspI7_KAg",
    youtubeStart: 4,
    stats: [
      { icon: Zap, value: "3.000W", label: "Motor" },
      { icon: Gauge, value: "75km/h", label: "Velocidade" },
      { icon: Battery, value: "40km", label: "Autonomia" },
    ],
  },
];

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % SLIDES.length), []);
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    setProgress(0);
    const interval = 50;
    const prog = setInterval(() => {
      setProgress((p) => Math.min(p + (interval / SLIDE_DURATION) * 100, 100));
    }, interval);
    const timer = setTimeout(next, SLIDE_DURATION);
    return () => {
      clearInterval(prog);
      clearTimeout(timer);
    };
  }, [current, next]);

  const slide = SLIDES[current];

  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-foreground" />

      {/* YouTube background video */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          key={slide.youtubeId}
          src={`https://www.youtube.com/embed/${slide.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${slide.youtubeId}&controls=0&showinfo=0&modestbranding=1&rel=0&start=${slide.youtubeStart ?? 0}&playsinline=1&enablejsapi=1&iv_load_policy=3&disablekb=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          title={slide.badge}
          className="absolute top-1/2 left-1/2 pointer-events-none border-0"
          style={{
            width: "120vw",
            height: "120vh",
            minWidth: "120vw",
            minHeight: "120vh",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/30 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/40 to-foreground/20 z-[2]" />

      {/* ── Ambient glow ── */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
            filter: "blur(100px)",
            top: "-10%",
            left: "-5%",
          }}
          animate={{ x: [0, 200, 0], y: [0, 80, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-4 pb-12 md:pb-20 mt-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-4xl"
          >

            {/* Headline */}
            <h1 className="font-display font-black text-[clamp(2rem,6.4vw,4.8rem)] text-primary-foreground leading-[1.05] mb-4 md:mb-5 uppercase tracking-tight">
              {slide.headline.map((line, i) => (
                <motion.span
                  key={i}
                  className="block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
                >
                  {i === slide.highlightLine ? (
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                        filter:
                          "drop-shadow(0 0 24px hsl(var(--primary) / 0.35))",
                      }}
                    >
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              className="text-xs md:text-sm text-primary-foreground/45 mb-5 md:mb-6 max-w-lg leading-relaxed tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {slide.subheadline}
            </motion.p>

            {/* Inline specs */}
            {slide.stats && (
              <motion.div
                className="flex items-center gap-5 md:gap-6 mb-7 md:mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                {slide.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: "hsl(var(--primary) / 0.1)",
                        border: "1px solid hsl(var(--primary) / 0.15)",
                      }}
                    >
                      <stat.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-black text-sm text-primary-foreground leading-none">
                        {stat.value}
                      </p>
                      <p className="text-[10px] text-primary-foreground/30 uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                    {i < slide.stats!.length - 1 && (
                      <div
                        className="w-px h-6 ml-3"
                        style={{ background: "hsl(0 0% 100% / 0.08)" }}
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              className="flex items-center gap-3 flex-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <motion.a
                href={slide.primaryCta.href}
                className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] px-7 py-3.5 rounded-xl text-primary-foreground relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                  boxShadow:
                    "0 8px 32px hsl(var(--primary) / 0.3), 0 1px 0 inset hsl(0 0% 100% / 0.1)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, hsl(0 0% 100% / 0.12) 50%, transparent 60%)",
                  }}
                />
                <span className="relative z-10">{slide.primaryCta.text}</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5" />
              </motion.a>

              <a
                href={slide.secondaryCta.href}
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] px-7 py-3.5 rounded-xl text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300"
                style={{
                  border: "1px solid hsl(0 0% 100% / 0.1)",
                  background: "hsl(0 0% 100% / 0.03)",
                }}
              >
                {slide.secondaryCta.text}
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation arrows ── */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          {[
            { action: prev, icon: ChevronLeft },
            { action: next, icon: ChevronRight },
          ].map(({ action, icon: Icon }, i) => (
            <button
              key={i}
              onClick={action}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-primary-foreground/40 hover:text-primary-foreground transition-all duration-300"
              style={{
                background: "hsl(0 0% 100% / 0.05)",
                border: "1px solid hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Slide indicators ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
            style={{
              width: i === current ? 52 : 20,
              background:
                i === current
                  ? "hsl(0 0% 100% / 0.15)"
                  : "hsl(0 0% 100% / 0.08)",
            }}
          >
            {i === current && (
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: "hsl(var(--primary))",
                  width: `${progress}%`,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Bottom light strip ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), hsl(var(--primary-glow) / 0.4), transparent)",
        }}
      />
    </section>
  );
};

export default HeroSlideshow;
