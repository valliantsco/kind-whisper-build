import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  alt: string;
}

const SWIPE_THRESHOLD = 50;

export default function ProductGallery({ images, alt }: Props) {
  const slides = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const total = slides.length;
  const canNavigate = total > 1;

  const goTo = useCallback((next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + total) % total);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.(10);
  }, [index, total]);

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) next();
    else if (info.offset.x > SWIPE_THRESHOLD) prev();
  };

  if (total === 0) return null;

  return (
    <div className="relative">
      <div
        className="relative rounded-2xl overflow-hidden select-none"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(245,245,245,0.95) 100%)",
          border: "1px solid hsl(0 0% 100% / 0.08)",
          boxShadow: "0 40px 100px -25px hsl(0 0% 0% / 0.6), inset 0 1px 0 hsl(0 0% 100% / 0.05)",
        }}
      >
        <div className="relative p-6 md:p-16 min-h-[280px] md:min-h-[400px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.img
              key={index}
              src={slides[index]}
              alt={`${alt} — imagem ${index + 1}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              drag={canNavigate ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="w-full h-auto object-contain max-h-[260px] md:max-h-[380px] mx-auto cursor-grab active:cursor-grabbing"
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {/* Disclaimer */}
        <span className="absolute bottom-3 right-4 text-[9px] text-foreground/30 tracking-wide pointer-events-none">
          Imagem meramente ilustrativa
        </span>

        {/* Desktop arrows */}
        {canNavigate && (
          <>
            <button
              onClick={prev}
              aria-label="Imagem anterior"
              className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground/10 backdrop-blur-sm text-foreground/70 transition-all opacity-0 group-hover:opacity-100"
              style={{ border: "1px solid hsl(0 0% 0% / 0.06)" }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Próxima imagem"
              className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground/10 backdrop-blur-sm text-foreground/70 transition-all opacity-0 group-hover:opacity-100"
              style={{ border: "1px solid hsl(0 0% 0% / 0.06)" }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Counter */}
        {canNavigate && (
          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-semibold tabular-nums text-foreground/60 bg-foreground/5 backdrop-blur-sm" style={{ border: "1px solid hsl(0 0% 0% / 0.06)" }}>
            {index + 1} / {total}
          </div>
        )}
      </div>

      {/* Dots */}
      {canNavigate && (
        <div className="flex items-center justify-center gap-2 mt-5">
          {slides.map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir para imagem ${i + 1}`}
                className="group/dot py-2"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${active ? "w-6 bg-primary" : "w-1.5 bg-primary-foreground/25 group-hover/dot:bg-primary-foreground/50"}`}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Thumbnail strip (desktop) */}
      {canNavigate && (
        <div className="hidden md:flex items-center justify-center gap-2 mt-4">
          {slides.map((src, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Imagem ${i + 1}`}
                className={`relative w-14 h-14 rounded-lg overflow-hidden transition-all duration-300 ${active ? "ring-2 ring-primary scale-105" : "opacity-50 hover:opacity-100"}`}
                style={{ background: "rgba(255,255,255,0.95)" }}
              >
                <img src={src} alt="" className="w-full h-full object-contain p-1" draggable={false} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
