import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap, Wrench, CreditCard } from "lucide-react";

const highlights = [
  { icon: Zap, text: "Loja física e online" },
  { icon: Wrench, text: "Venda e manutenção" },
  { icon: CreditCard, text: "Pagamento facilitado em até 48x" },
];

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Video Background Placeholder */}
      <div className="absolute inset-0 bg-foreground">
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/60" />
        {/* Placeholder pattern for video */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, hsl(11 81% 57% / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 30%, hsl(11 81% 57% / 0.15) 0%, transparent 40%)",
          }} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-6">
            Mobilidade elétrica com tecnologia e sustentabilidade.
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl leading-relaxed">
            A MS Eletric reúne soluções 100% elétricas para quem busca praticidade, economia e uma experiência completa — do atendimento ao pós-venda.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {highlights.map((h) => (
              <div
                key={h.text}
                className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2"
              >
                <h.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary-foreground font-medium">{h.text}</span>
              </div>
            ))}
          </div>

          <div>
            <Button size="lg" className="text-base px-8 py-6 font-bold rounded-xl" asChild>
              <a href="#modelos">Conheça nossos modelos</a>
            </Button>
            <p className="text-primary-foreground/50 text-sm mt-3">
              Explore por categoria e encontre a opção ideal para seu uso.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
