import { motion } from "framer-motion";

import { MessageCircle, UserCheck, Layers, Wrench, CreditCard, Award, CheckCircle2 } from "lucide-react";

const timelineItems = [
  { icon: UserCheck, title: "Atendimento consultivo", desc: "Recomendação por uso, não por pressão de venda." },
  { icon: Layers, title: "Portfólio completo", desc: "Da cidade ao lazer, do trabalho à diversão." },
  { icon: Wrench, title: "Venda e manutenção", desc: "Pós-venda com suporte técnico especializado." },
  { icon: CreditCard, title: "Pagamento facilitado", desc: "Financiamento, consórcio e cartão em até 48x." },
  { icon: Award, title: "Procedência e marcas reconhecidas", desc: "Portfólio com AIMA e marcas premiadas globalmente." },
];

const WhyChooseSection = () => {
  return (
    <section id="por-que" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(11 81% 57%) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4"
          >
            Diferenciais
          </motion.span>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-4">
            Por que a <span className="text-primary">MS Eletric</span> é a escolha certa?
          </h2>
        </motion.div>

        {/* Timeline with enhanced design */}
        <div className="max-w-2xl mx-auto mb-20">
          {timelineItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="flex gap-5 mb-8 last:mb-0 group"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:shadow-lg transition-all duration-300"
                >
                  <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </motion.div>
                {i < timelineItems.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.3, duration: 0.4 }}
                    className="w-0.5 flex-1 bg-gradient-to-b from-primary/30 to-border mt-2 origin-top"
                  />
                )}
              </div>
              <div className="pb-8">
                <h3 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee block with gradient border */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto gradient-border bg-card rounded-3xl p-8 md:p-12 text-center shadow-lg"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-display font-bold text-2xl md:text-3xl mb-3">
            Garantia e suporte para você rodar com confiança.
          </h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Conte com assistência técnica, peças de reposição e suporte dedicado. Sua compra é protegida do início ao pós-venda.
          </p>
          <motion.a
            href="https://wa.me/551151996628?text=Olá! Gostaria de saber sobre garantia e suporte."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 text-[11px] sm:text-sm font-bold uppercase tracking-[0.14em] px-8 md:px-10 py-3.5 md:py-4 rounded-xl text-white overflow-visible"
            style={{
              background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
              boxShadow: "0 4px 20px hsl(11 81% 57% / 0.25)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px hsl(11 81% 57% / 0.5), 0 0 50px hsl(11 81% 57% / 0.2)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <MessageCircle className="w-5 h-5" />
            Falar com suporte no WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
