import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap, Gauge, Weight, Battery, Clock, ArrowRight, Search,
  SlidersHorizontal, X, BarChart3, Eye, Sparkles, ChevronLeft, ChevronRight, ArrowUpDown, CircleHelp,
} from "lucide-react";
import Header from "@/components/Header";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PopUpContato01 from "@/components/PopUpContato01";
import HomeFooter from "@/components/home/HomeFooter";
import CompareModal from "@/components/models/CompareModal";
import QuizEngine from "@/components/quiz/QuizEngine";
import { msEletricQuizConfig } from "@/components/QuizSection";
import { PRODUCTS, CATEGORIES, type CategoryFilter, type Product } from "@/data/products";
import AnimatedBackground from "@/components/home/AnimatedBackground";

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
      className="flex items-center gap-1.5 scrollbar-hide pb-0.5 px-1"
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
            className="flex items-center gap-2 pl-[3px]"
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
    <div className="min-h-screen relative" style={{ background: "hsl(0 0% 3.5%)" }}>
      {/* ── Layered background system ── */}

      {/* Dot grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.018] z-0"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Primary glow — top right (animated) */}
      <motion.div
        className="fixed top-[-200px] right-[-200px] w-[1400px] h-[900px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at 60% 40%, hsl(var(--primary) / 0.07) 0%, hsl(var(--primary) / 0.02) 40%, transparent 70%)",
          filter: "blur(160px)",
        }}
        animate={{ x: [0, -180, 0], y: [0, 80, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary glow — bottom left (animated) */}
      <motion.div
        className="fixed bottom-[-150px] left-[-200px] w-[1100px] h-[750px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at 40% 60%, hsl(var(--primary) / 0.05) 0%, hsl(var(--primary) / 0.015) 45%, transparent 65%)",
          filter: "blur(130px)",
        }}
        animate={{ x: [0, 130, 0], y: [0, -60, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Center accent glow — mid-page (subtle) */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.025) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Diagonal gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(160deg, hsl(0 0% 100% / 0.012) 0%, transparent 30%, hsl(var(--primary) / 0.018) 70%, transparent 100%)",
        }}
      />

      {/* Vertical depth gradient (non-fixed — scrolls with content) */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(180deg, transparent 0%, hsl(0 0% 2% / 0.4) 40%, hsl(0 0% 3.5%) 60%, hsl(0 0% 5% / 0.3) 85%, hsl(0 0% 3.5%) 100%)",
        }}
      />

      {/* Animated thematic elements */}
      <AnimatedBackground />

      <div className="relative z-10">
        <Header onContactClick={() => setContactOpen(true)} />

        {/* ══ HERO ══ */}
        <section className="pt-24 pb-8 md:pt-28 md:pb-14 relative overflow-hidden">
          {/* Accent line */}
          <motion.div
            className="absolute top-0 left-0 w-full h-px"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2), transparent)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-end">
              {/* Left – Hero copy */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Tag */}
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="h-px bg-primary origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ width: 32 }}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    Catálogo completo
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-display font-black text-[clamp(2.4rem,5.5vw,4.5rem)] text-primary-foreground uppercase leading-[0.9] tracking-[-0.02em] mb-5">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                  >
                    Nossos
                  </motion.span>
                  <motion.span
                    className="block bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)), hsl(var(--primary)))",
                      backgroundSize: "200% 100%",
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                  >
                    Modelos
                  </motion.span>
                </h1>

                {/* Subtitle */}
                <motion.p
                  className="text-sm md:text-[15px] text-primary-foreground/35 leading-[1.7] max-w-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Conheça a linha de veículos 100% elétricos da MS Electric, desenvolvida para unir tecnologia, economia, praticidade e estilo em diferentes rotinas de uso, da mobilidade urbana ao trabalho do dia a dia.
                </motion.p>

                {/* Stats strip */}
                <motion.div
                  className="flex items-center gap-6 mt-8"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {[
                    { value: "19+", label: "modelos" },
                    { value: "8", label: "categorias" },
                    { value: "100%", label: "elétricos" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-primary tracking-tight">{stat.value}</span>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-primary-foreground/25 font-medium">{stat.label}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right – Quiz CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Glow behind card */}
                <div
                  className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
                    filter: "blur(30px)",
                  }}
                />

                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, hsl(0 0% 100% / 0.04), hsl(0 0% 100% / 0.015))",
                    border: "1px solid hsl(0 0% 100% / 0.07)",
                    boxShadow: "0 20px 60px -15px hsl(0 0% 0% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.04)",
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    className="h-[2px] w-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), hsl(var(--primary-glow) / 0.4), transparent)",
                    }}
                  />

                  <div className="p-6 flex flex-col justify-center h-full">
                    {/* Badge */}
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                      style={{
                        background: "hsl(var(--primary) / 0.08)",
                        border: "1px solid hsl(var(--primary) / 0.15)",
                      }}
                    >
                      <CircleHelp className="w-3 h-3 text-primary" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
                        Quiz inteligente
                      </span>
                    </div>

                    <h3 className="font-display font-black text-[17px] text-primary-foreground uppercase tracking-tight leading-tight mb-2.5">
                      Não sabe qual modelo{" "}
                      <span className="text-primary">escolher?</span>
                    </h3>

                    <p className="text-[12px] text-primary-foreground/35 leading-relaxed mb-5">
                      Responda poucas perguntas e descubra qual modelo combina melhor com o seu perfil, sua rotina e o tipo de uso que você procura.
                    </p>

                    {/* CTA button */}
                    <motion.button
                      onClick={() => setQuizOpen(true)}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground cursor-pointer transition-all"
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                        boxShadow: "0 8px 28px -6px hsl(var(--primary) / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.12)",
                      }}
                      whileHover={{ scale: 1.02, boxShadow: "0 12px 36px -6px hsl(var(--primary) / 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CircleHelp className="w-4 h-4" />
                      Fazer o quiz
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>

                    {/* Micro trust */}
                    <p className="text-[10px] text-primary-foreground/20 text-center mt-3 tracking-wide">
                      Resultado em menos de 1 minuto
                    </p>
                  </div>
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
            className="fixed bottom-6 inset-x-0 mx-auto w-fit z-40 rounded-2xl overflow-hidden"
            style={{
              background: "hsl(0 0% 7% / 0.97)",
              border: "1px solid hsl(var(--primary) / 0.25)",
              backdropFilter: "blur(24px)",
              boxShadow:
                "0 32px 100px -20px hsl(0 0% 0% / 0.8), 0 0 60px -12px hsl(var(--primary) / 0.15), 0 0 0 1px hsl(0 0% 100% / 0.04) inset",
            }}
          >
            <div className="flex items-center gap-4 px-5 py-4">
              {/* Selected products with names */}
              <div className="flex items-center gap-3">
                {selectedProducts.map((p, i) => (
                  <div key={p.slug} className="flex items-center gap-2.5">
                    {i > 0 && (
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">vs</span>
                    )}
                    <div className="flex items-center gap-2 group">
                      <div
                        className="w-11 h-11 rounded-xl bg-white flex items-center justify-center p-1 relative shrink-0"
                        style={{ border: "2px solid hsl(var(--primary) / 0.35)" }}
                      >
                        <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                        <button
                          onClick={() => toggleSelect(p.slug)}
                          className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: "hsl(0 0% 15%)", border: "1px solid hsl(0 0% 100% / 0.15)" }}
                        >
                          <X className="w-2.5 h-2.5 text-primary-foreground/70" />
                        </button>
                      </div>
                      <span className="text-[11px] font-semibold text-primary-foreground/70 whitespace-nowrap max-w-[100px] truncate">
                        {p.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="w-px h-8 shrink-0" style={{ background: "hsl(0 0% 100% / 0.08)" }} />

              {/* Counter */}
              <span className="text-[10px] text-primary-foreground/35 uppercase tracking-wider font-medium whitespace-nowrap">
                {selectedSlugs.length}/{MAX_COMPARE}
              </span>

              {/* CTA */}
              <button
                onClick={() => setCompareOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                  boxShadow: "0 6px 20px -4px hsl(var(--primary) / 0.45)",
                }}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Comparar agora
              </button>

              {/* Clear */}
              <button
                onClick={() => setSelectedSlugs([])}
                className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-primary-foreground/10"
                style={{ background: "hsl(0 0% 100% / 0.05)" }}
                title="Limpar seleção"
              >
                <X className="w-3.5 h-3.5 text-primary-foreground/40" />
              </button>
            </div>
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