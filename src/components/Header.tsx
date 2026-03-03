import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import msLogo from "@/assets/ms-eletric-logo.png";
import msLogoDark from "@/assets/ms-eletric-logo-dark.png";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Modelos", href: "#modelos" },
  { label: "Onde estamos", href: "#onde-estamos" },
];

/* Animated hamburger ↔ X icon */
const MenuPath = (props: React.ComponentProps<typeof motion.path>) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.5"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    animate={isOpen ? "open" : "closed"}
    initial={false}
    className="overflow-visible"
  >
    <MenuPath
      variants={{
        closed: { d: "M 3 6 L 21 6" },
        open: { d: "M 5 5 L 19 19" },
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
    />
    <MenuPath
      variants={{
        closed: { d: "M 3 12 L 21 12", opacity: 1 },
        open: { d: "M 3 12 L 21 12", opacity: 0 },
      }}
      transition={{ duration: 0.2 }}
    />
    <MenuPath
      variants={{
        closed: { d: "M 3 18 L 21 18" },
        open: { d: "M 5 19 L 19 5" },
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
    />
  </motion.svg>
);

/* WhatsApp SVG icon */
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* Stagger animation variants */
const drawerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] as const },
  },
  exit: {
    opacity: 0,
    x: -20,
    filter: "blur(4px)",
    transition: { duration: 0.25 },
  },
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Swipe down to close drawer
  const touchStartY = useRef<number | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (deltaY > 60) {
      setMobileOpen(false);
    }
    touchStartY.current = null;
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 pt-4 pb-2">
        <header
          className={`transition-all duration-[800ms] ease-in-out rounded-[0.9rem] overflow-hidden ${
            scrolled
              ? "bg-white/90 backdrop-blur-2xl border border-border/50 shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
              : "bg-primary-foreground/5 backdrop-blur-xl border border-primary-foreground/10"
          }`}
        >
          {/* Light strip at bottom */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-[800ms] ease-in-out ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.6), hsl(11 90% 65% / 0.6), transparent)",
            }}
          />

          <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20 relative">
            {/* Logo with glow on hover */}
            <motion.a
              href="#inicio"
              className="flex items-center group relative h-[2.8rem] md:h-[3.2rem]"
              whileHover={{
                filter: "drop-shadow(0 0 12px hsl(11 81% 57% / 0.5))",
              }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={msLogo}
                alt="MS Eletric"
                className={`h-[2.8rem] md:h-[3.2rem] w-auto absolute top-0 left-0 transition-opacity duration-[800ms] ease-in-out ${
                  scrolled ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                src={msLogoDark}
                alt="MS Eletric"
                className={`h-[2.8rem] md:h-[3.2rem] w-auto transition-opacity duration-[800ms] ease-in-out ${
                  scrolled ? "opacity-100" : "opacity-0"
                }`}
              />
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`group relative px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-[800ms] ease-in-out rounded-md ${
                    scrolled
                      ? "text-foreground hover:text-primary"
                      : "text-primary-foreground/90 hover:text-primary-foreground"
                  }`}
                >
                  {item.label}
                  {/* Neon gradient underline */}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] group-hover:w-3/4 transition-all duration-300 ease-out rounded-full"
                    style={{
                      background: "linear-gradient(90deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                      boxShadow: "0 0 8px hsl(11 81% 57% / 0.5)",
                    }}
                  />
                </a>
              ))}
            </nav>

            {/* Desktop CTA with glow */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-10 px-5 text-xs font-semibold uppercase tracking-wider rounded-lg bg-primary text-primary-foreground"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px hsl(11 81% 57% / 0.5), 0 0 40px hsl(11 81% 57% / 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <WhatsAppIcon />
                Contato
              </motion.a>
            </div>

            {/* Mobile toggle — animated icon */}
            <div className="flex lg:hidden items-center gap-3">
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-primary text-primary-foreground"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 16px hsl(11 81% 57% / 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Menu"
              >
                <span className="text-xs font-semibold uppercase tracking-wider">Menu</span>
                <MenuIcon isOpen={mobileOpen} />
              </motion.button>
            </div>
          </div>

          {/* Mobile Fullscreen Drawer */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "calc(100dvh - 5rem)" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] as const }}
                className={`lg:hidden overflow-hidden origin-top ${
                  scrolled
                    ? "bg-white/95 backdrop-blur-2xl"
                    : "bg-foreground/90 backdrop-blur-2xl"
                }`}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <motion.div
                  className="flex flex-col justify-between h-full px-6 py-8"
                  variants={drawerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Nav items */}
                  <div className="space-y-1">
                    {navItems.map((item, i) => (
                      <motion.div key={item.label} variants={itemVariants}>
                        <a
                          href={item.href}
                          className={`block px-4 py-4 text-lg font-semibold uppercase tracking-[0.12em] rounded-xl transition-all duration-200 ${
                            scrolled
                              ? "text-foreground hover:text-primary hover:bg-primary/5"
                              : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/5"
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                                boxShadow: "0 0 6px hsl(11 81% 57% / 0.6)",
                              }}
                            />
                            {item.label}
                          </span>
                        </a>
                        {/* Gradient separator */}
                        {i < navItems.length - 1 && (
                          <div
                            className="mx-4 h-[1px]"
                            style={{
                              background: scrolled
                                ? "linear-gradient(90deg, transparent, hsl(0 0% 88% / 0.5), transparent)"
                                : "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.1), transparent)",
                            }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Floating CTA with glow */}
                  <motion.div variants={itemVariants} className="pt-6">
                    <motion.a
                      href="https://wa.me/5500000000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider"
                      onClick={() => setMobileOpen(false)}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 25px hsl(11 81% 57% / 0.6), 0 0 50px hsl(11 81% 57% / 0.2)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      animate={{
                        boxShadow: [
                          "0 0 15px hsl(11 81% 57% / 0.3)",
                          "0 0 25px hsl(11 81% 57% / 0.5)",
                          "0 0 15px hsl(11 81% 57% / 0.3)",
                        ],
                      }}
                      transition={{
                        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      }}
                    >
                      <WhatsAppIcon />
                      Entrar em contato
                    </motion.a>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>
    </div>
  );
};

export default Header;
