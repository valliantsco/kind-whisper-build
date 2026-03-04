import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const SLIDE_DURATION = 20000;

const VIDEOS = [
  { id: "ml6ODnWanys", title: "Video 1" },
  { id: "ml6ODnWanys", title: "Video 2" },
  { id: "ml6ODnWanys", title: "Video 3" },
];

const buildEmbedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3`;

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % VIDEOS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section id="inicio" className="relative min-h-[75vh] flex items-center overflow-hidden">
      {/* Background image fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Video slideshow background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <iframe
              src={buildEmbedUrl(VIDEOS[currentSlide].id)}
              className="absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] max-md:w-[400%] max-md:h-[400%]"
              style={{ border: 0, aspectRatio: '16/9' }}
              allow="autoplay; encrypted-media"
              title={VIDEOS[currentSlide].title}
            />
          </motion.div>
        </AnimatePresence>
      </div>

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

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Tag badge — pill eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-5 md:mb-6"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80 border border-primary-foreground/10 backdrop-blur-sm"
              style={{
                background: "hsl(0 0% 100% / 0.04)",
              }}
            >
              <Zap className="w-3 h-3 text-primary" />
              Energia que Move
            </span>
          </motion.div>

          {/* Headline — 2 lines, automotive premium */}
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[0.95] mb-5 md:mb-7 uppercase tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="block"
            >
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%), hsl(20 85% 60%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 20px hsl(11 81% 57% / 0.4))",
                }}
              >
                Liderando
              </span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="block sm:hidden"
            >
              a Nova Era
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="block sm:hidden"
            >
              Da Mobilidade.
            </motion.span>
            {/* Desktop: single line for "a Nova Era" + "Da Mobilidade." */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden sm:block"
            >
              a Nova Era
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden sm:block"
            >
              Da Mobilidade.
            </motion.span>
          </h1>

          {/* Subheadline — short, scannable */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-primary-foreground/50 mb-8 md:mb-10 max-w-xl leading-relaxed tracking-wide"
          >
            A MS Eletric reúne soluções em motos elétricas para quem busca economia, praticidade e uma experiência completa do atendimento ao pós-venda.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center gap-3 md:gap-4"
          >
            {/* Primary CTA */}
            <motion.a
              href="#modelos"
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
              Conheça os Modelos
            </motion.a>

            {/* Secondary CTA — outline/neutral */}
            <motion.a
              href="#sobre"
              className="relative inline-flex items-center justify-center text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.12em] px-6 md:px-9 py-3.5 md:py-4 rounded-xl text-primary-foreground/70 border border-primary-foreground/12 backdrop-blur-sm overflow-hidden"
              style={{
                background: "hsl(0 0% 100% / 0.04)",
              }}
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
              Sobre Nós
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide indicators — futuristic style */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
        {VIDEOS.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className="relative h-1.5 rounded-full transition-all duration-500"
            style={{
              width: i === currentSlide ? 32 : 12,
              background: i === currentSlide
                ? "linear-gradient(90deg, hsl(11 81% 57%), hsl(11 90% 65%))"
                : "hsl(0 0% 100% / 0.2)",
              boxShadow: i === currentSlide ? "0 0 12px hsl(11 81% 57% / 0.5)" : "none",
            }}
            whileHover={{
              background: i === currentSlide
                ? "linear-gradient(90deg, hsl(11 81% 57%), hsl(11 90% 65%))"
                : "hsl(0 0% 100% / 0.4)",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
