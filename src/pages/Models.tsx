import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Gauge, Weight, Battery, Clock, ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import Header from "@/components/Header";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PopUpContato01 from "@/components/PopUpContato01";
import HomeFooter from "@/components/home/HomeFooter";
import { PRODUCTS, CATEGORIES, type CategoryFilter, type Product } from "@/data/products";

const SPECS = [
  { icon: Zap, key: "autonomy" as const, label: "Autonomia" },
  { icon: Gauge, key: "speed" as const, label: "Vel. máx." },
  { icon: Battery, key: "motor" as const, label: "Motor" },
  { icon: Clock, key: "recharge" as const, label: "Recarga" },
  { icon: Weight, key: "load" as const, label: "Carga" },
];

const Models = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Todos");
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="min-h-screen relative" style={{ background: "hsl(0 0% 4%)" }}>
      {/* Background effects — reuse from home */}
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
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(160deg, hsl(0 0% 100% / 0.01) 0%, transparent 35%, hsl(var(--primary) / 0.015) 100%)",
        }}
      />

      <div className="relative z-10">
        <Header onContactClick={() => setContactOpen(true)} />

        {/* Hero header */}
        <section className="pt-32 pb-8 md:pt-40 md:pb-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-primary" />
                <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
                  Catálogo completo
                </span>
              </div>
              <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-4">
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
              <p className="text-sm md:text-base text-primary-foreground/45 leading-relaxed max-w-xl">
                Um portfólio pensado para diferentes perfis de uso, estilos de vida e objetivos.
                Da mobilidade urbana ao uso profissional, veículos 100% elétricos que unem
                tecnologia, economia e praticidade.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-[72px] z-30 py-4" style={{ background: "hsl(0 0% 4% / 0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search */}
              <div className="relative md:w-72 shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/30" />
                <input
                  type="text"
                  placeholder="Buscar modelo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-primary-foreground placeholder:text-primary-foreground/25 outline-none transition-all"
                  style={{
                    background: "hsl(0 0% 100% / 0.04)",
                    border: "1px solid hsl(0 0% 100% / 0.08)",
                  }}
                />
              </div>

              {/* Category pills */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
                <SlidersHorizontal className="w-4 h-4 text-primary-foreground/30 shrink-0 mr-1 hidden md:block" />
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="shrink-0 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em] transition-all duration-200 cursor-pointer whitespace-nowrap"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))"
                          : "hsl(0 0% 100% / 0.04)",
                        border: `1px solid ${isActive ? "hsl(var(--primary) / 0.4)" : "hsl(0 0% 100% / 0.06)"}`,
                        color: isActive ? "hsl(0 0% 100%)" : "hsl(0 0% 100% / 0.5)",
                        boxShadow: "none",
                      }}
                    >
                      {cat}
                      <span className="ml-1.5 opacity-60">{categoryCount(cat)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Results count */}
        <div className="container mx-auto px-4 pt-6 pb-2">
          <p className="text-[11px] uppercase tracking-[0.15em] text-primary-foreground/30 font-medium">
            {filtered.length} {filtered.length === 1 ? "modelo encontrado" : "modelos encontrados"}
          </p>
        </div>

        {/* Product grid */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {filtered.map((product, i) => (
                  <ProductCard key={product.slug} product={product} index={i} />
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

      <FloatingWhatsApp />
      <PopUpContato01 isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};

/* ── Product Card ── */
const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div
        className="h-full rounded-xl overflow-hidden transition-all duration-300 relative"
        style={{
          background: "hsl(0 0% 100% / 0.025)",
          border: `1px solid ${isHovered ? "hsl(var(--primary) / 0.25)" : "hsl(0 0% 100% / 0.06)"}`,
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-500 z-[1]"
          style={{
            background: "radial-gradient(ellipse at 30% 20%, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-2 right-2 h-[2px] rounded-full transition-all duration-500 z-[2]"
          style={{
            background: `linear-gradient(90deg, transparent, hsl(var(--primary) / ${isHovered ? 0.7 : 0.05}), transparent)`,
          }}
        />

        {/* Image */}
        <div className="relative h-48 bg-white flex items-center justify-center overflow-hidden rounded-t-xl p-5">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Category badge */}
          <span
            className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider text-primary"
            style={{
              background: "hsl(var(--primary) / 0.12)",
              border: "1px solid hsl(var(--primary) / 0.2)",
            }}
          >
            {product.category}
          </span>
          {/* Special badge */}
          {product.badge && (
            <span
              className="absolute top-3 right-3 px-2.5 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-[0.1em] text-primary-foreground"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary) / 0.9), hsl(var(--primary-glow) / 0.9))",
                border: "1px solid hsl(var(--primary) / 0.3)",
              }}
            >
              {product.badge}
            </span>
          )}
          <div
            className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
            style={{ background: "linear-gradient(to top, hsl(0 0% 5% / 0.95), transparent)" }}
          />
        </div>

        {/* Content */}
        <div className="p-5 pt-4 relative">
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="font-display font-bold text-[14px] text-primary-foreground/90 uppercase tracking-[0.1em]">
              {product.name}
            </h3>
            <span
              className="font-display font-black text-sm bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
              }}
            >
              {product.price}
            </span>
          </div>

          {product.highlight && (
            <p className="text-[10px] text-primary/80 uppercase tracking-[0.12em] font-medium mb-3">
              {product.highlight}
            </p>
          )}

          <div
            className="h-px mb-4 transition-all duration-500"
            style={{
              background: `linear-gradient(90deg, hsl(var(--primary) / ${isHovered ? 0.4 : 0.1}), transparent)`,
              width: isHovered ? "80%" : "40%",
            }}
          />

          {/* Specs grid */}
          <div
            className="grid grid-cols-3 gap-0 mb-4 py-3 rounded-lg"
            style={{
              background: "hsl(0 0% 100% / 0.03)",
              border: "1px solid hsl(0 0% 100% / 0.04)",
            }}
          >
            {SPECS.slice(0, 3).map((spec, j) => (
              <div key={spec.key} className="text-center relative">
                {j > 0 && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-5"
                    style={{ background: "hsl(0 0% 100% / 0.08)" }}
                  />
                )}
                <spec.icon className="w-3 h-3 mx-auto mb-1 text-primary" />
                <p className="text-[11px] font-bold text-primary-foreground/80 tabular-nums">
                  {product[spec.key]}
                </p>
                <p className="text-[8px] text-primary-foreground/30 uppercase tracking-wider mt-0.5">
                  {spec.label}
                </p>
              </div>
            ))}
          </div>

          {/* Secondary specs row */}
          <div className="flex items-center justify-center gap-4 mb-4 text-[10px] text-primary-foreground/35">
            {SPECS.slice(3).map((spec) => (
              <span key={spec.key} className="flex items-center gap-1">
                <spec.icon className="w-3 h-3 text-primary/60" />
                <span className="uppercase tracking-wider">{spec.label}:</span>
                <span className="text-primary-foreground/55 font-medium">{product[spec.key]}</span>
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contato"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200 group-hover:border-primary/30 group-hover:text-primary"
            style={{
              border: "1px solid hsl(0 0% 100% / 0.08)",
              color: "hsl(0 0% 100% / 0.5)",
            }}
          >
            Saiba mais
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Models;
