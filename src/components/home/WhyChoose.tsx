import { motion } from "framer-motion";
import { Shield, Wrench, Clock, Award } from "lucide-react";

const PILLARS = [
  { icon: Shield, title: "Garantia", stat: "2 anos", description: "Garantia de fábrica em todos os veículos da linha AIMA, com suporte direto e assistência local." },
  { icon: Wrench, title: "Assistência Especializada", stat: "100%", description: "Equipe técnica treinada e peças de reposição originais para manutenção completa." },
  { icon: Clock, title: "Anos de Mercado", stat: "10+", description: "Mais de uma década de experiência em mobilidade elétrica no Brasil." },
  { icon: Award, title: "Produtos de Qualidade", stat: "AIMA", description: "Parceira oficial da maior fabricante de veículos elétricos do mundo." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

const WhyChoose = () => {
  return (
    <section className="relative bg-foreground py-28 overflow-hidden">
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.06), transparent)",
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-4"
            style={{
              background: "hsl(11 81% 57% / 0.12)",
              color: "hsl(11 81% 57%)",
              border: "1px solid hsl(11 81% 57% / 0.25)",
            }}
          >
            Diferenciais
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-primary-foreground uppercase tracking-tight leading-[1]">
            Por que comprar na <span className="gradient-text">MS Eletric</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative rounded-2xl p-6 group"
              style={{
                background: "hsl(0 0% 11% / 0.8)",
                border: "1px solid hsl(0 0% 100% / 0.08)",
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: "hsl(11 81% 57% / 0.1)",
                  border: "1px solid hsl(11 81% 57% / 0.15)",
                }}
              >
                <pillar.icon className="w-5 h-5" style={{ color: "hsl(11 81% 57%)" }} />
              </div>

              {/* Stat */}
              <p className="font-display font-black text-3xl mb-2 gradient-text">
                {pillar.stat}
              </p>

              <h3 className="font-display font-bold text-sm text-primary-foreground uppercase tracking-wide mb-2">
                {pillar.title}
              </h3>

              <p className="text-primary-foreground/40 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
