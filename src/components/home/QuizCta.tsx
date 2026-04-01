import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import QuizEngine from "@/components/quiz/QuizEngine";
import { msEletricQuizConfig } from "@/components/QuizSection";

const QuizCta = () => {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      <section className="relative py-24 md:py-32 overflow-hidden bg-foreground">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Accent line left */}
        <div
          className="absolute left-0 top-[15%] bottom-[15%] w-px hidden lg:block"
          style={{
            background:
              "linear-gradient(180deg, transparent, hsl(var(--primary) / 0.4), transparent)",
          }}
        />

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Visual / abstract element */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full max-w-md aspect-square">
                {/* Concentric rings */}
                {[1, 2, 3].map((ring) => (
                  <div
                    key={ring}
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: `1px solid hsl(var(--primary) / ${0.08 * ring})`,
                      transform: `scale(${0.5 + ring * 0.18})`,
                    }}
                  />
                ))}

                {/* Center glow */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />

                {/* Floating data points */}
                {[
                  { label: "4 perguntas", top: "18%", left: "10%" },
                  { label: "IA analisa", top: "72%", left: "8%" },
                  { label: "Resultado", top: "45%", left: "75%" },
                ].map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                    className="absolute px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em]"
                    style={{
                      top: point.top,
                      left: point.left,
                      color: "hsl(var(--primary))",
                      background: "hsl(var(--primary) / 0.06)",
                      border: "1px solid hsl(var(--primary) / 0.12)",
                    }}
                  >
                    {point.label}
                  </motion.div>
                ))}

                {/* Center number */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <span
                    className="block font-display font-black text-6xl tracking-tighter"
                    style={{ color: "hsl(var(--primary) / 0.12)" }}
                  >
                    60s
                  </span>
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-primary-foreground/25 mt-1">
                    tempo médio
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right — Copy & CTA */}
            <div className="text-left lg:text-right">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Eyebrow */}
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-sm"
                  style={{
                    color: "hsl(var(--primary))",
                    borderLeft: "2px solid hsl(var(--primary))",
                    background: "hsl(var(--primary) / 0.04)",
                  }}
                >
                  Quiz inteligente
                </span>

                {/* Heading */}
                <h2 className="font-display font-black text-3xl md:text-4xl lg:text-[2.75rem] text-primary-foreground uppercase tracking-tight leading-[1.1]">
                  Encontre o veículo
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                    }}
                  >
                    certo pra você
                  </span>
                </h2>

                {/* Body */}
                <p className="text-primary-foreground/45 text-sm md:text-[15px] leading-relaxed max-w-md lg:ml-auto">
                  Perfil de uso, habilitação e orçamento — a IA cruza tudo e
                  indica o modelo ideal em segundos. Sem cadastro.
                </p>

                {/* CTA */}
                <div className="pt-2">
                  <motion.button
                    onClick={() => setQuizOpen(true)}
                    className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em] cursor-pointer"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span
                      className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                        boxShadow: "0 4px 20px hsl(var(--primary) / 0.3)",
                      }}
                    >
                      <ArrowRight className="w-5 h-5 text-primary-foreground" />
                    </span>
                    <span className="text-primary-foreground/80 group-hover:text-primary-foreground transition-colors">
                      Começar agora
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
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
