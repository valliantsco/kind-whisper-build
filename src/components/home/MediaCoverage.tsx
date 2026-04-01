import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import mediaFeatured from "@/assets/media/media-featured.jpg";
import mediaConsumers from "@/assets/media/media-consumers.jpg";
import mediaProduction from "@/assets/media/media-production.jpg";
import mediaSustainability from "@/assets/media/media-sustainability.jpg";

interface MediaArticle {
  source: string;
  headline: string;
  excerpt: string;
  date: string;
  url: string;
  image: string;
}

const FEATURED: MediaArticle = {
  source: "Canal VE",
  headline: "Autarquia de Uberlândia adota 10 novas motos elétricas da MS Eletric na frota",
  excerpt: "O DMAE investiu R$ 240 mil em motos elétricas que devem reduzir 9,8 toneladas de CO2 por ano, equivalente à preservação de 42 árvores.",
  date: "Dez 2023",
  url: "https://canalve.com.br/autarquia-de-uberlandia-adota-10-novas-motos-eletricas-na-frota/",
  image: mediaFeatured,
};

const ARTICLES: MediaArticle[] = [
  {
    source: "Diário de Uberlândia",
    headline: "Motos elétricas conquistam consumidores em Uberlândia",
    excerpt: "Crescimento da procura por veículos elétricos na cidade reflete tendência nacional de mobilidade sustentável.",
    date: "2024",
    url: "https://diariodeuberlandia.com.br/noticia/29455/motos-eletricas-conquistam-consumidores-em-uberlandia",
    image: mediaConsumers,
  },
  {
    source: "Diário do Comércio",
    headline: "MS Eletric produzirá veículo de duas rodas",
    excerpt: "Empresa mineira expande operação e anuncia produção própria de veículos elétricos de duas rodas para o mercado brasileiro.",
    date: "Set 2021",
    url: "https://diariodocomercio.com.br/economia/ms-eletric-produzira-veiculo-de-duas-rodas/",
    image: mediaProduction,
  },
  {
    source: "Portal Comunique-se",
    headline: "Alto número de veículos poluentes no Brasil chama atenção para a eletromobilidade",
    excerpt: "A grande quantidade de veículos poluentes traz à tona a importância da inovação e sustentabilidade na mobilidade urbana.",
    date: "Set 2021",
    url: "https://portal.comunique-se.com.br/262085-alto-numero-de-veiculos-poluentes-no-brasil-chama-atencao-para-eletromobilidade/",
    image: mediaSustainability,
  },
];

const MediaCoverage = () => {
  return (
    <section className="relative py-14 md:py-20 overflow-hidden">
      {/* ── Section-specific effect: newspaper column lines ── */}
      {[20, 40, 60, 80].map((left, i) => (
        <motion.div
          key={i}
          className="absolute top-[10%] pointer-events-none w-[1px]"
          style={{
            left: `${left}%`,
            background: "linear-gradient(to bottom, transparent, hsl(0 0% 100% / 0.03), transparent)",
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

          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
            Quem fala da{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
            >
              MS Electric
            </span>
          </h2>
          <p className="text-sm md:text-base text-primary-foreground/45 leading-relaxed mt-4 max-w-lg ml-auto">
            A força da marca também aparece na imprensa. A MS Electric vem ganhando espaço em veículos de comunicação que ajudam a ampliar sua autoridade e reforçar sua presença no setor.
          </p>
        </motion.div>

        {/* ── Featured article — magazine hero ── */}
        <motion.a
          href={FEATURED.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="block mb-6 group"
        >
          <div className="relative rounded-2xl overflow-hidden">
            {/* Image */}
            <div className="relative aspect-[16/7] md:aspect-[21/9] overflow-hidden">
              <img
                src={FEATURED.image}
                alt={FEATURED.headline}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width={960}
                height={540}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, hsl(0 0% 4% / 0.95) 0%, hsl(0 0% 4% / 0.6) 40%, hsl(0 0% 4% / 0.2) 70%, transparent 100%)",
                }}
              />
              {/* Subtle primary glow */}
              <div
                className="absolute bottom-0 left-0 w-[400px] h-[200px] pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at bottom left, hsl(var(--primary) / 0.15), transparent 70%)",
                }}
              />
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-primary"
                  style={{ background: "hsl(var(--primary) / 0.15)", backdropFilter: "blur(8px)" }}
                >
                  {FEATURED.source}
                </span>
                <span className="text-[11px] text-primary-foreground/35">{FEATURED.date}</span>
              </div>

              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-primary-foreground leading-snug max-w-3xl mb-2 group-hover:text-primary transition-colors duration-300">
                {FEATURED.headline}
              </h3>

              <p className="text-sm text-primary-foreground/45 leading-relaxed max-w-2xl hidden md:block">
                {FEATURED.excerpt}
              </p>

              <div className="flex items-center gap-1.5 mt-4 text-primary">
                <span className="text-xs font-semibold tracking-wide uppercase">Ler matéria completa</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </motion.a>

        {/* ── Article grid — editorial cards ── */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {ARTICLES.map((article, i) => (
            <motion.a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group block"
            >
              <div
                className="h-full rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 p-5"
                style={{
                  background: "hsl(0 0% 100% / 0.025)",
                  border: "1px solid hsl(0 0% 100% / 0.06)",
                }}
              >
                <span className="text-[10px] text-primary-foreground/25 uppercase tracking-wider">
                  {article.date}
                </span>

                <div className="flex items-center gap-2 mt-2 mb-3">
                  <span
                    className="px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider text-primary"
                    style={{ background: "hsl(var(--primary) / 0.1)" }}
                  >
                    {article.source}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-primary-foreground/85 leading-snug mb-2 line-clamp-2 group-hover:text-primary-foreground transition-colors">
                  {article.headline}
                </h4>

                <p className="text-xs text-primary-foreground/35 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-1 mt-4 text-primary opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                  <span className="text-[11px] font-semibold">Ler mais</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaCoverage;
