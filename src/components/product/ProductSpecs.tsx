import { motion } from "framer-motion";
import { Zap, Gauge, Weight, Battery, Clock } from "lucide-react";
import type { Product } from "@/data/products";
import type { ProductContent } from "@/data/product-content";

const SPECS = [
  { icon: Zap, key: "autonomy" as const, label: "Autonomia" },
  { icon: Gauge, key: "speed" as const, label: "Velocidade máxima" },
  { icon: Battery, key: "motor" as const, label: "Motor" },
  { icon: Clock, key: "recharge" as const, label: "Recarga" },
  { icon: Weight, key: "load" as const, label: "Capacidade de carga" },
];

interface Props {
  product: Product;
  content: ProductContent;
}

export default function ProductSpecs({ product, content }: Props) {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.12) 50%, transparent 100%)" }} />

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/8 px-4 py-1.5 rounded-full mb-4" style={{ border: "1px solid hsl(var(--primary) / 0.12)" }}>
              Ficha técnica
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-primary-foreground uppercase tracking-tight">
              Especificações{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                técnicas
              </span>
            </h2>
          </motion.div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid hsl(0 0% 100% / 0.06)",
              boxShadow: "0 20px 60px -20px hsl(0 0% 0% / 0.3)",
            }}
          >
            {SPECS.map((spec, i) => (
              <motion.div
                key={spec.key}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group flex items-center justify-between p-5 md:p-6 transition-colors duration-300"
                style={{
                  background: i % 2 === 0 ? "hsl(0 0% 100% / 0.025)" : "hsl(0 0% 100% / 0.01)",
                  borderBottom: i < SPECS.length - 1 ? "1px solid hsl(0 0% 100% / 0.04)" : "none",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110" style={{ background: "hsl(var(--primary) / 0.06)", border: "1px solid hsl(var(--primary) / 0.1)" }}>
                    <spec.icon className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-primary-foreground/75 uppercase tracking-wide">{spec.label}</p>
                    {content.specContexts[spec.key] && (
                      <p className="text-[11px] text-primary-foreground/30 mt-0.5 leading-relaxed max-w-xs">{content.specContexts[spec.key]}</p>
                    )}
                  </div>
                </div>
                <span className="font-display font-bold text-[16px] text-primary-foreground/90 tabular-nums">{product[spec.key]}</span>
              </motion.div>
            ))}

            {/* Price row */}
            <div
              className="flex items-center justify-between p-5 md:p-6 relative overflow-hidden"
              style={{ background: "hsl(var(--primary) / 0.05)" }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.03) 0%, transparent 100%)" }} />
              <p className="text-[13px] font-semibold text-primary/80 uppercase tracking-wide relative z-10">Preço</p>
              <span
                className="font-display font-black text-xl bg-clip-text text-transparent relative z-10"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
              >
                {product.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
