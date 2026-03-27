import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, X, Menu, MapPin, Phone, Clock, ExternalLink, Compass, Play } from "lucide-react";
import logoWhite from "@/assets/ms-eletric-logo-white.png";

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

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring" as const, damping: 30, stiffness: 300 } },
  exit: { x: "100%", transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 + i * 0.05, duration: 0.35, ease: "easeOut" as const },
  }),
};

const MobileMenu = ({ items, isOnline, onContactClick, onQuizOpen }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  const closeMenu = () => {
    setOpen(false);
    setExpandedItem(null);
  };

  return (
    <>
      {/* Hamburger button — visible only on mobile */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden relative flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer"
        style={{
          background: "hsl(0 0% 100% / 0.06)",
          border: "1px solid hsl(0 0% 100% / 0.08)",
        }}
        aria-label="Abrir menu"
      >
        <Menu className="w-5 h-5 text-white/80" />
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <>
              {/* Overlay */}
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[100]"
                style={{ background: "hsl(0 0% 0% / 0.6)", backdropFilter: "blur(4px)" }}
                onClick={closeMenu}
              />

            {/* Drawer */}
            <motion.div
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 z-[101] w-[85vw] max-w-[380px] flex flex-col overflow-hidden"
              style={{
                background: "hsl(0 0% 10% / 0.97)",
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
                borderLeft: "1px solid hsl(0 0% 100% / 0.08)",
                boxShadow: "-12px 0 48px rgba(0,0,0,0.5)",
              }}
            >
              {/* Top accent line */}
              <div
                className="h-[2px] shrink-0"
                style={{
                  background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.8), hsl(11 90% 65% / 0.8), transparent)",
                }}
              />

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 shrink-0">
                <img src={logoWhite} alt="MS Eletric" className="h-8 w-auto" />
                <button
                  onClick={closeMenu}
                  className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer"
                  style={{
                    background: "hsl(0 0% 100% / 0.06)",
                    border: "1px solid hsl(0 0% 100% / 0.08)",
                  }}
                  aria-label="Fechar menu"
                >
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>

              {/* Divider */}
              <div className="mx-5 h-px shrink-0" style={{ background: "hsl(0 0% 100% / 0.06)" }} />

              {/* Nav items — scrollable */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
                {items.map((item, i) => (
                  <motion.div
                    key={item.label}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {item.hasDropdown ? (
                      /* Accordion item */
                      <div>
                        <button
                          onClick={() => toggleExpand(item.label)}
                          className="w-full flex items-center justify-between py-3.5 px-3 rounded-xl cursor-pointer transition-colors duration-200"
                          style={{
                            background: expandedItem === item.label ? "hsl(0 0% 100% / 0.04)" : "transparent",
                          }}
                        >
                          <span
                            className="text-[14px] font-semibold tracking-wide transition-colors duration-200"
                            style={{
                              color: expandedItem === item.label ? "hsl(11 81% 57%)" : "hsl(0 0% 100% / 0.8)",
                            }}
                          >
                            {item.label}
                          </span>
                          <ChevronDown
                            className="w-4 h-4 transition-transform duration-300"
                            style={{
                              color: expandedItem === item.label ? "hsl(11 81% 57%)" : "hsl(0 0% 100% / 0.3)",
                              transform: expandedItem === item.label ? "rotate(180deg)" : "rotate(0)",
                            }}
                          />
                        </button>

                        <AnimatePresence>
                          {expandedItem === item.label && item.dropdownItems && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pb-2 space-y-1">
                                {/* Cards or list items based on type */}
                                {item.dropdownItems[0]?.image ? (
                                  /* Image-based cards (Modelos) */
                                  <>
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                      {item.dropdownItems.map((sub, j) => (
                                        <motion.a
                                          key={sub.label}
                                          href={sub.href}
                                          onClick={closeMenu}
                                          initial={{ opacity: 0, scale: 0.92 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: j * 0.04, duration: 0.3 }}
                                          className="group/card relative rounded-xl overflow-hidden"
                                          style={{ aspectRatio: "3/4" }}
                                        >
                                          {sub.video ? (
                                            <video
                                              src={sub.video}
                                              autoPlay
                                              muted
                                              loop
                                              playsInline
                                              preload="metadata"
                                              className="absolute inset-0 w-full h-full object-cover"
                                            />
                                          ) : (
                                            <img
                                              src={sub.image}
                                              alt={sub.label}
                                              className="absolute inset-0 w-full h-full object-cover"
                                            />
                                          )}
                                          <div
                                            className="absolute inset-0"
                                            style={{
                                              background: "linear-gradient(to top, hsl(0 0% 0% / 0.85) 0%, hsl(0 0% 0% / 0.3) 50%, hsl(0 0% 0% / 0.2) 100%)",
                                            }}
                                          />
                                          {/* Badge */}
                                          {sub.badge && (
                                            <span
                                              className="absolute top-1.5 right-1.5 z-10 px-1.5 py-0.5 rounded-full text-[7px] font-bold uppercase tracking-[0.08em] text-white"
                                              style={{
                                                background: "hsl(11 81% 57% / 0.75)",
                                                backdropFilter: "blur(8px)",
                                              }}
                                            >
                                              {sub.badge}
                                            </span>
                                          )}
                                          {/* Video indicator */}
                                          {sub.video && (
                                            <div
                                              className="absolute top-1.5 left-1.5 z-10 w-5 h-5 rounded-full flex items-center justify-center"
                                              style={{ background: "hsl(0 0% 0% / 0.45)" }}
                                            >
                                              <Play className="w-2.5 h-2.5 text-white fill-white ml-0.5" />
                                            </div>
                                          )}
                                          <div className="absolute bottom-0 left-0 right-0 p-2">
                                            <p className="text-white font-bold text-[10px] uppercase tracking-[0.08em] mb-0.5 drop-shadow-lg">
                                              {sub.label}
                                            </p>
                                            <p className="text-white/50 text-[8px] tracking-wide line-clamp-2">
                                              {sub.description}
                                            </p>
                                          </div>
                                        </motion.a>
                                      ))}
                                    </div>
                                    {/* Quiz CTA */}
                                    {item.hasCta && (
                                      <motion.button
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.3 }}
                                        onClick={() => { closeMenu(); onQuizOpen(); }}
                                        className="w-full mt-2 flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer"
                                        style={{
                                          background: "linear-gradient(160deg, hsl(0 0% 12%), hsl(0 0% 7%))",
                                          border: "1px solid hsl(11 81% 57% / 0.2)",
                                        }}
                                      >
                                        <div
                                          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                                          style={{
                                            background: "linear-gradient(135deg, hsl(11 81% 57% / 0.2), hsl(11 81% 57% / 0.08))",
                                            border: "1px solid hsl(11 81% 57% / 0.25)",
                                          }}
                                        >
                                          <Compass className="w-4 h-4" style={{ color: "hsl(11 81% 57%)" }} />
                                        </div>
                                        <div className="text-left flex-1">
                                          <p className="text-white font-bold text-[11px] uppercase tracking-[0.1em]">
                                            Não sabe qual escolher?
                                          </p>
                                          <p className="text-white/40 text-[9px] tracking-wide">
                                            Descubra em 1 min com o quiz
                                          </p>
                                        </div>
                                        <div
                                          className="flex items-center gap-1 px-2.5 py-1 rounded-full shrink-0"
                                          style={{
                                            background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                                          }}
                                        >
                                          <span className="text-white text-[8px] font-bold uppercase tracking-[0.08em]">Quiz</span>
                                          <ArrowRight className="w-2.5 h-2.5 text-white" />
                                        </div>
                                      </motion.button>
                                    )}
                                  </>
                                ) : (
                                  /* Icon-based list (Visite-nos) */
                                  <div className="space-y-1 pt-1">
                                    {item.dropdownItems.map((sub, j) => {
                                      const Icon = sub.icon;
                                      return (
                                        <motion.a
                                          key={sub.label}
                                          href={sub.href}
                                          onClick={closeMenu}
                                          initial={{ opacity: 0, x: 12 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: j * 0.06, duration: 0.3 }}
                                          className="flex items-center gap-3 px-3 py-3 rounded-xl transition-colors duration-200"
                                          style={{ background: "hsl(0 0% 100% / 0.03)" }}
                                        >
                                          {Icon && (
                                            <div
                                              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                              style={{
                                                background: "hsl(11 81% 57% / 0.1)",
                                                border: "1px solid hsl(11 81% 57% / 0.18)",
                                              }}
                                            >
                                              <Icon className="w-4 h-4" style={{ color: "hsl(11 81% 57%)" }} />
                                            </div>
                                          )}
                                          <div className="min-w-0 flex-1">
                                            <p className="text-white/90 text-[12px] font-semibold tracking-wide">{sub.label}</p>
                                            <p className="text-white/35 text-[10px] mt-0.5 leading-relaxed line-clamp-2">{sub.description}</p>
                                          </div>
                                          <ArrowRight className="w-3.5 h-3.5 text-white/20 shrink-0" />
                                        </motion.a>
                                      );
                                    })}

                                    {/* Quick info cards for Visite-nos */}
                                    {item.label === "Visite-nos" && (
                                      <div className="mt-2 space-y-2">
                                        <div className="h-px" style={{ background: "hsl(0 0% 100% / 0.06)" }} />

                                        {/* Address quick card */}
                                        <div className="flex items-start gap-3 px-3 py-2.5">
                                          <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "hsl(11 81% 57% / 0.6)" }} />
                                          <div>
                                            <p className="text-white/80 text-[11px] font-semibold">Av. João Pinheiro, 3747</p>
                                            <p className="text-white/35 text-[9px]">Uberlândia — MG</p>
                                          </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="flex items-center gap-3 px-3 py-2.5">
                                          <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(11 81% 57% / 0.6)" }} />
                                          <a href="tel:+553432196628" className="text-white/70 text-[11px] font-semibold hover:text-white transition-colors">
                                            (34) 3219-6628
                                          </a>
                                        </div>

                                        {/* Hours */}
                                        <div className="flex items-center gap-3 px-3 py-2.5">
                                          <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(11 81% 57% / 0.6)" }} />
                                          <div className="text-white/50 text-[10px] space-y-0.5">
                                            <p>Seg – Sex: <span className="text-white/70 font-medium">08h – 18h</span></p>
                                            <p>Sábado: <span className="text-white/70 font-medium">08h – 12h</span></p>
                                          </div>
                                        </div>

                                        {/* Google Maps CTA */}
                                        <button
                                          onClick={() => {
                                            closeMenu();
                                            window.open("https://maps.app.goo.gl/7iwuPGQuN4rAhqRf8", "_blank");
                                          }}
                                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] text-white cursor-pointer transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                                          style={{
                                            background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                                            boxShadow: "0 4px 16px hsl(11 81% 57% / 0.25)",
                                          }}
                                        >
                                          <ExternalLink className="w-3.5 h-3.5" />
                                          Abrir no Google Maps
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      /* Simple link */
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className="block py-3.5 px-3 rounded-xl text-[14px] font-semibold tracking-wide transition-colors duration-200"
                        style={{ color: "hsl(0 0% 100% / 0.8)" }}
                      >
                        {item.label}
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="shrink-0 px-5 pb-5 pt-3">
                <div className="h-px mb-4" style={{ background: "hsl(0 0% 100% / 0.06)" }} />
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.35 }}
                  onClick={() => { closeMenu(); onContactClick?.(); }}
                  className="w-full relative flex items-center justify-center gap-3 rounded-xl px-5 py-3.5 text-white cursor-pointer overflow-hidden active:scale-[0.97] transition-transform duration-150"
                  style={{
                    background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                    boxShadow: "0 6px 24px hsl(11 81% 57% / 0.35)",
                  }}
                >
                  {/* Status dot */}
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span
                      className="absolute inset-0 rounded-full animate-ping opacity-60"
                      style={{ backgroundColor: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)" }}
                    />
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)",
                        boxShadow: isOnline ? "0 0 8px hsl(142 76% 50%)" : "0 0 8px hsl(0 75% 50%)",
                      }}
                    />
                  </span>
                  <span className="w-px h-5 rounded-sm" style={{ background: "hsl(0 0% 100% / 0.3)" }} />
                  <span className="flex flex-col items-start leading-none gap-[3px]">
                    <span className="text-[12px] font-semibold tracking-wide">
                      {isOnline ? "Atendimento Online" : "Atendimento Offline"}
                    </span>
                    <span className="text-[9px] font-medium opacity-70 tracking-wider uppercase">
                      {isOnline ? "Fale conosco agora" : "Deixe sua mensagem"}
                    </span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
