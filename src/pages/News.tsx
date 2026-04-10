import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Newspaper, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import HomeFooter from "@/components/home/HomeFooter";
import PopUpContato01 from "@/components/PopUpContato01";
import AnimatedBackground from "@/components/home/AnimatedBackground";
import { NEWS_ITEMS, NEWS_CATEGORIES, type NewsItem } from "@/data/news";

type CategoryFilter = "todos" | NewsItem["category"];

const News = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string | undefined>();
  const [filter, setFilter] = useState<CategoryFilter>("todos");

  const filtered = filter === "todos" ? NEWS_ITEMS : NEWS_ITEMS.filter((n) => n.category === filter);

  return (
    <div className="min-h-screen relative" style={{ background: "hsl(0 0% 4%)" }}>
      <AnimatedBackground />

      <div className="relative z-10">
        <Header onContactClick={() => setContactOpen(true)} />

        <section className="pt-28 md:pt-36 pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12 md:mb-16"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--primary) / 0.06))",
                  border: "1px solid hsl(var(--primary) / 0.15)",
                }}
              >
                <Newspaper className="w-6 h-6 text-primary" />
              </motion.div>

              <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight mb-4">
                Novidades e{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
                >
                  Atualizações
                </span>
              </h1>
              <p className="text-base text-primary-foreground/45 max-w-xl mx-auto">
                Eventos, ações institucionais e novidades da MS Eletric.
              </p>
            </motion.div>

            {/* Category filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap justify-center gap-2 mb-10"
            >
              {(["todos", "evento", "institucional", "campanha", "novidade"] as CategoryFilter[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 cursor-pointer ${
                    filter === cat ? "text-primary-foreground" : "text-primary-foreground/40 hover:text-primary-foreground/60"
                  }`}
                  style={{
                    background:
                      filter === cat
                        ? "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.08))"
                        : "hsl(0 0% 100% / 0.03)",
                    border: `1px solid ${
                      filter === cat ? "hsl(var(--primary) / 0.25)" : "hsl(0 0% 100% / 0.06)"
                    }`,
                  }}
                >
                  {cat === "todos" ? "Todos" : NEWS_CATEGORIES[cat]}
                </button>
              ))}
            </motion.div>

            {/* News grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(145deg, hsl(0 0% 100% / 0.03) 0%, hsl(0 0% 100% / 0.01) 100%)",
                    border: "1px solid hsl(0 0% 100% / 0.06)",
                  }}
                >
                  {/* Image */}
                  <div
                    className="h-44 flex items-center justify-center relative overflow-hidden"
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
                      <Newspaper className="w-10 h-10 text-primary/12" />
                    )}
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

                  {/* Content */}
                  <div className="p-5">
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

                    <h2 className="font-display font-bold text-sm text-primary-foreground/90 uppercase tracking-wide mb-2 group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-[12px] text-primary-foreground/40 leading-relaxed line-clamp-3 mb-4">
                      {item.summary}
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary/60 group-hover:text-primary transition-colors">
                      Saiba mais
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-sm text-primary-foreground/30 py-16">
                Nenhuma atualização nesta categoria no momento.
              </p>
            )}
          </div>
        </section>

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

export default News;
