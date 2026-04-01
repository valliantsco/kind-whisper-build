import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { ProductContent } from "@/data/product-content";

export default function ProductUrbanContext({ content }: { content: ProductContent }) {
  const { urbanContext } = content;
  return (
    <section className="py-14 md:py-20" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.04)" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">Mobilidade urbana</p>
            <h2 className="font-display font-black text-2xl md:text-3xl text-primary-foreground uppercase tracking-tight leading-tight mb-4">
              {urbanContext.title}
            </h2>
            <p className="text-[13px] text-primary-foreground/45 leading-relaxed">{urbanContext.body}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-3">
            {urbanContext.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl p-4" style={{ background: "hsl(0 0% 100% / 0.02)", border: "1px solid hsl(0 0% 100% / 0.05)" }}>
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <p className="text-[12px] text-primary-foreground/70 font-medium">{h}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
