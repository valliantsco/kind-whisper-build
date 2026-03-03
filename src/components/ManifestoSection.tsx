import { motion } from "framer-motion";

const words = ["Montadora", "autorizada.", "Tecnologia", "de", "ponta.", "Zero", "emissão."];

const ManifestoSection = () => {
  return (
    <section className="py-20 md:py-32 bg-foreground text-primary-foreground relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.04]" style={{ background: "radial-gradient(circle, hsl(11 81% 57%) 0%, transparent 60%)" }} />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-8"
          >
            Desde 2024, reescrevendo a mobilidade elétrica
          </motion.p>

          <h2 className="font-display font-black text-3xl md:text-5xl lg:text-7xl leading-[1.1] tracking-tight">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`inline-block mr-3 md:mr-5 ${word.endsWith(".") ? "text-primary" : ""}`}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-primary-foreground/50 text-lg md:text-xl mt-10 max-w-2xl mx-auto leading-relaxed"
          >
            A revolução elétrica que está transformando o Brasil já começou. E a MS Eletric está no centro dessa mudança.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ManifestoSection;
