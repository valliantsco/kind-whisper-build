import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import { BUSINESS_HOURS_INFO } from "@/utils/form-helpers";

interface StatusChipProps {
  isOnline: boolean;
  offlineMessage: string;
}

const TODAY = new Date().getDay();

const getDayMatch = (dayLabel: string): number => {
  if (dayLabel === "Seg - Sex") return TODAY >= 1 && TODAY <= 5 ? TODAY : -1;
  if (dayLabel === "Sábado") return 6;
  if (dayLabel === "Domingo") return 0;
  return -1;
};

const brandColor = "hsl(11 81% 57%)";
const brandColorLight = "hsl(11 90% 65%)";
const textColor = "hsl(30 90% 75%)";

const StatusChip = ({ isOnline, offlineMessage }: StatusChipProps) => {
  const [showHoursPopup, setShowHoursPopup] = useState(false);

  return (
    <div className="px-[21px] py-4 pt-px">
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowHoursPopup((v) => !v)}
          className="group flex items-center gap-2.5 px-4 py-2 rounded-xl text-[11px] font-semibold tracking-wide border w-full cursor-pointer transition-all duration-200 hover:brightness-125"
          style={{
            background: `linear-gradient(135deg, ${brandColor} / 0.15, ${brandColor} / 0.05)`,
            borderColor: `${brandColor} / 0.3`,
            color: textColor,
          }}
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{ background: isOnline ? "hsl(142 76% 50%)" : brandColor }}
            />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ background: isOnline ? "hsl(142 76% 50%)" : brandColor }}
            />
          </span>
          {isOnline ? "Atendimento Online" : offlineMessage}
          <span className="ml-auto flex items-center gap-1 text-[9px] opacity-50 group-hover:opacity-80 transition-opacity duration-200">
            Ver horários{" "}
            <span
              className="inline-block transition-transform duration-200"
              style={{ transform: showHoursPopup ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              ›
            </span>
          </span>
        </button>

        {/* Hours popup */}
        <AnimatePresence>
          {showHoursPopup && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowHoursPopup(false)} />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl p-4 space-y-1"
                style={{
                  background: `linear-gradient(135deg, ${brandColor} / 0.15, ${brandColor} / 0.05)`,
                  backdropFilter: "blur(24px)",
                  border: `1px solid ${brandColor} / 0.25`,
                  boxShadow: `0 12px 40px hsl(0 0% 0% / 0.3), 0 0 20px ${brandColor} / 0.05`,
                }}
              >
                <div
                  className="flex items-center gap-2 mb-2.5 pb-2"
                  style={{ borderBottom: `1px solid ${brandColor} / 0.15` }}
                >
                  <Clock className="w-2.5 h-2.5" style={{ color: `${brandColor} / 0.8` }} />
                  <span className="text-[11px] font-semibold tracking-wide" style={{ color: textColor }}>
                    Horário de atendimento
                  </span>
                </div>
                {BUSINESS_HOURS_INFO.map((item) => {
                  const isToday = TODAY === getDayMatch(item.day);
                  return (
                    <div
                      key={item.day}
                      className="grid items-center py-2 px-2.5 rounded-lg transition-colors duration-150"
                      style={{
                        gridTemplateColumns: "1fr auto",
                        background: isToday ? `${brandColor} / 0.08` : "transparent",
                        borderLeft: isToday ? `2px solid ${brandColor} / 0.6` : "2px solid transparent",
                      }}
                    >
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: isToday ? "hsl(0 0% 100% / 0.85)" : "hsl(0 0% 100% / 0.50)" }}
                      >
                        {item.day}
                        {isToday && (
                          <span
                            className="ml-1.5 text-[8px] uppercase tracking-wider font-bold"
                            style={{ color: `${brandColor} / 0.8` }}
                          >
                            Hoje
                          </span>
                        )}
                      </span>
                      <span
                        className="text-[11px] font-semibold text-right tabular-nums"
                        style={{
                          color:
                            item.hours === "Fechado"
                              ? "hsl(0 60% 55% / 0.7)"
                              : isToday
                                ? brandColor
                                : `${brandColor} / 0.75`,
                        }}
                      >
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StatusChip;
