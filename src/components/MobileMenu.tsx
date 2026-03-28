import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Menu,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Compass,
  
  X,
  Zap,
} from "lucide-react";

interface MobileMenuItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  hasCta?: boolean;
  dropdownItems?: {
    label: string;
    description: string;
    href: string;
    image?: string;
    video?: string;
    badge?: string;
    icon?: React.ElementType;
  }[];
}

interface MobileMenuProps {
  items: MobileMenuItem[];
  isOnline: boolean;
  onContactClick?: () => void;
  onQuizOpen: () => void;
}

const useMobileMenu = ({ items, isOnline, onContactClick, onQuizOpen }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const carouselRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [scrollStates, setScrollStates] = useState<Record<string, { left: number; right: number; progress: number }>>({});

  const handleCarouselScroll = useCallback((label: string) => {
    const el = carouselRefs.current[label];
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) {
      setScrollStates(prev => ({ ...prev, [label]: { left: 0, right: 0, progress: 0 } }));
      return;
    }
    const progress = el.scrollLeft / max;
    const leftOpacity = progress > 0.25 ? 1 : progress < 0.12 ? 0 : Math.max(0, (progress - 0.12) / 0.13);
    const rightOpacity = progress < 0.85 ? 1 : Math.max(0, 1 - (progress - 0.85) / 0.15);
    setScrollStates(prev => ({ ...prev, [label]: { left: leftOpacity, right: rightOpacity, progress } }));
  }, []);

  const toggleMenu = () => {
    setOpen((v) => {
      if (v) setExpandedItem(null);
      return !v;
    });
  };

  const closeMenu = () => {
    setOpen(false);
    setExpandedItem(null);
  };

  const toggleExpand = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  const scrollCarousel = (label: string, dir: "left" | "right") => {
    const el = carouselRefs.current[label];
    if (el) el.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" });
  };

  /* ─── Trigger Button ─── */
  const triggerButton = (
    <button
      onClick={toggleMenu}
      className="md:hidden relative grid h-10 w-10 place-items-center cursor-pointer active:scale-95 transition-transform duration-150"
      style={{
        background: "transparent",
        border: "none",
      }}
      aria-label={open ? "Fechar menu" : "Abrir menu"}
    >
      {/* Animated hamburger → X */}
      <div className="flex w-5 flex-col items-stretch justify-between" style={{ height: "14px" }}>
        <motion.span
          className="h-[2px] rounded-full"
          style={{
            background: open ? "hsl(var(--primary))" : "#f5f5f5",
          }}
          animate={{
            y: open ? 6 : 0,
            rotate: open ? 45 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.span
          className="h-[2px] rounded-full"
          style={{
            background: open ? "hsl(var(--primary))" : "#f5f5f5",
          }}
          animate={{
            opacity: open ? 0 : 1,
            scaleX: open ? 0 : 1,
          }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.span
          className="h-[2px] rounded-full"
          style={{
            background: open ? "hsl(var(--primary))" : "#f5f5f5",
          }}
          animate={{
            y: open ? -6 : 0,
            rotate: open ? -45 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </button>
  );

  /* ─── Dropdown Body ─── */
  const dropdownBody = (
    <AnimatePresence>
      {open && (
        <>
          {/* Click-away overlay */}
          <div className="fixed inset-0 z-[48]" onClick={closeMenu} />

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
            className="md:hidden overflow-hidden relative z-[49]"
          >
            {/* Gradient separator */}
            <div
              className="h-px mx-4"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.3), hsl(0 0% 100% / 0.08), transparent)",
              }}
            />

            {/* Subtle ambient glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-24 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at top center, hsl(11 81% 57% / 0.06), transparent 70%)",
              }}
            />

            <div
              className="overflow-y-auto relative"
              style={{ maxHeight: "calc(100dvh - 160px)" }}
            >
              {/* Nav items */}
              <div className="px-3 pt-3 pb-2 space-y-1">
                {items.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                  >
                    {item.hasDropdown ? (
                      <div>
                        {/* Expandable section header */}
                        <button
                          onClick={() => toggleExpand(item.label)}
                          className="w-full flex items-center justify-between py-3.5 px-4 rounded-2xl cursor-pointer transition-all duration-300"
                          style={{
                            background: "transparent",
                            border: "1px solid transparent",
                          }}
                        >
                          <span
                            className="text-[14px] font-semibold tracking-wide transition-colors duration-300"
                            style={{
                              color: expandedItem === item.label
                                ? "hsl(0 0% 100% / 0.95)"
                                : "hsl(0 0% 100% / 0.7)",
                            }}
                          >
                            {item.label}
                          </span>
                          <motion.div
                            animate={{ rotate: expandedItem === item.label ? 180 : 0 }}
                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                          >
                            <ChevronDown
                              className="w-4 h-4 transition-colors duration-300"
                              style={{
                                color: expandedItem === item.label
                                  ? "hsl(11 81% 57%)"
                                  : "hsl(0 0% 100% / 0.25)",
                              }}
                            />
                          </motion.div>
                        </button>

                        {/* Expanded content */}
                        <AnimatePresence>
                          {expandedItem === item.label && item.dropdownItems && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pt-0 pb-3">
                                {/* Image/video cards carousel */}
                                {item.dropdownItems[0]?.image ? (
                                  <>
                                    {/* Section label */}
                                    <div className="flex items-center gap-2 pl-[17px] pr-4 pt-0 mb-3">
                                      <div
                                        className="w-0.5 h-3 rounded-full"
                                        style={{ background: "linear-gradient(180deg, hsl(11 81% 57%), hsl(11 90% 65%))" }}
                                      />
                                      <span
                                        className="text-[11px] font-bold uppercase tracking-[0.1em]"
                                        style={{ color: "hsl(11 81% 57% / 0.7)" }}
                                      >
                                        Nossos Veículos Elétricos
                                      </span>
                                    </div>

                                    {/* Carousel */}
                                    <div className="relative">
                                      <div
                                        ref={(el) => {
                                          carouselRefs.current[item.label] = el;
                                          if (el) requestAnimationFrame(() => handleCarouselScroll(item.label));
                                        }}
                                        className="flex gap-3 overflow-x-auto pb-3 px-4 snap-x snap-mandatory scrollbar-hide"
                                        style={{
                                          scrollbarWidth: "none",
                                          msOverflowStyle: "none",
                                          scrollSnapType: "x mandatory",
                                          scrollBehavior: "smooth",
                                          maskImage: (() => {
                                            const s = scrollStates[item.label] || { left: 0, right: 1 };
                                            if (s.left < 0.01 && s.right < 0.01) return "none";
                                            if (s.left < 0.01) return `linear-gradient(to right, black ${55 + (1 - s.right) * 45}%, transparent 100%)`;
                                            if (s.right < 0.01) return `linear-gradient(to right, transparent 0%, black ${s.left * 10}%)`;
                                            return `linear-gradient(to right, transparent 0%, black ${s.left * 10}%, black ${55 + (1 - s.right) * 45}%, transparent 100%)`;
                                          })(),
                                          WebkitMaskImage: (() => {
                                            const s = scrollStates[item.label] || { left: 0, right: 1 };
                                            if (s.left < 0.01 && s.right < 0.01) return "none";
                                            if (s.left < 0.01) return `linear-gradient(to right, black ${55 + (1 - s.right) * 45}%, transparent 100%)`;
                                            if (s.right < 0.01) return `linear-gradient(to right, transparent 0%, black ${s.left * 10}%)`;
                                            return `linear-gradient(to right, transparent 0%, black ${s.left * 10}%, black ${55 + (1 - s.right) * 45}%, transparent 100%)`;
                                          })(),
                                        }}
                                        onScroll={() => handleCarouselScroll(item.label)}
                                      >
                                        {item.dropdownItems.map((sub, j) => (
                                          <motion.a
                                            key={sub.label}
                                            href={sub.href}
                                            onClick={closeMenu}
                                            initial={{ opacity: 0, scale: 0.88, y: 8 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{ delay: j * 0.05, duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                                            className="relative flex-shrink-0 rounded-2xl overflow-hidden snap-start group/card"
                                            style={{
                                              width: "203px",
                                              aspectRatio: "3/4",
                                              border: "1px solid hsl(0 0% 100% / 0.06)",
                                            }}
                                          >
                                            {sub.video ? (
                                              <video src={sub.video} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" />
                                            ) : (
                                              <img src={sub.image} alt={sub.label} className="absolute inset-0 w-full h-full object-cover" />
                                            )}
                                            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.9) 0%, hsl(0 0% 0% / 0.4) 40%, hsl(0 0% 0% / 0.1) 100%)" }} />
                                            {sub.badge && (
                                              <span className="absolute top-2 right-2 z-10 px-2 py-[3px] rounded-full text-[8px] font-bold uppercase tracking-[0.1em] text-white" style={{ background: "linear-gradient(135deg, hsl(11 81% 57% / 0.85), hsl(11 90% 65% / 0.85))", backdropFilter: "blur(8px)", border: "1px solid hsl(11 81% 57% / 0.3)", boxShadow: "0 2px 8px hsl(11 81% 57% / 0.3)" }}>
                                                {sub.badge}
                                              </span>
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 p-3.5">
                                              <p className="text-white font-bold text-[12px] uppercase tracking-[0.1em] mb-1 drop-shadow-lg leading-tight">{sub.label}</p>
                                              <p className="text-white/45 text-[9px] tracking-wide line-clamp-2 leading-relaxed">{sub.description}</p>
                                            </div>
                                            <div className="absolute bottom-0 left-3 right-3 h-[1.5px] rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.6), transparent)" }} />
                                          </motion.a>
                                        ))}
                                      </div>

                                      {/* Orange scroll-left button */}
                                      <button
                                        onClick={() => scrollCarousel(item.label, "left")}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer active:scale-90"
                                        style={{
                                          background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                                          boxShadow: (scrollStates[item.label]?.left ?? 0) > 0.1 ? "0 4px 12px hsl(11 81% 57% / 0.4)" : "none",
                                          opacity: scrollStates[item.label]?.left ?? 0,
                                          visibility: (scrollStates[item.label]?.left ?? 0) < 0.01 ? "hidden" : "visible",
                                          pointerEvents: (scrollStates[item.label]?.left ?? 0) < 0.1 ? "none" : "auto",
                                          transition: "opacity 0.5s ease-out, visibility 0.5s ease-out, box-shadow 0.5s ease-out",
                                        }}
                                        aria-label="Anterior"
                                      >
                                        <ArrowLeft className="w-3.5 h-3.5 text-white" />
                                      </button>

                                      {/* Orange scroll-right button */}
                                      <button
                                        onClick={() => scrollCarousel(item.label, "right")}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ease-out active:scale-90"
                                        style={{
                                          background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                                          boxShadow: "0 4px 12px hsl(11 81% 57% / 0.4)",
                                          opacity: scrollStates[item.label]?.right ?? 1,
                                          pointerEvents: (scrollStates[item.label]?.right ?? 1) < 0.1 ? "none" : "auto",
                                        }}
                                        aria-label="Próximo"
                                      >
                                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                                      </button>
                                    </div>

                                    {/* Scroll progress bar */}
                                    <div className="mt-3 mb-[22px] mx-4 rounded-full overflow-hidden" style={{ height: "4px", background: "hsl(0 0% 100% / 0.08)" }}>
                                      <div
                                        className="h-full rounded-full will-change-transform"
                                        style={{
                                          background: "linear-gradient(90deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                                          width: "48%",
                                          transform: `translateX(${(scrollStates[item.label]?.progress ?? 0) * (100 / 0.48 - 100)}%)`,
                                          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                                          boxShadow: "0 0 10px hsl(11 81% 57% / 0.5), 0 0 4px hsl(11 81% 57% / 0.3)",
                                        }}
                                      />
                                    </div>

                                    {item.hasCta && (
                                      <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.35 }}
                                        onClick={() => { closeMenu(); onQuizOpen(); }}
                                        className="mx-[11px] mb-2 flex items-center gap-2.5 px-2 py-1 rounded-2xl cursor-pointer group/quiz active:scale-[0.98] transition-transform duration-150"
                                        style={{
                                          background: "linear-gradient(135deg, hsl(0 0% 12%), hsl(0 0% 7%))",
                                          border: "1px solid hsl(11 81% 57% / 0.15)",
                                          boxShadow: "0 4px 16px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.03)",
                                        }}
                                      >
                                        <div
                                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                          style={{
                                            background: "linear-gradient(135deg, hsl(11 81% 57% / 0.2), hsl(11 81% 57% / 0.06))",
                                            border: "1px solid hsl(11 81% 57% / 0.2)",
                                            boxShadow: "0 0 16px hsl(11 81% 57% / 0.1)",
                                          }}
                                        >
                                          <Compass className="w-[18px] h-[18px]" style={{ color: "hsl(11 81% 57%)" }} />
                                        </div>
                                        <div className="text-left flex-1 min-w-0">
                                          <p className="text-white/90 font-bold text-[11px] uppercase tracking-[0.1em]">
                                            Não sabe qual escolher?
                                          </p>
                                          <p className="text-white/35 text-[9px] tracking-wide mt-0.5">
                                            Descubra em 1 min com o quiz
                                          </p>
                                        </div>
                                        <div
                                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl shrink-0 transition-all duration-300"
                                          style={{
                                            background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                                            boxShadow: "0 2px 10px hsl(11 81% 57% / 0.3)",
                                          }}
                                        >
                                          <span className="text-white text-[8px] font-bold uppercase tracking-[0.1em]">Quiz</span>
                                          <ArrowRight className="w-3 h-3 text-white" />
                                        </div>
                                      </motion.button>
                                    )}
                                  </>
                                ) : (
                                  /* Non-image items (e.g. Visite-nos) */
                                  <div className="space-y-1.5 px-2">
                                    {item.dropdownItems.map((sub, j) => {
                                      const Icon = sub.icon;
                                      return (
                                        <motion.a
                                          key={sub.label}
                                          href={sub.href}
                                          onClick={closeMenu}
                                          initial={{ opacity: 0, x: 16 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: j * 0.06, duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                                          className="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 active:scale-[0.98]"
                                          style={{
                                            background: "linear-gradient(135deg, hsl(0 0% 100% / 0.04), hsl(0 0% 100% / 0.01))",
                                            border: "1px solid hsl(0 0% 100% / 0.05)",
                                          }}
                                        >
                                          {Icon && (
                                            <div
                                              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                              style={{
                                                background: "linear-gradient(135deg, hsl(11 81% 57% / 0.12), hsl(11 81% 57% / 0.04))",
                                                border: "1px solid hsl(11 81% 57% / 0.15)",
                                              }}
                                            >
                                              <Icon className="w-[18px] h-[18px]" style={{ color: "hsl(11 81% 57%)" }} />
                                            </div>
                                          )}
                                          <div className="min-w-0 flex-1">
                                            <p className="text-white/90 text-[12px] font-semibold tracking-wide">{sub.label}</p>
                                            <p className="text-white/30 text-[10px] mt-1 leading-relaxed line-clamp-2">{sub.description}</p>
                                          </div>
                                          <ArrowRight className="w-3.5 h-3.5 text-white/15 shrink-0" />
                                        </motion.a>
                                      );
                                    })}

                                    {/* Visite-nos extra info */}
                                    {item.label === "Visite-nos" && (
                                      <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.15, duration: 0.4 }}
                                        className="mt-3 mx-1 rounded-2xl overflow-hidden"
                                        style={{
                                          background: "linear-gradient(160deg, hsl(0 0% 10%), hsl(0 0% 6%))",
                                          border: "1px solid hsl(0 0% 100% / 0.05)",
                                        }}
                                      >
                                        {/* Info rows */}
                                        <div className="px-4 py-3.5 space-y-3">
                                          <div className="flex items-start gap-3">
                                            <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "hsl(11 81% 57% / 0.6)" }} />
                                            <div>
                                              <p className="text-white/80 text-[11px] font-semibold">Av. João Pinheiro, 3747</p>
                                              <p className="text-white/30 text-[9px] mt-0.5">Uberlândia — MG</p>
                                            </div>
                                          </div>
                                          <div className="h-px" style={{ background: "hsl(0 0% 100% / 0.04)" }} />
                                          <div className="flex items-center gap-3">
                                            <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(11 81% 57% / 0.6)" }} />
                                            <a href="tel:+553432196628" className="text-white/70 text-[11px] font-semibold">(34) 3219-6628</a>
                                          </div>
                                          <div className="h-px" style={{ background: "hsl(0 0% 100% / 0.04)" }} />
                                          <div className="flex items-center gap-3">
                                            <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(11 81% 57% / 0.6)" }} />
                                            <div className="text-white/45 text-[10px] space-y-0.5">
                                              <p>Seg – Sex: <span className="text-white/70 font-medium">08h – 18h</span></p>
                                              <p>Sábado: <span className="text-white/70 font-medium">08h – 12h</span></p>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Maps CTA */}
                                        <button
                                          onClick={() => { closeMenu(); window.open("https://maps.app.goo.gl/7iwuPGQuN4rAhqRf8", "_blank"); }}
                                          className="w-full flex items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white cursor-pointer transition-all duration-200 active:scale-[0.98]"
                                          style={{
                                            background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                                            boxShadow: "0 -4px 16px hsl(11 81% 57% / 0.15)",
                                          }}
                                        >
                                          <ExternalLink className="w-3.5 h-3.5" />
                                          Abrir no Google Maps
                                        </button>
                                      </motion.div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      /* Simple nav link */
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className="block py-3.5 px-4 rounded-2xl text-[14px] font-semibold tracking-wide transition-colors duration-200 active:scale-[0.98]"
                        style={{ color: "hsl(0 0% 100% / 0.7)" }}
                      >
                        {item.label}
                      </a>
                    )}

                    {/* Separator between items */}
                    {i < items.length - 1 && (
                      <div
                        className="mx-4 h-px my-0.5"
                        style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.04), transparent)" }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA bar */}
              <div className="px-3 pb-4 pt-2">
                {/* Gradient separator */}
                <div
                  className="h-px mx-1 mb-3"
                  style={{
                    background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.2), hsl(0 0% 100% / 0.06), transparent)",
                  }}
                />
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                  onClick={() => { closeMenu(); onContactClick?.(); }}
                  className="w-full relative flex items-center justify-center gap-3 rounded-2xl px-5 py-4 text-white cursor-pointer overflow-hidden active:scale-[0.97] transition-transform duration-150"
                  style={{
                    background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                    boxShadow: "0 6px 24px hsl(11 81% 57% / 0.35), inset 0 1px 0 hsl(0 0% 100% / 0.15)",
                  }}
                >
                  {/* Shine effect */}
                  <span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, hsl(0 0% 100% / 0.12) 0%, transparent 50%)",
                    }}
                  />
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span
                      className="absolute inset-0 rounded-full animate-ping opacity-60"
                      style={{ backgroundColor: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)" }}
                    />
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)",
                        boxShadow: isOnline ? "0 0 10px hsl(142 76% 50%)" : "0 0 10px hsl(0 75% 50%)",
                      }}
                    />
                  </span>
                  <span className="w-px h-5 rounded-sm" style={{ background: "hsl(0 0% 100% / 0.3)" }} />
                  <span className="relative flex flex-col items-start leading-none gap-[3px]">
                    <span className="text-[12px] font-bold tracking-wide">
                      {isOnline ? "Atendimento Online" : "Atendimento Offline"}
                    </span>
                    <span className="text-[9px] font-medium opacity-75 tracking-wider uppercase">
                      {isOnline ? "Fale conosco agora" : "Deixe sua mensagem"}
                    </span>
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return { triggerButton, dropdownBody, isOpen: open };
};

export default useMobileMenu;
