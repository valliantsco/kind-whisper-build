import { motion } from "framer-motion";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { NEWS_ITEMS, NEWS_CATEGORIES } from "@/data/news";

const HomeNews = () => {
  const displayItems = NEWS_ITEMS.slice(0, 4);

  return (
    <section className="py-14 md:py-20 relative overflow-x-clip">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.12) 50%, transparent 100%)" }}
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
                Atualizações
              </span>
            </div>
            <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
              MS Eletric{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
              >
                em movimento
              </span>
            </h2>
            <p className="text-sm md:text-base text-primary-foreground/50 leading-relaxed mt-4 md:mt-5 max-w-lg">
              Eventos, novidades e ações que mostram a presença da marca no mercado.
            </p>
          </div>

          <Link
            to="/novidades"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/40 hover:text-primary transition-colors group shrink-0"
          >
            Ver todas
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Cards grid. uniform layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayItems.map((item, i) => (
            <Link to={`/novidades/${item.slug}`} key={item.id} className="block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 h-full flex flex-col"
                style={{
                  background: "linear-gradient(145deg, hsl(0 0% 100% / 0.03) 0%, hsl(0 0% 100% / 0.01) 100%)",
                  border: "1px solid hsl(0 0% 100% / 0.06)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.05) 0%, transparent 70%)" }}
                />

                {/* Image area. fixed height for all cards */}
                <div
                  className="relative overflow-hidden flex items-center justify-center h-44"
                  style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.06) 0%, hsl(0 0% 100% / 0.02) 100%)" }}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center relative">
                      {/* Decorative grid pattern */}
                      <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                          backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
                          backgroundSize: "16px 16px",
                        }}
                      />
                      <div
                        className="absolute bottom-0 left-0 right-0 h-1/2"
                        style={{ background: "linear-gradient(to top, hsl(0 0% 4% / 0.6), transparent)" }}
                      />
                      <Newspaper className="w-8 h-8 text-primary/20" />
                    </div>
                  )}
                  {/* Category badge */}
                  <span
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-[0.12em] text-primary-foreground/80"
                    style={{
                      background: "hsl(0 0% 0% / 0.5)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid hsl(0 0% 100% / 0.08)",
                    }}
                  >
                    {NEWS_CATEGORIES[item.category]}
                  </span>
                </div>

                {/* Content. flex-grow to push CTA to bottom */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <Calendar className="w-3 h-3 text-primary/40" />
                    <time className="text-[10px] text-primary-foreground/30 uppercase tracking-wider">
                      {new Date(item.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  </div>

                  <h3 className="font-display font-bold text-[13px] text-primary-foreground/90 uppercase tracking-wide mb-2 group-hover:text-primary transition-colors duration-300 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-[12px] text-primary-foreground/40 leading-relaxed line-clamp-3 flex-1">
                    {item.summary}
                  </p>

                  <div className="mt-4 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary/60 group-hover:text-primary transition-colors">
                    Saiba mais
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeNews;
