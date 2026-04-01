import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Brain, MessageCircle, CheckCircle } from "lucide-react";
import QuizEngine from "@/components/quiz/QuizEngine";
import { msEletricQuizConfig } from "@/components/QuizSection";

const STEPS = [
  {
    icon: MessageCircle,
    title: "Responda perguntas rápidas",
    detail: "Conte como será o uso do veículo, quais características são mais importantes para você e o que espera da sua experiência com mobilidade elétrica.",
  },
  {
    icon: Brain,
    title: "Analisamos o seu perfil",
    detail: "Nossa inteligência cruza suas respostas com o portfólio da MS Electric para entender qual modelo se encaixa melhor no seu cenário, objetivo e rotina.",
  },
  {
    icon: CheckCircle,
    title: "Receba sua recomendação",
    detail: "Em instantes, você visualiza as opções mais indicadas para o seu caso e já pode seguir para comparar modelos ou falar com nosso time.",
  },
];

const QuizCta = () => {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      <section className="relative py-14 md:py-20 overflow-hidden">
        {/* ── Section-specific effect: neural network / AI nodes ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Animated connection lines suggesting AI/neural pathways */}
          {[
            { x1: "10%", y1: "20%", x2: "35%", y2: "45%" },
            { x1: "35%", y1: "45%", x2: "60%", y2: "25%" },
            { x1: "60%", y1: "25%", x2: "85%", y2: "55%" },
            { x1: "85%", y1: "55%", x2: "70%", y2: "80%" },
            { x1: "20%", y1: "70%", x2: "35%", y2: "45%" },
            { x1: "50%", y1: "75%", x2: "60%", y2: "25%" },
          ].map((line, i) => (
            <motion.line
              key={i}
              x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke="hsl(11 81% 57%)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 1.2, ease: "easeOut" }}
            />
          ))}
          {/* Nodes */}
          {[
            { cx: "10%", cy: "20%" }, { cx: "35%", cy: "45%" }, { cx: "60%", cy: "25%" },
            { cx: "85%", cy: "55%" }, { cx: "70%", cy: "80%" }, { cx: "20%", cy: "70%" },
            { cx: "50%", cy: "75%" },
          ].map((node, i) => (
            <motion.circle
              key={i}
              cx={node.cx} cy={node.cy} r="3"
              fill="hsl(11 81% 57%)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.8 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            />
          ))}
        </svg>

        {/* Pulsing AI brain glow — center */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 50%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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

          {/* ── Steps ── */}
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
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.06) 0%, transparent 60%)",
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
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

          {/* ── CTA ── */}
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
