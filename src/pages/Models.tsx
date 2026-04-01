import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap, Gauge, Weight, Battery, Clock, ArrowRight, Search,
  SlidersHorizontal, CheckCircle2, X, BarChart3, Eye,
} from "lucide-react";
import Header from "@/components/Header";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PopUpContato01 from "@/components/PopUpContato01";
import HomeFooter from "@/components/home/HomeFooter";
import CompareModal from "@/components/models/CompareModal";
import { PRODUCTS, CATEGORIES, type CategoryFilter, type Product } from "@/data/products";

const SPECS = [
  { icon: Zap, key: "autonomy" as const, label: "Autonomia" },
  { icon: Gauge, key: "speed" as const, label: "Vel. máx." },
  { icon: Battery, key: "motor" as const, label: "Motor" },
  { icon: Clock, key: "recharge" as const, label: "Recarga" },
  { icon: Weight, key: "load" as const, label: "Carga" },
];

const MAX_COMPARE = 3;

const Models = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  const filtered = useMemo(() => {
    let items = PRODUCTS;
    if (activeCategory !== "Todos") {
      items = items.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeCategory, searchQuery]);

  const categoryCount = (cat: CategoryFilter) =>
    cat === "Todos"
      ? PRODUCTS.length
      : PRODUCTS.filter((p) => p.category === cat).length;

  const toggleSelect = useCallback((slug: string) => {
    setSelectedSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, slug];
    });
  }, []);

  const selectedProducts = useMemo(
    () => PRODUCTS.filter((p) => selectedSlugs.includes(p.slug)),
    [selectedSlugs]
  );

  return (
    <div className="min-h-screen relative" style={{ background: "hsl(0 0% 4%)" }}>
      {/* Background effects */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-0"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <motion.div
        className="fixed top-0 right-0 w-[1200px] h-[800px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.05) 0%, transparent 60%)",
          filter: "blur(140px)",
        }}
        animate={{ x: [0, -200, 0], y: [0, 100, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        <Header onContactClick={() => setContactOpen(true)} />

        {/* Hero header */}
        <section className="pt-32 pb-6 md:pt-40 md:pb-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-primary" />
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
                  Catálogo completo
                </span>
              </div>
              <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-3">
                Nossos{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                  }}
                >
                  Modelos
                </span>
              </h1>
              <p className="text-sm md:text-base text-primary-foreground/40 leading-relaxed max-w-xl">
                Veículos 100% elétricos que unem tecnologia, economia e praticidade — da mobilidade urbana ao uso profissional.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section
          className="sticky top-[72px] z-30 py-3"
          style={{
            background: "hsl(0 0% 4% / 0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid hsl(0 0% 100% / 0.04)",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              {/* Search */}
              <div className="relative md:w-64 shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/25" />
                <input
                  type="text"
                  placeholder="Buscar modelo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl text-sm text-primary-foreground placeholder:text-primary-foreground/20 outline-none transition-all focus:ring-1 focus:ring-primary/30"
                  style={{
                    background: "hsl(0 0% 100% / 0.04)",
                    border: "1px solid hsl(0 0% 100% / 0.06)",
                  }}
                />
              </div>

              {/* Category pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-primary-foreground/25 shrink-0 mr-1 hidden md:block" />
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] transition-all duration-200 cursor-pointer whitespace-nowrap"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))"
                          : "hsl(0 0% 100% / 0.03)",
                        border: `1px solid ${isActive ? "hsl(var(--primary) / 0.4)" : "hsl(0 0% 100% / 0.05)"}`,
                        color: isActive ? "hsl(0 0% 100%)" : "hsl(0 0% 100% / 0.45)",
                      }}
                    >
                      {cat}
                      <span className="ml-1 opacity-50">{categoryCount(cat)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Results count + compare hint */}
        <div className="container mx-auto px-4 pt-5 pb-2 flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.15em] text-primary-foreground/25 font-medium">
            {filtered.length} {filtered.length === 1 ? "modelo" : "modelos"}
          </p>
          <p className="text-[10px] uppercase tracking-[0.12em] text-primary-foreground/18 font-medium hidden md:flex items-center gap-1.5">
            <BarChart3 className="w-3 h-3" />
            Selecione até {MAX_COMPARE} para comparar
          </p>
        </div>

        {/* Product grid */}
        <section className="pb-28">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filtered.map((product, i) => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    index={i}
                    isSelected={selectedSlugs.includes(product.slug)}
                    canSelect={selectedSlugs.length < MAX_COMPARE}
                    onToggleSelect={toggleSelect}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <p className="text-primary-foreground/30 text-lg mb-2">Nenhum modelo encontrado</p>
                <p className="text-primary-foreground/20 text-sm">
                  Tente buscar por outro termo ou selecione outra categoria.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        <HomeFooter />
      </div>

      {/* ── Floating Compare Bar ── */}
      <AnimatePresence>
        {selectedSlugs.length >= 2 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{
              background: "hsl(0 0% 6% / 0.95)",
              border: "1px solid hsl(0 0% 100% / 0.08)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 24px 80px -16px hsl(0 0% 0% / 0.7), 0 0 0 1px hsl(0 0% 100% / 0.03) inset",
            }}
          >
            <div className="flex items-center -space-x-2">
              {selectedProducts.map((p) => (
                <div
                  key={p.slug}
                  className="w-9 h-9 rounded-lg bg-white flex items-center justify-center p-1 relative"
                  style={{ border: "2px solid hsl(var(--primary) / 0.4)" }}
                >
                  <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                  <button
                    onClick={() => toggleSelect(p.slug)}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center cursor-pointer"
                    style={{ background: "hsl(0 0% 18%)", border: "1px solid hsl(0 0% 100% / 0.12)" }}
                  >
                    <X className="w-2.5 h-2.5 text-primary-foreground/60" />
                  </button>
                </div>
              ))}
            </div>

            <span className="text-[10px] text-primary-foreground/35 uppercase tracking-wider font-medium hidden sm:block">
              {selectedSlugs.length}/{MAX_COMPARE}
            </span>

            <button
              onClick={() => setCompareOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
              }}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Comparar
            </button>

            <button
              onClick={() => setSelectedSlugs([])}
              className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-colors"
              style={{ background: "hsl(0 0% 100% / 0.05)" }}
              title="Limpar seleção"
            >
              <X className="w-3.5 h-3.5 text-primary-foreground/35" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingWhatsApp />
      <PopUpContato01 isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <CompareModal open={compareOpen} onClose={() => setCompareOpen(false)} products={selectedProducts} />
    </div>
  );
};

/* ── Product Card (redesigned) ── */
interface ProductCardProps {
  product: Product;
  index: number;
  isSelected: boolean;
  canSelect: boolean;
  onToggleSelect: (slug: string) => void;
}

const ProductCard = ({ product, index, isSelected, canSelect, onToggleSelect }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div
        className="h-full rounded-2xl overflow-hidden transition-all duration-400 relative"
        style={{
          background: isHovered
            ? "hsl(0 0% 100% / 0.04)"
            : "hsl(0 0% 100% / 0.02)",
          border: `1px solid ${isSelected ? "hsl(var(--primary) / 0.5)" : isHovered ? "hsl(0 0% 100% / 0.12)" : "hsl(0 0% 100% / 0.05)"}`,
          boxShadow: isSelected
            ? "0 0 24px -6px hsl(var(--primary) / 0.15), 0 0 0 1px hsl(var(--primary) / 0.1) inset"
            : isHovered
              ? "0 16px 48px -12px hsl(0 0% 0% / 0.5)"
              : "none",
        }}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-4 right-4 h-[1px] transition-all duration-500 z-[2]"
          style={{
            background: `linear-gradient(90deg, transparent, hsl(var(--primary) / ${isSelected ? 0.7 : isHovered ? 0.5 : 0}), transparent)`,
          }}
        />

        {/* Selection checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (!isSelected && !canSelect) return;
            onToggleSelect(product.slug);
          }}
          className={`absolute top-3 right-3 z-20 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${
            !isSelected && !canSelect ? "opacity-20 cursor-not-allowed" : "opacity-0 group-hover:opacity-100"
          } ${isSelected ? "!opacity-100" : ""}`}
          style={{
            background: isSelected
              ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))"
              : "hsl(0 0% 0% / 0.6)",
            border: `1px solid ${isSelected ? "hsl(var(--primary) / 0.6)" : "hsl(0 0% 100% / 0.12)"}`,
            backdropFilter: "blur(4px)",
          }}
          title={isSelected ? "Remover da comparação" : canSelect ? "Comparar" : "Máximo de 3"}
        >
          {isSelected ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-primary-foreground" />
          ) : (
            <BarChart3 className="w-2.5 h-2.5 text-primary-foreground/50" />
          )}
        </button>

        {/* Image section */}
        <Link to={`/modelos/${product.slug}`} className="block">
          <div className="relative h-44 bg-white flex items-center justify-center overflow-hidden p-6">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Category tag */}
            <span
              className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-[0.12em]"
              style={{
                background: "hsl(0 0% 0% / 0.65)",
                color: "hsl(0 0% 100% / 0.7)",
                backdropFilter: "blur(4px)",
              }}
            >
              {product.category}
            </span>
            {/* Badge */}
            {product.badge && (
              <span
                className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-[0.1em] text-primary-foreground"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary) / 0.9), hsl(var(--primary-glow) / 0.9))",
                }}
              >
                {product.badge}
              </span>
            )}
            {/* Bottom fade */}
            <div
              className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none"
              style={{ background: "linear-gradient(to top, hsl(0 0% 4%), transparent)" }}
            />
          </div>
        </Link>

        {/* Content */}
        <div className="p-4 pt-3">
          <div className="flex items-baseline justify-between mb-2.5">
            <Link to={`/modelos/${product.slug}`} className="group/name">
              <h3 className="font-display font-bold text-[13px] text-primary-foreground/90 uppercase tracking-[0.1em] group-hover/name:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>
            <span
              className="font-display font-black text-sm bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
              }}
            >
              {product.price}
            </span>
          </div>

          {/* Specs mini-grid */}
          <div
            className="grid grid-cols-3 gap-0 mb-3 py-2.5 rounded-lg"
            style={{
              background: "hsl(0 0% 100% / 0.02)",
              border: "1px solid hsl(0 0% 100% / 0.04)",
            }}
          >
            {SPECS.slice(0, 3).map((spec, j) => (
              <div key={spec.key} className="text-center relative">
                {j > 0 && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-4"
                    style={{ background: "hsl(0 0% 100% / 0.06)" }}
                  />
                )}
                <spec.icon className="w-3 h-3 mx-auto mb-0.5 text-primary/70" />
                <p className="text-[10px] font-bold text-primary-foreground/75 tabular-nums">
                  {product[spec.key]}
                </p>
                <p className="text-[7px] text-primary-foreground/25 uppercase tracking-wider mt-0.5">
                  {spec.label}
                </p>
              </div>
            ))}
          </div>

          {/* Secondary specs */}
          <div className="flex items-center justify-center gap-3 mb-3 text-[9px] text-primary-foreground/30">
            {SPECS.slice(3).map((spec) => (
              <span key={spec.key} className="flex items-center gap-1">
                <spec.icon className="w-2.5 h-2.5 text-primary/50" />
                <span className="uppercase tracking-wider">{spec.label}:</span>
                <span className="text-primary-foreground/50 font-medium">{product[spec.key]}</span>
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            to={`/modelos/${product.slug}`}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-300"
            style={{
              border: `1px solid ${isHovered ? "hsl(var(--primary) / 0.3)" : "hsl(0 0% 100% / 0.06)"}`,
              color: isHovered ? "hsl(var(--primary))" : "hsl(0 0% 100% / 0.45)",
              background: isHovered ? "hsl(var(--primary) / 0.06)" : "transparent",
            }}
          >
            <Eye className="w-3 h-3" />
            Ver detalhes
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              transition={{ duration: 0.25 }}
            >
              <ArrowRight className="w-3 h-3" />
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Models;
