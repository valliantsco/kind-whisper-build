import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import msLogo from "@/assets/ms-eletric-logo.png";
import msLogoDark from "@/assets/ms-eletric-logo-dark.png";


const modelCategories = [
  "Motos & Scooters Elétricas",
  "Bike Elétrica",
  "Triciclos",
  "Autopropelidos",
  "Motocross",
  "Quadriciclos",
  "Infantis",
  "Acessórios",
];

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Modelos", href: "#modelos" },
  { label: "Onde estamos", href: "#onde-estamos" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <header
          className={`transition-all duration-500 rounded-2xl ${
            scrolled
              ? "bg-white/90 backdrop-blur-xl border border-border/50 shadow-lg"
              : "bg-primary-foreground/5 backdrop-blur-md border border-primary-foreground/10"
          }`}
        >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#inicio" className="flex items-center group">
          <img src={scrolled ? msLogoDark : msLogo} alt="MS Eletric" className="h-[2.8rem] md:h-[3.2rem] w-auto transition-all duration-300" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-md relative group ${scrolled ? "text-foreground hover:text-primary" : "text-primary-foreground/90 hover:text-primary-foreground"}`}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-1/2 transition-all duration-300 rounded-full" />
              </a>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button className="rounded-xl" asChild>
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
            >
              Entrar em contato
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-card border-b border-border"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              )}
              <div className="pt-3">
                <Button className="w-full rounded-xl" asChild>
                  <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>Entrar em contato</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
        </header>
      </div>
    </div>
  );
};

export default Header;
