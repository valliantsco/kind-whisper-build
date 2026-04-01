import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProductContent } from "@/data/product-content";

interface Props {
  content: ProductContent;
  onContact: () => void;
  whatsAppLink: string;
}

export default function ProductFinalCTA({ content, onContact, whatsAppLink }: Props) {
  return (
    <section className="py-16 md:py-24" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.04)" }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-10 h-[2px] rounded-full bg-primary mx-auto mb-6" />
          <h2 className="font-display font-black text-2xl md:text-3xl text-primary-foreground uppercase tracking-tight mb-4">
            {content.finalCta.title}
          </h2>
          <p className="text-[13px] text-primary-foreground/40 leading-relaxed mb-8 max-w-lg mx-auto">
            {content.finalCta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-[12px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))", boxShadow: "0 8px 24px -6px hsl(var(--primary) / 0.35)" }}
            >
              <MessageCircle className="w-4 h-4" /> Falar com especialista
            </a>
          </div>

          <Link
            to="/modelos"
            className="inline-flex items-center gap-1.5 mt-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/30 hover:text-primary transition-colors"
          >
            Comparar com outros modelos <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
