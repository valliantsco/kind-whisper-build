import { motion } from "framer-motion";
import type { ProductContent } from "@/data/product-content";

export default function ProductDifferentials({ content }: { content: ProductContent }) {
  return (
    <section className="py-14 md:py-20" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.04)" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">Posicionamento</p>
            <h2 className="font-display font-black text-2xl md:text-3xl text-primary-foreground uppercase tracking-tight mb-6">
              {content.differentials.title}
            </h2>
            <p className="text-[14px] text-primary-foreground/45 leading-relaxed max-w-2xl mx-auto">
              {content.differentials.body}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
