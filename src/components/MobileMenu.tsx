import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ModelsCarousel from "./mobile-menu/ModelsCarousel";
import VisitUsSection from "./mobile-menu/VisitUsSection";
import type { MobileMenuProps } from "./mobile-menu/types";

const useMobileMenu = ({ items, isOnline, onContactClick, onQuizOpen }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setExpandedItem(null);
  }, []);

  const toggleMenu = useCallback(() => {
    setOpen((v) => {
      if (v) setExpandedItem(null);
      return !v;
    });
  }, []);

  const toggleExpand = useCallback((label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label));
  }, []);

  /* Close on Escape key */
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, closeMenu]);

  /* Focus trap: focus menu when it opens */
  useEffect(() => {
    if (open && menuRef.current) {
      menuRef.current.focus();
    }
  }, [open]);

  /* ─── Trigger Button ─── */
  const triggerButton = (
    <button
      onClick={toggleMenu}
      className="lg:hidden relative grid h-10 w-10 place-items-center cursor-pointer active:scale-95 transition-transform duration-150"
      style={{ background: "transparent", border: "none" }}
      aria-label={open ? "Fechar menu" : "Abrir menu"}
      aria-expanded={open}
      aria-controls="mobile-nav-menu"
    >
      <div className="flex w-5 flex-col items-stretch justify-between" style={{ height: "14px" }}>
        <motion.span
          className="h-[2px] rounded-full"
          style={{ background: open ? "hsl(var(--primary))" : "#a1a1a1" }}
          animate={{ y: open ? 6 : 0, rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.span
          className="h-[2px] rounded-full"
          style={{ background: open ? "hsl(var(--primary))" : "#a1a1a1" }}
          animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.span
          className="h-[2px] rounded-full"
          style={{ background: open ? "hsl(var(--primary))" : "#a1a1a1" }}
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
          <div
            className="fixed inset-0 z-[48]"
            onClick={closeMenu}
            role="presentation"
            aria-hidden="true"
          />

          <motion.div
            ref={menuRef}
            id="mobile-nav-menu"
            role="navigation"
            aria-label="Menu principal"
            tabIndex={-1}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
            className="lg:hidden overflow-hidden relative z-[49] outline-none"
          >
            {/* Top separator */}
            <div
              className="h-px mx-4"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25), hsl(var(--mm-border-subtle)), transparent)",
              }}
            />

            <div className="relative">
              {/* Bottom dissolve fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-8 z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, hsl(var(--mm-surface-deep)), transparent)",
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
                          aria-controls={`mobile-section-${item.label}`}
                          className="w-full flex items-center justify-between py-3 px-4 rounded-xl cursor-pointer transition-colors duration-200"
                          style={{ background: "transparent" }}
                        >
                          <span
                            className="text-[13px] font-semibold tracking-wide transition-colors duration-200"
                            style={{
                              color:
                                expandedItem === item.label
                                  ? "hsl(var(--mm-text-primary))"
                                  : "hsl(var(--mm-text-secondary))",
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
                                    ? "hsl(var(--primary))"
                                    : "hsl(0 0% 100% / 0.2)",
                              }}
                            />
                          </motion.div>
                        </button>

                        {/* Expanded content */}
                        <AnimatePresence>
                          {expandedItem === item.label && item.dropdownItems && (
                            <motion.div
                              id={`mobile-section-${item.label}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.35,
                                ease: [0.25, 0.8, 0.25, 1],
                              }}
                              className="overflow-hidden"
                            >
                              {item.sectionType === "models" ||
                              (!item.sectionType && item.dropdownItems[0]?.image) ? (
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
                        style={{ color: "hsl(var(--mm-text-secondary))" }}
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
                      "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2), hsl(var(--mm-border-subtle)), transparent)",
                  }}
                />
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.35,
                    ease: [0.25, 0.8, 0.25, 1],
                  }}
                  onClick={() => {
                    closeMenu();
                    onContactClick?.();
                  }}
                  className="w-full relative flex items-center justify-center gap-3 rounded-2xl px-5 py-3.5 text-primary-foreground cursor-pointer overflow-hidden active:scale-[0.98] transition-transform duration-150"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                    boxShadow:
                      "0 6px 20px hsl(var(--primary) / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.12)",
                  }}
                >
                  {/* Shine */}
                  <span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(0 0% 100% / 0.1) 0%, transparent 50%)",
                    }}
                  />
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span
                      className="absolute inset-0 rounded-full animate-ping opacity-60"
                      style={{
                        backgroundColor: isOnline
                          ? "hsl(142 76% 50%)"
                          : "hsl(0 75% 50%)",
                      }}
                    />
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: isOnline
                          ? "hsl(142 76% 50%)"
                          : "hsl(0 75% 50%)",
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
