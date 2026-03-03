import { useState } from "react";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2">
          <div className="font-display font-black text-xl md:text-2xl tracking-tight">
            <span className="text-foreground">MS</span>
            <span className="text-primary"> Eletric</span>
          </div>
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
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md">
                  {item.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {desktopDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-60 bg-card rounded-xl border border-border shadow-lg p-2"
                    >
                      {modelCategories.map((cat) => (
                        <a
                          key={cat}
                          href="#modelos"
                          className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors"
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
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* Desktop CTA + WhatsApp icon */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <Button asChild>
            <a href="#modelos">Conhecer modelos</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-foreground"
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
                <Button className="w-full" asChild>
                  <a href="#modelos" onClick={() => setMobileOpen(false)}>Conhecer modelos</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
