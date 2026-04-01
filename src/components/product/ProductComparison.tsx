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
    <section className="py-14 md:py-20" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.04)" }}>
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">Compare</p>
          <h2 className="font-display font-black text-2xl md:text-3xl text-primary-foreground uppercase tracking-tight">
            Modelos <span className="text-primary">relacionados</span>
          </h2>
        </motion.div>

        {content.comparisonTip && (
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[13px] text-primary-foreground/40 text-center max-w-xl mx-auto mb-10 leading-relaxed">
            {content.comparisonTip}
          </motion.p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {related.map((rel, i) => (
            <motion.div key={rel.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link
                to={`/modelos/${rel.slug}`}
                className="group block rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/20"
                style={{ background: "hsl(0 0% 100% / 0.025)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
              >
                <div className="h-36 bg-white flex items-center justify-center p-5">
                  <img src={rel.image} alt={rel.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-[12px] text-primary-foreground/85 uppercase tracking-wide group-hover:text-primary transition-colors">{rel.name}</h3>
                    <p className="text-[10px] text-primary-foreground/30 mt-0.5">{rel.category}</p>
                  </div>
                  <span className="font-display font-bold text-[13px] bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                    {rel.price}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/modelos" className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/40 hover:text-primary transition-colors inline-flex items-center gap-1.5">
            Ver todo o catálogo <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
