import logoWhite from "@/assets/ms-eletric-logo-white.png";

interface HeaderProps {
  onContactClick?: () => void;
}

const Header = ({ onContactClick }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
      <div
        className="mx-auto max-w-7xl relative flex items-center justify-between px-5 py-3 rounded-lg"
        style={{
          background: "hsla(0, 0%, 11%, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid hsla(0, 0%, 100%, 0.08)",
        }}
      >
        <a href="#">
          <img src={logoWhite} alt="MS Eletric" className="w-auto" style={{ height: "2.53rem" }} />
        </a>

        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {[
            { label: "Início", href: "#inicio" },
            { label: "Modelos", href: "#modelos" },
            { label: "Como escolher", href: "#como-escolher" },
            { label: "Suporte", href: "#suporte" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onContactClick}
            className="rounded-md px-5 py-2 text-sm font-semibold tracking-wide text-white transition-all hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
              boxShadow: "0 0 16px hsla(11, 81%, 57%, 0.3)",
            }}
          >
            Fale Conosco
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
