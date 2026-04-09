import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const MediaCoverage = () => {
  return (
    <section className="relative py-14 md:py-20 overflow-hidden">
      {/* ── Newspaper column lines ── */}
      {[20, 40, 60, 80].map((left, i) => (
        <motion.div
          key={i}
          className="absolute top-[10%] pointer-events-none w-[1px]"
          style={{
            left: `${left}%`,
            background:
              "linear-gradient(to bottom, transparent, hsl(0 0% 100% / 0.03), transparent)",
          }}
          initial={{ height: 0 }}
          whileInView={{ height: "80%" }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2, duration: 1.5, ease: "easeOut" }}
        />
      ))}

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
              MS na Mídia
            </span>
            <div className="w-8 h-px bg-primary" />
          </div>

          <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
            Quem fala da{" "}
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
            A MS Eletric também vem ganhando espaço na imprensa e em canais que
            acompanham inovação, mobilidade e negócios. É mais um reflexo de uma
            marca que vem se consolidando com presença, estrutura e
            credibilidade.
          </p>
        </motion.div>

        {/* ── Placeholder — awaiting real press coverage ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] p-8 md:p-12 backdrop-blur-sm text-center max-w-2xl mx-auto"
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5"
            style={{
              background: "hsl(var(--primary) / 0.1)",
              border: "1px solid hsl(var(--primary) / 0.15)",
            }}
          >
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display font-bold text-lg md:text-xl text-primary-foreground mb-3">
            Em breve por aqui
          </h3>
          <p className="text-sm text-primary-foreground/40 leading-relaxed max-w-md mx-auto">
            Estamos reunindo as principais matérias, reportagens e aparições da MS Eletric na mídia. Em breve, esse espaço será atualizado com as coberturas mais relevantes.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MediaCoverage;
