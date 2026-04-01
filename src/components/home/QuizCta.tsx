import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CircleDot, Route, Zap } from "lucide-react";
import QuizEngine from "@/components/quiz/QuizEngine";
import { msEletricQuizConfig } from "@/components/QuizSection";

const STEPS = [
  {
    num: "01",
    icon: CircleDot,
    title: "Perfil",
    desc: "Conte como pretende usar",
  },
  {
    num: "02",
    icon: Route,
    title: "Rotina",
    desc: "Distância, terreno e orçamento",
  },
  {
    num: "03",
    icon: Zap,
    title: "Resultado",
    desc: "Modelo ideal em segundos",
  },
];

const QuizCta = () => {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: "hsl(0 0% 3%)" }}
      >
        {/* ── Ambient glow ── */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--primary) / 0.07) 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />

        {/* Horizontal rule top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.06), transparent)",
          }}
        />

        <div className="container mx-auto px-4 relative">
          {/* ── Centered layout ── */}
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
                style={{
                  color: "hsl(var(--primary))",
                  background: "hsl(var(--primary) / 0.08)",
                  border: "1px solid hsl(var(--primary) / 0.15)",
                }}
              >
                <Sparkles className="w-3 h-3" />
                Quiz · 1 min
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-3xl md:text-4xl lg:text-[3.25rem] text-primary-foreground uppercase tracking-tight leading-[1.05] mb-4"
            >
              Qual veículo combina
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                }}
              >
                com a sua rotina?
              </span>
            </motion.h2>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-primary-foreground/40 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-12"
            >
              Três perguntas rápidas e a IA encontra o modelo certo
              para o seu perfil de uso e orçamento.
            </motion.p>

            {/* ── Steps row ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="grid grid-cols-3 gap-3 md:gap-5 mb-12 max-w-xl mx-auto"
            >
              {STEPS.map((step, i) => (
                <div key={i} className="relative group">
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="hidden md:block absolute top-5 left-[calc(50%+20px)] w-[calc(100%-20px)] h-px"
                      style={{
                        background:
                          "linear-gradient(90deg, hsl(var(--primary) / 0.25), hsl(0 0% 100% / 0.04))",
                      }}
                    />
                  )}

                  <div className="flex flex-col items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          i === 2
                            ? "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.08))"
                            : "hsl(0 0% 100% / 0.04)",
                        border: `1px solid ${
                          i === 2
                            ? "hsl(var(--primary) / 0.3)"
                            : "hsl(0 0% 100% / 0.06)"
                        }`,
                      }}
                    >
                      <step.icon
                        className="w-4 h-4"
                        style={{
                          color:
                            i === 2
                              ? "hsl(var(--primary))"
                              : "hsl(0 0% 100% / 0.35)",
                        }}
                      />
                    </div>

                    <div className="text-center">
                      <span
                        className="block text-[9px] font-bold uppercase tracking-[0.2em] mb-0.5"
                        style={{
                          color:
                            i === 2
                              ? "hsl(var(--primary) / 0.7)"
                              : "hsl(0 0% 100% / 0.2)",
                        }}
                      >
                        {step.num}
                      </span>
                      <p className="text-[11px] md:text-xs font-semibold text-primary-foreground/70">
                        {step.title}
                      </p>
                      <p className="text-[10px] text-primary-foreground/30 mt-0.5 hidden md:block">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <motion.button
                onClick={() => setQuizOpen(true)}
                className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.12em] px-10 py-4 rounded-xl text-primary-foreground cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                  boxShadow:
                    "0 4px 24px hsl(var(--primary) / 0.3), 0 1px 0 inset hsl(0 0% 100% / 0.1)",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Começar agora
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <p className="text-[11px] text-primary-foreground/25 mt-4 tracking-wide">
                Sem cadastro · resultado imediato
              </p>
            </motion.div>
          </div>
        </div>

        {/* Horizontal rule bottom */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.06), transparent)",
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
