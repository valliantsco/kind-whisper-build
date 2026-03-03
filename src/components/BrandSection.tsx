import { Award, TrendingUp, Star, Trophy, Medal, Gem } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const awards = [
  {
    icon: Award,
    badge: "Red Dot Award",
    title: "Prêmio de Design Internacional",
    text: "Reconhecimento global em excelência de design — Red Dot e iF Design Award.",
  },
  {
    icon: Trophy,
    badge: "French Design Award",
    title: "Gold & Platinum Winner 2024",
    text: "Premiações de ouro e platina no French Design Awards por inovação em veículos elétricos.",
  },
  {
    icon: Star,
    badge: "TITAN Awards",
    title: "Platinum Winner 2024",
    text: "Destaque máximo no TITAN Business Awards em tecnologia e manufatura.",
  },
  {
    icon: TrendingUp,
    badge: "Forbes China",
    title: "Top 50 Marcas do Ano",
    text: "AIMA entre as 50 marcas mais valiosas da China pela Forbes — liderança em duas rodas elétricas.",
  },
  {
    icon: Medal,
    badge: "London Design Awards",
    title: "Platinum Winner 2024",
    text: "Reconhecimento platina em design de produto pela London Design Awards.",
  },
  {
    icon: Gem,
    badge: "CBPI — Poder de Marca",
    title: "1º lugar no setor nacional",
    text: "Primeiro lugar em poder de marca no índice CBPI — liderança contínua no setor.",
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
          className="text-center max-w-3xl mx-auto mb-6"
        >
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-4">
            A marca líder mundial em veículos elétricos agora na{" "}
            <span className="text-primary">MS Eletric</span>.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A MS Eletric amplia o portfólio com a AIMA, referência global em
            mobilidade elétrica, reconhecida por liderança, força de marca e
            premiações internacionais de design.
          </p>
        </motion.div>

        {/* Stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center gap-8 md:gap-16 mb-14 flex-wrap"
        >
          {[
            { value: "6+", label: "Prêmios internacionais" },
            { value: "50+", label: "Países com presença" },
            { value: "#1", label: "Poder de marca no setor" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-black text-3xl md:text-4xl text-primary">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Awards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-background rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <award.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md mb-2">
                    {award.badge}
                  </span>
                  <h3 className="font-display font-bold text-base mb-1">
                    {award.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {award.text}
                  </p>
                </div>
              </div>
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
