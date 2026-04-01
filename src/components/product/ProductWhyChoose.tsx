import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ProductContent } from "@/data/product-content";

export default function ProductWhyChoose({ content }: { content: ProductContent }) {
  return (
    <section className="py-14 md:py-20" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.04)" }}>
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">Vantagens</p>
          <h2 className="font-display font-black text-2xl md:text-3xl text-primary-foreground uppercase tracking-tight">
            Por que escolher <span className="text-primary">este modelo</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {content.whyChoose.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-xl p-5 flex items-start gap-3.5"
              style={{ background: "hsl(0 0% 100% / 0.02)", border: "1px solid hsl(0 0% 100% / 0.05)" }}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.15)" }}>
                <Check className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-[13px] text-primary-foreground/85 uppercase tracking-wide mb-1">{item.title}</h3>
                <p className="text-[12px] text-primary-foreground/40 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
