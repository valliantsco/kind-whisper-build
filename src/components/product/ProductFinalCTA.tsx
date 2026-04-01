import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProductContent } from "@/data/product-content";

interface Props {
  content: ProductContent;
  onContact: () => void;
}

export default function ProductFinalCTA({ content, onContact }: Props) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.12) 50%, transparent 100%)" }} />

      {/* Large ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 60%)", filter: "blur(100px)" }} />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center relative z-10"
        >
          <div className="w-16 h-[2px] rounded-full mx-auto mb-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)" }} />

          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-primary-foreground uppercase tracking-tight mb-5 leading-tight">
            {content.finalCta.title}
          </h2>
          <p className="text-[14px] text-primary-foreground/45 leading-relaxed mb-10 max-w-lg mx-auto">
            {content.finalCta.subtitle}
          </p>

          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl text-[12px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
              boxShadow: "0 16px 40px -10px hsl(var(--primary) / 0.45), inset 0 1px 0 hsl(0 0% 100% / 0.1)",
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, hsl(var(--primary-glow)), hsl(var(--primary)))" }} />
            <MessageCircle className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Falar com especialista</span>
          </a>

          <div className="mt-8">
            <Link
              to="/modelos"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/30 hover:text-primary transition-colors group"
            >
              Comparar com outros modelos
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
