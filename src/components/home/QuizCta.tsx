import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, ArrowRight, Brain, MessageCircle, CheckCircle } from "lucide-react";
import QuizEngine from "@/components/quiz/QuizEngine";
import { msEletricQuizConfig } from "@/components/QuizSection";

const FLOATING_ELEMENTS = [
  { top: "8%", right: "6%", size: 16, delay: 0, opacity: 0.25 },
  { top: "55%", right: "4%", size: 14, delay: 1.5, opacity: 0.2 },
  { top: "25%", left: "4%", size: 12, delay: 0.8, opacity: 0.18 },
  { top: "70%", left: "7%", size: 18, delay: 2, opacity: 0.22 },
];

const STEPS = [
  {
    icon: MessageCircle,
    title: "Responda perguntas rápidas",
    detail: "Sobre seu perfil de uso, necessidades e preferências — leva menos de 1 minuto.",
  },
  {
    icon: Brain,
    title: "A IA analisa seu cenário",
    detail: "Nossa inteligência artificial cruza suas respostas com todo o portfólio para encontrar o match ideal.",
  },
  {
    icon: CheckCircle,
    title: "Receba sua recomendação",
    detail: "O modelo perfeito para você, com especificações completas, direto no seu WhatsApp.",
  },
];

const QuizCta = () => {
  const [quizOpen, setQuizOpen] = useState(false);

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
          {/* ── Header (matching other sections) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 md:mb-16 text-right"
          >
            <div className="flex items-center gap-3 mb-6 justify-end">
              <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
                Recomendação por IA
              </span>
              <div className="w-8 h-px bg-primary" />
            </div>

            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
              Não sabe qual{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                }}
              >
                modelo escolher
              </span>
              ?
            </h2>

            <p className="text-sm md:text-base text-primary-foreground/45 leading-relaxed mt-4 max-w-lg ml-auto">
              Nossa inteligência artificial analisa seu perfil e encontra o veículo ideal entre mais de 19 modelos — em segundos.
            </p>
          </motion.div>

          {/* ── Content: steps + CTA ── */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-10 md:mb-14">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group"
              >
                <div
                  className="h-full rounded-xl overflow-hidden transition-all duration-300 p-5 relative"
                  style={{
                    background: "hsl(0 0% 100% / 0.025)",
                    border: "1px solid hsl(0 0% 100% / 0.06)",
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.06) 0%, transparent 60%)",
                    }}
                  />

                  <div className="relative">
                    {/* Step number + icon */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
                        style={{
                          background: "hsl(var(--primary) / 0.1)",
                          border: "1px solid hsl(var(--primary) / 0.2)",
                        }}
                      >
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span
                        className="text-[11px] font-bold uppercase tracking-[0.15em]"
                        style={{ color: "hsl(0 0% 100% / 0.2)" }}
                      >
                        Etapa {i + 1}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-sm text-primary-foreground uppercase tracking-wide mb-2">
                      {step.title}
                    </h3>

                    <p className="text-[12px] text-primary-foreground/40 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── CTA row ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <motion.button
              onClick={() => setQuizOpen(true)}
              className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wide px-8 py-4 rounded-xl text-primary-foreground cursor-pointer relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                boxShadow:
                  "0 8px 32px hsl(var(--primary) / 0.3), 0 1px 0 inset hsl(0 0% 100% / 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shine effect */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, hsl(0 0% 100% / 0.12) 50%, transparent 60%)",
                }}
              />
              <Sparkles className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Fazer o quiz agora</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5" />
            </motion.button>

            <span className="text-[11px] text-primary-foreground/25 tracking-wide uppercase">
              Menos de 60 segundos · Resultado na hora
            </span>
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
