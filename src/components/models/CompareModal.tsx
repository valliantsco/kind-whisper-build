import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Trophy, Zap, Gauge, Weight, Battery, Clock, Check } from "lucide-react";
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
  if (values.every((v) => v === values[0])) return null; // all equal
  const best = higherIsBetter ? Math.max(...values) : Math.min(...values);
  return values.indexOf(best);
}

function getOverview(product: Product): string {
  const speed = parseNumeric(product.speed);
  const autonomy = parseNumeric(product.autonomy);
  const load = parseNumeric(product.load);

  if (speed >= 65) return "Ideal para quem busca desempenho e velocidade em trajetos urbanos mais longos.";
  if (autonomy >= 70) return "Excelente autonomia, perfeito para quem percorre distâncias maiores no dia a dia.";
  if (load >= 150) return "Alta capacidade de carga, indicado para uso profissional ou transporte de volumes.";
  if (speed <= 35) return "Compacto e prático, ideal para deslocamentos curtos e mobilidade urbana leve.";
  return "Equilíbrio entre performance e praticidade para o uso cotidiano.";
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

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "hsl(0 0% 0% / 0.75)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl"
              style={{
                background: "hsl(0 0% 7%)",
                border: "1px solid hsl(0 0% 100% / 0.08)",
                boxShadow: "0 40px 100px -20px hsl(0 0% 0% / 0.8)",
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
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                style={{ background: "hsl(0 0% 100% / 0.06)", border: "1px solid hsl(0 0% 100% / 0.08)" }}
              >
                <X className="w-4 h-4 text-primary-foreground/60" />
              </button>

              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-px bg-primary" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                      Comparativo
                    </span>
                  </div>
                  <h2 className="font-display font-black text-2xl md:text-3xl text-primary-foreground uppercase tracking-tight">
                    Comparando{" "}
                    <span className="text-primary">{products.length} modelos</span>
                  </h2>
                </div>

                {/* Product images row */}
                <div className={`grid gap-4 mb-8 ${products.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                  {products.map((p) => (
                    <div
                      key={p.slug}
                      className="rounded-xl p-4 flex flex-col items-center gap-3"
                      style={{ background: "hsl(0 0% 100% / 0.03)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
                    >
                      <div className="w-full h-28 bg-white rounded-lg flex items-center justify-center p-3">
                        <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="text-center">
                        <h3 className="font-display font-bold text-[13px] text-primary-foreground/90 uppercase tracking-wide">
                          {p.name}
                        </h3>
                        <span className="text-[10px] text-primary-foreground/35 uppercase tracking-wider">
                          {p.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Differences table */}
                {diffSpecs.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground/50 mb-4 flex items-center gap-2">
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
                            className={`flex items-center ${i > 0 ? "" : ""}`}
                            style={{ borderBottom: i < diffSpecs.length - 1 ? "1px solid hsl(0 0% 100% / 0.04)" : "none" }}
                          >
                            {/* Label */}
                            <div className="w-36 md:w-44 shrink-0 p-3 md:p-4 flex items-center gap-2">
                              <spec.icon className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                              <span className="text-[11px] text-primary-foreground/50 uppercase tracking-wider font-medium">
                                {spec.label}
                              </span>
                            </div>
                            {/* Values */}
                            <div className={`flex-1 grid ${products.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                              {products.map((p, j) => {
                                const isBest = bestIdx === j;
                                return (
                                  <div
                                    key={p.slug}
                                    className="p-3 md:p-4 flex items-center justify-center gap-1.5"
                                    style={{
                                      background: isBest ? "hsl(var(--primary) / 0.06)" : "transparent",
                                      borderLeft: j > 0 ? "1px solid hsl(0 0% 100% / 0.04)" : "none",
                                    }}
                                  >
                                    <span
                                      className={`text-sm font-bold tabular-nums ${isBest ? "text-primary" : "text-primary-foreground/60"}`}
                                    >
                                      {String(p[spec.key])}
                                    </span>
                                    {isBest && <Check className="w-3 h-3 text-primary" />}
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
                  <div className="mb-8">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground/50 mb-4">
                      O que têm em comum
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {commonSpecs.map((spec) => (
                        <div
                          key={spec.key}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-lg"
                          style={{ background: "hsl(0 0% 100% / 0.03)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
                        >
                          <spec.icon className="w-3.5 h-3.5 text-primary/60" />
                          <span className="text-[11px] text-primary-foreground/40 uppercase tracking-wider">{spec.label}:</span>
                          <span className="text-[12px] text-primary-foreground/70 font-semibold">
                            {String(products[0][spec.key])}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Overview per product */}
                <div className="mb-8">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground/50 mb-4">
                    Melhor para cada situação
                  </h3>
                  <div className={`grid gap-3 ${products.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}>
                    {products.map((p) => (
                      <div
                        key={p.slug}
                        className="rounded-xl p-4"
                        style={{ background: "hsl(0 0% 100% / 0.025)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
                      >
                        <h4 className="font-display font-bold text-[13px] text-primary-foreground/85 uppercase tracking-wide mb-2">
                          {p.name}
                        </h4>
                        <p className="text-[12px] text-primary-foreground/40 leading-relaxed">
                          {getOverview(p)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price comparison + CTAs */}
                <div
                  className="rounded-xl p-5"
                  style={{ background: "hsl(0 0% 100% / 0.025)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
                >
                  <div className={`grid gap-4 ${products.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3"}`}>
                    {products.map((p) => (
                      <div key={p.slug} className="flex flex-col items-center gap-3 text-center">
                        <div>
                          <p className="text-[11px] text-primary-foreground/35 uppercase tracking-wider mb-1">{p.name}</p>
                          <p
                            className="font-display font-black text-xl bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
                          >
                            {p.price}
                          </p>
                        </div>
                        <a
                          href={`/modelos/${p.slug}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
                          style={{
                            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                          }}
                        >
                          Ver detalhes
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
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
