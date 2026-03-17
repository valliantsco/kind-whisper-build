import React from "react";

/**
 * StaticMapCanvas — Google Maps embed with dark styling
 * MS Eletric: Av. João Pinheiro, 3747, Uberlândia
 */

const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1867.5!2d-48.2772!3d-18.9186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94a44f7a5b9b3b3b%3A0x0!2zMTjCsDU1JzA3LjAiUyA0OMKwMTYnMzguMCJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr";

const StaticMapCanvas: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Google Maps iframe */}
      <iframe
        src={MAPS_EMBED_URL}
        className="absolute inset-0 w-full h-full border-0"
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="MS Eletric - Uberlândia"
        style={{ filter: "invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.6) contrast(1.3)" }}
      />

      {/* Orange tint overlay for brand alignment */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,77,34,0.06) 0%, transparent 50%, rgba(255,77,34,0.04) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Dark vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 60px 20px rgba(10,10,14,0.7)",
        }}
      />
    </div>
  );
};

export default StaticMapCanvas;
