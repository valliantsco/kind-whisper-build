import logoWhite from "@/assets/ms-eletric-logo-white.png";
import { useBusinessHours } from "@/hooks/useBusinessHours";
import { motion } from "framer-motion";

interface HeaderProps {
  onContactClick?: () => void;
}

const Header = ({ onContactClick }: HeaderProps) => {
  const _isOnline = useBusinessHours();
  const isOnline = true; // TODO: remover — teste forçado como online

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
      <div
        className="mx-auto max-w-7xl relative flex items-center justify-between px-5 py-3 rounded-[0.9rem] overflow-hidden"
        style={{
          background: "hsl(0 0% 14% / 0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid hsl(0 0% 100% / 0.08)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px hsl(11 81% 57% / 0.08)",
        }}
      >
        {/* Top gradient light strip */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.8), hsl(11 90% 65% / 0.8), transparent)",
          }}
        />
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
          <motion.button
            onClick={onContactClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="group relative flex items-center gap-3 rounded-full px-6 py-2.5 text-white cursor-pointer overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
              boxShadow: "0 4px 20px hsla(11, 81%, 57%, 0.35), inset 0 1px 0 hsla(0, 0%, 100%, 0.15)",
            }}
          >
            {/* Pulsing status dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-60"
                style={{
                  backgroundColor: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)",
                }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{
                  backgroundColor: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)",
                  boxShadow: isOnline
                    ? "0 0 8px hsl(142 76% 50%)"
                    : "0 0 8px hsl(0 75% 50%)",
                }}
              />
            </span>

            {/* Dynamic copy */}
            <span className="flex flex-col items-start leading-none gap-[3px]">
              <span className="text-[12.5px] font-semibold tracking-wide">
                {isOnline ? "Atendimento online" : "Atendimento offline"}
              </span>
              <span className="text-[10px] font-medium opacity-70 tracking-wider uppercase">
                {isOnline ? "Fale conosco" : "Deixe sua mensagem"}
              </span>
            </span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;
