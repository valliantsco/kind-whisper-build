import { motion } from "framer-motion";

const awards = [
  {
    title: "HONRA DE PRÊMIO DE DESIGN INTERNACIONAL DE AIMA",
    subtitle: "Red Dot Award IF",
  },
  {
    title: "HONRA DE LIDERANÇA GLOBAL DE VENDAS DA AIMA",
    subtitle: "Top 50 Melhores Marcas do Ano da Forbes China",
  },
  {
    title: "HONRA DE PRÊMIO DO SETOR NACIONAL DE AIMA",
    subtitle: "Primeiro lugar em Poder de Marca no CBPI",
  },
];

const certificates = [
  { label: "MUSE\nPLATINUM\nWINNER\n2024", rotate: -18, z: 1 },
  { label: "FRENCH\nGOLD\nWINNER\n2024", rotate: -10, z: 2 },
  { label: "TITAN\nPLATINUM\nWINNER\n2024", rotate: -4, z: 3 },
  { label: "AIMA\nGlobal Leading\nBrand", rotate: 0, z: 4 },
  { label: "LONDON\nPLATINUM\n2024", rotate: 4, z: 3 },
  { label: "MUSE\nGOLD\nWINNER\n2024", rotate: 10, z: 2 },
  { label: "FRENCH\nPLATINUM\n2024", rotate: 18, z: 1 },
];

const BrandSection = () => {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        background:
          "linear-gradient(180deg, hsl(210 60% 78%) 0%, hsl(210 30% 88%) 50%, hsl(0 0% 85%) 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-center max-w-4xl mx-auto mb-12 md:mb-16 text-foreground/90 italic"
        >
          A Marca líder mundial em veículos elétricos agora na MS Eletric.
        </motion.h2>

        {/* Certificate cards fan */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-end mb-16 md:mb-20 relative h-[220px] md:h-[320px]"
        >
          {certificates.map((cert, i) => (
            <div
              key={i}
              className="absolute w-[100px] md:w-[160px] lg:w-[180px] aspect-[3/4] rounded-xl shadow-lg border border-white/40 flex items-center justify-center p-3 md:p-4 text-center"
              style={{
                transform: `rotate(${cert.rotate}deg) translateY(${Math.abs(cert.rotate) * 1.2}px)`,
                zIndex: cert.z,
                background:
                  i === 3
                    ? "linear-gradient(135deg, hsl(45 60% 95%), hsl(45 40% 88%))"
                    : i % 2 === 0
                      ? "linear-gradient(135deg, hsl(0 0% 98%), hsl(0 0% 93%))"
                      : "linear-gradient(135deg, hsl(0 0% 15%), hsl(0 0% 22%))",
                color: i % 2 === 0 || i === 3 ? "hsl(0 0% 20%)" : "hsl(0 0% 90%)",
              }}
            >
              <span className="text-[8px] md:text-xs font-bold leading-tight whitespace-pre-line font-display">
                {cert.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Three awards */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="text-center"
            >
              {/* Orange triangle marker */}
              <div className="flex justify-center mb-4">
                <div
                  className="w-0 h-0"
                  style={{
                    borderLeft: "12px solid transparent",
                    borderRight: "12px solid transparent",
                    borderBottom: "18px solid hsl(11 81% 57%)",
                  }}
                />
              </div>
              <h3 className="font-display font-black text-sm md:text-base uppercase tracking-wide mb-2 text-foreground">
                {award.title}
              </h3>
              <p className="text-muted-foreground text-sm italic">{award.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
