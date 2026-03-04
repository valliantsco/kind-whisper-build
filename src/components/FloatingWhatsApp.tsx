import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const BUSINESS_HOURS: Record<number, [number, number] | null> = {
  0: null,            // Domingo - Fechado
  1: [8, 18],         // Segunda
  2: [8, 18],         // Terça
  3: [8, 18],         // Quarta
  4: [8, 18],         // Quinta
  5: [8, 18],         // Sexta
  6: [8, 12],         // Sábado
};

const isWithinBusinessHours = (): boolean => {
  const now = new Date();
  const day = now.getDay();
  const hours = BUSINESS_HOURS[day];
  if (!hours) return false;
  const currentHour = now.getHours();
  return currentHour >= hours[0] && currentHour < hours[1];
};

const FloatingWhatsApp = () => {
  const [isOnline, setIsOnline] = useState(isWithinBusinessHours);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(isWithinBusinessHours());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.a
      href="https://wa.me/5500000000000?text=Olá! Gostaria de saber mais sobre os veículos elétricos."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      {isOnline ? (
        <>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        </>
      ) : (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
      )}
    </motion.a>
  );
};

export default FloatingWhatsApp;
