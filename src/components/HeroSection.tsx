import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const SLIDE_DURATION = 20000; // 20 seconds per video

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
    <section id="inicio" className="relative min-h-screen flex items-start overflow-hidden">
      {/* Background image fallback (always visible) */}
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
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/30 z-[3]" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-foreground/20 z-[3]" />

      {/* Animated ambient shapes */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, hsl(11 81% 57%) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-40 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.95] mb-8 uppercase tracking-tight">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="block">
              Líder em
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="block">
              mobilidade
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="block gradient-text">
              elétrica.
            </motion.span>
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-lg md:text-xl text-primary-foreground/60 mb-10 max-w-2xl leading-relaxed">
            A MS Eletric reúne soluções 100% elétricas para quem busca praticidade, economia e uma experiência completa — do atendimento ao pós-venda.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="text-base px-10 py-7 font-bold rounded-2xl glow-primary hover:scale-105 transition-transform gap-2" asChild>
              <a href="#modelos">
                Conheça nossos modelos
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="text-base px-8 py-7 font-bold rounded-2xl border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/40" asChild>
              <a href="#sobre">Sobre a marca</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentSlide ? "w-8 bg-primary" : "w-3 bg-primary-foreground/30 hover:bg-primary-foreground/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-3"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="text-xs text-primary-foreground/40 uppercase tracking-[0.3em] writing-vertical">scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-primary/60 to-transparent" />
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4 text-primary-foreground/40" />
        </motion.div>
      </motion.div>

      
    </section>
  );
};

export default HeroSection;
