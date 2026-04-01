import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, HelpCircle, Zap, Target } from "lucide-react";
import QuizEngine from "@/components/quiz/QuizEngine";
import { msEletricQuizConfig } from "@/components/QuizSection";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const QuizCta = () => {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      <section className="relative py-28 overflow-hidden" style={{ background: "hsl(0 0% 4%)" }}>
        {/* ── Layered background (matching WhyChoose) ── */}
        <div
          className="absolute -top-20 left-[20%] w-[1000px] h-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute bottom-0 right-[5%] w-[700px] h-[700px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 80% 80%, hsl(var(--primary) / 0.05) 0%, transparent 55%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.03) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Diagonal gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(160deg, hsl(0 0% 100% / 0.015) 0%, transparent 35%, hsl(var(--primary) / 0.025) 100%)",
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

        <div className="container mx-auto px-4">
          <motion.div
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Left — copy */}
            <motion.div variants={fadeUp}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-6"
                style={{
                  background: "hsl(11 81% 57% / 0.12)",
                  color: "hsl(11 81% 57%)",
                  border: "1px solid hsl(11 81% 57% / 0.25)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Quiz Inteligente
              </span>

              <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-primary-foreground uppercase tracking-tight leading-[1] mb-5">
                Não sabe qual <br />
                <span className="gradient-text">veículo escolher?</span>
              </h2>

              <p className="text-primary-foreground/50 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                Responda algumas perguntas rápidas e receba uma recomendação personalizada com base no seu perfil de uso, orçamento e necessidade.
              </p>

              <motion.button
                onClick={() => setQuizOpen(true)}
                className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 rounded-2xl text-white cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                  boxShadow: "0 4px 20px hsl(11 81% 57% / 0.3)",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Sparkles className="w-4 h-4" />
                Descobrir meu veículo ideal
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            {/* Right — visual placeholder */}
            <motion.div variants={fadeUp} className="relative">
              <div
                className="rounded-2xl overflow-hidden p-8 relative"
                style={{
                  background: "hsl(0 0% 11% / 0.8)",
                  border: "1px solid hsl(0 0% 100% / 0.08)",
                }}
              >
                {/* Decorative quiz preview */}
                <div className="space-y-5">
                  {[
                    { icon: HelpCircle, text: "Quem vai usar?", step: "01" },
                    { icon: Target, text: "Qual o uso principal?", step: "02" },
                    { icon: Zap, text: "Recomendação personalizada", step: "03" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-xl"
                      style={{
                        background: i === 2 ? "hsl(11 81% 57% / 0.1)" : "hsl(0 0% 100% / 0.03)",
                        border: `1px solid ${i === 2 ? "hsl(11 81% 57% / 0.2)" : "hsl(0 0% 100% / 0.06)"}`,
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: i === 2 ? "hsl(11 81% 57% / 0.15)" : "hsl(0 0% 100% / 0.05)",
                        }}
                      >
                        <item.icon className="w-5 h-5" style={{ color: i === 2 ? "hsl(11 81% 57%)" : "hsl(0 0% 100% / 0.4)" }} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/30">
                          Passo {item.step}
                        </span>
                        <p className="text-sm text-primary-foreground/70 font-medium">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <QuizEngine config={msEletricQuizConfig} open={quizOpen} onOpenChange={setQuizOpen} />
    </>
  );
};

export default QuizCta;
