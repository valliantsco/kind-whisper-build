import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, ArrowRight, CircleDot, Route, Brain } from "lucide-react";
import QuizEngine from "@/components/quiz/QuizEngine";
import { msEletricQuizConfig } from "@/components/QuizSection";

const STEPS = [
  {
    num: "01",
    icon: CircleDot,
    title: "Perfil",
    desc: "Quem vai pilotar e como pretende usar",
  },
  {
    num: "02",
    icon: Route,
    title: "Rotina",
    desc: "Habilitação e faixa de investimento",
  },
  {
    num: "03",
    icon: Brain,
    title: "Resultado",
    desc: "IA indica o modelo ideal em segundos",
  },
];

const FLOATING_ELEMENTS = [
  { top: "10%", right: "6%", size: 15, delay: 0.2, opacity: 0.22 },
  { top: "60%", right: "4%", size: 13, delay: 1.6, opacity: 0.18 },
  { top: "30%", left: "4%", size: 14, delay: 0.9, opacity: 0.2 },
  { top: "75%", left: "6%", size: 16, delay: 2.2, opacity: 0.2 },
];

const QuizCta = () => {
  const [quizOpen, setQuizOpen] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <>
      <section
        className="relative py-14 md:py-20 overflow-hidden"
        style={{ background: "hsl(0 0% 4%)" }}
      >
        {/* ── Layered background (matching other sections) ── */}
        <div
          className="absolute -top-20 right-[10%] w-[1000px] h-[600px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[700px] h-[700px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.05) 0%, transparent 55%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--primary) / 0.03) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Diagonal gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(160deg, hsl(0 0% 100% / 0.015) 0%, transparent 35%, hsl(var(--primary) / 0.025) 100%)",
          }}
        />

        {/* Top-left accent line */}
        <div
          className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[3px]"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--primary) / 0.6), transparent)",
          }}
        />
        {/* Bottom-right accent line */}
        <div
          className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[3px]"
          style={{
            background:
              "linear-gradient(270deg, hsl(var(--primary) / 0.6), transparent)",
          }}
        />

        {/* ── Floating animated elements ── */}
        {FLOATING_ELEMENTS.map((el, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              top: el.top,
              left: (el as any).left,
              right: (el as any).right,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [el.opacity, el.opacity * 1.6, el.opacity],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut",
            }}
          >
            {i % 2 === 0 ? (
              <Sparkles
                className="text-primary"
                style={{ width: el.size, height: el.size }}
              />
            ) : (
              <Zap
                className="text-primary"
                style={{ width: el.size, height: el.size }}
              />
            )}
          </motion.div>
        ))}

        <div className="container mx-auto px-4 relative">
          {/* ── Header (right-aligned, matching WhyChoose / MediaCoverage) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 md:mb-16 text-right"
          >
            <div className="flex items-center gap-3 mb-6 justify-end">
              <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
                Quiz · 1 min
              </span>
              <div className="w-8 h-px bg-primary" />
            </div>

            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
              Qual veículo combina{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                }}
              >
                com a sua rotina?
              </span>
            </h2>

            <p className="text-sm md:text-base text-primary-foreground/45 leading-relaxed mt-4 max-w-lg ml-auto">
              Perfil de uso, habilitação e orçamento — a IA cruza tudo e indica
              o modelo ideal. Sem cadastro, resultado imediato.
            </p>
          </motion.div>

          {/* ── Steps cards (matching WhyChoose card style) ── */}
          <div className="grid sm:grid-cols-3 gap-4 md:gap-5 mb-12">
            {STEPS.map((step, i) => {
              const isHovered = hoveredStep === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className="group"
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
                      {/* Icon */}
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
                        <step.icon className="w-5 h-5 relative z-10 text-primary" />
                      </motion.div>

                      {/* Step number */}
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
                        {step.num}
                      </motion.p>

                      {/* Title */}
                      <h3 className="font-display font-bold text-[13px] text-primary-foreground/85 uppercase tracking-[0.12em] mb-3">
                        {step.title}
                      </h3>

                      {/* Divider */}
                      <div
                        className="h-px mb-4 transition-all duration-500"
                        style={{
                          background: `linear-gradient(90deg, hsl(var(--primary) / ${
                            isHovered ? 0.4 : 0.1
                          }), transparent)`,
                          width: isHovered ? "80%" : "40%",
                        }}
                      />

                      {/* Description */}
                      <p className="text-primary-foreground/35 text-xs leading-relaxed group-hover:text-primary-foreground/50 transition-colors duration-300">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── CTA (right-aligned) ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-right"
          >
            <motion.button
              onClick={() => setQuizOpen(true)}
              className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wide px-10 py-4 rounded-xl text-primary-foreground cursor-pointer"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                boxShadow:
                  "0 4px 24px hsl(var(--primary) / 0.3), 0 1px 0 inset hsl(0 0% 100% / 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="w-4 h-4" />
              Começar agora
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <p className="text-[11px] text-primary-foreground/25 mt-3 tracking-wide">
              Sem cadastro · resultado imediato
            </p>
          </motion.div>
        </div>
      </section>

      <QuizEngine
        config={msEletricQuizConfig}
        open={quizOpen}
        onOpenChange={setQuizOpen}
      />
    </>
  );
};

export default QuizCta;
