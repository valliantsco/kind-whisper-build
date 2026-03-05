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
    tag: "Lorem Ipsum",
    tagIcon: "zap",
    headlineLines: [
      { text: "Consectetur", highlight: true },
      { text: "Adipiscing Elit", mobileOnly: true },
      { text: "Sed Eiusmod.", mobileOnly: true },
      { text: "Adipiscing Elit", desktopOnly: true },
      { text: "Sed Eiusmod.", desktopOnly: true },
    ],
    subheadline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    primaryCta: { text: "Dolor Sit Amet", href: "#modelos" },
  },
  {
    tag: "Tempor Incididunt",
    tagIcon: "shield",
    headlineLines: [
      { text: "Ut Labore" },
      { text: "Et Dolore", highlight: true },
      { text: "Magna Aliqua." },
    ],
    subheadline: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    primaryCta: { text: "Duis Aute Irure", href: "#contato" },
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
    <section id="inicio" className="relative flex items-center overflow-hidden" style={{ minHeight: "calc(75vh - 10px)" }}>
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
      <div className="relative z-10 container mx-auto px-4 pb-4 flex items-end" style={{ minHeight: "calc(75vh - 10px)" }}>
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

                  {/* Headline */}
                  <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground leading-[0.95] mb-3 md:mb-4 uppercase tracking-tight">
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
                  <p className="text-xs sm:text-sm md:text-base text-primary-foreground/50 mb-4 md:mb-5 max-w-md leading-relaxed tracking-wide">
                    {slide.subheadline}
                  </p>

                  {/* CTA */}
                  <motion.a
                    href={slide.primaryCta.href}
                    className="inline-flex items-center justify-center text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] px-5 md:px-7 py-2.5 md:py-3 rounded-xl overflow-visible"
                    style={{
                      background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                      color: "white",
                      boxShadow: "0 4px 20px hsl(11 81% 57% / 0.25)",
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 25px hsl(11 81% 57% / 0.5), 0 0 50px hsl(11 81% 57% / 0.2)",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {slide.primaryCta.text}
                  </motion.a>

                </>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
};

export default HeroSection;
