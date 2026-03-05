import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Star, ChevronRight, User, Phone, MapPin, Clock } from "lucide-react";
import type { QuizResult } from "./types";
import { getModelImage } from "./modelImages";
import { useBusinessStatus } from "@/hooks/useBusinessHours";
import { filterCities, BUSINESS_HOURS_INFO } from "@/utils/form-helpers";

interface QuizResultViewProps {
  result: QuizResult;
  whatsappNumber: string;
  onReset: () => void;
}

const TODAY = new Date().getDay();
const getDayMatch = (dayLabel: string): number => {
  if (dayLabel === "Seg - Sex") return TODAY >= 1 && TODAY <= 5 ? TODAY : -1;
  if (dayLabel === "Sábado") return 6;
  if (dayLabel === "Domingo") return 0;
  return -1;
};

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const QuizResultView = ({ result, whatsappNumber, onReset }: QuizResultViewProps) => {
  const models = result.models?.length ? result.models : [];
  const hasModels = models.length > 0;
  const { isOnline, offlineMessage } = useBusinessStatus();

  // Lead capture state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [cityValidated, setCityValidated] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [focusedCityIndex, setFocusedCityIndex] = useState(-1);
  const [showHoursPopup, setShowHoursPopup] = useState(false);

  const cityInputRef = useRef<HTMLInputElement>(null);

  const isFormValid = name.trim().length >= 2 && phone.replace(/\D/g, "").length >= 10 && city.trim().length >= 2;

  const buildWhatsAppUrl = () => {
    const modelNames = models.map(m => m.name).join(", ");
    const msg = `Olá! Meu nome é ${name.trim()}, sou de ${city.trim()}. Fiz o quiz no site e recebi a recomendação da categoria "${result.category}" com os modelos: ${modelNames || result.suggestions.join(", ")}. Gostaria de saber mais sobre disponibilidade e condições.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  const selectCity = (value: string) => {
    setCity(value);
    setCityValidated(true);
    setCityDropdownOpen(false);
    setCitySuggestions([]);
  };

  const inputStyle = "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Category */}
      <div className="rounded-xl p-4 text-center bg-primary/5">
        <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Categoria recomendada</p>
        <p className="font-display font-bold text-xl text-primary">{result.category}</p>
        <p className="text-xs text-muted-foreground mt-1">{result.justification}</p>
      </div>

      {hasModels ? (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Modelos recomendados
          </p>

          {models.map((model, i) => {
            const image = getModelImage(model.name);
            return (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl border overflow-hidden ${
                  i === 0 ? "border-primary/30 bg-primary/5" : "border-border bg-card"
                }`}
              >
                {i === 0 && image && (
                  <div className="w-full h-40 bg-white flex items-center justify-center overflow-hidden">
                    <img src={image} alt={model.name} className="h-full w-auto object-contain" />
                  </div>
                )}
                <div className={`${i === 0 ? "p-4" : "p-3"}`}>
                  <div className="flex items-start gap-2">
                    {i > 0 && image && (
                      <div className="w-12 h-12 rounded-lg bg-white border border-border overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <img src={image} alt={model.name} className="h-full w-auto object-contain" />
                      </div>
                    )}
                    {!image && i === 0 && <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 fill-primary" />}
                    {!image && i > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        {i === 0 && image && <Star className="w-3.5 h-3.5 text-primary flex-shrink-0 fill-primary" />}
                        <p className={`font-bold ${i === 0 ? "text-base text-primary" : "text-sm text-foreground"}`}>{model.name}</p>
                      </div>
                      <p className={`${i === 0 ? "text-sm text-foreground" : "text-xs text-muted-foreground"} mt-0.5`}>{model.headline}</p>
                      {i === 0 && model.specs && (
                        <div className="mt-2 bg-muted/50 rounded-lg px-3 py-2">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-semibold">Especificações</p>
                          <p className="text-xs text-foreground">{model.specs}</p>
                        </div>
                      )}
                      {i === 0 && model.whyFits && (
                        <div className="mt-2">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-semibold">Por que combina com você</p>
                          <p className="text-xs text-foreground leading-relaxed">{model.whyFits}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : result.suggestions.length > 0 ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Modelos sugeridos</p>
          <div className="space-y-2">
            {result.suggestions.map((s) => (
              <div key={s} className="bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium">{s}</div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Lead Capture Section */}
      <div className="space-y-4 pt-2 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2">
          Fale com um especialista
        </p>

        {/* Status Chip */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowHoursPopup((v) => !v)}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[11px] font-semibold tracking-wide w-full cursor-pointer transition-all duration-200 hover:brightness-110 text-white"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.85))",
              boxShadow: "0 4px 16px hsl(var(--primary) / 0.3)",
            }}
          >
            <span className="relative flex items-center justify-center h-3 w-3 shrink-0">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-65"
                style={{ background: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)" }}
              />
              <span
                className="relative inline-flex rounded-full h-3 w-3 border-[1.5px] border-white/30"
                style={{
                  background: isOnline ? "hsl(142 76% 50%)" : "hsl(0 75% 50%)",
                  boxShadow: isOnline ? "0 0 6px hsl(142 76% 50% / 0.4)" : "0 0 6px hsl(0 75% 50% / 0.4)",
                }}
              />
            </span>
            {isOnline ? "Atendimento Online" : offlineMessage}
            <span className="ml-auto flex items-center gap-1 text-[9px] opacity-70 group-hover:opacity-100 transition-opacity">
              Ver horários <span className="inline-block transition-transform" style={{ transform: showHoursPopup ? "rotate(90deg)" : "rotate(0deg)" }}>›</span>
            </span>
          </button>

          <AnimatePresence>
            {showHoursPopup && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowHoursPopup(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl p-4 space-y-1 text-white"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.85))",
                    boxShadow: "0 12px 40px hsl(0 0% 0% / 0.2)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2.5 pb-2" style={{ borderBottom: "1px solid hsl(0 0% 100% / 0.2)" }}>
                    <Clock className="w-2.5 h-2.5 text-white/80" />
                    <span className="text-[11px] font-semibold tracking-wide">Horário de atendimento</span>
                  </div>
                  {BUSINESS_HOURS_INFO.map((item) => {
                    const isToday = TODAY === getDayMatch(item.day);
                    return (
                      <div
                        key={item.day}
                        className="grid items-center py-2 px-2.5 rounded-lg"
                        style={{
                          gridTemplateColumns: "1fr auto",
                          background: isToday ? "hsl(0 0% 100% / 0.15)" : "transparent",
                          borderLeft: isToday ? "2px solid hsl(0 0% 100% / 0.7)" : "2px solid transparent",
                        }}
                      >
                        <span className="text-[11px] font-medium" style={{ color: isToday ? "white" : "hsl(0 0% 100% / 0.65)" }}>
                          {item.day}
                          {isToday && <span className="ml-1.5 text-[8px] uppercase tracking-wider font-bold">Hoje</span>}
                        </span>
                        <span
                          className="text-[11px] font-semibold text-right tabular-nums"
                          style={{ color: item.hours === "Fechado" ? "hsl(0 0% 100% / 0.4)" : isToday ? "white" : "hsl(0 0% 100% / 0.75)" }}
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

        {/* Name */}
        <div>
          <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-1.5">
            <User className="w-3 h-3" />
            Como podemos te chamar? <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="João Silva"
            maxLength={100}
            className={inputStyle}
          />
        </div>

        {/* WhatsApp */}
        <div>
          <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-1.5">
            <Phone className="w-3 h-3" />
            WhatsApp para contato <span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="(00) 00000-0000"
            maxLength={15}
            className={inputStyle}
          />
        </div>

        {/* City */}
        <div className="relative">
          <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-1.5">
            <MapPin className="w-3 h-3" />
            De onde você é? <span className="text-primary">*</span>
          </label>
          <input
            ref={cityInputRef}
            type="text"
            value={city}
            onChange={(e) => {
              const val = e.target.value;
              setCity(val);
              setCityValidated(false);
              if (val.trim().length >= 2) {
                const results = filterCities(val.trim());
                setCitySuggestions(results);
                setCityDropdownOpen(results.length > 0);
                setFocusedCityIndex(-1);
              } else {
                setCitySuggestions([]);
                setCityDropdownOpen(false);
              }
            }}
            onFocus={() => {
              if (city.trim().length >= 2 && citySuggestions.length > 0) setCityDropdownOpen(true);
            }}
            onBlur={() => setTimeout(() => setCityDropdownOpen(false), 200)}
            onKeyDown={(e) => {
              if (!cityDropdownOpen) return;
              if (e.key === "ArrowDown") { e.preventDefault(); setFocusedCityIndex((p) => Math.min(p + 1, citySuggestions.length - 1)); }
              else if (e.key === "ArrowUp") { e.preventDefault(); setFocusedCityIndex((p) => Math.max(p - 1, 0)); }
              else if (e.key === "Enter" && focusedCityIndex >= 0) { e.preventDefault(); selectCity(citySuggestions[focusedCityIndex]); }
              else if (e.key === "Escape") setCityDropdownOpen(false);
            }}
            placeholder="São Paulo, SP"
            maxLength={100}
            className={inputStyle}
            autoComplete="off"
          />
          <AnimatePresence>
            {cityDropdownOpen && citySuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute left-0 right-0 z-50 mt-1 rounded-lg overflow-hidden border border-border bg-card shadow-lg max-h-40 overflow-y-auto"
              >
                {citySuggestions.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); selectCity(s); }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      focusedCityIndex === i ? "text-foreground bg-muted" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 pt-2">
        <motion.a
          href={isFormValid ? buildWhatsAppUrl() : undefined}
          target={isFormValid ? "_blank" : undefined}
          rel="noopener noreferrer"
          onClick={(e) => { if (!isFormValid) e.preventDefault(); }}
          className={`flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white text-[11px] sm:text-sm font-bold uppercase tracking-[0.14em] bg-primary transition-opacity ${
            isFormValid ? "cursor-pointer" : "opacity-40 cursor-not-allowed"
          }`}
          whileHover={isFormValid ? { scale: 1.03 } : {}}
          whileTap={isFormValid ? { scale: 0.97 } : {}}
        >
          <MessageCircle className="w-5 h-5" />
          Continuar no WhatsApp
        </motion.a>
        {!isFormValid && (
          <p className="text-[10px] text-muted-foreground text-center">
            Preencha os campos acima para continuar
          </p>
        )}
        <button
          onClick={onReset}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors py-2 uppercase tracking-wider font-medium"
        >
          Refazer quiz
        </button>
      </div>
    </motion.div>
  );
};

export default QuizResultView;
