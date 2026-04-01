import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap, Gauge, Weight, Battery, Clock, ArrowRight, Search,
  SlidersHorizontal, X, BarChart3, Eye, Sparkles, ChevronLeft, ChevronRight, ArrowUpDown,
} from "lucide-react";
import Header from "@/components/Header";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PopUpContato01 from "@/components/PopUpContato01";
import HomeFooter from "@/components/home/HomeFooter";
import CompareModal from "@/components/models/CompareModal";
import QuizEngine from "@/components/quiz/QuizEngine";
import { msEletricQuizConfig } from "@/components/QuizSection";
import { PRODUCTS, CATEGORIES, type CategoryFilter, type Product } from "@/data/products";

const SPECS = [
  { icon: Zap, key: "autonomy" as const, label: "Autonomia" },
  { icon: Gauge, key: "speed" as const, label: "Vel. máx." },
  { icon: Battery, key: "motor" as const, label: "Motor" },
  { icon: Clock, key: "recharge" as const, label: "Recarga" },
  { icon: Weight, key: "load" as const, label: "Carga" },
];

type SortOption = "relevance" | "price-asc" | "price-desc" | "name-asc" | "autonomy-desc" | "speed-desc";
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevância" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "name-asc", label: "A → Z" },
  { value: "autonomy-desc", label: "Maior autonomia" },
  { value: "speed-desc", label: "Maior velocidade" },
];

const MAX_COMPARE = 3;

/* ── Category Pills (swipe only) ── */
const CategoryPills = ({
  categories,
  activeCategory,
  onSelect,
  categoryCount,
}: {
  categories: readonly CategoryFilter[];
  activeCategory: CategoryFilter;
  onSelect: (cat: CategoryFilter) => void;
  categoryCount: (cat: CategoryFilter) => number;
}) => (
  <div className="flex items-center gap-1">
    <SlidersHorizontal className="w-3.5 h-3.5 text-primary-foreground/25 shrink-0 mr-1 hidden md:block" />
    <div
      className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-0.5 flex-1 px-1"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
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
);


/* ── Searchable Filter Bar ── */
const SearchableFilterBar = ({
  searchQuery, setSearchQuery, categories, activeCategory, setActiveCategory, categoryCount, selectedCount, maxCompare, sortBy, setSortBy,
}: {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  categories: readonly CategoryFilter[];
  activeCategory: CategoryFilter;
  setActiveCategory: (c: CategoryFilter) => void;
  categoryCount: (c: CategoryFilter) => number;
  selectedCount: number;
  maxCompare: number;
  sortBy: SortOption;
  setSortBy: (v: SortOption) => void;
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const closeSearch = () => {
    if (!searchQuery.trim()) {
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <AnimatePresence mode="wait">
        {searchOpen ? (
          <motion.div
            key="search-input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex-1"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/25" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar modelo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={closeSearch}
              className="w-full pl-10 pr-9 py-2 rounded-xl text-sm text-primary-foreground placeholder:text-primary-foreground/20 outline-none transition-all focus:ring-1 focus:ring-primary/30"
              style={{
                background: "hsl(0 0% 100% / 0.04)",
                border: "1px solid hsl(0 0% 100% / 0.06)",
              }}
            />
            <button
              onClick={() => { setSearchQuery(""); setSearchOpen(false); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-primary-foreground/30 hover:text-primary-foreground/60 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="pills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <button
              onClick={openSearch}
              className="flex items-center gap-1.5 px-3 h-8 rounded-xl shrink-0 cursor-pointer transition-colors hover:bg-primary-foreground/5"
              style={{
                background: "hsl(0 0% 100% / 0.04)",
                border: "1px solid hsl(0 0% 100% / 0.06)",
              }}
              aria-label="Buscar"
            >
              <Search className="w-3.5 h-3.5 text-primary-foreground/40" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground/40">Buscar</span>
            </button>
            <CategoryPills
              categories={categories}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
              categoryCount={categoryCount}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};


const Models = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  const filtered = useMemo(() => {
    let items = [...PRODUCTS];
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
    const parsePrice = (p: string) => { const n = parseFloat(p.replace(/[^\d]/g, "")); return isNaN(n) ? null : n; };
    const parseNum = (v: string) => parseFloat(v.replace(/[^\d.]/g, "")) || 0;
    switch (sortBy) {
      case "price-asc":
        items.sort((a, b) => (parsePrice(a.price) ?? Infinity) - (parsePrice(b.price) ?? Infinity));
        break;
      case "price-desc":
        items.sort((a, b) => (parsePrice(b.price) ?? 0) - (parsePrice(a.price) ?? 0));
        break;
      case "name-asc":
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "autonomy-desc":
        items.sort((a, b) => parseNum(b.autonomy) - parseNum(a.autonomy));
        break;
      case "speed-desc":
        items.sort((a, b) => parseNum(b.speed) - parseNum(a.speed));
        break;
    }
    return items;
  }, [activeCategory, searchQuery, sortBy]);

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
      {/* ── Unified background (same as Index) ── */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        className="fixed top-0 right-0 w-[1200px] h-[800px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 60%)",
          filter: "blur(140px)",
        }}
        animate={{ x: [0, -200, 0], y: [0, 100, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-0 left-0 w-[1000px] h-[700px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.04) 0%, transparent 55%)",
          filter: "blur(120px)",
        }}
        animate={{ x: [0, 150, 0], y: [0, -80, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(160deg, hsl(0 0% 100% / 0.01) 0%, transparent 35%, hsl(var(--primary) / 0.015) 100%)",
        }}
      />

      <div className="relative z-10">
        <Header onContactClick={() => setContactOpen(true)} />

        {/* Hero header */}
        <section className="pt-32 pb-6 md:pt-40 md:pb-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              {/* Left – title */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex-1"
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

              {/* Right – Quiz CTA card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden p-5 md:p-7 md:max-w-md w-full shrink-0"
                style={{
                  background: "hsl(0 0% 100% / 0.02)",
                  border: "1px solid hsl(0 0% 100% / 0.06)",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 30% 50%, hsl(var(--primary) / 0.06) 0%, transparent 60%)",
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                      Quiz inteligente
                    </span>
                  </div>
                  <h3 className="font-display font-black text-lg md:text-xl text-primary-foreground uppercase tracking-tight mb-2">
                    Não sabe qual{" "}
                    <span className="text-primary">escolher?</span>
                  </h3>
                  <p className="text-[13px] text-primary-foreground/40 leading-relaxed mb-5">
                    Responda algumas perguntas rápidas e nossa IA recomenda o modelo ideal para o seu perfil, rotina e orçamento.
                  </p>
                  <button
                    onClick={() => setQuizOpen(true)}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.97]"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                      boxShadow: "0 8px 24px -6px hsl(var(--primary) / 0.35)",
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                    Fazer o quiz
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Inline Filter Bar ── */}
        <section className="pb-6">
          <div className="container mx-auto px-4">
            <div
              className="rounded-xl py-3 px-4"
              style={{
                background: "hsl(0 0% 100% / 0.03)",
                border: "1px solid hsl(0 0% 100% / 0.06)",
              }}
            >
              <SearchableFilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                categories={CATEGORIES}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                categoryCount={categoryCount}
                selectedCount={selectedSlugs.length}
                maxCompare={MAX_COMPARE}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>
          </div>
        </section>


        {/* Product grid */}
        <section className="pb-12">
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
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-5 py-3.5 rounded-2xl"
            style={{
              background: "hsl(0 0% 6% / 0.95)",
              border: "1px solid hsl(var(--primary) / 0.2)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 24px 80px -16px hsl(0 0% 0% / 0.7), 0 0 40px -8px hsl(var(--primary) / 0.1)",
            }}
          >
            <div className="flex items-center -space-x-2">
              {selectedProducts.map((p) => (
                <div
                  key={p.slug}
                  className="w-10 h-10 rounded-lg bg-white flex items-center justify-center p-1 relative"
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

            <span className="text-[10px] text-primary-foreground/40 uppercase tracking-wider font-medium">
              {selectedSlugs.length}/{MAX_COMPARE}
            </span>

            <button
              onClick={() => setCompareOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                boxShadow: "0 4px 16px -4px hsl(var(--primary) / 0.4)",
              }}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Comparar agora
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
      <QuizEngine config={msEletricQuizConfig} open={quizOpen} onOpenChange={setQuizOpen} />
    </div>
  );
};

/* ── Product Card ── */
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
        className="h-full rounded-2xl overflow-hidden transition-all duration-400 relative flex flex-col"
        style={{
          background: isHovered ? "hsl(0 0% 100% / 0.04)" : "hsl(0 0% 100% / 0.02)",
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
        <div className="p-4 pt-3 flex-1 flex flex-col">
          <div className="flex items-baseline justify-between mb-1.5">
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

          {/* Description */}
          <p className="text-[11px] text-primary-foreground/35 leading-relaxed mb-3 line-clamp-3">
            {product.description}
          </p>

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

          {/* Action buttons */}
          <div className="mt-auto flex gap-2">
            {/* View details CTA */}
            <Link
              to={`/modelos/${product.slug}`}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-300"
              style={{
                border: `1px solid ${isHovered ? "hsl(var(--primary) / 0.3)" : "hsl(0 0% 100% / 0.06)"}`,
                color: isHovered ? "hsl(var(--primary))" : "hsl(0 0% 100% / 0.45)",
                background: isHovered ? "hsl(var(--primary) / 0.06)" : "transparent",
              }}
            >
              <Eye className="w-3 h-3" />
              Ver detalhes
            </Link>

            {/* Compare button — EXPLICIT */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!isSelected && !canSelect) return;
                onToggleSelect(product.slug);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 cursor-pointer ${
                !isSelected && !canSelect ? "opacity-30 cursor-not-allowed" : ""
              }`}
              style={{
                background: isSelected
                  ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))"
                  : "hsl(0 0% 100% / 0.04)",
                border: `1px solid ${isSelected ? "hsl(var(--primary) / 0.5)" : "hsl(0 0% 100% / 0.08)"}`,
                color: isSelected ? "hsl(0 0% 100%)" : "hsl(0 0% 100% / 0.5)",
              }}
              title={isSelected ? "Remover da comparação" : canSelect ? "Adicionar à comparação" : "Máximo de 3"}
            >
              <BarChart3 className="w-3 h-3" />
              {isSelected ? "✓" : "Comparar"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Models;