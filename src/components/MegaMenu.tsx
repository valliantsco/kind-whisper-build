import { motion, AnimatePresence } from "framer-motion";
import categoryScooter from "@/assets/category-scooter.jpg";
import categoryBike from "@/assets/category-bike.jpg";
import categoryTricycle from "@/assets/category-tricycle.jpg";
import categoryAutopropelido from "@/assets/category-autopropelido.jpg";
import categoryMotocross from "@/assets/category-motocross.jpg";

export const categories = [
  { label: "Motos & Scooters", desc: "Cidade / Rotina", image: categoryScooter, href: "#modelos" },
  { label: "Bike Elétrica", desc: "Mobilidade leve", image: categoryBike, href: "#modelos" },
  { label: "Triciclos", desc: "Conforto / Estabilidade", image: categoryTricycle, href: "#modelos" },
  { label: "Autopropelidos", desc: "Praticidade", image: categoryAutopropelido, href: "#modelos" },
  { label: "Motocross", desc: "Lazer / Off-road", image: categoryMotocross, href: "#modelos" },
];

interface MegaMenuProps {
  open: boolean;
  scrolled: boolean;
  onClose: () => void;
}

const MegaMenu = ({ open, scrolled, onClose }: MegaMenuProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
          className="absolute top-full left-0 right-0 z-50 pt-2"
          onMouseLeave={onClose}
        >
          <div
            className="rounded-2xl overflow-hidden border"
            style={{
              background: scrolled
                ? "rgba(255, 255, 255, 0.92)"
                : "hsl(0 0% 14% / 0.94)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderColor: scrolled
                ? "hsl(0 0% 88% / 0.5)"
                : "hsl(0 0% 100% / 0.08)",
              boxShadow: "0 16px 48px -8px rgba(0,0,0,0.3), 0 8px 24px -4px rgba(0,0,0,0.15)",
            }}
          >
            {/* Top light strip */}
            <div
              className="h-[2px] shrink-0"
              style={{
                background: scrolled
                  ? "linear-gradient(90deg, transparent, hsl(0 0% 70% / 0.3), transparent)"
                  : "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.8), hsl(11 90% 65% / 0.8), transparent)",
              }}
            />

            <div className="p-5">
              <div className="grid grid-cols-5 gap-3">
                {categories.map((cat, i) => (
                  <motion.a
                    key={cat.label}
                    href={cat.href}
                    onClick={onClose}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="group relative rounded-xl overflow-hidden cursor-pointer"
                    style={{ aspectRatio: "3/4" }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(135deg, hsl(11 81% 57% / 0.15) 0%, transparent 60%)" }}
                    />
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ boxShadow: "inset 0 0 0 1.5px hsl(11 81% 57% / 0.6), 0 0 20px hsl(11 81% 57% / 0.15)" }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-bold text-xs uppercase tracking-[0.1em] mb-0.5 drop-shadow-lg">
                        {cat.label}
                      </p>
                      <p className="text-white/60 text-[10px] tracking-wide">{cat.desc}</p>
                    </div>
                  </motion.a>
                ))}

              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
