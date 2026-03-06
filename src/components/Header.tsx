import { useState, useRef, useEffect } from "react";
import logoWhite from "@/assets/ms-eletric-logo-white.png";
import { useBusinessHours } from "@/hooks/useBusinessHours";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ArrowRight, Compass, BarChart3, BookOpen, HelpCircle, Wrench, ShieldCheck } from "lucide-react";

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
    label: "Modelos",
    href: "#modelos",
    hasDropdown: true,
    hasCta: true,
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
      { label: "Quiz interativo", description: "Descubra o modelo ideal para você", href: "#como-escolher", icon: Compass },
      { label: "Comparativo", description: "Compare especificações lado a lado", href: "#modelos", icon: BarChart3 },
      { label: "Guia de uso", description: "Entenda qual categoria atende sua necessidade", href: "#como-escolher", icon: BookOpen },
    ],
  },
  {
    label: "Suporte",
    href: "#suporte",
    hasDropdown: true,
    dropdownItems: [
      { label: "Central de ajuda", description: "Dúvidas frequentes e tutoriais", href: "#suporte", icon: HelpCircle },
      { label: "Assistência técnica", description: "Encontre uma assistência autorizada", href: "#suporte", icon: Wrench },
      { label: "Garantia", description: "Informações sobre garantia e cobertura", href: "#suporte", icon: ShieldCheck },
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
                  /* Image-based grid (Modelos) */
                  <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    {activeItem.dropdownItems.map((dropItem, i) => (
                      <motion.a
                        key={dropItem.label}
                        href={dropItem.href}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3, ease: "easeOut" }}
                        className="group/item relative flex flex-col rounded-xl overflow-hidden transition-all duration-300"
                        style={{ aspectRatio: "4/3", maxHeight: "120px" }}
                        onClick={() => setActiveDropdown(null)}
                      >
                        <img
                          src={dropItem.image}
                          alt={dropItem.label}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        {/* Orange overlay on hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                          style={{ background: "linear-gradient(135deg, hsl(11 81% 57% / 0.12) 0%, transparent 60%)" }}
                        />
                        {/* Orange border on hover */}
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                          style={{ boxShadow: "inset 0 0 0 1.5px hsl(11 81% 57% / 0.5)" }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white font-bold text-xs uppercase tracking-[0.08em] mb-0.5 drop-shadow-lg">
                            {dropItem.label}
                          </p>
                          <p className="text-white/50 text-[10px] tracking-wide group-hover/item:text-white/70 transition-colors duration-300">
                            {dropItem.description}
                          </p>
                        </div>
                      </motion.a>
                    ))}

                    {/* CTA card "Ver todos" */}
                    {activeItem.hasCta && (
                      <motion.a
                        href="#modelos"
                        onClick={() => setActiveDropdown(null)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: activeItem.dropdownItems.length * 0.05, duration: 0.3 }}
                        className="group/cta relative rounded-xl overflow-hidden cursor-pointer flex flex-col items-center justify-center text-center"
                        style={{
                          aspectRatio: "3/4",
                          background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                        }}
                      >
                        <div
                          className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500"
                          style={{ boxShadow: "inset 0 0 40px hsl(0 0% 100% / 0.1)" }}
                        />
                        <div className="flex flex-col items-center gap-2">
                          <motion.div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ background: "hsl(0 0% 100% / 0.2)" }}
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <ArrowRight className="w-5 h-5 text-white" />
                          </motion.div>
                          <p className="text-white font-bold text-xs uppercase tracking-[0.1em]">Ver todos</p>
                          <p className="text-white/60 text-[10px] tracking-wide">os modelos</p>
                        </div>
                      </motion.a>
                    )}
                  </div>
                ) : (
                  /* Icon-based list (Como escolher, Suporte) */
                  <div className={`grid gap-2 grid-cols-1 md:grid-cols-${activeItem.dropdownItems.length}`}>
                    {activeItem.dropdownItems.map((dropItem, i) => {
                      const Icon = dropItem.icon;
                      return (
                        <motion.a
                          key={dropItem.label}
                          href={dropItem.href}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                          className="group/item flex items-start gap-3 rounded-xl p-4 transition-all duration-300 hover:bg-white/[0.06]"
                          style={{ border: "1px solid transparent" }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "hsl(11 81% 57% / 0.25)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                          }}
                          onClick={() => setActiveDropdown(null)}
                        >
                          {Icon && (
                            <div
                              className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover/item:scale-110"
                              style={{
                                background: "hsl(11 81% 57% / 0.1)",
                                border: "1px solid hsl(11 81% 57% / 0.15)",
                              }}
                            >
                              <Icon className="w-4 h-4" style={{ color: "hsl(11 81% 57%)" }} />
                            </div>
                          )}
                          <div>
                            <span className="text-[13px] font-semibold text-white/90 group-hover/item:text-white transition-colors duration-300">
                              {dropItem.label}
                            </span>
                            <p className="text-[11px] text-white/40 mt-0.5 leading-relaxed group-hover/item:text-white/55 transition-colors duration-300">
                              {dropItem.description}
                            </p>
                          </div>
                        </motion.a>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
