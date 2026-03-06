import { useState, useEffect } from "react";
import logoWhite from "@/assets/ms-eletric-logo-white.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-3">
      <div
        className="mx-auto max-w-7xl rounded-[0.9rem] overflow-hidden transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(255,255,255,0.92)"
            : "hsl(0 0% 14% / 0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: scrolled
            ? "0 4px 24px rgba(0,0,0,0.08)"
            : "0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px hsl(0 0% 100% / 0.06)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <a href="#" className="shrink-0">
            <img
              src={logoWhite}
              alt="MS Eletric"
              className="h-8 w-auto transition-all duration-300"
              style={{
                filter: scrolled ? "brightness(0) saturate(100%)" : "none",
              }}
            />
          </a>

          {/* Espaço para navegação futura */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Itens serão adicionados aqui */}
          </nav>

          {/* Espaço para CTA / mobile menu */}
          <div className="flex items-center gap-3">
            {/* Botões serão adicionados aqui */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
