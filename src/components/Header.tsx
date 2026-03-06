import logoWhite from "@/assets/ms-eletric-logo-white.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
      <div
        className="mx-auto max-w-7xl flex items-center justify-between px-5 py-3 rounded-lg"
        style={{
          background: "hsla(0, 0%, 11%, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid hsla(0, 0%, 100%, 0.08)",
        }}
      >
        <a href="#">
          <img src={logoWhite} alt="MS Eletric" className="w-auto" style={{ height: "2.3rem" }} />
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {/* Itens serão adicionados aqui */}
        </nav>

        <div className="flex items-center gap-3">
          {/* Botões serão adicionados aqui */}
        </div>
      </div>
    </header>
  );
};

export default Header;
