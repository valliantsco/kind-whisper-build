import { motion } from "framer-motion";
import { Award } from "lucide-react";
import type { ProductContent } from "@/data/product-content";

export default function ProductDifferentials({ content }: { content: ProductContent }) {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.12) 50%, transparent 100%)" }} />

      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse at right, hsl(var(--primary) / 0.04) 0%, transparent 60%)", filter: "blur(80px)" }} />

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--primary) / 0.05))",
                border: "1px solid hsl(var(--primary) / 0.15)",
                boxShadow: "0 8px 24px -8px hsl(var(--primary) / 0.15)",
              }}
            >
              <Award className="w-6 h-6 text-primary" />
            </motion.div>

            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/8 px-4 py-1.5 rounded-full mb-5" style={{ border: "1px solid hsl(var(--primary) / 0.12)" }}>
              Posicionamento
            </span>

            <h2 className="font-display font-black text-3xl md:text-4xl text-primary-foreground uppercase tracking-tight mb-6">
              {content.differentials.title}
            </h2>

            <div className="w-20 h-[2px] rounded-full mx-auto mb-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)" }} />

            <p className="text-[15px] text-primary-foreground/50 leading-relaxed max-w-2xl mx-auto">
              {content.differentials.body}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
