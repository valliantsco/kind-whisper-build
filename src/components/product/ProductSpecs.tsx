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
    <section className="py-14 md:py-20" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.04)" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">Ficha técnica</p>
            <h2 className="font-display font-black text-2xl md:text-3xl text-primary-foreground uppercase tracking-tight">
              Especificações <span className="text-primary">técnicas</span>
            </h2>
          </motion.div>

          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid hsl(0 0% 100% / 0.06)" }}>
            {SPECS.map((spec, i) => (
              <div
                key={spec.key}
                className="flex items-center justify-between p-5 md:p-6"
                style={{
                  background: i % 2 === 0 ? "hsl(0 0% 100% / 0.02)" : "transparent",
                  borderBottom: i < SPECS.length - 1 ? "1px solid hsl(0 0% 100% / 0.04)" : "none",
                }}
              >
                <div className="flex items-center gap-3.5">
                  <spec.icon className="w-4 h-4 text-primary/60" />
                  <div>
                    <p className="text-[12px] font-semibold text-primary-foreground/70 uppercase tracking-wide">{spec.label}</p>
                    {content.specContexts[spec.key] && (
                      <p className="text-[10px] text-primary-foreground/25 mt-0.5 leading-relaxed">{content.specContexts[spec.key]}</p>
                    )}
                  </div>
                </div>
                <span className="font-display font-bold text-[14px] text-primary-foreground/90 tabular-nums">{product[spec.key]}</span>
              </div>
            ))}
            {/* Price row */}
            <div className="flex items-center justify-between p-5 md:p-6" style={{ background: "hsl(var(--primary) / 0.04)" }}>
              <p className="text-[12px] font-semibold text-primary/80 uppercase tracking-wide">Preço</p>
              <span className="font-display font-black text-lg bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                {product.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
