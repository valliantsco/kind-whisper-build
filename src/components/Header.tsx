import { useState, useRef, useEffect } from "react";
import logoWhite from "@/assets/ms-eletric-logo-white.png";
import { useBusinessHours } from "@/hooks/useBusinessHours";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
}

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "#inicio" },
  {
    label: "Modelos",
    href: "#modelos",
    hasDropdown: true,
    dropdownItems: [
      { label: "Scooters", description: "Mobilidade urbana prática e silenciosa", href: "#modelos", image: categoryScooter },
      { label: "Bikes", description: "Pedale com assistência elétrica", href: "#modelos", image: categoryBike },
      { label: "Triciclos", description: "Estabilidade e conforto para todos", href: "#modelos", image: categoryTricycle },
      { label: "Motocross", description: "Aventura off-road 100% elétrica", href: "#modelos", image: categoryMotocross },
      { label: "Autopropelidos", description: "Soluções industriais elétricas", href: "#modelos", image: categoryAutopropelido },
    ],
  },
  {
    label: "Como escolher",
    href: "#como-escolher",
    hasDropdown: true,
    dropdownItems: [
      { label: "Quiz interativo", description: "Descubra o modelo ideal para você", href: "#como-escolher" },
      { label: "Comparativo", description: "Compare especificações lado a lado", href: "#modelos" },
      { label: "Guia de uso", description: "Entenda qual categoria atende sua necessidade", href: "#como-escolher" },
    ],
  },
  {
    label: "Suporte",
    href: "#suporte",
    hasDropdown: true,
    dropdownItems: [
      { label: "Central de ajuda", description: "Dúvidas frequentes e tutoriais", href: "#suporte" },
      { label: "Assistência técnica", description: "Encontre uma assistência autorizada", href: "#suporte" },
      { label: "Garantia", description: "Informações sobre garantia e cobertura", href: "#suporte" },
    ],
  },
];

const Header = ({ onContactClick }: HeaderProps) => {
  const isOnline = useBusinessHours();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  // Close on click outside
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
          {/* Top gradient light strip */}
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
                  {/* Orange blur background on hover */}
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
                  {/* Underline */}
                  <span
                    className={`absolute bottom-0 left-1/2 h-[1.5px] -translate-x-1/2 rounded-full transition-all duration-300 ease-out ${
                      activeDropdown === item.label ? "w-1/2 opacity-80" : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-80"
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
              transition={{ duration: 0.25, ease: "easeOut" }}
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

              <div className="p-5">
                <div
                  className={`grid gap-3 ${
                    activeItem.dropdownItems.length > 3
                      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                      : `grid-cols-1 md:grid-cols-${activeItem.dropdownItems.length}`
                  }`}
                >
                  {activeItem.dropdownItems.map((dropItem) => (
                    <a
                      key={dropItem.label}
                      href={dropItem.href}
                      className="group/item flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/[0.06]"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {dropItem.image && (
                        <div className="relative h-28 overflow-hidden">
                          <img
                            src={dropItem.image}
                            alt={dropItem.label}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                          />
                          <div
                            className="absolute inset-0"
                            style={{
                              background: "linear-gradient(to top, hsl(0 0% 14% / 0.8), transparent 60%)",
                            }}
                          />
                        </div>
                      )}
                      <div className={`p-3 ${dropItem.image ? "" : "py-4"}`}>
                        <span className="text-[13px] font-semibold text-white/90 group-hover/item:text-white transition-colors duration-300">
                          {dropItem.label}
                        </span>
                        <p className="text-[10px] text-white/40 mt-1 leading-relaxed group-hover/item:text-white/55 transition-colors duration-300">
                          {dropItem.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
