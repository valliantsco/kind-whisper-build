import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, HelpCircle } from "lucide-react";
import CategoryCard from "./CategoryCard";
import type { MobileMenuItem } from "./types";

interface ModelsCarouselProps {
  item: MobileMenuItem;
  onClose: () => void;
  onQuizOpen: () => void;
}

const ModelsCarousel: React.FC<ModelsCarouselProps> = ({
  item,
  onClose,
  onQuizOpen,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) {
      setScrollProgress(0);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const progress = el.scrollLeft / max;
    setScrollProgress(progress);
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < max - 8);
  }, []);

  const scroll = (dir: "left" | "right") => {
    carouselRef.current?.scrollBy({
      left: dir === "left" ? -180 : 180,
      behavior: "smooth",
    });
  };

  /* Keyboard navigation for carousel */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scroll("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scroll("right");
      }
    },
    [],
  );

  return (
    <div className="pt-1 pb-3">
      {/* Section label */}
      <div className="flex items-center gap-2 px-4 mb-1">
        <div
          className="w-0.5 h-3 rounded-full"
          style={{
            background: "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
          }}
        />
        <span
          className="text-[11px] font-bold uppercase tracking-[0.1em]"
          style={{ color: "hsl(var(--primary) / 0.7)" }}
        >
          Explore por Categoria
        </span>
      </div>
      <p
        className="px-4 mb-3 text-[11px]"
        style={{ color: "hsl(var(--mm-text-secondary))", paddingLeft: "calc(1rem + 10px)" }}
      >
        Mobilidade elétrica para cada estilo de vida
      </p>

      {/* Carousel */}
      <div
        className="relative"
        role="region"
        aria-label="Carrossel de categorias"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div
          ref={(el) => {
            (carouselRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
            if (el)
              requestAnimationFrame(() => requestAnimationFrame(updateScroll));
          }}
          className="flex gap-3 overflow-x-auto px-4 pb-3 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            maskImage: `linear-gradient(to right, ${canScrollLeft ? "transparent" : "black"} 0%, black ${canScrollLeft ? "8%" : "0%"}, black ${canScrollRight ? "85%" : "100%"}, ${canScrollRight ? "transparent" : "black"} 100%)`,
            WebkitMaskImage: `linear-gradient(to right, ${canScrollLeft ? "transparent" : "black"} 0%, black ${canScrollLeft ? "8%" : "0%"}, black ${canScrollRight ? "85%" : "100%"}, ${canScrollRight ? "transparent" : "black"} 100%)`,
          }}
          onScroll={updateScroll}
          aria-roledescription="carousel"
        >
          {(item.dropdownItems || []).map((sub) => (
            <CategoryCard key={sub.label} sub={sub} onClose={onClose} />
          ))}
        </div>

        {/* Nav arrows */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer active:scale-90"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
              boxShadow: "0 3px 10px hsl(var(--primary) / 0.4)",
            }}
            aria-label="Categoria anterior"
          >
            <ArrowLeft className="w-3 h-3 text-primary-foreground" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer active:scale-90"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
              boxShadow: "0 3px 10px hsl(var(--primary) / 0.4)",
            }}
            aria-label="Próxima categoria"
          >
            <ArrowRight className="w-3 h-3 text-primary-foreground" />
          </button>
        )}
      </div>

      {/* Scroll progress bar */}
      <div
        className="mx-4 mt-2 mb-2 rounded-full overflow-hidden"
        style={{
          height: "4px",
          background: "hsl(0 0% 100% / 0.10)",
        }}
      >
        <div
          className="h-full rounded-full will-change-transform"
          style={{
            background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
            width: "40%",
            transform: `translateX(${scrollProgress * (100 / 0.4 - 100)}%)`,
            transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>

      {/* Quiz CTA */}
      {item.hasCta && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          onClick={() => {
            onClose();
            onQuizOpen();
          }}
          className="mx-4 w-[calc(100%-2rem)] mt-2 flex items-center gap-2.5 px-3 py-2.5 rounded-2xl cursor-pointer overflow-hidden active:scale-[0.98] transition-transform duration-150"
          style={{
            background: `linear-gradient(135deg, hsl(var(--mm-surface)), hsl(var(--mm-surface-deep)))`,
            border: "1px solid hsl(var(--primary) / 0.15)",
            boxShadow: "0 4px 16px hsl(0 0% 0% / 0.3)",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.06))",
              border: "1px solid hsl(var(--mm-border-accent))",
            }}
          >
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <div className="text-left flex-1 min-w-0">
            <p style={{ color: "hsl(var(--mm-text-primary))" }} className="font-bold text-[10px] uppercase tracking-[0.08em]">
              Não sabe qual escolher?
            </p>
            <p className="text-[8px] tracking-wide mt-0.5" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
              Responda em 1 min e descubra o modelo ideal
            </p>
          </div>
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
              boxShadow: "0 2px 8px hsl(var(--primary) / 0.3)",
            }}
          >
            <span className="text-primary-foreground text-[8px] font-bold uppercase tracking-[0.08em]">
              Quiz
            </span>
            <ArrowRight className="w-2.5 h-2.5 text-primary-foreground" />
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default React.memo(ModelsCarousel);
