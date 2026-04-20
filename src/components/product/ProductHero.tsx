import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft, ChevronRight, Zap, Gauge, Weight, Battery, Clock,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
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
  selectedColor: ProductColor | null;
  onColorChange: (color: ProductColor) => void;
}

export default function ProductHero({ product, content, onContact, selectedColor, onColorChange }: Props) {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const displayImage = selectedColor?.image ?? product.image;

  return (
    <section ref={heroRef} className="relative pb-12 md:pb-24 overflow-hidden">
      {/* Hero ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[300px] md:h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 60%)", filter: "blur(100px)" }} />

      <div className="container mx-auto px-4 pt-24 md:pt-36 relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-[10px] md:text-[11px] text-primary-foreground/30 uppercase tracking-[0.12em] mb-8 md:mb-12 overflow-x-auto"
        >
          <button onClick={() => navigate("/modelos")} className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer group shrink-0">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" /> Catálogo
          </button>
          <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />
          <span className="text-primary-foreground/50 shrink-0">{product.category}</span>
          <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />
          <span className="text-primary-foreground/70 font-semibold shrink-0">{product.name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
          {/* ── Image Column ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:sticky lg:top-32"
            style={{ y: imageY, scale: imageScale } as any}
          >
            <div className="absolute inset-0 -m-8 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 60%, hsl(var(--primary) / 0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />

            <div
              className="relative rounded-2xl overflow-hidden group"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(245,245,245,0.95) 100%)",
                border: "1px solid hsl(0 0% 100% / 0.08)",
                boxShadow: "0 40px 100px -25px hsl(0 0% 0% / 0.6), inset 0 1px 0 hsl(0 0% 100% / 0.05)",
              }}
            >
              <div className="p-6 md:p-16">
                <img
                  src={displayImage}
                  alt={product.name}
                  className="w-full h-auto object-contain max-h-[280px] md:max-h-[400px] mx-auto transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              {/* Illustrative disclaimer */}
              <span className="absolute bottom-3 right-4 text-[9px] text-foreground/30 tracking-wide">
                Imagem meramente ilustrativa
              </span>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)" }} />

              {product.badge && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute top-4 left-4 md:top-5 md:left-5 px-3 py-1 md:px-3.5 md:py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-[0.14em] text-primary-foreground flex items-center gap-1.5"
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

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-16 blur-3xl rounded-full pointer-events-none" style={{ background: "hsl(var(--primary) / 0.08)" }} />
          </motion.div>

          {/* ── Text Column ── */}
          <div className="flex flex-col">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 self-start text-[10px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full mb-4 md:mb-5"
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
              className="font-display font-black text-4xl md:text-6xl lg:text-[4.5rem] text-primary-foreground uppercase tracking-tight leading-[0.90] mb-3 md:mb-4"
            >
              {product.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-5 md:mb-6"
            >
              <span
                className="font-display font-black text-2xl md:text-4xl bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
              >
                {product.price}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="space-y-2 mb-6 md:mb-8"
            >
              <h2 className="text-primary-foreground/90 text-xl md:text-2xl font-semibold leading-snug">
                {content.headline}
              </h2>
              <p className="text-primary-foreground/45 text-sm md:text-base leading-relaxed line-clamp-3">
                {content.subheadline}
              </p>
            </motion.div>

            {/* ── Color Selector ── */}
            {product.colors && product.colors.length > 0 && (
              <ColorSelector colors={product.colors} onColorChange={onColorChange} />
            )}

            {/* ── Specs Strip. 3 cols on mobile, 5 on md+ ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 md:grid-cols-5 gap-px mb-6 md:mb-8 rounded-xl overflow-hidden"
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
                      borderRight: (i < 2 || (i >= 3 && i < 4)) ? "1px solid hsl(0 0% 100% / 0.04)" : "none",
                      borderBottom: i < 3 ? "1px solid hsl(0 0% 100% / 0.04)" : "none",
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover/spec:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 70%)" }} />
                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary/70 mx-auto mb-1 md:mb-1.5 group-hover/spec:text-primary transition-colors" />
                    <p className="text-[12px] md:text-[13px] font-bold text-primary-foreground/90 tabular-nums leading-tight">{product[key]}</p>
                    <p className="text-[7px] md:text-[8px] text-primary-foreground/30 uppercase tracking-widest mt-0.5">{SPEC_LABELS[key]}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ── CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8 md:mb-10"
            >
              <button
                onClick={onContact}
                className="relative w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 md:px-8 md:py-4 rounded-xl text-[12px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] overflow-hidden group/cta cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                  boxShadow: "0 12px 32px -8px hsl(var(--primary) / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.1)",
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, hsl(var(--primary-glow)), hsl(var(--primary)))" }} />
                <svg className="w-4 h-4 relative z-10" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.33 0-4.49-.744-6.255-2.01l-.438-.328-3.205 1.074 1.074-3.205-.328-.438A9.71 9.71 0 012.25 12 9.75 9.75 0 0112 2.25 9.75 9.75 0 0121.75 12 9.75 9.75 0 0112 21.75z"/></svg>
                <span className="relative z-10">Falar com consultor</span>
              </button>
            </motion.div>

            {/* ── Ideal para ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="rounded-xl p-5 md:p-6 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(0 0% 100% / 0.025) 0%, hsl(0 0% 100% / 0.01) 100%)",
                border: "1px solid hsl(0 0% 100% / 0.06)",
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: "radial-gradient(circle at top right, hsl(var(--primary) / 0.04) 0%, transparent 70%)" }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary mb-3 md:mb-4 flex items-center gap-2">
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
