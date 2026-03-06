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
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-white w-full cursor-pointer transition-all duration-200 hover:brightness-110"
          style={{
            background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
            boxShadow: "0 4px 20px hsl(11 81% 57% / 0.35), inset 0 1px 0 hsl(0 0% 100% / 0.15)",
          }}
        >
          {/* Pulsing status dot */}
          <span className="relative flex h-1.5 w-1.5 shrink-0 items-center justify-center -ml-1.5">
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-60"
              style={{ backgroundColor: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)" }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)",
                boxShadow: isOnline ? "0 0 8px hsl(142 76% 50%)" : "0 0 8px hsl(0 75% 50%)",
              }}
            />
          </span>

          {/* Divider */}
          <span
            className="w-[2px] h-5 rounded-sm shrink-0"
            style={{ background: "hsl(0 0% 100% / 0.35)" }}
          />

          {/* Copy */}
          <span className="flex flex-col items-start leading-none gap-[2px]">
            <span className="text-[11px] font-semibold tracking-wide">
              {isOnline ? "Atendimento online" : offlineMessage}
            </span>
            <span className="text-[8px] font-medium opacity-70 tracking-wider uppercase">
              {isOnline ? "Estamos disponíveis agora" : "Deixe sua mensagem"}
            </span>
          </span>

          {/* Ver horários */}
          <span className="ml-auto flex items-center gap-1 text-[9px] opacity-50 group-hover:opacity-100 transition-opacity duration-200">
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
                className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, hsl(11 81% 57%), hsl(11 85% 52%))",
                  boxShadow: "0 12px 40px hsl(0 0% 0% / 0.3), 0 0 20px hsl(11 81% 57% / 0.15)",
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-2 px-4 pt-3.5 pb-2.5">
                  <Clock className="w-3 h-3 text-white/70" />
                  <span className="text-[11px] font-bold tracking-wide text-white/90 uppercase">
                    Horário de atendimento
                  </span>
                </div>

                {/* Divider */}
                <div className="mx-4 h-[1px]" style={{ background: "hsl(0 0% 100% / 0.15)" }} />

                {/* Days */}
                <div className="px-3 py-2.5 space-y-0.5">
                  {BUSINESS_HOURS_INFO.map((item) => {
                    const isToday = TODAY === getDayMatch(item.day);
                    const isClosed = item.hours === "Fechado";
                    return (
                      <div
                        key={item.day}
                        className="flex items-center justify-between py-2 px-2.5 rounded-lg transition-colors duration-150"
                        style={{
                          background: isToday ? "hsl(0 0% 100% / 0.15)" : "transparent",
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="text-[11px] font-medium"
                            style={{ color: isToday ? "hsl(0 0% 100%)" : "hsl(0 0% 100% / 0.65)" }}
                          >
                            {item.day}
                          </span>
                          {isToday && (
                            <span
                              className="text-[7px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded"
                              style={{ background: "hsl(0 0% 100% / 0.2)", color: "white" }}
                            >
                              Hoje
                            </span>
                          )}
                        </span>
                        <span
                          className="text-[11px] font-semibold tabular-nums"
                          style={{
                            color: isClosed
                              ? "hsl(0 0% 100% / 0.35)"
                              : isToday
                                ? "hsl(0 0% 100%)"
                                : "hsl(0 0% 100% / 0.7)",
                            fontStyle: isClosed ? "italic" : "normal",
                          }}
                        >
                          {item.hours}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StatusChip;
