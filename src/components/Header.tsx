import logoWhite from "@/assets/ms-eletric-logo-white.png";
import { useBusinessHours } from "@/hooks/useBusinessHours";

interface HeaderProps {
  onContactClick?: () => void;
}

const Header = ({ onContactClick }: HeaderProps) => {
  const isOnline = useBusinessHours();

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
            className="group relative flex items-center gap-2.5 rounded-md px-5 py-2.5 text-sm font-semibold tracking-wide text-white transition-all hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
              boxShadow: "0 0 16px hsla(11, 81%, 57%, 0.3)",
            }}
          >
            {/* Pulsing status dot */}
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-75"
                style={{
                  backgroundColor: isOnline
                    ? "hsl(142 76% 50%)"
                    : "hsl(0 75% 50%)",
                }}
              />
              <span
                className="relative inline-flex h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: isOnline
                    ? "hsl(142 76% 50%)"
                    : "hsl(0 75% 50%)",
                  boxShadow: isOnline
                    ? "0 0 6px hsl(142 76% 50%)"
                    : "0 0 6px hsl(0 75% 50%)",
                }}
              />
            </span>

            {/* Dynamic copy */}
            <span className="flex flex-col items-start leading-none gap-0.5">
              <span className="text-[11px] font-medium opacity-80">
                {isOnline ? "Atendimento online" : "Atendimento offline"}
              </span>
              <span className="text-[13px] font-semibold">
                {isOnline ? "Fale conosco" : "Deixe sua mensagem"}
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
