import logoWhite from "@/assets/ms-eletric-logo-white.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-foreground">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-5 py-4">
        <a href="#">
          <img src={logoWhite} alt="MS Eletric" className="h-8 w-auto" />
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
