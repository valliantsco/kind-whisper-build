import { motion } from "framer-motion";

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

const SocialProofBadges = () => {
  return (
    <section className="relative bg-foreground py-8 overflow-hidden">
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.4), hsl(11 90% 65% / 0.4), transparent)",
        }}
      />

      <div className="relative flex overflow-hidden">
        {[0, 1].map((copy) => (
          <motion.div
            key={copy}
            className="flex items-center gap-12 shrink-0 px-6"
            animate={{ x: [0, "-100%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {PARTNERS.map((name, i) => (
              <div
                key={`${copy}-${i}`}
                className="flex items-center justify-center h-12 px-8 rounded-xl shrink-0"
                style={{
                  background: "hsl(0 0% 100% / 0.04)",
                  border: "1px solid hsl(0 0% 100% / 0.06)",
                }}
              >
                <span className="text-primary-foreground/30 text-xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.06), transparent)",
        }}
      />
    </section>
  );
};

export default SocialProofBadges;
