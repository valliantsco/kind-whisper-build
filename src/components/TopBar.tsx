import { useState, useEffect } from "react";

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
    <div className="bg-foreground text-primary-foreground py-2 text-center text-xs md:text-sm overflow-hidden">
      <a
        href={messages[currentIndex].link}
        className="hover:text-primary transition-colors duration-300 inline-block"
      >
        {messages[currentIndex].text}
      </a>
    </div>
  );
};

export default TopBar;
