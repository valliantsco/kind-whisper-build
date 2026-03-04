import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, User, HelpCircle, MessageSquare, Loader2, Mic, Square } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBusinessHours } from "@/hooks/useBusinessHours";

const WHATSAPP_NUMBER = "551151996628";

const businessHoursInfo = [
  { day: "Seg - Sex", hours: "08:00 – 18:00" },
  { day: "Sábado", hours: "08:00 – 12:00" },
  { day: "Domingo", hours: "Fechado" },
];

const TOPIC_OPTIONS = [
  "Ver modelos disponíveis",
  "Saber preços ou promoções",
  "Formas de pagamento ou financiamento",
  "Autonomia e especificações",
  "Comparar modelos",
  "Garantia ou assistência",
  "Suporte técnico",
  "Peças ou manutenção",
  "Acompanhar pedido",
  "Outra dúvida",
];

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const overlayVariants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: { 
    opacity: 1, 
    backdropFilter: "blur(12px)",
    transition: { duration: 0.4, ease: "easeOut" as const }
  },
  exit: { 
    opacity: 0, 
    backdropFilter: "blur(0px)",
    transition: { duration: 0.3, ease: "easeIn" as const }
  },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 28, stiffness: 320 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
};

interface ContactWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const formatPhone = (digits: string): string => {
  if (digits.length === 0) return "";
  if (digits.length > 7) return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
  if (digits.length > 2) return `(${digits.slice(0,2)}) ${digits.slice(2)}`;
  return `(${digits}`;
};


const STORAGE_KEY = "ms-contact-draft";

const loadDraft = () => {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch { return null; }
};

// Shared input style helper — replaces inline onFocus/onBlur handlers
const inputBaseStyle = "w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder:text-white/35 focus:outline-none transition-[border-color,box-shadow] duration-200";

const getInputBorderStyle = (hasError: boolean) => ({
  background: "hsl(0 0% 100% / 0.06)",
  border: `1px solid ${hasError ? "hsl(0 84% 60% / 0.5)" : "hsl(0 0% 100% / 0.08)"}`,
});

const ContactWidget = ({ isOpen, onClose }: ContactWidgetProps) => {
  const isOnline = useBusinessHours();
  const draft = useRef(loadDraft());
  const [name, setName] = useState(draft.current?.name || "");
  const [phone, setPhone] = useState(draft.current?.phone || "");
  const [selectedTopic, setSelectedTopic] = useState(draft.current?.topic || "");
  const [details, setDetails] = useState(draft.current?.details || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isDetailsFocused, setIsDetailsFocused] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Persist draft to sessionStorage
  useEffect(() => {
    const data = { name, phone, topic: selectedTopic, details };
    if (name || phone || selectedTopic || details) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [name, phone, selectedTopic, details]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Precisamos do seu nome completo";
    else if (!name.trim().includes(" ")) errs.name = "Inclua seu sobrenome também";
    if (!phone.trim()) errs.phone = "Qual seu número de WhatsApp?";
    else if (!/^[\d\s()+-]{8,20}$/.test(phone.trim()))
      errs.phone = "Verifique o número digitado";
    if (!selectedTopic) errs.topic = "Escolha um assunto acima";
    if (!details.trim()) errs.details = "Conte um pouco mais sobre o que precisa";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [name, phone, selectedTopic, details]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4",
      });
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        chunksRef.current = [];
        setIsTranscribing(true);
        try {
          const arrayBuffer = await blob.arrayBuffer();
          const uint8 = new Uint8Array(arrayBuffer);
          let binary = "";
          const chunkSize = 8192;
          for (let i = 0; i < uint8.length; i += chunkSize) {
            binary += String.fromCharCode(...uint8.slice(i, i + chunkSize));
          }
          const base64 = btoa(binary);
          const { data, error } = await supabase.functions.invoke("transcribe-audio", {
            body: { audioBase64: base64 },
          });
          if (error || !data?.transcription) throw new Error("Transcription failed");
          const text = data.transcription;
          if (text && text !== "[áudio inaudível]") {
            setDetails((prev) => (prev ? `${prev} ${text}` : text));
          }
        } catch (err) {
          console.error("Transcription error:", err);
        } finally {
          setIsTranscribing(false);
        }
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      console.error("Microphone access denied");
    }
  }, []);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    setIsLoading(true);

    let message: string;

    try {
      const { data, error } = await supabase.functions.invoke("generate-whatsapp-message", {
        body: { name: name.trim(), topic: selectedTopic, details: details.trim() || undefined },
      });

      if (error || !data?.message) throw new Error("AI error");
      message = data.message;
    } catch {
      message = [
        `*Por favor, para que seu atendimento prossiga, não apague esta mensagem antes de enviar!*`,
        ``,
        `*Nome:* ${name.trim()}`,
        ``,
        `*Assunto:* ${selectedTopic}`,
        ``,
        details.trim(),
      ].join("\n");
    }

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );

    setName("");
    setPhone("");
    setSelectedTopic("");
    setDetails("");
    setErrors({});
    sessionStorage.removeItem(STORAGE_KEY);
    setIsLoading(false);
    onClose();
  }, [name, phone, selectedTopic, details, validate, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-foreground/60"
            onClick={onClose}
          />

          {/* Panel — glassmorphism dark style matching header */}
          <div className="relative w-full max-w-md flex items-stretch" style={{ gap: 5 }}>
            {/* External scrollbar track */}
            <AnimatePresence>
              {isScrolling && (
                <motion.div
                  className="relative w-[3px] rounded-full my-4 shrink-0 overflow-hidden"
                  style={{ background: "hsl(0 0% 100% / 0.06)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="absolute top-0 left-0 w-full rounded-full"
                    style={{
                      background: "linear-gradient(180deg, hsl(11 81% 57% / 0.6), hsl(11 90% 65% / 0.4))",
                      height: "30%",
                      top: `${scrollProgress * 70}%`,
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Panel */}
            <motion.div
              variants={panelVariants}
              className="relative flex-1 rounded-[0.9rem] overflow-hidden max-h-[90vh] flex flex-col"
            style={{
              background: "hsl(0 0% 14% / 0.92)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid hsl(0 0% 100% / 0.08)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px hsl(11 81% 57% / 0.08)",
            }}
          >
            {/* Top gradient light strip */}
            <div
              className="h-[2px] shrink-0"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.8), hsl(11 90% 65% / 0.8), transparent)",
              }}
            />

            {/* Ambient glow — respects reduced motion */}
            <motion.div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none motion-reduce:hidden"
              style={{
                background: "radial-gradient(circle, hsl(11 81% 57% / 0.08) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Scrollable content with fade indicators */}
            <div
              ref={scrollContainerRef}
              className="overflow-y-auto flex-1 relative cw-scroll"
              onScroll={(e) => {
                const el = e.currentTarget;
                const progress = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
                setScrollProgress(Math.min(1, Math.max(0, progress)));
                setIsScrolling(true);
                if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
                scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 1200);
              }}
            >
              {/* Top scroll fade */}
              <div
                className="sticky top-0 left-0 right-0 h-3 pointer-events-none z-10"
                style={{ background: "linear-gradient(to bottom, hsl(0 0% 14% / 0.92), transparent)" }}
              />

              {/* Header */}
              <div className="flex items-start justify-between px-5 pt-4 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Fale com um especialista da MS Eletric
                  </h3>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    Responda 3 perguntas rápidas e te atendemos pelo WhatsApp.
                  </p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Status chip — amber when offline (#5) */}
              <div className="px-5 pb-4">
                <div
                  className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em] border w-full"
                  style={{
                    background: isOnline ? "hsl(142 76% 36% / 0.12)" : "hsl(38 92% 50% / 0.12)",
                    borderColor: isOnline ? "hsl(142 76% 36% / 0.25)" : "hsl(38 92% 50% / 0.25)",
                    color: isOnline ? "hsl(142 70% 65%)" : "hsl(38 92% 70%)",
                  }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ background: isOnline ? "hsl(142 76% 50%)" : "hsl(38 92% 50%)" }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2.5 w-2.5"
                      style={{ background: isOnline ? "hsl(142 76% 50%)" : "hsl(38 92% 50%)" }}
                    />
                  </span>
                  {isOnline ? "Online agora" : "Offline · Voltamos às 08:00"}
                </div>

                {/* Business hours */}
                <div
                  className="mt-3 flex items-center justify-center gap-2 p-3 rounded-lg"
                  style={{
                    background: "hsl(0 0% 100% / 0.04)",
                    border: "1px solid hsl(0 0% 100% / 0.06)",
                  }}
                >
                  <Clock className="w-3.5 h-3.5 text-white/30 shrink-0" />
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-0.5">
                    {businessHoursInfo.map((item) => (
                      <span key={item.day} className="text-[10px] text-white/40">
                        <span className="font-medium text-white/60">{item.day}:</span>{" "}
                        <span style={{ color: "hsl(11 81% 57% / 0.7)" }}>{item.hours}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                className="mx-5 h-[1px]"
                style={{
                  background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.3), transparent)",
                }}
              />

              {/* Form */}
              <div className="px-5 py-4 space-y-3.5">
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
                      const formatted = e.target.value
                        .toLowerCase()
                        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
                      setName(formatted);
                      if (errors.name) setErrors((prev) => { const { name, ...rest } = prev; return rest; });
                    }}
                    placeholder="Ex: João Silva"
                    maxLength={100}
                    className={`${inputBaseStyle} cw-input ${errors.name ? "cw-input-error" : ""}`}
                    style={getInputBorderStyle(!!errors.name)}
                  />
                  {errors.name && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{errors.name}</p>}
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
                    <WhatsAppIcon className="w-3 h-3" />
                    Seu WhatsApp <span className="text-primary/70">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={phone}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "").slice(0, 11);
                      setPhone(formatPhone(raw));
                      if (errors.phone) setErrors((prev) => { const { phone, ...rest } = prev; return rest; });
                    }}
                    placeholder="(00) 00000-0000"
                    maxLength={20}
                    className={`${inputBaseStyle} cw-input ${errors.phone ? "cw-input-error" : ""}`}
                    style={getInputBorderStyle(!!errors.phone)}
                  />
                  {errors.phone && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{errors.phone}</p>}
                </div>

                {/* Topic */}
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
                    <HelpCircle className="w-3 h-3" />
                    Qual o assunto? <span className="text-primary/70">*</span>
                  </label>
                  <Select value={selectedTopic} onValueChange={(v) => { setSelectedTopic(v); if (errors.topic) setErrors((prev) => { const { topic, ...rest } = prev; return rest; }); }}>
                    <SelectTrigger
                      className={`w-full rounded-lg text-sm border-0 ring-0 cw-input ${errors.topic ? "cw-input-error" : ""} ${
                        !selectedTopic ? "text-white/35" : "text-white"
                      } focus:ring-2 focus:ring-[hsl(11_81%_57%_/_0.35)] focus:border-[hsl(11_81%_57%_/_0.5)]`}
                      style={getInputBorderStyle(!!errors.topic)}
                    >
                      <SelectValue placeholder="Toque para escolher" />
                    </SelectTrigger>
                    <SelectContent
                      className="rounded-lg border-0 z-[200]"
                      position="popper"
                      sideOffset={4}
                      align="start"
                      style={{
                        background: "hsl(0 0% 16% / 0.98)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid hsl(0 0% 100% / 0.1)",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                        width: "var(--radix-select-trigger-width)",
                      }}
                    >
                      {TOPIC_OPTIONS.map((topic) => (
                        <SelectItem
                          key={topic}
                          value={topic}
                          className="text-sm text-white/70 cursor-pointer focus:bg-white/10 focus:text-white data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
                        >
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.topic && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{errors.topic}</p>}
                </div>

                {/* Optional details with mic */}
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
                    <MessageSquare className="w-3 h-3" />
                    Conte mais sobre o que precisa <span className="text-primary/70">*</span>
                  </label>

                  <div className="relative">
                    <textarea
                      value={details}
                      onChange={(e) => { setDetails(e.target.value); if (errors.details) setErrors((prev) => { const { details, ...rest } = prev; return rest; }); }}
                      placeholder={isTranscribing ? "Processando áudio..." : "Descreva brevemente ou grave um áudio..."}
                      rows={3}
                      maxLength={500}
                      disabled={isTranscribing}
                      className={`${inputBaseStyle} pr-14 resize-none disabled:opacity-50 cw-input ${errors.details ? "cw-input-error" : ""}`}
                      style={getInputBorderStyle(!!errors.details)}
                      onFocus={() => setIsDetailsFocused(true)}
                      onBlur={() => setIsDetailsFocused(false)}
                    />

                    {/* Mic button inside textarea */}
                    <AnimatePresence>
                      {(!isDetailsFocused || isRecording || isTranscribing) && !isScrolling && (
                        <motion.div
                          key="mic-group"
                          className="absolute"
                          style={{ width: 30, height: 30, right: 8, bottom: 14 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          {/* Double pulse rings */}
                          {!isRecording && !isTranscribing && (
                            <>
                              <motion.div
                                className="absolute inset-0 rounded-full pointer-events-none motion-reduce:hidden"
                                style={{ border: "1.5px solid hsl(11 81% 57% / 0.25)" }}
                                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                              />
                              <motion.div
                                className="absolute inset-0 rounded-full pointer-events-none motion-reduce:hidden"
                                style={{ border: "1px solid hsl(11 81% 57% / 0.15)" }}
                                animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                              />
                            </>
                          )}
                          <motion.button
                            type="button"
                            onClick={isRecording ? stopRecording : startRecording}
                            disabled={isTranscribing}
                            className="w-full h-full flex items-center justify-center rounded-full disabled:opacity-40 cursor-pointer"
                            style={{
                              background: isRecording
                                ? "hsl(0 84% 55% / 0.25)"
                                : isTranscribing
                                ? "hsl(0 0% 100% / 0.06)"
                                : "hsl(0 0% 100% / 0.08)",
                              backdropFilter: "blur(8px)",
                              border: `1px solid ${isRecording ? "hsl(0 84% 60% / 0.35)" : "hsl(0 0% 100% / 0.15)"}`,
                              boxShadow: isRecording
                                ? "0 0 14px hsl(0 84% 55% / 0.3)"
                                : "0 0 8px hsl(11 81% 57% / 0.08)",
                            }}
                            whileHover={isTranscribing ? {} : {
                              background: isRecording ? "hsl(0 84% 55% / 0.35)" : "hsl(11 81% 57% / 0.15)",
                              borderColor: isRecording ? "hsl(0 84% 60% / 0.5)" : "hsl(11 81% 57% / 0.5)",
                              boxShadow: "0 0 18px hsl(11 81% 57% / 0.3), 0 0 36px hsl(11 81% 57% / 0.1)",
                              scale: 1.15,
                            }}
                            whileTap={isTranscribing ? {} : { scale: 0.88 }}
                            animate={isRecording ? {
                              borderColor: ["hsl(0 84% 60% / 0.35)", "hsl(0 84% 60% / 0.7)", "hsl(0 84% 60% / 0.35)"],
                              boxShadow: [
                                "0 0 14px hsl(0 84% 55% / 0.3)",
                                "0 0 22px hsl(0 84% 55% / 0.5)",
                                "0 0 14px hsl(0 84% 55% / 0.3)",
                              ],
                            } : {}}
                            transition={isRecording ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : { type: "spring", stiffness: 350, damping: 18 }}
                          >
                            {isTranscribing ? (
                              <Loader2 className="w-4 h-4 text-white/60 animate-spin" />
                            ) : isRecording ? (
                              <motion.div
                                className="w-2.5 h-2.5 rounded-[2px]"
                                style={{ background: "hsl(0 84% 65%)" }}
                                animate={{ scale: [1, 0.8, 1] }}
                                transition={{ duration: 0.7, repeat: Infinity }}
                              />
                            ) : (
                              <Mic className="text-white/60" style={{ width: 14, height: 14 }} strokeWidth={2.2} />
                            )}
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Recording indicator */}
                  <AnimatePresence>
                    {isRecording && (
                      <motion.div
                        className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg"
                        style={{
                          background: "hsl(0 84% 60% / 0.08)",
                          border: "1px solid hsl(0 84% 60% / 0.15)",
                        }}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "hsl(0 84% 60%)" }} />
                          <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "hsl(0 84% 60%)" }} />
                        </span>
                        <span className="text-[10px] text-white/50 leading-relaxed">
                          Gravando... toque para parar
                        </span>
                      </motion.div>
                    )}
                    {isTranscribing && (
                      <motion.div
                        className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg"
                        style={{
                          background: "hsl(11 81% 57% / 0.08)",
                          border: "1px solid hsl(11 81% 57% / 0.15)",
                        }}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <Loader2 className="w-3 h-3 text-white/40 animate-spin shrink-0" />
                        <span className="text-[10px] text-white/50">Processando áudio...</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {errors.details && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{errors.details}</p>}
                </div>

                {/* Submit */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-lg font-semibold text-sm tracking-wide text-white cursor-pointer relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #25D366, #128C7E)",
                    boxShadow: "0 4px 20px rgba(37,211,102,0.25)",
                  }}
                  whileHover={isLoading ? {} : {
                    scale: 1.02,
                    boxShadow: "0 0 25px rgba(37,211,102,0.5), 0 0 50px rgba(37,211,102,0.15)",
                  }}
                  whileTap={isLoading ? {} : { scale: 0.98 }}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <WhatsAppIcon className="w-5 h-5" />
                  )}
                  {isLoading ? "Gerando sua mensagem..." : "Continuar no WhatsApp"}
                  
                </motion.button>

                <p className="text-[9px] text-white/30 text-center leading-relaxed pt-2 pb-1">
                  Ao enviar, seus dados serão usados apenas para atendimento, conforme a LGPD (Lei nº 13.709/2018).
                </p>
              </div>

              {/* Bottom scroll fade */}
              <div
                className="sticky bottom-0 left-0 right-0 h-3 pointer-events-none"
                style={{ background: "linear-gradient(to top, hsl(0 0% 14% / 0.92), transparent)" }}
              />
            </div>

            {/* Bottom light strip */}
            <div
              className="h-[1px] shrink-0"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.4), transparent)",
              }}
            />
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactWidget;
