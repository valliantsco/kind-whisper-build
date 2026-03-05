import { motion, AnimatePresence } from "framer-motion";
import { Zap, Leaf, Shield, Pause, Play } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const SLIDE_DURATION = 20000;

interface SlideContent {
  tag: string;
  tagIcon: "zap" | "leaf" | "shield";
  headlineLines: { text: string; highlight?: boolean; mobileOnly?: boolean; desktopOnly?: boolean }[];
  subheadline: string;
  primaryCta: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
}

const SLIDES: SlideContent[] = [
  {
    tag: "Energia que Move",
    tagIcon: "zap",
    headlineLines: [
      { text: "Liderando", highlight: true },
      { text: "a Nova Era", mobileOnly: true },
      { text: "Da Mobilidade.", mobileOnly: true },
      { text: "a Nova Era", desktopOnly: true },
      { text: "Da Mobilidade.", desktopOnly: true },
    ],
    subheadline: "A MS Eletric reúne soluções em motos elétricas para quem busca economia, praticidade e uma experiência completa do atendimento ao pós-venda.",
    primaryCta: { text: "Conheça os Modelos", href: "#modelos" },
  },
  {
    tag: "Garantia & Suporte",
    tagIcon: "shield",
    headlineLines: [
      { text: "Experiência" },
      { text: "Completa", highlight: true },
      { text: "do Início ao Fim." },
    ],
    subheadline: "Do primeiro contato ao pós-venda, a MS Eletric oferece atendimento especializado e suporte técnico para você rodar com tranquilidade.",
    primaryCta: { text: "Saiba mais sobre nosso suporte", href: "#contato" },
  },
];

const TAG_ICONS = {
  zap: Zap,
  leaf: Leaf,
  shield: Shield,
};


const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      timerRef.current = null;
      progressRef.current = null;
      return;
    }
    setProgress(0);
    const PROGRESS_INTERVAL = 50;
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (PROGRESS_INTERVAL / SLIDE_DURATION) * 100;
        return next >= 100 ? 100 : next;
      });
    }, PROGRESS_INTERVAL);
    timerRef.current = setInterval(() => {
      nextSlide();
      setProgress(0);
    }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [nextSlide, isPaused, currentSlide]);

  return (
    <section id="inicio" className="relative min-h-[75vh] flex items-center overflow-hidden">
      {/* Background image fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />


      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/85 to-foreground/40 z-[3]" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-foreground/30 z-[3]" />

      {/* Futuristic ambient effects — matching header orbiting glows */}
      <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
        {/* Primary orbiting glow */}
        <motion.div
          className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(11 81% 57% / 0.12) 0%, hsl(11 90% 65% / 0.04) 50%, transparent 70%)",
            filter: "blur(60px)",
            top: "10%",
          }}
          animate={{ left: ["-20%", "80%", "-20%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Secondary glow — opposite */}
        <motion.div
          className="absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(11 90% 65% / 0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
            bottom: "15%",
          }}
          animate={{ right: ["-15%", "70%", "-15%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Floating dot cluster */}
        {[
          { size: 6, top: "20%", duration: 22, delay: 0 },
          { size: 4, top: "50%", duration: 18, delay: 4 },
          { size: 5, top: "70%", duration: 20, delay: 8 },
          { size: 3, top: "35%", duration: 16, delay: 2 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: dot.size,
              height: dot.size,
              background: `hsl(11 81% 57% / ${0.2 + i * 0.05})`,
              filter: "blur(1px)",
              top: dot.top,
            }}
            animate={{
              left: [i % 2 === 0 ? "5%" : "90%", i % 2 === 0 ? "85%" : "10%", i % 2 === 0 ? "5%" : "90%"],
              opacity: [0.15, 0.5, 0.15],
            }}
            transition={{ duration: dot.duration, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
          />
        ))}

        {/* Horizontal light strip at bottom — same as header */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px] z-10"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.5), hsl(11 90% 65% / 0.5), transparent)",
          }}
        />
      </div>

      {/* Main content — dynamic per slide */}
      <div className="relative z-10 container mx-auto px-4 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 md:pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl"
          >
            {/* Tag badge */}
            {(() => {
              const slide = SLIDES[currentSlide];
              const TagIcon = TAG_ICONS[slide.tagIcon];
              return (
                <>
                  <div className="mb-5 md:mb-6">
                    <span
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80 border border-primary-foreground/10 backdrop-blur-sm"
                      style={{ background: "hsl(0 0% 100% / 0.04)" }}
                    >
                      <TagIcon className="w-3 h-3 text-primary" />
                      {slide.tag}
                    </span>
                  </div>

                  {/* Headline */}
                  <h1 className="font-display font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[0.95] mb-5 md:mb-7 uppercase tracking-tight">
                    {slide.headlineLines.map((line, idx) => {
                      const visibilityClass = line.mobileOnly
                        ? "block sm:hidden"
                        : line.desktopOnly
                        ? "hidden sm:block"
                        : "block";

                      return (
                        <span key={idx} className={visibilityClass}>
                          {line.highlight ? (
                            <span
                              style={{
                                background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%), hsl(20 85% 60%))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                filter: "drop-shadow(0 0 20px hsl(11 81% 57% / 0.4))",
                              }}
                            >
                              {line.text}
                            </span>
                          ) : (
                            line.text
                          )}
                        </span>
                      );
                    })}
                  </h1>

                  {/* Subheadline */}
                  <p className="text-sm sm:text-base md:text-lg text-primary-foreground/50 mb-8 md:mb-10 max-w-xl leading-relaxed tracking-wide">
                    {slide.subheadline}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 md:gap-4">
                    <motion.a
                      href={slide.primaryCta.href}
                      className="relative inline-flex items-center justify-center gap-2.5 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.12em] px-6 md:px-9 py-3.5 md:py-4 rounded-xl bg-primary text-primary-foreground overflow-visible"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 25px hsl(11 81% 57% / 0.5), 0 0 50px hsl(11 81% 57% / 0.2)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        boxShadow: "0 0 20px hsl(11 81% 57% / 0.3), 0 0 40px hsl(11 81% 57% / 0.1)",
                      }}
                    >
                      {slide.primaryCta.text}
                    </motion.a>

                    {slide.secondaryCta && (
                      <motion.a
                        href={slide.secondaryCta.href}
                        className="relative inline-flex items-center justify-center text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.12em] px-6 md:px-9 py-3.5 md:py-4 rounded-xl text-primary-foreground/70 border border-primary-foreground/12 backdrop-blur-sm overflow-hidden"
                        style={{ background: "hsl(0 0% 100% / 0.04)" }}
                        whileHover={{
                          scale: 1.05,
                          borderColor: "hsl(0 0% 100% / 0.25)",
                          color: "hsl(0 0% 100% / 0.9)",
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span
                          className="absolute bottom-0 left-0 right-0 h-[1px]"
                          style={{
                            background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.15), transparent)",
                          }}
                        />
                        {slide.secondaryCta.text}
                      </motion.a>
                    )}
                  </div>
                </>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators + pause/play */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrentSlide(i); setProgress(0); }}
            className="relative h-1.5 rounded-full overflow-hidden transition-all duration-500"
            style={{
              width: i === currentSlide ? 40 : 12,
              background: "hsl(0 0% 100% / 0.15)",
            }}
            aria-label={`Slide ${i + 1}`}
          >
            {i === currentSlide && (
              <span
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                  boxShadow: "0 0 8px hsl(11 81% 57% / 0.5)",
                  transition: "width 50ms linear",
                }}
              />
            )}
            {i !== currentSlide && (
              <span
                className="absolute inset-0 rounded-full"
                style={{ background: "hsl(0 0% 100% / 0.25)" }}
              />
            )}
          </button>
        ))}
        <motion.button
          onClick={() => setIsPaused((p) => !p)}
          className="ml-2 flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary backdrop-blur-sm"
          style={{ background: "hsl(0 0% 100% / 0.06)" }}
          whileHover={{ scale: 1.15, borderColor: "hsl(0 0% 100% / 0.3)" }}
          whileTap={{ scale: 0.9 }}
          aria-label={isPaused ? "Retomar apresentação" : "Pausar apresentação"}
        >
          {isPaused ? (
            <Play className="w-3.5 h-3.5 text-primary ml-[1px]" />
          ) : (
            <Pause className="w-3.5 h-3.5 text-primary" />
          )}
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
