import React, { useState } from "react";
import { MapPin, Clock, ExternalLink, Zap } from "lucide-react";
import msShieldLogo from "@/assets/ms-shield-logo.png";

interface VisitUsSectionProps {
  onClose: () => void;
  onContactClick?: () => void;
}

/** Lazy-loaded Google Maps embed. only renders iframe after first interaction */
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

const VisitUsSection: React.FC<VisitUsSectionProps> = ({ onClose, onContactClick }) => (
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
              Uberlândia. MG, 38408-168
            </p>
          </div>
        </div>

        <div className="h-px" style={{ background: "hsl(var(--mm-border-subtle))" }} />

        {/* WhatsApp */}
        <button
          onClick={() => {
            onClose();
            onContactClick?.();
          }}
          className="flex items-start gap-3 w-full text-left cursor-pointer bg-transparent border-none p-0"
        >
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.05))",
              border: "1px solid hsl(var(--mm-border-accent))",
            }}
          >
            <svg className="w-3 h-3 text-primary" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div>
            <p
              className="text-[9px] uppercase tracking-[0.1em] mb-0.5"
              style={{ color: "hsl(var(--mm-text-tertiary))" }}
            >
              WhatsApp
            </p>
            <p
              className="text-[13px] font-semibold"
              style={{ color: "hsl(var(--mm-text-primary))" }}
            >
              (34) 99284-9900
            </p>
          </div>
        </button>

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
                  Seg, Sex
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
