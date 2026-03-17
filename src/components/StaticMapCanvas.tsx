import React from "react";
import { motion } from "framer-motion";
import mapBg from "@/assets/map-uberlandia.png";

/**
 * StaticMapCanvas — Real Google Maps image + animated pulsing pin
 */

const StaticMapCanvas: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Real map background */}
      <img
        src={mapBg}
        alt="Mapa Uberlândia - MS Eletric"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Pin container — positioned at MS Eletric location (~center of image) */}
      <div
        className="absolute"
        style={{ top: "38%", left: "48%", transform: "translate(-50%, -50%)" }}
      >
        {/* Pulsing rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: "50%",
              left: "50%",
              border: "1.5px solid rgba(255, 77, 34, 0.4)",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              width: [10, 60],
              height: [10, 60],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.66,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 40,
            height: 40,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(255,77,34,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Pin SVG */}
        <svg
          width="28"
          height="38"
          viewBox="0 0 28 38"
          fill="none"
          style={{ filter: "drop-shadow(0 2px 8px rgba(255,77,34,0.5))", position: "relative", zIndex: 2 }}
        >
          <path
            d="M14 37C14 37 27 22.5 27 14C27 6.82 21.18 1 14 1C6.82 1 1 6.82 1 14C1 22.5 14 37 14 37Z"
            fill="#FF4D22"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
          />
          <circle cx="14" cy="14" r="5" fill="white" />
        </svg>
      </div>
    </div>
  );
};

export default StaticMapCanvas;
