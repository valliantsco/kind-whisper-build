import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import type { ProductContent } from "@/data/product-content";

interface Props {
  related: Product[];
  content: ProductContent;
}

export default function ProductComparison({ related, content }: Props) {
  if (related.length === 0) return null;

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.12) 50%, transparent 100%)" }} />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/8 px-4 py-1.5 rounded-full mb-4" style={{ border: "1px solid hsl(var(--primary) / 0.12)" }}>
            Compare
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-primary-foreground uppercase tracking-tight">
            Modelos{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
              relacionados
            </span>
          </h2>
        </motion.div>

        {content.comparisonTip && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[13px] text-primary-foreground/40 text-center max-w-xl mx-auto mb-12 leading-relaxed"
          >
            {content.comparisonTip}
          </motion.p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {related.map((rel, i) => (
            <motion.div
              key={rel.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/modelos/${rel.slug}`}
                className="group block rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "linear-gradient(145deg, hsl(0 0% 100% / 0.03) 0%, hsl(0 0% 100% / 0.01) 100%)",
                  border: "1px solid hsl(0 0% 100% / 0.06)",
                  boxShadow: "0 10px 40px -15px hsl(0 0% 0% / 0.2)",
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(var(--primary) / 0.04) 0%, transparent 70%)" }} />

                <div className="h-40 bg-white/95 flex items-center justify-center p-6 relative overflow-hidden">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-[13px] text-primary-foreground/85 uppercase tracking-wide group-hover:text-primary transition-colors duration-300">
                      {rel.name}
                    </h3>
                    <p className="text-[10px] text-primary-foreground/30 mt-0.5">{rel.category}</p>
                  </div>
                  <span
                    className="font-display font-bold text-[14px] bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
                  >
                    {rel.price}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/modelos"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/40 hover:text-primary transition-colors group"
          >
            Ver todo o catálogo
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
