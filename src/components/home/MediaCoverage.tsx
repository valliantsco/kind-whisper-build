import { motion } from "framer-motion";
import { ExternalLink, Newspaper, TrendingUp, Award } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";

interface MediaArticle {
  source: string;
  sourceIcon: "newspaper" | "trending" | "award";
  headline: string;
  excerpt: string;
  date: string;
  url: string;
  featured?: boolean;
}

const ARTICLES: MediaArticle[] = [
  {
    source: "G1",
    sourceIcon: "newspaper",
    headline: "MS Electric aposta em mobilidade elétrica acessível e cresce 300% em dois anos",
    excerpt: "A empresa mineira se destaca no mercado nacional com modelos que combinam tecnologia, design e preço competitivo.",
    date: "Mar 2026",
    url: "#",
    featured: true,
  },
  {
    source: "Exame",
    sourceIcon: "trending",
    headline: "Como a MS Electric está revolucionando o transporte urbano no Brasil",
    excerpt: "Com foco em delivery e mobilidade pessoal, a marca conquista espaço em mais de 200 cidades.",
    date: "Fev 2026",
    url: "#",
  },
  {
    source: "Forbes Brasil",
    sourceIcon: "award",
    headline: "MS Electric entre as marcas mais inovadoras do setor de mobilidade",
    excerpt: "Ranking destaca a empresa pelo crescimento acelerado e parcerias estratégicas com influenciadores.",
    date: "Jan 2026",
    url: "#",
  },
  {
    source: "UOL",
    sourceIcon: "newspaper",
    headline: "Patinetes e bikes elétricas: MS Electric expande operação para todo o Brasil",
    excerpt: "Nova linha de produtos chega ao mercado com autonomia de até 80km e preços a partir de R$ 2.999.",
    date: "Dez 2025",
    url: "#",
  },
  {
    source: "Valor Econômico",
    sourceIcon: "trending",
    headline: "Mercado de veículos elétricos leves cresce 180% e MS Electric lidera vendas online",
    excerpt: "Empresa registra recorde de vendas no e-commerce e planeja expansão de rede de assistência técnica.",
    date: "Nov 2025",
    url: "#",
  },
];

const iconMap = {
  newspaper: Newspaper,
  trending: TrendingUp,
  award: Award,
};

const MediaCoverage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScroll();
    el.addEventListener("scroll", updateScroll, { passive: true });
    return () => el.removeEventListener("scroll", updateScroll);
  }, [updateScroll]);

  return (
    <section className="relative py-14 md:py-16 bg-foreground overflow-hidden">
      {/* ── Background layers ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.06), transparent)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 90% 90%, hsl(var(--primary) / 0.05) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 relative">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
              MS na Mídia
            </span>
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-16 items-end">
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
              Quem fala da{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
              >
                MS Electric
              </span>
            </h2>

            <p className="text-sm md:text-base text-primary-foreground/50 leading-relaxed max-w-sm">
              A marca que os principais veículos de comunicação do Brasil estão acompanhando.
            </p>
          </div>
        </motion.div>

        {/* ── Featured article ── */}
        {ARTICLES.filter((a) => a.featured).map((article, i) => {
          const Icon = iconMap[article.sourceIcon];
          return (
            <motion.a
              key={`featured-${i}`}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="block mb-8 group"
            >
              <div
                className="relative rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-300 group-hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary) / 0.08) 0%, hsl(0 0% 100% / 0.03) 100%)",
                  border: "1px solid hsl(var(--primary) / 0.15)",
                }}
              >
                {/* Glow accent */}
                <div
                  className="absolute top-0 right-0 w-[300px] h-[200px] pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at top right, hsl(var(--primary) / 0.08), transparent 70%)",
                  }}
                />

                <div className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "hsl(var(--primary) / 0.15)" }}
                      >
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        {article.source}
                      </span>
                      <span className="text-[11px] text-primary-foreground/25 ml-auto md:ml-4">
                        {article.date}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-primary-foreground/90 leading-snug mb-2 group-hover:text-primary-foreground transition-colors">
                      {article.headline}
                    </h3>

                    <p className="text-sm text-primary-foreground/40 leading-relaxed max-w-2xl">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 self-end md:self-center">
                    <span className="text-xs font-semibold">Ler mais</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.a>
          );
        })}

        {/* ── Article cards carousel ── */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {ARTICLES.filter((a) => !a.featured).map((article, i) => {
            const Icon = iconMap[article.sourceIcon];
            return (
              <motion.a
                key={i}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex-shrink-0 snap-start group w-[280px] md:w-[320px]"
              >
                <div
                  className="h-full rounded-xl p-5 transition-all duration-300 group-hover:-translate-y-0.5"
                  style={{
                    background: "hsl(0 0% 100% / 0.03)",
                    border: "1px solid hsl(0 0% 100% / 0.06)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center"
                      style={{ background: "hsl(var(--primary) / 0.1)" }}
                    >
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary-foreground/50">
                      {article.source}
                    </span>
                    <span className="text-[10px] text-primary-foreground/20 ml-auto">
                      {article.date}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-primary-foreground/80 leading-snug mb-2 line-clamp-3 group-hover:text-primary-foreground/95 transition-colors">
                    {article.headline}
                  </h4>

                  <p className="text-xs text-primary-foreground/35 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-1 mt-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-[11px] font-semibold">Ler mais</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-[2px] rounded-full overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.04)" }}>
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
              width: "35%",
              transform: `translateX(${scrollProgress * (100 / 0.35 - 100)}%)`,
              transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              boxShadow: "0 0 6px hsl(var(--primary) / 0.3)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default MediaCoverage;
