import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import msLogo from "@/assets/ms-eletric-logo.png";


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
  { label: "Início", href: "#inicio" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Modelos", href: "#modelos", hasDropdown: true },
  { label: "Onde estamos", href: "#onde-estamos" },
  { label: "Contato", href: "#contato" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modelsOpen, setModelsOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
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
              ? "bg-card/80 backdrop-blur-xl border border-border/50 shadow-lg"
              : "bg-primary-foreground/5 backdrop-blur-md border border-primary-foreground/10"
          }`}
        >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#inicio" className="flex items-center group">
          <img src={msLogo} alt="MS Eletric" className="h-14 md:h-16 w-auto" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDesktopDropdown(true)}
                onMouseLeave={() => setDesktopDropdown(false)}
              >
                <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md ${scrolled ? "text-foreground hover:text-primary" : "text-primary-foreground/90 hover:text-primary-foreground"}`}>
                  {item.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${desktopDropdown ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {desktopDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-60 bg-card rounded-2xl border border-border shadow-xl p-2"
                    >
                      {modelCategories.map((cat) => (
                        <a
                          key={cat}
                          href="#modelos"
                          className="block px-4 py-2.5 text-sm text-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
                        >
                          {cat}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
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
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${scrolled ? "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground" : "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"}`}
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <Button className="rounded-xl" asChild>
            <a href="#modelos">Conhecer modelos</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
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
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setModelsOpen(!modelsOpen)}
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:text-primary rounded-lg"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${modelsOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {modelsOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden pl-4"
                        >
                          {modelCategories.map((cat) => (
                            <a
                              key={cat}
                              href="#modelos"
                              className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary"
                              onClick={() => setMobileOpen(false)}
                            >
                              {cat}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
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
                  <a href="#modelos" onClick={() => setMobileOpen(false)}>Conhecer modelos</a>
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
