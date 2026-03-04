import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, User, Phone, HelpCircle, MessageSquare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBusinessHours } from "@/hooks/useBusinessHours";

const WHATSAPP_NUMBER = "5500000000000";

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

const ContactWidget = ({ isOpen, onClose }: ContactWidgetProps) => {
  const isOnline = useBusinessHours();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (!name.trim()) errs.name = "Informe seu nome";
    if (!phone.trim()) errs.phone = "Informe seu WhatsApp";
    else if (!/^[\d\s()+-]{8,20}$/.test(phone.trim()))
      errs.phone = "Número inválido";
    if (!selectedTopic) errs.topic = "Selecione um tópico";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [name, phone, selectedTopic]);

  const handleSubmit = useCallback(() => {
    if (!validate()) return;

    let message = `Olá! Meu nome é ${name.trim()}.\nWhatsApp: ${phone.trim()}\nAssunto: ${selectedTopic}`;
    if (details.trim()) message += `\n\nDetalhes: ${details.trim()}`;

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
          <motion.div
            variants={panelVariants}
            className="relative w-full max-w-md rounded-[0.9rem] overflow-hidden max-h-[90vh] flex flex-col"
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

            {/* Ambient glow */}
            <motion.div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, hsl(11 81% 57% / 0.08) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1">
              {/* Header */}
              <div className="flex items-start justify-between p-5 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Fale com um especialista da MS Eletric
                  </h3>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    Preencha rapidamente e continue o atendimento pelo WhatsApp.
                  </p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Status chip */}
              <div className="px-5 pb-4">
                <div
                  className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em] border w-full"
                  style={{
                    background: isOnline ? "hsl(142 76% 36% / 0.12)" : "hsl(0 84% 60% / 0.12)",
                    borderColor: isOnline ? "hsl(142 76% 36% / 0.25)" : "hsl(0 84% 60% / 0.25)",
                    color: isOnline ? "hsl(142 70% 65%)" : "hsl(0 84% 70%)",
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    {isOnline && (
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ background: "hsl(142 76% 50%)" }}
                      />
                    )}
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ background: isOnline ? "hsl(142 76% 50%)" : "hsl(0 84% 60%)" }}
                    />
                  </span>
                  {isOnline ? "Online agora" : "Voltamos às 08:00"}
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
                        {item.hours}
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
                    Nome
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    maxLength={100}
                    className="w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder:text-white/25 focus:outline-none transition-all"
                    style={{
                      background: "hsl(0 0% 100% / 0.06)",
                      border: `1px solid ${errors.name ? "hsl(0 84% 60% / 0.5)" : "hsl(0 0% 100% / 0.08)"}`,
                    }}
                    onFocus={(e) => {
                      if (!errors.name) e.currentTarget.style.borderColor = "hsl(11 81% 57% / 0.5)";
                      e.currentTarget.style.boxShadow = "0 0 0 2px hsl(11 81% 57% / 0.15)";
                    }}
                    onBlur={(e) => {
                      if (!errors.name) e.currentTarget.style.borderColor = "hsl(0 0% 100% / 0.08)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  {errors.name && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{errors.name}</p>}
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
                    <Phone className="w-3 h-3" />
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    maxLength={20}
                    className="w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder:text-white/25 focus:outline-none transition-all"
                    style={{
                      background: "hsl(0 0% 100% / 0.06)",
                      border: `1px solid ${errors.phone ? "hsl(0 84% 60% / 0.5)" : "hsl(0 0% 100% / 0.08)"}`,
                    }}
                    onFocus={(e) => {
                      if (!errors.phone) e.currentTarget.style.borderColor = "hsl(11 81% 57% / 0.5)";
                      e.currentTarget.style.boxShadow = "0 0 0 2px hsl(11 81% 57% / 0.15)";
                    }}
                    onBlur={(e) => {
                      if (!errors.phone) e.currentTarget.style.borderColor = "hsl(0 0% 100% / 0.08)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  {errors.phone && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{errors.phone}</p>}
                </div>

                {/* Topic */}
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
                    <HelpCircle className="w-3 h-3" />
                    Como podemos te ajudar?
                  </label>
                  <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                    <SelectTrigger
                      className={`w-full rounded-lg text-sm border-0 focus:ring-0 ${
                        !selectedTopic ? "text-white/25" : "text-white"
                      }`}
                      style={{
                        background: "hsl(0 0% 100% / 0.06)",
                        border: `1px solid ${errors.topic ? "hsl(0 84% 60% / 0.5)" : "hsl(0 0% 100% / 0.08)"}`,
                      }}
                    >
                      <SelectValue placeholder="Selecione um assunto" />
                    </SelectTrigger>
                    <SelectContent
                      className="rounded-lg border-0"
                      style={{
                        background: "hsl(0 0% 16% / 0.98)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid hsl(0 0% 100% / 0.1)",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
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

                {/* Optional details */}
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
                    <MessageSquare className="w-3 h-3" />
                    Detalhes
                    <span className="font-normal normal-case tracking-normal text-white/30">(opcional)</span>
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Ex: tenho interesse em uma moto para delivery"
                    rows={2}
                    maxLength={500}
                    className="w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder:text-white/25 focus:outline-none transition-all resize-none"
                    style={{
                      background: "hsl(0 0% 100% / 0.06)",
                      border: "1px solid hsl(0 0% 100% / 0.08)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "hsl(11 81% 57% / 0.5)";
                      e.currentTarget.style.boxShadow = "0 0 0 2px hsl(11 81% 57% / 0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "hsl(0 0% 100% / 0.08)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-lg font-semibold text-sm tracking-wide text-white cursor-pointer relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #25D366, #128C7E)",
                    boxShadow: "0 4px 20px rgba(37,211,102,0.25)",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 25px rgba(37,211,102,0.5), 0 0 50px rgba(37,211,102,0.15)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Falar com especialista no WhatsApp
                  
                </motion.button>

                <p className="text-[10px] text-white/30 text-center pt-0.5 pb-1">
                  Você será direcionado para o WhatsApp para continuar o atendimento.
                </p>
              </div>
            </div>

            {/* Bottom light strip */}
            <div
              className="h-[1px] shrink-0"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.4), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactWidget;
