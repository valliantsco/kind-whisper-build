import { Award, TrendingUp, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const cards = [
  {
    icon: Award,
    title: "Honra de prêmio de design internacional",
    text: "Reconhecimentos internacionais em design, como Red Dot / iF.",
  },
  {
    icon: TrendingUp,
    title: "Honra de liderança global de vendas",
    text: "Marca reconhecida por liderança global em duas rodas elétricas.",
  },
  {
    icon: Star,
    title: "Honra de prêmio do setor nacional",
    text: "Destaque de marca e liderança contínua no setor.",
  },
];

const BrandSection = () => {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-4">
            A marca líder mundial em veículos elétricos agora na{" "}
            <span className="text-primary">MS Eletric</span>.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A MS Eletric amplia o portfólio com a AIMA, referência global em mobilidade elétrica, reconhecida por liderança, força de marca e premiações internacionais de design.
          </p>
        </motion.div>

        {/* Certificates/Awards visual strip */}
        <div className="flex justify-center gap-6 md:gap-10 mb-16 flex-wrap">
          {["AIMA", "Red Dot", "iF Design"].map((badge) => (
            <div
              key={badge}
              className="bg-muted rounded-xl px-6 py-4 text-center border border-border"
            >
              <div className="font-display font-bold text-foreground text-sm md:text-base">{badge}</div>
              <div className="text-xs text-muted-foreground mt-1">Certificação</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-background rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="rounded-xl" asChild>
            <a href="#modelos">Ver modelos disponíveis</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
