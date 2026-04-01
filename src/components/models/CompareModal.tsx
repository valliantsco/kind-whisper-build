import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Trophy, Zap, Gauge, Weight, Battery, Clock, Check, Equal } from "lucide-react";
import type { Product } from "@/data/products";

interface CompareModalProps {
  open: boolean;
  onClose: () => void;
  products: Product[];
}

const COMPARE_SPECS: { key: keyof Product; label: string; icon: React.ElementType; unit: string; higherIsBetter: boolean }[] = [
  { key: "autonomy", label: "Autonomia", icon: Zap, unit: "km", higherIsBetter: true },
  { key: "speed", label: "Velocidade máx.", icon: Gauge, unit: "km/h", higherIsBetter: true },
  { key: "motor", label: "Motor", icon: Battery, unit: "W", higherIsBetter: true },
  { key: "load", label: "Capacidade de carga", icon: Weight, unit: "kg", higherIsBetter: true },
  { key: "recharge", label: "Tempo de recarga", icon: Clock, unit: "h", higherIsBetter: false },
];

function parseNumeric(val: string): number {
  const match = val.match(/[\d.,]+/);
  if (!match) return 0;
  return parseFloat(match[0].replace(",", "."));
}

function getBestIndex(products: Product[], key: keyof Product, higherIsBetter: boolean): number | null {
  const values = products.map((p) => parseNumeric(String(p[key])));
  if (values.every((v) => v === values[0])) return null;
  const best = higherIsBetter ? Math.max(...values) : Math.min(...values);
  return values.indexOf(best);
}

const CompareModal = ({ open, onClose, products }: CompareModalProps) => {
  if (!open || products.length < 2) return null;

  const commonSpecs = COMPARE_SPECS.filter((spec) => {
    const values = products.map((p) => String(p[spec.key]));
    return values.every((v) => v === values[0]);
  });

  const diffSpecs = COMPARE_SPECS.filter((spec) => {
    const values = products.map((p) => String(p[spec.key]));
    return !values.every((v) => v === values[0]);
  });

  const gridCols = products.length === 2 ? "grid-cols-2" : "grid-cols-3";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "hsl(0 0% 0% / 0.8)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl quiz-scrollbar"
              style={{
                background: "hsl(0 0% 7%)",
                border: "1px solid hsl(0 0% 100% / 0.08)",
                boxShadow: "0 40px 100px -20px hsl(0 0% 0% / 0.9), 0 0 80px -20px hsl(var(--primary) / 0.08)",
              }}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)" }}
              />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-white/10"
                style={{ background: "hsl(0 0% 100% / 0.06)", border: "1px solid hsl(0 0% 100% / 0.1)" }}
              >
                <X className="w-4 h-4 text-primary-foreground/60" />
              </button>

              <div className="p-5 md:p-8">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-px bg-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                      Comparativo
                    </span>
                  </div>
                  <h2 className="font-display font-black text-2xl md:text-3xl text-primary-foreground uppercase tracking-tight">
                    Comparando{" "}
                    <span className="text-primary">{products.length} modelos</span>
                  </h2>
                </div>

                {/* Product headers row */}
                <div className={`grid gap-3 mb-6 ${gridCols}`}>
                  {products.map((p) => (
                    <div
                      key={p.slug}
                      className="rounded-xl p-3 md:p-4 flex flex-col items-center gap-2"
                      style={{ background: "hsl(0 0% 100% / 0.03)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
                    >
                      <div className="w-full h-24 md:h-28 bg-white rounded-lg flex items-center justify-center p-3">
                        <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <h3 className="font-display font-bold text-[12px] md:text-[13px] text-primary-foreground/90 uppercase tracking-wide text-center">
                        {p.name}
                      </h3>
                      <span className="text-[9px] text-primary-foreground/30 uppercase tracking-wider">
                        {p.category}
                      </span>
                      <span
                        className="font-display font-black text-base bg-clip-text text-transparent"
                        style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
                      >
                        {p.price}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Differences */}
                {diffSpecs.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary-foreground/45 mb-3 flex items-center gap-2">
                      <Trophy className="w-3.5 h-3.5 text-primary" />
                      Onde cada modelo se destaca
                    </h3>
                    <div
                      className="rounded-xl overflow-hidden"
                      style={{ border: "1px solid hsl(0 0% 100% / 0.06)" }}
                    >
                      {diffSpecs.map((spec, i) => {
                        const bestIdx = getBestIndex(products, spec.key, spec.higherIsBetter);
                        return (
                          <div
                            key={spec.key}
                            style={{ borderBottom: i < diffSpecs.length - 1 ? "1px solid hsl(0 0% 100% / 0.04)" : "none" }}
                          >
                            {/* Spec label */}
                            <div className="px-3 md:px-4 pt-3 pb-1 flex items-center gap-2">
                              <spec.icon className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                              <span className="text-[10px] text-primary-foreground/45 uppercase tracking-wider font-medium">
                                {spec.label}
                              </span>
                            </div>
                            {/* Values */}
                            <div className={`grid ${gridCols} px-2 pb-3`}>
                              {products.map((p, j) => {
                                const isBest = bestIdx === j;
                                return (
                                  <div
                                    key={p.slug}
                                    className="flex items-center justify-center gap-1.5 py-2 mx-1 rounded-lg transition-colors"
                                    style={{
                                      background: isBest ? "hsl(var(--primary) / 0.08)" : "transparent",
                                    }}
                                  >
                                    <span
                                      className={`text-sm font-bold tabular-nums ${isBest ? "text-primary" : "text-primary-foreground/55"}`}
                                    >
                                      {String(p[spec.key])}
                                    </span>
                                    {isBest && <Check className="w-3.5 h-3.5 text-primary" />}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Common specs */}
                {commonSpecs.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary-foreground/45 mb-3 flex items-center gap-2">
                      <Equal className="w-3.5 h-3.5 text-primary-foreground/30" />
                      O que têm em comum
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {commonSpecs.map((spec) => (
                        <div
                          key={spec.key}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg"
                          style={{ background: "hsl(0 0% 100% / 0.03)", border: "1px solid hsl(0 0% 100% / 0.05)" }}
                        >
                          <spec.icon className="w-3 h-3 text-primary/50" />
                          <span className="text-[10px] text-primary-foreground/35 uppercase tracking-wider">{spec.label}:</span>
                          <span className="text-[11px] text-primary-foreground/65 font-semibold">
                            {String(products[0][spec.key])}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTAs */}
                <div className={`grid gap-3 ${gridCols}`}>
                  {products.map((p) => (
                    <a
                      key={p.slug}
                      href={`/modelos/${p.slug}`}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                        boxShadow: "0 6px 20px -6px hsl(var(--primary) / 0.3)",
                      }}
                    >
                      {p.name}
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CompareModal;