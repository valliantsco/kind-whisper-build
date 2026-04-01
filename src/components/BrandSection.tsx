import { Award, TrendingUp, Star, Trophy, Medal, Gem } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const awards = [
  { icon: Award, badge: "Red Dot Award", title: "Prêmio de Design Internacional", text: "Reconhecimento global em excelência de design — Red Dot e iF Design Award." },
  { icon: Trophy, badge: "French Design Award", title: "Gold & Platinum Winner 2024", text: "Premiações de ouro e platina no French Design Awards por inovação em veículos elétricos." },
  { icon: Star, badge: "TITAN Awards", title: "Platinum Winner 2024", text: "Destaque máximo no TITAN Business Awards em tecnologia e manufatura." },
  { icon: TrendingUp, badge: "Forbes China", title: "Top 50 Marcas do Ano", text: "AIMA entre as 50 marcas mais valiosas da China pela Forbes." },
  { icon: Medal, badge: "London Design Awards", title: "Platinum Winner 2024", text: "Reconhecimento platina em design de produto pela London Design Awards." },
  { icon: Gem, badge: "CBPI — Poder de Marca", title: "1º lugar no setor nacional", text: "Primeiro lugar em poder de marca no índice CBPI — liderança contínua no setor." },
];

const stats = [
  { value: "6+", label: "Prêmios internacionais" },
  { value: "50+", label: "Países com presença" },
  { value: "#1", label: "Poder de marca no setor" },
];

const BrandSection = () => {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-card relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5" style={{ background: "radial-gradient(circle, hsl(11 81% 57%) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 opacity-5" style={{ background: "radial-gradient(circle, hsl(11 81% 57%) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-6"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4"
          >
            Marca autorizada AIMA
          </motion.span>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-4">
            A marca líder mundial em veículos elétricos agora na{" "}
            <span className="text-primary">MS Eletric</span>.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A MS Eletric amplia o portfólio com a AIMA, referência global em mobilidade elétrica, reconhecida por liderança, força de marca e premiações internacionais de design.
          </p>
        </motion.div>

        {/* Animated stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-8 md:gap-16 mb-14 flex-wrap"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-center"
            >
              <div className="font-display font-black text-4xl md:text-5xl gradient-text">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Awards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-background rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <award.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <div className="min-w-0">
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md mb-2">
                    {award.badge}
                  </span>
                  <h3 className="font-display font-bold text-base mb-1">{award.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{award.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="rounded-2xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all" asChild>
            <a href="/modelos">Ver modelos disponíveis</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandSection;
