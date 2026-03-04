import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const YOUTUBE_EMBED = `https://www.youtube.com/embed/ml6ODnWanys?autoplay=1&mute=1&loop=1&playlist=ml6ODnWanys&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3`;

/* Floating particle dot */
const FloatingDot = ({
  size,
  top,
  delay,
  duration,
  fromX,
  toX,
  opacity,
}: {
  size: number;
  top: string;
  delay: number;
  duration: number;
  fromX: string;
  toX: string;
  opacity: [number, number, number];
}) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      background: `hsl(11 81% 57% / ${opacity[1]})`,
      filter: `blur(${size < 6 ? 0.5 : 1}px)`,
      top,
    }}
    animate={{ left: [fromX, toX, fromX], opacity }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-start overflow-hidden">
      {/* Background image fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Video background */}
      <div className="absolute inset-0">
        <iframe
          src={YOUTUBE_EMBED}
          className="absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] max-md:w-[400%] max-md:h-[400%]"
          style={{ border: 0, aspectRatio: "16/9" }}
          allow="autoplay; encrypted-media"
          title="Hero video"
        />
      </div>

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/30 z-[3]" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-foreground/20 z-[3]" />

      {/* === Orbiting orange glow effects (matching header) === */}
      <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
        {/* Primary large glow — slow drift */}
        <motion.div
          className="absolute w-[400px] h-[200px] md:w-[600px] md:h-[250px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, hsl(11 81% 57% / 0.12) 0%, hsl(11 90% 65% / 0.04) 50%, transparent 80%)",
            filter: "blur(60px)",
            top: "20%",
          }}
          animate={{ left: ["-15%", "80%", "-15%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Secondary glow — opposite direction */}
        <motion.div
          className="absolute w-[250px] h-[120px] md:w-[400px] md:h-[150px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, hsl(11 90% 65% / 0.1) 0%, hsl(20 80% 55% / 0.03) 60%, transparent 85%)",
            filter: "blur(40px)",
            top: "60%",
          }}
          animate={{ left: ["100%", "-10%", "100%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Bottom warm glow */}
        <motion.div
          className="absolute w-[300px] h-[100px] md:w-[500px] md:h-[150px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, hsl(20 80% 55% / 0.08) 0%, transparent 75%)",
            filter: "blur(40px)",
            bottom: "15%",
          }}
          animate={{ left: ["10%", "65%", "10%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />

        {/* Floating dot particles */}
        <FloatingDot size={8} top="25%" delay={0} duration={24} fromX="5%" toX="85%" opacity={[0.15, 0.4, 0.15]} />
        <FloatingDot size={5} top="45%" delay={3} duration={20} fromX="80%" toX="10%" opacity={[0.1, 0.35, 0.1]} />
        <FloatingDot size={6} top="70%" delay={6} duration={18} fromX="20%" toX="75%" opacity={[0.12, 0.3, 0.12]} />
        <FloatingDot size={4} top="35%" delay={8} duration={22} fromX="60%" toX="15%" opacity={[0.08, 0.25, 0.08]} />
        <FloatingDot size={3} top="80%" delay={2} duration={16} fromX="40%" toX="90%" opacity={[0.1, 0.28, 0.1]} />
      </div>

      {/* === Glass panel behind content === */}
      <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-40 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Glassmorphism card */}
          <motion.div
            className="relative rounded-2xl p-8 md:p-12 overflow-hidden"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          >
            {/* Glass background */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "hsl(0 0% 10% / 0.35)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }}
            />

            {/* Gradient border (light strip) */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                padding: "1px",
                background:
                  "linear-gradient(135deg, hsl(11 81% 57% / 0.4), hsl(11 90% 65% / 0.15), transparent 50%, hsl(11 81% 57% / 0.2))",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* Animated light strip along top edge */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, hsl(11 81% 57% / 0.7) 30%, hsl(11 90% 65% / 0.8) 50%, hsl(11 81% 57% / 0.7) 70%, transparent 100%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner glow accent */}
            <div
              className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{
                background: "radial-gradient(circle at top right, hsl(11 81% 57% / 0.08), transparent 60%)",
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Tag line chip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
                style={{
                  background: "hsl(11 81% 57% / 0.12)",
                  border: "1px solid hsl(11 81% 57% / 0.25)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                    boxShadow: "0 0 8px hsl(11 81% 57% / 0.6)",
                  }}
                />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
                  Mobilidade do futuro
                </span>
              </motion.div>

              <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.95] mb-8 uppercase tracking-tight">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="block"
                >
                  Líder em
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="block"
                >
                  mobilidade
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="block gradient-text"
                >
                  elétrica.
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg md:text-xl text-primary-foreground/60 mb-10 max-w-2xl leading-relaxed"
              >
                A MS Eletric reúne soluções 100% elétricas para quem busca praticidade,
                economia e uma experiência completa — do atendimento ao pós-venda.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Button
                  size="lg"
                  className="text-base px-10 py-7 font-bold rounded-2xl glow-primary hover:scale-105 transition-transform gap-2"
                  asChild
                >
                  <a href="#modelos">
                    Conheça nossos modelos
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 py-7 font-bold rounded-2xl border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/40"
                  asChild
                >
                  <a href="#sobre">Sobre a marca</a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-3"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="text-xs text-primary-foreground/40 uppercase tracking-[0.3em] writing-vertical">
          scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-primary/60 to-transparent" />
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4 text-primary-foreground/40" />
        </motion.div>
      </motion.div>

      {/* Bottom light strip */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] z-[6]"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.5), hsl(11 90% 65% / 0.6), hsl(11 81% 57% / 0.5), transparent)",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
};

export default HeroSection;
