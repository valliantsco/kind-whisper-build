import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDE_DURATION = 5000;

interface Slide {
  badge: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
}

const SLIDES: Slide[] = [
  {
    badge: "NOVIDADE",
    headline: "O FUTURO DA\nMOBILIDADE ELÉTRICA",
    subheadline: "Descubra a linha completa de veículos elétricos com tecnologia de ponta e design inovador.",
    primaryCta: "Conhecer modelo",
    secondaryCta: "Ver todos os modelos",
  },
  {
    badge: "MAIS VENDIDO",
    headline: "POTÊNCIA E\nAUTONOMIA JUNTAS",
    subheadline: "Até 85km de autonomia e velocidade de até 80km/h. Performance que transforma sua rotina.",
    primaryCta: "Conhecer modelo",
    secondaryCta: "Ver todos os modelos",
  },
  {
    badge: "LANÇAMENTO",
    headline: "MOBILIDADE\nSEM LIMITES",
    subheadline: "Do trabalho ao lazer, do delivery à aventura. Encontre o veículo ideal para cada momento.",
    primaryCta: "Conhecer modelo",
    secondaryCta: "Ver todos os modelos",
  },
];

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    setProgress(0);
    const interval = 50;
    const prog = setInterval(() => {
      setProgress((p) => Math.min(p + (interval / SLIDE_DURATION) * 100, 100));
    }, interval);
    const timer = setTimeout(() => {
      next();
    }, SLIDE_DURATION);
    return () => {
      clearInterval(prog);
      clearTimeout(timer);
    };
  }, [current, next]);

  const slide = SLIDES[current];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Placeholder background */}
      <div className="absolute inset-0 bg-foreground" />
      <div
        className="absolute inset-0"
        style={{
          background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><rect fill="%23222"/><text x="960" y="540" text-anchor="middle" fill="%23444" font-size="48" font-family="sans-serif">HERO IMAGE / VIDEO ${current + 1}</text></svg>')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/30 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-transparent to-foreground/20 z-[2]" />

      {/* Ambient glows */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(11 81% 57% / 0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
            top: "5%",
          }}
          animate={{ left: ["-10%", "60%", "-10%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-6"
              style={{
                background: "hsl(11 81% 57% / 0.15)",
                color: "hsl(11 81% 57%)",
                border: "1px solid hsl(11 81% 57% / 0.3)",
              }}
            >
              {slide.badge}
            </motion.span>

            {/* Headline */}
            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.95] mb-6 uppercase tracking-tight whitespace-pre-line">
              {slide.headline.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {i === 0 ? (
                    <span className="gradient-text">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg text-primary-foreground/50 mb-8 max-w-xl leading-relaxed">
              {slide.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap">
              <motion.a
                href="#modelos"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 rounded-2xl text-white"
                style={{
                  background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                  boxShadow: "0 4px 20px hsl(11 81% 57% / 0.3)",
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 30px hsl(11 81% 57% / 0.5)" }}
                whileTap={{ scale: 0.97 }}
              >
                {slide.primaryCta}
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <a
                href="#modelos"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 rounded-2xl text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                style={{
                  border: "1px solid hsl(0 0% 100% / 0.15)",
                }}
              >
                {slide.secondaryCta}
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground transition-colors"
            style={{ background: "hsl(0 0% 100% / 0.06)", border: "1px solid hsl(0 0% 100% / 0.08)" }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground transition-colors"
            style={{ background: "hsl(0 0% 100% / 0.06)", border: "1px solid hsl(0 0% 100% / 0.08)" }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
            style={{
              width: i === current ? 48 : 24,
              background: i === current ? "hsl(0 0% 100% / 0.2)" : "hsl(0 0% 100% / 0.15)",
            }}
          >
            {i === current && (
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: "hsl(11 81% 57%)", width: `${progress}%` }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Bottom gradient strip */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] z-10"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.5), hsl(11 90% 65% / 0.5), transparent)",
        }}
      />
    </section>
  );
};

export default HeroSlideshow;
