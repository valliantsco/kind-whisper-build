import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Star, ChevronDown, User, Phone, MapPin, Clock, ExternalLink, Zap, Battery, Gauge, ArrowRight } from "lucide-react";
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

/** Parse specs string into key-value pairs */
const parseSpecs = (specs: string) => {
  if (!specs) return [];
  return specs.split("|").map((s) => {
    const parts = s.trim().split(":");
    if (parts.length >= 2) {
      return { label: parts[0].trim(), value: parts.slice(1).join(":").trim() };
    }
    return { label: "", value: s.trim() };
  }).filter(s => s.value);
};

const specIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("motor")) return <Zap className="w-3 h-3" />;
  if (l.includes("vel")) return <Gauge className="w-3 h-3" />;
  if (l.includes("autonomia")) return <Battery className="w-3 h-3" />;
  if (l.includes("recarga")) return <Clock className="w-3 h-3" />;
  if (l.includes("preço") || l.includes("preco")) return null;
  return null;
};

const QuizResultView = ({ result, whatsappNumber, onReset }: QuizResultViewProps) => {
  const models = result.models?.length ? result.models : [];
  const hasModels = models.length > 0;
  const [expandedModel, setExpandedModel] = useState<number | null>(null);
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
    const msg = `Olá! Meu nome é ${name.trim()}, sou de ${city.trim()}. Fiz o quiz no site e recebi a recomendação: ${result.category} — ${modelNames || result.suggestions.join(", ")}. Gostaria de saber mais!`;
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
    setNameError(detectSpam("name", formatted));
  };

  const handlePhoneChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    setPhone(formatPhone(digits));
    setPhoneError(digits.length === 11 ? validatePhone(digits) : null);
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
    if (digits.length > 0 && digits.length < 11) setPhoneError("DDD + 9 dígitos");
  };

  const handleNameBlur = () => {
    if (name.trim().length > 0 && !name.trim().includes(" ")) setNameError("Inclua seu sobrenome");
  };

  // ── Primary model card ──────────────────────────────────────────────
  const renderPrimaryCard = (model: typeof models[0]) => {
    const image = getModelImage(model.name);
    const specs = parseSpecs(model.specs || "");
    const nonPriceSpecs = specs.filter(s => !s.label.toLowerCase().includes("preço") && !s.label.toLowerCase().includes("preco"));

    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(165deg, hsl(11 81% 57% / 0.12) 0%, hsl(0 0% 100% / 0.03) 100%)",
          border: "1px solid hsl(11 81% 57% / 0.25)",
          boxShadow: "0 8px 32px hsl(11 81% 57% / 0.08)",
        }}
      >
        {/* Badge: melhor escolha + match % */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{
            background: "linear-gradient(90deg, hsl(11 81% 57% / 0.15), transparent)",
            borderBottom: "1px solid hsl(11 81% 57% / 0.12)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <Star className="w-3 h-3 fill-current" style={{ color: "hsl(11 81% 57%)" }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "hsl(11 81% 57%)" }}>
              Melhor escolha para você
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full"
            style={{ background: "hsl(142 76% 36% / 0.2)", border: "1px solid hsl(142 76% 36% / 0.3)" }}
          >
            <span className="text-[10px] font-bold" style={{ color: "hsl(142 76% 50%)" }}>
              {Math.floor(85 + Math.random() * 13)}% match
            </span>
          </motion.div>
        </div>

        {/* Image with ambient glow */}
        {image && (
          <div className="w-full h-40 flex items-center justify-center overflow-hidden relative">
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center 60%, hsl(11 81% 57% / 0.12) 0%, hsl(11 81% 57% / 0.04) 40%, transparent 70%)",
              }}
            />
            <motion.img
              src={image}
              alt={model.name}
              className="h-full w-auto object-contain relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-4 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h4 className="font-bold text-lg text-white">{model.name}</h4>
            <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{model.headline}</p>
          </motion.div>

          {/* Specs grid */}
          {nonPriceSpecs.length > 0 && (
            <motion.div
              className="grid grid-cols-2 gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {nonPriceSpecs.slice(0, 4).map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
                  style={{ background: "hsl(0 0% 100% / 0.05)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
                >
                  <span style={{ color: "hsl(11 81% 57% / 0.7)" }}>{specIcon(s.label)}</span>
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-wider text-white/30 leading-none">{s.label}</p>
                    <p className="text-[11px] font-semibold text-white/80 leading-tight truncate">{s.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Why fits */}
          {model.whyFits && (
            <motion.p
              className="text-xs text-white/50 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              {model.whyFits}
            </motion.p>
          )}

          {/* Price */}
          {(() => {
            const priceSpec = specs.find(s => s.label.toLowerCase().includes("preço") || s.label.toLowerCase().includes("preco"));
            if (!priceSpec) return null;
            const isConsulte = priceSpec.value.toLowerCase().includes("consult");
            return (
              <motion.div
                className="flex items-center justify-between rounded-xl px-3 py-2.5"
                style={{ background: "hsl(11 81% 57% / 0.08)", border: "1px solid hsl(11 81% 57% / 0.15)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                {isConsulte ? (
                  <span className="text-[11px] font-medium text-white/50 mx-auto">Consulte o valor com nosso time</span>
                ) : (
                  <>
                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-medium">A partir de</span>
                    <span className="text-sm font-bold" style={{ color: "hsl(11 81% 57%)" }}>{priceSpec.value}</span>
                  </>
                )}
              </motion.div>
            );
          })()}

          {/* CTA: Saber mais */}
          <motion.button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
            style={{
              background: "hsl(11 81% 57% / 0.12)",
              border: "1px solid hsl(11 81% 57% / 0.25)",
              color: "hsl(11 81% 57%)",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{
              background: "hsl(11 81% 57% / 0.2)",
              boxShadow: "0 0 20px hsl(11 81% 57% / 0.15)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const modelsSection = document.getElementById("modelos");
              if (modelsSection) modelsSection.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Ver detalhes completos <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </motion.div>
    );
  };

  // ── Secondary/tertiary model card ───────────────────────────────────
  const renderSecondaryCard = (model: typeof models[0], i: number) => {
    const image = getModelImage(model.name);
    const isExpanded = expandedModel === i;
    const specs = parseSpecs(model.specs || "");
    const nonPriceSpecs = specs.filter(s => !s.label.toLowerCase().includes("preço") && !s.label.toLowerCase().includes("preco"));
    const priceSpec = specs.find(s => s.label.toLowerCase().includes("preço") || s.label.toLowerCase().includes("preco"));

    return (
      <motion.div
        key={model.name}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1 }}
        className="rounded-xl overflow-hidden"
        style={{
          background: "hsl(0 0% 100% / 0.03)",
          border: "1px solid hsl(0 0% 100% / 0.08)",
        }}
      >
        {/* Clickable header */}
        <div
          className="flex items-center gap-3 p-3 cursor-pointer select-none group"
          onClick={() => setExpandedModel(isExpanded ? null : i)}
        >
          {/* Thumbnail */}
          {image && (
            <div
              className="w-11 h-11 rounded-lg bg-white/5 overflow-hidden flex-shrink-0 flex items-center justify-center"
              style={{ border: "1px solid hsl(0 0% 100% / 0.08)" }}
            >
              <img src={image} alt={model.name} className="h-full w-auto object-contain" />
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white/85 group-hover:text-white transition-colors leading-tight">
              {model.name}
            </p>
            <p className="text-[11px] text-white/40 leading-snug mt-0.5 line-clamp-2">
              {model.headline}
            </p>
          </div>

          {/* Chevron */}
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <ChevronDown className="w-4 h-4 text-white/30 group-hover:text-white/50 transition-colors" />
          </motion.span>
        </div>

        {/* Expandable details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div
                className="px-3 pb-3 space-y-2.5"
                style={{ borderTop: "1px solid hsl(0 0% 100% / 0.06)" }}
              >
                {/* Specs grid */}
                {nonPriceSpecs.length > 0 && (
                  <div className="grid grid-cols-2 gap-1.5 pt-2.5">
                    {nonPriceSpecs.slice(0, 4).map((s, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5"
                        style={{ background: "hsl(0 0% 100% / 0.04)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
                      >
                        <span style={{ color: "hsl(11 81% 57% / 0.6)" }}>{specIcon(s.label)}</span>
                        <div className="min-w-0">
                          <p className="text-[9px] uppercase tracking-wider text-white/30 leading-none">{s.label}</p>
                          <p className="text-[11px] font-semibold text-white/80 leading-tight truncate">{s.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Why fits */}
                {model.whyFits && (
                  <p className="text-[11px] text-white/45 leading-relaxed">
                    {model.whyFits}
                  </p>
                )}

                {/* Price */}
                {priceSpec && (
                  <div className="flex items-center justify-between rounded-lg px-2.5 py-2" style={{ background: "hsl(11 81% 57% / 0.08)", border: "1px solid hsl(11 81% 57% / 0.12)" }}>
                    {priceSpec.value.toLowerCase().includes("consult") ? (
                      <span className="text-[10px] font-medium text-white/50 mx-auto">Consulte o valor com nosso time</span>
                    ) : (
                      <>
                        <span className="text-[10px] uppercase tracking-wider text-white/40 font-medium">A partir de</span>
                        <span className="text-xs font-bold" style={{ color: "hsl(11 81% 57%)" }}>{priceSpec.value}</span>
                      </>
                    )}
                  </div>
                )}

                {/* CTA */}
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold cursor-pointer transition-colors hover:opacity-80"
                  style={{ color: "hsl(11 81% 57%)" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const modelsSection = document.getElementById("modelos");
                    if (modelsSection) modelsSection.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Saber mais sobre este modelo <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5"
    >
      {/* Category badge — reveals first */}
      <motion.div
        className="rounded-xl p-4 text-center"
        style={{ background: "hsl(11 81% 57% / 0.08)", border: "1px solid hsl(11 81% 57% / 0.12)" }}
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
      >
        <p className="text-[10px] text-white/35 mb-1 uppercase tracking-[0.15em] font-medium">Categoria ideal</p>
        <p className="font-bold text-lg" style={{ color: "hsl(11 81% 57%)" }}>{result.category}</p>
        <p className="text-[11px] text-white/45 mt-1 leading-relaxed max-w-xs mx-auto">{result.justification}</p>
      </motion.div>

      {/* Model cards */}
      {hasModels && (
        <div className="space-y-3">
          {/* Primary — reveals second */}
          {models[0] && renderPrimaryCard(models[0])}

          {/* Secondary label — reveals third */}
          {models.length > 1 && (
            <motion.p
              className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 pt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              Outras opções para o seu perfil
            </motion.p>
          )}

          {/* Secondary/tertiary — reveals last with stagger */}
          {models.slice(1).map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + i * 0.15, duration: 0.4 }}
            >
              {renderSecondaryCard(model, i + 1)}
            </motion.div>
          ))}
        </div>
      )}

      {/* Fallback: old suggestions array */}
      {!hasModels && result.suggestions.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-2">Modelos sugeridos</p>
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
      )}

      {/* ── Divider ─────────────────────────────────────────────────── */}
      <div
        className="h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.1), transparent)" }}
      />

      {/* ── Lead capture ────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm font-semibold text-white/80">Gostou da recomendação?</p>
          <p className="text-[11px] text-white/40 mt-0.5">Preencha seus dados e fale direto com um consultor</p>
        </div>

        {/* Status chip */}
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
            <User className="w-3 h-3" /> Seu nome <span style={{ color: "hsl(11 81% 57% / 0.7)" }}>*</span>
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

        {/* Phone */}
        <div>
          <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
            <Phone className="w-3 h-3" /> WhatsApp <span style={{ color: "hsl(11 81% 57% / 0.7)" }}>*</span>
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
            <MapPin className="w-3 h-3" /> Sua cidade <span style={{ color: "hsl(11 81% 57% / 0.7)" }}>*</span>
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
                {citySuggestions.map((s, idx) => (
                  <button
                    key={s}
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); selectCity(s); }}
                    className="w-full text-left px-3 py-2 text-sm transition-colors"
                    style={{
                      color: focusedCityIndex === idx ? "white" : "hsl(0 0% 100% / 0.6)",
                      background: focusedCityIndex === idx ? "hsl(0 0% 100% / 0.1)" : "transparent",
                    }}
                    onMouseEnter={() => setFocusedCityIndex(idx)}
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
      <div className="flex flex-col gap-2.5 pt-1">
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
          Falar com consultor no WhatsApp
        </motion.a>
        {!isFormValid && (
          <p className="text-[10px] text-white/30 text-center">Preencha os campos acima para continuar</p>
        )}
        <button
          onClick={onReset}
          className="text-xs text-white/40 hover:text-white/70 transition-colors py-1.5 uppercase tracking-wider font-medium cursor-pointer"
        >
          Refazer quiz
        </button>
      </div>
    </motion.div>
  );
};

export default QuizResultView;
