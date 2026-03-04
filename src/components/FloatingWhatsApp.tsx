import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useBusinessHours } from "@/hooks/useBusinessHours";

const FloatingWhatsApp = () => {
  const isOnline = useBusinessHours();

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
