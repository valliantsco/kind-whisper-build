import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import QuizEngine from "@/components/quiz/QuizEngine";
import { msEletricQuizConfig } from "@/components/QuizSection";

const QuizCta = () => {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: "hsl(0 0% 2%)" }}
      >
        {/* ── Background composition ── */}
        {/* Warm radial from top-right */}
        <div
          className="absolute -top-32 -right-32 w-[900px] h-[900px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, hsl(var(--primary) / 0.08) 0%, transparent 55%)",
            filter: "blur(80px)",
          }}
        />

        {/* Subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, hsl(0 0% 0% / 0.4) 100%)",
          }}
        />

        {/* Diagonal lines texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, hsl(0 0% 100%) 0px, transparent 1px, transparent 40px)",
          }}
        />

        {/* Accent top bar */}
        <div
          className="absolute top-0 right-0 w-[40%] h-[2px]"
          style={{
            background:
              "linear-gradient(270deg, hsl(var(--primary) / 0.5), transparent)",
          }}
        />

        <div className="container mx-auto px-4 relative">
          {/* ── Eyebrow right-aligned ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 justify-end mb-16 md:mb-20"
          >
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
              Recomendação inteligente
            </span>
            <div className="w-8 h-px bg-primary" />
          </motion.div>

          {/* ── Main content ── */}
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* ─── Left column: headline + CTA ─── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Large "?" watermark */}
              <div
                className="absolute -left-4 md:left-0 top-[30%] font-display font-black text-[18rem] md:text-[22rem] leading-none pointer-events-none select-none"
                style={{
                  color: "hsl(0 0% 100% / 0.015)",
                }}
              >
                ?
              </div>

              <h2 className="relative font-display font-black text-4xl md:text-5xl lg:text-[3.5rem] text-primary-foreground uppercase tracking-tight leading-[1.02]">
                Não sabe qual
                <br />
                modelo escolher?
              </h2>

              <div
                className="w-16 h-[3px] rounded-full mt-6 mb-6"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                }}
              />

              <p className="text-primary-foreground/45 text-[15px] leading-[1.7] max-w-md">
                Responda <span className="text-primary-foreground/70 font-medium">4 perguntas</span> sobre
                seu perfil e receba uma recomendação personalizada feita
                por inteligência artificial — direto no seu WhatsApp.
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-8 mt-8 mb-10">
                {[
                  { value: "60s", label: "para completar" },
                  { value: "19+", label: "modelos analisados" },
                  { value: "IA", label: "recomendação" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <span
                      className="block font-display font-black text-xl md:text-2xl bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                      }}
                    >
                      {stat.value}
                    </span>
                    <span className="block text-[10px] uppercase tracking-[0.15em] text-primary-foreground/30 mt-0.5">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
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
                <span className="relative z-10">Fazer o quiz</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5" />
              </motion.button>

              <p className="text-[11px] text-primary-foreground/20 tracking-wide mt-3">
                Sem cadastro · resultado na hora
              </p>
            </motion.div>

            {/* ─── Right column: glassmorphism card ─── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              {/* Card glow behind */}
              <div
                className="absolute -inset-4 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 30%, hsl(var(--primary) / 0.06) 0%, transparent 60%)",
                  filter: "blur(30px)",
                }}
              />

              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: "hsl(0 0% 100% / 0.025)",
                  border: "1px solid hsl(0 0% 100% / 0.06)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Card header */}
                <div
                  className="px-7 py-5 flex items-center justify-between"
                  style={{
                    borderBottom: "1px solid hsl(0 0% 100% / 0.04)",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ background: "hsl(var(--primary))" }}
                    />
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground/50">
                      Como funciona
                    </span>
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-primary-foreground/25">
                    4 etapas
                  </span>
                </div>

                {/* Steps */}
                <div className="divide-y divide-white/[0.03]">
                  {[
                    {
                      n: "01",
                      title: "Quem vai usar?",
                      detail: "Você, criança, empresa ou alguém que precisa de mais estabilidade",
                    },
                    {
                      n: "02",
                      title: "Para que vai usar?",
                      detail: "Trabalho, entregas, carga ou lazer — cada uso tem o modelo certo",
                    },
                    {
                      n: "03",
                      title: "Tem habilitação?",
                      detail: "Define se você pode pilotar scooters ou só autopropelidos",
                    },
                    {
                      n: "04",
                      title: "Quanto quer investir?",
                      detail: "A IA filtra entre R$ 2.800 e R$ 28.990 pelo melhor custo-benefício",
                    },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                      className="group/step px-7 py-5 flex items-start gap-4 cursor-default transition-colors duration-300 hover:bg-white/[0.015]"
                    >
                      {/* Step number */}
                      <span
                        className="shrink-0 font-display font-black text-lg mt-0.5 tabular-nums transition-colors duration-300 group-hover/step:text-primary"
                        style={{
                          color: "hsl(0 0% 100% / 0.08)",
                        }}
                      >
                        {step.n}
                      </span>

                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-[13px] text-primary-foreground/75 uppercase tracking-[0.06em] group-hover/step:text-primary-foreground transition-colors duration-300">
                          {step.title}
                        </p>
                        <p className="text-[11px] text-primary-foreground/25 leading-relaxed mt-1 group-hover/step:text-primary-foreground/35 transition-colors duration-300">
                          {step.detail}
                        </p>
                      </div>

                      <ChevronRight
                        className="w-4 h-4 shrink-0 mt-0.5 text-primary-foreground/10 group-hover/step:text-primary transition-all duration-300 group-hover/step:translate-x-0.5"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Card footer */}
                <div
                  className="px-7 py-4 flex items-center justify-between"
                  style={{
                    borderTop: "1px solid hsl(0 0% 100% / 0.04)",
                    background: "hsl(var(--primary) / 0.02)",
                  }}
                >
                  <span className="text-[10px] text-primary-foreground/25 tracking-wider uppercase">
                    Resultado via WhatsApp
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.15em]"
                    style={{ color: "hsl(var(--primary) / 0.6)" }}
                  >
                    Gratuito
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 left-0 w-[40%] h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--primary) / 0.5), transparent)",
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
