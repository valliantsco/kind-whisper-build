import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, UserCheck, Layers, Wrench, CreditCard, Award } from "lucide-react";

const timelineItems = [
  {
    icon: UserCheck,
    title: "Atendimento consultivo",
    desc: "Recomendação por uso, não por pressão de venda.",
  },
  {
    icon: Layers,
    title: "Portfólio completo",
    desc: "Da cidade ao lazer, do trabalho à diversão.",
  },
  {
    icon: Wrench,
    title: "Venda e manutenção",
    desc: "Pós-venda com suporte técnico especializado.",
  },
  {
    icon: CreditCard,
    title: "Pagamento facilitado",
    desc: "Financiamento, consórcio e cartão em até 48x.",
  },
  {
    icon: Award,
    title: "Procedência e marcas reconhecidas",
    desc: "Portfólio com AIMA e marcas premiadas globalmente.",
  },
];

const WhyChooseSection = () => {
  return (
    <section id="por-que" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-4">
            Por que a <span className="text-primary">MS Eletric</span> é a escolha certa?
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto mb-20">
          {timelineItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5 mb-8 last:mb-0"
            >
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                {i < timelineItems.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border mt-2" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="font-display font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-card rounded-2xl border border-border p-8 md:p-10 text-center shadow-sm"
        >
          <h3 className="font-display font-bold text-2xl md:text-3xl mb-3">
            Garantia e suporte para você rodar com confiança.
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Conte com assistência técnica, peças de reposição e suporte dedicado. Sua compra é protegida do início ao pós-venda.
          </p>
          <Button size="lg" className="rounded-xl gap-2 text-base px-8 py-6 font-bold" asChild>
            <a
              href="https://wa.me/5500000000000?text=Olá! Gostaria de saber sobre garantia e suporte."
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5" />
              Falar com suporte no WhatsApp
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
