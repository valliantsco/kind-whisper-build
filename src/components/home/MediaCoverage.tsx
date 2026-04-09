import { motion } from "framer-motion";
import mediaFeatured from "@/assets/media-featured.jpg";

const newsItems = [
  {
    source: "Canal VE",
    date: "Dez 2023",
    title: "Autarquia de Uberlândia adota 10 novas motos elétricas da MS Eletric na frota",
    excerpt:
      "O DMAE investiu R$ 240 mil em motos elétricas que devem reduzir 9,8 toneladas de CO2 por ano, equivalente à preservação de 42 árvores.",
    url: "#",
    featured: true,
  },
  {
    source: "Forbes Brasil",
    date: "Nov 2023",
    title: "MS Eletric aposta em mobilidade sustentável e cresce 120% em 2023",
    excerpt:
      "A fabricante mineira de motos elétricas projeta faturamento recorde com expansão da rede de concessionárias pelo país.",
    url: "#",
  },
  {
    source: "Exame",
    date: "Out 2023",
    title: "Como a MS Eletric está transformando a logística urbana no Brasil",
    excerpt:
      "Empresas de delivery e logística last-mile adotam scooters elétricos para reduzir custos operacionais e emissões.",
    url: "#",
  },
  {
    source: "Pequenas Empresas & Grandes Negócios",
    date: "Set 2023",
    title: "Franquia de motos elétricas surge como oportunidade de negócio sustentável",
    excerpt:
      "Modelo de concessionária da MS Eletric atrai empreendedores com investimento acessível e mercado em alta.",
    url: "#",
  },
];

const MediaCoverage = () => {
  const featured = newsItems[0];
  const others = newsItems.slice(1);

  return (
    <section className="relative py-14 md:py-20 overflow-hidden">
      {/* ── Newspaper column lines ── */}
      {[20, 40, 60, 80].map((left, i) => (
        <motion.div
          key={i}
          className="absolute top-[10%] pointer-events-none w-[1px]"
          style={{
            left: `${left}%`,
            background:
              "linear-gradient(to bottom, transparent, hsl(0 0% 100% / 0.03), transparent)",
          }}
          initial={{ height: 0 }}
          whileInView={{ height: "80%" }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2, duration: 1.5, ease: "easeOut" }}
        />
      ))}

      <div className="container mx-auto px-4 relative">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16 text-right"
        >
          <div className="flex items-center gap-3 mb-6 justify-end">
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
              MS na Mídia
            </span>
            <div className="w-8 h-px bg-primary" />
          </div>

          <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
            Quem fala da{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
              }}
            >
              MS Eletric
            </span>
          </h2>
          <p className="text-sm md:text-base text-primary-foreground/45 leading-relaxed mt-4 max-w-lg ml-auto">
            A MS Eletric também vem ganhando espaço na imprensa e em canais que
            acompanham inovação, mobilidade e negócios. É mais um reflexo de uma
            marca que vem se consolidando com presença, estrutura e
            credibilidade.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured card – spans 2 cols on md */}
          <motion.a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden min-h-[360px] md:min-h-[480px] flex flex-col justify-end"
          >
            <img
              src={mediaFeatured}
              alt={featured.title}
              loading="lazy"
              width={800}
              height={512}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

            <div className="relative p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground">
                  {featured.source}
                </span>
                <span className="text-xs text-primary-foreground/50">
                  {featured.date}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-primary-foreground leading-tight mb-3">
                {featured.title}
              </h3>
              <p className="text-sm text-primary-foreground/50 leading-relaxed mb-4 max-w-xl">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary group-hover:gap-3 transition-all">
                Ler matéria completa
                <span aria-hidden>↗</span>
              </span>
            </div>
          </motion.a>

          {/* Smaller text cards */}
          {others.map((item, i) => (
            <motion.a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.1, duration: 0.5 }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm hover:border-primary/20 transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {item.source}
                  </span>
                  <span className="text-xs text-primary-foreground/30">
                    {item.date}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base md:text-lg text-primary-foreground leading-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-primary-foreground/40 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-primary mt-4 group-hover:gap-3 transition-all">
                Ler matéria completa
                <span aria-hidden>↗</span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaCoverage;
