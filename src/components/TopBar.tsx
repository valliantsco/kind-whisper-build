import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  { text: "Financiamento | Consórcio | Cartão de crédito — até 48x", link: "#modelos" },
  { text: "Loja física + suporte: compra com orientação e pós-venda", link: "#por-que" },
  { text: "Mobilidade 100% elétrica: economia e sustentabilidade", link: "#modelos" },
];

const TopBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-foreground text-primary-foreground py-2 text-center text-xs md:text-sm overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.a
          key={currentIndex}
          href={messages[currentIndex].link}
          className="hover:text-primary transition-colors duration-300 inline-block"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {messages[currentIndex].text}
        </motion.a>
      </AnimatePresence>
    </div>
  );
};

export default TopBar;
