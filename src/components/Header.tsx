import logoWhite from "@/assets/ms-eletric-logo-white.png";
import { useBusinessHours } from "@/hooks/useBusinessHours";
import { motion } from "framer-motion";

interface HeaderProps {
  onContactClick?: () => void;
}

const Header = ({ onContactClick }: HeaderProps) => {
  const isOnline = useBusinessHours();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
      <div
        className="mx-auto max-w-7xl relative flex items-center justify-between px-5 py-3 rounded-[0.9rem] overflow-hidden"
        style={{
          background: "hsl(0 0% 14% / 0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid hsl(0 0% 100% / 0.08)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.25)",
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

        <nav className="hidden md:flex items-center gap-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[
            { label: "Início", href: "#inicio" },
            { label: "Modelos", href: "#modelos" },
            { label: "Como escolher", href: "#como-escolher" },
            { label: "Suporte", href: "#suporte" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-white/50 transition-all duration-300 ease-out hover:text-white/95 py-1.5 px-2 rounded-md group"
            >
              {/* Orange blur background on hover */}
              <span
                className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, hsl(11 81% 57% / 0.12), transparent 70%)",
                }}
              />
              <span className="relative">{item.label}</span>
              {/* Underline */}
              <span
                className="absolute bottom-0 left-1/2 h-[1.5px] w-0 -translate-x-1/2 rounded-full transition-all duration-300 ease-out group-hover:w-1/2 opacity-0 group-hover:opacity-80"
                style={{ background: "hsl(11 81% 57%)" }}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={onContactClick}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="group relative flex items-center gap-2.5 rounded-lg px-5 py-2 text-white cursor-pointer overflow-hidden transition-shadow duration-500 ease-out hover:shadow-[inset_0_0_20px_hsla(0,0%,100%,0.12)]"
            style={{
              background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
              boxShadow: "inset 0 1px 0 hsla(0, 0%, 100%, 0.15)",
            }}
          >
            {/* Pulsing status dot */}
            <span className="relative flex h-1.5 w-1.5 shrink-0 items-center justify-center -ml-1.5">
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-60"
                style={{
                  backgroundColor: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)",
                }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)",
                  boxShadow: isOnline
                    ? "0 0 8px hsl(142 76% 50%)"
                    : "0 0 8px hsl(0 75% 50%)",
                }}
              />
            </span>

            {/* Divider — cutout effect */}
            <span
              className="w-[2px] h-5 rounded-sm shrink-0"
              style={{
                background: "hsl(0 0% 100% / 0.35)",
              }}
            />

            {/* Dynamic copy */}
            <span className="flex flex-col items-start leading-none gap-[2px]">
              <span className="text-[11px] font-semibold tracking-wide">
                {isOnline ? "Atendimento online" : "Atendimento offline"}
              </span>
              <span className="text-[8px] font-medium opacity-70 tracking-wider uppercase">
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
