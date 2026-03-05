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

const StatusChip = ({ isOnline, offlineMessage }: StatusChipProps) => {
  const [showHoursPopup, setShowHoursPopup] = useState(false);

  return (
    <div className="px-[21px] py-4 pt-px">
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowHoursPopup((v) => !v)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[11px] font-semibold tracking-wide w-full cursor-pointer transition-all duration-200 hover:brightness-110"
          style={{
            background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
            color: "white",
            boxShadow: "0 4px 16px hsl(11 81% 57% / 0.3)",
          }}
        >
          <span className="relative flex h-3.5 w-3.5 shrink-0">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)" }}
            />
            <span
              className="relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-white/40"
              style={{
                background: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)",
                boxShadow: isOnline ? "0 0 8px hsl(142 76% 50% / 0.6)" : "0 0 8px hsl(0 75% 50% / 0.6)",
              }}
            />
          </span>
          {isOnline ? "Atendimento Online" : offlineMessage}
          <span className="ml-auto flex items-center gap-1 text-[9px] opacity-70 group-hover:opacity-100 transition-opacity duration-200">
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
                  background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                  boxShadow: "0 12px 40px hsl(0 0% 0% / 0.3), 0 0 20px hsl(11 81% 57% / 0.15)",
                }}
              >
                <div
                  className="flex items-center gap-2 mb-2.5 pb-2"
                  style={{ borderBottom: "1px solid hsl(0 0% 100% / 0.2)" }}
                >
                  <Clock className="w-2.5 h-2.5 text-white/80" />
                  <span className="text-[11px] font-semibold tracking-wide text-white">
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
                        background: isToday ? "hsl(0 0% 100% / 0.15)" : "transparent",
                        borderLeft: isToday ? "2px solid hsl(0 0% 100% / 0.7)" : "2px solid transparent",
                      }}
                    >
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: isToday ? "hsl(0 0% 100%)" : "hsl(0 0% 100% / 0.65)" }}
                      >
                        {item.day}
                        {isToday && (
                          <span className="ml-1.5 text-[8px] uppercase tracking-wider font-bold text-white">
                            Hoje
                          </span>
                        )}
                      </span>
                      <span
                        className="text-[11px] font-semibold text-right tabular-nums"
                        style={{
                          color:
                            item.hours === "Fechado"
                              ? "hsl(0 0% 100% / 0.4)"
                              : isToday
                                ? "hsl(0 0% 100%)"
                                : "hsl(0 0% 100% / 0.75)",
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
