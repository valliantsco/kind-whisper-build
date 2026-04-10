import { motion } from "framer-motion";
import { Zap, Gauge, Battery, Clock, Weight, Target } from "lucide-react";
import type { Product } from "@/data/products";
import type { ProductContent } from "@/data/product-content";

const HIGHLIGHT_SPECS = [
  { key: "autonomy" as const, icon: Zap, label: "Autonomia", accent: true },
  { key: "speed" as const, icon: Gauge, label: "Velocidade máx." },
  { key: "motor" as const, icon: Battery, label: "Motor" },
  { key: "recharge" as const, icon: Clock, label: "Recarga" },
  { key: "load" as const, icon: Weight, label: "Carga máx." },
];

interface Props {
  product: Product;
  content: ProductContent;
}

export default function ProductSpecsHighlight({ product, content }: Props) {
  return (
    <section className="py-14 md:py-20 relative overflow-x-clip">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.12) 50%, transparent 100%)" }}
      />

      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/8 px-4 py-1.5 rounded-full mb-4"
            style={{ border: "1px solid hsl(var(--primary) / 0.12)" }}
          >
            <Target className="w-3 h-3" />
            Ficha técnica
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-primary-foreground uppercase tracking-tight">
            Números que{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
            >
              importam
            </span>
          </h2>
        </motion.div>

        {/* Specs grid — large visual cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto">
          {HIGHLIGHT_SPECS.map((spec, i) => {
            const Icon = spec.icon;
            const value = product[spec.key];
            const context = content.specContexts[spec.key];

            return (
              <motion.div
                key={spec.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="group relative rounded-2xl p-5 md:p-6 text-center cursor-default transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "linear-gradient(145deg, hsl(0 0% 100% / 0.035) 0%, hsl(0 0% 100% / 0.01) 100%)",
                  border: "1px solid hsl(0 0% 100% / 0.06)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(var(--primary) / 0.08) 0%, transparent 70%)" }}
                />

                {/* Icon */}
                <div className="relative z-10">
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--primary) / 0.06))",
                      border: "1px solid hsl(var(--primary) / 0.15)",
                    }}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>

                  {/* Value — large and prominent */}
                  <p
                    className="font-display font-black text-xl md:text-2xl lg:text-3xl bg-clip-text text-transparent mb-1"
                    style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
                  >
                    {value}
                  </p>

                  {/* Label */}
                  <p className="text-[10px] md:text-[11px] font-bold text-primary-foreground/50 uppercase tracking-[0.12em]">
                    {spec.label}
                  </p>

                  {/* Context — optional micro-copy */}
                  {context && (
                    <p className="text-[10px] text-primary-foreground/25 leading-snug mt-2 line-clamp-2">
                      {context}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Price highlight */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-md mx-auto mt-6 md:mt-8 rounded-2xl p-5 md:p-6 text-center relative overflow-hidden"
          style={{
            background: "hsl(var(--primary) / 0.04)",
            border: "1px solid hsl(var(--primary) / 0.12)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.03) 0%, transparent 100%)" }}
          />
          <p className="text-[10px] font-bold text-primary/70 uppercase tracking-[0.16em] mb-1 relative z-10">
            A partir de
          </p>
          <p
            className="font-display font-black text-2xl md:text-3xl bg-clip-text text-transparent relative z-10"
            style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
          >
            {product.price}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
