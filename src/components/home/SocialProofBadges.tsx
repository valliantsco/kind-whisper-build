import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

const PARTNERS = [
  "AIMA — Líder Mundial",
  "ABVE",
  "Bosch",
  "Certificação INMETRO",
  "ISO 9001",
  "Garantia de Fábrica",
  "Assistência Autorizada",
  "Peças Originais",
];

const FLOATING_ELEMENTS = [
  { top: "15%", right: "8%", size: 10, delay: 0.5, opacity: 0.15 },
  { top: "60%", left: "6%", size: 12, delay: 1.8, opacity: 0.12 },
];

const SocialProofBadges = () => {
  return (
    <section
      className="relative py-10 md:py-14 overflow-hidden"
      style={{ background: "hsl(0 0% 4%)" }}
    >
      {/* ── Layered background (matching other sections) ── */}
      <div
        className="absolute -top-20 left-[20%] w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 60%)",
          filter: "blur(120px)",
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
      {/* Top accent line */}
      <div
        className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[3px]"
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
        {/* ── Header (matching other sections — right-aligned eyebrow) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 md:mb-10 text-right"
        >
          <div className="flex items-center gap-3 mb-4 justify-end">
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
              Credenciais
            </span>
            <div className="w-8 h-px bg-primary" />
          </div>

          <h2 className="font-display font-black text-2xl md:text-3xl lg:text-4xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
            Quem está{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
              }}
            >
              por trás
            </span>
          </h2>

          <p className="text-sm text-primary-foreground/45 leading-relaxed mt-3 max-w-md ml-auto">
            Certificações, parcerias e garantias que sustentam cada veículo MS Eletric.
          </p>
        </motion.div>

        {/* ── Badges grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {PARTNERS.map((name, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="group"
            >
              <div
                className="h-full rounded-xl overflow-hidden transition-all duration-300 px-5 py-5 relative flex flex-col items-center justify-center text-center"
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

                <span
                  className="relative text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground/35 group-hover:text-primary-foreground/60 transition-colors duration-300 whitespace-nowrap"
                >
                  {name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.06), transparent)",
        }}
      />
    </section>
  );
};

export default SocialProofBadges;
