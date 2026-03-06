import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { User, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { useBusinessStatus } from "@/hooks/useBusinessHours";
import { detectSpam } from "@/utils/spam-detection";
import {
  WHATSAPP_NUMBER,
  formatPhone,
  formatName,
  validatePhone,
  INPUT_BASE_STYLE,
  getInputBorderStyle,
} from "@/utils/form-helpers";
import { supabase } from "@/integrations/supabase/client";
import StatusChip from "@/components/contact/StatusChip";
import CityAutocomplete from "@/components/contact/CityAutocomplete";
import VoiceRecorderField from "@/components/contact/VoiceRecorderField";

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const { isOnline, offlineMessage } = useBusinessStatus();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [cityValidated, setCityValidated] = useState(false);
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    const trimmedName = name.trim();
    if (!trimmedName) errs.name = "Precisamos do seu nome completo";
    else { const s = detectSpam("name", trimmedName); if (s) errs.name = s; }
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone.trim()) errs.phone = "Qual seu número de WhatsApp?";
    else { const p = validatePhone(phoneDigits); if (p) errs.phone = p; }
    if (!city.trim()) errs.city = "Informe sua cidade e estado";
    else if (!cityValidated) errs.city = "*Selecione uma localidade válida da lista";
    const trimmedDetails = details.trim();
    if (!trimmedDetails) errs.details = "Informe o motivo do contato";
    else if (trimmedDetails.length < 10) errs.details = "Descreva com mais detalhes (mínimo 10 caracteres)";
    else if (trimmedDetails.split(/\s+/).length < 2) errs.details = "Escreva pelo menos duas palavras";
    else { const d = detectSpam("details", trimmedDetails); if (d) errs.details = d; }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [name, phone, city, cityValidated, details]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    setIsLoading(true);
    let message: string;
    let subject = "Outros Assuntos";
    try {
      const [classifyResult, messageResult] = await Promise.all([
        supabase.functions.invoke("classify-subject", { body: { details: details.trim() } }),
        supabase.functions.invoke("generate-whatsapp-message", { body: { name: name.trim(), city: city.trim(), phone, details: details.trim() || undefined } }),
      ]);
      subject = classifyResult.data?.subject || "Outros Assuntos";
      if (messageResult.error || !messageResult.data?.message) throw new Error("AI error");
      const aiMessage = messageResult.data.message as string;
      message = aiMessage.replace(/(\*Cidade:\*[^\n]*)/, `$1\n\n*Assunto:* ${subject}`);
    } catch {
      message = `*Nome:* ${name.trim()}\n\n*WhatsApp:* ${phone}\n\n*Cidade:* ${city.trim()}\n\n*Assunto:* Outros Assuntos\n\n*Detalhes:* ${details.trim()}`;
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setName(""); setPhone(""); setCity(""); setCityValidated(false); setDetails(""); setErrors({}); setIsLoading(false);
  }, [name, phone, city, details, validate]);

  return (
    <div className="min-h-screen bg-background">
      <Header contactOpen={contactOpen} setContactOpen={setContactOpen} />
      <main className="flex items-center justify-center min-h-[calc(100vh-5rem)] pt-28 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="relative w-full max-w-md rounded-[0.9rem] overflow-hidden"
          style={{
            background: "hsl(0 0% 14% / 0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid hsl(0 0% 100% / 0.08)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px hsl(11 81% 57% / 0.08)",
          }}
        >
          {/* Top gradient strip */}
          <div className="h-[2px] shrink-0" style={{ background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.8), hsl(11 90% 65% / 0.8), transparent)" }} />

          {/* Ambient glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, hsl(11 81% 57% / 0.06) 0%, transparent 70%)" }} />

          {/* Header */}
          <div className="px-5 pt-4 pb-3">
            <h3 className="text-base font-bold text-white tracking-tight">Fale com um especialista da MS Eletric</h3>
            <p className="text-xs text-white/50 mt-1 leading-relaxed">
              {isOnline
                ? "Estamos online! Preencha os campos e fale agora com um especialista."
                : "Preencha os campos abaixo e responderemos assim que nosso atendimento retornar."}
            </p>
          </div>

          <StatusChip isOnline={isOnline} offlineMessage={offlineMessage} />

          <div className="mx-5 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.3), transparent)" }} />

          {/* Form */}
          <div className="px-5 py-4 space-y-3.5">
            {/* Name */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
                <User className="w-3 h-3" /> Como podemos te chamar? <span className="text-primary/70">*</span>
              </label>
              <input
                type="text" value={name}
                onChange={(e) => {
                  const f = formatName(e.target.value); setName(f);
                  const s = detectSpam("name", f);
                  setErrors((p) => { const n = { ...p }; if (s) n.name = s; else delete n.name; return n; });
                }}
                placeholder="João Silva" maxLength={100}
                className={`${INPUT_BASE_STYLE} cw-input ${errors.name ? "cw-input-error" : ""}`}
                style={getInputBorderStyle(!!errors.name)}
              />
              {errors.name && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{errors.name}</p>}
            </div>

            {/* WhatsApp */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
                <WhatsAppIcon className="w-3 h-3" /> WhatsApp para contato <span className="text-primary/70">*</span>
              </label>
              <input
                type="tel" inputMode="numeric" pattern="[0-9]*" value={phone}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "").slice(0, 11);
                  setPhone(formatPhone(raw));
                  if (raw.length === 11) {
                    const err = validatePhone(raw);
                    if (err) setErrors((p) => ({ ...p, phone: err }));
                    else setErrors((p) => { const { phone: _, ...r } = p; return r; });
                  } else if (raw.length > 0) setErrors((p) => { const { phone: _, ...r } = p; return r; });
                }}
                placeholder="(00) 00000-0000" maxLength={20}
                className={`${INPUT_BASE_STYLE} cw-input ${errors.phone ? "cw-input-error" : ""}`}
                style={getInputBorderStyle(!!errors.phone)}
              />
              {errors.phone && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{errors.phone}</p>}
            </div>

            {/* City */}
            <CityAutocomplete
              city={city} setCity={setCity} cityValidated={cityValidated} setCityValidated={setCityValidated}
              error={errors.city}
              clearError={() => setErrors((p) => { const { city: _, ...r } = p; return r; })}
            />

            {/* Details + Voice */}
            <VoiceRecorderField
              details={details} setDetails={setDetails} error={errors.details}
              setError={(err) => setErrors((p) => { const n = { ...p }; if (err) n.details = err; else delete n.details; return n; })}
            />

            {/* Submit */}
            <motion.button
              onClick={handleSubmit} disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-white cursor-pointer relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))", boxShadow: "0 4px 20px hsl(11 81% 57% / 0.3)" }}
              whileHover={isLoading ? {} : { scale: 1.02, boxShadow: "0 0 25px hsl(11 81% 57% / 0.5), 0 0 50px hsl(11 81% 57% / 0.2)" }}
              whileTap={isLoading ? {} : { scale: 0.98 }}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <WhatsAppIcon />}
              {isLoading ? "Redirecionando..." : "Continuar no WhatsApp"}
            </motion.button>

            <p className="text-[9px] text-white/30 text-center leading-relaxed pt-2 pb-1">
              *Ao enviar, seus dados serão usados apenas para atendimento, conforme a LGPD (
              <span style={{ color: "hsl(11 81% 57%)" }}>Lei nº 13.709/2018</span>).
            </p>
          </div>
        </motion.div>
      </main>
      <FloatingWhatsApp hidden={contactOpen} />
    </div>
  );
};

export default Index;
