import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { end: 2000, suffix: "+", label: "Produtos Vendidos" },
  { end: 310, suffix: "+", label: "Pontos de Revenda" },
  { end: 30, suffix: "+", label: "Cidades Atendidas" },
  { end: 98, suffix: "%", label: "Clientes Satisfeitos" },
];

const StatsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-foreground text-primary-foreground relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(11 81% 57%) 0%, transparent 60%)" }} />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-primary mb-2">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-primary-foreground/50 text-sm md:text-base font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
