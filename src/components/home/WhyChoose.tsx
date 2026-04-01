import { motion } from "framer-motion";
import { Shield, Wrench, Clock, Award, ArrowRight } from "lucide-react";
import { useState } from "react";

const PILLARS = [
  {
    icon: Shield,
    title: "Garantia de Fábrica",
    stat: "2 anos",
    description:
      "Todos os veículos AIMA contam com 2 anos de garantia de fábrica, com suporte direto e assistência técnica local em Uberlândia.",
  },
  {
    icon: Wrench,
    title: "Assistência Especializada",
    stat: "100%",
    description:
      "Equipe técnica treinada pela AIMA com peças de reposição originais. Manutenção preventiva e corretiva completa.",
  },
  {
    icon: Clock,
    title: "Experiência de Mercado",
    stat: "AIMA",
    description:
      "Revendedora autorizada da AIMA, líder mundial em veículos elétricos com mais de 8 bases de produção certificadas ISO 9001.",
  },
  {
    icon: Award,
    title: "Atendimento Consultivo",
    stat: "19+",
    description:
      "Mais de 19 modelos no portfólio. Atendimento personalizado para encontrar o veículo ideal para seu perfil de uso.",
  },
];

const WhyChoose = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="por-que" className="relative py-14 md:py-20 overflow-hidden">
      {/* ── Section-specific effect: shield / trust pattern ── */}
      {/* Hexagonal grid pattern suggesting security/trust */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='white' stroke-width='1'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "56px 100px",
        }}
      />

      {/* Vertical accent line — left side, suggests stability */}
      <motion.div
        className="absolute left-[8%] top-[10%] w-[1px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.15), transparent)" }}
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
            Por que comprar na{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
              }}
            >
              MS Eletric
            </span>
          </h2>

          <p className="text-sm md:text-base text-primary-foreground/45 leading-relaxed mt-4 max-w-lg ml-auto">
            Compromisso com qualidade, suporte e inovação em cada detalhe.
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
