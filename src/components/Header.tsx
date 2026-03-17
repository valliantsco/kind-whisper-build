import React, { useState, useRef, useEffect } from "react";
import logoWhite from "@/assets/ms-eletric-logo-white.png";
import msShieldLogo from "@/assets/ms-shield-logo.png";
import ctaRider from "@/assets/cta-rider.jpg";
import { useBusinessHours } from "@/hooks/useBusinessHours";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ArrowRight, ArrowLeft, Compass, BarChart3, BookOpen, HelpCircle, Wrench, ShieldCheck, Play, MapPin } from "lucide-react";
import QuizEngine from "@/components/quiz/QuizEngine";
import { msEletricQuizConfig } from "@/components/QuizSection";

import categoryScooter from "@/assets/category-scooter.jpg";
import categoryBike from "@/assets/category-bike.jpg";
import categoryTricycle from "@/assets/category-tricycle.jpg";
import categoryMotocross from "@/assets/category-motocross.jpg";
import categoryAutopropelido from "@/assets/category-autopropelido.jpg";

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
}

const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "#inicio" },
  {
    label: "Nossos modelos",
    href: "#modelos",
    hasDropdown: true,
    hasCta: true,
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
  {
    label: "Suporte",
    href: "#suporte",
    hasDropdown: true,
    dropdownItems: [
      { label: "Central de ajuda", description: "Dúvidas frequentes e tutoriais", href: "#suporte", icon: HelpCircle },
      { label: "Garantia", description: "Informações sobre garantia e cobertura", href: "#suporte", icon: ShieldCheck },
      { label: "Onde estamos", description: "Arujá, SP — Conheça nossa sede", href: "#contato", icon: MapPin },
    ],
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

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
      <div ref={headerRef} className="mx-auto max-w-7xl relative">
        {/* Main bar */}
        <div
          className="relative flex items-center justify-between px-5 py-3 rounded-[0.9rem]"
          style={{
            background: "hsl(0 0% 14% / 0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid hsl(0 0% 100% / 0.08)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.25)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[0.9rem] overflow-hidden"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.8), hsl(11 90% 65% / 0.8), transparent)",
            }}
          />

          <a href="#">
            <img src={logoWhite} alt="MS Eletric" className="w-auto" style={{ height: "2.53rem" }} />
          </a>

          <nav className="hidden md:flex items-center gap-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] rounded-full transition-all duration-300 ease-out ${
                      activeDropdown === item.label ? "right-0 opacity-80" : "right-full opacity-0 group-hover:right-0 group-hover:opacity-80"
                    }`}
                    style={{ background: "linear-gradient(90deg, hsl(11 81% 57%), hsl(11 90% 65%))" }}
                  />
                </a>
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="relative group">
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
                  {isOnline ? "Atendimento online" : "Atendimento offline"}
                </span>
                <span className="text-[8px] font-medium opacity-70 tracking-wider uppercase">
                  {isOnline ? "Fale conosco" : "Deixe sua mensagem"}
                </span>
              </span>
            </button>
          </div>
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
                background: "hsl(0 0% 14% / 0.95)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid hsl(0 0% 100% / 0.08)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)",
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
                    <div className="mb-3">
                      <h3 className="text-white/90 text-base font-semibold tracking-wide">Explore por categoria</h3>
                      <p className="text-white/40 text-[12.5px] mt-0.5">Mobilidade elétrica para cada estilo de vida</p>
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
                              style={{ width: "210px", aspectRatio: "3/4", scrollSnapAlign: "start" }}
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
                                  <p className="text-white font-bold text-[12.5px] uppercase tracking-[0.08em] mb-0.5 drop-shadow-lg transition-colors duration-500 group-hover/item:text-[hsl(11,81%,57%)]">
                                    {dropItem.label}
                                  </p>
                                  <p className="text-white/60 text-[11px] tracking-wide line-clamp-2 group-hover/item:text-white/80 transition-colors duration-500">
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
                          if (el) el.scrollBy({ left: -230, behavior: "smooth" });
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
                          if (el) el.scrollBy({ left: 230, behavior: "smooth" });
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
                                <Compass className="w-5 h-5 text-[hsl(11,81%,57%)]" />
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
                ) : (
                  /* Icon-based list (Suporte) — compact horizontal cards */
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
                          {/* Top light strip on hover */}
                          <div
                            className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"
                            style={{ background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.4), transparent)" }}
                          />

                          {Icon && (
                            <div
                              className="relative shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover/item:scale-105"
                              style={{
                                background: "hsl(11 81% 57% / 0.1)",
                                border: "1px solid hsl(11 81% 57% / 0.18)",
                              }}
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
