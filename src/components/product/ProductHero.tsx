import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft, ChevronRight, Zap, Gauge, Weight, Battery, Clock,
  MessageCircle, Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useCallback } from "react";
import type { Product, ProductColor } from "@/data/products";
import type { ProductContent } from "@/data/product-content";
import ColorSelector from "@/components/product/ColorSelector";

const SPEC_ICONS = { autonomy: Zap, speed: Gauge, motor: Battery, recharge: Clock, load: Weight } as const;
const SPEC_LABELS: Record<string, string> = {
  autonomy: "Autonomia", speed: "Vel. máx.", motor: "Motor", recharge: "Recarga", load: "Carga",
};

interface Props {
  product: Product;
  content: ProductContent;
  onContact: () => void;
}

export default function ProductHero({ product, content, onContact }: Props) {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product.colors?.[0] ?? null
  );

  const handleColorChange = useCallback((color: ProductColor) => {
    setSelectedColor(color);
  }, []);

  // Use color-specific image if available, otherwise default
  const displayImage = selectedColor?.image ?? product.image;

  return (
    <section ref={heroRef} className="relative pb-16 md:pb-24 overflow-hidden">
      {/* Hero ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 60%)", filter: "blur(100px)" }} />

      <div className="container mx-auto px-4 pt-28 md:pt-36 relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-[11px] text-primary-foreground/30 uppercase tracking-[0.12em] mb-12"
        >
          <button onClick={() => navigate("/modelos")} className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" /> Catálogo
          </button>
          <ChevronRight className="w-3 h-3 opacity-40" />
          <span className="text-primary-foreground/50">{product.category}</span>
          <ChevronRight className="w-3 h-3 opacity-40" />
          <span className="text-primary-foreground/70 font-semibold">{product.name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* ── Image Column ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:sticky lg:top-32"
            style={{ y: imageY, scale: imageScale } as any}
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 -m-8 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 60%, hsl(var(--primary) / 0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />

            <div
              className="relative rounded-2xl overflow-hidden group"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(245,245,245,0.95) 100%)",
                border: "1px solid hsl(0 0% 100% / 0.08)",
                boxShadow: "0 40px 100px -25px hsl(0 0% 0% / 0.6), inset 0 1px 0 hsl(0 0% 100% / 0.05)",
              }}
            >
              <div className="p-10 md:p-16">
                <img
                  src={displayImage}
                  alt={product.name}
                  className="w-full h-auto object-contain max-h-[400px] mx-auto transition-transform duration-700 group-hover:scale-[1.03]"
                />
                />
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)" }} />

              {product.badge && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute top-5 left-5 px-3.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-[0.14em] text-primary-foreground flex items-center gap-1.5"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                    boxShadow: "0 4px 16px -4px hsl(var(--primary) / 0.4)",
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  {product.badge}
                </motion.span>
              )}
            </div>

            {/* Reflection glow */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-16 blur-3xl rounded-full pointer-events-none" style={{ background: "hsl(var(--primary) / 0.08)" }} />
          </motion.div>

          {/* ── Text Column ── */}
          <div className="flex flex-col">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 self-start text-[10px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full mb-5"
              style={{
                background: "hsl(var(--primary) / 0.08)",
                color: "hsl(var(--primary))",
                border: "1px solid hsl(var(--primary) / 0.15)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {product.category}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-4xl md:text-5xl lg:text-[3.8rem] text-primary-foreground uppercase tracking-tight leading-[0.92] mb-4"
            >
              {product.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <span
                className="font-display font-black text-3xl md:text-4xl bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
              >
                {product.price}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="space-y-3 mb-8"
            >
              <h2 className="text-primary-foreground/90 text-lg md:text-xl font-semibold leading-snug">
                {content.headline}
              </h2>
              <p className="text-primary-foreground/50 text-[14px] leading-relaxed">
                {content.subheadline}
              </p>
              <p className="text-primary-foreground/30 text-[13px] leading-relaxed">
                {content.supportText}
              </p>
            </motion.div>

            {/* ── Specs Strip ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-5 gap-1 mb-8 rounded-xl overflow-hidden"
              style={{ background: "hsl(0 0% 100% / 0.02)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
            >
              {(["autonomy", "speed", "motor", "recharge", "load"] as const).map((key, i) => {
                const Icon = SPEC_ICONS[key];
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.05 }}
                    className="relative p-3 md:p-4 text-center group/spec cursor-default"
                    style={{
                      borderRight: i < 4 ? "1px solid hsl(0 0% 100% / 0.04)" : "none",
                    }}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover/spec:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 70%)" }} />
                    <Icon className="w-4 h-4 text-primary/70 mx-auto mb-1.5 group-hover/spec:text-primary transition-colors" />
                    <p className="text-[13px] font-bold text-primary-foreground/90 tabular-nums leading-tight">{product[key]}</p>
                    <p className="text-[8px] text-primary-foreground/30 uppercase tracking-widest mt-1">{SPEC_LABELS[key]}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ── CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-10"
            >
              <button
                onClick={onContact}
                className="relative w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-[12px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] overflow-hidden group/cta cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                  boxShadow: "0 12px 32px -8px hsl(var(--primary) / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.1)",
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, hsl(var(--primary-glow)), hsl(var(--primary)))" }} />
                <MessageCircle className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Falar com consultor</span>
              </button>
            </motion.div>

            {/* ── Ideal para ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="rounded-xl p-6 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(0 0% 100% / 0.025) 0%, hsl(0 0% 100% / 0.01) 100%)",
                border: "1px solid hsl(0 0% 100% / 0.06)",
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: "radial-gradient(circle at top right, hsl(var(--primary) / 0.04) 0%, transparent 70%)" }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary mb-4 flex items-center gap-2">
                <span className="w-6 h-[1px] bg-primary/40" />
                Ideal para
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {content.idealFor.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="flex items-start gap-3 group/ideal"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary/60 mt-1.5 shrink-0 group-hover/ideal:bg-primary group-hover/ideal:shadow-[0_0_8px_hsl(var(--primary)/0.4)] transition-all duration-300" />
                    <div>
                      <p className="text-[12px] font-semibold text-primary-foreground/85 group-hover/ideal:text-primary-foreground transition-colors">{item.title}</p>
                      <p className="text-[11px] text-primary-foreground/35 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
