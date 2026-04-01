import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, User, Route, CreditCard, FileCheck } from "lucide-react";
import QuizEngine from "@/components/quiz/QuizEngine";
import { msEletricQuizConfig } from "@/components/QuizSection";

const TIMELINE = [
  { n: "01", label: "Perfil", desc: "Quem vai pilotar", icon: User },
  { n: "02", label: "Uso", desc: "Rotina e finalidade", icon: Route },
  { n: "03", label: "CNH", desc: "Habilitação atual", icon: FileCheck },
  { n: "04", label: "Investimento", desc: "Faixa de orçamento", icon: CreditCard },
];

const QuizCta = () => {
  const [quizOpen, setQuizOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <>
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: "hsl(0 0% 2.5%)" }}
      >
        {/* ── Cinematic background layers ── */}

        {/* Large conic sweep */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "conic-gradient(from 220deg at 65% 35%, hsl(var(--primary) / 0.1) 0deg, transparent 50deg, hsl(var(--primary) / 0.03) 160deg, transparent 240deg, hsl(var(--primary) / 0.06) 320deg, transparent 360deg)",
            filter: "blur(100px)",
          }}
        />

        {/* Radial spotlight */}
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, hsl(var(--primary) / 0.12) 0%, transparent 50%)",
            filter: "blur(80px)",
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Horizontal light strip with glow */}
        <motion.div
          className="absolute top-[45%] left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, hsl(var(--primary) / 0.15) 25%, hsl(var(--primary) / 0.35) 50%, hsl(var(--primary) / 0.15) 75%, transparent 95%)",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Glow behind light strip */}
        <div
          className="absolute top-[44%] left-[15%] right-[15%] h-12 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.06), transparent)",
            filter: "blur(20px)",
          }}
        />

        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 w-full h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 20%, hsl(var(--primary) / 0.4) 50%, transparent 80%)",
          }}
        />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            {/* ── Eyebrow ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-14 justify-end"
            >
              <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
                Quiz · 60 segundos
              </span>
              <div className="w-8 h-px bg-primary" />
            </motion.div>

            {/* ── Hero split ── */}
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
              {/* Left: typographic hero */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="font-display font-black text-[2.8rem] md:text-[3.8rem] lg:text-[4.5rem] text-primary-foreground uppercase tracking-tight leading-[0.9]">
                  Qual
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                    }}
                  >
                    veículo
                  </span>
                  <br />
                  combina
                  <br />
                  com você?
                </h2>

                <p className="text-primary-foreground/40 text-sm md:text-[15px] leading-relaxed mt-6 max-w-xs">
                  A inteligência artificial analisa suas respostas e recomenda o
                  modelo perfeito para o seu dia a dia.
                </p>

                {/* CTA */}
                <motion.button
                  onClick={() => setQuizOpen(true)}
                  className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wide px-9 py-4 rounded-xl text-primary-foreground cursor-pointer mt-8"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                    boxShadow:
                      "0 6px 30px hsl(var(--primary) / 0.35), 0 1px 0 inset hsl(0 0% 100% / 0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles className="w-4 h-4" />
                  Começar agora
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <p className="text-[11px] text-primary-foreground/20 tracking-wide mt-3">
                  Sem cadastro · resultado imediato
                </p>
              </motion.div>

              {/* Right: interactive timeline cards */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative"
              >
                {/* Vertical connector line */}
                <div
                  className="absolute left-5 top-4 bottom-4 w-px hidden md:block"
                  style={{
                    background:
                      "linear-gradient(180deg, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.08), transparent)",
                  }}
                />

                <div className="space-y-3">
                  {TIMELINE.map((step, i) => {
                    const isActive = activeStep === i;
                    const Icon = step.icon;

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                        onMouseEnter={() => setActiveStep(i)}
                        onMouseLeave={() => setActiveStep(null)}
                        className="relative cursor-default"
                      >
                        <div
                          className="relative rounded-xl p-5 pl-14 transition-all duration-400 overflow-hidden"
                          style={{
                            background: isActive
                              ? "hsl(0 0% 100% / 0.04)"
                              : "hsl(0 0% 100% / 0.015)",
                            border: `1px solid ${
                              isActive
                                ? "hsl(var(--primary) / 0.25)"
                                : "hsl(0 0% 100% / 0.04)"
                            }`,
                            transform: isActive
                              ? "translateX(8px)"
                              : "translateX(0)",
                            boxShadow: isActive
                              ? "0 8px 40px -12px hsl(var(--primary) / 0.15), inset 0 1px 0 hsl(0 0% 100% / 0.03)"
                              : "none",
                          }}
                        >
                          {/* Left glow on active */}
                          <div
                            className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl transition-all duration-400"
                            style={{
                              background: isActive
                                ? "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--primary-glow)))"
                                : "transparent",
                              boxShadow: isActive
                                ? "0 0 12px hsl(var(--primary) / 0.4)"
                                : "none",
                            }}
                          />

                          {/* Icon circle */}
                          <div
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                            style={{
                              background: isActive
                                ? "hsl(var(--primary) / 0.15)"
                                : "hsl(0 0% 100% / 0.04)",
                              border: `1px solid ${
                                isActive
                                  ? "hsl(var(--primary) / 0.3)"
                                  : "hsl(0 0% 100% / 0.06)"
                              }`,
                            }}
                          >
                            <Icon
                              className="w-3.5 h-3.5 transition-colors duration-300"
                              style={{
                                color: isActive
                                  ? "hsl(var(--primary))"
                                  : "hsl(0 0% 100% / 0.25)",
                              }}
                            />
                          </div>

                          {/* Content */}
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <div className="flex items-baseline gap-3">
                                <span
                                  className="text-[10px] font-bold uppercase tracking-[0.2em] tabular-nums transition-colors duration-300"
                                  style={{
                                    color: isActive
                                      ? "hsl(var(--primary))"
                                      : "hsl(0 0% 100% / 0.15)",
                                  }}
                                >
                                  {step.n}
                                </span>
                                <span
                                  className="font-display font-bold text-sm uppercase tracking-[0.08em] transition-colors duration-300"
                                  style={{
                                    color: isActive
                                      ? "hsl(var(--primary-foreground))"
                                      : "hsl(0 0% 100% / 0.5)",
                                  }}
                                >
                                  {step.label}
                                </span>
                              </div>
                              <p
                                className="text-[11px] mt-0.5 transition-colors duration-300"
                                style={{
                                  color: isActive
                                    ? "hsl(0 0% 100% / 0.4)"
                                    : "hsl(0 0% 100% / 0.2)",
                                }}
                              >
                                {step.desc}
                              </p>
                            </div>

                            {/* Arrow indicator */}
                            <motion.div
                              animate={{
                                opacity: isActive ? 1 : 0,
                                x: isActive ? 0 : -8,
                              }}
                              transition={{ duration: 0.25 }}
                            >
                              <ArrowRight
                                className="w-4 h-4"
                                style={{ color: "hsl(var(--primary) / 0.5)" }}
                              />
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-5 flex justify-end"
                >
                  <span
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full"
                    style={{
                      color: "hsl(var(--primary) / 0.7)",
                      background: "hsl(var(--primary) / 0.05)",
                      border: "1px solid hsl(var(--primary) / 0.1)",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: "hsl(var(--primary))" }}
                    />
                    Powered by AI
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[3px]"
          style={{
            background:
              "linear-gradient(270deg, hsl(var(--primary) / 0.5), transparent)",
          }}
        />
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
