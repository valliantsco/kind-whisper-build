import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import type { ProductContent } from "@/data/product-content";

export default function ProductUrbanContext({ content }: { content: ProductContent }) {
  const { urbanContext } = content;

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.12) 50%, transparent 100%)" }} />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at left, hsl(var(--primary) / 0.04) 0%, transparent 60%)", filter: "blur(80px)" }} />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/8 px-4 py-1.5 rounded-full mb-5" style={{ border: "1px solid hsl(var(--primary) / 0.12)" }}>
              Mobilidade urbana
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-primary-foreground uppercase tracking-tight leading-tight mb-5">
              {urbanContext.title}
            </h2>
            <p className="text-[14px] text-primary-foreground/45 leading-relaxed mb-6">{urbanContext.body}</p>
            <div className="w-16 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.5), transparent)" }} />
          </motion.div>

          {/* Highlights side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3"
          >
            {urbanContext.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="group flex items-center gap-4 rounded-xl p-4 transition-all duration-300 hover:-translate-x-1 cursor-default"
                style={{
                  background: "linear-gradient(135deg, hsl(0 0% 100% / 0.03) 0%, hsl(0 0% 100% / 0.01) 100%)",
                  border: "1px solid hsl(0 0% 100% / 0.06)",
                }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110" style={{ background: "hsl(var(--primary) / 0.08)", border: "1px solid hsl(var(--primary) / 0.12)" }}>
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                </div>
                <p className="text-[13px] text-primary-foreground/70 font-medium flex-1 group-hover:text-primary-foreground/85 transition-colors">{h}</p>
                <ArrowRight className="w-3.5 h-3.5 text-primary/30 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
