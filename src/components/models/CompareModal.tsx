import { motion, AnimatePresence } from "framer-motion";
import {
  X, ArrowRight, Trophy, Zap, Gauge, Weight, Battery, Clock,
  Check, User, Target, Star, TrendingUp, Lightbulb, MessageCircle, CircleHelp,
} from "lucide-react";
import type { Product } from "@/data/products";

interface CompareModalProps {
  open: boolean;
  onClose: () => void;
  products: Product[];
}

/* ═══════════════════════════════════════════
   Spec definitions
   ═══════════════════════════════════════════ */

const COMPARE_SPECS: {
  key: keyof Product;
  label: string;
  icon: React.ElementType;
  unit: string;
  higherIsBetter: boolean;
}[] = [
  { key: "autonomy", label: "Autonomia", icon: Zap, unit: "km", higherIsBetter: true },
  { key: "speed", label: "Velocidade máx.", icon: Gauge, unit: "km/h", higherIsBetter: true },
  { key: "motor", label: "Motor", icon: Battery, unit: "W", higherIsBetter: true },
  { key: "load", label: "Capacidade de carga", icon: Weight, unit: "kg", higherIsBetter: true },
  { key: "recharge", label: "Tempo de recarga", icon: Clock, unit: "h", higherIsBetter: false },
];

/* ═══════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════ */

function parseNumeric(val: string): number {
  const match = val.match(/[\d.,]+/);
  if (!match) return 0;
  return parseFloat(match[0].replace(",", "."));
}

function parsePrice(price: string): number {
  if (price.toLowerCase().includes("consult")) return Infinity;
  return parseNumeric(price.replace(/[R$\s.]/g, "").replace(",", "."));
}

function getBestIndex(products: Product[], key: keyof Product, higherIsBetter: boolean): number | null {
  const values = products.map((p) => parseNumeric(String(p[key])));
  if (values.every((v) => v === values[0])) return null;
  const best = higherIsBetter ? Math.max(...values) : Math.min(...values);
  return values.indexOf(best);
}

/** Percentage bar width for a spec value relative to the best */
function getBarPercent(products: Product[], key: keyof Product, index: number, higherIsBetter: boolean): number {
  const values = products.map((p) => parseNumeric(String(p[key])));
  const max = Math.max(...values);
  if (max === 0) return 0;
  const v = values[index];
  if (higherIsBetter) return (v / max) * 100;
  // For lower-is-better, invert the bar
  const min = Math.min(...values);
  if (min === max) return 100;
  return ((max - v) / (max - min)) * 60 + 40; // Scale 40-100
}

/* ═══════════════════════════════════════════
   Intelligent labels. derived from product data
   ═══════════════════════════════════════════ */

interface ProductInsight {
  positionLabel: string;
  profileDescription: string;
  idealFor: string;
  mainAdvantage: string;
  bestChoiceIf: string;
  costBenefit: string;
}

function deriveInsights(products: Product[]): ProductInsight[] {
  const prices = products.map((p) => parsePrice(p.price));
  const motors = products.map((p) => parseNumeric(p.motor));
  const autonomies = products.map((p) => parseNumeric(p.autonomy));
  const speeds = products.map((p) => parseNumeric(p.speed));
  const loads = products.map((p) => parseNumeric(p.load));
  const recharges = products.map((p) => parseNumeric(p.recharge));

  // Compute a simple "power score" for ranking
  const scores = products.map((_, i) => {
    let s = 0;
    s += (motors[i] / Math.max(...motors)) * 25;
    s += (autonomies[i] / Math.max(...autonomies)) * 25;
    s += (speeds[i] / Math.max(...speeds)) * 20;
    s += (loads[i] / Math.max(...loads)) * 15;
    const minRecharge = Math.min(...recharges);
    const maxRecharge = Math.max(...recharges);
    s += maxRecharge > minRecharge ? ((maxRecharge - recharges[i]) / (maxRecharge - minRecharge)) * 15 : 15;
    return s;
  });

  // Rank by score
  const ranked = scores.map((s, i) => ({ score: s, idx: i })).sort((a, b) => b.score - a.score);

  // Price rank (lower = more affordable)
  const priceRanked = prices.map((p, i) => ({ price: p, idx: i })).sort((a, b) => a.price - b.price);

  return products.map((product, i) => {
    const scoreRank = ranked.findIndex((r) => r.idx === i);
    const priceRank = priceRanked.findIndex((r) => r.idx === i);
    const n = products.length;
    const isAffordable = priceRank === 0;
    const isMostPowerful = scoreRank === 0;
    const isBalanced = !isAffordable && !isMostPowerful;
    const hasHighAutonomy = autonomies[i] === Math.max(...autonomies);
    const hasHighSpeed = speeds[i] === Math.max(...speeds);
    const hasHighLoad = loads[i] === Math.max(...loads);

    // Position label
    let positionLabel = "Opção equilibrada";
    if (n === 2) {
      positionLabel = isAffordable && !isMostPowerful ? "Mais acessível" : isMostPowerful ? "Mais completo" : "Opção equilibrada";
    } else {
      if (isAffordable && priceRank === 0) positionLabel = "Melhor para entrada";
      else if (isMostPowerful) positionLabel = "Mais robusta";
      else if (isBalanced) positionLabel = "Opção equilibrada";
    }
    // Override with more specific labels
    if (hasHighAutonomy && hasHighSpeed) positionLabel = "Mais potência";
    if (hasHighLoad && !hasHighSpeed) positionLabel = "Maior capacidade";

    // Profile description
    let profileDescription = `Boa escolha para quem busca equilíbrio entre desempenho, autonomia e investimento.`;
    if (isAffordable && !isMostPowerful) {
      profileDescription = `Ideal para quem quer começar na mobilidade elétrica com menor investimento e uso no dia a dia.`;
    } else if (isMostPowerful) {
      profileDescription = `Mais indicada para quem precisa de mais entrega em potência, velocidade ou autonomia.`;
    }
    if (hasHighLoad) {
      profileDescription = `Excelente para quem precisa de alta capacidade de carga e robustez em operação frequente.`;
    }

    // Ideal for
    let idealFor = "uso misto e rotina variada";
    if (speeds[i] >= 50) idealFor = "trânsito urbano, trajetos médios e uso frequente";
    else if (speeds[i] <= 32 && motors[i] <= 600) idealFor = "deslocamentos curtos, uso leve e diário";
    else if (hasHighLoad) idealFor = "transporte de carga, entregas e operação profissional";
    if (product.category === "Infantil") idealFor = "lazer infantil e diversão ao ar livre";
    if (product.category === "Patinetes") idealFor = "última milha, mobilidade leve e portabilidade";

    // Main advantage
    let mainAdvantage = "equilíbrio geral entre atributos";
    if (isAffordable && priceRank === 0) mainAdvantage = "menor investimento inicial";
    if (hasHighAutonomy) mainAdvantage = "maior autonomia por carga";
    if (hasHighSpeed) mainAdvantage = "maior velocidade máxima";
    if (hasHighLoad) mainAdvantage = "maior capacidade de carga";
    if (isMostPowerful && !hasHighAutonomy && !hasHighSpeed) mainAdvantage = "mais potência e robustez geral";

    // Best choice if
    let bestChoiceIf = "quer um veículo versátil e confiável";
    if (isAffordable) bestChoiceIf = "quer economizar no investimento";
    if (isMostPowerful) bestChoiceIf = "precisa de mais potência e desempenho";
    if (isBalanced) bestChoiceIf = "busca o melhor equilíbrio entre custo e performance";

    // Cost-benefit
    let costBenefit = `Entrega sólida para a faixa de preço, sem excessos nem concessões.`;
    if (isAffordable) {
      costBenefit = `Melhor opção para quem busca menor investimento inicial com funcionalidade essencial.`;
    } else if (isMostPowerful) {
      costBenefit = `Investimento maior, mas com retorno proporcional em potência, autonomia e robustez.`;
    }
    // Check if there's a clear value anomaly (high specs for low price)
    if (priceRank === 0 && scoreRank <= 1) {
      costBenefit = `Excelente relação custo-benefício. entrega mais do que a faixa de preço sugere.`;
      positionLabel = "Melhor custo-benefício";
    }

    return {
      positionLabel,
      profileDescription,
      idealFor,
      mainAdvantage,
      bestChoiceIf,
      costBenefit,
    };
  });
}

/* ═══════════════════════════════════════════
   Section Header component
   ═══════════════════════════════════════════ */

const SectionHeader = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex items-center gap-2.5 mb-4">
    <div
      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
      style={{
        background: "hsl(var(--primary) / 0.1)",
        border: "1px solid hsl(var(--primary) / 0.18)",
      }}
    >
      <Icon className="w-3.5 h-3.5 text-primary" />
    </div>
    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground/50">
      {label}
    </span>
    <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, hsl(0 0% 100% / 0.06), transparent)" }} />
  </div>
);

/* ═══════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════ */

const CompareModal = ({ open, onClose, products }: CompareModalProps) => {
  if (!open || products.length < 2) return null;

  const gridCols = products.length === 2 ? "grid-cols-2" : "grid-cols-3";
  const insights = deriveInsights(products);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "hsl(0 0% 0% / 0.85)", backdropFilter: "blur(16px)" }}
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
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl quiz-scrollbar"
              style={{
                background: "linear-gradient(180deg, hsl(0 0% 8%) 0%, hsl(0 0% 6%) 100%)",
                border: "1px solid hsl(0 0% 100% / 0.08)",
                boxShadow:
                  "0 50px 120px -30px hsl(0 0% 0% / 0.95), 0 0 100px -30px hsl(var(--primary) / 0.1)",
              }}
              initial={{ scale: 0.95, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.7), hsl(var(--primary-glow) / 0.5), transparent)",
                }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-white/10"
                style={{
                  background: "hsl(0 0% 100% / 0.06)",
                  border: "1px solid hsl(0 0% 100% / 0.1)",
                }}
              >
                <X className="w-4 h-4 text-primary-foreground/60" />
              </button>

              <div className="p-5 md:p-8 lg:p-10">
                {/* ═══ 1. HEADER ═══ */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="px-3 py-1 rounded-full flex items-center gap-1.5"
                      style={{
                        background: "hsl(var(--primary) / 0.08)",
                        border: "1px solid hsl(var(--primary) / 0.15)",
                      }}
                    >
                      <TrendingUp className="w-3 h-3 text-primary" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
                        Comparativo inteligente
                      </span>
                    </div>
                  </div>

                  <h2 className="font-display font-black text-2xl md:text-3xl text-primary-foreground uppercase tracking-tight leading-tight mb-2">
                    Comparando{" "}
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                      }}
                    >
                      {products.length} modelos
                    </span>
                  </h2>
                  <p className="text-[13px] text-primary-foreground/40 leading-relaxed max-w-xl">
                    Entenda as diferenças e descubra qual opção faz mais sentido para o seu perfil de uso, rotina e objetivo.
                  </p>
                </div>

                {/* ═══ 2. PRODUCT CARDS ═══ */}
                <div className={`grid gap-3 md:gap-4 mb-8 ${gridCols}`}>
                  {products.map((p, i) => (
                    <motion.div
                      key={p.slug}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="rounded-xl overflow-hidden relative group"
                      style={{
                        background: "hsl(0 0% 100% / 0.025)",
                        border: "1px solid hsl(0 0% 100% / 0.07)",
                      }}
                    >
                      {/* Top highlight */}
                      <div
                        className="h-[2px]"
                        style={{
                          background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)`,
                        }}
                      />

                      <div className="p-3 md:p-4">
                        {/* Image */}
                        <div className="w-full h-24 md:h-32 bg-white rounded-lg flex items-center justify-center p-3 mb-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="max-h-full max-w-full object-contain"
                            loading="lazy"
                          />
                        </div>

                        {/* Position label / seal */}
                        <div
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md mb-2"
                          style={{
                            background: "hsl(var(--primary) / 0.08)",
                            border: "1px solid hsl(var(--primary) / 0.12)",
                          }}
                        >
                          <Star className="w-2.5 h-2.5 text-primary" />
                          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-primary">
                            {insights[i].positionLabel}
                          </span>
                        </div>

                        {/* Name & category */}
                        <h3 className="font-display font-bold text-[13px] md:text-sm text-primary-foreground/90 uppercase tracking-wide mb-0.5">
                          {p.name}
                        </h3>
                        <span className="text-[9px] text-primary-foreground/30 uppercase tracking-wider block mb-2">
                          {p.category}
                        </span>

                        {/* Price */}
                        <span
                          className="font-display font-black text-base md:text-lg bg-clip-text text-transparent"
                          style={{
                            backgroundImage:
                              "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                          }}
                        >
                          {p.price}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* ═══ 3. PROFILE MATCH. "Qual modelo combina com você" ═══ */}
                <div className="mb-8">
                  <SectionHeader icon={User} label="Qual modelo combina com você" />

                  <div className={`grid gap-3 ${gridCols}`}>
                    {products.map((p, i) => (
                      <div
                        key={`profile-${p.slug}`}
                        className="rounded-xl p-4 relative"
                        style={{
                          background: "hsl(0 0% 100% / 0.02)",
                          border: "1px solid hsl(0 0% 100% / 0.05)",
                        }}
                      >
                        <h4 className="font-display font-bold text-[11px] text-primary-foreground/70 uppercase tracking-wide mb-2">
                          {p.name}
                        </h4>
                        <p className="text-[12px] text-primary-foreground/40 leading-relaxed">
                          {insights[i].profileDescription}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ═══ 4. SPEC TABLE. enriched with bars ═══ */}
                <div className="mb-8">
                  <SectionHeader icon={Trophy} label="Comparativo de atributos" />

                  <div
                    className="rounded-xl overflow-hidden"
                    style={{ border: "1px solid hsl(0 0% 100% / 0.06)" }}
                  >
                    {COMPARE_SPECS.map((spec, si) => {
                      const bestIdx = getBestIndex(products, spec.key, spec.higherIsBetter);
                      const allEqual = bestIdx === null;
                      return (
                        <div
                          key={spec.key}
                          style={{
                            borderBottom:
                              si < COMPARE_SPECS.length - 1
                                ? "1px solid hsl(0 0% 100% / 0.04)"
                                : "none",
                          }}
                        >
                          {/* Spec label row */}
                          <div className="px-4 pt-3.5 pb-1 flex items-center gap-2">
                            <spec.icon className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                            <span className="text-[10px] text-primary-foreground/40 uppercase tracking-wider font-medium">
                              {spec.label}
                            </span>
                          </div>

                          {/* Values with visual bar */}
                          <div className={`grid ${gridCols} px-2 pb-3.5 gap-1`}>
                            {products.map((p, j) => {
                              const isBest = bestIdx === j;
                              const barPct = getBarPercent(products, spec.key, j, spec.higherIsBetter);
                              return (
                                <div key={p.slug} className="px-2">
                                  <div
                                    className="flex items-center justify-between gap-1.5 py-2 px-3 rounded-lg"
                                    style={{
                                      background: isBest
                                        ? "hsl(var(--primary) / 0.08)"
                                        : "hsl(0 0% 100% / 0.015)",
                                    }}
                                  >
                                    <span
                                      className={`text-[13px] font-bold tabular-nums ${
                                        isBest
                                          ? "text-primary"
                                          : "text-primary-foreground/55"
                                      }`}
                                    >
                                      {String(p[spec.key])}
                                    </span>
                                    {isBest && !allEqual && (
                                      <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                                    )}
                                  </div>
                                  {/* Bar indicator */}
                                  {!allEqual && (
                                    <div className="mt-1.5 h-[3px] rounded-full overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.04)" }}>
                                      <motion.div
                                        className="h-full rounded-full"
                                        style={{
                                          background: isBest
                                            ? "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))"
                                            : "hsl(0 0% 100% / 0.1)",
                                        }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${barPct}%` }}
                                        transition={{ delay: 0.2 + si * 0.06, duration: 0.6, ease: "easeOut" }}
                                      />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ═══ 5. PRACTICAL INSIGHTS ═══ */}
                <div className="mb-8">
                  <SectionHeader icon={Target} label="Leitura prática" />

                  <div className={`grid gap-3 ${gridCols}`}>
                    {products.map((p, i) => (
                      <div
                        key={`insights-${p.slug}`}
                        className="rounded-xl p-4 space-y-3"
                        style={{
                          background: "hsl(0 0% 100% / 0.02)",
                          border: "1px solid hsl(0 0% 100% / 0.05)",
                        }}
                      >
                        <h4 className="font-display font-bold text-[11px] text-primary-foreground/70 uppercase tracking-wide mb-3">
                          {p.name}
                        </h4>

                        {[
                          { label: "Indicado para", value: insights[i].idealFor },
                          { label: "Principal vantagem", value: insights[i].mainAdvantage },
                          { label: "Melhor escolha se você quer", value: insights[i].bestChoiceIf },
                        ].map((item) => (
                          <div key={item.label}>
                            <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-primary/70 block mb-0.5">
                              {item.label}
                            </span>
                            <p className="text-[11px] text-primary-foreground/45 leading-relaxed capitalize">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ═══ 6. COST-BENEFIT ═══ */}
                <div className="mb-8">
                  <SectionHeader icon={TrendingUp} label="Resumo de valor" />

                  <div className={`grid gap-3 ${gridCols}`}>
                    {products.map((p, i) => (
                      <div
                        key={`cost-${p.slug}`}
                        className="rounded-xl p-4 relative overflow-hidden"
                        style={{
                          background: "hsl(0 0% 100% / 0.02)",
                          border: "1px solid hsl(0 0% 100% / 0.05)",
                        }}
                      >
                        {/* Subtle glow */}
                        <div
                          className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                          style={{
                            background:
                              "radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 70%)",
                          }}
                        />

                        <div className="relative">
                          <h4 className="font-display font-bold text-[11px] text-primary-foreground/70 uppercase tracking-wide mb-1">
                            {p.name}
                          </h4>
                          <span
                            className="font-display font-black text-sm bg-clip-text text-transparent block mb-2"
                            style={{
                              backgroundImage:
                                "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                            }}
                          >
                            {p.price}
                          </span>
                          <p className="text-[11px] text-primary-foreground/40 leading-relaxed">
                            {insights[i].costBenefit}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ═══ 7. DECISION BLOCK ═══ */}
                <div className="mb-8">
                  <div
                    className="rounded-xl p-5 md:p-6 relative overflow-hidden"
                    style={{
                      background: "hsl(0 0% 100% / 0.02)",
                      border: "1px solid hsl(var(--primary) / 0.1)",
                    }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.05) 0%, transparent 60%)",
                      }}
                    />

                    <div className="relative">
                      <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="w-4 h-4 text-primary" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                          Recomendação rápida
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {products.map((p, i) => (
                          <div key={`rec-${p.slug}`} className="flex items-start gap-3">
                            <div
                              className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                              style={{
                                background: "hsl(var(--primary) / 0.1)",
                                border: "1px solid hsl(var(--primary) / 0.15)",
                              }}
                            >
                              <ArrowRight className="w-2.5 h-2.5 text-primary" />
                            </div>
                            <p className="text-[12px] text-primary-foreground/50 leading-relaxed">
                              <span className="font-bold text-primary-foreground/80">
                                Escolha {p.name}
                              </span>{" "}
                              se você {insights[i].bestChoiceIf}.
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ═══ 8. CTAs ═══ */}
                <div className={`grid gap-3 ${gridCols}`}>
                  {products.map((p) => (
                    <div key={`cta-${p.slug}`} className="space-y-2">
                      <a
                        href={`/modelos/${p.slug}`}
                        className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                          boxShadow:
                            "0 8px 24px -6px hsl(var(--primary) / 0.35)",
                        }}
                      >
                        Ver detalhes
                        <ArrowRight className="w-3 h-3" />
                      </a>
                      <a
                        href={`https://wa.me/5534999999999?text=Olá! Gostaria de saber mais sobre o modelo ${p.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-medium uppercase tracking-[0.1em] text-primary-foreground/40 hover:text-primary-foreground/70 transition-all duration-200"
                        style={{
                          border: "1px solid hsl(0 0% 100% / 0.06)",
                          background: "hsl(0 0% 100% / 0.015)",
                        }}
                      >
                        <MessageCircle className="w-3 h-3" />
                        Falar com especialista
                      </a>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div
                  className="mt-6 pt-5 flex items-center justify-center gap-3"
                  style={{ borderTop: "1px solid hsl(0 0% 100% / 0.05)" }}
                >
                  <CircleHelp className="w-3.5 h-3.5 text-primary/50" />
                  <span className="text-[10px] text-primary-foreground/25 tracking-wide">
                    Ainda em dúvida? Faça o{" "}
                    <a href="/modelos#quiz" className="text-primary underline underline-offset-2 hover:text-primary/80">
                      Quiz Inteligente
                    </a>{" "}
                    e receba uma recomendação personalizada.
                  </span>
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
