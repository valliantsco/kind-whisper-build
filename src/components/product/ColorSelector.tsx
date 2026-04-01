import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { ProductColor } from "@/data/products";

interface Props {
  colors: ProductColor[];
  onColorChange?: (color: ProductColor) => void;
}

export default function ColorSelector({ colors, onColorChange }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = colors[selectedIndex];

  // Single color: show informational only
  if (colors.length === 1) {
    return (
      <div className="flex items-center gap-3 mb-6">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{ color: "hsl(var(--primary) / 0.6)" }}
        >
          Cor disponível
        </span>
        <span className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded-full shrink-0"
            style={{
              background: colors[0].hex,
              border: isLightColor(colors[0].hex)
                ? "1px solid hsl(0 0% 100% / 0.2)"
                : "1px solid hsl(0 0% 100% / 0.08)",
            }}
          />
          <span className="text-[12px] text-primary-foreground/50 font-medium">
            {colors[0].name}
          </span>
        </span>
      </div>
    );
  }

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    onColorChange?.(colors[index]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.37 }}
      className="mb-7"
    >
      {/* Label + selected color name */}
      <div className="flex items-center gap-3 mb-3">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{ color: "hsl(var(--primary))" }}
        >
          Escolha a cor
        </span>
        <span className="w-4 h-[1px]" style={{ background: "hsl(var(--primary) / 0.25)" }} />
        <AnimatePresence mode="wait">
          <motion.span
            key={selected.name}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.2 }}
            className="text-[12px] text-primary-foreground/60 font-medium"
          >
            {selected.name}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Swatches */}
      <div className="flex flex-wrap gap-2.5">
        {colors.map((color, i) => {
          const isActive = i === selectedIndex;
          const isLight = isLightColor(color.hex);

          return (
            <button
              key={color.name}
              onClick={() => handleSelect(i)}
              aria-label={`Cor ${color.name}`}
              className="relative group/swatch cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              {/* Active ring */}
              <div
                className="absolute -inset-[5px] rounded-full transition-all duration-300 pointer-events-none"
                style={{
                  border: isActive
                    ? "1.5px solid hsl(var(--primary))"
                    : "1.5px solid transparent",
                  boxShadow: isActive
                    ? "0 0 12px -2px hsl(var(--primary) / 0.35)"
                    : "none",
                }}
              />

              {/* Swatch */}
              <div
                className="w-8 h-8 md:w-9 md:h-9 rounded-full transition-shadow duration-300"
                style={{
                  background: color.hex,
                  border: isLight
                    ? "1.5px solid hsl(0 0% 100% / 0.25)"
                    : "1.5px solid hsl(0 0% 100% / 0.1)",
                  boxShadow: isActive
                    ? `inset 0 0 0 2px hsl(0 0% 0% / 0.15), 0 2px 8px -2px hsl(0 0% 0% / 0.4)`
                    : "inset 0 1px 2px hsl(0 0% 0% / 0.1)",
                }}
              />

              {/* Hover glow */}
              {!isActive && (
                <div
                  className="absolute -inset-1 rounded-full opacity-0 group-hover/swatch:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}
