import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Calendar, ArrowRight, Newspaper, Quote, ImageIcon } from "lucide-react";
import Header from "@/components/Header";
import HomeFooter from "@/components/home/HomeFooter";
import PopUpContato01 from "@/components/PopUpContato01";
import AnimatedBackground from "@/components/home/AnimatedBackground";
import { NEWS_ITEMS, NEWS_CATEGORIES, type ArticleBlock } from "@/data/news";

function ArticleBlockRenderer({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-base md:text-[17px] text-primary-foreground/60 leading-[1.85] mb-6">
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2 className="font-display font-bold text-xl md:text-2xl text-primary-foreground/90 uppercase tracking-tight mt-10 mb-4">
          {block.text}
        </h2>
      );
    case "image":
      return (
        <figure className="my-8 md:my-10 rounded-2xl overflow-hidden">
          {block.src ? (
            <img
              src={block.src}
              alt={block.alt}
              className="w-full h-auto object-cover max-h-[420px]"
              loading="lazy"
            />
          ) : (
            <div
              className="w-full h-56 md:h-72 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary) / 0.06) 0%, hsl(0 0% 100% / 0.02) 100%)",
                border: "1px dashed hsl(0 0% 100% / 0.08)",
              }}
            >
              <ImageIcon className="w-10 h-10 text-primary/15" />
            </div>
          )}
          {block.caption && (
            <figcaption className="text-[11px] text-primary-foreground/30 mt-3 text-center tracking-wide">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "quote":
      return (
        <blockquote
          className="my-8 md:my-10 pl-6 py-4 relative"
          style={{ borderLeft: "3px solid hsl(var(--primary) / 0.3)" }}
        >
          <Quote className="w-5 h-5 text-primary/20 mb-2" />
          <p className="text-base md:text-lg text-primary-foreground/50 italic leading-relaxed">
            "{block.text}"
          </p>
          {block.author && (
            <cite className="block text-[12px] text-primary-foreground/30 mt-3 not-italic font-semibold uppercase tracking-wider">
              — {block.author}
            </cite>
          )}
        </blockquote>
      );
    default:
      return null;
  }
}

const NewsArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string | undefined>();

  const article = useMemo(() => NEWS_ITEMS.find((n) => n.slug === slug), [slug]);
  const related = useMemo(
    () => NEWS_ITEMS.filter((n) => n.slug !== slug).slice(0, 3),
    [slug]
  );

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "hsl(0 0% 4%)" }}>
        <Header onContactClick={() => setContactOpen(false)} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-primary-foreground/50 text-lg mb-4">Conteúdo não encontrado</p>
            <Link to="/novidades" className="text-primary text-sm underline">
              Voltar para Novidades
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen relative" style={{ background: "hsl(0 0% 4%)" }}>
      <AnimatedBackground />

      <div className="relative z-10">
        <Header onContactClick={() => setContactOpen(true)} />

        <article className="pt-24 md:pt-32 pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-[10px] md:text-[11px] text-primary-foreground/30 uppercase tracking-[0.12em] mb-10 md:mb-14 overflow-x-auto"
            >
              <Link
                to="/novidades"
                className="flex items-center gap-1.5 hover:text-primary transition-colors group shrink-0"
              >
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                Novidades
              </Link>
              <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />
              <span className="text-primary-foreground/50 shrink-0">
                {NEWS_CATEGORIES[article.category]}
              </span>
            </motion.nav>

            {/* Hero area */}
            <div className="max-w-3xl mx-auto">
              {/* Category + Date */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-5"
              >
                <span
                  className="px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-[0.14em] text-primary-foreground/80"
                  style={{
                    background: "hsl(var(--primary) / 0.1)",
                    border: "1px solid hsl(var(--primary) / 0.15)",
                  }}
                >
                  {NEWS_CATEGORIES[article.category]}
                </span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-primary/40" />
                  <time className="text-[11px] text-primary-foreground/35">{formattedDate}</time>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-4"
              >
                {article.title}
              </motion.h1>

              {/* Subtitle */}
              {article.subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-lg md:text-xl text-primary-foreground/50 leading-relaxed mb-8"
                >
                  {article.subtitle}
                </motion.p>
              )}

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="h-[2px] rounded-full mb-10 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.4), transparent)" }}
              />

              {/* Hero image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-2xl overflow-hidden mb-10 md:mb-14"
              >
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-auto object-cover max-h-[480px]"
                  />
                ) : (
                  <div
                    className="w-full h-56 md:h-80 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary) / 0.06) 0%, hsl(0 0% 100% / 0.02) 100%)",
                      border: "1px dashed hsl(0 0% 100% / 0.08)",
                      borderRadius: "1rem",
                    }}
                  >
                    <Newspaper className="w-12 h-12 text-primary/12" />
                  </div>
                )}
              </motion.div>

              {/* Article body */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {article.article?.map((block, i) => (
                  <ArticleBlockRenderer key={i} block={block} />
                )) ?? (
                  <p className="text-base text-primary-foreground/40 leading-relaxed">
                    {article.summary}
                  </p>
                )}
              </motion.div>

              {/* Closing divider */}
              <div
                className="h-px my-12 md:my-16"
                style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.15), transparent)" }}
              />

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl p-8 md:p-10 text-center relative overflow-hidden"
                style={{
                  background: "hsl(var(--primary) / 0.04)",
                  border: "1px solid hsl(var(--primary) / 0.12)",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 100%, hsl(var(--primary) / 0.05) 0%, transparent 70%)" }}
                />
                <h3 className="font-display font-bold text-lg md:text-xl text-primary-foreground uppercase tracking-wide mb-3 relative z-10">
                  Quer saber mais?
                </h3>
                <p className="text-sm text-primary-foreground/40 mb-6 max-w-md mx-auto relative z-10">
                  Fale com nosso time e tire suas dúvidas sobre produtos, eventos e ações da MS Eletric.
                </p>
                <button
                  onClick={() => setContactOpen(true)}
                  className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                    boxShadow: "0 8px 24px -6px hsl(var(--primary) / 0.4)",
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.33 0-4.49-.744-6.255-2.01l-.438-.328-3.205 1.074 1.074-3.205-.328-.438A9.71 9.71 0 012.25 12 9.75 9.75 0 0112 2.25 9.75 9.75 0 0121.75 12 9.75 9.75 0 0112 21.75z" />
                  </svg>
                  Falar com a MS Eletric
                </button>
              </motion.div>
            </div>

            {/* Related news */}
            {related.length > 0 && (
              <div className="max-w-5xl mx-auto mt-16 md:mt-24">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-display font-bold text-lg text-primary-foreground uppercase tracking-wide">
                    Outras atualizações
                  </h3>
                  <Link
                    to="/novidades"
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground/35 hover:text-primary transition-colors group"
                  >
                    Ver todas
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {related.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Link
                        to={`/novidades/${item.slug}`}
                        className="group block rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
                        style={{
                          background: "linear-gradient(145deg, hsl(0 0% 100% / 0.03) 0%, hsl(0 0% 100% / 0.01) 100%)",
                          border: "1px solid hsl(0 0% 100% / 0.06)",
                        }}
                      >
                        <div
                          className="h-36 flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.05) 0%, hsl(0 0% 100% / 0.02) 100%)" }}
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              loading="lazy"
                            />
                          ) : (
                            <Newspaper className="w-7 h-7 text-primary/12" />
                          )}
                          <span
                            className="absolute top-3 left-3 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-primary-foreground/70"
                            style={{
                              background: "hsl(0 0% 0% / 0.5)",
                              backdropFilter: "blur(8px)",
                            }}
                          >
                            {NEWS_CATEGORIES[item.category]}
                          </span>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-1.5 mb-2">
                            <Calendar className="w-2.5 h-2.5 text-primary/40" />
                            <time className="text-[9px] text-primary-foreground/25 uppercase tracking-wider">
                              {new Date(item.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                            </time>
                          </div>
                          <h4 className="font-display font-bold text-[12px] text-primary-foreground/85 uppercase tracking-wide group-hover:text-primary transition-colors leading-snug line-clamp-2">
                            {item.title}
                          </h4>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        <HomeFooter
          onContactClick={() => setContactOpen(true)}
          onSupportClick={(s) => { setContactSubject(s); setContactOpen(true); }}
        />
      </div>

      <PopUpContato01
        isOpen={contactOpen}
        onClose={() => { setContactOpen(false); setContactSubject(undefined); }}
        initialSubject={contactSubject}
      />
    </div>
  );
};

export default NewsArticle;
