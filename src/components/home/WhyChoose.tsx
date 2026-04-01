import { motion } from "framer-motion";
import { Shield, Wrench, Clock, Award, ArrowRight } from "lucide-react";
import { useState } from "react";

const PILLARS = [
  {
    icon: Shield,
    title: "Garantia de Fábrica",
    stat: "2 anos",
    description:
      "Mais segurança para comprar com tranquilidade e contar com respaldo desde o início da sua experiência com a marca.",
  },
  {
    icon: Wrench,
    title: "Assistência Especializada",
    stat: "100%",
    description:
      "Nosso time acompanha você antes, durante e depois da compra, com orientação clara e suporte para cada etapa.",
  },
  {
    icon: Clock,
    title: "Em Expansão",
    stat: "PORTFÓLIO",
    description:
      "A MS Eletric acompanha a evolução do mercado para oferecer modelos que atendem da rotina urbana ao uso profissional.",
  },
  {
    icon: Award,
    title: "Consultivo de Verdade",
    stat: "ATENDIMENTO",
    description:
      "Aqui a recomendação não é genérica. A gente entende sua necessidade para indicar o modelo mais adequado para a sua rotina.",
  },
];

const WhyChoose = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="por-que" className="relative py-14 md:py-20 overflow-hidden">
      {/* ── Section-specific effect: concentric shield rings ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[280, 420, 560].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              top: `calc(50% - ${size / 2}px)`,
              left: `calc(50% - ${size / 2}px)`,
              border: `1px solid hsl(var(--primary) / ${0.04 - i * 0.01})`,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 1, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Vertical accent line — left side, suggests stability */}
      <motion.div
        className="absolute left-[8%] top-[10%] w-[1px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.12), transparent)" }}
        initial={{ height: 0 }}
        whileInView={{ height: "80%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="container mx-auto px-4 relative">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16 text-right"
        >
          <div className="flex items-center gap-3 mb-6 justify-end">
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
              Diferenciais
            </span>
            <div className="w-8 h-px bg-primary" />
          </div>

          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
            Por que escolher a{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
              }}
            >
              MS Electric
            </span>
          </h2>

          <p className="text-sm md:text-base text-primary-foreground/45 leading-relaxed mt-4 max-w-lg ml-auto">
            Mais do que oferecer veículos elétricos, a MS Electric entrega confiança, suporte e uma experiência de compra consultiva para quem quer investir com mais segurança.
          </p>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {PILLARS.map((pillar, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group block"
              >
                <div
                  className="h-full rounded-xl overflow-hidden transition-all duration-300 p-5 relative"
                  style={{
                    background: "hsl(0 0% 100% / 0.025)",
                    border: `1px solid ${
                      isHovered
                        ? "hsl(var(--primary) / 0.25)"
                        : "hsl(0 0% 100% / 0.06)"
                    }`,
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: isHovered
                      ? "0 20px 50px -15px hsl(var(--primary) / 0.12)"
                      : "none",
                  }}
                >
                  {/* Hover glow overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(ellipse at 30% 20%, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, hsl(var(--primary) / ${
                        isHovered ? 0.6 : 0.05
                      }), transparent)`,
                    }}
                  />

                  <div className="relative">
                    <motion.div
                      className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 relative"
                      style={{
                        background: "hsl(var(--primary) / 0.1)",
                        border: "1px solid hsl(var(--primary) / 0.12)",
                      }}
                      animate={
                        isHovered
                          ? { scale: 1.08, rotate: 3 }
                          : { scale: 1, rotate: 0 }
                      }
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div
                        className="absolute inset-0 rounded-lg transition-opacity duration-500"
                        style={{
                          background:
                            "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)",
                          filter: "blur(6px)",
                          opacity: isHovered ? 1 : 0,
                        }}
                      />
                      <pillar.icon className="w-5 h-5 relative z-10 text-primary" />
                    </motion.div>

                    <motion.p
                      className="font-display font-black text-3xl md:text-4xl mb-1 bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                      }}
                      animate={
                        isHovered
                          ? { scale: 1.05, x: 4 }
                          : { scale: 1, x: 0 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      {pillar.stat}
                    </motion.p>

                    <h3 className="font-display font-bold text-[13px] text-primary-foreground/85 uppercase tracking-[0.12em] mb-3">
                      {pillar.title}
                    </h3>

                    <div
                      className="h-px mb-4 transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, hsl(var(--primary) / ${
                          isHovered ? 0.4 : 0.1
                        }), transparent)`,
                        width: isHovered ? "80%" : "40%",
                      }}
                    />

                    <p className="text-primary-foreground/35 text-xs leading-relaxed group-hover:text-primary-foreground/50 transition-colors duration-300 line-clamp-3">
                      {pillar.description}
                    </p>

                    <motion.div
                      className="flex items-center gap-1 mt-4 text-primary"
                      initial={{ opacity: 0, x: -8 }}
                      animate={
                        isHovered
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -8 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wider">
                        Saiba mais
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
