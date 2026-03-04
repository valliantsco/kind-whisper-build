import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Send, User, Phone, MessageSquare } from "lucide-react";
import { useBusinessHours } from "@/hooks/useBusinessHours";

const WHATSAPP_NUMBER = "5500000000000";

const businessHoursInfo = [
  { day: "Seg - Sex", hours: "08:00 – 18:00" },
  { day: "Sábado", hours: "08:00 – 12:00" },
  { day: "Domingo", hours: "Fechado" },
];

/* WhatsApp SVG */
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
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 25, stiffness: 300 },
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
  const [interest, setInterest] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) errs.name = "Informe seu nome";
    else if (trimmedName.length > 100) errs.name = "Nome muito longo";

    if (!trimmedPhone) errs.phone = "Informe seu telefone";
    else if (!/^[\d\s()+-]{8,20}$/.test(trimmedPhone))
      errs.phone = "Telefone inválido";

    if (interest.length > 500) errs.interest = "Mensagem muito longa";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [name, phone, interest]);

  const handleSubmit = useCallback(() => {
    if (!validate()) return;

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedInterest = interest.trim();

    let message = `Olá! Meu nome é ${trimmedName}.\nTelefone: ${trimmedPhone}`;
    if (trimmedInterest) {
      message += `\n\n${trimmedInterest}`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank",
      "noopener,noreferrer"
    );

    // Reset
    setName("");
    setPhone("");
    setInterest("");
    setErrors({});
    onClose();
  }, [name, phone, interest, validate, onClose]);

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
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            variants={panelVariants}
            className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden border border-border/50"
          >
            {/* Top gradient bar */}
            <div
              className="h-1"
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--primary)), hsl(11 90% 65%), hsl(var(--primary)))",
              }}
            />

            {/* Header */}
            <div className="flex items-start justify-between p-5 pb-3">
              <div>
              <h3 className="text-lg font-bold text-card-foreground">
                  Fale com especialista em MS Eletric
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Preencha seus dados e fale com especialista pelo WhatsApp
                </p>
              </div>
              <motion.button
                onClick={onClose}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-card-foreground hover:bg-muted transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Status chip */}
            <div className="px-5 pb-4">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
                  isOnline
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                <span
                  className="relative flex h-2 w-2"
                >
                  {isOnline && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isOnline ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                </span>
                {isOnline ? "Estamos online agora!" : "Fora do horário de atendimento"}
              </div>

              {/* Business hours */}
              <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-muted/50 border border-border/50">
                <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                  {businessHoursInfo.map((item) => (
                    <span
                      key={item.day}
                      className="text-xs text-muted-foreground"
                    >
                      <span className="font-medium text-card-foreground">
                        {item.day}:
                      </span>{" "}
                      {item.hours}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="px-5 pb-5 space-y-3">
              {/* Name */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-card-foreground mb-1.5">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                  Nome *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  maxLength={100}
                  className={`w-full px-3 py-2.5 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${
                    errors.name ? "border-destructive" : "border-input"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-card-foreground mb-1.5">
                  <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                  Telefone *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(00) 00000-0000"
                  maxLength={20}
                  className={`w-full px-3 py-2.5 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${
                    errors.phone ? "border-destructive" : "border-input"
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Interest / message */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-card-foreground mb-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                  Mensagem{" "}
                  <span className="text-muted-foreground font-normal">(opcional)</span>
                </label>
                <textarea
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  placeholder="Qual modelo te interessa? Tem alguma dúvida?"
                  rows={2}
                  maxLength={500}
                  className={`w-full px-3 py-2.5 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none ${
                    errors.interest ? "border-destructive" : "border-input"
                  }`}
                />
                {errors.interest && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.interest}
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm tracking-wide shadow-lg"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(37,211,102,0.4), 0 0 40px rgba(37,211,102,0.15)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <WhatsAppIcon className="w-5 h-5" />
                Iniciar conversa no WhatsApp
                <Send className="w-4 h-4" />
              </motion.button>

              <p className="text-[10px] text-muted-foreground text-center pt-1">
                Você será redirecionado para o WhatsApp com seus dados preenchidos.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactWidget;
