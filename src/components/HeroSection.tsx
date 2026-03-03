import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

const YOUTUBE_EMBED = "https://www.youtube.com/embed/ml6ODnWanys?autoplay=1&mute=1&loop=1&playlist=ml6ODnWanys&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3";

const HeroSection = () => {

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <iframe
          src={YOUTUBE_EMBED}
          className="absolute inset-0 w-[300%] h-[300%] -top-[100%] -left-[100%] pointer-events-none"
          style={{ border: 0 }}
          allow="autoplay; encrypted-media"
          title="Hero video"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-foreground/20" />
      </div>

      {/* Animated ambient shapes */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, hsl(11 81% 57%) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-semibold text-primary-foreground uppercase tracking-[0.2em]">Mobilidade elétrica</span>
          </motion.div>

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

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
};

export default HeroSection;
