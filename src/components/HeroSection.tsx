import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap, Wrench, CreditCard, ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const highlights = [
  { icon: Zap, text: "Loja física e online" },
  { icon: Wrench, text: "Venda e manutenção" },
  { icon: CreditCard, text: "Pagamento facilitado em até 48x" },
];

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Real image background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Scooter elétrica em ambiente urbano noturno"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/85 to-foreground/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/30" />
      </div>

      {/* Animated particles/shapes */}
      <motion.div
        className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, hsl(11 81% 57%) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 right-40 w-48 h-48 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, hsl(11 81% 57%) 0%, transparent 70%)" }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-semibold text-primary-foreground uppercase tracking-wider">Mobilidade elétrica</span>
          </motion.div>

          <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05] mb-6">
            Mobilidade elétrica
            <br />
            com <span className="gradient-text">tecnologia</span>
            <br />
            e sustentabilidade.
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl leading-relaxed">
            A MS Eletric reúne soluções 100% elétricas para quem busca praticidade, economia e uma experiência completa — do atendimento ao pós-venda.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h.text}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-2 glass border border-primary-foreground/10 rounded-full px-5 py-2.5 hover:border-primary/40 transition-colors"
              >
                <h.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary-foreground font-medium">{h.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button size="lg" className="text-base px-10 py-7 font-bold rounded-2xl glow-primary hover:scale-105 transition-transform" asChild>
              <a href="#modelos">Conheça nossos modelos</a>
            </Button>
            <p className="text-primary-foreground/40 text-sm mt-4">
              Explore por categoria e encontre a opção ideal para seu uso.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a href="#sobre" className="flex flex-col items-center gap-2 text-primary-foreground/40 hover:text-primary transition-colors">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
