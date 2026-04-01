import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import QuizEngine from "@/components/quiz/QuizEngine";
import { msEletricQuizConfig } from "@/components/QuizSection";

const QuizCta = () => {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: "hsl(0 0% 3%)" }}
      >
        {/* ── Cinematic gradient sweep ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "conic-gradient(from 200deg at 70% 40%, hsl(var(--primary) / 0.09) 0deg, transparent 60deg, hsl(var(--primary) / 0.04) 180deg, transparent 300deg)",
            filter: "blur(100px)",
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Horizontal light strip */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, hsl(var(--primary) / 0.12) 30%, hsl(var(--primary) / 0.2) 50%, hsl(var(--primary) / 0.12) 70%, transparent 95%)",
          }}
        />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            {/* ── Top row: eyebrow right-aligned ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-10 justify-end"
            >
              <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
                Quiz inteligente
              </span>
              <div className="w-8 h-px bg-primary" />
            </motion.div>

            {/* ── Main content: split layout ── */}
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
              {/* Left: large typographic statement */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="font-display font-black text-[2.5rem] md:text-[3.5rem] lg:text-[4.2rem] text-primary-foreground uppercase tracking-tight leading-[0.92]">
                  Descubra
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                    }}
                  >
                    seu modelo
                  </span>
                  <br />
                  ideal
                </h2>

                <p className="text-primary-foreground/40 text-sm md:text-[15px] leading-relaxed mt-5 max-w-sm">
                  4 perguntas rápidas. A IA analisa perfil, habilitação e
                  orçamento — e entrega o resultado na hora.
                </p>
              </motion.div>

              {/* Right: vertical timeline + CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="flex flex-col items-end gap-6"
              >
                {/* Vertical mini-timeline */}
                <div className="relative pl-6 border-l border-primary/15 space-y-7">
                  {[
                    { n: "01", label: "Perfil de uso" },
                    { n: "02", label: "Uso principal" },
                    { n: "03", label: "Habilitação" },
                    { n: "04", label: "Orçamento" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 + i * 0.1, duration: 0.4 }}
                      className="relative"
                    >
                      {/* Dot on the timeline */}
                      <div
                        className="absolute -left-[calc(1.5rem+4px)] top-1 w-2 h-2 rounded-full"
                        style={{
                          background:
                            i === 3
                              ? "hsl(var(--primary))"
                              : "hsl(0 0% 100% / 0.15)",
                          boxShadow:
                            i === 3
                              ? "0 0 8px hsl(var(--primary) / 0.5)"
                              : "none",
                        }}
                      />
                      <div className="flex items-baseline gap-3">
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.2em] tabular-nums"
                          style={{
                            color:
                              i === 3
                                ? "hsl(var(--primary))"
                                : "hsl(0 0% 100% / 0.2)",
                          }}
                        >
                          {item.n}
                        </span>
                        <span
                          className="text-sm font-semibold"
                          style={{
                            color:
                              i === 3
                                ? "hsl(var(--primary-foreground))"
                                : "hsl(0 0% 100% / 0.45)",
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  onClick={() => setQuizOpen(true)}
                  className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wide px-9 py-3.5 rounded-xl text-primary-foreground cursor-pointer mt-2"
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

                <p className="text-[11px] text-primary-foreground/20 tracking-wide text-right">
                  Sem cadastro · resultado imediato
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[3px]"
          style={{
            background:
              "linear-gradient(270deg, hsl(var(--primary) / 0.6), transparent)",
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
