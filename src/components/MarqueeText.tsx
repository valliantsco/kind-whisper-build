import { motion } from "framer-motion";

const phrases = [
  "Mobilidade 100% elétrica",
  "Tecnologia de ponta",
  "Zero emissão",
  "Economia real",
  "Atendimento consultivo",
  "Marca autorizada AIMA",
  "Pós-venda especializado",
  "Pagamento facilitado",
];

const MarqueeText = () => {
  return (
    <section className="py-6 md:py-8 bg-primary overflow-hidden relative">
      <div className="flex whitespace-nowrap">
        {[0, 1].map((set) => (
          <motion.div
            key={set}
            className="flex shrink-0 gap-8 items-center"
            animate={{ x: [0, "-100%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {phrases.map((phrase, i) => (
              <span key={`${set}-${i}`} className="flex items-center gap-8">
                <span className="font-display font-black text-sm md:text-base uppercase tracking-[0.2em] text-primary-foreground">
                  {phrase}
                </span>
                <span className="w-2 h-2 rounded-full bg-primary-foreground/40 shrink-0" />
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MarqueeText;
