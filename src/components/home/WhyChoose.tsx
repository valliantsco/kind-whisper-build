import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Shield, Wrench, Clock, Award, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const PILLARS = [
  { icon: Shield, title: "Garantia de Fábrica", stat: "2 anos", description: "Todos os veículos AIMA contam com 2 anos de garantia de fábrica, com suporte direto e assistência técnica local em Uberlândia.", accent: "11 81% 57%" },
  { icon: Wrench, title: "Assistência Especializada", stat: "100%", description: "Equipe técnica treinada pela AIMA com peças de reposição originais. Manutenção preventiva e corretiva completa.", accent: "15 85% 60%" },
  { icon: Clock, title: "Experiência de Mercado", stat: "AIMA", description: "Revendedora autorizada da AIMA, líder mundial em veículos elétricos com mais de 8 bases de produção certificadas ISO 9001.", accent: "20 80% 55%" },
  { icon: Award, title: "Atendimento Consultivo", stat: "19+", description: "Mais de 19 modelos no portfólio. Atendimento personalizado para encontrar o veículo ideal para seu perfil de uso.", accent: "8 78% 52%" },
];

const WhyChoose = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to shooting star line width (0% to 100%)
  const lineWidth = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);
  const glowX = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);

  // Track which card the line has reached
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const progress = (v - 0.15) / 0.7; // normalize to 0-1
    const cardIdx = Math.floor(progress * 4);
    setActiveCard(Math.min(cardIdx, 3));
  });

  return (
    <section
      ref={sectionRef}
      id="por-que"
      className="relative overflow-hidden"
      style={{ background: "hsl(0 0% 7%)", height: "250vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* ── Layered background effects ── */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 60%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 80% 100%, hsl(var(--primary) / 0.04) 0%, transparent 55%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Top-left accent line */}
        <div
          className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[3px]"
          style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.6), transparent)" }}
        />
        {/* Bottom-right accent line */}
        <div
          className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[3px]"
          style={{ background: "linear-gradient(270deg, hsl(var(--primary) / 0.6), transparent)" }}
        />

        <div className="container mx-auto px-4 relative">
          {/* ── Header ── */}
          <motion.div
            className="text-center mb-14 md:mb-20"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
              style={{
                background: "hsl(var(--primary) / 0.08)",
                color: "hsl(var(--primary))",
                border: "1px solid hsl(var(--primary) / 0.15)",
                backdropFilter: "blur(12px)",
              }}
            >
              Diferenciais
            </motion.span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
              Por que comprar na{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
              >
                MS Eletric
              </span>
            </h2>
            <p className="text-sm md:text-base text-primary-foreground/40 leading-relaxed mt-4 max-w-md mx-auto">
              Compromisso com qualidade, suporte e inovação em cada detalhe.
            </p>
          </motion.div>

          {/* ── Shooting star line ── */}
          <div className="relative mb-8 hidden lg:block">
            {/* Track background */}
            <div
              className="h-[2px] w-full rounded-full"
              style={{ background: "hsl(0 0% 100% / 0.04)" }}
            />
            {/* Animated line */}
            <motion.div
              className="absolute top-0 left-0 h-[2px] rounded-full"
              style={{
                width: lineWidth,
                background: "linear-gradient(90deg, hsl(var(--primary) / 0.1), hsl(var(--primary)), hsl(var(--primary-glow)))",
              }}
            />
            {/* Shooting star head (glow dot) */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: lineWidth,
                marginLeft: "-8px",
              }}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  background: "hsl(var(--primary))",
                  boxShadow: "0 0 20px 6px hsl(var(--primary) / 0.5), 0 0 60px 15px hsl(var(--primary) / 0.2)",
                }}
              />
            </motion.div>
            {/* Card position markers */}
            {PILLARS.map((_, i) => {
              const pos = `${12.5 + i * 25}%`;
              const reached = i <= activeCard;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500"
                  style={{ left: pos }}
                >
                  <div
                    className="w-3 h-3 rounded-full transition-all duration-500"
                    style={{
                      background: reached ? "hsl(var(--primary))" : "hsl(0 0% 20%)",
                      boxShadow: reached ? "0 0 12px 3px hsl(var(--primary) / 0.4)" : "none",
                      transform: reached ? "scale(1.3)" : "scale(1)",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* ── Cards grid ── */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {PILLARS.map((pillar, i) => {
              const isHovered = hoveredIdx === i;
              const isReached = i <= activeCard;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.4, y: 30 }}
                  animate={{
                    opacity: isReached ? 1 : 0.35,
                    y: isReached ? 0 : 20,
                    scale: isReached ? 1 : 0.96,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="relative rounded-2xl overflow-hidden cursor-default group"
                  style={{
                    background: "hsl(0 0% 9%)",
                    border: `1px solid ${isHovered ? `hsl(${pillar.accent} / 0.3)` : isReached ? `hsl(${pillar.accent} / 0.12)` : "hsl(0 0% 100% / 0.04)"}`,
                    transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                    boxShadow: isHovered
                      ? `0 20px 60px -15px hsl(${pillar.accent} / 0.15), 0 0 0 1px hsl(${pillar.accent} / 0.1)`
                      : isReached
                        ? `0 8px 30px -10px hsl(${pillar.accent} / 0.1)`
                        : "0 4px 20px -5px hsl(0 0% 0% / 0.3)",
                  }}
                >
                  {/* Hover glow overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse at 30% 20%, hsl(${pillar.accent} / ${isHovered ? 0.08 : 0}) 0%, transparent 70%)`,
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, hsl(${pillar.accent} / ${isReached ? (isHovered ? 0.7 : 0.4) : 0.08}), transparent)`,
                    }}
                  />

                  <div className="relative p-7">
                    {/* Icon */}
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative"
                      style={{
                        background: `hsl(${pillar.accent} / 0.08)`,
                        border: `1px solid hsl(${pillar.accent} / 0.12)`,
                      }}
                      animate={isHovered ? { scale: 1.05, rotate: 3 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div
                        className="absolute inset-0 rounded-2xl transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle, hsl(${pillar.accent} / 0.2) 0%, transparent 70%)`,
                          filter: "blur(8px)",
                          opacity: isHovered ? 1 : 0,
                        }}
                      />
                      <pillar.icon
                        className="w-6 h-6 relative z-10 transition-colors duration-300"
                        style={{ color: `hsl(${pillar.accent})` }}
                      />
                    </motion.div>

                    {/* Stat */}
                    <motion.p
                      className="font-display font-black text-4xl mb-1 bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(135deg, hsl(${pillar.accent}), hsl(${pillar.accent} / 0.7))`,
                      }}
                      animate={isHovered ? { scale: 1.05, x: 4 } : { scale: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {pillar.stat}
                    </motion.p>

                    {/* Title */}
                    <h3 className="font-display font-bold text-[13px] text-primary-foreground/90 uppercase tracking-[0.12em] mb-3">
                      {pillar.title}
                    </h3>

                    {/* Divider */}
                    <div
                      className="h-px mb-4 transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, hsl(${pillar.accent} / ${isHovered ? 0.4 : 0.1}), transparent)`,
                        width: isHovered ? "80%" : "40%",
                      }}
                    />

                    {/* Description */}
                    <p className="text-primary-foreground/35 text-sm leading-relaxed group-hover:text-primary-foreground/50 transition-colors duration-400">
                      {pillar.description}
                    </p>

                    {/* CTA hint */}
                    <motion.div
                      className="flex items-center gap-1.5 mt-5"
                      style={{ color: `hsl(${pillar.accent})` }}
                      initial={{ opacity: 0, x: -8 }}
                      animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wider">Saiba mais</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
