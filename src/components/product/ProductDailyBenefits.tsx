import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ProductContent } from "@/data/product-content";

export default function ProductDailyBenefits({ content }: { content: ProductContent }) {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.12) 50%, transparent 100%)" }} />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/8 px-4 py-1.5 rounded-full mb-4" style={{ border: "1px solid hsl(var(--primary) / 0.12)" }}>
            No dia a dia
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-primary-foreground uppercase tracking-tight">
            Na prática,{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
              o que muda
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {content.dailyBenefits.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="group relative rounded-2xl p-6 cursor-default transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "linear-gradient(145deg, hsl(0 0% 100% / 0.03) 0%, hsl(0 0% 100% / 0.01) 100%)",
                border: "1px solid hsl(0 0% 100% / 0.06)",
              }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, hsl(var(--primary) / 0.05) 0%, transparent 70%)" }} />

              <div className="relative z-10">
                {/* Animated accent bar */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-[2px] rounded-full bg-primary/50 group-hover:w-12 transition-all duration-500" />
                  <ArrowUpRight className="w-3.5 h-3.5 text-primary/40 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                </div>
                <h3 className="font-display font-bold text-[13px] text-primary-foreground/90 uppercase tracking-wide mb-2 group-hover:text-primary-foreground transition-colors">
                  {item.title}
                </h3>
                <p className="text-[12px] text-primary-foreground/40 leading-relaxed group-hover:text-primary-foreground/50 transition-colors">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
