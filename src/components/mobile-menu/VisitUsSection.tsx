import React, { useState } from "react";
import { MapPin, Phone, Clock, ExternalLink, Zap } from "lucide-react";
import msShieldLogo from "@/assets/ms-shield-logo.png";

interface VisitUsSectionProps {
  onClose: () => void;
}

/** Lazy-loaded Google Maps embed — only renders iframe after first interaction */
const LazyMap: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      style={{ height: "150px" }}
      onClick={() => {
        if (!loaded) {
          setLoaded(true);
        } else {
          window.open("https://maps.app.goo.gl/7iwuPGQuN4rAhqRf8", "_blank");
        }
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {loaded ? (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2250!2d-48.26122457146234!3d-18.892441917718067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
            className="absolute border-0 pointer-events-none"
            style={{
              top: "-60px",
              left: "-20px",
              width: "calc(100% + 40px)",
              height: "calc(100% + 120px)",
              filter:
                "invert(1) hue-rotate(180deg) brightness(0.95) contrast(1.1) saturate(0.3)",
            }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="MS Eletric - Uberlândia"
          />
        ) : (
          /* Static placeholder until user taps */
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "hsl(var(--mm-surface-deep))" }}
          >
            <span
              className="text-[10px] font-medium uppercase tracking-widest"
              style={{ color: "hsl(var(--mm-text-tertiary))" }}
            >
              Toque para carregar o mapa
            </span>
          </div>
        )}
      </div>

      {/* Custom pin (shown always as decoration) */}
      <div
        className="absolute z-[5] pointer-events-none"
        style={{
          top: "calc(44% + 20px)",
          left: "calc(48% + 30px)",
          transform: "translate(-50%, -100%)",
          display: loaded ? undefined : "none",
        }}
      >
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
          <div
            className="w-8 h-8 rounded-full animate-ping"
            style={{
              background: "hsl(var(--primary) / 0.2)",
              animationDuration: "2.5s",
            }}
          />
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
          <div
            className="w-5 h-5 rounded-full"
            style={{ background: "hsl(var(--primary) / 0.35)" }}
          />
        </div>
        <div
          className="relative flex flex-col items-center"
          style={{
            filter:
              "drop-shadow(0 6px 16px hsl(var(--primary) / 0.6)) drop-shadow(0 2px 4px hsl(0 0% 0% / 0.5))",
          }}
        >
          <svg
            width="28"
            height="48"
            viewBox="0 0 34 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="pinGradMobile" x1="0" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="hsl(11, 81%, 64%)" />
                <stop offset="50%" stopColor="hsl(11, 81%, 54%)" />
                <stop offset="100%" stopColor="hsl(11, 81%, 38%)" />
              </linearGradient>
              <radialGradient id="pinShineMobile" cx="0.35" cy="0.25" r="0.6">
                <stop offset="0%" stopColor="white" stopOpacity="0.25" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M17 0C9.5 0 0 6 0 15c0 13.5 15 37.8 16.1 39.5a1.1 1.1 0 001.8 0C19 54.8 34 28.5 34 15 34 6 24.5 0 17 0z"
              fill="url(#pinGradMobile)"
            />
            <path
              d="M17 0C9.5 0 0 6 0 15c0 13.5 15 37.8 16.1 39.5a1.1 1.1 0 001.8 0C19 54.8 34 28.5 34 15 34 6 24.5 0 17 0z"
              fill="url(#pinShineMobile)"
            />
          </svg>
          <img
            src={msShieldLogo}
            alt="MS Eletric"
            className="absolute object-contain"
            style={{
              top: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "20px",
              height: "20px",
              filter:
                "brightness(0) invert(1) drop-shadow(0 1px 2px hsl(0 0% 0% / 0.3))",
            }}
          />
        </div>
        <div
          className="w-5 h-[3px] rounded-full mx-auto -mt-0.5"
          style={{
            background: "hsl(0 0% 0% / 0.45)",
            filter: "blur(3px)",
          }}
        />
      </div>

      {/* "Tap to navigate" badge */}
      <div
        className="absolute bottom-2 right-2 z-[6] flex items-center gap-1.5 px-2 py-1 rounded-full pointer-events-none"
        style={{
          background: "hsl(0 0% 0% / 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid hsl(var(--mm-border-subtle))",
        }}
      >
        <Zap className="w-2 h-2 text-primary" />
        <span
          className="text-[7px] font-bold uppercase tracking-[0.12em]"
          style={{ color: "hsl(var(--mm-text-secondary))" }}
        >
          {loaded ? "Toque para navegar" : "Toque para carregar"}
        </span>
      </div>
    </div>
  );
};

const VisitUsSection: React.FC<VisitUsSectionProps> = ({ onClose }) => (
  <div className="pt-1 pb-3">
    {/* Header */}
    <div className="flex items-center gap-2 px-4 mb-1">
      <div
        className="w-0.5 h-3 rounded-full"
        style={{
          background: "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
        }}
      />
      <span
        className="text-[11px] font-bold uppercase tracking-[0.1em]"
        style={{ color: "hsl(var(--primary) / 0.7)" }}
      >
        Venha nos Visitar
      </span>
    </div>
    <p
      className="px-4 mb-3 text-[11px]"
      style={{ color: "hsl(var(--mm-text-secondary))", paddingLeft: "calc(1rem + 10px)" }}
    >
      Transformando a mobilidade urbana desde 2015
    </p>

    {/* Main card */}
    <div
      className="mx-4 rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(160deg, hsl(var(--mm-surface)), hsl(var(--mm-surface-deep)))`,
        border: "1px solid hsl(var(--mm-border-subtle))",
      }}
    >
      {/* Lazy map */}
      <LazyMap />

      <div className="px-4 py-3 space-y-3">
        {/* Address */}
        <div className="flex items-start gap-3">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.05))",
              border: "1px solid hsl(var(--mm-border-accent))",
            }}
          >
            <MapPin className="w-3 h-3 text-primary" />
          </div>
          <div>
            <p
              className="text-[9px] uppercase tracking-[0.1em] mb-0.5"
              style={{ color: "hsl(var(--mm-text-tertiary))" }}
            >
              Endereço
            </p>
            <p
              className="text-[13px] font-semibold"
              style={{ color: "hsl(var(--mm-text-primary))" }}
            >
              Av. João Pinheiro, 3747
            </p>
            <p
              className="text-[10.5px] mt-0.5"
              style={{ color: "hsl(var(--mm-text-muted))" }}
            >
              Uberlândia — MG, 38408-168
            </p>
          </div>
        </div>

        <div className="h-px" style={{ background: "hsl(var(--mm-border-subtle))" }} />

        {/* Phone */}
        <div className="flex items-start gap-3">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.05))",
              border: "1px solid hsl(var(--mm-border-accent))",
            }}
          >
            <Phone className="w-3 h-3 text-primary" />
          </div>
          <div>
            <p
              className="text-[9px] uppercase tracking-[0.1em] mb-0.5"
              style={{ color: "hsl(var(--mm-text-tertiary))" }}
            >
              Telefone
            </p>
            <a
              href="tel:+553432196628"
              className="text-[13px] font-semibold"
              style={{ color: "hsl(var(--mm-text-primary))" }}
            >
              (34) 3219-6628
            </a>
          </div>
        </div>

        <div className="h-px" style={{ background: "hsl(var(--mm-border-subtle))" }} />

        {/* Hours */}
        <div className="flex items-start gap-3">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.05))",
              border: "1px solid hsl(var(--mm-border-accent))",
            }}
          >
            <Clock className="w-3 h-3 text-primary" />
          </div>
          <div className="flex-1">
            <p
              className="text-[9px] uppercase tracking-[0.1em] mb-1"
              style={{ color: "hsl(var(--mm-text-tertiary))" }}
            >
              Horários
            </p>
            <div className="space-y-0.5">
              <div className="flex justify-between">
                <p className="text-[10.5px]" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
                  Seg – Sex
                </p>
                <p
                  className="text-[10.5px] font-medium"
                  style={{ color: "hsl(0 0% 100% / 0.8)" }}
                >
                  08h – 18h
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10.5px]" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
                  Sábado
                </p>
                <p
                  className="text-[10.5px] font-medium"
                  style={{ color: "hsl(0 0% 100% / 0.8)" }}
                >
                  08h – 12h
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10.5px]" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
                  Domingo
                </p>
                <p className="text-[10.5px] font-medium italic text-neutral-500">
                  Fechado
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps CTA */}
      <button
        onClick={() => {
          onClose();
          window.open("https://maps.app.goo.gl/7iwuPGQuN4rAhqRf8", "_blank");
        }}
        className="w-full flex items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground cursor-pointer active:scale-[0.98] transition-transform rounded-b-2xl"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
          boxShadow: "0 -4px 16px hsl(var(--primary) / 0.15)",
        }}
      >
        <ExternalLink className="w-3 h-3" />
        Ver no Google Maps
      </button>
    </div>
  </div>
);

export default React.memo(VisitUsSection);
