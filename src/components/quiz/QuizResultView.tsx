import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Star, ChevronRight, User, Phone, MapPin, Clock } from "lucide-react";
import type { QuizResult } from "./types";
import { getModelImage } from "./modelImages";
import { useBusinessStatus } from "@/hooks/useBusinessHours";
import { filterCities, formatPhone, formatName, validatePhone, BUSINESS_HOURS_INFO } from "@/utils/form-helpers";
import { detectSpam } from "@/utils/spam-detection";

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

// ── WhatsApp icon ──────────────────────────────────────────────────────
const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const INPUT_STYLE = "w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 transition-all";

const getInputStyle = (hasError: boolean) => ({
  background: "hsl(0 0% 100% / 0.06)",
  border: hasError ? "1px solid hsl(0 84% 60% / 0.5)" : "1px solid hsl(0 0% 100% / 0.1)",
  ...(hasError ? { boxShadow: "0 0 0 2px hsl(0 84% 60% / 0.1)" } : {}),
});

const QuizResultView = ({ result, whatsappNumber, onReset }: QuizResultViewProps) => {
  const models = result.models?.length ? result.models : [];
  const hasModels = models.length > 0;
  const { isOnline, offlineMessage } = useBusinessStatus();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [cityValidated, setCityValidated] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [focusedCityIndex, setFocusedCityIndex] = useState(-1);
  const [showHoursPopup, setShowHoursPopup] = useState(false);

  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [cityError, setCityError] = useState<string | null>(null);

  const cityInputRef = useRef<HTMLInputElement>(null);

  const isFormValid =
    name.trim().length >= 2 &&
    !nameError &&
    phone.replace(/\D/g, "").length >= 10 &&
    !phoneError &&
    city.trim().length >= 2 &&
    !cityError;

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
    setCityError(null);
  };

  const handleNameChange = (val: string) => {
    const formatted = formatName(val);
    setName(formatted);
    const spam = detectSpam("name", formatted);
    setNameError(spam);
  };

  const handlePhoneChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    setPhone(formatPhone(digits));
    if (digits.length === 11) {
      setPhoneError(validatePhone(digits));
    } else {
      setPhoneError(null);
    }
  };

  const handleCityChange = (val: string) => {
    setCity(val);
    setCityValidated(false);
    setCityError(null);
    const spam = detectSpam("city", val);
    if (spam) {
      setCityError(spam);
      setCitySuggestions([]);
      setCityDropdownOpen(false);
      return;
    }
    if (val.trim().length >= 2) {
      const results = filterCities(val.trim());
      setCitySuggestions(results);
      setCityDropdownOpen(results.length > 0);
      setFocusedCityIndex(-1);
    } else {
      setCitySuggestions([]);
      setCityDropdownOpen(false);
    }
  };

  const handlePhoneBlur = () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length > 0 && digits.length < 11) {
      setPhoneError("O número deve ter DDD + 9 dígitos");
    }
  };

  const handleNameBlur = () => {
    if (name.trim().length > 0 && !name.trim().includes(" ")) {
      setNameError("Inclua seu sobrenome também");
    }
  };

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Category */}
      <div
        className="rounded-xl p-4 text-center"
        style={{ background: "hsl(11 81% 57% / 0.1)", border: "1px solid hsl(11 81% 57% / 0.15)" }}
      >
        <p className="text-[10px] text-white/40 mb-1 uppercase tracking-wider">Categoria recomendada</p>
        <p className="font-bold text-xl" style={{ color: "hsl(11 81% 57%)" }}>{result.category}</p>
        <p className="text-xs text-white/50 mt-1">{result.justification}</p>
      </div>

      {hasModels ? (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
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
                className="rounded-xl overflow-hidden"
                style={{
                  background: i === 0 ? "hsl(11 81% 57% / 0.08)" : "hsl(0 0% 100% / 0.04)",
                  border: i === 0 ? "1px solid hsl(11 81% 57% / 0.25)" : "1px solid hsl(0 0% 100% / 0.08)",
                }}
              >
                {i === 0 && image && (
                  <div className="w-full h-40 bg-white flex items-center justify-center overflow-hidden">
                    <img src={image} alt={model.name} className="h-full w-auto object-contain" />
                  </div>
                )}
                <div className={`${i === 0 ? "p-4" : "p-3"}`}>
                  <div className="flex items-start gap-2">
                    {i > 0 && image && (
                      <div className="w-12 h-12 rounded-lg bg-white border overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ borderColor: "hsl(0 0% 100% / 0.1)" }}>
                        <img src={image} alt={model.name} className="h-full w-auto object-contain" />
                      </div>
                    )}
                    {!image && i === 0 && <Star className="w-4 h-4 mt-0.5 flex-shrink-0 fill-current" style={{ color: "hsl(11 81% 57%)" }} />}
                    {!image && i > 0 && <ChevronRight className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        {i === 0 && image && <Star className="w-3.5 h-3.5 flex-shrink-0 fill-current" style={{ color: "hsl(11 81% 57%)" }} />}
                        <p className={`font-bold ${i === 0 ? "text-base" : "text-sm text-white/80"}`} style={i === 0 ? { color: "hsl(11 81% 57%)" } : {}}>{model.name}</p>
                      </div>
                      <p className={`${i === 0 ? "text-sm text-white/70" : "text-xs text-white/40"} mt-0.5`}>{model.headline}</p>
                      {i === 0 && model.specs && (
                        <div className="mt-2 rounded-lg px-3 py-2" style={{ background: "hsl(0 0% 100% / 0.06)" }}>
                          <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1 font-semibold">Especificações</p>
                          <p className="text-xs text-white/70">{model.specs}</p>
                        </div>
                      )}
                      {i === 0 && model.whyFits && (
                        <div className="mt-2">
                          <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1 font-semibold">Por que combina com você</p>
                          <p className="text-xs text-white/60 leading-relaxed">{model.whyFits}</p>
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
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">Modelos sugeridos</p>
          <div className="space-y-2">
            {result.suggestions.map((s) => (
              <div
                key={s}
                className="rounded-xl px-4 py-3 text-sm font-medium text-white/70"
                style={{ background: "hsl(0 0% 100% / 0.04)", border: "1px solid hsl(0 0% 100% / 0.08)" }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Lead Capture Section */}
      <div className="space-y-4 pt-2">
        <div
          className="h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.3), transparent)" }}
        />
        <p className="text-xs font-semibold uppercase tracking-wider text-white/40 pt-1">
          Fale com um especialista
        </p>

        {/* Status Chip */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowHoursPopup((v) => !v)}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[11px] font-semibold tracking-wide w-full cursor-pointer transition-all duration-200 text-white"
            style={{
              background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
              boxShadow: "0 4px 16px hsl(11 81% 57% / 0.3)",
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
                    background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                    boxShadow: "0 12px 40px hsl(0 0% 0% / 0.3)",
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
          <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
            <User className="w-3 h-3" />
            Como podemos te chamar? <span style={{ color: "hsl(11 81% 57% / 0.7)" }}>*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            onBlur={handleNameBlur}
            placeholder="João Silva"
            maxLength={100}
            className={INPUT_STYLE}
            style={getInputStyle(!!nameError)}
          />
          {nameError && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{nameError}</p>}
        </div>

        {/* WhatsApp */}
        <div>
          <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
            <Phone className="w-3 h-3" />
            WhatsApp para contato <span style={{ color: "hsl(11 81% 57% / 0.7)" }}>*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onBlur={handlePhoneBlur}
            placeholder="(00) 00000-0000"
            maxLength={15}
            className={INPUT_STYLE}
            style={getInputStyle(!!phoneError)}
          />
          {phoneError && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{phoneError}</p>}
        </div>

        {/* City */}
        <div className="relative">
          <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
            <MapPin className="w-3 h-3" />
            De onde você é? <span style={{ color: "hsl(11 81% 57% / 0.7)" }}>*</span>
          </label>
          <input
            ref={cityInputRef}
            type="text"
            value={city}
            onChange={(e) => handleCityChange(e.target.value)}
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
            className={INPUT_STYLE}
            style={getInputStyle(!!cityError)}
            autoComplete="off"
          />
          {cityError && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{cityError}</p>}
          <AnimatePresence>
            {cityDropdownOpen && citySuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute left-0 right-0 z-50 mt-1 rounded-lg overflow-hidden max-h-40 overflow-y-auto"
                style={{
                  background: "hsl(0 0% 18%)",
                  border: "1px solid hsl(0 0% 100% / 0.1)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                }}
              >
                {citySuggestions.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); selectCity(s); }}
                    className="w-full text-left px-3 py-2 text-sm transition-colors"
                    style={{
                      color: focusedCityIndex === i ? "white" : "hsl(0 0% 100% / 0.6)",
                      background: focusedCityIndex === i ? "hsl(0 0% 100% / 0.1)" : "transparent",
                    }}
                    onMouseEnter={() => setFocusedCityIndex(i)}
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
          className={`flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white text-sm font-semibold tracking-wide ${
            isFormValid ? "cursor-pointer" : "opacity-40 cursor-not-allowed"
          }`}
          style={{
            background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
            boxShadow: isFormValid ? "0 4px 20px hsl(11 81% 57% / 0.3)" : "none",
          }}
          whileHover={isFormValid ? { scale: 1.02, boxShadow: "0 0 25px hsl(11 81% 57% / 0.5), 0 0 50px hsl(11 81% 57% / 0.2)" } : {}}
          whileTap={isFormValid ? { scale: 0.98 } : {}}
        >
          <WhatsAppIcon className="w-5 h-5" />
          Continuar no WhatsApp
        </motion.a>
        {!isFormValid && (
          <p className="text-[10px] text-white/30 text-center">
            Preencha os campos acima para continuar
          </p>
        )}
        <button
          onClick={onReset}
          className="text-xs text-white/40 hover:text-white/70 transition-colors py-2 uppercase tracking-wider font-medium cursor-pointer"
        >
          Refazer quiz
        </button>
      </div>
    </motion.div>
  );
};

export default QuizResultView;
