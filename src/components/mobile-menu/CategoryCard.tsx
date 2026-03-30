import React from "react";
import type { MobileMenuDropdownItem } from "./types";

interface CategoryCardProps {
  sub: MobileMenuDropdownItem;
  onClose: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ sub, onClose }) => (
  <a
    href={sub.href}
    onClick={onClose}
    className="relative flex-shrink-0 rounded-2xl overflow-hidden snap-center active:scale-[0.98]"
    style={{
      width: "clamp(176px, 56vw, 220px)",
      height: "284px",
      border: "1px solid hsl(var(--mm-border-subtle))",
      transform: "translateZ(0)",
    }}
  >
    {/* Media layer */}
    <div className="absolute inset-0" style={{ zIndex: 1 }}>
      {sub.video ? (
        <video
          src={sub.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      ) : sub.image ? (
        <img
          src={sub.image}
          alt={sub.label}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      ) : null}
    </div>

    {/* Gradient overlay */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 2,
        background:
          "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.1) 100%)",
      }}
    />

    {/* Badge */}
    {sub.badge && (
      <span
        className="absolute top-2 right-2 px-2 py-[3px] rounded-full text-[8px] font-bold uppercase tracking-[0.1em] text-primary-foreground"
        style={{
          zIndex: 30,
          background: "linear-gradient(135deg, hsl(var(--primary) / 0.9), hsl(var(--primary-glow) / 0.9))",
          backdropFilter: "blur(6px)",
          border: "1px solid hsl(var(--primary) / 0.3)",
        }}
      >
        {sub.badge}
      </span>
    )}

    {/* Text content */}
    <div
      className="absolute bottom-0 left-0 right-0 p-3"
      style={{ zIndex: 20 }}
    >
      <p
        className="text-primary-foreground font-bold text-[13px] uppercase tracking-[0.06em] leading-tight"
        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
      >
        {sub.label}
      </p>
      <p
        className="text-primary-foreground/75 text-[10.5px] tracking-wide leading-snug mt-1 line-clamp-2"
        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
      >
        {sub.description}
      </p>
    </div>
  </a>
);

export default React.memo(CategoryCard);
