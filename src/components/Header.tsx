import { useState } from "react";
import { motion } from "framer-motion";
import msLogo from "@/assets/ms-eletric-logo-white.png";
import msLogoDark from "@/assets/ms-eletric-logo-dark-new.png";
import { useBusinessHours } from "@/hooks/useBusinessHours";
import ContactWidget from "@/components/PopUpContato01";

const StatusDot = ({ online }: { online: boolean }) => (
  <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center h-5 w-5 z-10">
    <span
      className="animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-65"
      style={{ background: online ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)" }}
    />
    <span
      className="relative inline-flex rounded-full h-3 w-3 border-[1.5px] border-white/30"
      style={{
        background: online ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)",
        boxShadow: online ? "0 0 6px hsl(142 76% 50% / 0.4)" : "0 0 6px hsl(0 75% 50% / 0.4)",
      }}
    />
  </span>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface HeaderProps {
  contactOpen: boolean;
  setContactOpen: (open: boolean) => void;
}

const Header = ({ contactOpen, setContactOpen }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const isOnline = useBusinessHours();

  useState(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 pt-4 pb-2">
        <header
          className={`transition-all duration-700 ease-in-out rounded-[0.9rem] overflow-hidden relative ${
            scrolled
              ? "bg-white/90 backdrop-blur-2xl border border-border/50 shadow-[0_8px_32px_-4px_rgba(66,66,66,0.35)]"
              : "bg-primary-foreground/5 backdrop-blur-xl border border-primary-foreground/10 shadow-[0_8px_32px_-4px_rgba(66,66,66,0.25)]"
          }`}
        >
          {/* Bottom light strip */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-700 z-10 ${scrolled ? "opacity-100" : "opacity-0"}`}
            style={{ background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.6), hsl(11 90% 65% / 0.6), transparent)" }}
          />

          <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#inicio"
              className="flex items-center group relative h-[2.8rem] md:h-[3.2rem]"
              whileHover={{ filter: "drop-shadow(0 0 12px hsl(11 81% 57% / 0.5))" }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={msLogo}
                alt="MS Eletric"
                className={`h-[2.8rem] md:h-[3.2rem] w-auto absolute top-0 left-0 transition-opacity duration-700 ${scrolled ? "opacity-0" : "opacity-100"}`}
              />
              <img
                src={msLogoDark}
                alt="MS Eletric"
                className={`h-[2.8rem] md:h-[3.2rem] w-auto transition-opacity duration-700 ${scrolled ? "opacity-100" : "opacity-0"}`}
              />
            </motion.a>

            {/* CTA */}
            <motion.button
              onClick={() => setContactOpen(true)}
              className="relative inline-flex items-center justify-center gap-2.5 h-10 px-6 text-[11px] font-bold uppercase tracking-[0.14em] rounded-xl text-white overflow-visible cursor-pointer"
              style={{
                background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                boxShadow: "0 4px 20px hsl(11 81% 57% / 0.25)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px hsl(11 81% 57% / 0.5), 0 0 50px hsl(11 81% 57% / 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <StatusDot online={isOnline} />
              <WhatsAppIcon />
              Fale Conosco
            </motion.button>
          </div>
        </header>
      </div>

      <ContactWidget isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};

export default Header;
