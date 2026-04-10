import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import type { ProductContent } from "@/data/product-content";

export default function ProductWhyChoose({ content }: { content: ProductContent }) {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Section separator */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.15) 50%, transparent 100%)" }} />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/8 px-4 py-1.5 rounded-full mb-4"
            style={{ border: "1px solid hsl(var(--primary) / 0.12)" }}
          >
            <Sparkles className="w-3 h-3" />
            Vantagens
          </motion.span>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-primary-foreground uppercase tracking-tight">
            Por que escolher{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
              este modelo
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {content.whyChoose.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative rounded-2xl p-6 cursor-default transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "linear-gradient(145deg, hsl(0 0% 100% / 0.03) 0%, hsl(0 0% 100% / 0.01) 100%)",
                border: "1px solid hsl(0 0% 100% / 0.06)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.06) 0%, transparent 70%)" }}
              />
              {/* Top accent line */}
              <div className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)" }} />

              <div className="relative z-10 flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--primary) / 0.05))",
                    border: "1px solid hsl(var(--primary) / 0.15)",
                    boxShadow: "0 4px 12px -4px hsl(var(--primary) / 0.1)",
                  }}
                >
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-[13px] text-primary-foreground/90 uppercase tracking-wide mb-1.5 group-hover:text-primary-foreground transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[12px] text-primary-foreground/40 leading-relaxed group-hover:text-primary-foreground/50 transition-colors">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
