import React, { useState, useRef, useEffect } from "react";
import logoWhite from "@/assets/ms-eletric-logo-white.png";
import msShieldLogo from "@/assets/ms-shield-logo.png";
import ctaRider from "@/assets/cta-rider.webp";
import { useBusinessHours } from "@/hooks/useBusinessHours";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ArrowRight, ArrowLeft, Compass, BarChart3, BookOpen, HelpCircle, Wrench, ShieldCheck, Play, MapPin, Building2, Navigation, Phone, Clock, ExternalLink, Zap } from "lucide-react";
import QuizEngine from "@/components/quiz/QuizEngine";
import { msEletricQuizConfig } from "@/components/QuizSection";
import useMobileMenu from "@/components/MobileMenu";


import categoryScooter from "@/assets/category-scooter.webp";
import categoryBike from "@/assets/category-bike.webp";
import categoryTricycle from "@/assets/category-tricycle.webp";
import categoryMotocross from "@/assets/category-motocross.webp";
import categoryAutopropelido from "@/assets/category-autopropelido.webp";

interface HeaderProps {
  onContactClick?: () => void;
}

interface DropdownItem {
  label: string;
  description: string;
  href: string;
  image?: string;
  video?: string;
  youtubeId?: string;
  badge?: string;
  icon?: React.ElementType;
}

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
  hasCta?: boolean;
  sectionType?: "models" | "visit-us";
}

const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "#inicio" },
  {
    label: "Modelos",
    href: "#modelos",
    hasDropdown: true,
    hasCta: true,
    sectionType: "models" as const,
    dropdownItems: [
      { label: "Bicicletas Elétricas", description: "Conforto, autonomia e liberdade para o dia a dia", href: "#modelos", image: categoryBike, video: "https://ppmoesqgmficvajqbamr.supabase.co/storage/v1/object/public/videos/bicicletas-eletricas.mp4", badge: "Novidade" },
      { label: "Autopropelidos", description: "Mobilidade urbana prática, econômica e compacta", href: "#modelos", image: categoryAutopropelido, video: "https://ppmoesqgmficvajqbamr.supabase.co/storage/v1/object/public/videos/autopropelido-v2.mp4", badge: "Mais vendidos" },
      { label: "Scooters Elétricas", description: "Desempenho, conforto e estilo na rotina urbana", href: "#modelos", image: categoryScooter, video: "https://ppmoesqgmficvajqbamr.supabase.co/storage/v1/object/public/videos/scooters-eletricas.mp4" },
      { label: "Triciclos Elétricos", description: "Mais estabilidade, segurança e praticidade", href: "#modelos", image: categoryTricycle, video: "https://ppmoesqgmficvajqbamr.supabase.co/storage/v1/object/public/videos/triciclos-eletricos.mp4" },
      { label: "Utilitários", description: "Eficiência e resistência para o trabalho", href: "#modelos", image: categoryMotocross, video: "https://ppmoesqgmficvajqbamr.supabase.co/storage/v1/object/public/videos/utilitarios.mp4" },
      { label: "Infantil", description: "Diversão elétrica para momentos de lazer", href: "#modelos", image: categoryMotocross, video: "https://ppmoesqgmficvajqbamr.supabase.co/storage/v1/object/public/videos/infantil.mp4" },
      { label: "Patinetes", description: "Leves, ágeis e práticos para curtas distâncias", href: "#modelos", image: categoryScooter, video: "https://ppmoesqgmficvajqbamr.supabase.co/storage/v1/object/public/videos/patinetes.mp4" },
    ],
  },
  { label: "Sobre nós", href: "#sobre" },
  {
    label: "Visite-nos",
    href: "#contato",
    hasDropdown: true,
    sectionType: "visit-us" as const,
    dropdownItems: [],
  },
];

const categoryImages = [categoryScooter, categoryBike, categoryTricycle, categoryMotocross, categoryAutopropelido];

const Header = ({ onContactClick }: HeaderProps) => {
  const isOnline = useBusinessHours();

  // Preload category images on mount
  useEffect(() => {
    categoryImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rightFadeOpacity, setRightFadeOpacity] = useState(1);
  const [leftFadeOpacity, setLeftFadeOpacity] = useState(0);
  const peekDoneRef = useRef(false);
  const isDraggingCards = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const handleCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const progress = max > 0 ? el.scrollLeft / max : 0;
    setScrollProgress(progress);
    const rFade = progress < 0.8 ? 1 : Math.max(0, 1 - (progress - 0.8) / 0.18);
    setRightFadeOpacity(rFade);
    const lFade = progress > 0.2 ? 1 : Math.max(0, progress / 0.2);
    setLeftFadeOpacity(lFade);
  };

  // Reset carousel state and peek animation when dropdown opens/closes
  useEffect(() => {
    if (activeDropdown === "Modelos") {
      // Reset scroll position and fade state
      setScrollProgress(0);
      setRightFadeOpacity(1);
      setLeftFadeOpacity(0);
      const el = carouselRef.current;
      if (el) {
        el.scrollLeft = 0;
      }
      // Peek animation
      if (!peekDoneRef.current) {
        peekDoneRef.current = true;
        requestAnimationFrame(() => {
          if (carouselRef.current) {
            carouselRef.current.scrollTo({ left: 50, behavior: "smooth" });
            setTimeout(() => {
              carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
            }, 300);
          }
        });
      }
    }
    if (!activeDropdown) {
      peekDoneRef.current = false;
    }
  }, [activeDropdown]);

  const handleEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeItem = NAV_ITEMS.find((i) => i.label === activeDropdown);

  const { triggerButton: mobileMenuTrigger, dropdownBody: mobileDropdown, isOpen: mobileMenuOpen } = useMobileMenu({
    items: NAV_ITEMS,
    isOnline,
    onContactClick,
    onQuizOpen: () => setQuizOpen(true),
  });

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
      <div ref={headerRef} className="mx-auto max-w-7xl relative">
        {/* Main container — wraps bar + mobile dropdown seamlessly */}
        <div
          className="relative overflow-hidden transition-[border-radius] duration-300"
          style={{
            background: "linear-gradient(135deg, hsl(0 0% 10% / 0.72), hsl(0 0% 14% / 0.68))",
            backdropFilter: "blur(40px) saturate(1.4)",
            WebkitBackdropFilter: "blur(40px) saturate(1.4)",
            border: "1px solid hsl(0 0% 100% / 0.1)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.55), 0 2px 12px rgba(0,0,0,0.35), inset 0 1px 0 hsl(0 0% 100% / 0.06), inset 0 -1px 0 hsl(0 0% 0% / 0.2)",
            borderRadius: mobileMenuOpen ? "0.9rem" : "0.9rem",
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[0.9rem] overflow-hidden z-10"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.8), hsl(11 90% 65% / 0.8), transparent)",
            }}
          />

          {/* Header bar */}
          <div className="relative flex items-center justify-between px-5 py-3">
            <a href="#">
              <img src={logoWhite} alt="MS Eletric" className="w-auto" style={{ height: "2.53rem" }} />
            </a>

            <nav className="hidden lg:flex items-center gap-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleEnter(item.label)}
                  onMouseLeave={handleLeave}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.hasDropdown) {
                        e.preventDefault();
                        setActiveDropdown(activeDropdown === item.label ? null : item.label);
                      }
                    }}
                    className={`relative text-sm font-medium transition-all duration-300 ease-out py-1.5 px-2 rounded-md group flex items-center gap-1 ${
                      activeDropdown === item.label ? "text-white/95" : "text-white/50 hover:text-white/95"
                    }`}
                  >
                    <span
                      className={`absolute inset-0 rounded-md transition-opacity duration-700 ease-out pointer-events-none ${
                        activeDropdown === item.label ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                      style={{
                        background: "radial-gradient(ellipse at center, hsl(11 81% 57% / 0.08), transparent 70%)",
                      }}
                    />
                    <span className="relative">{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`relative w-3 h-3 -ml-0.5 transition-transform duration-300 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </a>
                </div>
              ))}
            </nav>

            {/* CTA — desktop only */}
            <div className="relative group hidden lg:block">
              <span
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none"
                style={{ boxShadow: "0 4px 24px hsla(11, 81%, 57%, 0.4)" }}
              />
              <button
                onClick={onContactClick}
                className="relative flex items-center gap-2.5 rounded-lg px-5 py-2 text-white cursor-pointer overflow-hidden active:scale-[0.97] transition-transform duration-150"
                style={{ background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))" }}
              >
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none"
                  style={{ boxShadow: "inset 0 0 20px hsla(0, 0%, 100%, 0.12)" }}
                />
                <span className="relative flex h-1.5 w-1.5 shrink-0 items-center justify-center -ml-1.5">
                  <span
                    className="absolute inset-0 rounded-full animate-ping opacity-60"
                    style={{ backgroundColor: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)" }}
                  />
                  <span
                    className="relative inline-flex h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)",
                      boxShadow: isOnline ? "0 0 8px hsl(142 76% 50%)" : "0 0 8px hsl(0 75% 50%)",
                    }}
                  />
                </span>
                <span className="w-[2px] h-5 rounded-sm shrink-0" style={{ background: "hsl(0 0% 100% / 0.35)" }} />
                <span className="flex flex-col items-start leading-none gap-[2px]">
                  <span className="text-[11px] font-semibold tracking-wide">
                    {isOnline ? "Atendimento Online" : "Atendimento Offline"}
                  </span>
                  <span className="text-[8px] font-medium opacity-70 tracking-wider uppercase">
                    {isOnline ? "Fale conosco" : "Deixe sua mensagem"}
                  </span>
                </span>
              </button>
            </div>

            {/* Mobile menu trigger */}
            {mobileMenuTrigger}
          </div>

          {/* Mobile dropdown — renders inside same container */}
          {mobileDropdown}
        </div>

        {/* Dropdown mega menu */}
        <AnimatePresence>
          {activeItem?.hasDropdown && activeItem.dropdownItems && (
            <motion.div
              key={activeItem.label}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
              className="absolute left-0 right-0 mt-2 rounded-[0.9rem] overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(0 0% 10% / 0.78), hsl(0 0% 14% / 0.72))",
                backdropFilter: "blur(40px) saturate(1.4)",
                WebkitBackdropFilter: "blur(40px) saturate(1.4)",
                border: "1px solid hsl(0 0% 100% / 0.1)",
                boxShadow: "0 16px 56px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.35), inset 0 1px 0 hsl(0 0% 100% / 0.06)",
              }}
              onMouseEnter={() => handleEnter(activeItem.label)}
              onMouseLeave={handleLeave}
            >
              {/* Top gradient strip */}
              <div
                className="h-[2px]"
                style={{
                  background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.6), hsl(11 90% 65% / 0.6), transparent)",
                }}
              />

              {/* Subtle radial orange glow at bottom */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at bottom center, hsl(11 81% 57% / 0.04), transparent 70%)",
                }}
              />
              <div className="p-5 relative">
                {activeItem.dropdownItems[0]?.image ? (
                  /* Carousel (Modelos) */
                  <>
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div
                          className="w-1 h-4 rounded-full shrink-0"
                          style={{ background: "linear-gradient(180deg, hsl(11 81% 57%), hsl(11 90% 65%))" }}
                        />
                        <span className="text-[15px] font-semibold tracking-wide" style={{ color: "hsl(11 81% 57%)" }}>
                          Explore por Categoria
                        </span>
                      </div>
                      <p className="text-white/35 text-[11px] mt-0.5">
                        Mobilidade elétrica para cada estilo de vida
                      </p>
                    </div>
                    <div className="relative flex gap-4">
                      {/* Scrollable carousel area */}
                      <div className="relative flex-1 min-w-0">
                      <div
                        ref={carouselRef}
                        className="flex gap-3 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
                        style={{
                          scrollSnapType: "x mandatory",
                          scrollBehavior: "smooth",
                          maskImage: (() => {
                            const lOp = leftFadeOpacity;
                            const rOp = rightFadeOpacity;
                            if (lOp < 0.01 && rOp < 0.01) return "none";
                            if (lOp < 0.01) return `linear-gradient(to right, black ${55 + (1 - rOp) * 45}%, transparent 100%)`;
                            if (rOp < 0.01) return `linear-gradient(to right, transparent 0%, black ${lOp * 10}%)`;
                            return `linear-gradient(to right, transparent 0%, black ${lOp * 10}%, black ${55 + (1 - rOp) * 45}%, transparent 100%)`;
                          })(),
                          WebkitMaskImage: (() => {
                            const lOp = leftFadeOpacity;
                            const rOp = rightFadeOpacity;
                            if (lOp < 0.01 && rOp < 0.01) return "none";
                            if (lOp < 0.01) return `linear-gradient(to right, black ${55 + (1 - rOp) * 45}%, transparent 100%)`;
                            if (rOp < 0.01) return `linear-gradient(to right, transparent 0%, black ${lOp * 10}%)`;
                            return `linear-gradient(to right, transparent 0%, black ${lOp * 10}%, black ${55 + (1 - rOp) * 45}%, transparent 100%)`;
                          })(),
                        }}
                        onScroll={handleCarouselScroll}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          const el = carouselRef.current;
                          if (!el) return;
                          isDraggingCards.current = false;
                          dragStartX.current = e.pageX;
                          dragStartScroll.current = el.scrollLeft;
                          el.style.scrollBehavior = "auto";
                          el.style.scrollSnapType = "none";
                          let lastX = e.pageX;
                          let velocity = 0;
                          let lastTime = Date.now();
                          const onMove = (ev: MouseEvent) => {
                            const now = Date.now();
                            const dt = Math.max(1, now - lastTime);
                            const diff = ev.pageX - dragStartX.current;
                            if (Math.abs(diff) > 3) isDraggingCards.current = true;
                            velocity = (ev.pageX - lastX) / dt * 16;
                            lastX = ev.pageX;
                            lastTime = now;
                            el.scrollLeft = dragStartScroll.current - diff;
                          };
                          const onUp = () => {
                            window.removeEventListener("mousemove", onMove);
                            window.removeEventListener("mouseup", onUp);
                            const friction = 0.92;
                            const animate = () => {
                              if (Math.abs(velocity) < 0.5) {
                                el.style.scrollSnapType = "x mandatory";
                                el.style.scrollBehavior = "smooth";
                                setTimeout(() => { isDraggingCards.current = false; }, 10);
                                return;
                              }
                              el.scrollLeft -= velocity;
                              velocity *= friction;
                              requestAnimationFrame(animate);
                            };
                            requestAnimationFrame(animate);
                          };
                          window.addEventListener("mousemove", onMove);
                          window.addEventListener("mouseup", onUp);
                        }}
                      >
                        {activeItem.dropdownItems.map((dropItem, i) => (
                          <React.Fragment key={dropItem.label}>
                            <div
                              className="group/item relative flex-shrink-0 rounded-xl overflow-hidden"
                              style={{ width: "198px", aspectRatio: "3/4", scrollSnapAlign: "start" }}
                            >
                              <a
                                href={dropItem.href}
                                className="relative block w-full h-full"
                                onClick={(e) => { if (isDraggingCards.current) { e.preventDefault(); return; } setActiveDropdown(null); }}
                              >
                                {dropItem.youtubeId ? (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.1 + 0.15, duration: 0.8, ease: "easeOut" }}
                                    className="absolute inset-0 w-full h-full overflow-hidden"
                                  >
                                    <iframe
                                      src={`https://www.youtube.com/embed/${dropItem.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${dropItem.youtubeId}&controls=0&showinfo=0&modestbranding=1&rel=0&start=4&playsinline=1`}
                                      allow="autoplay; encrypted-media"
                                      allowFullScreen
                                      className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                      style={{ border: "none" }}
                                    />
                                  </motion.div>
                                ) : dropItem.video ? (
                                  <motion.video
                                    src={dropItem.video}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.1 + 0.15, duration: 0.8, ease: "easeOut" }}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover/item:scale-[1.08]"
                                  />
                                ) : (
                                  <motion.img
                                    src={dropItem.image}
                                    alt={dropItem.label}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.1 + 0.15, duration: 0.8, ease: "easeOut" }}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover/item:scale-[1.08]"
                                  />
                                )}

                                {/* Dark gradient overlay */}
                                <div
                                  className="absolute inset-0"
                                  style={{
                                    background: "linear-gradient(to top, hsl(0 0% 0% / 0.85) 0%, hsl(0 0% 0% / 0.4) 40%, hsl(0 0% 0% / 0.15) 70%, hsl(0 0% 0% / 0.25) 100%)",
                                  }}
                                />

                                {/* 1. Hover orange gradient overlay */}
                                <div
                                  className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
                                  style={{
                                    background: "linear-gradient(135deg, hsl(11 81% 57% / 0.2) 0%, hsl(11 90% 65% / 0.08) 50%, transparent 100%)",
                                  }}
                                />

                                {/* 3. Badge */}
                                {dropItem.badge && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 + 0.4, duration: 0.4 }}
                                    className="absolute top-2 right-2 z-10"
                                  >
                                    <span
                                      className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] text-white"
                                      style={{
                                        background: "hsl(11 81% 57% / 0.7)",
                                        backdropFilter: "blur(12px)",
                                        WebkitBackdropFilter: "blur(12px)",
                                        border: "1px solid hsl(11 81% 57% / 0.3)",
                                        boxShadow: "0 2px 8px hsl(11 81% 57% / 0.25)",
                                      }}
                                    >
                                      {dropItem.badge}
                                    </span>
                                  </motion.div>
                                )}

                                {/* 4. Play indicator (video only) */}
                                {(dropItem.video || dropItem.youtubeId) && (
                                  <motion.div
                                    initial={{ opacity: 0.8, scale: 1 }}
                                    animate={{ opacity: 0, scale: 0.8 }}
                                    transition={{ delay: i * 0.1 + 1.2, duration: 1.2, ease: "easeOut" }}
                                    className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full flex items-center justify-center pointer-events-none"
                                    style={{
                                      background: "hsl(0 0% 0% / 0.5)",
                                      backdropFilter: "blur(8px)",
                                      WebkitBackdropFilter: "blur(8px)",
                                    }}
                                  >
                                    <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                                  </motion.div>
                                )}

                                {/* 2. Text with micro-animation on hover */}
                                <div className="absolute bottom-0 left-0 right-0 p-2.5 transition-transform duration-400 ease-out group-hover/item:-translate-y-1">
                                  <p className="text-white font-bold text-[12px] uppercase tracking-[0.08em] mb-0.5 drop-shadow-lg transition-colors duration-500 group-hover/item:text-[hsl(11,81%,57%)]">
                                    {dropItem.label}
                                  </p>
                                  <p className="text-white/60 text-[10.5px] tracking-wide line-clamp-2 group-hover/item:text-white/80 transition-colors duration-500">
                                    {dropItem.description}
                                  </p>
                                </div>
                              </a>
                            </div>

                            {/* 6. Separator between cards */}
                            {i < (activeItem.dropdownItems?.length ?? 0) - 1 && (
                              <div className="flex-shrink-0 w-px self-stretch my-6" style={{ background: "hsl(0 0% 100% / 0.05)" }} />
                            )}
                          </React.Fragment>
                        ))}

                      </div>

                      {/* Orange scroll-left button */}
                      <button
                        onClick={() => {
                          const el = carouselRef.current;
                          if (el) el.scrollBy({ left: -210, behavior: "smooth" });
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ease-out hover:scale-110 active:scale-95"
                        style={{
                          background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                          boxShadow: "0 4px 12px hsl(11 81% 57% / 0.4)",
                          opacity: leftFadeOpacity,
                          pointerEvents: leftFadeOpacity < 0.1 ? "none" : "auto",
                        }}
                        aria-label="Anterior"
                      >
                        <ArrowLeft className="w-4 h-4 text-white" />
                      </button>

                      {/* Orange scroll-right button */}
                      <button
                        onClick={() => {
                          const el = carouselRef.current;
                          if (el) el.scrollBy({ left: 210, behavior: "smooth" });
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ease-out hover:scale-110 active:scale-95"
                        style={{
                          background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                          boxShadow: "0 4px 12px hsl(11 81% 57% / 0.4)",
                          opacity: rightFadeOpacity,
                          pointerEvents: rightFadeOpacity < 0.1 ? "none" : "auto",
                        }}
                        aria-label="Próximo"
                      >
                        <ArrowRight className="w-4 h-4 text-white" />
                      </button>
                      </div>

                      {/* Quiz CTA - Fixed, always visible */}
                      {activeItem.hasCta && (
                        <>
                          {/* Vertical separator */}
                          <div className="flex-shrink-0 w-px self-stretch my-4" style={{ background: "hsl(0 0% 100% / 0.08)" }} />
                          
                          <motion.button
                            onClick={() => { setActiveDropdown(null); setQuizOpen(true); }}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                            className="group/quiz relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer flex flex-col items-center justify-center text-center"
                            style={{
                              width: "200px",
                              alignSelf: "stretch",
                              background: "linear-gradient(160deg, hsl(0 0% 10%), hsl(0 0% 6%))",
                              border: "1px solid hsl(0 0% 100% / 0.1)",
                            }}
                          >
                            {/* Animated border glow */}
                            <motion.div
                              className="absolute inset-0 rounded-xl pointer-events-none"
                              animate={{
                                boxShadow: [
                                  "inset 0 0 0 1px hsl(11 81% 57% / 0.15), 0 0 16px hsl(11 81% 57% / 0.05)",
                                  "inset 0 0 0 1px hsl(11 81% 57% / 0.35), 0 0 24px hsl(11 81% 57% / 0.12)",
                                  "inset 0 0 0 1px hsl(11 81% 57% / 0.15), 0 0 16px hsl(11 81% 57% / 0.05)",
                                ],
                              }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {/* Subtle gradient accent */}
                            <div
                              className="absolute inset-0 opacity-40 group-hover/quiz:opacity-70 transition-opacity duration-500"
                              style={{
                                background: "radial-gradient(ellipse at 50% 80%, hsl(11 81% 57% / 0.15), transparent 70%)",
                              }}
                            />

                            <div className="relative flex flex-col items-center gap-3 px-4">
                              {/* Icon */}
                              <motion.div
                                className="w-11 h-11 rounded-full flex items-center justify-center"
                                style={{
                                  background: "linear-gradient(135deg, hsl(11 81% 57% / 0.2), hsl(11 81% 57% / 0.08))",
                                  border: "1px solid hsl(11 81% 57% / 0.25)",
                                }}
                                animate={{ scale: [1, 1.06, 1] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                              >
                                <HelpCircle className="w-5 h-5 text-[hsl(11,81%,57%)]" />
                              </motion.div>

                              {/* Copy */}
                              <div className="space-y-1">
                                <p className="text-white font-bold text-[11px] uppercase tracking-[0.12em] leading-tight">
                                  Não sabe qual escolher?
                                </p>
                                <p className="text-white/45 text-[10px] leading-relaxed tracking-wide">
                                  Responda em 1 min e descubra o modelo ideal
                                </p>
                              </div>

                              {/* Mini CTA */}
                              <div
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full group-hover/quiz:gap-2.5 transition-all duration-300"
                                style={{
                                  background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                                  boxShadow: "0 2px 10px hsl(11 81% 57% / 0.3)",
                                }}
                              >
                                <span className="text-white text-[10px] font-semibold uppercase tracking-[0.1em]">Fazer quiz</span>
                                <ArrowRight className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          </motion.button>
                        </>
                      )}
                    </div>

                    {/* Slide bar - aesthetic only */}
                    <div className="mt-5 rounded-full overflow-hidden" style={{ width: "100%", height: "4px", background: "hsl(0 0% 100% / 0.08)" }}>
                      <div
                        className="h-full rounded-full will-change-transform"
                        style={{
                          background: "linear-gradient(90deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                          width: "48%",
                          transform: `translateX(${scrollProgress * (100 / 0.48 - 100)}%)`,
                          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                          boxShadow: "0 0 10px hsl(11 81% 57% / 0.5), 0 0 4px hsl(11 81% 57% / 0.3)",
                        }}
                      />
                    </div>
                  </>
                ) : activeItem.label === "Visite-nos" ? (
                  /* Enhanced Sobre Nós layout — full width */
                  <div className="flex gap-3" style={{ minHeight: "340px" }}>

                      {/* Left panel: Info card */}
                      <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.35, ease: "easeOut" }}
                        className="flex flex-col rounded-xl overflow-hidden shrink-0"
                        style={{
                          width: "300px",
                          background: "linear-gradient(160deg, hsl(0 0% 11% / 0.9), hsl(0 0% 6% / 0.95))",
                          border: "1px solid hsl(0 0% 100% / 0.07)",
                        }}
                      >
                        {/* Top accent line */}
                        <div className="h-[2px] shrink-0" style={{ background: "linear-gradient(90deg, hsl(11 81% 57%), hsl(11 90% 65%), transparent)" }} />

                        {/* Card content */}
                        <div className="flex flex-col flex-1 px-5 pt-4 pb-4 gap-3">

                          {/* Header */}
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <div
                                className="w-1 h-4 rounded-full shrink-0"
                                style={{ background: "linear-gradient(180deg, hsl(11 81% 57%), hsl(11 90% 65%))" }}
                              />
                              <span className="text-[15px] font-semibold tracking-wide" style={{ color: "hsl(11 81% 57%)" }}>
                                Venha nos Visitar
                              </span>
                            </div>
                            <p className="text-white/35 text-[11px] mt-0.5 leading-relaxed">
                              Transformando a mobilidade urbana desde 2015
                            </p>
                          </div>

                          {/* Divider */}
                          <div className="h-px shrink-0" style={{ background: "hsl(0 0% 100% / 0.06)" }} />

                          {/* Address */}
                          <div className="flex items-start gap-3">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{
                                background: "hsl(11 81% 57% / 0.1)",
                                border: "1px solid hsl(11 81% 57% / 0.18)",
                              }}
                            >
                              <MapPin className="w-4 h-4" style={{ color: "hsl(11 81% 57%)" }} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/35 mb-0.5">Endereço</p>
                              <p className="text-white text-[12px] font-semibold tracking-wide leading-tight">
                                Av. João Pinheiro, 3747
                              </p>
                              <p className="text-white/40 text-[10.5px] tracking-wide">
                                Uberlândia — MG, 38408-168
                              </p>
                            </div>
                          </div>

                          {/* Phone */}
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{
                                background: "hsl(11 81% 57% / 0.1)",
                                border: "1px solid hsl(11 81% 57% / 0.18)",
                              }}
                            >
                              <Phone className="w-4 h-4" style={{ color: "hsl(11 81% 57%)" }} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/35 mb-0.5">Telefone</p>
                              <a
                                href="tel:+553432196628"
                                onClick={(e) => e.stopPropagation()}
                                className="text-white/80 text-[12px] font-semibold tracking-wide hover:text-white transition-colors duration-200 inline-flex items-center gap-1"
                              >
                                (34) 3219-6628
                              </a>
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="h-px shrink-0" style={{ background: "hsl(0 0% 100% / 0.06)" }} />

                          {/* Hours */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-3.5 h-3.5" style={{ color: "hsl(11 81% 57% / 0.6)" }} />
                              <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/35">Horários</p>
                            </div>
                            <div className="space-y-1.5">
                              {[
                                { day: "Seg – Sex", hours: "08h – 18h", active: true },
                                { day: "Sábado", hours: "08h – 12h", active: true },
                                { day: "Domingo", hours: "Fechado", active: false },
                              ].map((row) => (
                                <div key={row.day} className="flex items-center justify-between">
                                  <span className="text-white/40 text-[10.5px]">{row.day}</span>
                                  <span
                                    className={`text-[10.5px] font-semibold tabular-nums ${row.active ? "text-white/65" : "text-white/25 italic"}`}
                                  >
                                    {row.hours}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* CTA Button */}
                          <button
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.12em] text-white cursor-pointer transition-all duration-300 hover:brightness-110 hover:shadow-lg active:scale-[0.98] shrink-0"
                            style={{
                              background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                              boxShadow: "0 4px 16px hsl(11 81% 57% / 0.3)",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdown(null);
                              window.open("https://maps.app.goo.gl/7iwuPGQuN4rAhqRf8", "_blank");
                            }}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Abrir no Google Maps
                          </button>
                        </div>
                      </motion.div>

                      {/* Right panel: Map */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.35, ease: "easeOut" }}
                        className="relative flex-1 rounded-xl overflow-hidden cursor-pointer group/loc"
                        style={{
                          background: "linear-gradient(160deg, hsl(0 0% 12% / 0.6), hsl(0 0% 8% / 0.7))",
                          border: "1px solid hsl(0 0% 100% / 0.08)",
                          transition: "border-color 0.3s",
                        }}
                        onClick={() => {
                          setActiveDropdown(null);
                          window.open("https://maps.app.goo.gl/7iwuPGQuN4rAhqRf8", "_blank");
                        }}
                      >
                        {/* Google Maps iframe — dark styled */}
                        <div className="absolute inset-0 overflow-hidden rounded-xl">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2250!2d-48.26122457146234!3d-18.892441917718067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                            className="absolute border-0 pointer-events-none"
                            style={{
                              top: "-80px",
                              left: "-30px",
                              width: "calc(100% + 60px)",
                              height: "calc(100% + 160px)",
                              filter: "invert(1) hue-rotate(180deg) brightness(0.95) contrast(1.1) saturate(0.3)",
                            }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="MS Eletric - Uberlândia"
                          />
                        </div>

                        {/* Custom MS Eletric brand pin */}
                        <div className="absolute z-[5] pointer-events-none" style={{ top: "calc(44% + 40px)", left: "calc(48% + 60px)", transform: "translate(-50%, -100%)" }}>
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                            <div className="w-8 h-8 rounded-full animate-ping" style={{ background: "hsl(11 81% 57% / 0.2)", animationDuration: "2.5s" }} />
                          </div>
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                            <div className="w-5 h-5 rounded-full" style={{ background: "hsl(11 81% 57% / 0.35)" }} />
                          </div>
                          <div className="relative flex flex-col items-center" style={{ filter: "drop-shadow(0 6px 16px hsl(11 81% 57% / 0.6)) drop-shadow(0 2px 4px hsl(0 0% 0% / 0.5))" }}>
                            <svg width="34" height="58" viewBox="0 0 34 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <linearGradient id="pinGrad" x1="0" y1="0" x2="0.5" y2="1">
                                  <stop offset="0%" stopColor="hsl(11, 81%, 64%)" />
                                  <stop offset="50%" stopColor="hsl(11, 81%, 54%)" />
                                  <stop offset="100%" stopColor="hsl(11, 81%, 38%)" />
                                </linearGradient>
                                <radialGradient id="pinShine" cx="0.35" cy="0.25" r="0.6">
                                  <stop offset="0%" stopColor="white" stopOpacity="0.25" />
                                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                                </radialGradient>
                              </defs>
                              <path d="M17 0C9.5 0 0 6 0 15c0 13.5 15 37.8 16.1 39.5a1.1 1.1 0 001.8 0C19 54.8 34 28.5 34 15 34 6 24.5 0 17 0z" fill="url(#pinGrad)" />
                              <path d="M17 0C9.5 0 0 6 0 15c0 13.5 15 37.8 16.1 39.5a1.1 1.1 0 001.8 0C19 54.8 34 28.5 34 15 34 6 24.5 0 17 0z" fill="url(#pinShine)" />
                            </svg>
                            <img
                              src={msShieldLogo}
                              alt="MS Eletric"
                              className="absolute object-contain"
                              style={{
                                top: "10px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "25px",
                                height: "25px",
                                filter: "brightness(0) invert(1) drop-shadow(0 1px 2px hsl(0 0% 0% / 0.3))",
                              }}
                            />
                          </div>
                          <div className="w-6 h-[3px] rounded-full mx-auto -mt-0.5" style={{ background: "hsl(0 0% 0% / 0.45)", filter: "blur(3px)" }} />
                        </div>


                        {/* Bottom-right navigate label */}
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.3 }}
                          className="absolute bottom-3 right-3 z-[6] flex items-center gap-1.5 px-2.5 py-1 rounded-full pointer-events-none"
                          style={{
                            background: "hsl(0 0% 0% / 0.6)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid hsl(0 0% 100% / 0.1)",
                          }}
                        >
                          <Zap className="w-2.5 h-2.5" style={{ color: "hsl(11 81% 57%)" }} />
                          <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-white/70">Clique para navegar</span>
                        </motion.div>

                        {/* Hover glow border */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover/loc:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px hsl(11 81% 57% / 0.3), 0 0 20px hsl(11 81% 57% / 0.08)" }} />
                      </motion.div>
                    </div>
                ) : (
                  /* Icon-based list — compact horizontal cards */
                  <>
                    <div className="mb-4">
                      <h3 className="text-white/90 text-base font-semibold tracking-wide">Como podemos ajudar?</h3>
                      <p className="text-white/40 text-[12.5px] mt-0.5">Suporte completo para sua experiência elétrica</p>
                    </div>
                    <div className="flex gap-3">
                    {activeItem.dropdownItems.map((dropItem, i) => {
                      const Icon = dropItem.icon;
                      return (
                        <motion.button
                          key={dropItem.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.07, duration: 0.3, ease: "easeOut" }}
                          className="group/item relative flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer overflow-hidden flex-1"
                          style={{
                            background: "linear-gradient(160deg, hsl(0 0% 12% / 0.6), hsl(0 0% 8% / 0.7))",
                            border: "1px solid hsl(0 0% 100% / 0.06)",
                            transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = "hsl(11 81% 57% / 0.3)";
                            el.style.boxShadow = "0 4px 20px hsl(11 81% 57% / 0.1)";
                            el.style.transform = "translateY(-1px)";
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = "hsl(0 0% 100% / 0.06)";
                            el.style.boxShadow = "none";
                            el.style.transform = "translateY(0)";
                          }}
                          onClick={() => {
                            setActiveDropdown(null);
                            if (dropItem.label === "Quiz interativo") {
                              setQuizOpen(true);
                            } else {
                              const el = document.querySelector(dropItem.href);
                              el?.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                        >
                          <div
                            className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"
                            style={{ background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.4), transparent)" }}
                          />
                          {Icon && (
                            <div
                              className="relative shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover/item:scale-105"
                              style={{ background: "hsl(11 81% 57% / 0.1)", border: "1px solid hsl(11 81% 57% / 0.18)" }}
                            >
                              <Icon className="w-4 h-4" style={{ color: "hsl(11 81% 57%)" }} />
                            </div>
                          )}
                          <div className="relative text-left">
                            <span className="text-[12px] font-semibold text-white/90 tracking-wide group-hover/item:text-white transition-colors duration-300">
                              {dropItem.label}
                            </span>
                            <p className="text-[10px] text-white/35 mt-0.5 leading-relaxed group-hover/item:text-white/50 transition-colors duration-300">
                              {dropItem.description}
                            </p>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>

    <QuizEngine config={msEletricQuizConfig} open={quizOpen} onOpenChange={setQuizOpen} />
    </>
  );
};

export default Header;
