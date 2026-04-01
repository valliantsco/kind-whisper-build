import { motion } from "framer-motion";
import type { ProductContent } from "@/data/product-content";

export default function ProductDailyBenefits({ content }: { content: ProductContent }) {
  return (
    <section className="py-14 md:py-20" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.04)" }}>
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">No dia a dia</p>
          <h2 className="font-display font-black text-2xl md:text-3xl text-primary-foreground uppercase tracking-tight">
            Como ela muda <span className="text-primary">sua rotina</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {content.dailyBenefits.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl p-5"
              style={{ background: "hsl(0 0% 100% / 0.02)", border: "1px solid hsl(0 0% 100% / 0.05)" }}
            >
              <div className="w-8 h-[2px] rounded-full bg-primary/40 mb-4" />
              <h3 className="font-display font-bold text-[13px] text-primary-foreground/85 uppercase tracking-wide mb-1.5">{item.title}</h3>
              <p className="text-[12px] text-primary-foreground/40 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
