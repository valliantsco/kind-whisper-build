import { motion } from "framer-motion";
import {
  ArrowLeft, ChevronRight, Zap, Gauge, Weight, Battery, Clock,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/data/products";
import type { ProductContent } from "@/data/product-content";

const SPEC_ICONS = { autonomy: Zap, speed: Gauge, motor: Battery, recharge: Clock, load: Weight } as const;
const SPEC_LABELS: Record<string, string> = {
  autonomy: "Autonomia", speed: "Vel. máx.", motor: "Motor", recharge: "Recarga", load: "Carga",
};

interface Props {
  product: Product;
  content: ProductContent;
  onContact: () => void;
  whatsAppLink: string;
}

export default function ProductHero({ product, content, onContact, whatsAppLink }: Props) {
  const navigate = useNavigate();

  return (
    <section className="pb-12 md:pb-20">
      <div className="container mx-auto px-4 pt-28 md:pt-36">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-[11px] text-primary-foreground/30 uppercase tracking-[0.12em] mb-10"
        >
          <button onClick={() => navigate("/modelos")} className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
            <ArrowLeft className="w-3 h-3" /> Catálogo
          </button>
          <ChevronRight className="w-3 h-3 opacity-40" />
          <span className="text-primary-foreground/50">{product.category}</span>
          <ChevronRight className="w-3 h-3 opacity-40" />
          <span className="text-primary-foreground/70 font-semibold">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative lg:sticky lg:top-32">
            <div className="relative rounded-2xl overflow-hidden bg-white/[0.97] p-8 md:p-14" style={{ border: "1px solid hsl(0 0% 100% / 0.06)", boxShadow: "0 30px 80px -20px hsl(0 0% 0% / 0.5)" }}>
              <img src={product.image} alt={product.name} className="w-full h-auto object-contain max-h-[420px] mx-auto" />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-[0.12em] text-primary-foreground" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                  {product.badge}
                </span>
              )}
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 blur-2xl rounded-full pointer-events-none" style={{ background: "hsl(var(--primary) / 0.06)" }} />
          </motion.div>

          {/* Text content */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3" style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary) / 0.2)" }}>
              {product.category}
            </span>

            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-[3.5rem] text-primary-foreground uppercase tracking-tight leading-[0.95] mb-3">
              {product.name}
            </h1>

            <p className="text-primary font-display font-black text-2xl md:text-3xl mb-4">
              {product.price}
            </p>

            <h2 className="text-primary-foreground/90 text-lg md:text-xl font-semibold leading-snug mb-3">
              {content.headline}
            </h2>

            <p className="text-primary-foreground/50 text-sm md:text-[15px] leading-relaxed mb-4">
              {content.subheadline}
            </p>

            <p className="text-primary-foreground/35 text-[13px] leading-relaxed mb-8">
              {content.supportText}
            </p>

            {/* Mini specs */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-8">
              {(["autonomy", "speed", "motor", "recharge", "load"] as const).map((key) => {
                const Icon = SPEC_ICONS[key];
                return (
                  <div key={key} className="rounded-xl p-2.5 text-center" style={{ background: "hsl(0 0% 100% / 0.03)", border: "1px solid hsl(0 0% 100% / 0.05)" }}>
                    <Icon className="w-3.5 h-3.5 text-primary mx-auto mb-1" />
                    <p className="text-[12px] font-bold text-primary-foreground/80 tabular-nums leading-tight">{product[key]}</p>
                    <p className="text-[8px] text-primary-foreground/30 uppercase tracking-wider mt-0.5">{SPEC_LABELS[key]}</p>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-[12px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))", boxShadow: "0 8px 24px -6px hsl(var(--primary) / 0.35)" }}
              >
                <MessageCircle className="w-4 h-4" /> Falar com consultor
              </a>
            </div>

            {/* Ideal para — mini block inside hero */}
            <div className="rounded-xl p-5" style={{ background: "hsl(0 0% 100% / 0.02)", border: "1px solid hsl(0 0% 100% / 0.05)" }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary mb-3">Ideal para</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {content.idealFor.map((item) => (
                  <div key={item.title} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div>
                      <p className="text-[12px] font-semibold text-primary-foreground/80">{item.title}</p>
                      <p className="text-[11px] text-primary-foreground/35 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
