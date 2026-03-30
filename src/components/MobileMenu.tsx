import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import msShieldLogo from "@/assets/ms-shield-logo.png";

import {
  ChevronDown, ArrowRight, ArrowLeft,
  MapPin, Phone, Clock, ExternalLink, Zap,
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

/* ═══════════════════════════════════════════
   Category Card — used inside the carousel
   ═══════════════════════════════════════════ */
const CategoryCard = ({
  sub,
  onClose,
}: {
  sub: MobileMenuItem["dropdownItems"][number];
  onClose: () => void;
}) => (
  <a
    href={sub.href}
    onClick={onClose}
    className="relative flex-shrink-0 rounded-2xl overflow-hidden snap-center active:scale-[0.98] transition-transform duration-150"
    style={{
      width: "211px",
      height: "284px",
      border: "1px solid hsl(0 0% 100% / 0.08)",
      transform: "translateZ(0)",
      WebkitTransform: "translateZ(0)",
      willChange: "transform",
      WebkitMaskImage: "-webkit-radial-gradient(white, black)",
    }}
  >
    {/* Media — wrapped in its own div to contain stacking */}
    <div style={{ position: "absolute", inset: 0, zIndex: 1, WebkitTransform: "translateZ(0)", transform: "translateZ(0)" }}>
      {sub.video ? (
        <video
          src={sub.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ position: "relative", zIndex: 0 }}
        />
      ) : sub.image ? (
        <img
          src={sub.image}
          alt={sub.label}
          loading="eager"
          decoding="sync"
          className="w-full h-full object-cover"
        />
      ) : null}
    </div>

    {/* Gradient overlay — z-[2] above media */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.1) 100%)",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
      }}
    />

    {/* Badge — z-[4] above overlay */}
    {sub.badge && (
      <span
        className="absolute top-2 right-2 px-2 py-[3px] rounded-full text-[8px] font-bold uppercase tracking-[0.1em] text-white"
        style={{
          zIndex: 30,
          background: "linear-gradient(135deg, hsl(11 81% 57% / 0.9), hsl(11 90% 65% / 0.9))",
          backdropFilter: "blur(6px)",
          border: "1px solid hsl(11 81% 57% / 0.3)",
        }}
      >
        {sub.badge}
      </span>
    )}

    {/* Text content — z-[3] above overlay */}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px", zIndex: 20, WebkitTransform: "translateZ(0)", transform: "translateZ(0)" }}>
      <p
        className="text-white font-bold text-[13px] uppercase tracking-[0.06em] leading-tight"
        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
      >
        {sub.label}
      </p>
      <p
        className="text-white/75 text-[10.5px] tracking-wide leading-snug mt-1 line-clamp-2"
        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
      >
        {sub.description}
      </p>
    </div>
  </a>
);

/* ═══════════════════════════════════════════
   Models Carousel Section
   ═══════════════════════════════════════════ */
const ModelsCarousel = ({
  item,
  onClose,
  onQuizOpen,
}: {
  item: MobileMenuItem;
  onClose: () => void;
  onQuizOpen: () => void;
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

  return (
    <div className="pt-1 pb-3">
      {/* Section label */}
      <div className="flex items-center gap-2 px-4 mb-3">
        <div
          className="w-0.5 h-3 rounded-full"
          style={{
            background: "linear-gradient(180deg, hsl(11 81% 57%), hsl(11 90% 65%))",
          }}
        />
        <span
          className="text-[11px] font-bold uppercase tracking-[0.1em]"
          style={{ color: "hsl(11 81% 57% / 0.7)" }}
        >
          Explore por Categoria
        </span>
      </div>


      {/* Category Cards Carousel */}
      <div className="relative">
        <div
          ref={(el) => {
            (carouselRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
            if (el) requestAnimationFrame(() => requestAnimationFrame(updateScroll));
          }}
          className="flex gap-3 overflow-x-auto px-4 pb-3 snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            maskImage: `linear-gradient(to right, ${canScrollLeft ? 'transparent' : 'black'} 0%, black ${canScrollLeft ? '8%' : '0%'}, black ${canScrollRight ? '85%' : '100%'}, ${canScrollRight ? 'transparent' : 'black'} 100%)`,
            WebkitMaskImage: `linear-gradient(to right, ${canScrollLeft ? 'transparent' : 'black'} 0%, black ${canScrollLeft ? '8%' : '0%'}, black ${canScrollRight ? '85%' : '100%'}, ${canScrollRight ? 'transparent' : 'black'} 100%)`,
          }}
          onScroll={updateScroll}
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
              background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
              boxShadow: "0 3px 10px hsl(11 81% 57% / 0.4)",
            }}
            aria-label="Anterior"
          >
            <ArrowLeft className="w-3 h-3 text-white" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer active:scale-90"
            style={{
              background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
              boxShadow: "0 3px 10px hsl(11 81% 57% / 0.4)",
            }}
            aria-label="Próximo"
          >
            <ArrowRight className="w-3 h-3 text-white" />
          </button>
        )}

        {/* Right fade overlay */}
        {canScrollRight && (
          <div
            className="absolute top-0 right-0 h-full pointer-events-none"
            style={{
              width: "48px",
              zIndex: 6,
              background: "linear-gradient(to left, hsl(0 0% 8% / 0.85) 0%, transparent 100%)",
            }}
          />
        )}
      </div>

      {/* Scroll progress bar */}
      <div
        className="mx-4 mt-2 mb-2 rounded-full overflow-hidden"
        style={{ height: "4px", background: "hsl(0 0% 100% / 0.10)" }}
      >
        <div
          className="h-full rounded-full will-change-transform"
          style={{
            background: "linear-gradient(90deg, hsl(11 81% 57%), hsl(11 90% 65%))",
            width: "40%",
            transform: `translateX(${scrollProgress * (100 / 0.4 - 100)}%)`,
            transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>

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
            background: "linear-gradient(135deg, hsl(0 0% 11%), hsl(0 0% 7%))",
            border: "1px solid hsl(11 81% 57% / 0.15)",
            boxShadow: "0 4px 16px hsl(0 0% 0% / 0.3)",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(11 81% 57% / 0.2), hsl(11 81% 57% / 0.06))",
              border: "1px solid hsl(11 81% 57% / 0.2)",
            }}
          >
            <Zap className="w-4 h-4" style={{ color: "hsl(11 81% 57%)" }} />
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="text-white/90 font-bold text-[10px] uppercase tracking-[0.08em]">
              Não sabe qual escolher?
            </p>
            <p className="text-white/50 text-[8px] tracking-wide mt-0.5">
              Responda 4 perguntas e descubra
            </p>
          </div>
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
              boxShadow: "0 2px 8px hsl(11 81% 57% / 0.3)",
            }}
          >
            <span className="text-white text-[8px] font-bold uppercase tracking-[0.08em]">Quiz</span>
            <ArrowRight className="w-2.5 h-2.5 text-white" />
          </div>
        </motion.button>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════
   Visit-Us Expanded Section
   ═══════════════════════════════════════════ */
const VisitUsSection = ({
  onClose,
}: {
  onClose: () => void;
}) => (
  <div className="px-2 pt-1 pb-3">
    {/* Header */}
    <div className="flex items-center gap-2 px-2 mb-3">
      <div
        className="w-0.5 h-3 rounded-full"
        style={{ background: "linear-gradient(180deg, hsl(11 81% 57%), hsl(11 90% 65%))" }}
      />
      <span
        className="text-[11px] font-bold uppercase tracking-[0.1em]"
        style={{ color: "hsl(11 81% 57% / 0.7)" }}
      >
        Onde Estamos
      </span>
    </div>

    {/* Card principal */}
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg, hsl(0 0% 11%), hsl(0 0% 7%))",
        border: "1px solid hsl(0 0% 100% / 0.06)",
      }}
    >
      {/* Mapa */}
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{ height: "150px" }}
        onClick={() => window.open("https://maps.app.goo.gl/7iwuPGQuN4rAhqRf8", "_blank")}
      >
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2250!2d-48.26122457146234!3d-18.892441917718067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
            className="absolute border-0 pointer-events-none"
            style={{
              top: "-60px",
              left: "-20px",
              width: "calc(100% + 40px)",
              height: "calc(100% + 120px)",
              filter: "invert(1) hue-rotate(180deg) brightness(0.95) contrast(1.1) saturate(0.3)",
            }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="MS Eletric - Uberlândia"
          />
        </div>
        <div className="absolute z-[5] pointer-events-none" style={{ top: "calc(44% + 20px)", left: "calc(48% + 30px)", transform: "translate(-50%, -100%)" }}>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
            <div className="w-8 h-8 rounded-full animate-ping" style={{ background: "hsl(11 81% 57% / 0.2)", animationDuration: "2.5s" }} />
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
            <div className="w-5 h-5 rounded-full" style={{ background: "hsl(11 81% 57% / 0.35)" }} />
          </div>
          <div className="relative flex flex-col items-center" style={{ filter: "drop-shadow(0 6px 16px hsl(11 81% 57% / 0.6)) drop-shadow(0 2px 4px hsl(0 0% 0% / 0.5))" }}>
            <svg width="28" height="48" viewBox="0 0 34 58" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="pinGradMobile" x1="0" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="hsl(11, 81%, 64%)" />
                  <stop offset="50%" stopColor="hsl(11, 81%, 54%)" />
                  <stop offset="100%" stopColor="hsl(11, 81%, 38%)" />
                </linearGradient>
                <radialGradient id="pinShineMobile" cx="0.35" cy="0.25" r="0.6">
                  <stop offset="0%" stopColor="white" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path d="M17 0C9.5 0 0 6 0 15c0 13.5 15 37.8 16.1 39.5a1.1 1.1 0 001.8 0C19 54.8 34 28.5 34 15 34 6 24.5 0 17 0z" fill="url(#pinGradMobile)" />
              <path d="M17 0C9.5 0 0 6 0 15c0 13.5 15 37.8 16.1 39.5a1.1 1.1 0 001.8 0C19 54.8 34 28.5 34 15 34 6 24.5 0 17 0z" fill="url(#pinShineMobile)" />
            </svg>
            <img
              src={msShieldLogo}
              alt="MS Eletric"
              className="absolute object-contain"
              style={{ top: "8px", left: "50%", transform: "translateX(-50%)", width: "20px", height: "20px", filter: "brightness(0) invert(1) drop-shadow(0 1px 2px hsl(0 0% 0% / 0.3))" }}
            />
          </div>
          <div className="w-5 h-[3px] rounded-full mx-auto -mt-0.5" style={{ background: "hsl(0 0% 0% / 0.45)", filter: "blur(3px)" }} />
        </div>
        <div
          className="absolute bottom-2 right-2 z-[6] flex items-center gap-1.5 px-2 py-1 rounded-full pointer-events-none"
          style={{
            background: "hsl(0 0% 0% / 0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid hsl(0 0% 100% / 0.1)",
          }}
        >
          <Zap className="w-2 h-2" style={{ color: "hsl(11 81% 57%)" }} />
          <span className="text-[7px] font-bold uppercase tracking-[0.12em] text-white/70">Toque para navegar</span>
        </div>
      </div>

      <div className="px-4 py-3 space-y-3">
        {/* Endereço */}
        <div className="flex items-start gap-3">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(11 81% 57% / 0.15), hsl(11 81% 57% / 0.05))",
              border: "1px solid hsl(11 81% 57% / 0.2)",
            }}
          >
            <MapPin className="w-3 h-3" style={{ color: "hsl(11 81% 57%)" }} />
          </div>
          <div>
            <p className="text-white/40 text-[9px] uppercase tracking-[0.1em] mb-0.5">Endereço</p>
            <p className="text-white/90 text-[13px] font-semibold">Av. João Pinheiro, 3747</p>
            <p className="text-white/30 text-[10.5px] mt-0.5">Uberlândia — MG, 38408-168</p>
          </div>
        </div>

        <div className="h-px" style={{ background: "hsl(0 0% 100% / 0.08)" }} />

        {/* Telefone */}
        <div className="flex items-start gap-3">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(11 81% 57% / 0.15), hsl(11 81% 57% / 0.05))",
              border: "1px solid hsl(11 81% 57% / 0.2)",
            }}
          >
            <Phone className="w-3 h-3" style={{ color: "hsl(11 81% 57%)" }} />
          </div>
          <div>
            <p className="text-white/40 text-[9px] uppercase tracking-[0.1em] mb-0.5">Telefone</p>
            <a href="tel:+553432196628" className="text-white/90 text-[13px] font-semibold">
              (34) 3219-6628
            </a>
          </div>
        </div>

        <div className="h-px" style={{ background: "hsl(0 0% 100% / 0.08)" }} />

        {/* Horários */}
        <div className="flex items-start gap-3">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(11 81% 57% / 0.15), hsl(11 81% 57% / 0.05))",
              border: "1px solid hsl(11 81% 57% / 0.2)",
            }}
          >
            <Clock className="w-3 h-3" style={{ color: "hsl(11 81% 57%)" }} />
          </div>
          <div className="flex-1">
            <p className="text-white/40 text-[9px] uppercase tracking-[0.1em] mb-1">Horários</p>
            <div className="space-y-0.5">
              <div className="flex justify-between">
                <p className="text-white/50 text-[10.5px]">Seg – Sex</p>
                <p className="text-white/80 text-[10.5px] font-medium">08h – 18h</p>
              </div>
              <div className="flex justify-between">
                <p className="text-white/50 text-[10.5px]">Sábado</p>
                <p className="text-white/80 text-[10.5px] font-medium">08h – 12h</p>
              </div>
              <div className="flex justify-between">
                <p className="text-white/50 text-[10.5px]">Domingo</p>
                <p className="text-[10.5px] font-medium italic" style={{ color: "hsl(11 81% 57% / 0.6)" }}>Fechado</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          onClose();
          window.open("https://maps.app.goo.gl/7iwuPGQuN4rAhqRf8", "_blank");
        }}
        className="w-full flex items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white cursor-pointer active:scale-[0.98] transition-transform rounded-b-2xl"
        style={{
          background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
          boxShadow: "0 -4px 16px hsl(11 81% 57% / 0.15)",
        }}
      >
        <ExternalLink className="w-3 h-3" />
        Ver no Google Maps
      </button>
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   Main Hook
   ═══════════════════════════════════════════ */
const useMobileMenu = ({ items, isOnline, onContactClick, onQuizOpen }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const closeMenu = () => {
    setOpen(false);
    setExpandedItem(null);
  };

  const toggleMenu = () => {
    setOpen((v) => {
      if (v) setExpandedItem(null);
      return !v;
    });
  };

  const toggleExpand = (label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label));
  };

  /* ─── Trigger Button ─── */
  const triggerButton = (
    <button
      onClick={toggleMenu}
      className="md:hidden relative grid h-10 w-10 place-items-center cursor-pointer active:scale-95 transition-transform duration-150"
      style={{ background: "transparent", border: "none" }}
      aria-label={open ? "Fechar menu" : "Abrir menu"}
    >
      <div className="flex w-5 flex-col items-stretch justify-between" style={{ height: "14px" }}>
        <motion.span
          className="h-[2px] rounded-full"
          style={{ background: open ? "hsl(var(--primary))" : "#f5f5f5" }}
          animate={{ y: open ? 6 : 0, rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.span
          className="h-[2px] rounded-full"
          style={{ background: open ? "hsl(var(--primary))" : "#f5f5f5" }}
          animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.span
          className="h-[2px] rounded-full"
          style={{ background: open ? "hsl(var(--primary))" : "#f5f5f5" }}
          animate={{ y: open ? -6 : 0, rotate: open ? -45 : 0 }}
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
            transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
            className="md:hidden overflow-hidden relative z-[49]"
          >
            {/* Top separator */}
            <div
              className="h-px mx-4"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.25), hsl(0 0% 100% / 0.06), transparent)",
              }}
            />

            <div
              className="overflow-y-auto relative"
              style={{ maxHeight: "calc(100dvh - 140px)" }}
            >
              {/* Nav items */}
              <div className="px-3 pt-2 pb-1 space-y-1">
                {items.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.04 + i * 0.05,
                      duration: 0.3,
                      ease: [0.25, 0.8, 0.25, 1],
                    }}
                  >
                    {item.hasDropdown ? (
                      <div>
                        {/* Accordion header */}
                        <button
                          onClick={() => toggleExpand(item.label)}
                          aria-expanded={expandedItem === item.label}
                          className="w-full flex items-center justify-between py-3 px-4 rounded-xl cursor-pointer transition-colors duration-200"
                          style={{ background: "transparent" }}
                        >
                          <span
                            className="text-[13px] font-semibold tracking-wide transition-colors duration-200"
                            style={{
                              color:
                                expandedItem === item.label
                                  ? "hsl(0 0% 100% / 0.95)"
                                  : "hsl(0 0% 100% / 0.6)",
                            }}
                          >
                            {item.label}
                          </span>
                          <motion.div
                            animate={{ rotate: expandedItem === item.label ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          >
                            <ChevronDown
                              className="w-4 h-4"
                              style={{
                                color:
                                  expandedItem === item.label
                                    ? "hsl(11 81% 57%)"
                                    : "hsl(0 0% 100% / 0.2)",
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
                              transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                              className="overflow-hidden"
                            >
                              {item.dropdownItems[0]?.image ? (
                                <ModelsCarousel
                                  item={item}
                                  onClose={closeMenu}
                                  onQuizOpen={onQuizOpen}
                                />
                              ) : (
                                <VisitUsSection onClose={closeMenu} />
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      /* Simple link */
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className="block py-3 px-4 rounded-xl text-[13px] font-semibold tracking-wide active:scale-[0.98] transition-transform"
                        style={{ color: "hsl(0 0% 100% / 0.6)" }}
                      >
                        {item.label}
                      </a>
                    )}

                    {/* Separator */}
                    {i < items.length - 1 && (
                      <div
                        className="mx-4 h-px"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.04), transparent)",
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="px-3 pb-3 pt-1">
                <div
                  className="h-px mx-1 mb-2.5"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.2), hsl(0 0% 100% / 0.06), transparent)",
                  }}
                />
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                  onClick={() => {
                    closeMenu();
                    onContactClick?.();
                  }}
                  className="w-full relative flex items-center justify-center gap-3 rounded-2xl px-5 py-3.5 text-white cursor-pointer overflow-hidden active:scale-[0.98] transition-transform duration-150"
                  style={{
                    background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                    boxShadow:
                      "0 6px 20px hsl(11 81% 57% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.12)",
                  }}
                >
                  {/* Shine */}
                  <span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, hsl(0 0% 100% / 0.1) 0%, transparent 50%)",
                    }}
                  />
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span
                      className="absolute inset-0 rounded-full animate-ping opacity-60"
                      style={{
                        backgroundColor: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)",
                      }}
                    />
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)",
                        boxShadow: isOnline
                          ? "0 0 8px hsl(142 76% 50%)"
                          : "0 0 8px hsl(0 75% 50%)",
                      }}
                    />
                  </span>
                  <span
                    className="w-px h-5 rounded-sm"
                    style={{ background: "hsl(0 0% 100% / 0.25)" }}
                  />
                  <span className="relative flex flex-col items-start leading-none gap-[2px]">
                    <span className="text-[11px] font-bold tracking-wide">
                      {isOnline ? "Atendimento Online" : "Atendimento Offline"}
                    </span>
                    <span className="text-[8px] font-medium opacity-75 tracking-wider uppercase">
                      {isOnline ? "Tire suas dúvidas" : "Envie uma mensagem"}
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
