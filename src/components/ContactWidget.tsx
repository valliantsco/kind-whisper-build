import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Send, User, Phone, HelpCircle, ChevronDown, MessageSquare } from "lucide-react";
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
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
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

  const inputBase =
    "w-full px-4 py-3 rounded-xl border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-200";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-0 sm:px-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-foreground/50 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            variants={panelVariants}
            className="relative w-full sm:max-w-[420px] bg-card rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[94vh] flex flex-col"
            style={{
              boxShadow:
                "0 25px 60px -12px rgba(0,0,0,0.25), 0 0 0 1px hsl(var(--border) / 0.5), 0 0 80px -20px hsl(var(--primary) / 0.1)",
            }}
          >
            {/* Animated top gradient bar */}
            <motion.div
              className="h-1 shrink-0"
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--primary)), hsl(11 90% 65%), hsl(var(--primary)))",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 overscroll-contain">
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4">
                {/* Subtle corner glow */}
                <div
                  className="absolute top-0 right-0 w-40 h-40 pointer-events-none opacity-40"
                  style={{
                    background:
                      "radial-gradient(circle at top right, hsl(var(--primary) / 0.08), transparent 70%)",
                  }}
                />

                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <h3 className="text-xl font-bold text-card-foreground leading-tight tracking-tight">
                      Fale com um especialista da MS Eletric
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                      Preencha rapidamente e continue o atendimento pelo WhatsApp.
                    </p>
                  </div>
                  <motion.button
                    onClick={onClose}
                    className="p-2 rounded-xl text-muted-foreground hover:text-card-foreground hover:bg-muted/80 transition-all duration-200"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Status + hours combined card */}
                <div className="mt-4 p-3.5 rounded-2xl bg-muted/40 border border-border/40">
                  <div className="flex items-center justify-between">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        isOnline
                          ? "bg-green-500/10 text-green-600"
                          : "bg-red-500/10 text-red-600"
                      }`}
                    >
                      <span className="relative flex h-2 w-2">
                        {isOnline && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        )}
                        <span
                          className={`relative inline-flex rounded-full h-2 w-2 ${
                            isOnline ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                      </span>
                      {isOnline ? "Online agora" : "Voltamos às 08:00"}
                    </div>
                    <Clock className="w-3.5 h-3.5 text-muted-foreground/60" />
                  </div>

                  <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
                    {businessHoursInfo.map((item) => (
                      <span key={item.day} className="text-[11px] text-muted-foreground">
                        <span className="font-medium text-card-foreground/70">
                          {item.day}:
                        </span>{" "}
                        {item.hours}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="mx-6">
                <div
                  className="h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, hsl(var(--border) / 0.6), transparent)",
                  }}
                />
              </div>

              {/* Form */}
              <div className="px-6 py-5 space-y-4">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-card-foreground/80 mb-2 uppercase tracking-wider">
                    <User className="w-3.5 h-3.5 text-primary/60" />
                    Nome
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    maxLength={100}
                    className={`${inputBase} ${
                      errors.name ? "border-destructive ring-1 ring-destructive/20" : "border-input"
                    }`}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive mt-1.5 font-medium"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-card-foreground/80 mb-2 uppercase tracking-wider">
                    <Phone className="w-3.5 h-3.5 text-primary/60" />
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    maxLength={20}
                    className={`${inputBase} ${
                      errors.phone ? "border-destructive ring-1 ring-destructive/20" : "border-input"
                    }`}
                  />
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive mt-1.5 font-medium"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </div>

                {/* Topic dropdown */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-card-foreground/80 mb-2 uppercase tracking-wider">
                    <HelpCircle className="w-3.5 h-3.5 text-primary/60" />
                    Como podemos te ajudar?
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className={`${inputBase} appearance-none pr-10 cursor-pointer ${
                        !selectedTopic ? "text-muted-foreground/60" : ""
                      } ${errors.topic ? "border-destructive ring-1 ring-destructive/20" : "border-input"}`}
                    >
                      <option value="" disabled>
                        Selecione um assunto
                      </option>
                      {TOPIC_OPTIONS.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
                  </div>
                  {errors.topic && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive mt-1.5 font-medium"
                    >
                      {errors.topic}
                    </motion.p>
                  )}
                </div>

                {/* Optional details */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-card-foreground/80 mb-2 uppercase tracking-wider">
                    <MessageSquare className="w-3.5 h-3.5 text-primary/60" />
                    Detalhes
                    <span className="text-muted-foreground/50 font-normal normal-case tracking-normal text-[10px]">
                      (opcional)
                    </span>
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Ex: tenho interesse em uma moto para delivery"
                    rows={2}
                    maxLength={500}
                    className={`${inputBase} resize-none`}
                  />
                </div>
              </div>
            </div>

            {/* Sticky footer with CTA */}
            <div className="shrink-0 px-6 pb-6 pt-3 bg-gradient-to-t from-card via-card to-card/0">
              <motion.button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm tracking-wide text-primary-foreground relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                  boxShadow:
                    "0 8px 32px rgba(37,211,102,0.3), 0 2px 8px rgba(37,211,102,0.2)",
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow:
                    "0 12px 40px rgba(37,211,102,0.4), 0 4px 12px rgba(37,211,102,0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPosition: ["-100% 0%", "200% 0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                />
                <WhatsAppIcon className="w-5 h-5" />
                Falar com especialista no WhatsApp
                <Send className="w-4 h-4" />
              </motion.button>

              <p className="text-[10px] text-muted-foreground/60 text-center mt-3">
                Você será direcionado para o WhatsApp para continuar o atendimento.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactWidget;
