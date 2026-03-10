import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, User, Loader2, Zap, Battery, Gauge, Clock, ExternalLink, CheckCircle2, ShieldCheck } from "lucide-react";
import type { QuizResult } from "./types";
import { getModelImage } from "./modelImages";
import { useBusinessStatus } from "@/hooks/useBusinessHours";
import { formatPhone, formatName, validatePhone, INPUT_BASE_STYLE, getInputBorderStyle } from "@/utils/form-helpers";
import { detectSpam } from "@/utils/spam-detection";
import StatusChip from "@/components/contact/StatusChip";
import CityAutocomplete from "@/components/contact/CityAutocomplete";

interface QuizResultViewProps {
  result: QuizResult;
  whatsappNumber: string;
  onReset: () => void;
}

const WhatsAppIcon = ({ className = "w-5 h-5" }: {className?: string;}) =>
<svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>;


/** Parse specs string into key-value pairs */
const parseSpecs = (specs: string) => {
  if (!specs) return [];
  return specs.split("|").map((s) => {
    const parts = s.trim().split(":");
    if (parts.length >= 2) {
      return { label: parts[0].trim(), value: parts.slice(1).join(":").trim() };
    }
    return { label: "", value: s.trim() };
  }).filter((s) => s.value);
};

const specIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("motor")) return <Zap className="w-3 h-3" />;
  if (l.includes("vel")) return <Gauge className="w-3 h-3" />;
  if (l.includes("autonomia")) return <Battery className="w-3 h-3" />;
  if (l.includes("recarga")) return <Clock className="w-3 h-3" />;
  return null;
};

const QuizResultView = ({ result, whatsappNumber, onReset }: QuizResultViewProps) => {
  const models = result.models?.length ? result.models : [];
  const hasModels = models.length > 0;

  const { isOnline, offlineMessage } = useBusinessStatus();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [cityValidated, setCityValidated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid =
  name.trim().length >= 2 &&
  !errors.name &&
  phone.replace(/\D/g, "").length === 11 &&
  !errors.phone &&
  city.trim().length >= 2 &&
  cityValidated &&
  !errors.city;

  const buildWhatsAppMessage = () => {
    const modelNames = models.map((m) => m.name).join(", ");
    return [
    `*Por favor, para que seu atendimento prossiga, não apague esta mensagem antes de enviar!*`,
    ``,
    `*Nome:* ${name.trim()}`,
    ``,
    `*Cidade:* ${city.trim()}`,
    ``,
    `*Assunto:* Quiz — Recomendação de veículo`,
    ``,
    `*Resultado do quiz:* ${result.category} — ${modelNames || result.suggestions.join(", ")}`,
    ``,
    `Olá! Fiz o quiz no site e recebi a recomendação acima. Gostaria de saber mais sobre disponibilidade e condições de pagamento.`].
    join("\n");
  };

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    const trimmedName = name.trim();
    if (!trimmedName) errs.name = "Precisamos do seu nome completo";else
    {
      const nameSpam = detectSpam("name", trimmedName);
      if (nameSpam) errs.name = nameSpam;else
      if (!trimmedName.includes(" ")) errs.name = "Inclua seu sobrenome";
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone.trim()) errs.phone = "Qual seu número de WhatsApp?";else
    {
      const phoneErr = validatePhone(phoneDigits);
      if (phoneErr) errs.phone = phoneErr;
    }

    if (!city.trim()) errs.city = "Informe sua cidade e estado";else
    if (!cityValidated) errs.city = "*Selecione uma localidade válida da lista";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [name, phone, city, cityValidated]);

  const handleSubmit = useCallback(() => {
    if (!validate()) return;
    setIsLoading(true);

    const message = buildWhatsAppMessage();
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );

    setIsLoading(false);
  }, [name, phone, city, whatsappNumber, validate]);

  // ── Primary model card ──────────────────────────────────────────────
  const renderPrimaryCard = (model: typeof models[0]) => {
    const image = getModelImage(model.name);
    const specs = parseSpecs(model.specs || "");
    const nonPriceSpecs = specs.filter((s) => !s.label.toLowerCase().includes("preço") && !s.label.toLowerCase().includes("preco"));

    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(165deg, hsl(11 81% 57% / 0.10) 0%, hsl(0 0% 100% / 0.03) 100%)",
          border: "1px solid hsl(11 81% 57% / 0.20)",
          boxShadow: "0 8px 32px hsl(11 81% 57% / 0.06)"
        }}>
        
        {/* Badge */}
        <div
          className="flex items-center px-4 py-2"
          style={{
            background: "linear-gradient(90deg, hsl(11 81% 57% / 0.12), transparent)",
            borderBottom: "1px solid hsl(11 81% 57% / 0.10)"
          }}>
          
          <div className="flex items-center gap-1.5">
            <Star className="w-3 h-3 fill-current" style={{ color: "hsl(11 81% 57%)" }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "hsl(11 81% 57%)" }}>
              Recomendado para você
            </span>
          </div>
        </div>

        {/* Image */}
        {image &&
        <div className="w-full h-[252px] overflow-hidden relative" style={{ background: "hsl(0 0% 100%)", borderBottom: "1px solid transparent", borderImage: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.5), hsl(11 90% 65% / 0.5), transparent) 1" }}>
          
            <motion.img
            src={image}
            alt={model.name}
            className="w-full h-full object-contain relative z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }} />
          
          </div>
        }

        {/* Content */}
        <div className="px-3.5 py-3 space-y-2.5">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <h4 className="font-bold text-lg text-white">{model.name}</h4>
            <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{model.headline}</p>
          </motion.div>

          {/* Specs grid */}
          {nonPriceSpecs.length > 0 &&
          <motion.div className="grid grid-cols-2 gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              {nonPriceSpecs.slice(0, 4).map((s, idx) =>
            <div
              key={idx}
              className="rounded-xl px-3 py-2.5 flex flex-col gap-1"
              style={{
                background: "linear-gradient(135deg, hsl(0 0% 100% / 0.05), hsl(0 0% 100% / 0.02))",
                border: "1px solid hsl(0 0% 100% / 0.07)"
              }}>
              
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: "hsl(11 81% 57% / 0.8)" }} className="pt-[3px]">{specIcon(s.label)}</span>
                    <p className="text-[9px] uppercase tracking-[0.12em] text-white/35 font-medium">{s.label}</p>
                  </div>
                  <p className="text-sm font-bold text-white/90 leading-tight truncate">{s.value}</p>
                </div>
            )}
            </motion.div>
          }

          {/* Why fits */}
          {model.whyFits &&
          <motion.div
            className="rounded-xl px-3 py-2.5"
            style={{ background: "hsl(0 0% 100% / 0.03)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}>
            
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "hsl(11 81% 57% / 0.7)" }} />
                <p className="text-[11px] text-white/55 leading-relaxed">{model.whyFits}</p>
              </div>
            </motion.div>
          }


          {/* Price */}
          {(() => {
            const priceSpec = specs.find((s) => s.label.toLowerCase().includes("preço") || s.label.toLowerCase().includes("preco"));
            if (!priceSpec) return null;
            const isConsulte = priceSpec.value.toLowerCase().includes("consult");
            return (
              <motion.div
                className="flex items-center justify-between rounded-xl px-3 py-2.5"
                style={{ background: "hsl(11 81% 57% / 0.08)", border: "1px solid hsl(11 81% 57% / 0.12)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}>
                
                {isConsulte ?
                <span className="text-[11px] font-medium text-white/50 mx-auto">Consulte o valor com nosso time</span> :

                <>
                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-medium">A partir de</span>
                    <span className="text-sm font-bold" style={{ color: "hsl(11 81% 57%)" }}>{priceSpec.value}</span>
                  </>
                }
              </motion.div>);

          })()}
        </div>
      </motion.div>);

  };

  // ── Secondary card (compact) ────────────────────────────────────────
  const renderSecondaryCard = (model: typeof models[0]) => {
    const image = getModelImage(model.name);
    const specs = parseSpecs(model.specs || "");
    const priceSpec = specs.find((s) => s.label.toLowerCase().includes("preço") || s.label.toLowerCase().includes("preco"));

    return (
      <div
        className="rounded-xl overflow-hidden flex items-center gap-3 p-3"
        style={{ background: "hsl(0 0% 100% / 0.03)", border: "1px solid hsl(0 0% 100% / 0.06)" }}>
        
        {image &&
        <div
          className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
          style={{ background: "hsl(0 0% 100% / 0.04)", border: "1px solid hsl(0 0% 100% / 0.06)" }}>
          
            <img src={image} alt={model.name} className="h-full w-auto object-contain" />
          </div>
        }
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white/80 leading-tight">{model.name}</p>
          <p className="text-[11px] text-white/35 leading-snug mt-0.5 line-clamp-1">{model.headline}</p>
          <div className="flex items-center justify-between mt-1.5">
            {priceSpec && !priceSpec.value.toLowerCase().includes("consult") ?
            <span className="text-xs font-bold" style={{ color: "hsl(11 81% 57%)" }}>{priceSpec.value}</span> :

            <span className="text-[10px] text-white/30">Consulte</span>
            }
            <button
              type="button"
              className="inline-flex items-center gap-0.5 text-[9px] font-medium cursor-pointer transition-colors opacity-25 hover:opacity-100"
              style={{ color: "hsl(0 0% 100%)" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "hsl(11 81% 57%)"}
              onMouseLeave={(e) => {e.currentTarget.style.color = "hsl(0 0% 100%)";}}
              onClick={() => {
                const modelsSection = document.getElementById("modelos");
                if (modelsSection) modelsSection.scrollIntoView({ behavior: "smooth" });
              }}>
              
              Saber mais <ExternalLink className="w-2 h-2" />
            </button>
          </div>
        </div>
      </div>);

  };

  return (
    <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pb-0">
      {/* Primary card */}
      {hasModels && models[0] && renderPrimaryCard(models[0])}

      {/* Fallback suggestions */}
      {!hasModels && result.suggestions.length > 0 &&
      <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-2">Modelos sugeridos</p>
          <div className="space-y-2">
            {result.suggestions.map((s) =>
          <div key={s} className="rounded-xl px-4 py-3 text-sm font-medium text-white/70" style={{ background: "hsl(0 0% 100% / 0.04)", border: "1px solid hsl(0 0% 100% / 0.06)" }}>
                {s}
              </div>
          )}
          </div>
        </div>
      }

      {/* Trust signals */}
      <motion.div
        className="flex items-center justify-center gap-4 py-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}>
        
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" style={{ color: "hsl(11 81% 57%)" }} />
          <span className="text-[9px] text-white/35 font-medium">Garantia de fábrica</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" style={{ color: "hsl(11 81% 57%)" }} />
          <span className="text-[9px] text-white/35 font-medium">Pronta entrega</span>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="mx-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.3), transparent)" }} />

      {/* Lead form headline */}
      <motion.p
        className="text-sm font-semibold text-white/70 leading-relaxed text-left"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}>
        
        Fale com um especialista sobre este modelo
      </motion.p>

      <motion.div
        className="space-y-3.5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}>
        
        {/* Name */}
        <div>
          <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
            <User className="w-3 h-3" />
            Como podemos te chamar? <span className="text-primary/70">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              const formatted = formatName(e.target.value);
              setName(formatted);
              const spamErr = detectSpam("name", formatted);
              setErrors((prev) => {
                const next = { ...prev };
                if (spamErr) next.name = spamErr;else
                delete next.name;
                return next;
              });
            }}
            onBlur={() => {
              if (name.trim().length > 0 && !name.trim().includes(" "))
              setErrors((prev) => ({ ...prev, name: "Inclua seu sobrenome" }));
            }}
            placeholder="João Silva"
            maxLength={100}
            className={`${INPUT_BASE_STYLE} cw-input ${errors.name ? "cw-input-error" : ""}`}
            style={getInputBorderStyle(!!errors.name)} />
          
          {errors.name && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{errors.name}</p>}
        </div>

        {/* WhatsApp */}
        <div>
          <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
            <WhatsAppIcon className="w-3 h-3" />
            WhatsApp para contato <span className="text-primary/70">*</span>
          </label>
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            value={phone}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "").slice(0, 11);
              setPhone(formatPhone(raw));
              if (raw.length === 11) {
                const phoneErr = validatePhone(raw);
                setErrors((prev) => {
                  const next = { ...prev };
                  if (phoneErr) next.phone = phoneErr;else
                  delete next.phone;
                  return next;
                });
              } else {
                setErrors((prev) => {const { phone: _, ...rest } = prev;return rest;});
              }
            }}
            onBlur={() => {
              const digits = phone.replace(/\D/g, "");
              if (digits.length > 0 && digits.length < 11)
              setErrors((prev) => ({ ...prev, phone: "DDD + 9 dígitos" }));
            }}
            placeholder="(00) 00000-0000"
            maxLength={20}
            className={`${INPUT_BASE_STYLE} cw-input ${errors.phone ? "cw-input-error" : ""}`}
            style={getInputBorderStyle(!!errors.phone)} />
          
          {errors.phone && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{errors.phone}</p>}
        </div>

        {/* City — shared component */}
        <CityAutocomplete
          city={city}
          setCity={setCity}
          cityValidated={cityValidated}
          setCityValidated={setCityValidated}
          error={errors.city}
          clearError={() => setErrors((prev) => {const { city: _, ...rest } = prev;return rest;})}
          setError={(err) => setErrors((prev) => {
            const next = { ...prev };
            if (err) next.city = err;else
            delete next.city;
            return next;
          })} />
        

        {/* Submit CTA */}
        <motion.button
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-white cursor-pointer relative overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
            boxShadow: isFormValid ? "0 4px 20px hsl(11 81% 57% / 0.3)" : "none"
          }}
          whileHover={isFormValid && !isLoading ? { scale: 1.02, boxShadow: "0 0 25px hsl(11 81% 57% / 0.5), 0 0 50px hsl(11 81% 57% / 0.2)" } : {}}
          whileTap={isFormValid && !isLoading ? { scale: 0.98 } : {}}>
          
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <WhatsAppIcon className="w-5 h-5" />}
          {isLoading ? "Redirecionando..." : "Conversar sobre este modelo"}
        </motion.button>

        {!isFormValid &&
        <p className="text-[10px] text-white/25 text-center">*Preencha os campos acima para continuar</p>
        }

      </motion.div>

      {/* Secondary models */}
      {hasModels && models.length > 1 &&
      <motion.div
        className="space-y-2 pb-0 pt-[7px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}>
        
          <div className="h-[1px]" style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.06), transparent)" }} />
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/20 pt-0">
            {models.slice(1).length > 1 ? "Outras opções para o seu perfil" : "Outra opção para o seu perfil"}
          </p>
          {models.slice(1).map((model, i) =>
        <motion.div
          key={model.name}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 + i * 0.12, duration: 0.35 }}>
          
              {renderSecondaryCard(model)}
            </motion.div>
        )}
        </motion.div>
      }


      {/* LGPD disclaimer */}
      <p className="text-[9px] text-white/20 text-center leading-relaxed">
        *Ao enviar, seus dados serão usados apenas para atendimento, conforme a LGPD (
        <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank" rel="noopener noreferrer" style={{ color: "hsl(11 81% 57%)" }} className="hover:underline">Lei nº 13.709/2018</a>).
      </p>
    </motion.div>);

};

export default QuizResultView;